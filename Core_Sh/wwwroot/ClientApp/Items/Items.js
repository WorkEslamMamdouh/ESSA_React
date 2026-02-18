$(document).ready(() => {
    Items.InitalizeComponent();
});
var Items;
(function (Items) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Grid = new ESGrid();
    var _Units = new Array();
    var _ItemFamily = new Array();
    var ModelMaster = new D_I_Items();
    var _MasterDetails = new MasterDetails();
    var ModelDetails = new Array();
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var AutoCode = SysSession.CurrentEnvironment.I_Control.AutoCode;
    var ItemImage;
    var BackTap;
    var NextTap;
    var SaveUpdate;
    var ItemFamilyID;
    var ISItem;
    var IsService;
    var btnItemTaxEG;
    var flagItem = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items;
    var flagPOS = SysSession.CurrentEnvironment.I_Control.IS_POS;
    var TaxLinkedEG = SysSession.CurrentEnvironment.I_Control.TaxLinkedEG;
    var NameFunction = "Insert";
    var GlopID = 0;
    var ViewPage = false;
    var IsActiv = false;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#btnItemTaxEG').html(Res.Lang == 'Ar' ? 'الكود الضريبي' : 'Tax Code');
        $('#btnItemTaxEG').val(Res.Lang == 'Ar' ? 'الكود الضريبي' : 'Tax Code');
        Get_Data();
        $('#ISActive').val("1");
        $('#ISItem').prop("checked", true);
        $('#backgroundColor').val("#27B300");
        $('#FontColor').val("#FFFFFF");
        if (flagItem == 2) {
            $('#IsService').prop("checked", true);
            $('.IsService').addClass("display_none");
            IsServiceORISItem();
            ItemFamilyID.selectedIndex = 1;
        }
        else if (flagItem == 1) {
            $('#ISItem').prop("checked", true);
            $('.IsService').addClass("display_none");
            $('.ISItem').removeClass("display_none");
            IsServiceORISItem();
        }
        else if (flagItem == 3) {
            $('#IsService').prop("checked", true);
            $('.IsService').addClass("display_none");
            IsServiceORISItem();
            $('.ISItem').removeClass("display_none");
        }
        else {
            $('#ISItem').prop("checked", true);
            $('.ISItem').removeClass("display_none");
            $('.IsService').removeClass("display_none");
        }
        if (flagPOS == true) {
            $('.POS').removeClass("display_none");
        }
        else {
            $('.POS').addClass("display_none");
        }
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            ViewPage = true;
            DisplayDataUpdate();
        }
        //**********************
        if (SysSession.CurrentPrivileges.CUSTOM1) {
            $('#QtyOpenBalances').removeAttr("disabled");
        }
        else {
            $('#QtyOpenBalances').attr("disabled", "disabled");
        }
        if (SysSession.CurrentEnvironment.I_Control.TaxLinkedEG == true) {
            $('.TaxCode').removeClass("display_none");
        }
        else {
            $('.TaxCode').addClass("display_none");
        }
        $('#TapMaster').removeClass("display_none");
        debugger;
        if (!AutoCode) {
            $('#ItemCode').removeAttr("disabled");
        }
        else {
            $('#ItemCode').attr("disabled", "disabled");
        }
        Close_Loder();
    }
    Items.InitalizeComponent = InitalizeComponent;
    function DisplayDataUpdate() {
        debugger;
        let data = GetModelGlopel();
        GlopID = data.ItemID;
        $('#ItemFamilyID').val(data.ItemFamilyID);
        $('#ItemCode').val(data.ItemCode);
        $('#ItemName').val(data.ItemName);
        $('#ItemTaxID').val(data.ItemTaxID);
        $('#codeName').val(data.NameA_EG);
        $('#itemCode').val(data.ItemCode_EG);
        $('#Remarks').val(data.Remarks);
        $('#ISActive').val(data.ISActive == true ? 1 : 0);
        IsActiv = data.ISActive;
        $('#CostPrice').val(data.CostPrice);
        $('#UnitPrice').val(data.UnitPrice);
        $('#QtyOpenBalances').val(data.QtyOpenBalances);
        $('#OneHandQuantity').val(data.OneHandQuantity);
        $('#backgroundColor').val(data.backgroundColor);
        $('#FontColor').val(data.FontColor);
        if (setVal(data.Image).trim() != "") {
            Display_image('ItemImage', 'Items_Images', data.Image.trim());
        }
        if (data.IsService) {
            IsService.checked = true;
        }
        else {
            ISItem.checked = true;
        }
        //$('#Txt_TrData').val(data.TransactionDate)
        debugger;
        if (!AutoCode) {
            $('#ItemCode').removeAttr("disabled");
        }
        else {
            $('#ItemCode').attr("disabled", "disabled");
        }
        NameFunction = "Update";
        localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
        let Listdata = GetDataFrom('D_I_ItemUnits', "ItemID = " + data.ItemID);
        if (Listdata.length > 0) {
            Grid.ESG.ModeUpdate = true;
            DisplayDataGridControl(Listdata, Grid);
        }
        if (IsService.checked == true) {
            $('#NextTap').addClass('display_none');
            $('#SaveUpdate').removeClass('display_none');
            $('#OneHandQuantity').val("0");
            $('._Quantity').addClass('display_none');
            $('#CostPrice').attr('disabled', 'disabled');
            $('#CostPrice').val('0');
        }
        else {
            $('#NextTap').removeClass('display_none');
            $('#SaveUpdate').addClass('display_none');
            $('._Quantity').removeClass('display_none');
            $('#CostPrice').removeAttr('disabled');
        }
    }
    function InitalizeControls() {
        ItemImage = document.getElementById('ItemImage');
        BackTap = document.getElementById('BackTap');
        NextTap = document.getElementById('NextTap');
        SaveUpdate = document.getElementById('SaveUpdate');
        ItemFamilyID = document.getElementById('ItemFamilyID');
        ISItem = document.getElementById('ISItem');
        IsService = document.getElementById('IsService');
        btnItemTaxEG = document.getElementById('btnItemTaxEG');
    }
    function InitializeEvents() {
        BackTap.onclick = FunBackTap;
        NextTap.onclick = FunNextTap;
        SaveUpdate.onclick = Finish;
        ISItem.onchange = IsServiceORISItem;
        IsService.onchange = IsServiceORISItem;
        btnItemTaxEG.onclick = SearchItemTaxEG;
        ItemImage.onclick = Item_Image_onclick;
    }
    function Item_Image_onclick() {
        debugger;
        Upload_image('ItemImage', 'Items_Images', "");
    }
    function IsServiceORISItem() {
        if (IsService.checked == true) {
            $('#NextTap').addClass('display_none');
            $('#SaveUpdate').removeClass('display_none');
            $('#OneHandQuantity').val("0");
            $('._Quantity').addClass('display_none');
            $('#backgroundColor').val("#006BAD");
            $('#FontColor').val("#FFFFFF");
            $('#CostPrice').attr('disabled', 'disabled');
            $('#CostPrice').val('0');
        }
        else {
            $('#NextTap').removeClass('display_none');
            $('#SaveUpdate').addClass('display_none');
            $('._Quantity').removeClass('display_none');
            $('#backgroundColor').val("#27B300");
            $('#FontColor').val("#FFFFFF");
            $('#CostPrice').removeAttr('disabled');
        }
    }
    function Get_Data() {
        let con = "";
        var Table;
        Table =
            [
                { NameTable: 'D_I_Units', Condition: " CompCode = " + CompCode },
                { NameTable: 'D_I_ItemFamily', Condition: " CompCode = " + CompCode },
            ];
        DataResult(Table);
        //************************************************************************************************************** 
        _Units = GetDataTable('D_I_Units');
        _ItemFamily = GetDataTable('D_I_ItemFamily');
        InitializeGridUnit();
        FillDropDown(_ItemFamily, ItemFamilyID, "ItemFamilyID", "DescA", Res.Lang == "Ar" ? "اختر نوع الصنف" : "Select Item Family");
    }
    function InitializeGridUnit() {
        let TypeUsing = [{ TypeUsing: '0', Name: 'All' }, { TypeUsing: '1', Name: 'Sales' }, { TypeUsing: '2', Name: 'Purchase' }];
        Grid.ESG.NameTable = 'unitsTableBody';
        Grid.ESG.PrimaryKey = 'ItemUnitID';
        Grid.ESG.Right = false;
        Grid.ESG.Edit = false;
        Grid.ESG.Back = false;
        Grid.ESG.Save = false;
        Grid.ESG.Add = true;
        Grid.ESG.DeleteRow = false;
        Grid.ESG.CopyRow = false;
        Grid.ESG.ModeInsert = true;
        Grid.ESG.OnfunctionSave = Save;
        Grid.ESG.object = new D_I_ItemUnits();
        Grid.Column = [
            { title: "ItemUnitID", ID: "ItemUnitID", Name: "ItemUnitID", Type: "number", value: "0", style: "width: 100px", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "Ser" : "مسلسل", ID: "Ser", Name: "Ser", Type: "number", value: "cnt", style: "width: 100px", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "QRCode" : "الكود", ID: "QRCode", Name: "QRCode", Type: "text", value: "", style: "width: 100px", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "Unit" : "الوحده", ID: "UnitID", Name: "UnitID", Type: "text", value: "", style: "width: 100px", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Dropdown(_Units, "UnitID", "DescA") },
            //{ title: "Rate", ID: "Rate", Name: "Rate", Type: "number", value: "1", style: "width: 100px", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input(CompletOneHandQuantity) },
            //{ title: "OneHandQuantity", ID: "OneHandQuantity", Name: "OneHandQuantity", Type: "number", value: "0", style: "width: 100px", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            //{ title: "OneUnitPrice", ID: "UnitPrice", Name: "UnitPrice", Type: "number", value: "", style: "width: 100px", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "Using_Type" : "الوحده_المستخدمه", ID: "TypeUsing", Name: "TypeUsing", Type: "text", value: "", style: "width: 100px", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Dropdown(TypeUsing, "TypeUsing", 'Name') },
            { title: Res.Lang == "En" ? "ISActive" : "نشط", ID: "ISActive", Name: "ISActive", Type: "text", value: "1", style: "width: 100px", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.checkbox() },
        ];
        //Validation: Valid.Set(true, 'ياحمار', "#Is_Active#" + "==" + "true")
        BindGridControl(Grid);
    }
    function CompletOneHandQuantity() {
        let HandQuant = Number(('Quantity').Get_Val(Grid)) * Number(('Rate').Get_Val(Grid));
        ('OneHandQuantity').Set_Val(HandQuant.toFixed(2), Grid);
    }
    function FunNextTap() {
        if (!Validation()) {
            return;
        }
        $('#TapMaster').addClass('display_none');
        $('#TapDetails').removeClass('display_none');
        $('#NextTap').addClass('display_none');
        $('#BackTap').removeClass('display_none');
        $('#SaveUpdate').removeClass('display_none');
        $('#SaveUpdate').focus();
    }
    function FunBackTap() {
        $('#TapMaster').removeClass('display_none');
        $('#TapDetails').addClass('display_none');
        $('#NextTap').removeClass('display_none');
        $('#BackTap').addClass('display_none');
        $('#SaveUpdate').addClass('display_none');
        $('#NextTap').focus();
    }
    function Clear() {
        $('._Clear').val('');
        $('#ItemFamilyID').val('null');
        $('#txtSearch').val('');
        $('#btnItemTaxEG').html(Res.Lang == 'Ar' ? 'الكود الضريبي' : 'Tax Code');
        ClearGridControl(Grid);
        FunBackTap();
        IsServiceORISItem();
        $('#btnItemTaxEG').val(Res.Lang == 'Ar' ? 'الكود الضريبي' : 'Tax Code');
        $('#ItemImage').attr("src", "/NewStyle/images/AddImage.png");
        $('#ItemImage').removeClass("_backColor");
    }
    function Validation() {
        if ($('#ItemFamilyID').val() == 'null') {
            Errorinput($('#ItemFamilyID'), 'Must Select ItemFamily 😒', 'يجب تحديد عنصر العائلة 😒');
            return false;
        }
        debugger;
        if ($('#ItemCode').val().trim() == '' && AutoCode == false) {
            Errorinput($('#ItemCode'), 'Must Enter ItemCode 😒', 'يجب إدخال رمز العنصر 😒');
            return false;
        }
        if ($('#itemCode').val().trim() == '' && TaxLinkedEG == true) {
            Errorinput($('#itemCode'), 'Must Enter ItemCode 😒', 'يجب إدخال رمز الضريبي 😒');
            return false;
        }
        if (NameFunction == "Insert") {
            let chackData = GetDataFrom("D_I_Items", " ItemCode = N'" + $('#ItemCode').val().trim() + "' and CompCode =  " + CompCode);
            if (chackData.length > 0) {
                Errorinput($('#ItemCode'), 'This code already Using.. 😒' + "&  This is ItemName '" + chackData[0].ItemName + "' ", "هذا الكود مستخدم بالفعل.. 😒" + "&  هذا هو اسم العنصر '" + chackData[0].ItemName + "' ");
                return false;
            }
        }
        if ($('#ItemName').val().trim() == '') {
            Errorinput($('#ItemName'), 'Must Enter ItemName 😒', 'يجب إدخال اسم العنصر 😒');
            return false;
        }
        if (IsService.checked && Number($('#UnitPrice').val()) == 0) {
            Errorinput($('#UnitPrice'), 'Must Enter UnitPrice 😒', "يجب إدخال سعر الوحدة 😒");
            return false;
        }
        if (IsService.checked == false) {
            if ($('#NextTap').is("hidden")) {
                if (!CheackQRCode()) {
                    return false;
                }
            }
        }
        return true;
    }
    function CheackQRCode() {
        for (var i = 0; i < Grid.ESG.LastCounter; i++) {
            Grid.ESG.RowCnt = i;
            let QRCode = ('QRCode').G_F_Val(Grid);
            let ItemUnitID = ('ItemUnitID').G_F_Val(Grid);
            let data = GetDataFrom("D_I_ItemUnits", " QRCode = N'" + QRCode + "' and ItemUnitID <> " + ItemUnitID + "");
            if (data.length > 0) {
                let id = ('QRCode').G_F_ID(Grid);
                Errorinput($('#' + id + ''));
                ShowMessage("This QR code already exists 😁", "هذا الرمز QR موجود بالفعل 😁");
                return false;
            }
            else {
                return true;
            }
        }
    }
    function Assign() {
        ModelMaster = new D_I_Items();
        ModelMaster.ItemID = GlopID;
        ModelMaster.CompCode = CompCode;
        debugger;
        ModelMaster.ISActive = IsActiv;
        ModelMaster.ItemFamilyID = Number(ItemFamilyID.value);
        ModelMaster.ItemCode = $('#ItemCode').val().trim();
        ModelMaster.ItemTaxID = $('#ItemTaxID').val().trim();
        ModelMaster.ItemName = $('#ItemName').val().trim();
        ModelMaster.Remarks = $('#Remarks').val().trim();
        ModelMaster.CostPrice = Number($('#CostPrice').val());
        ModelMaster.UnitPrice = Number($('#UnitPrice').val());
        ModelMaster.QtyOpenBalances = Number($('#QtyOpenBalances').val());
        ModelMaster.OneHandQuantity = Number($('#OneHandQuantity').val());
        ModelMaster.Quantity = Number($('#OneHandQuantity').val());
        ModelMaster.backgroundColor = $('#backgroundColor').val();
        ModelMaster.FontColor = $('#FontColor').val();
        ModelMaster.Image = setVal($("#ItemImage").attr("Name_Img"));
        ModelMaster.IsService = IsService.checked;
        if (NameFunction == "Insert") {
            ModelMaster.CreatedAt = GetDateAndTimeSql();
            ModelMaster.CreatedBy = SysSession.CurrentEnvironment.UserCode;
        }
        else {
            ModelMaster.UpdatedAt = GetDateAndTimeSql();
            ModelMaster.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
        }
        if (IsService.checked) {
            ModelMaster.OneHandQuantity = 1;
            ModelMaster.Quantity = 1;
        }
        ModelDetails = new Array();
        ModelDetails = Grid.ESG.Model;
        debugger;
        if (SysSession.CurrentPrivileges.CUSTOM3) {
            ModelMaster.ISActive = true;
        }
        else {
            ModelMaster.ISActive = false;
        }
        _MasterDetails.Master = ModelMaster;
        _MasterDetails.Details = ModelDetails;
    }
    function Finish() {
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒");
            return;
        }
        if (!Validation()) {
            return;
        }
        SaveGridControl(Grid);
    }
    function Save() {
        Assign();
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("Items", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(_MasterDetails) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    Clear();
                    $("#Display_Back_Page").click();
                    if (ViewPage) {
                        $('#Back_Page').click();
                    }
                    Close_Loder();
                    if (NameFunction == "Insert") {
                        ShowMessage("Inserted 🤞😉", "تم الاضافه 🤞😉");
                    }
                    else {
                        ShowMessage("Updated 🤞😉", "تم التعديل 🤞😉");
                    }
                    if (!IsService.checked) {
                        setTimeout(function () {
                            SqlExecuteQuery("exec G_UpdateAllStock");
                        }, 1000);
                    }
                }
                else {
                }
            }
        });
    }
    function SearchItemTaxEG() {
        sys.FindKeyPagination("ItemTaxEG", "btnItemTaxEG", " COMP_CODE = " + CompCode, () => {
            let SelectedItem = SelectDataSearch.DataRow;
            debugger;
            $('#ItemTaxID').val(SelectedItem.ItemTaxID);
            $('#itemCode').val(SelectedItem.itemCode);
            $('#codeName').val(SelectedItem.codeName);
        });
    }
})(Items || (Items = {}));
//# sourceMappingURL=Items.js.map