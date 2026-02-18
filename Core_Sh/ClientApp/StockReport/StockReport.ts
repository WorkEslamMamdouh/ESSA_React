$(document).ready(() => {
	StockReport.InitalizeComponent();  
});		   
namespace StockReport {	  
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var Res: SystemResources = GetGlopelResources();
	var _Category: Array<D_I_Category> = new Array<D_I_Category>();
	var _ItemFamily: Array<D_I_ItemFamily> = new Array<D_I_ItemFamily>();
	var BalType: HTMLSelectElement;
	var drpCatID: HTMLSelectElement;
	var drpFamilyID: HTMLSelectElement;
	var ItemID: HTMLInputElement;
	var btnItem: HTMLButtonElement;
	var PrintPdf: HTMLButtonElement;
	var PrintExcel: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;
	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();
		$('#Txt_From_Date').val(DateStartYear());
		$('#Txt_To_Date').val(GetDate());
		DisplayDataDropDown()
		Close_Loder();
	}
	function InitalizeControls() {
		BalType = document.getElementById('BalType') as HTMLSelectElement;
		drpCatID = document.getElementById('drpCatID') as HTMLSelectElement;
		drpFamilyID = document.getElementById('drpFamilyID') as HTMLSelectElement;
		ItemID = document.getElementById('ItemID') as HTMLInputElement;
		btnItem = document.getElementById('btnItem') as HTMLButtonElement;
		PrintExcel = document.getElementById('PrintExcel') as HTMLButtonElement;
		PrintPdf = document.getElementById('PrintPdf') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
	}
	function InitializeEvents() {
		PrintPdf.onclick = Print_Pdf;
		PrintExcel.onclick = Print_Excel;
		btnDelete_Filter.onclick = Clear;
		btnItem.onclick = SearchItem;
		drpCatID.onchange = drpCatID_onchange;
	}
	function DisplayDataDropDown() {	 
		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'D_I_Category', Condition: " CompCode = " + CompCode + " and Type_Show = 0" },
				{ NameTable: 'D_I_ItemFamily', Condition: " CompCode = " + CompCode },

			]

		DataResult(Table);
		//************************************************************************************************************** 
		_Category = GetDataTable('D_I_Category');
		_ItemFamily = GetDataTable('D_I_ItemFamily');

		debugger


		FillDropwithAttr(_Category, "drpCatID", "CatID", (Res.Lang == "Ar" ? "DescA" : "DescA"), (Res.Lang == "Ar" ? "جميع الفئات" : "All Category"), "", "");

		//FillDropwithAttr(_ItemFamily, "drpFamilyID", "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "جميع انواع الاصناف" : "All Item Family"), "", "");

	}
	function drpCatID_onchange() {
		$('#drpFamilyID').html("");
		if (drpCatID.value == "null") {
			$('#drpFamilyID').append("<option value=null>" + Res.All + "</option>");
		}
		else {
			let fltr_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(drpCatID.value))
			FillDropwithAttr(fltr_ItemFamily, "drpFamilyID", "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), (Res.Lang == "Ar" ? "جميع انواع الاصناف" : "All Item Family"), "", "");
		}
	}
	function Clear() {
		BalType.value = "0";
		drpCatID.value = "null";
		drpFamilyID.value = "null";
		ItemID.value = "";
		btnItem.value = Res.Lang == "Ar" ? "بحث صنف" : "Search Item";
	}
	function SearchItem() {
		let cond = "";

		if (drpCatID.value != "null") {
			cond = " and CatID = " + drpCatID.value + "";
		}
		if (drpFamilyID.value != "null") {
			cond += " and ItemFamilyID = " + drpFamilyID.value + "";
		}
		//sys.FindKey("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1 ", () => {
		//sys.FindKeySpeed("Items", " CompCode = " + CompCode + "  and ISActive = true " + cond, 'SearchForm', () => {
		sys.FindKeyPagination("Items", "btnItems", " CompCode = " + CompCode + "  and ISActive = 1  " + cond, () => {


			let SelectedItem = SelectDataSearch.DataRow;
			//let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
			ItemID.value = SelectedItem.ItemID.toString();
			btnItem.value = SelectedItem.ItemName;
		});
	}
	function Print_Pdf() {
		let Item = ItemID.value == "" ? "null" : ItemID.value;
		var RepParam: Array<RepParamter>;
		RepParam =
			[
				{ Parameter: 'CompCode', Value: "" + Number(CompCode) + "" },
				{ Parameter: 'CatID', Value: "" + drpCatID.value + "" },
				{ Parameter: 'FamilyID', Value: "" + drpFamilyID.value + "" },
				{ Parameter: 'ItemID', Value: "" + Item + "" },
				{ Parameter: 'BalType', Value: "" + Number(BalType.value) + "" },
			]
		if (Res.Lang == "Ar") {
			Print_Report("Rpt_StockItemAr", "IProc_Rpt_StockItem", RepParam);
		} else {
			Print_Report("Rpt_StockItemEn", "IProc_Rpt_StockItem", RepParam);

		}
	}
	function Print_Excel() {
		let Item = ItemID.value == "" ? "null" : ItemID.value;
		let keyMapping = {
			ItemCode: "كود الصنف",
			ItemName: "وصف الصنف",
			OpeningQty: "الكمية الافتتاحية",
			OpeningCost: "التكلفة الافتتاحية",
			PurchaseQty: "الكمية المشتراه",
			PurchaseQtyRet: "الكمية المشتراه المرتجعه",
			PurchaseCost: "تكلفة القطعة",
			SaleQty: "الكمية المباعه",
			SaleQtyRet: "الكمية المباعه المرتجعه",
			SaleCost: "سعر القطعة",
			QtyInCenter: "كمية المركز",
			HangingQty: "الكمية المعلقة",
			AvailableQty: "الكمية المتاحه",
			AvailableUnitCost: "تكلفة الوحدة",
			StockCost: "تكلفة المخزون",
		};
		Print_Report_Excel("IProc_Rpt_StockItem " + CompCode + "," + drpCatID.value + ", " + drpFamilyID.value + " , " + Item + " , " + BalType.value + " ", "IProc_Rpt_StockItem", "Report Stock item", keyMapping)
	}	   
}
