$(document).ready(() => {
    Financial.InitalizeComponent();
});
var Financial;
(function (Financial) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var btnAdd;
    var Model = new I_TR_FinancialTransactions();
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var NameFunction = "Insert";
    var GlopID = 0;
    var UpdatedAt = "";
    var UpdatedBy = "";
    var Glopl_CreatedAt = "";
    var Glopl_CreatedBy = "";
    var Glopl_IDUserCreate = 0;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            DisplayData();
        }
        Close_Loder();
    }
    Financial.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnAdd = document.getElementById("btnAdd");
        //drpEmpType = document.getElementById("drpEmpType") as HTMLSelectElement;
    }
    function InitializeEvents() {
        btnAdd.onclick = Save;
    }
    function DisplayData() {
        let data = GetModelGlopel();
        GlopID = data.TransactionID;
        //$('#EmpCode').val(data.EmpCode);
        //$('#EmpID').val(data.EmpID);
        //$('#Emp_Name').val(data.Emp_Name);
        //$('#Mobile').val(data.Mobile);
        //$('#Remarks').val(data.Remarks);
        //$('#Salary').val(data.SalaryAmount);
        //$('#Loan').val(data.LoanAmount);
        //$('#Custody').val(data.CustodyAmount);
        //$('#drpIsStatus').val(data.Status);
        //$('#drpEmpType').val(data.EmpType);
        UpdatedAt = GetDateAndTimeSql();
        UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
        Glopl_CreatedAt = data.CreatedAt.toString();
        Glopl_CreatedBy = data.CreatedBy.toString();
        Glopl_IDUserCreate = data.IDUserCreate;
        NameFunction = "Update";
        localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
    }
    function Validtion() {
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒");
            return false;
        }
        if ($('#RefNo').val().trim() == '') {
            Errorinput($('#RefNo'), "Please Enter RefNo 🤨", "برجاء ادخال المرجع 🤨");
            return false;
        }
        if ($('#Txt_TrData').val().trim() == '') {
            Errorinput($('#Txt_TrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
            return false;
        }
        if ($('#BeneficiaryName').val().trim() == "") {
            Errorinput($('#BeneficiaryName'), "Please Enter Beneficiary Name 🤨", "برجاء ادخال اسم المستفيد 🤨");
            return false;
        }
        if ($('#db_Type').val() == '-1') {
            Errorinput($('#db_Type'), "Please Enter TrType 🤨", "برجاء ادخال نوع الحركة 🤨");
            return false;
        }
        if (Number($('#Txt_Amount').val()) == 0) {
            Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨", "برجاء ادخال المبلغ 🤨");
            return false;
        }
        //if ($('.divInvoice').is(":hidden") == false) {
        //    if ($('#Reciept_Type').prop("selectedIndex") == 0 && (InvoiceID.value.trim() == '' || InvoiceID.value.trim() == '0')) {
        //        Errorinput($('#InvoiceNo'), "Please Choose Purchase Invoice🤨", "برجاء اختيار الفاتورة 🤨");
        //        return
        //    }
        //    if (Number($('#Txt_Amount').val()) > InvRemain) {
        //        Errorinput($('#Txt_Amount'), "The amount remaining to be paid [ " + InvRemain + " ] cannot exceed the amount 😒", "المبلغ المتبقي للسداد [ " + InvRemain + " ]  لا يمكن ان تتعدي المبلغ 😒");
        //        return
        //    }
        //}
        //if ($('.divCustomer').is(":hidden") == false) {
        //    if (CustomerId.value.trim() == '0') {
        //        Errorinput($('#CustomerName'), "Please Choose Customer🤨", "برجاء اختيار hgudg 🤨");
        //        return
        //    }
        //}
        if ($('#Reason').val().trim() == "") {
            Errorinput($('#Reason'), "Please Enter Reason For payment 🤨", "برجاء ادخال سبب الصرف 🤨");
            return;
        }
        if ($('#Txt_Remarks').val().trim() == "") {
            Errorinput($('#Txt_Remarks'), "Please Enter Remarks 🤨", "برجاء ادخال الملاحظات 🤨");
            return;
        }
        return true;
    }
    function Assign() {
        Model = new I_TR_FinancialTransactions();
        //Model.EmpID = GlopID;
        //Model.EmpCode = Number($('#EmpCode').val());
        //Model.Emp_Name = ($('#Emp_Name').val());
        //Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        //Model.Mobile = ($('#Mobile').val());
        //Model.Remarks = ($('#Remarks').val());
        //Model.SalaryAmount = ($('#Salary').val());
        //Model.LoanAmount = ($('#Loan').val());
        //Model.CustodyAmount = ($('#Custody').val());
        //Model.Status = ($('#drpIsStatus').val());
        //Model.EmpType = ($('#drpEmpType').val());;
        Model.CompCode = CompCode;
        if (NameFunction == "Insert") {
            Model.CreatedAt = GetDateAndTimeSql();
            Model.CreatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
            Model.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
        }
        else {
            Model.CreatedAt = Glopl_CreatedAt;
            Model.CreatedBy = Glopl_CreatedBy;
            Model.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
            Model.UpdatedAt = GetDateAndTimeSql();
            Model.UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
        }
    }
    function Save() {
        if (!Validtion()) {
            return;
        }
        Assign();
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("Employees", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    ShowMessage("Done 🤞😉", "تم الحفظ 🤞😉");
                    $("#Display_Back_Page").click();
                    $('#Back_Page').click();
                    Close_Loder();
                }
                else {
                    ShowMessage("Error", "يوجد خطاء في الحفظ");
                    Close_Loder();
                }
            }
        });
    }
})(Financial || (Financial = {}));
//# sourceMappingURL=Financial.js.map