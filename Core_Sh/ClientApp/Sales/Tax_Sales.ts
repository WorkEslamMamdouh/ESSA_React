
$(document).ready(() => {
    Tax_Sales.InitalizeComponent();
});
namespace Tax_Sales {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var Grid: ESGrid = new ESGrid();
    var _GridOutWorks: JsGrid = new JsGrid();

    var _Category: Array<D_I_Category> = new Array<D_I_Category>();
    var _ItemFamily: Array<D_I_ItemFamily> = new Array<D_I_ItemFamily>();
    var _IQ_GetItemInfo: Array<IQ_GetItemInfo> = new Array<IQ_GetItemInfo>();
    var _D_G_TaxAddDed: Array<D_G_TaxAddDed> = new Array<D_G_TaxAddDed>();
    var ModelMaster: I_TR_Sales = new I_TR_Sales();
    var _MasterDetails: MasterDetails = new MasterDetails();
    var ModelDetails: Array<I_TR_SaleDetails> = new Array<I_TR_SaleDetails>();
    var ModelDetailsListDelete: Array<I_TR_SaleDetails> = new Array<I_TR_SaleDetails>();
    var Res: SystemResources = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Units: Array<D_I_Units> = new Array<D_I_Units>();
    var ItemUnits: Array<IQ_GetItemInfo> = new Array<IQ_GetItemInfo>();
    var dataOutWorks: Array<I_TR_ExternalLabor> = new Array<I_TR_ExternalLabor>();
    var dataEmployees: Array<G_Employees> = new Array<G_Employees>();

    var BtnSearchJobOrder: HTMLButtonElement
    var BtnSearchShowPrice: HTMLButtonElement
    var BackTap: HTMLButtonElement
    var NextTap: HTMLButtonElement
    var SaveUpdate: HTMLButtonElement
    var BtnNameCustomer: HTMLButtonElement
    var BtnCancelCustomer: HTMLButtonElement
    var PayAmount: HTMLInputElement;
    var Txt_CardPrc: HTMLInputElement;
    var VatTypePrc: HTMLInputElement;
    var VatTypeSupPrc: HTMLInputElement;
    var Rate_Currency: HTMLInputElement;
    var Txt_TrNo: HTMLInputElement;
    var txt_Discount: HTMLInputElement;
    var Card_Type: HTMLSelectElement
    var VatType: HTMLSelectElement
    var VatTypeSup: HTMLSelectElement
    var CurrenyID: HTMLSelectElement
    var IsCash: HTMLSelectElement
    var dropTechnical: HTMLSelectElement
    var TrType = 0;
    var UpdatedAt = "";
    var UpdatedBy = "";
    var NameFunction = "Insert";
    var GlopDoNo = "";
    var GlopID = 0;
    var GlopTrNo = 0;
    var GlopRefID = 0;
    var GloplInvoiceTransCode = 2;
    var Glopl_CreatedAt = "";
    var Glopl_CreatedBy = "";
    var Glopl_IDUserCreate = 0;

    var IsReturn = false;

    var IsNew = true;
    var ISHidenService = true;
    var Type_Items = false;

    var WhereCon = ""
    var WhereConRedis = ""
    var Is_CarCenter = SysSession.CurrentEnvironment.I_Control.Is_CarCenter;
    var TaxLinked = SysSession.CurrentEnvironment.I_Control.TaxLinked;
     
    var TaxLinkedEG = SysSession.CurrentEnvironment.I_Control.TaxLinkedEG;
    var Quickly_INV = SysSession.CurrentEnvironment.I_Control.Quickly_INV;
    export function InitalizeComponent() {
        $('._JobOrder').addClass('display_none')

        if (Is_CarCenter) {
            $('._CenterCar').removeClass('display_none')

        }

        if (SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 2 || SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 3) {
            WhereCon = " and IsService = 1"
            WhereConRedis = " and IsService = 1"
        }

        if (SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 1) {
            WhereCon = " and IsService = 0"
            WhereConRedis = " and IsService = 0"
        }

        ISHidenService = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 2 ? false : true
        let stat = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items;
        if (stat == 2 || stat == 3) {
            Type_Items = false;
        } else {
            Type_Items = true;

        }


        if (SysSession.CurrentEnvironment.I_Control.Is_JobOrder) {
            $('._JobOrder').removeClass('display_none')
        }


        if (!SysSession.CurrentEnvironment.I_Control.Is_ShowPrice) {
            $('._ShowPrice').addClass('display_none')
        }


        if (SysSession.CurrentEnvironment.I_Control.Is_CarCenter) {
            $('._JobOrder').removeClass('display_none')
            $('._ShowPrice').addClass('display_none')
        }


        if (TaxLinkedEG) {
            $('._TaxLinkedEG').removeClass('display_none')
            $('#VatTypeSupDev').removeClass('display_none')
        }



        InitalizeControls();
        InitializeEvents();
         
        GetTechnicals();

        InitializeGridOutWorks();

        IsReturn = localStorage.getItem(GetParameterByName('App') + "TypePage") == "2" ? true : false;

        Get_Data();
        $('#Status').val("1")
        $('#SaleDate').val(GetDate())
        ValidCustomEnter();

        IsCash_onchange();
         
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1" || localStorage.getItem(GetParameterByName('App') + "TypePage") == "2") {
            let data: IQ_TR_Sales = GetModelGlopel();
            DisplayDataUpdate(data, data.SaleID, data.TrNo, data.TrType);
            //$('._ShowPrice').attr('disabled', 'disabled')
            //$('._JobOrder').attr('disabled', 'disabled')
            IsNew = false;
        }


        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "2") { // ModeAddReturn

            $('._JobOrder').addClass('display_none')
            $('._ShowPrice').addClass('display_none')
            IsReturn = true;
            ModeAddReturn();
            IsNew = true;
        }
        if (Quickly_INV == 1) {
            $('#CustomerName').val('عميل نقدي')
            $('#CarBrand').val('لا يوجد')
            $('#CarNo').val('لا يوجد')
            $('#DestructionKm').val('0')
            $('#ChassisNo').val('0')
            $('#EngineerName').val('لا يوجد')
            NextTap.click();

        }
        localStorage.setItem(GetParameterByName('App') + "TypePage", "0");









        //**********************
        Close_Loder();


        if (Is_CarCenter)
        {

            $('.ReNo').addClass('display_none')
            $('.purchaseorderDesc').addClass('display_none')

        } else {
            $('.ReNo').removeClass('display_none')
            $('.purchaseorderDesc').removeClass('display_none')

        }

    }
    function DisplayDataUpdate(data: IQ_TR_Sales, _GlopID: number, _GlopTrNo: number, _TrType: number, Is_DetailInsert = false) {
        NameFunction = "Update"

        GlopID = _GlopID;
        GlopTrNo = _GlopTrNo;
        TrType = _TrType;
        GlopRefID = data.RefID;
        GlopDoNo = data.DoNo;
        GloplInvoiceTransCode = data.InvoiceTransCode;

        console.log(data);
        $('#ShowPriceID').val(data.ShowPriceID)
        $('#ShowPriceNo').val(data.ShowPriceNo)
        $('#JobOrderID').val(data.JobOrderID)
        $('#JobOrderNo').val(data.JobOrderNo)

        $('#Txt_TrNo').val(_GlopTrNo)
        $('#ReNo').val(data.ReNo);
        $('#purchaseorderDesc').val(data.purchaseorderDesc);
        $('#CustomerID').val(data.CustomerID)
        console.log("sss")
        console.log(data)
        if (data.SalesManID == null || data.SalesManID == 0) {
            dropTechnical.selectedIndex = 0;
        } else {
            $('#dropTechnical').val(data.SalesManID)
        }

        $('#CustomerName').val(data.CustomerName);
        $('#Mobile').val(data.Mobile);
        $('#Status').val(data.Status)
        $('#IsCash').val(data.IsCash == true ? 1 : 0)
        $('#SaleDate').val(DateFormat(data.SaleDate))
        $('#VatType').val(data.VatTypeID)
        $('#ItemsTotal').val(data.ItemsTotal)
        $('#Discount').val(data.Discount)
        $('#TotalAmount').val(data.TotalAmount)
        $('#VatAmount').val(data.VatAmount)
        if (IsReturn == true) {
            $('#ExternalAmount').val(0)
        }
        else {
            $('#ExternalAmount').val(data.ExternalAmount)
        }
        debugger
        $('#NetAmount').val(data.NetAmount)
        $('#PaymentAmount').val(data.PaymentAmount)
        $('#RemainAmount').val(data.RemainAmount)
        $('#Remarks').val(data.Remarks)

        $('#CarBrand').val(data.CarBrand)
        $('#CarNo').val(data.CarNo)
        $('#DestructionKm').val(data.DestructionKm)
        $('#ChassisNo').val(data.ChassisNo)
        $('#EngineerName').val(data.EngineerName)


        if (Number(data.TaxID) > 0) {
            $('#VatTypeSup').val(data.TaxID)
            $('#VatTypeSupPrc').val(data.TaxPrc)
            $('#txtDedTaxAmount').val(data.DedTaxAmount)
        }





        if (IsCash.value == '0') {
            $('.IsCash').addClass('display_none')
        }
        else {
            $('.IsCash').removeClass('display_none')
            GetReceiptType();
        }

        if (data.CashType != null) {

            if (Number(data.CashType) == 0) {
                Card_Type.selectedIndex = 0;
            }
            else {

                Card_Type.value = data.CashType.toString();
            }
        }
        txt_Discount.value = data.Discount.toString();
        VatType.value = data.VatTypeID.toString();
        CurrenyID.value = data.CurrenyID.toString();
        Rate_Currency.value = Number(data.Rate_Currency).toString();
        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-Prc');
        VatTypePrc.value = $('option:selected', $("#VatType")).attr('data-Prc');
        localStorage.setItem(GetParameterByName('App') + "VatTypePrc", VatTypePrc.value)

        UpdatedAt = GetDateAndTimeSql();
        UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;

        Glopl_CreatedAt = data.CreatedAt.toString();
        Glopl_CreatedBy = data.CreatedBy.toString();
        Glopl_IDUserCreate = data.IDUserCreate


        if (data.CustomerID != 0) {
            $('.CancelCust').removeClass("display_none");
            $('#CustomerName').attr("disabled", "disabled");
            $('#Mobile').attr("disabled", "disabled");

        }
        else {

            if ($('#IsCash').val() == 1) {
                $('#CustomerName').removeAttr("disabled");
                $('#Mobile').removeAttr("disabled");
            }
            else {
                $('#CustomerName').attr("disabled", "disabled");
                $('#Mobile').attr("disabled", "disabled");
            }
        }



        let Listdata

        if (IsReturn) {
            if (TrType == 0) {

                GlopRefID = data.SaleID;

                Listdata = GetDataFrom('IQ_TR_SaleDetails', "  RemainRetQty > 0 and SaleID = " + data.SaleID)

                NameFunction = "Insert";

            }
            else {
                Listdata = GetDataFrom('IQ_TR_SaleDetails', " SaleID = " + data.SaleID)
            }
        }
        else {
            Listdata = GetDataFrom('IQ_TR_SaleDetails', " SaleID = " + data.SaleID)


        }



        setTimeout(function () {



        if (Listdata.length > 0) {
            Grid.ESG.ModeUpdate = true;
            DisplayDataGridControl(Listdata, Grid);
            OverReadDisplay(Is_DetailInsert)
        }

        if (TrType == 1) {
            ModeUpdateReturn();
        }


         

        if (TrType == 0 && IsReturn == false) {
             

            DisplayOutWorks(Number(data.JobOrderID))
        }

            VatTypeSup_onchange();


        Close_Loder();  }, 500);
    }
    function GetTechnicals() {
        dataEmployees = GetDataFrom('G_Employees', "  CompCode = " + CompCode + "  and Status = 1   and EmpType = 3");
        FillDropDown(dataEmployees, dropTechnical, "EmpID", "Emp_Name", null);
    }
    function ModeAddReturn() {
        TrType = 1;
        $('#Txt_TrNo').val("")
        $('#ReNo').val("")
        $('#purchaseorderDesc').val("")
        $('#Remarks').val("")
        $('#btnAdd_TableBody').addClass("display_none")
        $('#SaleDate').val(GetDate())
        $('._IsReturnDis').attr("disabled", "disabled");
        NameFunction = "Insert";

    }

    function ModeUpdateReturn() {
        $('#btnAdd_TableBody').addClass("display_none")
        $('._IsReturnDis').attr("disabled", "disabled");
        NameFunction = "Update";
    }
    function InitalizeControls() {

        BtnSearchJobOrder = document.getElementById('BtnSearchJobOrder') as HTMLButtonElement;
        BtnSearchShowPrice = document.getElementById('BtnSearchShowPrice') as HTMLButtonElement;
        BackTap = document.getElementById('BackTap') as HTMLButtonElement;
        NextTap = document.getElementById('NextTap') as HTMLButtonElement;
        SaveUpdate = document.getElementById('SaveUpdate') as HTMLButtonElement;
        BtnNameCustomer = document.getElementById('BtnNameCustomer') as HTMLButtonElement;
        BtnCancelCustomer = document.getElementById('BtnCancelCustomer') as HTMLButtonElement;
        Txt_TrNo = document.getElementById('Txt_TrNo') as HTMLInputElement;
        Txt_CardPrc = document.getElementById('Txt_CardPrc') as HTMLInputElement;
        VatTypePrc = document.getElementById('VatTypePrc') as HTMLInputElement;
        VatTypeSupPrc = document.getElementById('VatTypeSupPrc') as HTMLInputElement;
        Rate_Currency = document.getElementById('Rate_Currency') as HTMLInputElement;
        txt_Discount = document.getElementById('txt_Discount') as HTMLInputElement;
        PayAmount = document.getElementById('PayAmount') as HTMLInputElement;
        IsCash = document.getElementById('IsCash') as HTMLSelectElement;
        Card_Type = document.getElementById('Card_Type') as HTMLSelectElement;
        VatType = document.getElementById('VatType') as HTMLSelectElement;
        VatTypeSup = document.getElementById('VatTypeSup') as HTMLSelectElement;
        CurrenyID = document.getElementById('CurrenyID') as HTMLSelectElement;
        dropTechnical = document.getElementById('dropTechnical') as HTMLSelectElement;

    }
    function InitializeEvents() {
        BtnSearchJobOrder.onclick = BtnSearchJobOrder_onclick
        BtnSearchShowPrice.onclick = BtnSearchShowPrice_onclick
        BackTap.onclick = FunBackTap
        NextTap.onclick = FunNextTap
        SaveUpdate.onclick = Finish
        BtnNameCustomer.onclick = SearchCustomer
        BtnCancelCustomer.onclick = CancelCustomer

        Card_Type.onchange = Card_Type_onchange;
        VatType.onchange = VatType_onchange;
        VatTypeSup.onchange = VatTypeSup_onchange;
        CurrenyID.onchange = CurrenyID_onchange;


        IsCash.onchange = IsCash_onchange

        $('#BtnAddCust').click(function (e) {
            OpenPagePartial("Customer", "Add Customer", () => { });
        });
    }

    function BtnSearchShowPrice_onclick() {

        //sys.FindKey("Invoices", "InvoiceNo", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  2", () => {
        //sys.FindKeySpeed("Invoices", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  2 ", 'SearchForm', () => {
        sys.FindKeyPagination("Invoices", "InvoiceNo", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  2 ", () => {
            let DataRow: I_TR_Sales = SelectDataSearch.DataRow;
            $('#ShowPriceNo').val(DataRow.TrNo)
            $('#ShowPriceID').val(DataRow.SaleID)
            Display_ShowPriceOrJobOrder(DataRow.SaleID)
        });


    }

    function BtnSearchJobOrder_onclick() {


        //sys.FindKey("Invoices", "InvoiceNo", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  3", () => {
        //sys.FindKeySpeed("Invoices", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  3 ", 'SearchForm', () => {   
        //sys.FindKeySpeed("View_JobOrd", " CompCode = " + CompCode + "  and Status = 1   ", 'SearchForm', () => {
        sys.FindKeyPagination("View_JobOrd", "View_JobOrd", " CompCode = " + CompCode + "  and Status = 1   ", () => {
            let DataRow: I_TR_Sales = SelectDataSearch.DataRow;

            $('#JobOrderNo').val(DataRow.TrNo)
            $('#JobOrderID').val(DataRow.SaleID)
            Display_ShowPriceOrJobOrder(DataRow.SaleID, true)

             
            DisplayOutWorks(Number(DataRow.SaleID))
        });


    }

    function Display_ShowPriceOrJobOrder(SaleID, IsJobOrd = false) {

        let data: Array<IQ_TR_Sales> = GetDataFrom("IQ_TR_Sales", " SaleID =  " + SaleID)

        if (data.length > 0) {
            if (IsNew) {
                DisplayDataUpdate(data[0], 0, 0, 0, true);
                NameFunction = "Insert"
            }
            else {



                DeleteAllDetail();
                DisplayDataUpdate(data[0], GlopID, GlopTrNo, 0, true);
                NameFunction = "Update"
            }

            if (IsJobOrd) {
                $('#JobOrderID').val(data[0].SaleID)
                $('#JobOrderNo').val(data[0].TrNo)
                $('#ShowPriceID').val("")
                $('#ShowPriceNo').val("")
            }
            else {
                $('#ShowPriceID').val(data[0].SaleID)
                $('#ShowPriceNo').val(data[0].TrNo)
                $('#JobOrderID').val("")
                $('#JobOrderNo').val("")
            }

            $('#SaleDate').val(GetDate())

        }

    }

    function CancelCustomer() {

        ValidCustomEnter();

    }
    function ValidCustomEnter() {

        $('#CustomerName').val("");
        $('#Mobile').val("");
        $('#CustomerID').val("");
        $('.CancelCust').addClass("display_none");

       
        if ($('#IsCash').val() == 1) {

            $('#CustomerName').removeAttr("disabled");
            $('#Mobile').removeAttr("disabled");

        }
        else {
            $('#CustomerName').attr("disabled", "disabled");
            $('#Mobile').attr("disabled", "disabled");
        }

        setTimeout(function () {

            if (Number($('#CustomerID').val()) != 0) {
                $('.CancelCust').removeClass("display_none");
                $('#CustomerName').attr("disabled", "disabled");
                $('#Mobile').attr("disabled", "disabled");

            }
            else {

                if ($('#IsCash').val() == 1) {

                    $('#CustomerName').removeAttr("disabled");
                    $('#Mobile').removeAttr("disabled");

                }
                else {
                    $('#CustomerName').attr("disabled", "disabled");
                    $('#Mobile').attr("disabled", "disabled");
                }
            }

        }, 500);
    }
    function ValidCustomDataTax() {

        if (TaxLinkedEG == false && TaxLinked == false) {
            return true
        }

        if (Number($('#CustomerID').val()) != 0) {

            let ListData = GetDataFrom("D_Customer", " CustomerId = " + $('#CustomerID').val())


            let CustDetails: D_Customer = new D_Customer();


            if (ListData.length == 0) {
                return
            }

            CustDetails = ListData[0]

            if (CustDetails.ISPersonal == false) {
                GloplInvoiceTransCode = 1
            }
            else {
                GloplInvoiceTransCode = 2
            }

            if (CustDetails.ISPersonal == false && CustDetails.VatNo == null) {

                ShowMessage("Please Check Vat No Of Customer 😒", " 😒 الرجاء التاكد من الرقم الضريبي للعميل");
                return false
            }
            if (TaxLinked == true && CustDetails.ISPersonal == false && (CustDetails.VatNo.length != 15)) {
                ShowMessage("Please Check Vat No Of Customer 15 😒", " 😒 15 الرجاء التاكد من الرقم الضريبي للعميل");
                return false
            }
            if (TaxLinkedEG == true && CustDetails.ISPersonal == false && (CustDetails.VatNo.length != 9)) {
                ShowMessage("Please Check Vat No Of Customer 9 😒", " 😒 9 الرجاء التاكد من الرقم الضريبي للعميل");
                return false
            }

            if ((setVal(CustDetails.Address_postal).trim() == "" || CustDetails.Address_postal == null) && CustDetails.ISPersonal == false) {
                ShowMessage("Please Check Address Postal Of Customer 😒", "😒 الرجاء التاكد من الرقم البريدي للعميل");
                return false
            }
            

            if (setVal(CustDetails.Address_City).trim() == "" && CustDetails.ISPersonal == false) {
                ShowMessage("Please Check Address City Of Customer 😒", "الرجاء التاكد من عنوان المدينة للعميل 😒 ");
                return false
            }
            if (setVal(CustDetails.Address_Province).trim() == "" && CustDetails.ISPersonal == false) {
                ShowMessage("Please Check Address Province Of Customer 😒", "الرجاء التاكد عنوان المحافظه للعميل 😒");
                return false
            }
            if (setVal(CustDetails.Address_Street).trim() == "" && CustDetails.ISPersonal == false) {
                ShowMessage("Please Check Address Street Of Customer 😒", " 😒 الرجاء التاكد عنوان الشارع للعميل");
                return false
            }

            if (TaxLinkedEG) {
                if (setVal(CustDetails.Address_Room).trim() == "" && CustDetails.ISPersonal == false) {
                    ShowMessage("Please Check Address Room Of Customer 😒", " 😒 الرجاء التاكد من رقم المكتب");
                    return false
                }

                if (setVal(CustDetails.Address_BuildingNo).trim() == "" && CustDetails.ISPersonal == false) {
                    ShowMessage("Please Check Address BuildingNo Of Customer 😒", " 😒 الرجاء التاكد من رقم المبني");
                    return false
                }
            }




        }





        return true
    }


    function Get_Data() {

        let TaxAddDedcon = " and  TaxID = -1 ";
        let CurrCon = " and  CurrencyID = -1 ";

        if (TaxLinkedEG == true) {
            TaxAddDedcon = "";
            CurrCon = "";
        }

        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'D_I_Category', Condition: " CompCode = " + CompCode + " and Type_Show in(0,1) " },
                { NameTable: 'D_I_ItemFamily', Condition: " CompCode = " + CompCode },
                //{ NameTable: 'IQ_GetItemInfo', Condition: " CompCode = " + CompCode + "  and TypeUsing in (0,2)    " + WhereCon },
                { NameTable: 'D_A_VatType', Condition: "CompCode = " + CompCode + " and Type = 1 " },
            { NameTable: 'D_G_Currency', Condition: " IsActive = 1 " + CurrCon },
                { NameTable: 'D_G_TaxAddDed', Condition: " IsActive = 1 " + TaxAddDedcon },

            ]
             

        DataResult(Table);
        //************************************************************************************************************** 
        _Category = GetDataTable('D_I_Category');
        _ItemFamily = GetDataTable('D_I_ItemFamily');
        //_IQ_GetItemInfo = GetDataTable('IQ_GetItemInfo');
         
        _D_G_TaxAddDed = GetDataTable('D_G_TaxAddDed');
        let Vat_Type = GetDataTable('D_A_VatType');
        Vat_Type = Vat_Type.sort(dynamicSort("LineOrder"));

        FillDropwithAttr(Vat_Type, "VatType", "VatTypeID", "Describtion", "No", "Prc", "VatPrc");
        VatType_onchange();

         

        FillDropwithAttr(_D_G_TaxAddDed, "VatTypeSup", "TaxID", (Res.Lang == "Ar" ? "TaxDescA" : "TaxDescE"), (Res.Lang == "Ar" ? "بدون ضريبه" : "Not Tax"), "TaxPrc", "TaxPrc", "TaxType", "TaxType");

        VatTypeSup_onchange();
        let D_G_Currency = GetDataTable('D_G_Currency');


        FillDropwithAttr(D_G_Currency, "CurrenyID", "CurrencyID", (Res.Lang == "Ar" ? "DescA" : "DescL"), "No", "CurrencyCode", "CurrencyCode");

        InitializeGrid();

    }
    function Card_Type_onchange() {
        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-Prc');


        ComputeTotal();
    }

    function CurrenyID_onchange() {
         
        const baseCurrency = "EGP";
        let CurCode = $('option:selected', $("#CurrenyID")).attr('data-CurrencyCode');



        if (CurCode == "EGP") {
            $("#Rate_Currency").val("1")
        }
        else {

            // You should replace this URL with your currency exchange rate API endpoint 
            try {

                const apiUrl = `https://v6.exchangerate-api.com/v6/0002285f881a9aebc7356e8d/latest/${CurCode}`;

                $.get(apiUrl, function (data) {
                     
                    const rate = data.conversion_rates[baseCurrency];

                    $("#Rate_Currency").val(Number(rate).toFixed(2))
                })
                    .fail(function (error) {
                        console.error('Error:', error);
                    });

            } catch (e) {

            }
        }


    }
    function VatType_onchange() {

        VatTypePrc.value = $('option:selected', $("#VatType")).attr('data-Prc');
        localStorage.setItem(GetParameterByName('App') + "VatTypePrc", VatTypePrc.value)
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.RowCnt = i;
            ("UnitPrice").F_Change(Grid)
        }
    }

    function VatTypeSup_onchange() {


        if (VatTypeSupPrc.value != "null") {

            let _TaxPrc = Number($('option:selected', $("#VatTypeSup")).attr('data-TaxPrc'));
            $("#VatTypeSupPrc").val(_TaxPrc)

            let Total = $("#ItemsTotal").val();

            $("#txtDedTaxAmount").val(_TaxPrc * Total / 100)

            let txtDedTaxAmount = $("#txtDedTaxAmount").val();

            $("#DedTaxAmountPay").val((Number($("#NetAmount").val()) - txtDedTaxAmount).toFixed(2))
        }
        else {
            $("#VatTypeSupPrc").val('0');
            $("#txtDedTaxAmount").val('0');
            $("#DedTaxAmountPay").val('0');
        }

    }
    function IsCash_onchange() {

        if (IsCash.value == '0') {
            $('.IsCash').addClass('display_none')
        }
        else {
            $('.IsCash').removeClass('display_none')
            GetReceiptType();
        }

        ValidCustomEnter();


    }
    function GetReceiptType() {
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },
            ]
        DataResult(Table);
        let CardType = GetDataTable('D_A_CashTypes');
        FillDropwithAttr(CardType, "Card_Type", "CashTypeID", (Res.Lang == "Ar" ? "Description" : "Description"), "No", "prc", "ChargePrc");
    }
    function InitializeGrid() {

        Grid.ESG.NameTable = 'TableBody';
        Grid.ESG.PrimaryKey = 'ItemUnitID';
        Grid.ESG.Right = false;
        Grid.ESG.Edit = false;
        Grid.ESG.Back = false;
        Grid.ESG.Save = false;
        Grid.ESG.Add = true;
        Grid.ESG.DeleteRow = true;
        Grid.ESG.CopyRow = false;
        Grid.ESG.ModeInsert = true;
        Grid.ESG.OnfunctionSave = Save;
        Grid.ESG.OnfunctionTotal = ComputeTotal;
        //Grid.ESG.OnRowRunFunction = OnRowRunFunction;
        Grid.ESG.OnAddNewRowRunFunction = OnAddNewRowRunFunction;
        Grid.ESG.object = new I_TR_SaleDetails();
        Grid.Column = [
            { title: "SaleDetailID", ID: "SaleDetailID", Name: "SaleDetailID", Type: "number", value: "0", class: " _IsReturnDis", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "SaleID", ID: "SaleID", Name: "SaleID", Type: "number", value: "0", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "الفئة" : "Cat", ID: "CatID", Name: "CatID", Type: "text", value: "", class: "  _IsReturnDis", style: "width: 100%", Edit: true, visible: ISHidenService, Validation: Valid.Set(true, 'Must Select Category', "#CatID#" + "==" + "-1"), ColumnType: ControlType.Dropdown(_Category, "CatID", "DescA", "Select", CatChange) },
            { title: Res.Lang == "Ar" ? "نوع الصنف" : "ItemFamily", ID: "ItemFamilyID", Name: "ItemFamilyID", Type: "text", value: "", class: "  _IsReturnDis", style: "width: 100%", Edit: true, visible: ISHidenService, Validation: Valid.Set(true, 'Must Select ItemFamily', "#ItemFamilyID#" + "==" + "-1"), ColumnType: ControlType.Dropdown([], null, "Select") },
            { title: Res.Lang == "Ar" ? "الصنف" : "Item", ID: "ItemID", Name: "ItemID", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(true, 'Must Select Item'), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "الكود" : "Code", ID: "ItemCode", Name: "ItemCode", Type: "text", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input(SelectItemByCode) },
            { title: Res.Lang == "Ar" ? "الوصف" : "Item_Name", ID: "ItemName", Name: "ItemName", Type: "text", class: "_Width _IsReturnDis ", value: (Res.Lang == "Ar" ? "اختار الصنف" : "Select Item"), style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Button(null, null, SearchItems) },

            { title: Res.Lang == "Ar" ? "الوصف" : "Describtion", ID: "NameItem", Name: "NameItem", Type: "text", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: TaxLinkedEG, Validation: Valid.Set(false), ColumnType: ControlType.Input() },

            { title: Res.Lang == "Ar" ? "وحدة_الصنف" : "Item_Unit", ID: "ItemUnitID", Name: "ItemUnitID", Type: "text", value: "", style: "width: 100px", Edit: true, visible: Type_Items, Validation: Valid.Set(false), ColumnType: ControlType.Dropdown([], null, "ItemUnitID", "Select", SetRate) },
            { title: Res.Lang == "Ar" ? "سعر_الوحدة" : "Unit_Price", ID: "UnitPrice", Name: "UnitPrice", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input(ComputeTotalsRow, ComputeTotalsRow) },
            { title: Res.Lang == "Ar" ? "الكمية" : "Quantity", ID: "Quantity", Name: "Quantity", Type: "number", value: "1", class: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
            { title: Res.Lang == "Ar" ? "الكمية_المتبقية_من_المرتجع" : "RemainRetQty", ID: "RemainRetQty", Name: "RemainRetQty", Type: "number", value: "", class: "", style: "width: 100%", Edit: true, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
            { title: Res.Lang == "Ar" ? "نسبة_الخصم_%" : "DiscPrc_%", ID: "DiscountPrc", Name: "DiscountPrc", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input(() => { CompletOneHandQuantity(false) }, () => { CompletOneHandQuantity(false) }) },
            { title: Res.Lang == "Ar" ? "مبلغ_الخصم" : "DiscAmount", ID: "DiscountAmount", Name: "DiscountAmount", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input(() => { ComputeTotalsRow(true) }, () => { ComputeTotalsRow(true) }) },
            { title: Res.Lang == "Ar" ? "الاجمالي_الخاضع" : "NetUnitPrice", ID: "NetUnitPrice", Name: "NetUnitPrice", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
            { title: Res.Lang == "Ar" ? "نسبة_الضريبة_%" : "VatPrc_%", ID: "VatPrc", Name: "VatPrc", Type: "number", value: VatTypePrc.value, class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "اجمالي_المبلغ" : "Total", ID: "ItemTotal", Name: "ItemTotal", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "اجمالي_الضريبة" : "VatAmount", ID: "VatAmount", Name: "VatAmount", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "الصافي" : "NetAfterVat", ID: "NetAfterVat", Name: "NetAfterVat", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },

            { title: "Rate____", ID: "Rate", Name: "Rate", Type: "number", value: "1", style: "width: 100%", Edit: true, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
            { title: "OneHandQuantity_______", ID: "OneHandQuantity", Name: "OneHandQuantity", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "_", ID: "_ItemFamilyID", Name: "ItemFamilyID", Type: "number", value: "", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false, 'Must Select Item'), ColumnType: ControlType.Input() },
            { title: "_", ID: "_ItemUnitID", Name: "ItemUnitID", Type: "number", value: "", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false, 'Must Select Item'), ColumnType: ControlType.Input() },
            { title: "CostPrice________", ID: "CostPrice", Name: "CostPrice", Type: "number", value: "", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input(ComputeTotalsRow, ComputeTotalsRow) },
        ]
        //Validation: Valid.Set(true, 'ياحمار', "#Is_Active#" + "==" + "true")

        BindGridControl(Grid);

    }

    function OnAddNewRowRunFunction() {

        Grid.ESG.RowCnt = Grid.ESG.LastCounter - 1;
        let IDGridItemFamily = ('ItemFamilyID').Get_ID(Grid)
        let CatID = ('CatID').Get_ID(Grid)
        $("#" + CatID).prop("selectedIndex", 1);


        let data_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(('CatID').Get_Val(Grid)))

        if (data_ItemFamily.length > 0) {
            FillDropwithAttr(data_ItemFamily, IDGridItemFamily, "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), "No", "", "");
        }
        else {
            $('#' + IDGridItemFamily + '').html('<option value="-1">Select</option>');
        }


    }
    function ComputeTotalsRow(IsDiscAmount: boolean = true) {

         

        if (IsReturn) {

            if (Number(('Quantity').Get_Val(Grid)) > Number(('RemainRetQty').Get_Val(Grid))) {
                ('Quantity').Set_Val(('RemainRetQty').Get_Val(Grid), Grid)
                let Id = ('Quantity').Get_ID(Grid)
                Errorinput($('#' + Id), "You cannot exceed the remaining quantity. 😒 ", " لا يمكنك تجاوز الكميه المتبقيه 😒")

            }

        }

        if (Number(('Quantity').Get_Val(Grid)) < 0) {

            ('Quantity').Set_Val("0", Grid)
            let Id = ('Quantity').Get_ID(Grid)
            Errorinput($('#' + Id), "Must Enter quantity. 😒 ", " يجب ادخال الكميه")

        }





        let txtDiscountAmount = Number(('DiscountAmount').Get_Val(Grid));;
        let txtPrice = Number(('UnitPrice').Get_Val(Grid));
        let txtDiscountPrc = Number(('DiscountPrc').Get_Val(Grid));

        if (IsDiscAmount) {
             
            let txtPrice = Number(('UnitPrice').Get_Val(Grid));


            ('DiscountPrc').Set_Val(Number(((txtDiscountAmount / txtPrice) * 100).toFixed(1)).toFixed(2), Grid);
        }
        else {
            ('DiscountAmount').Set_Val(((txtDiscountPrc * txtPrice) / 100).toFixed(2), Grid);
        }




        let HandQuant = Number(('Quantity').Get_Val(Grid)) * Number(('Rate').Get_Val(Grid));


        ('OneHandQuantity').Set_Val(HandQuant.toFixed(2), Grid);



        ('NetUnitPrice').Set_Val(Number((txtPrice - txtDiscountAmount).toFixed(4)).toFixed(2), Grid);
        //let VatPrc = Number(('VatPrc').Set_Val_From_localStor("VatTypePrc", Grid))
        let VatPrc = Number(localStorage.getItem(GetParameterByName('App') + "VatTypePrc"));
        ('VatPrc').Set_Val(VatPrc.toFixed(2), Grid);

         

        var txtQuantityValue = ('Quantity').Get_Val(Grid)
        var txtPriceValue = ('NetUnitPrice').Get_Val(Grid)




        var total = Number(txtQuantityValue) * Number(txtPriceValue);
        //let VatPrc = Number(('VatPrc').Get_Val(Grid))


        var _vatAmount = Number((Number(total) * VatPrc / 100).toFixed(4)).toFixed(2);

        ('VatAmount').Set_Val((_vatAmount), Grid)
        var total = Number(txtQuantityValue) * Number(txtPriceValue);
        ('ItemTotal').Set_Val((total).toFixed(2), Grid)

        var totalAfterVat = Number(_vatAmount) + Number(total.toFixed(2));

        ('NetAfterVat').Set_Val(Number((totalAfterVat).toFixed(4)).toFixed(2), Grid)

        SetRate();


         
        ComputeTotal();

    }

    function SelectItemByCode() {
         
        let ID_ItemCode = ('ItemCode').Get_ID(Grid);

        //ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemCode.trim().toLowerCase() == $('#' + ID_ItemCode).val().trim().toLowerCase())
        ItemUnits = GetItemInfoByItemCode($('#' + ID_ItemCode).val().trim().toLowerCase(), CompCode, WhereCon, "2")

        if (ItemUnits.length == 0) {
            Errorinput($('#' + ID_ItemCode), " Error Code 😒", "خطا في كود 😒 ");
            ('ItemCode').Set_Val("", Grid);
            ('ItemID').Set_Val("", Grid);
            ('ItemName').html("اختار الصنف", Grid);
            ('NameItem').html("اختار الصنف", Grid);
            ('UnitPrice').Set_Val("0", Grid);
            ('Quantity').Set_Val("0", Grid);
            return
        }

        ('CatID').Set_Val(ItemUnits[0].CatID.toString(), Grid);

        CatChange();

        ('ItemID').Set_Val(ItemUnits[0].ItemID.toString(), Grid);
        ('ItemName').html(ItemUnits[0].ItemName, Grid);
       
        ('NameItem').html(ItemUnits[0].ItemName, Grid);
        ('UnitPrice').Set_Val(ItemUnits[0].UnitPrice.toString(), Grid);
        ('Quantity').Set_Val("1", Grid);



        let IDGridUnit = ('ItemUnitID').Get_ID(Grid);
        if (ItemUnits.length > 0) {
            FillDropwithAttr(ItemUnits, IDGridUnit, "ItemUnitID", (Res.Lang == "Ar" ? "UnitDescA" : "UnitDescA"), "No", "", "");
            ('Rate').Set_Val(ItemUnits[0].Rate.toString(), Grid)
        }
        else {
            $('#' + IDGridUnit + '').html('<option value="-1">Select</option>');
        }

        ComputeTotalsRow();

        let Qty = ('Quantity').Get_ID(Grid);
        $('#' + Qty + '').focus()

    }
    function ComputeTotal() {
         
        let Total = Grid.ESG.TotalModel as I_TR_SaleDetails
        $('#ItemsTotal').val((Total.ItemTotal - Total.DiscountAmount).toFixed(2))
        $('#Discount').val((Total.DiscountAmount * Total.Quantity).toFixed(2))
        //$('#TotalAmount').val(Number((Total.UnitPrice * Total.Quantity) - (Total.DiscountAmount * Total.Quantity)).toFixed(2))    
        $('#TotalAmount').val(Number((Total.ItemTotal)).toFixed(2))
        $('#VatAmount').val(Total.VatAmount.toFixed(2))
        $('#NetAmount').val(Total.NetAfterVat.toFixed(2))
        //


        let _ItemsTotal = 0;
        let _Discount = 0;
        let _VatAmount = 0;
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.UnCnt = i;
            let Status = ('StatusFlag').Get_StatusFlag(Grid)
            if (Status == 'd' || Status == 'm') {
                continue
            }


            _ItemsTotal = _ItemsTotal + (Number($("#TableBody_UnitPrice" + i).val()) * Number($("#TableBody_Quantity" + i).val()))
            _Discount = _Discount + (Number($("#TableBody_DiscountAmount" + i).val()) * Number($("#TableBody_Quantity" + i).val()))
            _VatAmount = _VatAmount + (Number($("#TableBody_VatAmount" + i).val()))
        }

        $('#ItemsTotal').val(_ItemsTotal.toFixed(2))
        $('#Discount').val(_Discount.toFixed(2))
        $('#TotalAmount').val((Number($('#ItemsTotal').val()) - Number($('#Discount').val())).toFixed(2))
        $('#VatAmount').val(_VatAmount.toFixed(2))





        let TotalOutWorks = 0;

        if (_GridOutWorks.DataSource != undefined) {
            for (var i = 0; i < _GridOutWorks.DataSource.length; i++) {
                TotalOutWorks = TotalOutWorks + _GridOutWorks.DataSource[i].DueAmount;
            }
        }


        $('#ExternalAmount').val(TotalOutWorks.toFixed(2))

        $('#NetAmount').val((TotalOutWorks + Total.NetAfterVat).toFixed(2))

        let Net = TotalOutWorks + Total.NetAfterVat
        let due = (Net + ((Net * Number(Txt_CardPrc.value)) / 100)) 
        $('#NetAmount').val(due)

        VatTypeSup_onchange();

    }
    function OverReadDisplay(Is_DetailInsert = false) {

        for (var i = 0; i < Grid.ESG.LastCounter; i++) {

            Grid.ESG.RowCnt = i;
            let ValItemFamilyID = ('_ItemFamilyID').G_F_Val(Grid)
            let ValItemUnitID = ('_ItemUnitID').G_F_Val(Grid)
            let ValCatID = ('CatID').G_F_Val(Grid)
             


            let data_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(('CatID').G_F_Val(Grid)))
            let IDGridItemFamily = ('ItemFamilyID').G_F_ID(Grid);
            if (data_ItemFamily.length > 0) {
                FillDropwithAttr(data_ItemFamily, IDGridItemFamily, "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), "No", "", "");
            }
            else {
                $('#' + IDGridItemFamily + '').html('<option value="-1">Select</option>');
            }
            //***********************************************************************    
            //ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemID == Number(('ItemID').G_F_Val(Grid)))
            ItemUnits = GetItemInfoByItemID(Number(('ItemID').G_F_Val(Grid)), CompCode, WhereCon, "2")


            let IDGridUnit = ('ItemUnitID').G_F_ID(Grid);
            if (ItemUnits.length > 0) {
                FillDropwithAttr(ItemUnits, IDGridUnit, "ItemUnitID", (Res.Lang == "Ar" ? "UnitDescA" : "UnitDescA"), "No", "", "");

            }
            else {
                $('#' + IDGridUnit + '').html('<option value="-1">Select</option>');
            }
            ('ItemFamilyID').S_F_Val(ValItemFamilyID, Grid);
            ('ItemUnitID').S_F_Val(ValItemUnitID, Grid);



            let __ItemFamilyID__ = ('ItemFamilyID').G_F_ID(Grid);
            let __ItemUnitID__ = ('ItemUnitID').G_F_ID(Grid);
            let __CatID__ = ('CatID').G_F_ID(Grid);
             
            setTimeout(function () {
                $('#' + __CatID__ + '').val(ValCatID);
                $('#' + __CatID__ + '').change();
                $('#' + __ItemFamilyID__ + '').val(ValItemFamilyID);
                $('#' + __ItemUnitID__ + '').val(ValItemUnitID);
            }, 500);



            if (IsReturn) {
                ('Quantity').S_F_Val(('RemainRetQty').G_F_Val(Grid), Grid);
            }


            if (Is_DetailInsert) {

                $('#StatusFlag_TableBody_' + i).val('i')
            }
             
            if (IsReturn == true && NameFunction == "Insert") {
                $('#StatusFlag_TableBody_' + i).val('i')
                $('#Quantity_TableBody_' + i).change();
            }

        }



    }

    function DeleteAllDetail() {
        ModelDetailsListDelete = new Array<I_TR_SaleDetails>();
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.RowCnt = i;
            let StatusFlag = $('#StatusFlag_TableBody_' + i).val()
            let ModelDetaROWDelete = new I_TR_SaleDetails();
            if (StatusFlag != 'm') {

                ModelDetaROWDelete.SaleDetailID = Number($('#TableBody_SaleDetailID0').val());
                ModelDetaROWDelete.StatusFlag = "d";

                ModelDetailsListDelete.push(ModelDetaROWDelete);
            }

        }
    }
    function CatChange() {
        let data_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(('CatID').Get_Val(Grid)))
        let IDGridItemFamily = ('ItemFamilyID').Get_ID(Grid);
        if (data_ItemFamily.length > 0) {
            FillDropwithAttr(data_ItemFamily, IDGridItemFamily, "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), "No", "", "");
        }
        else {
            $('#' + IDGridItemFamily + '').html('<option value="-1">Select</option>');
        }

    }
    function CompletOneHandQuantity(IsDiscAmount: boolean = true, IsValid: boolean = false) {
        let itemID = Number(('ItemID').Get_Val(Grid));
        let DataRow: Array<IQ_ViewItems> = GetDataFrom("IQ_ViewItems", "ItemID = " + itemID + " ");
        let HandQty = 0;
        if (DataRow.length > 0) {
            HandQty = DataRow[0].OneHandQuantity;
        }
        if (HandQty >= Number(('Quantity').Get_Val(Grid))) {
            let HandQuant = Number(('Quantity').Get_Val(Grid)) * Number(('Rate').Get_Val(Grid));
            ('OneHandQuantity').Set_Val(HandQuant.toFixed(2), Grid)
            ComputeTotalsRow(IsDiscAmount);
            return true
        } else {
            ShowMessage("Available Quantity is " + HandQty + "", "الكمية المتاحة " + HandQty + "");
            if (!IsValid) {

                ('Quantity').Set_Val(HandQty.toFixed(2), Grid);
                let HandQuant = Number(('Quantity').Get_Val(Grid)) * Number(('Rate').Get_Val(Grid));
                ('OneHandQuantity').Set_Val(HandQuant.toFixed(2), Grid)
                ComputeTotalsRow(IsDiscAmount);
            }
            else {
                let idQty = ('Quantity').Get_ID(Grid);
                Errorinput($('#' + idQty))
            }

            return false
        }

        return true
    }


    function SetRate() {

        let DataUnit = ItemUnits.filter(x => x.UnitID == Number(('ItemUnitID').Get_Val(Grid)));

        if (DataUnit.length > 0) {
            ('Rate').Set_Val(DataUnit[0].Rate.toFixed(2), Grid)
        }

    }
    function SearchItems() {
        let CatID = Number(('CatID').Get_Val(Grid))
        let ItemFamilyID = Number(('ItemFamilyID').Get_Val(Grid))
        //sys.FindKey("Items", "btnItems", " CompCode = " + CompCode + "  and ISActive = 1    " + WhereCon + " and CatID = " + CatID + " and ItemFamilyID = " + ItemFamilyID, () => {
        //sys.FindKeySpeed("Items", " CompCode = " + CompCode + "  and ISActive = true  " + WhereConRedis + "   and CatID = " + CatID + " and ItemFamilyID = " + ItemFamilyID, 'SearchForm', () => {
        sys.FindKeyPagination("Items", "btnItems", " CompCode = " + CompCode + "  and ISActive = 1  " + WhereConRedis + "   and CatID = " + CatID + " and ItemFamilyID = " + ItemFamilyID, () => {


            let DataRow: IQ_ViewItems = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
             
            ('ItemCode').Set_Val(DataRow.ItemCode.toString(), Grid);
            ('ItemID').Set_Val(DataRow.ItemID.toString(), Grid);
            ('ItemName').html(DataRow.ItemName, Grid);
            ('NameItem').Set_Val(DataRow.ItemName, Grid);
            ('UnitPrice').Set_Val(DataRow.UnitPrice.toString(), Grid);
            ('Quantity').Set_Val("1", Grid);


            //ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemID == DataRow.ItemID)
            ItemUnits = GetItemInfoByItemID(DataRow.ItemID, CompCode, WhereCon, "2")

            let IDGridUnit = ('ItemUnitID').Get_ID(Grid);
            if (ItemUnits.length > 0) {
                FillDropwithAttr(ItemUnits, IDGridUnit, "ItemUnitID", (Res.Lang == "Ar" ? "UnitDescA" : "UnitDescA"), "No", "", "");
                ('Rate').Set_Val(ItemUnits[0].Rate.toString(), Grid)
            }
            else {
                $('#' + IDGridUnit + '').html('<option value="-1">Select</option>');
            }

            ComputeTotalsRow();

            let Qty = ('Quantity').Get_ID(Grid);
            $('#' + Qty + '').focus()
            $('#' + Qty + '').change()
            setTimeout(function () {
                $('#' + Qty + '').focus()
                $('#' + Qty + '').change()
            }, 100);

        });
    }
    function SearchCustomer() {
        //and IsCreditCustomer = " + IsCredit
        //let IsCredit = IsCash.value == "1" ? "0" : "1"
        //  sys.FindKey("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
        //sys.FindKeySpeed("Customer", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', () => {
        //sys.FindKeySpeed("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
        sys.FindKeyPagination("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {

            let SelectedItem = SelectDataSearch.DataRow
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            ValidCustomEnter();
            $('#CustomerID').val(SelectedItem.CustomerId);
            $('#CustomerName').val(SelectedItem.NAMEA);
            $('#Mobile').val(SelectedItem.MOBILE);


            $('#CarBrand').val(SelectedItem.CarBrand)
            $('#CarNo').val(SelectedItem.CarNo)
            $('#DestructionKm').val(SelectedItem.DestructionKm)
            $('#ChassisNo').val(SelectedItem.ChassisNo)
            $('#EngineerName').val(SelectedItem.EngineerName)



        });
    }

    function FunNextTap() {

        if (!Validation()) {
            return
        }

        $('.TapMaster').addClass('display_none')
        $('.TapDetails').removeClass('display_none')
        $('._OutWorks').addClass('display_none')

         
        if (dataOutWorks.length > 0) {
            $('._OutWorks').removeClass('display_none')
        }

        $('#NextTap').addClass('display_none')
        $('#BackTap').removeClass('display_none')
        $('#SaveUpdate').removeClass('display_none')
        $('#SaveUpdate').focus();
    }
    function FunBackTap() {
        $('.TapMaster').removeClass('display_none')
        $('.TapDetails').addClass('display_none')
        $('._OutWorks').addClass('display_none')

        $('#NextTap').removeClass('display_none')
        $('#BackTap').addClass('display_none')
        $('#SaveUpdate').addClass('display_none')
        $('#NextTap').focus();
    }
    function Clear() {
        $('._Clear').val('')
        //$('#ItemFamilyID').val('null')
        ClearGridControl(Grid);
        FunBackTap();

    }
    function Validation() {
        //if ($('#ReNo').val().trim() == '') {
        //    Errorinput($('#ReNo'), 'Must Enter Po.No 😒', 'يجب إدخال رقم المرجع 😒')
        //    return false
        //}


         
        if ($('#CustomerName').val().trim() == "") {
            Errorinput($('#CustomerName'), 'Must Enter Customer 😒', 'يجب إدخال العميل 😒')
            return false
        }

        if (($('#Card_Type').val() ?? '') == "") {
            Errorinput($('#Card_Type'), 'Must Selct  Card Type 😒', 'يجب اختيار نوع البطاقة 😒')
            return false
        }







        if (Is_CarCenter) {

            if ($('#CarBrand').val().trim() == "") {
                Errorinput($('#CarBrand'), 'Must Enter CarBrand 😒', 'يجب إدخال ماركة السيارة 😒')
                return false
            }

            if ($('#CarNo').val().trim() == "") {
                Errorinput($('#CarNo'), 'Must Enter CarNo 😒', 'يجب إدخال رقم لوحة السيارة 😒')
                return false
            }


            if ($('#EngineerName').val().trim() == "") {
                Errorinput($('#EngineerName'), 'Must Enter EngineerName 😒', 'يجب إدخال اسم المهندس 😒')
                return false
            }

        }



        if (!ValidCustomDataTax()) {
            return false
        }


        if (IsReturn) {
            if ($('#Remarks').val().trim() == "") {
                Errorinput($('#Remarks'), 'Must Enter Remarks 😒', 'يجب إدخال الملاحظات 😒')
                return false
            }
        }

        return true
    }

    function ValidationGrid() {

         
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.UnCnt = i;
            let Status = ('StatusFlag').Get_StatusFlag(Grid)
            if (Status == 'd' || Status == 'm') {
                continue
            }

            if (Is_CarCenter) {

                if (!CompletOneHandQuantity(true, true)) {
                    return false;
                }
                
            }

           

        }

        return true;

    }
    function Assign() {
        debugger
        ModelMaster = new I_TR_Sales();
        ModelMaster.TrNo = Number(Txt_TrNo.value);
        ModelMaster.RefID = GlopRefID;
        ModelMaster.SaleID = GlopID;
        ModelMaster.DoNo = GlopDoNo;
        ModelMaster.CompCode = CompCode;
        ModelMaster.TrType = TrType;
        ModelMaster.ReNo = ($('#ReNo').val());
        ModelMaster.purchaseorderDesc = ($('#purchaseorderDesc').val());
        ModelMaster.CurrenyID = Number($('#CurrenyID').val());
        ModelMaster.CustomerID = Number($('#CustomerID').val());
        ModelMaster.SalesManID = Number($('#dropTechnical').val());
        ModelMaster.CustomerName = ($('#CustomerName').val());
        ModelMaster.Rate_Currency = Number($('#Rate_Currency').val());
        ModelMaster.ChargePrc = Number($('#Txt_CardPrc').val());
        ModelMaster.Mobile = ($('#Mobile').val());
        ModelMaster.Status = Number($('#Status').val());
        ModelMaster.IsCash = Number($('#IsCash').val()) == 1 ? true : false;
        ModelMaster.SaleDate = $('#SaleDate').val()
        ModelMaster.VatTypeID = Number($("#VatType").val())
        ModelMaster.TrTime = GetTimeNumber()
        if (SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 0 || SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 1) {
            ModelMaster.IsService = false

        }
        else {
            ModelMaster.IsService = true
        }

        ModelMaster.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
        ModelMaster.InvoiceTransCode = GloplInvoiceTransCode
        ModelMaster.TaxStatus = -1
        ModelMaster.Status = SysSession.CurrentPrivileges.CUSTOM3 == true ? 1 : 0;


        ModelMaster.ShowPriceID = $('#ShowPriceID').val()
        ModelMaster.ShowPriceNo = $('#ShowPriceNo').val()
        ModelMaster.JobOrderID = $('#JobOrderID').val()
        ModelMaster.JobOrderNo = $('#JobOrderNo').val()
        //ModelMaster.CurrenyID = 1;



        ModelMaster.ItemsTotal = Number($("#ItemsTotal").val())
        ModelMaster.Discount = Number($("#Discount").val())
        ModelMaster.TotalAmount = $('#TotalAmount').val()
        ModelMaster.VatAmount = Number($("#VatAmount").val())
        ModelMaster.ExternalAmount = Number($("#ExternalAmount").val())
        ModelMaster.NetAmount = $('#NetAmount').val();
        ModelMaster.VatTypeID = Number(VatType.value);

        if (Number($('#IsCash').val()) == 1) {
            ModelMaster.PaymentAmount = $('#NetAmount').val();
            ModelMaster.CashType = Number(Card_Type.value);

        } else {
            ModelMaster.PaymentAmount = 0;
            ModelMaster.CashType = null;
        }
        ModelMaster.RemainAmount = $('#RemainAmount').val()
        ModelMaster.Remarks = $('#Remarks').val().trim()

        ModelMaster.CarBrand = $('#CarBrand').val().trim()
        ModelMaster.CarNo = $('#CarNo').val().trim()
        ModelMaster.DestructionKm = $('#DestructionKm').val().trim()
        ModelMaster.ChassisNo = $('#ChassisNo').val().trim()
        ModelMaster.EngineerName = $('#EngineerName').val().trim()



        ModelMaster.TaxID = Number($("#VatTypeSup").val());
        ModelMaster.TaxPrc = Number($("#VatTypeSupPrc").val());
        ModelMaster.DedTaxAmount = Number($("#txtDedTaxAmount").val());


        ModelDetails = new Array<I_TR_SaleDetails>();
        ModelDetails = Grid.ESG.Model;
        if (NameFunction == "Insert") {
            ModelMaster.CreatedAt = GetDateAndTimeSql();
            ModelMaster.CreatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
            ModelMaster.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID
        }
        else {
            ModelMaster.CreatedAt = Glopl_CreatedAt
            ModelMaster.CreatedBy = Glopl_CreatedBy
            ModelMaster.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID

            ModelMaster.UpdatedAt = GetDateAndTimeSql();
            ModelMaster.UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;

        }
        _MasterDetails.Master = ModelMaster

        for (var i = 0; i < ModelDetails.length; i++) {


            //ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemUnitID == ModelDetails[i].ItemUnitID)
            ItemUnits = GetItemInfoByItemUnitID(ModelDetails[i].ItemUnitID, CompCode, WhereCon, "2")
            //ModelDetails[i].Rate = 1
            //ModelDetails[i].ItemUnitID = null

            if (ItemUnits.length > 0) {
                ModelDetails[i].Rate = ItemUnits[0].Rate
                ModelDetails[i].CostPrice = ItemUnits[0].CostPrice
            }


            ModelDetails[i].VatTypeID = Number(VatType.value);


        }

        if (IsReturn == true && NameFunction == "Insert") {
            ModelDetails = ModelDetails.filter(d => d.StatusFlag != "d")
        }



        _MasterDetails.Details = ModelDetails



        for (var i = 0; i < ModelDetailsListDelete.length; i++) {
            _MasterDetails.Details.push(ModelDetailsListDelete[i])
        }


    }
    function Finish() {
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒")
            return
        }
         
        if (!ValidationGrid()) {
            return false
        }


        SaveGridControl(Grid);
    }
    function Save() {
        Assign();

        debugger

        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("SalesTax", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(_MasterDetails) }),
            success: (d) => {
                debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    Clear();
                    $("#Display_Back_Page").click();
                    $('#Back_Page').click();        
                    Close_Loder();
                    if (NameFunction == "Insert") {
                        ShowMessage("Inserted 🤞😉", "تم الاضافه 🤞😉");
                    }
                    else {
                        ShowMessage("Updated 🤞😉", "تم التعديل 🤞😉");
                    }

                } else {

                }
            }
        });

    }

    //************************************************OutWorks*************************

    function InitializeGridOutWorks() {
        _GridOutWorks.ElementName = "_GridOutWorks";
        _GridOutWorks.PrimaryKey = "TransactionID";
        _GridOutWorks.Paging = true;
        _GridOutWorks.PageSize = 15;
        _GridOutWorks.Sorting = true;
        _GridOutWorks.InsertionMode = JsGridInsertionMode.Binding;
        _GridOutWorks.Editing = false;
        _GridOutWorks.Inserting = false;
        _GridOutWorks.SelectedIndex = 1;
        _GridOutWorks.OnItemEditing = () => { };
        _GridOutWorks.Columns = [
            { title: Res.Lang == "En" ? "TransactionID" : "الكود", name: "TransactionID", visible: false, width: "7%" },
            { title: Res.Lang == "En" ? "TrNo" : "رقم السند", name: "TrNo", type: "text", width: "6%" },
            {
                title: Res.Lang == "En" ? "Tr.Date" : "التاريخ", css: "TransactionDate", name: "IsCash", width: "8%",
                itemTemplate: (s: string, item: I_TR_ExternalLabor): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

                    txt.innerHTML = DateFormat(item.TransactionDate)

                    return txt;
                }
            },
            { title: Res.Lang == "En" ? "Remarks" : "ملاحظات", name: "Remarks", type: "text", width: "15%" },
            { title: Res.Lang == "En" ? "Amount" : "المبلغ", name: "Amount", type: "text", width: "8%" },
            //{
            //    title: Res.Lang == "En" ? "Amount" : "المبلغ", css: "TransactionDate", name: "Amount", width: "8%",
            //    itemTemplate: (s: string, item: I_TR_ExternalLabor): HTMLInputElement => {
            //        let txt: HTMLInputElement = document.createElement("input"); 
            //        txt.value = item.Amount.toFixed(2) 
            //        return txt;
            //    }
            //}, 
            {
                title: Res.Lang == "En" ? "NetDue" : "المستحق", css: "TransactionDate", name: "DueAmount", width: "8%",
                itemTemplate: (s: string, item: I_TR_ExternalLabor): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.classList.add("form-control");
                    txt.style.textAlign = "center";
                    txt.value = item.DueAmount.toFixed(2)

                    txt.onchange = () => {
                        SqlExecuteQuery("update [I_TR_ExternalLabor]  set DueAmount =  " + txt.value + "  where TransactionID = " + item.TransactionID);

                        item.DueAmount = Number(txt.value);

                        ComputeTotal();

                        ShowMessage("Done Update DueAmount 💵😊", "💵😊 تم تحديث المبلغ المستحق")
                    }

                    return txt;
                }
            },




        ];
        _GridOutWorks.Bind();

    }

    function DisplayOutWorks(JobOrderID: Number) {

         

        dataOutWorks = new Array<I_TR_ExternalLabor>();

        $('._OutWorks').addClass('display_none')

        if (JobOrderID == 0) {
            return
        }

        dataOutWorks = GetDataFrom("I_TR_ExternalLabor", "   Status = 1 and InvoiceID = " + JobOrderID)

        dataOutWorks = dataOutWorks.sort(dynamicSort("SaleID"));
        _GridOutWorks.DataSource = dataOutWorks;
        _GridOutWorks.Bind();

        ComputeTotal();


    }

}
