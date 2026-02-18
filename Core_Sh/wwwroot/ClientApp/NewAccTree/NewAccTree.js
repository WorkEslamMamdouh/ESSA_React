$(document).ready(function () {
    NewAccTree.InitalizeComponent();
});
var NewAccTree;
(function (NewAccTree) {
    var CompCode;
    var BranchCode;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Tree_View;
    var Editing_Tab;
    var JournalList = new Array();
    var Details_ACCOUNT = new Array();
    var Details_GCodes = new Array();
    var DetGCod = new Array();
    var btnAdd;
    var btnDelete;
    var btnsave;
    var btnback;
    var btnRefrash;
    var BtnNextSearch;
    var Acc_Parent;
    var txt_ACC_CODE;
    var txt_NAME_A;
    var txt_NAME_E;
    var txt_Type;
    var txt_CreditLimit;
    var txt_note;
    var txt_Openbalance;
    var txt_Debit;
    var txt_DebitFC;
    var txtACC_GROUP;
    var txt_balance;
    var txt_level;
    var chkeck_active;
    var chkeck_Detailed;
    var txtSearch;
    var FinancialAmount;
    var FinancialPayAmount;
    var FinancialRemainAmount;
    var FinancialRemCollectAmount;
    var FinancialDistAmount;
    var FinancialCollectAmount;
    var AddMod = true;
    var FalgClick = 0;
    var Falgdblclick = 0;
    CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        GetAll_Account();
        Display_Tree();
        ActiveTab("Tree_View");
        Close_Loder();
    }
    NewAccTree.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Editing_Tab = document.getElementById('Editing_Tab');
        btnAdd = document.getElementById("btnAdd");
        btnsave = document.getElementById("btnsave");
        btnDelete = document.getElementById("btnDelete");
        btnback = document.getElementById("btnback");
        btnRefrash = document.getElementById("btnRefrash");
        BtnNextSearch = document.getElementById("BtnNextSearch");
        Tree_View = document.getElementById("Tree_View");
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
        txt_Openbalance = document.getElementById("txt_Openbalance");
        txt_CreditLimit = document.getElementById("txt_CreditLimit");
        txt_balance = document.getElementById("txt_balance");
        chkeck_active = document.getElementById("chkeck_active");
        chkeck_Detailed = document.getElementById("chkeck_Detailed");
        txtSearch = document.getElementById("txtSearch");
        FinancialAmount = document.getElementById("FinancialAmount");
        FinancialPayAmount = document.getElementById("FinancialPayAmount");
        FinancialRemainAmount = document.getElementById("FinancialRemainAmount");
        FinancialDistAmount = document.getElementById("FinancialDistAmount");
        FinancialRemCollectAmount = document.getElementById("FinancialRemCollectAmount");
        FinancialCollectAmount = document.getElementById("FinancialCollectAmount");
    }
    function InitializeEvents() {
        $('#Back_PageTap').on('click', function () {
            ActiveTab("Tree_View");
        });
        Tree_View.onclick = function () {
            ActiveTab("Tree_View");
            $('.Txt_Ret_Tot').addClass('display_none');
            $('.Txt_Inv_Tot').removeClass('display_none');
        };
        Editing_Tab.onclick = function () { $('.Txt_Ret_Tot').removeClass('display_none'); $('.Txt_Inv_Tot').addClass('display_none'); };
        btnsave.onclick = function () { btnsave_onClick(); LogUser(" تم عمل حفظ للبيانات ", TypeLog.Save); };
        btnback.onclick = function () { btnback_onclick(); LogUser(" تم عمل تراجع من التعديل ", TypeLog.BackUpdate); };
        btnDelete.onclick = function () { btnDelete_onclick(); LogUser(" تم عمل حذف للبيانات ", TypeLog.Delete); };
        btnAdd.onclick = function () { btnAdd_onclick(); LogUser(" تم ضغط علي زر الاضافه ", TypeLog.Add); };
        btnRefrash.onclick = btnRefrash_onclick;
        //txtSearch.onchange = txtSearch_onchange;
        BtnNextSearch.onclick = NextSearch;
        Event_key('Enter', 'txtSearch', 'BtnNextSearch');
        Event_key('Tab', 'txtSearch', 'BtnNextSearch');
    }
    //******************************************** New Code *************************** 
    function Display_Type(ACC_GROUP) {
        DetGCod = Details_GCodes.filter(function (x) { return x.SubCode == ACC_GROUP; });
        $('#txt_Type').html('');
        $('#txt_Type').append('<option value="null"> Type </option>');
        for (var i = 0; i < DetGCod.length; i++) {
            $('#txt_Type').append('<option data-GROUP="' + ACC_GROUP + '" value="' + DetGCod[i].CodeValue + '">' + DetGCod[i].DescA + '</option>');
        }
    }
    function GetAll_Account() {
        Details_ACCOUNT = new Array();
        Details_GCodes = new Array();
        var Table;
        Table =
            [
                //{ NameTable: 'GetAllAccTree', Condition: "COMP_CODE = " + CompCode + "" },
                { NameTable: 'G_Codes', Condition: "CodeType = 'AccType'" },
            ];
        DataResult(Table);
        //Details_ACCOUNT = GetDataTable('GetAllAccTree');
        Details_GCodes = GetDataTable('G_Codes');
        var Query = " GetAllAccTree " + CompCode + "," + SysSession.CurrentEnvironment.CurrentYear + "";
         ;
        Details_ACCOUNT = GetDataFromProc(Query, "GetAllAccTree");
         ;
    }
    function Display_Tree(IsOpen) {
        if (IsOpen === void 0) { IsOpen = false; }
        console.log(Details_ACCOUNT);
        $('#accountTree').html('');
        var parentElement = document.getElementById('accountTree');
        if (parentElement) {
            buildTree('root', parentElement, null, 1);
        }
        $('li').on('click', function () {
            if (FalgClick == 0) {
                if ($(this).attr('class') != 'ClAcc Acive' && $(this).attr('class') != 'ClAcc') {
                    $(this).toggleClass('open');
                }
                $('.ClAcc').removeClass('Acive');
                $(this).addClass('Acive');
                //ClickAccTree($(this).attr('AccCode'))
                FalgClick = 1;
            }
            setTimeout(function () { FalgClick = 0; }, 500);
        });
        $('li').on('dblclick', function () {
            if (Falgdblclick == 0) {
                $('.ClAcc').removeClass('Acive');
                $(this).addClass('Acive');
                dblClickAccTree($(this).attr('AccCode'));
                Falgdblclick = 1;
            }
            setTimeout(function () { Falgdblclick = 0; }, 500);
        });
        if (IsOpen) {
            $('li .ClAcc .folder').addClass('open');
            $('li').addClass('open');
        }
    }
    function buildTree(accCode, parent, parentAccCode, level) {
        if (level === void 0) { level = 0; }
        var ul = document.createElement('ul');
        ul.id = 'IDUl_' + accCode;
        parent === null || parent === void 0 ? void 0 : parent.appendChild(ul);
        Details_ACCOUNT.forEach(function (account) {
            if (account.ACC_LEVEL === level && account.PARENT_ACC === parentAccCode) {
                var li = document.createElement('li');
                li.id = "IDAcc_" + account.ACC_CODE;
                li.className = "ClAcc";
                li.setAttribute('AccCode', account.ACC_CODE);
                li.textContent = account.ACC_DESCA + ' ( ' + account.ACC_CODE + ' )';
                if (parent) {
                    if (account.PARENT_ACC != null && account.PARENT_ACC != '') {
                        //$('#IDUl_' + account.parent + '').appendChild(li);
                        var parentUl = document.getElementById('IDUl_' + account.PARENT_ACC);
                        parentUl.appendChild(li);
                        $('#IDAcc_' + account.ACC_CODE + '').attr('style', 'color: black;');
                        $('#IDAcc_' + account.PARENT_ACC + '').addClass('folder');
                        if ($('#IDAcc_' + account.PARENT_ACC + '').attr('Class').trim() == 'ClAcc folder') {
                            $('#IDAcc_' + account.PARENT_ACC + '').attr('style', 'color: #1c75c4;');
                        }
                    }
                    else {
                        parent.appendChild(li);
                        $('#IDAcc_' + account.ACC_CODE + '').attr('style', 'color: black;');
                    }
                }
                buildTree(account.ACC_CODE, li, account.ACC_CODE, level + 1);
            }
        });
    }
    function dblClickAccTree(AccCode) {
        if (AccCode != undefined) {
             ;
            var ModelList = Details_ACCOUNT.filter(function (x) { return x.ACC_CODE == AccCode; });
            DisplayDetail(ModelList[0]);
            ActiveTab("Editing_Tab");
            ShowBack_PageTap();
            AddMod = false;
            $('#btnAdd').removeClass('display_none');
            txt_ACC_CODE.disabled = true;
            LogUser(" تم اختيار الحساب ( " + AccCode + " )", TypeLog.Views);
        }
    }
    function DisplayDetail(Model) {
        console.log(Model);
        txt_ACC_CODE.value = Model.ACC_CODE;
        Acc_Parent.value = Model.PARENT_ACC;
        txt_NAME_A.value = Model.ACC_DESCA;
        txt_NAME_E.value = Model.ACC_DESCL;
        txt_note.value = Model.REMARKS;
        txt_level.value = Model.ACC_LEVEL.toString();
        txt_Debit.value = Model.DEBIT.toFixed(2);
        txt_DebitFC.value = Model.CREDIT.toFixed(2);
        txtACC_GROUP.value = Model.ACC_GROUP.toString();
        txt_Openbalance.value = Model.OPENING_BALANCE.toFixed(2);
        txt_CreditLimit.value = Model.ACC_LIMIT.toFixed(2);
        txt_balance.value = ((Number(txt_Openbalance.value) + Number(txt_DebitFC.value) - Number(txt_Debit.value))).toFixed(2);
        chkeck_Detailed.checked = Model.DETAIL;
        chkeck_active.checked = Model.ACC_ACTIVE;
        FinancialAmount.value = Number(Model.FinancialAmount == null ? 0 : Model.FinancialAmount).toFixed(2);
        FinancialPayAmount.value = Number(Model.FinancialPayAmount == null ? 0 : Model.FinancialPayAmount).toFixed(2);
        FinancialRemainAmount.value = Number(Model.FinancialRemainAmount == null ? 0 : Model.FinancialRemainAmount).toFixed(2);
        FinancialRemCollectAmount.value = Number(Model.FinancialRemCollectAmount == null ? 0 : Model.FinancialRemCollectAmount).toFixed(2);
        FinancialCollectAmount.value = Number(Model.FinancialCollectAmount == null ? 0 : Model.FinancialCollectAmount).toFixed(2);
        FinancialDistAmount.value = Number(Model.FinancialDistAmount == null ? 0 : Model.FinancialDistAmount).toFixed(2);
        Display_Type(Model.ACC_GROUP.toString());
        $('#txt_Type').val(Model.ACC_TYPE);
        $('.Editable').removeAttr("disabled");
        chkeck_active.disabled = false;
        $('.Editable').removeAttr("disabled");
        if ($('#IDAcc_' + txt_ACC_CODE.value).hasClass('folder')) {
            btnDelete.disabled = true;
            $('#btnDelete').addClass("display_none");
        }
        else {
            btnDelete.disabled = false;
            $('#btnDelete').removeClass("display_none");
        }
        //chkeck_Detailed.checked;
        //chkeck_Detailed.checked == true ? $(btnDelete).addClass('disabledDiv') : $(btnDelete).removeClass('disabledDiv');
        if (Acc_Parent.value == "2100") {
            $('.Editable').attr("disabled", "disabled");
            $('#Div_Header').attr("style", "opacity: 1.4;pointer-events: none;  cursor: no-drop;");
        }
        else {
            $('.Editable').removeAttr("disabled");
            $('#Div_Header').removeAttr("style");
        }
    }
    function txtSearch_onchange() {
        var search = txtSearch.value.toLowerCase();
        var _Search = Details_ACCOUNT.filter(function (x) { return x.ACC_CODE.toString().search(search) >= 0 || x.ACC_DESCA.toLowerCase().search(search) >= 0; });
        Search_length = _Search.length;
        if (_Search.length > 0) {
            FocusAccCode(_Search[0].ACC_CODE, true);
        }
        else {
            ShowMessage('Not ACCOUNT ❌');
        }
        alert('1');
    }
    var Search_length = 0;
    var MaxSearch_length = 0;
    function NextSearch() {
        //alert('100')
         ;
        var search = txtSearch.value.toLowerCase();
        var _Search = Details_ACCOUNT.filter(function (x) { var _a, _b; return ((_a = x.ACC_CODE) === null || _a === void 0 ? void 0 : _a.toString().search(search)) >= 0 || ((_b = x.ACC_DESCA) === null || _b === void 0 ? void 0 : _b.toLowerCase().search(search)) >= 0; });
        if (MaxSearch_length != _Search.length) {
            Search_length = 0;
            MaxSearch_length = _Search.length;
        }
         ;
        if (_Search.length > 0) {
            if (Search_length < MaxSearch_length) {
                FocusAccCode(_Search[Search_length].ACC_CODE, true);
                Search_length++;
            }
            else {
                Search_length = 0;
                NextSearch();
            }
        }
        else {
            ShowMessage('Not ACCOUNT ❌');
        }
    }
    function btnRefrash_onclick() {
        GetAll_Account();
        Display_Tree();
        txtSearch.value = '';
        ShowMessage('Done Refrash ✅');
    }
    function btnAdd_onclick() {
        AddMod = true;
        //txt_ACC_CODE.value = (Number(txt_ACC_CODE.value) + 1).toString(); 
        Acc_Parent.value = txt_ACC_CODE.value;
        try {
            var x = Details_ACCOUNT.filter(function (x) { return x.PARENT_ACC == txt_ACC_CODE.value; });
        }
        catch (e) {
        }
        try {
            if (x.length > 0) {
                var NewAcc = Number(x[x.length - 1].ACC_CODE);
                txt_ACC_CODE.value = (NewAcc + 1).toString();
            }
            else {
                txt_ACC_CODE.value = txt_ACC_CODE.value + '01';
            }
        }
        catch (e) {
            txt_ACC_CODE.value = '';
        }
        txt_level.value = (Number(txt_level.value) + 1).toString();
        Display_Type(txtACC_GROUP.value);
        Clear();
        $('#btnAdd').addClass('display_none');
        txt_ACC_CODE.disabled = false;
        $('#btnDelete').addClass("display_none");
        chkeck_Detailed.checked = true;
    }
    function btnback_onclick() {
        if (AddMod) {
            dblClickAccTree(Acc_Parent.value);
        }
        else {
            dblClickAccTree(txt_ACC_CODE.value);
        }
    }
    function btnDelete_onclick() {
        if (!Check_Not_Using(txt_ACC_CODE.value)) {
            DisplayMassage(" لا يمكنك الحذف لانه لديه رقم حركه!", "You cannot delete it because it has a movement number!", MessageType.Worning);
            Errorinput(txt_ACC_CODE);
            return;
        }
        else {
            var NAME = SysSession.CurrentEnvironment.ScreenLanguage == "Ar" ? txt_NAME_A.value : txt_NAME_E.value;
            var _Confirm = confirm("هل تريد الحذف؟ ( " + NAME + " )");
            if (_Confirm) {
                Ajax.CallsyncSave({
                    type: "Get",
                    url: sys.apiUrl("Account", "DeleteAccount"),
                    data: {
                        COMP_CODE: CompCode, Acc_Code: txt_ACC_CODE.value, Acc_Parent: Acc_Parent.value
                    },
                    success: function (d) {
                        var result = d;
                        if (result.IsSuccess == true) {
                            ShowMessage("Account Deleted ( " + txt_ACC_CODE.value + " ) 🤞😉");
                            IsSuccess(Acc_Parent.value, true);
                            Close_Loder();
                        }
                    }
                });
            }
        }
    }
    function btnsave_onClick() {
        if (!ValidationHeader())
            return;
        var Acc_Code = txt_ACC_CODE.value;
        var NameA = txt_NAME_A.value;
        var NameE = txt_NAME_E.value;
        var Group = Number(txtACC_GROUP.value);
        var Level = Number(txt_level.value);
        var Type = Number(txt_Type.value);
        var CreditLimit = Number(txt_CreditLimit.value);
        var Active = chkeck_active.checked == true ? 1 : 0;
        var Remarks = txt_note.value;
        var NodeParent = Acc_Parent.value.trim() == '' ? '-1' : Acc_Parent.value;
        var Detailed = chkeck_Detailed.checked == true ? 1 : 0;
        if (AddMod == true) {
            Ajax.CallsyncSave({
                type: "Get",
                url: sys.apiUrl("Account", "InsertAccount"),
                data: {
                    COMP_CODE: CompCode, Acc_Code: Acc_Code, ACC_DESCA: NameA, ACC_DESCL: NameE, ACC_GROUP: Group, ACC_TYPE: Type, ACC_LEVEL: Level, ACC_ACTIVE: Active, CreditLimit: CreditLimit, NodeParent: NodeParent, User: SysSession.CurrentEnvironment.UserCode, Remarks: Remarks, Detail: Detailed
                },
                success: function (d) {
                    var result = d;
                    if (result.IsSuccess == true) {
                        ShowMessage("Account Inserted ( " + Acc_Code + " ) 🤞😉");
                        IsSuccess(Acc_Code, true);
                        Close_Loder();
                    }
                    else {
                    }
                }
            });
        }
        else {
            Ajax.CallsyncSave({
                type: "Get",
                url: sys.apiUrl("Account", "UpdateAccount"),
                data: {
                    COMP_CODE: CompCode, Acc_Code: Acc_Code, ACC_DESCA: NameA, ACC_DESCL: NameE, ACC_GROUP: Group, ACC_TYPE: Type, ACC_LEVEL: Level, ACC_ACTIVE: Active, CreditLimit: CreditLimit, NodeParent: NodeParent, User: SysSession.CurrentEnvironment.UserCode, Remarks: Remarks, Detail: Detailed
                },
                success: function (d) {
                    var result = d;
                    if (result.IsSuccess == true) {
                        ShowMessage("Account Updated ( " + Acc_Code + " ) 🤞😉");
                        IsSuccess(Acc_Code, true);
                        Close_Loder();
                    }
                    else {
                    }
                }
            });
        }
        AddMod = false;
    }
    function Clear() {
        txt_NAME_A.value = "";
        txt_NAME_E.value = "";
        txt_Openbalance.value = "0";
        txt_CreditLimit.value = "0";
        txt_Debit.value = "0";
        txt_DebitFC.value = "0";
        txt_balance.value = "0";
        txt_note.value = "";
        chkeck_Detailed.checked = false;
        FinancialAmount.value = "0";
        FinancialPayAmount.value = "0";
        FinancialRemCollectAmount.value = "0";
        FinancialCollectAmount.value = "0";
        FinancialRemainAmount.value = "0";
        FinancialDistAmount.value = "0";
    }
    function IsSuccess(Acc_Code, IsOpen) {
        if (IsOpen === void 0) { IsOpen = false; }
        GetAll_Account();
        FocusAccCode(Acc_Code, IsOpen);
    }
    function FocusAccCode(Acc_Code, IsOpen) {
        if (IsOpen === void 0) { IsOpen = false; }
        Display_Tree(IsOpen);
        ActiveTab("Tree_View");
        $('#IDAcc_' + Acc_Code).click();
         ;
        try {
            var element = document.getElementById('IDAcc_' + Acc_Code);
            element.scrollIntoView({ behavior: 'smooth' });
        }
        catch (e) {
            alert(Acc_Code + " في مشكله في رقم الحساب ده مش موجود في الشجره علشان Leve مش مظبوط");
        }
    }
    function ValidationHeader() {
        if (txt_ACC_CODE.value == "") {
            DisplayMassage("برجاء أدخل رقم الحساب! ", "Please enter account number !  ", MessageType.Worning);
            Errorinput(txt_ACC_CODE);
            return false;
        }
        else if (!Check_ACC_CODE(txt_ACC_CODE.value) && AddMod == true) {
            DisplayMassage("هذا الرقم موجود بالفعل ", "You cannot delete it because it has a movement number!", MessageType.Worning);
            Errorinput(txt_ACC_CODE);
            return;
        }
        else if (txt_NAME_A.value.trim() == "" && txt_NAME_E.value.trim() == "") {
            DisplayMassage("برجاء أدخل الاسم بالعربي! ", "Please enter arabic describtion !  ", MessageType.Worning);
            Errorinput(txt_NAME_A);
            return false;
        }
        else if (txt_Type.value == "null") {
            DisplayMassage("يجب اختيار النوع! ", "must choose type!  ", MessageType.Worning);
            Errorinput(txt_Type);
            return false;
        }
        return true;
    }
    function Check_Not_Using(ACC_CODE) {
        var Table;
        Table =
            [
                { NameTable: 'A_JOURNAL_DETAIL', Condition: "COMP_CODE = 1 and ACC_CODE = '" + ACC_CODE + "'" },
            ];
        DataResult(Table);
        JournalList = GetDataTable('A_JOURNAL_DETAIL');
        if (JournalList.length > 0) {
            return false;
        }
        else {
            return true;
        }
    }
    function Check_ACC_CODE(ACC_CODE) {
        var Table;
        Table =
            [
                { NameTable: 'A_ACCOUNT', Condition: "COMP_CODE = " + CompCode + " and ACC_CODE = N'" + ACC_CODE + "' " },
            ];
        DataResult(Table);
        var List = GetDataTable('A_ACCOUNT');
        if (List.length > 0) {
            return false;
        }
        else {
            return true;
        }
    }
    //***********************************************************************
})(NewAccTree || (NewAccTree = {}));
//# sourceMappingURL=NewAccTree.js.map