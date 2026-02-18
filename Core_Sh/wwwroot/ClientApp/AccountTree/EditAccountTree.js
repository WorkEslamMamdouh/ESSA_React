$(document).ready(() => {
    EditAccountTree.InitalizeComponent();
});
var EditAccountTree;
(function (EditAccountTree) {
    var CompCode;
    var BranchCode;
    var FinYear;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var AccountDetail = new AQ_A_Account();
    var btnAdd;
    var btnDelete;
    var btnsave;
    var btnback;
    var btnRefrash;
    var Acc_Parent;
    var txt_ACC_CODE;
    var txt_NAME_A;
    var txt_NAME_E;
    var txt_Type;
    var txt_CreditLimit;
    var txt_note;
    var txt_Debit;
    var txt_DebitFC;
    var txtACC_GROUP;
    var txt_balance;
    var txt_level;
    var chkeck_active;
    var chkeck_Detailed;
    var txtSearch;
    var CREATED_BY = "";
    var CREATED_AT = "";
    var AccountCode = "";
    var AddMod = true;
    var FalgClick = 0;
    var Falgdblclick = 0;
    var DeleteCode = 0;
    var Res = GetGlopelResources();
    CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
    FinYear = Number(sys.SysSession.CurrentEnvironment.CurrentYear);
    function InitalizeComponent() {
        AccountDetail = new AQ_A_Account();
        InitalizeControls();
        InitializeEvents();
        GetAccType();
        Close_Loder();
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            let data = GetModelGlopel();
            AccountCode = data.ACC_CODE;
            AddMod = false;
            localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
        }
        GetAccount(AccountCode);
    }
    EditAccountTree.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnAdd = document.getElementById("btnAdd");
        btnsave = document.getElementById("btnsave");
        btnDelete = document.getElementById("btnDelete");
        btnback = document.getElementById("btnback");
        btnRefrash = document.getElementById("btnRefrash");
        //textBoxes
        Acc_Parent = document.getElementById("Acc_Parent");
        txt_ACC_CODE = document.getElementById("txt_ACC_CODE");
        txt_NAME_A = document.getElementById("txt_NAME_A");
        txt_NAME_E = document.getElementById("txt_NAME_E");
        txt_Type = document.getElementById("txt_Type");
        //txtCCDT_Type = document.getElementById("txtCCDT_Type") as HTMLSelectElement;
        txt_note = document.getElementById("txt_note");
        txt_level = document.getElementById("txt_level");
        txt_Debit = document.getElementById("txt_Debit");
        txt_DebitFC = document.getElementById("txt_DebitFC");
        txtACC_GROUP = document.getElementById("txtACC_GROUP");
        txt_CreditLimit = document.getElementById("txt_CreditLimit");
        txt_balance = document.getElementById("txt_balance");
        chkeck_active = document.getElementById("chkeck_active");
        chkeck_Detailed = document.getElementById("chkeck_Detailed");
        txtSearch = document.getElementById("txtSearch");
    }
    function InitializeEvents() {
        btnsave.onclick = () => { btnsave_onClick(); LogUser(" تم عمل حفظ للبيانات ", TypeLog.Save); };
        btnback.onclick = () => { GetAccount(txt_ACC_CODE.value); LogUser(" تم عمل تراجع من التعديل ", TypeLog.BackUpdate); };
        btnDelete.onclick = () => { btnDelete_onclick(); LogUser(" تم عمل حذف للبيانات ", TypeLog.Delete); };
        btnAdd.onclick = () => { btnAdd_onclick(); LogUser(" تم ضغط علي زر الاضافه ", TypeLog.Add); };
    }
    function GetAccount(ACC_CODE) {
        if (AddMod == true) {
            ACC_CODE = AccountCode;
        }
        let Func = " select * from  fn_Z_A_GetAccountByCompanyByACC_CODE(" + CompCode + ", " + FinYear + ", N'" + ACC_CODE + "') ";
        let DataRes = GetDataFromProc(Func, "AQ_A_Account");
        if (DataRes.length > 0) {
            AccountDetail = DataRes[0];
            txt_ACC_CODE.disabled = true;
            DisplayDetail(AccountDetail);
        }
    }
    function GetAccType() {
        var Table;
        Table =
            [
                { NameTable: 'G_Codes', Condition: "CodeType = 'AccType'" },
            ];
        DataResult(Table);
        let List = GetDataTable('G_Codes');
        FillDropDown(List, txt_Type, "CodeValue", "DescA", null);
    }
    function DisplayDetail(Model) {
        txt_ACC_CODE.value = Model.ACC_CODE;
        Acc_Parent.value = Model.PARENT_ACC;
        txt_NAME_A.value = Model.ACC_DESCA;
        txt_NAME_E.value = Model.ACC_DESCL;
        txt_note.value = Model.REMARKS;
        txt_level.value = Model.ACC_LEVEL.toString();
        txt_Debit.value = Model.Total_DEBIT.toFixed(2);
        txt_DebitFC.value = Model.Total_CREDIT.toFixed(2);
        txt_Type.value = String(Model.ACC_TYPE);
        txt_CreditLimit.value = Model.ACC_LIMIT.toFixed(2);
        txt_balance.value = Model.Total_Balance.toFixed(2);
        chkeck_Detailed.checked = Model.DETAIL;
        chkeck_active.checked = Model.ACC_ACTIVE;
        CREATED_BY = Model.CREATED_BY;
        CREATED_AT = Model.CREATED_AT;
    }
    function btnDelete_onclick() {
        debugger;
        if (!Check_Not_Using(txt_ACC_CODE.value)) {
            if (DeleteCode == 1) {
                ShowMessage("You cannot delete it because it has Transactions! ", " لا يمكنك الحذف لانه لديه حركات سابقاً! ");
                Errorinput(txt_ACC_CODE);
            }
            else {
                ShowMessage("You cannot delete it because it has Accounts! ", " لا يمكنك الحذف لانه لديه حسابات! ");
            }
            return;
        }
        else {
            let NAME = SysSession.CurrentEnvironment.ScreenLanguage == "Ar" ? txt_NAME_A.value : txt_NAME_E.value;
            let _Confirm = confirm("هل تريد الحذف؟ ( " + NAME + " )");
            if (_Confirm) {
                SqlExecuteQuery("delete from A_ACCOUNT where ACC_CODE =N'" + txt_ACC_CODE.value + "'");
                ShowMessage("Deleted 🤞😉", "تم الحذف 🤞😉");
                $("#Display_Back_Page").click();
                $('#Back_Page').click();
                Close_Loder();
            }
        }
    }
    function Check_Not_Using(ACC_CODE) {
        var Table;
        Table =
            [
                { NameTable: 'A_JOURNAL_DETAIL', Condition: "COMP_CODE = " + CompCode + " and ACC_CODE = N'" + ACC_CODE + "'" },
            ];
        DataResult(Table);
        debugger;
        let JournalList = GetDataTable('A_JOURNAL_DETAIL');
        if (JournalList.length > 0) {
            DeleteCode = 1;
            return false;
        }
        else {
            let Func = " select * from  fn_Z_A_GetAccountByCompanyByACC_CODE(" + CompCode + ", " + FinYear + ", '') ";
            let DataRes = GetDataFromProc(Func, "AQ_A_Account");
            let AccountSons = DataRes.filter(x => x.PARENT_ACC == ACC_CODE);
            if (AccountSons.length > 0) {
                DeleteCode = 2;
                return false;
            }
            else {
                return true;
            }
        }
    }
    function btnsave_onClick() {
        debugger;
        if (!ValidationHeader())
            return;
        let Model = new A_ACCOUNT();
        Model.COMP_CODE = CompCode;
        Model.ACC_CODE = txt_ACC_CODE.value;
        Model.ACC_DESCA = txt_NAME_A.value;
        Model.ACC_DESCL = txt_NAME_E.value;
        Model.ACC_GROUP = Number(txtACC_GROUP.value);
        Model.ACC_TYPE = Number(txt_Type.value);
        Model.ACC_LEVEL = Number(txt_level.value);
        Model.ACC_ACTIVE = chkeck_active.checked;
        Model.PARENT_ACC = Acc_Parent.value.trim() == '' ? '-1' : Acc_Parent.value;
        Model.DETAIL = chkeck_Detailed.checked;
        Model.CREATED_BY = sys.SysSession.CurrentEnvironment.UserCode;
        Model.CREATED_AT = GetDateAndTime();
        let NameFunc = AddMod == true ? "Insert" : "Update";
        let MessageEn = AddMod == true ? "Inserted" : "Updated";
        let MessageAr = AddMod == true ? "اضافة" : "تعديل";
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("Account", NameFunc),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    ShowMessage("Account " + MessageEn + " ( " + txt_ACC_CODE.value + " ) 🤞😉", "تم " + MessageAr + " الحساب بنجاح ( " + txt_ACC_CODE.value + " ) 🤞😉");
                    Close_Loder();
                    $("#Display_Back_Page").click();
                    $('#Back_Page').click();
                }
                else {
                }
            }
        });
        AddMod = false;
    }
    function btnAdd_onclick() {
        var Table;
        Table =
            [
                { NameTable: 'A_JOURNAL_DETAIL', Condition: "COMP_CODE = " + CompCode + " and ACC_CODE = '" + txt_ACC_CODE.value + "'" },
            ];
        DataResult(Table);
        debugger;
        let JournalList = GetDataTable('A_JOURNAL_DETAIL');
        if (JournalList.length > 0) {
            ShowMessage(" You cannot add Account under this account because it have transactions", "لا يمكنك اضافة حساب تحت هذا الحساب لان لديه حركات");
            return false;
        }
        else {
            debugger;
            let Level = Number(txt_level.value);
            AddMod = true;
            Clear();
            btnAdd.disabled = true;
            btnDelete.disabled = true;
            Acc_Parent.value = AccountCode;
            txt_ACC_CODE.disabled = false;
            txt_level.value = (Level + 1).toString();
        }
    }
    function Clear() {
        txt_NAME_A.value = "";
        txt_NAME_E.value = "";
        txt_CreditLimit.value = "0";
        txt_Debit.value = "0";
        txt_DebitFC.value = "0";
        txt_balance.value = "0";
        txt_note.value = "";
        chkeck_Detailed.checked = true;
    }
    function ValidationHeader() {
        debugger;
        if (txt_ACC_CODE.value == "") {
            Errorinput(txt_ACC_CODE, "Please enter account code !", "برجاء أدخل كود الحساب! ");
            return false;
        }
        else if (!Check_ACC_CODE(txt_ACC_CODE.value) && AddMod == true) {
            Errorinput(txt_ACC_CODE, "This code already exists.!", "هذا الكود موجود بالفعل ");
            return;
        }
        else if (txt_NAME_A.value.trim() == "" && txt_NAME_E.value.trim() == "") {
            Errorinput(txt_NAME_A, "Please enter arabic describtion ! ", "برجاء أدخل الاسم بالعربي ");
            return false;
        }
        else if (txt_Type.value == "null") {
            Errorinput(txt_Type, "Please choose type ! ", "يجب اختيار النوع !");
            return false;
        }
        return true;
    }
    function Check_ACC_CODE(ACC_CODE) {
        debugger;
        let Func = " select * from  fn_Z_A_GetAccountByCompanyByACC_CODE(" + CompCode + ", " + FinYear + ", N'" + ACC_CODE + "') ";
        let DataRes = GetDataFromProc(Func, "AQ_A_Account");
        if (DataRes.length > 0) {
            return false;
        }
        else {
            return true;
        }
    }
})(EditAccountTree || (EditAccountTree = {}));
//# sourceMappingURL=EditAccountTree.js.map