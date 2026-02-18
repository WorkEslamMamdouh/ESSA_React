$(document).ready(function () {
    TransMoney.InitalizeComponent();
});
var TransMoney;
(function (TransMoney) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var btnFrom_ACC_CODE;
    var btnAdd;
    var db_Type;
    var Model = new I_TransMoney();
    var _ModelProfile = new GQ_USERS();
    var _ModelTypeTrans = new GQ_TypeTrans();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    function InitalizeComponent() {
         ;
        _ModelProfile = GetModelGlopelDataProfile();
        _ModelTypeTrans = GetModelGlopel_TypeTrans();
        if (!SysSession.CurrentEnvironment.GQ_USERS.IsRolePosted || SysSession.CurrentEnvironment.GQ_USERS.IsRolePosted == null) {
            $('#IsPostDirectJournal').prop("checked", false);
            $('#IsPostDirectJournal').attr("disabled", "disabled");
        }
        if (_ModelTypeTrans.Symbols == '0') { // تعريف
            $('.Def').addClass("display_none");
            $('#Txt_Amount').attr("placeholder", "تعريف");
            $('#Lab_AmountDef').html("تعريف");
        }
        //if (_ModelTypeTrans.Symbols == '1') { // قيمة العهده
        //    $('.Def').addClass("display_none");
        //    $('#Txt_Amount').attr("placeholder", " قيمة العهده");
        //    $('#Lab_AmountDef').html(" قيمة العهده");
        //}
        //if (_ModelTypeTrans.Symbols == '2') { // سداد العهده
        //    $('.Def').addClass("display_none");
        //    $('#Txt_Amount').attr("placeholder", "سداد العهده");
        //    $('#Lab_AmountDef').html("سداد العهده");
        //}
        //if (_ModelTypeTrans.Symbols == '3') { // تحصيل العهده
        //    $('.Def').addClass("display_none");
        //    $('#Txt_Amount').attr("placeholder", "تحصيل العهده");
        //    $('#Lab_AmountDef').html("تحصيل العهده");
        //}
        if (_ModelTypeTrans.Symbols == '4') { // سلفة
            $('.Def').addClass("display_none");
            $('#Txt_Amount').attr("placeholder", "سلفة");
            $('#Lab_AmountDef').html("سلفة");
        }
        if (_ModelTypeTrans.Symbols == '5') { // عهدة
            $('.Def').addClass("display_none");
            $('#Txt_Amount').attr("placeholder", "عهدة");
            $('#Lab_AmountDef').html("عهدة");
        }
        InitalizeControls();
        InitializeEvents();
        $('#Txt_TrData').val(GetDate());
        $('#Txt_nameRecipient').val(_ModelProfile.USER_NAME);
        $('#Txt_TrData').attr("disabled", "disabled");
        Close_Loder();
    }
    TransMoney.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnFrom_ACC_CODE = document.getElementById("btnFrom_ACC_CODE");
        btnAdd = document.getElementById("btnAdd");
        db_Type = document.getElementById("db_Type");
    }
    function InitializeEvents() {
        btnFrom_ACC_CODE.onclick = SearchAcc;
        btnAdd.onclick = Add_Reciept;
        db_Type.onchange = db_Type_Change;
    }
    //****************************************************** Validtion and Clear *****************************************
    function db_Type_Change() {
        if (db_Type.value == "0") {
            //$('.Trans').removeClass("display_none");
        }
        else {
            $('.Trans').addClass("display_none");
            $('#Txt_TransNO').val("");
        }
    }
    function SearchAcc() {
        sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + "  and DETAIL = 1 ", function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#btnFrom_ACC_CODE').val(SelectedItem.ACC_CODE);
            $('#Txt_From_ACC_DESCA').val(SelectedItem.ACC_DESCA);
        });
    }
    function Add_Reciept() {
        if ($('#Txt_Ref_No').val().trim() == "") {
            Errorinput($('#Txt_Ref_No'), "Please Enter Ref No 🤨");
            return;
        }
        if ($('#Txt_nameRecipient').val().trim() == "") {
            Errorinput($('#Txt_nameRecipient'), "Please Enter Name of Recipient 🤨");
            return;
        }
        //if (db_Type.value == "0" && $('#btnFrom_ACC_CODE').val() == "Search") {
        //    Errorinput($('#btnFrom_ACC_CODE'), "Please Select Account Transfer 🤨");
        //    return
        //} 
        //if (db_Type.value == "0" && $('#Txt_TransNO').val().trim() == "") {
        //    Errorinput($('#Txt_TransNO'), "Please Enter Transfer No 🤨");
        //    return
        //}
        if (Number($('#Txt_Amount').val()) == 0) {
            if (_ModelTypeTrans.Symbols == '0') { // تعريف
                Errorinput($('#Txt_Amount'), "Please Enter Def 🤨");
            }
            //else if (_ModelTypeTrans.Symbols == '1') { // قيمة العهده
            //    Errorinput($('#Txt_Amount'), "Please Enter Covenant 🤨");
            //}
            //else if (_ModelTypeTrans.Symbols == '2') { // سداد العهده
            //    Errorinput($('#Txt_Amount'), "Please Enter Covenant 🤨");
            //}
            //else if (_ModelTypeTrans.Symbols == '3') { // تحصيل العهده
            //    Errorinput($('#Txt_Amount'), "Please Enter Covenant 🤨");
            //}
            else if (_ModelTypeTrans.Symbols == '4') { // سلفة
                Errorinput($('#Txt_Amount'), "Please Enter Loan 🤨");
            }
            else if (_ModelTypeTrans.Symbols == '5') { //  عهده
                Errorinput($('#Txt_Amount'), "Please Enter Custody 🤨");
            }
            else {
                Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨");
            }
            return;
        }
        if ($('#Txt_Remarks').val().trim() == '') {
            Errorinput($('#Txt_Remarks'), "Please Enter Remarks 🤨");
            return;
        }
         ;
        Model = new I_TransMoney();
        Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        Model.BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        Model.RefNO = $('#Txt_Ref_No').val();
        Model.TrDate = DateFormatddmmyyyy($('#Txt_TrData').val());
        Model.NameRecipient = $('#Txt_nameRecipient').val();
        Model.TransferNo = $('#Txt_TransNO').val();
        Model.Status = 1;
        Model.Remark = $('#Txt_Remarks').val();
        Model.USERID = _ModelProfile.USERID;
        Model.IDType = _ModelTypeTrans.IDType;
        Model.Amount = Number($('#Txt_Amount').val());
        Model.TrType = 0;
        if (_ModelTypeTrans.Symbols == '+' || _ModelTypeTrans.Symbols == '++' || _ModelTypeTrans.Symbols == '4' || _ModelTypeTrans.Symbols == '5' || _ModelTypeTrans.Symbols == '6') {
            Model.Credit = Number($('#Txt_Amount').val());
            Model.Debit = 0.00;
        }
        else if (_ModelTypeTrans.Symbols == '-' || _ModelTypeTrans.Symbols == '--') {
            Model.Credit = 0.00;
            Model.Debit = Number($('#Txt_Amount').val());
        }
        else {
            Model.Credit = 0.00;
            Model.Debit = 0.00;
        }
        Model.ACC_CODE = _ModelProfile.ACC_CODE;
        Model.From_ACC_CODE = SysSession.CurrentEnvironment.UserACC_CODE;
        //Model.ACC_CODE = "المشرف ";
        //Model.From_ACC_CODE = "الشركه"; 
        if (db_Type.value == "1") {
            Model.IsCash = true;
        }
        else {
            Model.IsCash = false;
        }
        if (_ModelTypeTrans.Symbols == '0') { // تعريف
            Model.TrType = 2;
        }
        if (_ModelTypeTrans.Symbols == '1') { // قيمة العهده
            Model.IsCash = true;
            Model.TrType = 3;
        }
        if (_ModelTypeTrans.Symbols == '2') { // سداد العهده
            Model.IsCash = true;
            Model.TrType = 4;
        }
        if (_ModelTypeTrans.Symbols == '3') { // تحصيل العهده
            Model.IsCash = true;
            Model.ACC_CODE = SysSession.CurrentEnvironment.UserACC_CODE;
            Model.From_ACC_CODE = _ModelProfile.ACC_CODE;
            Model.TrType = 6;
        }
        if (_ModelTypeTrans.Symbols == '4') { // سلفة
            Model.IsCash = true;
            Model.ACC_CODE = SysSession.CurrentEnvironment.GQ_USERS.Custody_Code;
            Model.From_ACC_CODE = _ModelProfile.Loan_Code;
            Model.TrType = 0;
        }
        if (_ModelTypeTrans.Symbols == '5') { //  عهده
            Model.IsCash = true;
            Model.ACC_CODE = SysSession.CurrentEnvironment.GQ_USERS.Custody_Code;
            Model.From_ACC_CODE = _ModelProfile.Custody_Code;
            Model.TrType = 0;
        }
        if (_ModelTypeTrans.Symbols == '6') { //  خصم سلفة
            Model.IsCash = true;
            Model.ACC_CODE = _ModelProfile.Loan_Code;
            Model.From_ACC_CODE = "";
            Model.TrType = 10;
        }
        if (_ModelTypeTrans.Symbols == '7') { //  خصم العهده
            Model.IsCash = true;
            Model.ACC_CODE = _ModelProfile.Custody_Code;
            Model.From_ACC_CODE = "";
            Model.TrType = 11;
        }
        Model.IsPosted = $('#IsPostDirectJournal').prop("checked");
        Model.VoucherNo = 0;
        Model.IDUserCreate = SysSession.CurrentEnvironment.ID;
        Model.CreatedAt = GetDateAndTimeSql();
        Model.CreatedBy = SysSession.CurrentEnvironment.NameUser;
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("TransMoney", "InsertTransMoney"),
            data: {
                DataSend: JSON.stringify(Model)
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    $('#Div_Header :Input').val('');
                    $('#Txt_TrData').val(GetDate());
                    ShowMessage("Done 🤞😉");
                    $('#Back_Page').click();
                    $('#Display_Back_Page').click();
                    Close_Loder();
                }
                else {
                }
            }
        });
    }
})(TransMoney || (TransMoney = {}));
//# sourceMappingURL=TransMoney.js.map