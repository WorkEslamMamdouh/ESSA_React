
$(document).ready(() => {
	ViewItems.InitalizeComponent();

});

namespace ViewItems {

	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var _Grid: JsGrid = new JsGrid();
	var Res: SystemResources = GetGlopelResources(); 
	var _Datanone: Array<IQ_ViewItems> = new Array<IQ_ViewItems>();
	var Family: Array<D_I_ItemFamily> = new Array<D_I_ItemFamily>();

	var drpActive: HTMLSelectElement;
	var drpTypeItems: HTMLSelectElement;
	var Filter_View: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;
	var drpCategory: HTMLSelectElement;
	var drpItemFamily: HTMLSelectElement;
	var flagItem = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items;
	var ExcelCon = "";

	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();
		InitializeGrid();
		GetDataFilters();
		SearchID();
		DownloadFileExcel();
		Close_Loder();
		if (flagItem == 2) {

			$('.drpCategory').addClass("display_none");
			$('.drpItemFamily').addClass("display_none");
			drpCategory.selectedIndex = 1;
			drpCategory_onchange();
			drpItemFamily.selectedIndex = 1;
			drpTypeItems.disabled = true;
			drpTypeItems.selectedIndex = 1;

		} else if (flagItem == 1) {
			$('.drpCategory').removeClass("display_none");
			$('.drpItemFamily').removeClass("display_none");
			drpTypeItems.disabled = true;
			drpTypeItems.selectedIndex = 2;
		}
		else if (flagItem == 3) {
			$('.drpCategory').removeClass("display_none");
			$('.drpItemFamily').removeClass("display_none");
			drpTypeItems.disabled = true;
			drpTypeItems.selectedIndex = 1;
		} else {
			$('.drpCategory').removeClass("display_none");
			$('.drpItemFamily').removeClass("display_none");
		}
	}
	function InitalizeControls() {
		Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
		drpItemFamily = document.getElementById('drpItemFamily') as HTMLSelectElement;
		drpCategory = document.getElementById('drpCategory') as HTMLSelectElement;
		drpTypeItems = document.getElementById('drpTypeItems') as HTMLSelectElement;
	}
	function InitializeEvents() {

		Filter_View.onclick = () => { GetData() };
		btnDelete_Filter.onclick = Clear;
		drpCategory.onchange = drpCategory_onchange;
	}
	function DownloadFileExcel() {
		GnrGridDownloadExcel(() => {

			let keyMapping = {
				ItemCode: Res.Lang == "En" ? "ItemCode" : "رمز الصنف",
				ItemName: Res.Lang == "En" ? "ItemName" : "اسم الصنف",
				CostPrice: Res.Lang == "En" ? "CostPrice" : " سعر التكلفة",
				UnitPrice: Res.Lang == "En" ? "UnitPrice" : "سعر الوحده",
				Quantity: Res.Lang == "En" ? "Quantity" : "كمية",
			};
			//ConvertModelToFileExcel('ViewItemsReport', _Grid.DataSource, keyMapping)
			ConvertModelToFileExcelAllData('ViewItemsReport', "IQ_ViewItems", ExcelCon, keyMapping);      
		});
	}

	function drpCategory_onchange() {

		let data = Family.filter(x => x.CatID == Number(drpCategory.value))
		FillDropwithAttr(data, "drpItemFamily", "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), (Res.Lang == "Ar" ? "جميع " : "All "), "", "");

	}
	function SearchID() {
		SearchIDGnr(() => {
			ViewUser(ModelSearch.ModelMaster)
		});
	}
	function GetDataFilters() {

		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'D_I_Category', Condition: "CompCode = " + CompCode },
				{ NameTable: 'D_I_ItemFamily', Condition: "CompCode = " + CompCode },

			]
		DataResult(Table);

		let cat = GetDataTable('D_I_Category');
		Family = GetDataTable('D_I_ItemFamily');
		FillDropwithAttr(cat, "drpCategory", "CatID", (Res.Lang == "Ar" ? "DescA" : "DescA"), (Res.Lang == "Ar" ? "جميع " : "All "), "", "");

	}

	function InitializeGrid() {

		_Grid.ElementName = "_Grid";
		//_Grid.OnRowDoubleClicked = GridDoubleClick;
		_Grid.PrimaryKey = "ItemID";
		_Grid.Paging = true;
		_Grid.PageSize = 15;
		_Grid.Sorting = true;
		_Grid.InsertionMode = JsGridInsertionMode.Binding;
		_Grid.Editing = false;
		_Grid.Inserting = false;
		_Grid.SelectedIndex = 1;
		_Grid.OnItemEditing = () => { };
		_Grid.Columns = [
			{ title: "ItemID", name: "ItemID", visible: false, width: "100px" },
			{ title: Res.Lang == "En" ? "ItemCode" : "رمز الصنف", name: "ItemCode", type: "text", width: "100px" },
			{ title: Res.Lang == "En" ? "Family" : "البراند", name: "FamilyDescA", type: "text", width: "100px" },
			{ title: Res.Lang == "En" ? "ItemName" : "اسم الصنف", name: "ItemName", type: "text", width: "100px" },		
			{ title: Res.Lang == "En" ? "Quantity" : "كمية", name: "OneHandQuantity", type: "text", width: "100px" },   
			{
				title: Res.Lang == "En" ? "CostPrice" : " سعر التكلفة",
				itemTemplate: (s: string, item: IQ_ViewItems): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "number";
					txt.id = "txt" + item.ItemID;
					txt.className = "Clear_Header u-input u-input-rectangle";
					txt.value = setVal(item.CostPrice);
					txt.style.borderRadius = "50px 50px 50px 50px";
					txt.style.backgroundColor = "#ab4f4f40";
					//-------------------------Privileges-----------------------
					txt.disabled = !SysSession.CurrentPrivileges.CUSTOM3;
					txt.onchange = (e) => {
						SqlExecuteQuery("update D_I_Items set CostPrice = " + txt.value + " where ItemID = " + item.ItemID + "");
						GetData(false, 0, false, true);
						ShowMessage("Cost Price Updated ✅", " تم تعديل سعر التكلفة ✅")	  
					};
					return txt;
				}
			},
			{
				title: Res.Lang == "En" ? "UnitPrice" : "سعر البيع",
				itemTemplate: (s: string, item: IQ_ViewItems): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "number";
					txt.id = "txt1" + item.ItemID;
					txt.className = "Clear_Header u-input u-input-rectangle";
					txt.value = setVal(item.UnitPrice) ;
					txt.style.borderRadius = "50px 50px 50px 50px";
					txt.style.backgroundColor = "#ab4f4f40";	    
					//-------------------------Privileges-----------------------
					txt.disabled = !SysSession.CurrentPrivileges.CUSTOM3;
					txt.onchange = (e) => {
						SqlExecuteQuery("update D_I_Items set UnitPrice = " + txt.value + " where ItemID = " + item.ItemID + "");
						GetData(false, 0, false, true);
						ShowMessage("Unit Price Updated ✅", " تم تعديل سعر البيع ✅")
					};
					return txt;
				}
			},			   
			{
				title: Res.Lang == "En" ? "Item Type" : "نوع الصنف", css: "ColumPadding", name: "IsCash", width: "100px",
				itemTemplate: (s: string, item: IQ_ViewItems): HTMLLabelElement => {
					let txt: HTMLLabelElement = document.createElement("label");
					if (item.IsService == true) {
						txt.innerHTML = Res.Lang == "En" ? 'Service 📦' : 'خدمة 📦'
					} else {
						txt.innerHTML = Res.Lang == "En" ? 'Item 🛒' : "بضاعه 🛒"
					}
					return txt;
				}
			},
			{
				title: Res.Lang == "En" ? "Active" : "نشط",
				itemTemplate: (s: string, item: IQ_ViewItems): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "checkbox";
					txt.id = "ChkView" + item.ItemID;
					txt.className = "checkbox";
					txt.checked = item.ISActive;
					txt.style.width = "50px"
					txt.style.height = "35px"
					//-------------------------Privileges-----------------------
					txt.disabled = true
					if (item.ISActive == false && SysSession.CurrentPrivileges.CUSTOM1) {
						txt.disabled = false
					}
					if (item.ISActive == true && SysSession.CurrentPrivileges.CUSTOM2) {
						txt.disabled = false
					}
					//----------------------------------------------------------

					txt.onclick = (e) => {
						IsActive(item.ItemID, txt.checked == false ? 0 : 1);
						//    SqlExecuteQuery("update G_Data_Redis set Status = 0 where KeyTrigger = 'Items'");
					};
					return txt;
				}
			},
			{
				title: Res.Lang == "En" ? "Edit" : "تعديل",
				itemTemplate: (s: string, item: IQ_ViewItems): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "button";
					txt.value = (Res.Lang == "En" ? "Edit" : "تعديل" + " ⚙️");
					txt.id = "butView" + item.ItemID;
					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

					if (!SysSession.CurrentPrivileges.EDIT) {
						txt.disabled = true
					}

					txt.onclick = (e) => {
						ViewUser(item);
					};
					return txt;
				}
			},
			{
				title: Res.Lang == "En" ? "استعلام الكمية المعلقة" : "استعلام الكمية المعلقة",
				itemTemplate: (s: string, item: IQ_ViewItems): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "button";
					txt.value = (Res.Lang == "En" ? "Quantity Hanging" : "استعلام الكمية المعلقة" + " ⚙️");
					txt.id = "butView" + item.ItemID;
					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
					txt.style.backgroundColor = "#0a0fa9";

					txt.onclick = (e) => {
						ViewHangingQty(item.ItemID);
					};
					return txt;
				}
			},
			{
				visible: (SysSession.CurrentEnvironment.I_Control.IsArchive == true ? true : false), title: Res.Lang == "Ar" ? "ارشفه" : "Archive",
				itemTemplate: (s: string, item: IQ_ViewItems): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "button";
					txt.value = "📩"
					txt.id = "butArchive" + item.ItemID;
					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
					txt.style.backgroundColor = "#16c76d";
					txt.style.borderRadius = "50%";
					txt.style.width = "50px";

					if (!SysSession.CurrentPrivileges.IsArchive) {
						txt.disabled = true
					}

					txt.onclick = (e) => {
						ShowArchive(SysSession.CurrentEnvironment.GQ_USERS.ID.toString(), SysSession.CurrentEnvironment.CompCode.toString(), GetModelCodeFromUrl(), item.ItemID.toString(), txt.id);
					};
					return txt;
				}
			},
		];
		_Grid.Bind();

	}

	function GetData(IsChangeActive: boolean = false, ID: number = 0, Status: boolean = false, ISDirect: boolean = false) {

		if (!SysSession.CurrentPrivileges.VIEW) {
			ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
			return
		}


		if ($('#drpCategory').val() == "null") {
			Errorinput($('#drpCategory'), "Must Select Category 👆", "يجب اختيار الفئة 👆")
			return
		}

		CleaningList_Table();
		let Con = "";
		if ($('#drpActive').val() != "null") {
			Con = " and Isnull(IsActive,0) =" + Number($('#drpActive').val());
		}
		if ($('#drpTypeItems').val() != "null") {
			Con = " and IsService =" + Number($('#drpTypeItems').val());
		}
		if ($('#drpCategory').val() != "null") {
			Con = Con + " and CatID =" + Number($('#drpCategory').val());
		}
		if ($('#drpItemFamily').val() != "null") {
			Con = Con + " and ItemFamilyID =" + Number($('#drpItemFamily').val());
		}
		ExcelCon ="CompCode = " + CompCode + Con;

		if (ISDirect) {
			DisplayDirectPagination(_Grid, 'IQ_ViewItems', "     CompCode = " + CompCode + Con, SelectPageNumber.PageNumber, 5, "ItemID")
		}
		else {
			DisplayGridByPagination(_Grid, 'IQ_ViewItems', "     CompCode = " + CompCode + Con, 1, 5, "ItemID")
		}


		//var Table: Array<Table>;
		//Table =
		//    [
		//        { NameTable: 'IQ_ViewItems', Condition: "   CompCode =" + CompCode + " " + Con },

		//    ]
		//DataResult(Table);
		////**************************************************************************************************************

		//_DataList = GetDataTable('IQ_ViewItems');
		//_DataList = _DataList.sort(dynamicSortNew("ItemID"));
		//_Grid.DataSource = _DataList;
		//_Grid.Bind();

		$('#btnDelete_Filter').removeClass('display_none');
		if (IsChangeActive && ID > 0) {
			let chack = _Grid.DataSource.filter(x => x.ItemID == ID)
			if (chack.length > 0) {
				if (chack[0].ISActive == Status) {
					ShowMessage("Done Change 😍👌" + (Status == false ? " Not Active " : " Active "), "تم التغيير 😍👌" + (Status == false ? " عدم الموافقة " : " الموافقة "));
				}
				else {
					ShowMessage("No Changes 😒", "لا تغييرات 😒");
				}
			}
		}
	}
	function ViewUser(item: IQ_ViewItems) {
		$("#Open").focus();
		localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
		SetModelGlopel(item)
		OpenPagePartial("Items", "Edit Items 👤", () => { Display_Refrsh() });
	}
	function ViewHangingQty(itemID: number) {
		sys.FindKeyPagination("Items", "BtnHang", " ItemID = " + itemID , () => {

			let DataRow: IQ_ItemQtyHanging = SelectDataSearch.DataRow;	  
			 
			  
		});


	}
	function Clear() {
		$('#drpTypeItems').val("null");
		$('#drpActive').val("null");
		$('#drpCategory').val("null");
		$('#drpItemFamily').val("null");
		$('#btnDelete_Filter').addClass('display_none');
		CleaningList_Table();
		_Grid.DataSource = _Datanone;
		_Grid.Bind();
	}

	var Run_Fun = false;
	function Display_Refrsh() {
		if (!Run_Fun) {
			Run_Fun = true;
			return
		}
		GetData(false, 0, false, true);
	}
	function IsActive(ID: number, Active: number) {


		SqlExecuteQuery(" update [dbo].[D_I_Items] set [ISActive] = " + Active + " where [ItemID] = " + ID + "; update G_Data_Redis set Status = 0 where KeyTrigger = 'Items' ")

		GetData(true, ID, Active == 0 ? false : true, true);
	}
}
