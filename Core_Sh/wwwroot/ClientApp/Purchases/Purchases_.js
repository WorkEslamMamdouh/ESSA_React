//$(document).ready(() => {
//    Purchases.InitalizeComponent();
//});
//namespace Purchases {
//    var sys: SystemTools = new SystemTools();
//    var SysSession: SystemSession = GetSystemSession();
//    var Grid: ESGrid = new ESGrid();
//    var _Category: Array<D_I_Category> = new Array<D_I_Category>();
//    var _ItemFamily: Array<D_I_ItemFamily> = new Array<D_I_ItemFamily>();
//    var _IQ_GetItemInfo: Array<IQ_GetItemInfo> = new Array<IQ_GetItemInfo>();
//    var ModelMaster: I_TR_Purchases = new I_TR_Purchases();
//    var _MasterDetails: MasterDetails = new MasterDetails();
//    var ModelDetails: Array<I_TR_PurchaseDetails> = new Array<I_TR_PurchaseDetails>();
//    var Res: SystemResources = GetGlopelResources();
//    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
//    var _Units: Array<D_I_Units> = new Array<D_I_Units>();
//    var ItemUnits: Array<IQ_GetItemInfo> = new Array<IQ_GetItemInfo>();
//    var BackTap: HTMLButtonElement
//    var NextTap: HTMLButtonElement
//    var SaveUpdate: HTMLButtonElement
//    var NameSupplier: HTMLButtonElement
//    var PurchaseExpenses: HTMLInputElement;
//    var PayAmount: HTMLInputElement;
//    var Txt_CardPrc: HTMLInputElement;
//    var VatTypePrc: HTMLInputElement;
//    var Txt_TrNo: HTMLInputElement;
//    var txt_Discount: HTMLInputElement;
//    var Card_Type: HTMLSelectElement
//    var VatType: HTMLSelectElement
//    var IsCash: HTMLSelectElement
//    var TrType = 0;
//    var UpdatedAt = "";
//    var UpdatedBy = "";
//    var NameFunction = "Insert";
//    var GlopID = 0; 
//    export function InitalizeComponent() {
//        InitalizeControls();
//        InitializeEvents();
//        Get_Data();
//        $('#Status').val("1")
//        $('#PurchaseDate').val(GetDate())
//        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
//            DisplayDataUpdate();
//        }
//        //**********************
//        Close_Loder();
//    }
//    function DisplayDataUpdate() {
//        let data: IQ_TR_Purchases = GetModelGlopel();   
//        GlopID = data.PurchaseID;
//        $('#Txt_TrNo').val(data.TrNo)
//        $('#ReNo').val(data.ReNo);
//        $('#SupplierID').val(data.SupplierID)
//        $('#IsCash').val(data.IsCash == true ? 1 : 0)
//        TrType = data.TrType;
//        $('#Status').val(data.Status)
//        $('#PurchaseDate').val(DateFormat(data.PurchaseDate))  
//        $('#TotalAmount').val(data.TotalAmount)   
//        $('#PurchaseExpenses').val(data.PurchaseExpenses) 
//        $('#NetAmount').val(data.NetAmount)       
//        $('#PayAmount').val(data.PayAmount)
//        $('#RemainAmount').val(data.RemainAmount)
//        $('#Remarks').val(data.Remarks)
//        $('#NameSupplier').val(data.SupplierName);       
//        IsCash.value = data.IsCash == false ? "0" : "1";
//        IsCash_onchange();
//        if (data.IsCash == true) {
//        Card_Type. value = data.CashType.toString();
//		}           
//        txt_Discount.value = data.Discount.toString();            
//        VatType.value = data.VatTypeID.toString();            
//        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-prc');
//        VatTypePrc.value = $('option:selected', $("#VatType")).attr('data-prc');
//        UpdatedAt = data.UpdatedAt == "" ? GetDateAndTimeSql() : data.UpdatedAt;
//        UpdatedBy = data.UpdatedBy == "" ? SysSession.CurrentEnvironment.GQ_USERS.USER_NAME : data.UpdatedBy;
//        NameFunction = "Update"
//        localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
//        let Listdata = GetDataFrom('IQ_TR_PurchaseDetails', " PurchaseID = " + data.PurchaseID)
//        if (Listdata.length > 0) {
//            Grid.ESG.ModeUpdate = true;
//            DisplayDataGridControl(Listdata, Grid);
//            OverReadDisplay()
//        }
//    }
//    function InitalizeControls() {
//        BackTap = document.getElementById('BackTap') as HTMLButtonElement;
//        NextTap = document.getElementById('NextTap') as HTMLButtonElement;
//        SaveUpdate = document.getElementById('SaveUpdate') as HTMLButtonElement;
//        NameSupplier = document.getElementById('NameSupplier') as HTMLButtonElement;
//        PurchaseExpenses = document.getElementById('PurchaseExpenses') as HTMLInputElement;
//        Txt_TrNo = document.getElementById('Txt_TrNo') as HTMLInputElement;
//        Txt_CardPrc = document.getElementById('Txt_CardPrc') as HTMLInputElement;
//        VatTypePrc = document.getElementById('VatTypePrc') as HTMLInputElement;
//        txt_Discount = document.getElementById('txt_Discount') as HTMLInputElement;
//        PayAmount = document.getElementById('PayAmount') as HTMLInputElement;
//        IsCash = document.getElementById('IsCash') as HTMLSelectElement;
//        Card_Type = document.getElementById('Card_Type') as HTMLSelectElement;
//        VatType = document.getElementById('VatType') as HTMLSelectElement;
//    }
//    function InitializeEvents() {
//        BackTap.onclick = FunBackTap
//        NextTap.onclick = FunNextTap
//        SaveUpdate.onclick = Finish
//        NameSupplier.onclick = SearchSupplier
//        PurchaseExpenses.onkeyup = OnChangePurchaseExpenses;
//        PurchaseExpenses.onchange = OnChangePurchaseExpenses;
//        Card_Type.onchange = Card_Type_onchange;
//        VatType.onchange = VatType_onchange;
//        PayAmount.onkeyup = OnChangePurchaseExpenses;
//        PayAmount.onchange = OnChangePurchaseExpenses;
//        txt_Discount.onchange = OnChangePurchaseExpenses;
//        IsCash.onchange = IsCash_onchange 
//    }
//    function Get_Data() {
//        let con = "";
//        var Table: Array<Table>;
//        Table =
//            [
//                { NameTable: 'D_I_Category', Condition: " CompCode = " + CompCode },
//                { NameTable: 'D_I_ItemFamily', Condition: " CompCode = " + CompCode },
//            { NameTable: 'IQ_GetItemInfo', Condition: " CompCode = " + CompCode + "  and TypeUsing in (0,2) and IsService = 0" },
//            { NameTable: 'D_A_VatType', Condition: "CompCode = " + CompCode + " and Type = 2 " },
//            ]
//        DataResult(Table);
//        //************************************************************************************************************** 
//        _Category = GetDataTable('D_I_Category');
//        _ItemFamily = GetDataTable('D_I_ItemFamily');
//        _IQ_GetItemInfo = GetDataTable('IQ_GetItemInfo');
//        let Vat_Type = GetDataTable('D_A_VatType');
//        FillDropwithAttr(Vat_Type, "VatType", "VatTypeID", "Describtion", "No", "prc", "VatPrc");
//        VatType_onchange();
//        InitializeGrid();
//    }
//    function Card_Type_onchange() {
//        Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-prc');        
//    }
//    function VatType_onchange() {
//        VatTypePrc.value = $('option:selected', $("#VatType")).attr('data-prc');        
//	}
//    function IsCash_onchange() {
//        if (IsCash.value == '0') {
//            $('.IsCash').addClass('display_none')
//        }
//        else {
//            $('.IsCash').removeClass('display_none') 
//            GetReceiptType();
//        }
//    }
//    function GetReceiptType() {
//        var Table: Array<Table>;
//        Table =
//            [                                                                              
//                { NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },  
//            ]
//        DataResult(Table);                             
//        let CardType = GetDataTable('D_A_CashTypes');                                                                                                                       
//        FillDropwithAttr(CardType, "Card_Type", "CashTypeID", (Res.Lang == "Ar" ? "Description" : "Description"), "No", "prc", "ChargePrc");     
//    }                   
//    function InitializeGrid() {
//        Grid.ESG.NameTable = 'TableBody';
//        Grid.ESG.PrimaryKey = 'ItemUnitID';
//        Grid.ESG.Right = false;
//        Grid.ESG.Edit = false;
//        Grid.ESG.Back = false;
//        Grid.ESG.Save = false;
//        Grid.ESG.Add = true;
//        Grid.ESG.DeleteRow = true;
//        Grid.ESG.CopyRow = false;
//        Grid.ESG.ModeInsert = true;
//        Grid.ESG.OnfunctionSave = Save;
//        Grid.ESG.OnfunctionTotal = ComputeTotal;
//        //Grid.ESG.OnRowRunFunction = OnRowRunFunction;
//        Grid.ESG.object = new I_TR_PurchaseDetails();
//        Grid.Column = [
//            { title: "PurchaseDetailID", ID: "PurchaseDetailID", Name: "PurchaseDetailID", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
//            { title: "PurchaseID", ID: "PurchaseID", Name: "PurchaseID", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
//            { title: "Cat_________", ID: "CatID", Name: "CatID", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true, 'Must Select Category', "#CatID#" + "==" + "-1"), ColumnType: ControlType.Dropdown(_Category, "DescA", "Select", CatChange) },
//            { title: "ItemFamily_________", ID: "ItemFamilyID", Name: "ItemFamilyID", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true, 'Must Select ItemFamily', "#ItemFamilyID#" + "==" + "-1"), ColumnType: ControlType.Dropdown([], null, "Select") },
//            { title: "Item", ID: "ItemID", Name: "ItemID", Type: "number", value: "", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(true, 'Must Select Item'), ColumnType: ControlType.Input() },
//            { title: "Item_Name__________________", ID: "ItemName", Name: "ItemName", Type: "text", value: "Select Item", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Button(null, null, SearchItems) },
//            { title: "ItemUnit_________", ID: "ItemUnitID", Name: "ItemUnitID", Type: "text", value: "", style: "width: 100px", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Dropdown([], null, "Select", SetRate) },
//            { title: "CostPrice________", ID: "CostPrice", Name: "CostPrice", Type: "number", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input(CompletTotalRow, CompletTotalRow) },
//            { title: "Quantity_________", ID: "Quantity", Name: "Quantity", Type: "number", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
//            { title: "TotalPrice_________", ID: "TotalPrice", Name: "TotalPrice", Type: "number", value: "", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
//            { title: "Rate____", ID: "Rate", Name: "Rate", Type: "number", value: "1", style: "width: 100%", Edit: true, visible: false, Validation: Valid.Set(true), ColumnType: ControlType.Input(CompletOneHandQuantity, CompletOneHandQuantity) },
//            { title: "OneHandQuantity_______", ID: "OneHandQuantity", Name: "OneHandQuantity", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
//            { title: "_", ID: "_ItemFamilyID", Name: "ItemFamilyID", Type: "number", value: "", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false, 'Must Select Item'), ColumnType: ControlType.Input() },
//            { title: "_", ID: "_ItemUnitID", Name: "ItemUnitID", Type: "number", value: "", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false, 'Must Select Item'), ColumnType: ControlType.Input() },
//            { title: "SalesPrice_________", ID: "UnitPrice", Name: "UnitPrice", Type: "number", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
//        ]
//        //Validation: Valid.Set(true, 'ياحمار', "#Is_Active#" + "==" + "true")
//        BindGridControl(Grid);
//    }
//    function OverReadDisplay() {
//        for (var i = 0; i < Grid.ESG.LastCounter; i++) {      
//            Grid.ESG.RowCnt = i;
//            let ValItemFamilyID = ('_ItemFamilyID').G_F_Val(Grid)
//            let ValItemUnitID = ('_ItemUnitID').G_F_Val(Grid)
//             
//            let data_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(('CatID').G_F_Val(Grid)))
//            let IDGridItemFamily = ('ItemFamilyID').G_F_ID(Grid);
//            if (data_ItemFamily.length > 0) {
//                FillDropwithAttr(data_ItemFamily, IDGridItemFamily, "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), "No", "", "");
//            }
//            else {
//                $('#' + IDGridItemFamily + '').html('<option value="-1">Select</option>');
//            }         
//            //***********************************************************************    
//            ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemID == Number(('ItemID').G_F_Val(Grid)))
//             
//            let IDGridUnit = ('ItemUnitID').G_F_ID(Grid);
//            if (ItemUnits.length > 0) {
//                FillDropwithAttr(ItemUnits, IDGridUnit, "ItemUnitID", (Res.Lang == "Ar" ? "UnitDescA" : "UnitDescA"), "No", "", "");
//            }
//            else {
//                $('#' + IDGridUnit + '').html('<option value="-1">Select</option>');
//            }                                                   
//            ('ItemFamilyID').S_F_Val(ValItemFamilyID,Grid);
//            ('ItemUnitID').S_F_Val(ValItemUnitID,Grid);     
//        }                    
//    }                        
//    function CatChange() {   
//        let data_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(('CatID').Get_Val(Grid)))
//        let IDGridItemFamily = ('ItemFamilyID').Get_ID(Grid);
//        if (data_ItemFamily.length > 0) {
//            FillDropwithAttr(data_ItemFamily, IDGridItemFamily, "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), "No", "", "");
//        }
//        else {
//            $('#' + IDGridItemFamily + '').html('<option value="-1">Select</option>');
//        }
//    }        
//    function CompletOneHandQuantity() {
//         
//        let HandQuant = Number(('Quantity').Get_Val(Grid)) * Number(('Rate').Get_Val(Grid));
//        ('OneHandQuantity').Set_Val(HandQuant.toFixed(2), Grid)       
//        CompletTotalRow();
//    }
//    function CompletTotalRow() {      
//        let TotalRow = Number(('Quantity').Get_Val(Grid)) * Number(('CostPrice').Get_Val(Grid));    
//        ('TotalPrice').Set_Val(TotalRow.toFixed(2), Grid)                       
//        if (Number(('UnitPrice').Get_Val(Grid)) == 0) {
//            ('UnitPrice').Set_Val(Number(('CostPrice').Get_Val(Grid)).toFixed(2), Grid)
//        }
//        SetRate();
//    }
//    function ComputeTotal() {
//        let Total = Grid.ESG.TotalModel as I_TR_PurchaseDetails         
//        $('#TotalAmount').val(Total.TotalPrice)           
//        OnChangePurchaseExpenses();
//    }
//    function OnChangePurchaseExpenses() {
//         
//        $('#VatAmount').val((((Number($('#TotalAmount').val()) - Number(txt_Discount.value)) * Number(VatTypePrc.value)) / 100).toFixed(2));
//        var CardPrcAmount = (((((Number($('#TotalAmount').val()) - Number(txt_Discount.value)) * Number(VatTypePrc.value)) / 100 + Number($('#TotalAmount').val())) * Number($('#Txt_CardPrc').val())) / 100).toFixed(2);
//        var NetAmount = Number($('#TotalAmount').val()) - Number(txt_Discount.value) + Number($('#VatAmount').val()) + Number(CardPrcAmount) + Number($('#PurchaseExpenses').val());                                                                                                                                                                                    
//        $('#NetAmount').val(NetAmount.toFixed(2));
//    }
//    function SetRate() {
//        let DataUnit = ItemUnits.filter(x => x.UnitID == Number(('ItemUnitID').Get_Val(Grid)));
//              
//        if (DataUnit.length > 0) {
//            ('Rate').Set_Val(DataUnit[0].Rate.toFixed(2), Grid)
//        }
//    }                
//    function SearchItems() {
//        let CatID = Number(('CatID').Get_Val(Grid))
//        let ItemFamilyID = Number(('ItemFamilyID').Get_Val(Grid))
//        sys.FindKey("Items", "btnItems", " CompCode = " + CompCode + "  and ISActive = 1  and  IsService = 0 and CatID = " + CatID + " and ItemFamilyID = " + ItemFamilyID, () => {
//            let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
//            ('ItemID').Set_Val(SelectedItem.ItemID, Grid);
//            ('ItemName').html(SelectedItem.ItemName, Grid);
//            ('UnitPrice').Set_Val(SelectedItem.UnitPrice, Grid);
//             
//            ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemID == SelectedItem.ItemID ) 
//             
//            let IDGridUnit = ('ItemUnitID').Get_ID(Grid);
//            if (ItemUnits.length > 0) {
//                FillDropwithAttr(ItemUnits, IDGridUnit, "ItemUnitID", (Res.Lang == "Ar" ? "UnitDescA" : "UnitDescA"), "No", "", "");
//                ('Rate').Set_Val(ItemUnits[0].Rate.toString(), Grid)
//            }
//            else {
//                $('#' + IDGridUnit + '').html('<option value="-1">Select</option>');
//            }
//            SetRate();
//        });
//    }
//    function SearchSupplier() {
//        sys.FindKey("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and ISActive = 1 ", () => {
//            let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
//            $('#SupplierID').val(SelectedItem.SupplierID);
//            $('#NameSupplier').val(SelectedItem.SupplierName);
//        });
//    }
//    function FunNextTap() {
//         
//        if (!Validation()) {
//            return
//        }
//        $('.TapMaster').addClass('display_none')
//        $('.TapDetails').removeClass('display_none')
//        $('#NextTap').addClass('display_none')
//        $('#BackTap').removeClass('display_none')
//        $('#SaveUpdate').removeClass('display_none')
//        $('#SaveUpdate').focus();
//    }
//    function FunBackTap() {
//        $('.TapMaster').removeClass('display_none')
//        $('.TapDetails').addClass('display_none')
//        $('#NextTap').removeClass('display_none')
//        $('#BackTap').addClass('display_none')
//        $('#SaveUpdate').addClass('display_none')
//        $('#NextTap').focus();
//    }
//    function Clear() {
//        $('._Clear').val('')
//        //$('#ItemFamilyID').val('null')
//        ClearGridControl(Grid);
//        FunBackTap();
//    }
//    function Validation() {     
//        if ($('#ReNo').val().trim() == '') {
//            Errorinput($('#ReNo'), 'Must Enter ReNo 😒')
//            return false
//        }                    
//        if (Number($('#SupplierID').val()) == 0) {
//            Errorinput($('#NameSupplier'), 'Must Enter Supplier 😒')
//            return false
//        }                 
//        return true       
//    }
//    function Assign() {
//         
//        ModelMaster = new I_TR_Purchases();
//        ModelMaster.TrNo = Number(Txt_TrNo.value);
//        ModelMaster.PurchaseID = GlopID;
//        ModelMaster.CompCode = CompCode;
//        ModelMaster.TrType = 0;
//        ModelMaster.ReNo =  ($('#ReNo').val());
//        ModelMaster.SupplierID = Number($('#SupplierID').val());
//        ModelMaster.Status = Number($('#Status').val());
//        ModelMaster.IsCash = Number($('#IsCash').val()) == 1 ? true : false; 
//        ModelMaster.PurchaseDate = $('#PurchaseDate').val()
//        ModelMaster.TotalAmount = $('#TotalAmount').val()
//        ModelMaster.PurchaseExpenses = $('#PurchaseExpenses').val()
//        ModelMaster.NetAmount = $('#NetAmount').val();
//        ModelMaster.VatTypeID = Number(VatType.value);
//        ModelMaster.VatPrc = Number(VatTypePrc.value);
//        ModelMaster.Discount = Number(txt_Discount.value);     
//        if ( Number($('#IsCash').val()) == 1) {            
//            ModelMaster.PayAmount = $('#NetAmount').val();     
//        ModelMaster.CashType = Number(Card_Type.value);
//            ModelMaster.IsCash = true;
//            ModelMaster.VatTypeID = Number(VatType.value);
//		} else {
//            ModelMaster.PayAmount = 0;                      
//            ModelMaster.CashType = null;
//            ModelMaster.IsCash = false;
//		}                                                   
//        ModelMaster.RemainAmount = $('#RemainAmount').val()
//        ModelMaster.Remarks = $('#Remarks').val().trim()      
//        ModelDetails = new Array<I_TR_PurchaseDetails>();
//        ModelDetails = Grid.ESG.Model;   
//        if (NameFunction == "Insert") {
//            ModelMaster.CreatedAt = GetDateAndTimeSql();
//            ModelMaster.CreatedBy = SysSession.CurrentEnvironment.USERID.toString();
//        }
//        _MasterDetails.Master = ModelMaster
//        for (var i = 0; i < ModelDetails.length; i++) {
//            ItemUnits = _IQ_GetItemInfo.filter(x => x.ItemUnitID == ModelDetails[i].ItemUnitID)
//            if (ItemUnits.length> 0) {
//            ModelDetails[i].Rate = ItemUnits[0].Rate
//			}
//        }
//        _MasterDetails.Details = ModelDetails
//        console.log(_MasterDetails);
//         
//    }
//    function Finish() {
//        SaveGridControl(Grid);
//    }
//    function Save() {
//        Assign();
//        Ajax.CallsyncSave({
//            type: "POST",
//            url: sys.apiUrl("Purchases", NameFunction),
//            data: JSON.stringify({ DataSend: JSON.stringify(_MasterDetails) }),
//            success: (d) => {
//                let result = d as BaseResponse;
//                if (result.IsSuccess == true) {
//                    Clear()
//                    $('#Back_Page').click();
//                    $("#Display_Back_Page").click();
//                    Close_Loder();
//                    if (NameFunction == "Insert") {
//                        ShowMessage("Inserted 🤞😉", "تم الاضافه 🤞😉");
//                    }
//                    else {
//                        ShowMessage("Updated 🤞😉", "تم التعديل 🤞😉");
//                    }
//                } else {
//                }
//            }
//        });
//    }
//}
//# sourceMappingURL=Purchases_.js.map