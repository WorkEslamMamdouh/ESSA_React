
$(document).ready(() => {
    PurOrder.InitalizeComponent();
});
namespace PurOrder {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var Grid: ESGrid = new ESGrid();
    var _Category: Array<D_I_Category> = new Array<D_I_Category>();
    var _ItemFamily: Array<D_I_ItemFamily> = new Array<D_I_ItemFamily>();
    var _IQ_GetItemInfo: Array<IQ_GetItemInfo> = new Array<IQ_GetItemInfo>();
    var ModelMaster: I_TR_Purchases = new I_TR_Purchases();
    var _MasterDetails: MasterDetails = new MasterDetails();
    var ModelDetails: Array<I_TR_PurchaseDetails> = new Array<I_TR_PurchaseDetails>();
    var ModelDetailsListDelete: Array<I_TR_PurchaseDetails> = new Array<I_TR_PurchaseDetails>();
    var Res: SystemResources = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Units: Array<D_I_Units> = new Array<D_I_Units>();
    var ItemUnits: Array<IQ_GetItemInfo> = new Array<IQ_GetItemInfo>();

    var BtnSearchPurOrder: HTMLButtonElement
    var BackTap: HTMLButtonElement
    var NextTap: HTMLButtonElement
    var SaveUpdate: HTMLButtonElement
    var BtnNameSupplier: HTMLButtonElement
    var BtnCancelSupplier: HTMLButtonElement
    var PayAmount: HTMLInputElement;
    var Txt_CardPrc: HTMLInputElement;
    var VatTypePrc: HTMLInputElement;
    var Txt_TrNo: HTMLInputElement;
    var txt_Discount: HTMLInputElement;
    var Card_Type: HTMLSelectElement
    var VatType: HTMLSelectElement
    var IsCash: HTMLSelectElement
    var TrType = 2;
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
    var FlagPOS = SysSession.CurrentEnvironment.I_Control.IS_POS;
    export function InitalizeComponent() {

        if (SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 2 || SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 3) {
            WhereCon = " and IsService = 1"
            WhereConRedis = " and IsService = true"
        }

        if (SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 1) {
            WhereCon = " and IsService = 0"
            WhereConRedis = " and IsService = false"
        }

        ISHidenService = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 2 ? false : true
        let stat = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items;
        if (stat == 2 || stat == 3) {
            Type_Items = false;
        } else {
            Type_Items = true;

        }

        //if (!SysSession.CurrentEnvironment.I_Control.Is_PurOrder) {
        //    $('._PurOrder').addClass('display_none')
        //}


        InitalizeControls();
        InitializeEvents();

        IsReturn = localStorage.getItem(GetParameterByName('App') + "TypePage") == "2" ? true : false;

        Get_Data();
        $('#Status').val("1")
        $('#PurDate').val(GetDate())
        ValidSupplEnter();

        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1" || localStorage.getItem(GetParameterByName('App') + "TypePage") == "2") {
            let data: IQ_TR_Purchases = GetModelGlopel();
            DisplayDataUpdate(data, data.PurchaseID, data.TrNo, data.TrType);
            IsNew = false;
        }


        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "2") { // ModeAddReturn

            $('._PurOrder').addClass('display_none')
            IsReturn = true;
            ModeAddReturn();
            IsNew = true;
        }

        localStorage.setItem(GetParameterByName('App') + "TypePage", "0");

        //**********************
        Close_Loder();
    }
    function DisplayDataUpdate(data: IQ_TR_Purchases, _GlopID: number, _GlopTrNo: number, _TrType: number, Is_DetailInsert = false) {

        GlopID = _GlopID;
        GlopTrNo = _GlopTrNo;
        TrType = _TrType;
        GlopRefID = data.RefID;
        GlopDoNo = data.DoNo;
        GloplInvoiceTransCode = data.InvoiceTransCode;


        $('#PurOrderID').val(data.PurOrderID)
        $('#PurOrderNo').val(data.PurOrderNo)
        $('#Txt_TrNo').val(_GlopTrNo)
        $('#ReNo').val(data.ReNo);
        $('#SupplierID').val(data.SupplierID)
        $('#SupplierName').val(data.SupplierName);
        $('#Mobile').val(data.Mobile);
        $('#Status').val(data.Status)
        $('#IsCash').val(data.IsCash == true ? 1 : 0)
        $('#PurDate').val(DateFormat(data.PurDate))
        $('#VatType').val(data.VatTypeID)
        $('#ItemsTotal').val(data.ItemsTotal)
        $('#Discount').val(data.Discount)
        $('#TotalAmount').val(data.TotalAmount)
        $('#VatAmount').val(data.VatAmount)
        $('#NetAmount').val(data.NetAmount)
        $('#PaymentAmount').val(data.PaymentAmount)
        $('#RemainAmount').val(data.RemainAmount)
        $('#Remarks').val(data.Remarks)

        if (IsCash.value == '0') {
            $('.IsCash').addClass('display_none')
        }
        else {
            $('.IsCash').removeClass('display_none')
            GetReceiptType();
        }

        if (data.CashType != null) {
            Card_Type.value = data.CashType.toString();
        }
        txt_Discount.value = data.Discount.toString();
        VatType.value = data.VatTypeID.toString();
        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-Prc');
        VatTypePrc.value = $('option:selected', $("#VatType")).attr('data-Prc');
        localStorage.setItem(GetParameterByName('App') + "VatTypePrc", VatTypePrc.value)
        UpdatedAt = GetDateAndTimeSql();
        UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;

        Glopl_CreatedAt = data.CreatedAt.toString();
        Glopl_CreatedBy = data.CreatedBy.toString();
        Glopl_IDUserCreate = data.IDUserCreate


        if (data.SupplierID != 0) {
            $('.CancelSup').removeClass("display_none");
            $('#SupplierName').attr("disabled", "disabled");
            $('#Mobile').attr("disabled", "disabled");

        }
        else {

            if ($('#IsCash').val() == 1) {
                $('#SupplierName').removeAttr("disabled");
                $('#Mobile').removeAttr("disabled");
            }
            else {
                $('#SupplierName').attr("disabled", "disabled");
                $('#Mobile').attr("disabled", "disabled");
            }
        }


        NameFunction = "Update"

        let Listdata

        if (IsReturn) {
            if (TrType == 0) {

                GlopRefID = data.PurchaseID;

                Listdata = GetDataFrom('IQ_TR_PurchaseDetails', "  RemainRetQty > 0 and PurchaseID = " + data.PurchaseID)
            }
            else {
                Listdata = GetDataFrom('IQ_TR_PurchaseDetails', " PurchaseID = " + data.PurchaseID)
            }
        }
        else {
            Listdata = GetDataFrom('IQ_TR_PurchaseDetails', " PurchaseID = " + data.PurchaseID)
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

            Close_Loder();
        }, 500);
    }
    function ModeAddReturn() {
        TrType = 1;
        $('#Txt_TrNo').val("")
        $('#ReNo').val("")
        $('#Remarks').val("")
        $('#btnAdd_TableBody').addClass("display_none")
        $('#PurDate').val(GetDate())
        $('._IsReturnDis').attr("disabled", "disabled");
        NameFunction = "Insert";

    }

    function ModeUpdateReturn() {
        $('#btnAdd_TableBody').addClass("display_none")
        $('._IsReturnDis').attr("disabled", "disabled");
        NameFunction = "Update";
    }
    function InitalizeControls() {

        BtnSearchPurOrder = document.getElementById('BtnSearchPurOrder') as HTMLButtonElement;
        BackTap = document.getElementById('BackTap') as HTMLButtonElement;
        NextTap = document.getElementById('NextTap') as HTMLButtonElement;
        SaveUpdate = document.getElementById('SaveUpdate') as HTMLButtonElement;
        BtnNameSupplier = document.getElementById('BtnNameSupplier') as HTMLButtonElement;
        BtnCancelSupplier = document.getElementById('BtnCancelSupplier') as HTMLButtonElement;
        Txt_TrNo = document.getElementById('Txt_TrNo') as HTMLInputElement;
        Txt_CardPrc = document.getElementById('Txt_CardPrc') as HTMLInputElement;
        VatTypePrc = document.getElementById('VatTypePrc') as HTMLInputElement;
        txt_Discount = document.getElementById('txt_Discount') as HTMLInputElement;
        PayAmount = document.getElementById('PayAmount') as HTMLInputElement;
        IsCash = document.getElementById('IsCash') as HTMLSelectElement;
        Card_Type = document.getElementById('Card_Type') as HTMLSelectElement;
        VatType = document.getElementById('VatType') as HTMLSelectElement;

    }
    function InitializeEvents() {
        BackTap.onclick = FunBackTap
        NextTap.onclick = FunNextTap
        SaveUpdate.onclick = Finish
        BtnNameSupplier.onclick = SearchSupplier
        BtnCancelSupplier.onclick = CancelSupplier

        Card_Type.onchange = Card_Type_onchange;
        VatType.onchange = VatType_onchange;


        IsCash.onchange = IsCash_onchange


        $('#BtnAddSupp').click(function (e) {
            OpenPagePartial("Suppliers", "Add Suppliers", () => { });
        });

    }



    function Display_PurOrder(PurchaseID, IsJobOrd = false) {

        let data: Array<IQ_TR_Purchases> = GetDataFrom("IQ_TR_Purchases", " PurchaseID =  " + PurchaseID)

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

            $('#PurOrderID').val(data[0].PurchaseID)
            $('#PurOrderNo').val(data[0].TrNo)

            $('#PurDate').val(GetDate())

        }

    }

    function CancelSupplier() {

        ValidSupplEnter();

    }
    function ValidSupplEnter() {

        $('#SupplierName').val("");
        $('#Mobile').val("");
        $('#SupplierID').val("");
        $('.CancelSup').addClass("display_none");


        if ($('#IsCash').val() == 1) {

            $('#SupplierName').removeAttr("disabled");
            $('#Mobile').removeAttr("disabled");

        }
        else {
            $('#SupplierName').attr("disabled", "disabled");
            $('#Mobile').attr("disabled", "disabled");
        }

        setTimeout(function () {

            if (Number($('#SupplierID').val()) != 0) {
                $('.CancelSup').removeClass("display_none");
                $('#SupplierName').attr("disabled", "disabled");
                $('#Mobile').attr("disabled", "disabled");

            }
            else {

                if ($('#IsCash').val() == 1) {

                    $('#SupplierName').removeAttr("disabled");
                    $('#Mobile').removeAttr("disabled");

                }
                else {
                    $('#SupplierName').attr("disabled", "disabled");
                    $('#Mobile').attr("disabled", "disabled");
                }
            }

        }, 500);
    }
    function Get_Data() {
        let con = "";
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'D_I_Category', Condition: " CompCode = " + CompCode + " and Type_Show in(0,2) " },
                { NameTable: 'D_I_ItemFamily', Condition: " CompCode = " + CompCode },
                //{ NameTable: 'IQ_GetItemInfo', Condition: " CompCode = " + CompCode + "  and TypeUsing in (0,2)    " + WhereCon },
                { NameTable: 'D_A_VatType', Condition: "CompCode = " + CompCode + " and Type = 2 " },

            ]

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
        localStorage.setItem(GetParameterByName('App') + "VatTypePrc", VatTypePrc.value)
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.RowCnt = i;
            ("UnitPrice").F_Change(Grid)
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

        ValidSupplEnter();


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
        Grid.ESG.object = new I_TR_PurchaseDetails();
        Grid.Column = [
            { title: "PurchaseDetailID", ID: "PurchaseDetailID", Name: "PurchaseDetailID", Type: "number", value: "0", class: " _IsReturnDis", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "PurchaseID", ID: "PurchaseID", Name: "PurchaseID", Type: "number", value: "0", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "الفئة" : "Cat", ID: "CatID", Name: "CatID", Type: "text", value: "", class: "  _IsReturnDis", style: "width: 100%", Edit: true, visible: ISHidenService, Validation: Valid.Set(true, 'Must Select Category', "#CatID#" + "==" + "-1"), ColumnType: ControlType.Dropdown(_Category, "CatID", "DescA", "Select", CatChange) },
            { title: Res.Lang == "Ar" ? "نوع الصنف" : "ItemFamily", ID: "ItemFamilyID", Name: "ItemFamilyID", Type: "text", value: "", class: "  _IsReturnDis", style: "width: 100%", Edit: true, visible: ISHidenService, Validation: Valid.Set(true, 'Must Select ItemFamily', "#ItemFamilyID#" + "==" + "-1"), ColumnType: ControlType.Dropdown([], null, "Select") },
            { title: Res.Lang == "Ar" ? "الصنف" : "Item", ID: "ItemID", Name: "ItemID", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(true, 'Must Select Item'), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "الوصف" : "Item_Name", ID: "ItemName", Name: "ItemName", Type: "text", class: "_Width _IsReturnDis ", value: (Res.Lang == "Ar" ? "اختار الصنف" : "Select Item"), style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Button(null, null, SearchItems) },
            { title: "ItemUnit_________", ID: "ItemUnitID", Name: "ItemUnitID", Type: "text", value: "", style: "width: 100px", Edit: true, visible: Type_Items, Validation: Valid.Set(false), ColumnType: ControlType.Dropdown([], null, "ItemUnitID", "Select", SetRate) },
            { title: Res.Lang == "Ar" ? "سعر_الوحدة" : "Unit_Price", ID: "UnitPrice", Name: "UnitPrice", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input(ComputeTotalsRow, ComputeTotalsRow) },
            { title: Res.Lang == "Ar" ? "الكمية" : "Quantity", ID: "Quantity", Name: "Quantity", Type: "number", value: "1", class: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
            { title: Res.Lang == "Ar" ? "الكمية_المتبقية_من_المرتجع" : "RemainRetQty", ID: "RemainRetQty", Name: "RemainRetQty", Type: "number", value: "", class: "", style: "width: 100%", Edit: true, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
            { title: Res.Lang == "Ar" ? "نسبة_الخصم_%" : "DiscPrc_%", ID: "DiscountPrc", Name: "DiscountPrc", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input(() => { CompletOneHandQuantity(false) }, () => { CompletOneHandQuantity(false) }) },
            { title: Res.Lang == "Ar" ? "اجمالي_الخصم" : "DiscAmount", ID: "DiscountAmount", Name: "DiscountAmount", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input(() => { ComputeTotalsRow(true) }, () => { ComputeTotalsRow(true) }) },
            { title: Res.Lang == "Ar" ? "الاجمالي_الخاضع" : "NetUnitPrice", ID: "NetUnitPrice", Name: "NetUnitPrice", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
            { title: Res.Lang == "Ar" ? "نسبة_الضريبة" : "VatPrc_%", ID: "VatPrc", Name: "VatPrc", Type: "number", value: VatTypePrc.value, class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "اجمالي_المبلغ" : "Total", ID: "ItemTotal", Name: "ItemTotal", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "Ar" ? "مبلغ_الضريبة" : "VatAmount", ID: "VatAmount", Name: "VatAmount", Type: "number", value: "", class: "_IsReturnDis", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
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

        debugger

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
            debugger
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

        debugger

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

    function ComputeTotal() {
        let Total = Grid.ESG.TotalModel as I_TR_PurchaseDetails
        $('#ItemsTotal').val((Total.ItemTotal - Total.DiscountAmount).toFixed(2))
        $('#Discount').val((Total.DiscountAmount * Total.Quantity).toFixed(2))
        //$('#TotalAmount').val(Number((Total.UnitPrice * Total.Quantity) - (Total.DiscountAmount * Total.Quantity)).toFixed(2))    
        $('#TotalAmount').val(Number((Total.ItemTotal)).toFixed(2))
        $('#VatAmount').val(Total.VatAmount.toFixed(2))
        $('#NetAmount').val(Total.NetAfterVat.toFixed(2))


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

        // 
        //let TotalVat = 0;
        //for (var i = 0; i < Grid.ESG.LastCounter; i++) {
        //    Grid.ESG.RowCnt = i;
        //    TotalVat = TotalVat + Number(("VatAmount").G_F_Val(Grid))
        //}
        //$('#VatAmount').val(TotalVat.toFixed(2))
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
            //ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemID == Number(('ItemID').G_F_Val(Grid)) && (x.TypeUsing == 0 || x.TypeUsing == 2))
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

        }



    }

    function DeleteAllDetail() {
        ModelDetailsListDelete = new Array<I_TR_PurchaseDetails>();
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.RowCnt = i;
            let StatusFlag = $('#StatusFlag_TableBody_' + i).val()
            let ModelDetaROWDelete = new I_TR_PurchaseDetails();
            if (StatusFlag != 'm') {

                ModelDetaROWDelete.PurchaseDetailID = Number($('#TableBody_PurchaseDetailID0').val());
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
    function CompletOneHandQuantity(IsDiscAmount: boolean = true) {

        let HandQuant = Number(('Quantity').Get_Val(Grid)) * Number(('Rate').Get_Val(Grid));
        ('OneHandQuantity').Set_Val(HandQuant.toFixed(2), Grid)
        ComputeTotalsRow(IsDiscAmount);
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
        sys.FindKeyPagination("Items", "btnItems", " CompCode = " + CompCode + "  and ISActive = 1  " + WhereCon + "   and CatID = " + CatID + " and ItemFamilyID = " + ItemFamilyID, () => {


            let SelectedItem = SelectDataSearch.DataRow; 
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            ('ItemID').Set_Val(SelectedItem.ItemID, Grid);
            ('ItemName').html(SelectedItem.ItemName, Grid);
            ('UnitPrice').Set_Val(SelectedItem.UnitPrice, Grid);
            ('Quantity').Set_Val("1", Grid);


            //ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemID == SelectedItem.ItemID && (x.TypeUsing == 0 || x.TypeUsing == 2))
            ItemUnits = GetItemInfoByItemID(SelectedItem.ItemID, CompCode, WhereCon, "2")


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
        });
    }
    function SearchSupplier() {

        //sys.FindKey("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and ISActive = 1   ", () => {
        //sys.FindKeySpeed("Supplier", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', function () {
        sys.FindKeyPagination("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
            let SelectedItem: D_A_Suppliers = SelectDataSearch.DataRow;  
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            ValidSupplEnter();
            $('#SupplierID').val(SelectedItem.SupplierID);
            $('#SupplierName').val(SelectedItem.SupplierName);
            $('#Mobile').val(SelectedItem.Mobile);

        });
    }

    function FunNextTap() {

        if (!Validation()) {
            return
        }

        $('.TapMaster').addClass('display_none')
        $('.TapDetails').removeClass('display_none')

        $('#NextTap').addClass('display_none')
        $('#BackTap').removeClass('display_none')
        $('#SaveUpdate').removeClass('display_none')
        $('#SaveUpdate').focus();
    }
    function FunBackTap() {
        $('.TapMaster').removeClass('display_none')
        $('.TapDetails').addClass('display_none')

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
        //    Errorinput($('#ReNo'), 'Must Enter RefNo 😒', 'يجب أن تدخل المرجع 😒')
        //    return false
        //}
        if ($('#SupplierName').val().trim() == "") {
            Errorinput($('#SupplierName'), 'Must Enter Supplier 😒', 'يجب إدخال المورد 😒')
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
    function Assign() {

        ModelMaster = new I_TR_Purchases();
        ModelMaster.TrNo = Number(Txt_TrNo.value);
        ModelMaster.RefID = GlopRefID;
        ModelMaster.PurchaseID = GlopID;
        ModelMaster.DoNo = GlopDoNo;
        ModelMaster.CompCode = CompCode;
        ModelMaster.TrType = TrType;
        ModelMaster.ReNo = ($('#ReNo').val());
        ModelMaster.SupplierID = Number($('#SupplierID').val());
        ModelMaster.SupplierName = ($('#SupplierName').val());
        ModelMaster.Mobile = ($('#Mobile').val());
        ModelMaster.Status = Number($('#Status').val());
        ModelMaster.IsCash = Number($('#IsCash').val()) == 1 ? true : false;
        ModelMaster.PurDate = $('#PurDate').val()
        ModelMaster.VatTypeID = Number($("#VatType").val())
        ModelMaster.TrTime = GetTimeNumber()
        if (SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 0 || SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items == 1) {
            ModelMaster.IsService = false

        }
        else {
            ModelMaster.IsService = true
        }

        ModelMaster.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
        ModelMaster.InvoiceTransCode = GloplInvoiceTransCode;
        ModelMaster.Status = 0


        ModelMaster.PurOrderID = $('#PurOrderID').val()
        ModelMaster.PurOrderNo = $('#PurOrderNo').val()


        ModelMaster.ItemsTotal = Number($("#ItemsTotal").val())
        ModelMaster.Discount = Number($("#Discount").val())
        ModelMaster.TotalAmount = $('#TotalAmount').val()
        ModelMaster.VatAmount = Number($("#VatAmount").val())
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

        ModelDetails = new Array<I_TR_PurchaseDetails>();
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

        SaveGridControl(Grid);
    }
    function Save() {
        Assign();



        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("Purchases", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(_MasterDetails) }),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    Clear()

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


}
