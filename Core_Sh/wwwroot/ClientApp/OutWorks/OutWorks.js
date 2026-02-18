$(document).ready(() => {
    OutWorks.InitalizeComponent();
});
var OutWorks;
(function (OutWorks) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var btnAdd;
    var db_Type;
    var Model = new I_TR_ExternalLabor();
    var Card_Type;
    var Txt_Amount;
    var Txt_CardPrc;
    var BeneficiaryName;
    var InvoiceID;
    var Txt_NetAmount;
    var InvoiceNo;
    var btnDelete_Filter;
    var Remain = new Array();
    var _TypeTrans = new Array();
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    //var ACC_CODE_Custody = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody
    //var ACC_CODE_Loan = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan
    var NameFunction = "Insert";
    var TransactionID = 0;
    var TrType = 0;
    var Status = 1;
    var UpdateAt = "";
    var UpdatedBy = "";
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        GetReceiptType();
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            NameFunction = "Update";
            let data = GetModelGlopel();
            $('#TrNo').val(data.TrNo);
            $('#RefNo').val(data.RefNo);
            TransactionID = data.TransactionID;
            Status = data.Status;
            $('#Txt_TrData').val(data.TransactionDate);
            Card_Type.value = data.CashTypeID.toString();
            Txt_CardPrc.value = (((data.DueAmount - data.Amount) / data.Amount) * 100).toString();
            $('#Txt_Amount').val(data.Amount);
            Txt_NetAmount.value = data.DueAmount.toString();
            $('#Reason').val(data.Reason);
            $('#Txt_Remarks').val(data.Remarks);
            UpdateAt = GetDateAndTimeSql();
            UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
            BeneficiaryName.value = data.BeneficiaryName;
            InvoiceID.value = data.InvoiceID.toString();
            InvoiceNo.value = data.InvoiceNo.toString();
            TrType = data.TrType;
            if (data.InvoiceID != 0 || data.InvoiceID != null) {
                BeneficiaryName.disabled = true;
            }
            localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
        }
        $('#Txt_TrData').val(GetDate());
        $('.divInvoice').removeClass("display_none");
        Close_Loder();
    }
    OutWorks.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnAdd = document.getElementById("btnAdd");
        db_Type = document.getElementById("db_Type");
        Card_Type = document.getElementById("Card_Type");
        InvoiceID = document.getElementById("InvoiceID");
        BeneficiaryName = document.getElementById("BeneficiaryName");
        Txt_CardPrc = document.getElementById("Txt_CardPrc");
        Txt_Amount = document.getElementById("Txt_Amount");
        Txt_NetAmount = document.getElementById("Txt_NetAmount");
        InvoiceNo = document.getElementById("InvoiceNo");
        btnDelete_Filter = document.getElementById("btnDelete_Filter");
    }
    function InitializeEvents() {
        btnAdd.onclick = Add_OutWorks;
        Card_Type.onchange = Card_Type_onchange;
        InvoiceNo.onclick = SearchInvoices;
        Txt_Amount.onchange = Txt_Amount_onchange;
        btnDelete_Filter.onclick = btnDelete_Filter_onclick;
    }
    function btnDelete_Filter_onclick() {
        $('#InvoiceID').val(0);
        $('#InvoiceNo').val(Res.Lang == "Ar" ? "بحث عن امر العمل" : "Search Job Order");
        //BeneficiaryName.disabled = false;
        BeneficiaryName.value = "";
        Txt_Amount.value = "0";
        Card_Type_onchange();
        $('#btnDelete_Filter').addClass("display_none");
        $('._Cancel').addClass("display_none");
    }
    function SearchInvoices() {
        //sys.FindKey("Receipt", "InvoiceNo", "TrType = 0 and IsCash = 0 and Status = 1 and RemainAmount > 0 and CompCode = " + CompCode + " ", () => {
        //sys.FindKeySpeed("View_JobOrd", " CompCode = " + CompCode + "  and Status = 1   ", 'SearchForm', () => {  
        sys.FindKeyPagination("View_JobOrd", "View_JobOrd", " CompCode = " + CompCode + "  and Status = 1   ", () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#InvoiceID').val(SelectedItem.SaleID);
            $('#InvoiceNo').val(SelectedItem.TrNo);
            BeneficiaryName.value = SelectedItem.CustomerName;
            //  InvRemain = SelectedItem.RemainAmount;
            Txt_Amount.value = "0";
            BeneficiaryName.disabled = true;
            Card_Type_onchange();
            $('#btnDelete_Filter').removeClass("display_none");
            $('._Cancel').removeClass("display_none");
        });
    }
    function Card_Type_onchange() {
        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-prc');
        Txt_NetAmount.value = ((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())).toString();
    }
    function Txt_Amount_onchange() {
        Card_Type_onchange();
    }
    function GetReceiptType() {
        var Table;
        Table =
            [
                //{ NameTable: 'D_A_FinancialType', Condition: "TrType = 0 and IsActive = 1 and CompCode =" + CompCode + "" },
                { NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },
            ];
        DataResult(Table);
        //let cat = GetDataTable('D_A_FinancialType');
        let CardType = GetDataTable('D_A_CashTypes');
        //FillDropwithAttr(cat, "Reciept_Type", "FinancialTypeID", (Res.Lang == "Ar" ? "DescAr" : "DescEn"), "No", "Search", "SearchTypes");
        FillDropwithAttr(CardType, "Card_Type", "CashTypeID", (Res.Lang == "Ar" ? "Description" : "Description"), "No", "prc", "ChargePrc");
    }
    function Add_OutWorks() {
        if ($('#RefNo').val().trim() == '') {
            Errorinput($('#RefNo'), "Please Enter RefNo 🤨", "برجاء ادخال المرجع 🤨");
            return;
        }
        if ($('#Txt_TrData').val().trim() == '') {
            Errorinput($('#Txt_TrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
            return;
        }
        if ($('.divInvoice').is(":hidden") == false) {
            if ((InvoiceID.value.trim() == '' || InvoiceID.value.trim() == '0')) {
                Errorinput($('#InvoiceNo'), "Please Choose Jop Order 🤨", "برجاء اختيار امر العمل 🤨");
                return;
            }
        }
        if ($('#BeneficiaryName').val().trim() == "") {
            Errorinput($('#BeneficiaryName'), "Please Enter Beneficiary Name 🤨", "برجاء ادخال اسم المستفيد 🤨");
            return;
        }
        if ($('#db_Type').val() == '-1') {
            Errorinput($('#db_Type'), "Please Enter TrType 🤨", "برجاء ادخال نوع الحركة 🤨");
            return;
        }
        if (Number($('#Txt_Amount').val()) == 0) {
            Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨", "برجاء ادخال المبلغ 🤨");
            return;
        }
        if ($('#Reason').val() == "") {
            Errorinput($('#Reason'), "Please Enter Reason For payment 🤨", "برجاء ادخال سبب الصرف 🤨");
            return;
        }
        if ($('#Txt_Remarks').val() == "") {
            Errorinput($('#Txt_Remarks'), "Please Enter Remarks 🤨", "برجاء ادخال الملاحظات 🤨");
            return;
        }
        Model = new I_TR_ExternalLabor();
        Model.TransactionID = TransactionID;
        Model.TrNo = Number($('#TrNo').val());
        Model.RefNo = ($('#RefNo').val());
        Model.Amount = Number($('#Txt_Amount').val());
        Model.IsCash = true;
        Model.DueAmount = Number(Txt_NetAmount.value);
        Model.BeneficiaryName = BeneficiaryName.value;
        Model.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
        Model.Status = 0;
        Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        Model.CashTypeID = Number(Card_Type.value);
        Model.TrType = TrType;
        Model.Type = null;
        Model.TransactionDate = DateFormatddmmyyyy($('#Txt_TrData').val());
        Model.Reason = $('#Reason').val();
        Model.Remarks = $('#Txt_Remarks').val();
        Model.CreatedAt = GetDateAndTimeSql();
        Model.CreatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME.toString();
        Model.InvoiceID = Number(InvoiceID.value);
        Model.InvoiceNo = InvoiceNo.value;
        Model.UpdatedAt = UpdateAt;
        Model.UpdatedBy = UpdatedBy;
        Model.CompCode = CompCode;
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("OutWorks", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    $("#Display_Back_Page").click();
                    Close_Loder();
                    ShowMessage("Done 🤞😉", "تم الحفظ 🤞😉");
                    $('#Back_Page').click();
                }
                else {
                    ShowMessage("Error", "يوجد خطاء في الحفظ");
                    Close_Loder();
                }
            }
        });
    }
})(OutWorks || (OutWorks = {}));
//# sourceMappingURL=OutWorks.js.map