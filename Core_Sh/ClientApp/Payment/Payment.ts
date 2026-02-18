
$(document).ready(() => {
    Payment.InitalizeComponent();

});

namespace Payment {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();

    var btnAdd: HTMLButtonElement;
    var db_Type: HTMLSelectElement;
    var Model: I_TR_FinancialTransactions = new I_TR_FinancialTransactions();
    var Card_Type: HTMLSelectElement;
    var Reciept_Type: HTMLSelectElement;
    var Txt_Amount: HTMLInputElement;
    var Txt_CardPrc: HTMLInputElement;
    var InvoiceID: HTMLInputElement;
    var Txt_NetAmount: HTMLInputElement;
    var InvoiceNo: HTMLButtonElement
    var btnDelete_Filter: HTMLButtonElement
    var Remain: Array<I_TR_Purchases> = new Array<I_TR_Purchases>();
    var BeneficiaryName: HTMLInputElement;
    var SupplierName: HTMLInputElement;
    var SupplierID: HTMLInputElement;

    var _TypeTrans: Array<I_TR_FinancialTransactions> = new Array<I_TR_FinancialTransactions>();
    var Res: SystemResources = GetGlopelResources();

    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);

    var NameFunction = "Insert";
    var InvRemain = 0;
    var TransactionID = 0;
    var TrType = 1;
    var Status = 0;
    var UpdateAt = "";
    var UpdatedBy = "";
    export function InitalizeComponent() {

        InitalizeControls();
        InitializeEvents();
        GetPaymentType()
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            NameFunction = "Update"
            let data: I_TR_FinancialTransactions = GetModelGlopel();
            $('#TrNo').val(data.TrNo)
            $('#RefNo').val(data.RefNo)
            TransactionID = data.TransactionID;
            Status = data.Status;
            $('#Txt_TrData').val(data.TransactionDate)
            Reciept_Type.value = data.Type.toString();
            TrType = data.TrType;
            Reciept_Type_onchange();
            Card_Type.value = data.CashTypeID.toString()
            Txt_CardPrc.value = (((data.DueAmount - data.Amount) / data.Amount) * 100).toString();
            Txt_NetAmount.value = data.DueAmount.toString();
            $('#Txt_Remarks').val(data.Remarks);
            $('#Reason').val(data.Reason);
            UpdateAt = GetDateAndTimeSql();
            UpdatedBy = data.UpdatedBy == "" ? SysSession.CurrentEnvironment.GQ_USERS.USER_NAME : data.UpdatedBy;
            $('#Txt_Amount').val(data.Amount)
            BeneficiaryName.value = data.BeneficiaryName;
            InvoiceID.value = data.PurchaseID.toString();
            InvoiceNo.value = data.PurchaseID.toString();
            let search = $('option:selected', $("#Reciept_Type")).attr('data-Search')
            if (search == '3') {
                SupplierID.value = data.PurchaseID.toString();
                SupplierName.value = data.BeneficiaryName;
            }

            if (data.PurchaseID != 0 || data.PurchaseID != null && search != '3') {
                BeneficiaryName.disabled = true;
                GetRemain(data.PurchaseID);
            }

            localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
        }
        $('#Txt_TrData').val(GetDate());
        Reciept_Type_onchange();
        Close_Loder();
    }
    function GetRemain(PurchaseID: number) {
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'I_TR_Purchases', Condition: "PurchaseID = " + PurchaseID + "" },
            ]
        DataResult(Table);
        Remain = GetDataTable('I_TR_Purchases');
        InvRemain = Remain[0].RemainAmount;
    }
    function InitalizeControls() {
        BeneficiaryName = document.getElementById("BeneficiaryName") as HTMLInputElement;
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        db_Type = document.getElementById("db_Type") as HTMLSelectElement;
        Reciept_Type = document.getElementById("Reciept_Type") as HTMLSelectElement;
        Card_Type = document.getElementById("Card_Type") as HTMLSelectElement;
        InvoiceID = document.getElementById("InvoiceID") as HTMLInputElement;
        Txt_CardPrc = document.getElementById("Txt_CardPrc") as HTMLInputElement;
        Txt_Amount = document.getElementById("Txt_Amount") as HTMLInputElement;
        Txt_NetAmount = document.getElementById("Txt_NetAmount") as HTMLInputElement;
        InvoiceNo = document.getElementById("InvoiceNo") as HTMLButtonElement;
        btnDelete_Filter = document.getElementById("btnDelete_Filter") as HTMLButtonElement;
        SupplierName = document.getElementById("SupplierName") as HTMLInputElement;
        SupplierID = document.getElementById("SupplierID") as HTMLInputElement;


    }
    function InitializeEvents() {
        btnAdd.onclick = Add_Reciept;
        Reciept_Type.onchange = Reciept_Type_onchange;
        Card_Type.onchange = Card_Type_onchange;
        InvoiceNo.onclick = SearchInvoices;
        Txt_Amount.onchange = Txt_Amount_onchange;
        btnDelete_Filter.onclick = btnDelete_Filter_onclick;
        SupplierName.onclick = SearchSupplier;

    }
    
    function SearchSupplier() {         
        //sys.FindKeySpeed("Supplier", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', function () {
        sys.FindKeyPagination("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
            let SelectedItem: D_A_Suppliers = SelectDataSearch.DataRow;  
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
             $('#SupplierID').val(SelectedItem.SupplierID);
             $('#SupplierName').val(SelectedItem.SupplierName);
             BeneficiaryName.value = SelectedItem.SupplierName;
             BeneficiaryName.disabled = true;
             Card_Type_onchange();
             $('#btnDelete_Filter').removeClass("display_none");
        });
    }
    function btnDelete_Filter_onclick() {
        $('#InvoiceID').val(0);
        $('#InvoiceNo').val(Res.Lang == "Ar" ? "بحث عن فاتورة" : "Search Invoice");
        InvRemain = 0;
        BeneficiaryName.disabled = false;
        BeneficiaryName.value = "";
        Txt_Amount.value = "0";
        Card_Type_onchange();
        $('#btnDelete_Filter').addClass("display_none");
    }
    function SearchInvoices() {
        //sys.FindKey("Payment", "InvoiceNo", "TrType = 0 and IsCash = 0 and Status = 1 and RemainAmount > 0 and CompCode = " + CompCode + " ", () => {

        //sys.FindKeySpeed("Pur", " CompCode = " + CompCode + "  and Status = 1  and IsCash = false and  TrType =  0  and RemainAmount > 0", 'SearchForm', () => {
        sys.FindKeyPagination("Pur", "Pur", " CompCode = " + CompCode + "  and Status = 1  and IsCash = 0 and  TrType =  0 and RemainAmount > 0 ", () => {
            let SelectedItem: IQ_TR_Purchases = SelectDataSearch.DataRow

            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#InvoiceID').val(SelectedItem.PurchaseID);
            $('#InvoiceNo').val(SelectedItem.TrNo);
            InvRemain = SelectedItem.RemainAmount;
            Txt_Amount.value = InvRemain.toString();
            BeneficiaryName.value = SelectedItem.SupplierName;
            BeneficiaryName.disabled = true;
            Card_Type_onchange();
            $('#btnDelete_Filter').removeClass("display_none");

        });
    }
    function Reciept_Type_onchange() {
        debugger
        $('#btnDelete_Filter').addClass("display_none");
        InvRemain = 0;
        InvoiceID.value = "";
        Txt_Amount.value = "0";
        BeneficiaryName.value = "";
        BeneficiaryName.disabled = false;
        InvoiceNo.value = Res.Lang == "Ar" ? "بحث عن فاتورة" : "Search Invoice";
        let search = $('option:selected', $("#Reciept_Type")).attr('data-Search')      
        if (search == "1") {
            $('.divInvoice').removeClass("display_none");
            $('.divCustomer').addClass("display_none");

        } else if (search == "3") {
            $('.divInvoice').addClass("display_none");
            $('.divCustomer').removeClass("display_none");

        } else {
            $('.divCustomer').addClass("display_none");
            $('.divInvoice').addClass("display_none");
        }



    }

    function Card_Type_onchange() {
        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-prc');
        Txt_NetAmount.value = ((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())).toString();


    }
    function Txt_Amount_onchange() {
        if (Number($('#Txt_Amount').val()) > InvRemain && Reciept_Type.value == 'null' && (InvoiceID.value.trim() != '' && InvoiceID.value.trim() != '0')) {
            $('#Txt_Amount').val(InvRemain);
            Errorinput($('#Txt_Amount'), "😒The Payment amount is enough for the invoice.", "  😒مبلغ الصرف اكبر من المبلغ المتبقي في الفاتورة")

        }
        Card_Type_onchange();
    }
    function GetPaymentType() {

        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'D_A_FinancialType', Condition: "TrType = 1 and IsActive = 1 and CompCode =" + CompCode + "" },
                { NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },
            ]
        DataResult(Table);

        let cat = GetDataTable('D_A_FinancialType');
        let CardType = GetDataTable('D_A_CashTypes');
        FillDropwithAttr(cat, "Reciept_Type", "FinancialTypeID", (Res.Lang == "Ar" ? "DescAr" : "DescEn"), "No", "Search", "SearchTypes");
        FillDropwithAttr(CardType, "Card_Type", "CashTypeID", (Res.Lang == "Ar" ? "Description" : "Description"), "No", "prc", "ChargePrc");
    }
    function Add_Reciept() {
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒")
            return
        }
        if ($('#RefNo').val().trim() == '') {
            Errorinput($('#RefNo'), "Please Enter RefNo 🤨", "برجاء ادخال المرجع 🤨");
            return
        }
        if ($('#Txt_TrData').val().trim() == '') {
            Errorinput($('#Txt_TrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
            return
        }
        if ($('#BeneficiaryName').val().trim() == "") {
            Errorinput($('#BeneficiaryName'), "Please Enter Beneficiary Name 🤨", "برجاء ادخال اسم المستفيد 🤨");
            return
        }

        if ($('#db_Type').val() == '-1') {
            Errorinput($('#db_Type'), "Please Enter TrType 🤨", "برجاء ادخال نوع الحركة 🤨");
            return
        }

        if (Number($('#Txt_Amount').val()) == 0) {
            Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨", "برجاء ادخال المبلغ 🤨");
            return
        }
        if ($('.divInvoice').is(":hidden") == false) {

            if ($('#Reciept_Type').prop("selectedIndex") == 0 && (InvoiceID.value.trim() == '' || InvoiceID.value.trim() == '0')) {
                Errorinput($('#InvoiceNo'), "Please Choose Purchase Invoice🤨", "برجاء اختيار الفاتورة 🤨");
                return
            }

            if (Number($('#Txt_Amount').val()) > InvRemain) {
                Errorinput($('#Txt_Amount'), "The amount remaining to be paid [ " + InvRemain + " ] cannot exceed the amount 😒", "المبلغ المتبقي للسداد [ " + InvRemain + " ]  لا يمكن ان تتعدي المبلغ 😒");
                return
            }


        }
        if ($('.divCustomer').is(":hidden") == false) {
            if (SupplierID.value.trim() == '0') {
                Errorinput($('#SupplierName'), "Please Choose Customer🤨", "برجاء اختيار hgudg 🤨");
                return
            }
        }

        if ($('#Reason').val() == "") {
            Errorinput($('#Reason'), "Please Enter Reason For payment 🤨", "برجاء ادخال سبب الصرف 🤨");
            return
        }
        if ($('#Txt_Remarks').val() == "") {
            Errorinput($('#Txt_Remarks'), "Please Enter Remarks 🤨", "برجاء ادخال الملاحظات 🤨");
            return
        }

        Model = new I_TR_FinancialTransactions();
        Model.TransactionID = TransactionID;
        Model.TrNo = Number($('#TrNo').val());
        Model.RefNo = ($('#RefNo').val());
        Model.Amount = Number($('#Txt_Amount').val());
        Model.IsCash = true;
        Model.DueAmount = Number(Txt_NetAmount.value)
        Model.Status = 0;
        Model.BeneficiaryName = BeneficiaryName.value;
        Model.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
        Model.CashTypeID = Number(Card_Type.value);
        Model.TrType = TrType;
        Model.Type = Reciept_Type.value == 'null' ? null : Number(Reciept_Type.value);
        Model.TransactionDate = DateFormatddmmyyyy($('#Txt_TrData').val());
        Model.Remarks = $('#Txt_Remarks').val();
        Model.Reason = $('#Reason').val();
        Model.CreatedAt = GetDateAndTimeSql();
        Model.CreatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME.toString();
        Model.UpdatedAt = UpdateAt;
        Model.UpdatedBy = UpdatedBy;
        Model.PurchaseID = Number(InvoiceID.value);
        Model.CompCode = CompCode;
        let search = $('option:selected', $("#Reciept_Type")).attr('data-Search')
        if (search == '3') {
            Model.PurchaseID = Number(SupplierID.value);
        }
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("Receipt", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    $('#Div_Header :Input').val('');
                    $('#Txt_TrData').val(GetDate());
                    ShowMessage("Done 🤞😉", "تم الحفظ 🤞😉");
                    $('#Back_Page').click();
                    $("#Display_Back_Page").click();
                    Close_Loder();
                } else {
                    ShowMessage("Error", "يوجد خطاء في الحفظ");
                    Close_Loder();
                }
            }
        });
    }
}
