$(document).ready(() => {
    ShowPrice.InitalizeComponent();
});
var ShowPrice;
(function (ShowPrice) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Grid = new ESGrid();
    var _Category = new Array();
    var _ItemFamily = new Array();
    var _IQ_GetItemInfo = new Array();
    var ModelMaster = new I_TR_Sales();
    var _MasterDetails = new MasterDetails();
    var ModelDetails = new Array();
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Units = new Array();
    var ItemUnits = new Array();
    var BackTap;
    var NextTap;
    var SaveUpdate;
    var BtnNameCustomer;
    var BtnSalesManID;
    var BtnCancelCustomer;
    var BtnCancelSalesMan;
    var PayAmount;
    var Txt_CardPrc;
    var VatTypePrc;
    var Txt_TrNo;
    var txt_Discount;
    var Card_Type;
    var VatType;
    var IsCash;
    var PaymentTerms;
    //var PaymentType: HTMLInputElement;
    var ExpiryEnd;
    var DeliveryTime;
    var Warrantyperiod;
    var TrType = 2;
    var UpdatedAt = "";
    var UpdatedBy = "";
    var NameFunction = "Insert";
    var GlopDoNo = "";
    var GlopID = 0;
    var GlopRefID = 0;
    var GloplInvoiceTransCode = 2;
    var Glopl_CreatedAt = "";
    var Glopl_CreatedBy = "";
    var Glopl_IDUserCreate = 0;
    var IsReturn = false;
    var ISHidenService = true;
    var Type_Items = false;
    var WhereCon = "";
    var WhereConRedis = "";
    var Is_CarCenter = SysSession.CurrentEnvironment.I_Control.Is_CarCenter;
    function InitalizeComponent() {
        debugger;
        if (Is_CarCenter) {
            $('._CenterCar').removeClass('display_none');
            $('._Is_CarCenterNot').addClass('display_none');
        }
        if (SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 2 || SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 3) {
            WhereCon = " and IsService = 1";
            WhereConRedis = " and IsService = true";
        }
        if (SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 1) {
            WhereCon = " and IsService = 0";
            WhereConRedis = " and IsService = false";
        }
        ISHidenService = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 2 ? false : true;
        let stat = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items;
        if (stat == 2 || stat == 3) {
            Type_Items = false;
        }
        else {
            Type_Items = true;
        }
        InitalizeControls();
        InitializeEvents();
        IsReturn = localStorage.getItem(GetParameterByName('App') + "TypePage") == "2" ? true : false;
        Get_Data();
        $('#Status').val("1");
        $('#SaleDate').val(GetDate());
        $('#ExpiryEnd').val(GetDate());
        ValidCustomEnter();
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1" || localStorage.getItem(GetParameterByName('App') + "TypePage") == "2") {
            DisplayDataUpdate();
        }
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "2") { // ModeAddReturn  
            IsReturn = true;
            ModeAddReturn();
        }
        localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
        //**********************
        Close_Loder();
    }
    ShowPrice.InitalizeComponent = InitalizeComponent;
    function DisplayDataUpdate() {
        NameFunction = "Update";
        let data = GetModelGlopel();
        GlopID = data.SaleID;
        TrType = data.TrType;
        GlopRefID = data.RefID;
        GlopDoNo = data.DoNo;
        GloplInvoiceTransCode = data.InvoiceTransCode;
        $('#Txt_TrNo').val(data.TrNo);
        $('#ReNo').val(data.ReNo);
        $('#purchaseorderDesc').val(data.purchaseorderDesc);
        $('#CustomerID').val(data.CustomerID);
        $('#SalesManID').val(data.SalesManID);
        $('#AttachName').val(data.AttatchName);
        $('#SalesManMobile').val(data.SalesManMobile);
        $('#CustomerName').val(data.CustomerName);
        $('#SalesManName').val(data.SalesManName);
        $('#Mobile').val(data.Mobile);
        $('#Status').val(data.Status);
        $('#IsCash').val(data.IsCash == true ? 1 : 0);
        $('#SaleDate').val(DateFormat(data.SaleDate));
        $('#VatType').val(data.VatTypeID);
        $('#ItemsTotal').val(data.ItemsTotal);
        $('#Discount').val(data.Discount);
        $('#TotalAmount').val(data.TotalAmount);
        $('#VatAmount').val(data.VatAmount);
        $('#NetAmount').val(data.NetAmount);
        $('#PaymentAmount').val(data.PaymentAmount);
        $('#RemainAmount').val(data.RemainAmount);
        $('#Remarks').val(data.Remarks);
        $('#PaymentTerms').val(data.PaymentTerms);
        //$('#PaymentType').val(data.PaymentType);
        $('#ExpiryEnd').val(data.ExpiryTime);
        $('#DeliveryTime').val(data.DeliveryTime);
        $('#Warrantyperiod').val(data.Warrantyperiod);
        $('#CarBrand').val(data.CarBrand);
        $('#CarNo').val(data.CarNo);
        $('#DestructionKm').val(data.DestructionKm);
        $('#ChassisNo').val(data.ChassisNo);
        $('#EngineerName').val(data.EngineerName);
        if (IsCash.value == '0') {
            $('.IsCash').addClass('display_none');
        }
        else {
            $('.IsCash').removeClass('display_none');
            GetReceiptType();
        }
        if (data.CashType != null) {
            Card_Type.value = data.CashType.toString();
        }
        txt_Discount.value = data.Discount.toString();
        VatType.value = data.VatTypeID.toString();
        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-Prc');
        VatTypePrc.value = $('option:selected', $("#VatType")).attr('data-Prc');
        localStorage.setItem(GetParameterByName('App') + "VatTypePrc", VatTypePrc.value);
        UpdatedAt = GetDateAndTimeSql();
        UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
        Glopl_CreatedAt = data.CreatedAt.toString();
        Glopl_CreatedBy = data.CreatedBy.toString();
        Glopl_IDUserCreate = data.IDUserCreate;
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
        if (data.SalesManID != 0) {
            $('.CancelSalesMan').removeClass("display_none");
        }
        let Listdata;
        if (IsReturn) {
            if (TrType == 2) {
                GlopRefID = data.SaleID;
                let Listdata = GetDataFrom('IQ_TR_SaleDetails', "  RemainRetQty > 0 and SaleID = " + data.SaleID);
            }
            else {
                Listdata = GetDataFrom('IQ_TR_SaleDetails', " SaleID = " + data.SaleID);
            }
        }
        else {
            Listdata = GetDataFrom('IQ_TR_SaleDetails', " SaleID = " + data.SaleID);
        }
        setTimeout(function () {
            if (Listdata.length > 0) {
                Grid.ESG.ModeUpdate = true;
                DisplayDataGridControl(Listdata, Grid);
                OverReadDisplay();
            }
            if (TrType == 1) {
                ModeUpdateReturn();
            }
            Close_Loder();
        }, 500);
    }
    function ModeAddReturn() {
        TrType = 1;
        $('#Txt_TrNo').val("");
        $('#ReNo').val("");
        $('#purchaseorderDesc').val("");
        $('#DeliveryTime').val("");
        $('#Warrantyperiod').val("");
        $('#ExpiryEnd').val("");
        //$('#PaymentType').val("")
        $('#PaymentTerms').val("");
        $('#Remarks').val("");
        $('#btnAdd_TableBody').addClass("display_none");
        $('#SaleDate').val(GetDate());
        $('._IsReturnDis').attr("disabled", "disabled");
        NameFunction = "Insert";
    }
    function ModeUpdateReturn() {
        $('#btnAdd_TableBody').addClass("display_none");
        $('._IsReturnDis').attr("disabled", "disabled");
        NameFunction = "Update";
    }
    function InitalizeControls() {
        BackTap = document.getElementById('BackTap');
        NextTap = document.getElementById('NextTap');
        SaveUpdate = document.getElementById('SaveUpdate');
        BtnNameCustomer = document.getElementById('BtnNameCustomer');
        BtnCancelCustomer = document.getElementById('BtnCancelCustomer');
        BtnSalesManID = document.getElementById('BtnSalesManID');
        BtnCancelSalesMan = document.getElementById('BtnCancelSalesMan');
        Txt_TrNo = document.getElementById('Txt_TrNo');
        Txt_CardPrc = document.getElementById('Txt_CardPrc');
        VatTypePrc = document.getElementById('VatTypePrc');
        txt_Discount = document.getElementById('txt_Discount');
        PayAmount = document.getElementById('PayAmount');
        IsCash = document.getElementById('IsCash');
        Card_Type = document.getElementById('Card_Type');
        VatType = document.getElementById('VatType');
        PaymentTerms = document.getElementById('PaymentTerms');
        //PaymentType = document.getElementById('PaymentType') as HTMLInputElement;
        ExpiryEnd = document.getElementById('ExpiryEnd');
        DeliveryTime = document.getElementById('DeliveryTime');
        Warrantyperiod = document.getElementById('Warrantyperiod');
    }
    function InitializeEvents() {
        BackTap.onclick = FunBackTap;
        NextTap.onclick = FunNextTap;
        SaveUpdate.onclick = Finish;
        BtnNameCustomer.onclick = SearchCustomer;
        BtnCancelCustomer.onclick = CancelCustomer;
        BtnSalesManID.onclick = SearchSalesMan;
        BtnCancelSalesMan.onclick = CancelSalesMan;
        Card_Type.onchange = Card_Type_onchange;
        VatType.onchange = VatType_onchange;
        IsCash.onchange = IsCash_onchange;
        $('#BtnAddCust').click(function (e) {
            OpenPagePartial("Customer", "Add Customer", () => { });
        });
    }
    function CancelSalesMan() {
        $('#SalesManID').val("");
        $('#SalesManName').val("");
        $('#SalesManMobile').val("");
        $('.CancelSalesMan').addClass("display_none");
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
        if (Number($('#CustomerID').val()) != 0) {
            let ListData = GetDataFrom("D_Customer", " CustomerId = " + $('#CustomerID').val());
            let CustDetails = new D_Customer();
            if (ListData.length == 0) {
                return;
            }
            CustDetails = ListData[0];
            if (CustDetails.ISPersonal == false) {
                GloplInvoiceTransCode = 1;
            }
            else {
                GloplInvoiceTransCode = 2;
            }
            if (CustDetails.ISPersonal == false && CustDetails.VatNo == null) {
                ShowMessage(" 😒 الرجاء التاكد من الرقم الضريبي للعميل", "Please Check Vat No Of Customer 😒");
                return false;
            }
            if (CustDetails.ISPersonal == false && (CustDetails.VatNo.length < 15 || CustDetails.VatNo.length > 15)) {
                ShowMessage(" 😒 الرجاء التاكد من الرقم الضريبي للعميل", "Please Check Vat No Of Customer 😒");
                return false;
            }
            if ((setVal(CustDetails.Address_postal).trim() == "" || CustDetails.Address_postal == null) && CustDetails.ISPersonal == false) {
                ShowMessage("😒 الرجاء التاكد من الرقم البريدي للعميل", "Please Check Address Postal Of Customer 😒");
                return false;
            }
            if (CustDetails.Address_postal != null) {
                if ((CustDetails.Address_postal.length != 5) && CustDetails.ISPersonal == false) {
                    ShowMessage("😒 الرقم البريدي للعميل يجب ان يكون 5 ارقام", "Address Postal Of Customer must be 5 numbers 😒");
                    return false;
                }
            }
            if (setVal(CustDetails.Address_City).trim() == "" && CustDetails.ISPersonal == false) {
                ShowMessage("الرجاء التاكد من عنوان المدينة للعميل 😒 ", "Please Check Address City Of Customer 😒");
                return false;
            }
            if (setVal(CustDetails.Address_Province).trim() == "" && CustDetails.ISPersonal == false) {
                ShowMessage("الرجاء التاكد عنوان المحافظه للعميل 😒", "Please Check Address Province Of Customer 😒");
                return false;
            }
            if (setVal(CustDetails.Address_Street).trim() == "" && CustDetails.ISPersonal == false) {
                ShowMessage(" 😒 الرجاء التاكد عنوان الشارع للعميل", "Please Check Address Street Of Customer 😒");
                return false;
            }
        }
        return true;
    }
    function Get_Data() {
        let con = "";
        var Table;
        Table =
            [
                { NameTable: 'D_I_Category', Condition: " CompCode = " + CompCode + " and Type_Show in(0,1) " },
                { NameTable: 'D_I_ItemFamily', Condition: " CompCode = " + CompCode },
                //{ NameTable: 'IQ_GetItemInfo', Condition: " CompCode = " + CompCode + "  and TypeUsing in (0,2)  " + WhereCon },
                { NameTable: 'D_A_VatType', Condition: "CompCode = " + CompCode + " and Type = 1 " },
            ];
        DataResult(Table);
        //************************************************************************************************************** 
        _Category = GetDataTable('D_I_Category');
        _ItemFamily = GetDataTable('D_I_ItemFamily');
        //_IQ_GetItemInfo = GetDataTable('IQ_GetItemInfo');
        let Vat_Type = GetDataTable('D_A_VatType');
        Vat_Type = Vat_Type.sort(dynamicSort("LineOrder"));
        FillDropwithAttr(Vat_Type, "VatType", "VatTypeID", "Describtion", "No", "Prc", "VatPrc");
        VatType_onchange();
        InitializeGrid();
    }
    function Card_Type_onchange() {
        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-Prc');
    }
    function VatType_onchange() {
        VatTypePrc.value = $('option:selected', $("#VatType")).attr('data-Prc');
        localStorage.setItem(GetParameterByName('App') + "VatTypePrc", VatTypePrc.value);
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.RowCnt = i;
            ("UnitPrice").F_Change(Grid);
        }
    }
    function IsCash_onchange() {
        if (IsCash.value == '0') {
            $('.IsCash').addClass('display_none');
        }
        else {
            $('.IsCash').removeClass('display_none');
            GetReceiptType();
        }
        ValidCustomEnter();
    }
    function GetReceiptType() {
        var Table;
        Table =
            [
                { NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },
            ];
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
            { title: "SaleDetailID", ID: "SaleDetailID", Name: "SaleDetailID", Type: "number", value: "0", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "SaleID", ID: "SaleID", Name: "SaleID", Type: "number", value: "0", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "الفئة" : "Cat", ID: "CatID", Name: "CatID", Type: "text", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: ISHidenService, Validation: Valid.Set(true, 'Must Select Category', "#CatID#" + "==" + "-1"), ColumnType: ControlType.Dropdown(_Category, "CatID", "DescA", "Select", CatChange) },
            { title: Res.Lang == "Ar" ? "نوع_الصنف" : "ItemFamily", ID: "ItemFamilyID", Name: "ItemFamilyID", Type: "text", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: ISHidenService, Validation: Valid.Set(true, 'Must Select ItemFamily', "#ItemFamilyID#" + "==" + "-1"), ColumnType: ControlType.Dropdown([], null, "Select") },
            { title: Res.Lang == "Ar" ? "الصنف" : "Item", ID: "ItemID", Name: "ItemID", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(true, 'Must Select Item'), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "الوصف" : "Item_Name", ID: "ItemName", Name: "ItemName", Type: "text", class: "_Width _IsReturnDis ", value: (Res.Lang == "Ar" ? "اختار الصنف" : "Select Item"), style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Button(null, null, SearchItems) },
            { title: "ItemUnit", ID: "ItemUnitID", Name: "ItemUnitID", Type: "text", value: "", style: "width: 100px", Edit: true, visible: Type_Items, Validation: Valid.Set(false), ColumnType: ControlType.Dropdown([], null, "ItemUnitID", "Select", SetRate) },
            { title: Res.Lang == "Ar" ? "سعر_الوحدة" : "Price", ID: "UnitPrice", Name: "UnitPrice", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input(ComputeTotalsRow, ComputeTotalsRow) },
            { title: Res.Lang == "Ar" ? "الكمية" : "Quantity", ID: "Quantity", Name: "Quantity", Type: "number", value: "1", class: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
            { title: Res.Lang == "Ar" ? "الكمية_المتبقية_من_المرتجع" : "RemainRetQty", ID: "RemainRetQty", Name: "RemainRetQty", Type: "number", value: "", class: "", style: "width: 100%", Edit: true, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
            { title: Res.Lang == "Ar" ? "نسبة_الخصم_%" : "DiscPrc_%", ID: "DiscountPrc", Name: "DiscountPrc", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input(() => { CompletOneHandQuantity(false); }, () => { CompletOneHandQuantity(false); }) },
            { title: Res.Lang == "Ar" ? "مبلغ_الخصم" : "DiscAmount", ID: "DiscountAmount", Name: "DiscountAmount", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input(() => { ComputeTotalsRow(true); }, () => { ComputeTotalsRow(true); }) },
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
        ];
        //Validation: Valid.Set(true, 'ياحمار', "#Is_Active#" + "==" + "true")
        BindGridControl(Grid);
    }
    function OnAddNewRowRunFunction() {
        Grid.ESG.RowCnt = Grid.ESG.LastCounter - 1;
        let IDGridItemFamily = ('ItemFamilyID').Get_ID(Grid);
        let CatID = ('CatID').Get_ID(Grid);
        $("#" + CatID).prop("selectedIndex", 1);
        let data_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(('CatID').Get_Val(Grid)));
        if (data_ItemFamily.length > 0) {
            FillDropwithAttr(data_ItemFamily, IDGridItemFamily, "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), "No", "", "");
        }
        else {
            $('#' + IDGridItemFamily + '').html('<option value="-1">Select</option>');
        }
    }
    function ComputeTotalsRow(IsDiscAmount = true) {
        debugger;
        if (IsReturn) {
            if (Number(('Quantity').Get_Val(Grid)) > Number(('RemainRetQty').Get_Val(Grid))) {
                ('Quantity').Set_Val(('RemainRetQty').Get_Val(Grid), Grid);
                let Id = ('Quantity').Get_ID(Grid);
                Errorinput($('#' + Id), "You cannot exceed the remaining quantity. 😒 ", " لا يمكنك تجاوز الكميه المتبقيه 😒");
            }
        }
        if (Number(('Quantity').Get_Val(Grid)) < 0) {
            ('Quantity').Set_Val("0", Grid);
            let Id = ('Quantity').Get_ID(Grid);
            Errorinput($('#' + Id), "Must Enter quantity. 😒 ", " يجب ادخال الكميه");
        }
        let txtDiscountAmount = Number(('DiscountAmount').Get_Val(Grid));
        ;
        let txtPrice = Number(('UnitPrice').Get_Val(Grid));
        let txtDiscountPrc = Number(('DiscountPrc').Get_Val(Grid));
        if (IsDiscAmount) {
            debugger;
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
        debugger;
        var txtQuantityValue = ('Quantity').Get_Val(Grid);
        var txtPriceValue = ('NetUnitPrice').Get_Val(Grid);
        var total = Number(txtQuantityValue) * Number(txtPriceValue);
        //let VatPrc = Number(('VatPrc').Get_Val(Grid))
        var _vatAmount = Number((Number(total) * VatPrc / 100).toFixed(4)).toFixed(2);
        ('VatAmount').Set_Val((_vatAmount), Grid);
        var total = Number(txtQuantityValue) * Number(txtPriceValue);
        ('ItemTotal').Set_Val((total).toFixed(2), Grid);
        var totalAfterVat = Number(_vatAmount) + Number(total.toFixed(2));
        ('NetAfterVat').Set_Val(Number((totalAfterVat).toFixed(4)).toFixed(2), Grid);
        SetRate();
        ComputeTotal();
    }
    function ComputeTotal() {
        let Total = Grid.ESG.TotalModel;
        $('#ItemsTotal').val((Total.ItemTotal - Total.DiscountAmount).toFixed(2));
        $('#Discount').val((Total.DiscountAmount * Total.Quantity).toFixed(2));
        //$('#TotalAmount').val(Number((Total.UnitPrice * Total.Quantity) - (Total.DiscountAmount * Total.Quantity)).toFixed(2))    
        $('#TotalAmount').val(Number((Total.ItemTotal)).toFixed(2));
        $('#VatAmount').val(Total.VatAmount.toFixed(2));
        $('#NetAmount').val(Total.NetAfterVat.toFixed(2));
        let _ItemsTotal = 0;
        let _Discount = 0;
        let _VatAmount = 0;
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.UnCnt = i;
            let Status = ('StatusFlag').Get_StatusFlag(Grid);
            if (Status == 'd' || Status == 'm') {
                continue;
            }
            _ItemsTotal = _ItemsTotal + (Number($("#TableBody_UnitPrice" + i).val()) * Number($("#TableBody_Quantity" + i).val()));
            _Discount = _Discount + (Number($("#TableBody_DiscountAmount" + i).val()) * Number($("#TableBody_Quantity" + i).val()));
            _VatAmount = _VatAmount + (Number($("#TableBody_VatAmount" + i).val()));
        }
        $('#ItemsTotal').val(_ItemsTotal.toFixed(2));
        $('#Discount').val(_Discount.toFixed(2));
        $('#TotalAmount').val((Number($('#ItemsTotal').val()) - Number($('#Discount').val())).toFixed(2));
        $('#VatAmount').val(_VatAmount.toFixed(2));
        // 
        //let TotalVat = 0;
        //for (var i = 0; i < Grid.ESG.LastCounter; i++) {
        //    Grid.ESG.RowCnt = i;
        //    TotalVat = TotalVat + Number(("VatAmount").G_F_Val(Grid))
        //}
        //$('#VatAmount').val(TotalVat.toFixed(2))
    }
    function OverReadDisplay() {
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.RowCnt = i;
            let ValItemFamilyID = ('_ItemFamilyID').G_F_Val(Grid);
            let ValItemUnitID = ('_ItemUnitID').G_F_Val(Grid);
            let ValCatID = ('CatID').G_F_Val(Grid);
            let data_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(('CatID').G_F_Val(Grid)));
            let IDGridItemFamily = ('ItemFamilyID').G_F_ID(Grid);
            if (data_ItemFamily.length > 0) {
                FillDropwithAttr(data_ItemFamily, IDGridItemFamily, "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), "No", "", "");
            }
            else {
                $('#' + IDGridItemFamily + '').html('<option value="-1">' + (Res.Lang == "Ar" ? "اختار" : "Select") + '</option>');
            }
            //***********************************************************************    
            //ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemID == Number(('ItemID').G_F_Val(Grid)))
            ItemUnits = GetItemInfoByItemID(Number(('ItemID').G_F_Val(Grid)), CompCode, WhereCon, "2");
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
        }
    }
    function CatChange() {
        let data_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(('CatID').Get_Val(Grid)));
        let IDGridItemFamily = ('ItemFamilyID').Get_ID(Grid);
        if (data_ItemFamily.length > 0) {
            FillDropwithAttr(data_ItemFamily, IDGridItemFamily, "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), "No", "", "");
        }
        else {
            $('#' + IDGridItemFamily + '').html('<option value="-1">Select</option>');
        }
    }
    function CompletOneHandQuantity(IsDiscAmount = true) {
        let HandQuant = Number(('Quantity').Get_Val(Grid)) * Number(('Rate').Get_Val(Grid));
        ('OneHandQuantity').Set_Val(HandQuant.toFixed(2), Grid);
        ComputeTotalsRow(IsDiscAmount);
    }
    function SetRate() {
        let DataUnit = ItemUnits.filter(x => x.UnitID == Number(('ItemUnitID').Get_Val(Grid)));
        if (DataUnit.length > 0) {
            ('Rate').Set_Val(DataUnit[0].Rate.toFixed(2), Grid);
        }
    }
    function SearchItems() {
        let CatID = Number(('CatID').Get_Val(Grid));
        let ItemFamilyID = Number(('ItemFamilyID').Get_Val(Grid));
        //sys.FindKey("Items", "btnItems", " CompCode = " + CompCode + "  and ISActive = 1  " + WhereCon + " and CatID = " + CatID + " and ItemFamilyID = " + ItemFamilyID, () => {
        //sys.FindKeySpeed("Items", " CompCode = " + CompCode + "  and ISActive = true  " + WhereConRedis + "   and CatID = " + CatID + " and ItemFamilyID = " + ItemFamilyID, 'SearchForm', () => {
        sys.FindKeyPagination("Items", "btnItems", " CompCode = " + CompCode + "  and ISActive = 1  " + WhereCon + "   and CatID = " + CatID + " and ItemFamilyID = " + ItemFamilyID, () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            ('ItemID').Set_Val(SelectedItem.ItemID, Grid);
            ('ItemName').html(SelectedItem.ItemName, Grid);
            ('UnitPrice').Set_Val(SelectedItem.UnitPrice, Grid);
            ('Quantity').Set_Val("1", Grid);
            //ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemID == SelectedItem.ItemID)
            ItemUnits = GetItemInfoByItemID(SelectedItem.ItemID, CompCode, WhereCon, "2");
            let IDGridUnit = ('ItemUnitID').Get_ID(Grid);
            if (ItemUnits.length > 0) {
                FillDropwithAttr(ItemUnits, IDGridUnit, "ItemUnitID", (Res.Lang == "Ar" ? "UnitDescA" : "UnitDescA"), "No", "", "");
                ('Rate').Set_Val(ItemUnits[0].Rate.toString(), Grid);
            }
            else {
                $('#' + IDGridUnit + '').html('<option value="-1">Select</option>');
            }
            ComputeTotalsRow();
            let Qty = ('Quantity').Get_ID(Grid);
            $('#' + Qty + '').focus();
        });
    }
    function SearchCustomer() {
        //let IsCredit = IsCash.value == "1" ? "0" : "1"
        // sys.FindKey("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
        //sys.FindKeySpeed("Customer", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', () => {
        sys.FindKeyPagination("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            ValidCustomEnter();
            $('#CustomerID').val(SelectedItem.CustomerId);
            $('#CustomerName').val(SelectedItem.NAMEA);
            $('#Mobile').val(SelectedItem.MOBILE);
            $('#CarBrand').val(SelectedItem.CarBrand);
            $('#CarNo').val(SelectedItem.CarNo);
            $('#DestructionKm').val(SelectedItem.DestructionKm);
            $('#EngineerName').val(SelectedItem.EngineerName);
        });
    }
    function SearchSalesMan() {
        //sys.FindKeySpeed("Employees", " CompCode = " + CompCode + "  and Status = 1 and EmpType = 3  ", 'SearchForm', function () {
        sys.FindKeyPagination("Employees", "BtnEmployees", " CompCode = " + CompCode + "  and Status = 1   and EmpType = 3 ", () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            console.log(SelectedItem);
            $('#SalesManID').val(SelectedItem.EmpID);
            $('#SalesManName').val(SelectedItem.Emp_Name);
            $('#SalesManMobile').val(SelectedItem.Mobile);
            $('.CancelSalesMan').removeClass("display_none");
        });
    }
    function FunNextTap() {
        if (!Validation()) {
            return;
        }
        $('.TapMaster').addClass('display_none');
        $('.TapDetails').removeClass('display_none');
        $('#NextTap').addClass('display_none');
        $('#BackTap').removeClass('display_none');
        $('#SaveUpdate').removeClass('display_none');
        $('#SaveUpdate').focus();
    }
    function FunBackTap() {
        $('.TapMaster').removeClass('display_none');
        $('.TapDetails').addClass('display_none');
        $('#NextTap').removeClass('display_none');
        $('#BackTap').addClass('display_none');
        $('#SaveUpdate').addClass('display_none');
        $('#NextTap').focus();
    }
    function Clear() {
        $('._Clear').val('');
        //$('#ItemFamilyID').val('null')
        ClearGridControl(Grid);
        FunBackTap();
    }
    function Validation() {
        debugger;
        //if ($('#AttachName').val().trim() == "") {
        //    Errorinput($('#AttachName'), 'Must Enter AttachName 😒', 'يجب إدخال عناية العميل 😒')
        //    return false
        //}
        //if (!Is_CarCenter) {
        //    if ($('#SalesManName').val().trim() == "") {
        //        Errorinput($('#SalesManName'), 'Must Enter SalesMan 😒', 'يجب إدخال المندوب 😒')
        //        return false
        //    }
        //}
        if ($('#CustomerName').val().trim() == "") {
            Errorinput($('#CustomerName'), 'Must Enter Customer 😒', 'يجب إدخال العميل 😒');
            return false;
        }
        if ($('#ReNo').val().trim() == "") {
            Errorinput($('#ReNo'), 'Must Enter ReNo 😒', 'يجب إدخال رقم المرجع 😒');
            return false;
        }
        //if ($('#PaymentTerms').val().trim() == "") {
        //    Errorinput($('#PaymentTerms'), 'Must Enter Payment Terms 😒', 'يجب ادخال شروط السداد')
        //    return false
        //}
        if ($('#IsCash').val().trim() == "") {
            Errorinput($('#IsCash'), 'Must Enter Payment Type 😒', 'يجب ادخال طريقة السداد');
            return false;
        }
        //if ($('#ExpiryEnd').val().trim() == "") {
        //    Errorinput($('#ExpiryEnd'), 'Must Enter Expiry Date 😒', 'يجب ادخال تاريخ الانتهاء ')
        //    return false
        //}
        //if ($('#DeliveryTime').val().trim() == "") {
        //    Errorinput($('#DeliveryTime'), 'Must Enter Delivery period 😒', 'يجب ادخال مدة التوريد ')
        //    return false
        //}
        //if ($('#Warrantyperiod').val().trim() == "") {
        //    Errorinput($('#Warrantyperiod'), 'Must Enter Warranty period 😒', 'يجب ادخال مدة الضمان ')
        //    return false
        //}
        if (Is_CarCenter) {
            if ($('#CarBrand').val().trim() == "") {
                Errorinput($('#CarBrand'), 'Must Enter CarBrand 😒', 'يجب إدخال ماركة السيارة 😒');
                return false;
            }
            if ($('#CarNo').val().trim() == "") {
                Errorinput($('#CarNo'), 'Must Enter CarNo 😒', 'يجب إدخال رقم لوحة السيارة 😒');
                return false;
            }
            if ($('#EngineerName').val().trim() == "") {
                Errorinput($('#EngineerName'), 'Must Enter EngineerName 😒', 'يجب إدخال اسم المهندس 😒');
                return false;
            }
        }
        if (IsReturn) {
            if ($('#Remarks').val().trim() == "") {
                Errorinput($('#Remarks'), 'Must Enter Remarks 😒', 'يجب إدخال الملاحظات 😒');
                return false;
            }
        }
        return true;
    }
    function Assign() {
        ModelMaster = new I_TR_Sales();
        ModelMaster.TrNo = Number(Txt_TrNo.value);
        ModelMaster.RefID = GlopRefID;
        ModelMaster.SaleID = GlopID;
        ModelMaster.DoNo = GlopDoNo;
        ModelMaster.CompCode = CompCode;
        ModelMaster.TrType = TrType;
        ModelMaster.ReNo = ($('#ReNo').val());
        ModelMaster.purchaseorderDesc = ($('#purchaseorderDesc').val());
        ModelMaster.CustomerID = Number($('#CustomerID').val());
        ModelMaster.CustomerName = ($('#CustomerName').val());
        ModelMaster.Mobile = ($('#Mobile').val());
        ModelMaster.AttatchName = $('#AttachName').val();
        if (!Is_CarCenter) {
            ModelMaster.SalesManID = Number($('#SalesManID').val());
            ModelMaster.SalesManName = ($('#SalesManName').val());
            ModelMaster.SalesManMobile = ($('#SalesManMobile').val());
        }
        ModelMaster.Status = Number($('#Status').val());
        ModelMaster.IsCash = Number($('#IsCash').val()) == 1 ? true : false;
        ModelMaster.SaleDate = $('#SaleDate').val();
        ModelMaster.VatTypeID = Number($("#VatType").val());
        ModelMaster.TrTime = GetTimeNumber();
        if (SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 0 || SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 1) {
            ModelMaster.IsService = false;
        }
        else {
            ModelMaster.IsService = true;
        }
        ModelMaster.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
        ModelMaster.InvoiceTransCode = GloplInvoiceTransCode;
        ModelMaster.TaxStatus = -1;
        ModelMaster.Status = 0;
        ModelMaster.ItemsTotal = Number($("#ItemsTotal").val());
        ModelMaster.Discount = Number($("#Discount").val());
        ModelMaster.TotalAmount = $('#TotalAmount').val();
        ModelMaster.VatAmount = Number($("#VatAmount").val());
        ModelMaster.NetAmount = $('#NetAmount').val();
        ModelMaster.VatTypeID = Number(VatType.value);
        if (Number($('#IsCash').val()) == 1) {
            ModelMaster.PaymentAmount = $('#NetAmount').val();
            ModelMaster.CashType = Number(Card_Type.value);
        }
        else {
            ModelMaster.PaymentAmount = 0;
            ModelMaster.CashType = null;
        }
        ModelMaster.RemainAmount = $('#RemainAmount').val();
        ModelMaster.Remarks = $('#Remarks').val().trim();
        ModelMaster.PaymentTerms = PaymentTerms.value;
        //ModelMaster.PaymentType = PaymentType.value;
        ModelMaster.ExpiryTime = ExpiryEnd.value;
        ModelMaster.DeliveryTime = DeliveryTime.value;
        ModelMaster.Warrantyperiod = Warrantyperiod.value;
        ModelMaster.CarBrand = $('#CarBrand').val().trim();
        ModelMaster.CarNo = $('#CarNo').val().trim();
        ModelMaster.DestructionKm = $('#DestructionKm').val().trim();
        ModelMaster.ChassisNo = $('#ChassisNo').val().trim();
        ModelMaster.EngineerName = $('#EngineerName').val().trim();
        ModelDetails = new Array();
        ModelDetails = Grid.ESG.Model;
        if (NameFunction == "Insert") {
            ModelMaster.CreatedAt = GetDateAndTimeSql();
            ModelMaster.CreatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
            ModelMaster.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
        }
        else {
            ModelMaster.CreatedAt = Glopl_CreatedAt;
            ModelMaster.CreatedBy = Glopl_CreatedBy;
            ModelMaster.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
            ModelMaster.UpdatedAt = GetDateAndTimeSql();
            ModelMaster.UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
        }
        debugger;
        _MasterDetails.Master = ModelMaster;
        console.log(ModelDetails);
        for (var i = 0; i < ModelDetails.length; i++) {
            //ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemUnitID == ModelDetails[i].ItemUnitID)
            ItemUnits = GetItemInfoByItemUnitID(ModelDetails[i].ItemUnitID, CompCode, WhereCon, "2");
            //ModelDetails[i].Rate = 1
            //ModelDetails[i].ItemUnitID = null
            if (ItemUnits.length > 0) {
                ModelDetails[i].Rate = ItemUnits[0].Rate;
                ModelDetails[i].CostPrice = ItemUnits[0].CostPrice;
            }
            ModelDetails[i].VatTypeID = Number(VatType.value);
        }
        if (IsReturn == true && NameFunction == "Insert") {
            ModelDetails = ModelDetails.filter(d => d.StatusFlag != "d");
        }
        _MasterDetails.Details = ModelDetails;
    }
    function Finish() {
        debugger;
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒");
            return;
        }
        SaveGridControl(Grid);
    }
    function Save() {
        debugger;
        Assign();
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("SalesTax", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(_MasterDetails) }),
            success: (d) => {
                let result = d;
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
                }
                else {
                }
            }
        });
    }
})(ShowPrice || (ShowPrice = {}));
//# sourceMappingURL=ShowPrice.js.map