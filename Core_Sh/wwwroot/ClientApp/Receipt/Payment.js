$(document).ready(function () {
    Payment.InitalizeComponent();
});
var Payment;
(function (Payment) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var btnAdd;
    var db_Type;
    var Model = new I_TR_FinancialTransactions();
    var Card_Type;
    var Reciept_Type;
    var db_TypeFin;
    var Txt_Amount;
    var Txt_CardPrc;
    var InvoiceID;
    var Txt_NetAmount;
    var InvoiceNo;
    var btnDelete_Filter;
    var _TypeTrans = new Array();
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    //var ACC_CODE_Custody = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody
    //var ACC_CODE_Loan = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan
    var NameFunction = "Insert";
    var InvRemain = 0;
    var TransactionID = 0;
    var TrType = 1;
    var Status = 1;
    function InitalizeComponent() {
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            var data = GetModelGlopel();
            TransactionID = data.TransactionID;
            Status = data.Status;
            $('#Txt_Amount').val(data.Amount);
            $('#db_Type').val(data.TrType);
            $('#db_TypeFin').val(data.IsCash == true ? 1 : 0);
            $('#Txt_Remarks').val(data.Remarks);
            $('#Txt_TrData').val(data.TransactionDate);
            $('#RefNo').val(data.RefNo);
            NameFunction = "Update";
            localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
        }
        InitalizeControls();
        InitializeEvents();
        GetReceiptType();
        $('#Txt_TrData').val(GetDate());
        Close_Loder();
    }
    Payment.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnAdd = document.getElementById("btnAdd");
        db_Type = document.getElementById("db_Type");
        db_TypeFin = document.getElementById("db_TypeFin");
        Reciept_Type = document.getElementById("Reciept_Type");
        Card_Type = document.getElementById("Card_Type");
        InvoiceID = document.getElementById("InvoiceID");
        Txt_CardPrc = document.getElementById("Txt_CardPrc");
        Txt_Amount = document.getElementById("Txt_Amount");
        Txt_NetAmount = document.getElementById("Txt_NetAmount");
        InvoiceNo = document.getElementById("InvoiceNo");
        btnDelete_Filter = document.getElementById("btnDelete_Filter");
    }
    function InitializeEvents() {
        btnAdd.onclick = Add_Reciept;
        db_TypeFin.onchange = db_TypeFin_onchange;
        Reciept_Type.onchange = Reciept_Type_onchange;
        Card_Type.onchange = Card_Type_onchange;
        InvoiceNo.onclick = SearchInvoices;
        Txt_Amount.onchange = Txt_Amount_onchange;
        btnDelete_Filter.onclick = btnDelete_Filter_onclick;
    }
    function btnDelete_Filter_onclick() {
        $('#InvoiceID').val(0);
        $('#InvoiceNo').val("Search Invoice");
        InvRemain = 0;
        Txt_Amount.value = "0";
        Card_Type_onchange();
        $('#btnDelete_Filter').addClass("display_none");
    }
    function SearchInvoices() {
        // CompCode = " + CompCode + " and 
        sys.FindKey("Receipt", "InvoiceNo", "TrType = 0 and IsCash = 0 and Status = 1 and RemainAmount > 0 ", function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#InvoiceID').val(SelectedItem.SaleID);
            $('#InvoiceNo').val(SelectedItem.TrNo);
            InvRemain = SelectedItem.RemainAmount;
            Txt_Amount.value = InvRemain.toString();
            Card_Type_onchange();
            $('#btnDelete_Filter').removeClass("display_none");
        });
    }
    function Reciept_Type_onchange() {
        if (Reciept_Type.value == "null") {
            $('.divInvoice').removeClass("display_none");
        }
        else {
            $('.divInvoice').addClass("display_none");
            InvRemain = 0;
        }
    }
    function db_TypeFin_onchange() {
        if (db_TypeFin.value == "0") { // اذا كان الدفع كارت
            $('.divCard').removeClass("display_none");
            Card_Type_onchange();
        }
        else {
            $('.divCard').addClass("display_none");
        }
    }
    function Card_Type_onchange() {
        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-prc');
        Txt_NetAmount.value = ((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())).toString();
    }
    function Txt_Amount_onchange() {
        if (Number($('#Txt_Amount').val()) > InvRemain && Reciept_Type.value == 'null') {
            $('#Txt_Amount').val(InvRemain);
            ShowMessage(" 😒مبلغ الاستلام اكبر من المبلغ المتبقي للفاتورة", "😒The receipt amount is enough for the invoice.");
        }
        Card_Type_onchange();
    }
    function GetReceiptType() {
         ;
        var Table;
        Table =
            [
                { NameTable: 'D_A_FinancialType', Condition: "TrType = 0 and IsActive = 1" },
                { NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },
            ];
        DataResult(Table);
         ;
        var cat = GetDataTable('D_A_FinancialType');
        var CardType = GetDataTable('D_A_CashTypes');
        FillDropwithAttr(cat, "Reciept_Type", "FinancialTypeID", (Res.Lang == "Ar" ? "DescAr" : "DescEn"), (Res.Lang == "Ar" ? "قبض من عميل" : "Reciept From Customer "), "", "");
        FillDropwithAttr(CardType, "Card_Type", "CashTypeID", (Res.Lang == "Ar" ? "Description" : "Description"), "No", "prc", "ChargePrc");
    }
    function Add_Reciept() {
        if ($('#RefNo').val().trim() == '') {
            Errorinput($('#RefNo'), "Please Enter RefNo 🤨", "برجاء ادخال المرجع 🤨");
            return;
        }
        if ($('#Txt_TrData').val().trim() == '') {
            Errorinput($('#Txt_TrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
            return;
        }
        if ($('#db_Type').val() == '-1') {
            Errorinput($('#db_Type'), "Please Enter TrType 🤨", "برجاء ادخال نوع الحركة 🤨");
            return;
        }
        if ($('#db_TypeFin').val() == '-1') {
            Errorinput($('#db_TypeFin'), "Please Enter Payment 🤨", "برجاء ادخال 'طريقة الدفع' 🤨");
            return;
        }
        if (Number($('#Txt_Amount').val()) == 0) {
            Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨", "برجاء ادخال المبلغ 🤨");
            return;
        }
        if ($('#Txt_Remarks').val() == "") {
            Errorinput($('#Txt_Remarks'), "Please Enter Remarks 🤨", "برجاء ادخال الملاحظات 🤨");
            return;
        }
        Model = new I_TR_FinancialTransactions();
        Model.TransactionID = TransactionID;
        Model.RefNo = ($('#RefNo').val());
        Model.Amount = Number($('#Txt_Amount').val());
        if (db_TypeFin.value == "1") {
            Model.IsCash = true;
            Model.DueAmount = Number(Txt_Amount.value);
        }
        else {
            Model.IsCash = false;
            Model.DueAmount = Number(Txt_NetAmount.value);
        }
        Model.Status = Status;
        Model.CashTypeID = Number(Card_Type.value);
        Model.TrType = TrType;
        Model.Type = Number(db_TypeFin.value);
        Model.TransactionDate = DateFormatddmmyyyy($('#Txt_TrData').val());
        Model.Remarks = $('#Txt_Remarks').val();
        Model.CreatedAt = DateFormat(GetDate());
        Model.CreatedBy = SysSession.CurrentEnvironment.USERID.toString();
        Model.PurchaseID = Number(InvoiceID.value);
         ;
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("Receipt", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    $('#Div_Header :Input').val('');
                    $('#Txt_TrData').val(GetDate());
                    ShowMessage("Done 🤞😉", "تم الحفظ 🤞😉");
                    $('#Back_Page').click();
                    $("#Display_Back_Page").click();
                    Close_Loder();
                }
                else {
                    ShowMessage("Error", "يوجد خطاء في الحفظ");
                    Close_Loder();
                }
            }
        });
    }
})(Payment || (Payment = {}));
//# sourceMappingURL=Payment.js.map