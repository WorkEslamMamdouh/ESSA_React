
$(document).ready(() => {
	ExcelTypes.InitalizeComponent();

});

namespace ExcelTypes {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var Grid: ESGrid = new ESGrid();
	var List: Array<E_G_Link_CreateExcelByTable> = new Array<E_G_Link_CreateExcelByTable>();
	var ListG_Codes: Array<G_Codes> = new Array<G_Codes>();
	var ListData: Array<E_D_G_TypeTempExcel> = new Array<E_D_G_TypeTempExcel>();
	var ModelDetails: Array<E_D_G_TypeTempExcel> = new Array<E_D_G_TypeTempExcel>();
	var Res: SystemResources = GetGlopelResources();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	export function InitalizeComponent() {			  
		GetTypeTrans();
		InitializeGridControl();
		Get_Data();								  
		Close_Loder();											   
	}
	function GetTypeTrans() {
		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'E_G_Link_CreateExcelByTable', Condition: " CompCode = " + CompCode },
				{ NameTable: 'G_Codes', Condition: " CodeType = 'ExcelProssType' " },
			]

		DataResult(Table);
		List = GetDataTable('E_G_Link_CreateExcelByTable');
		ListG_Codes = GetDataTable('G_Codes');

	}
	function Get_Data() {
		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'E_D_G_TypeTempExcel', Condition: " CompCode = " + CompCode },
				{ NameTable: 'E_G_Link_CreateExcelByTable', Condition: " CompCode = " + CompCode },
			]

		DataResult(Table);
		//**************************************************************************************************************

		ListData = GetDataTable('E_D_G_TypeTempExcel');
		DisplayDataGridControl(ListData, Grid);
	}
	function InitializeGridControl() {


		Grid.ESG.NameTable = 'div_Grid';
		Grid.ESG.PrimaryKey = 'IDTypeTemp';
		Grid.ESG.Right = false;
		//-----------------------------Privileges-----------------------------
		Grid.ESG.Edit = SysSession.CurrentPrivileges.EDIT;
		Grid.ESG.Back = true;
		Grid.ESG.Save = SysSession.CurrentPrivileges.CREATE;
		Grid.ESG.Add = SysSession.CurrentPrivileges.CREATE;
		Grid.ESG.DeleteRow = SysSession.CurrentPrivileges.DELETE;
		Grid.ESG.CopyRow = SysSession.CurrentPrivileges.CUSTOM1;
		//----------------------------------------------------------
		Grid.ESG.OnfunctionSave = btnSave_onclick;
		Grid.ESG.object = new E_D_G_TypeTempExcel();
		Grid.Column = [
			{ title: "IDTypeTemp", ID: "IDTypeTemp", Name: "IDTypeTemp", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
			{ title: "CompCode", ID: "CompCode", Name: "CompCode", Type: "number", value: CompCode.toString(), style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
			{ title: Res.Lang == "Ar" ? "الوصف A" : "DescriptionAr", ID: "DescA", Name: "DescA", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
			{ title: Res.Lang == "Ar" ? "الوصف E" : "DescriptionEn", ID: "DescE", Name: "DescE", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
			{ title: Res.Lang == "Ar" ? "الملاحظات" : "Remarks", ID: "Remark", Name: "Remark", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
			{ title: Res.Lang == "Ar" ? "نوع الحركة" : "Type_Trans", ID: "IDLnkExcel", Name: "IDLnkExcel", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Dropdown(List, "IDLnkExcel", "NameA", null, () => { }) },
			{ title: Res.Lang == "Ar" ? "نوع الربط" : "Type Link", ID: "ProssType", Name: "ProssType", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Dropdown(ListG_Codes, "CodeValue", (Res.Lang == "Ar" ? "DescA" : "DescE"), null, () => { }) },
			{ title: Res.Lang == "Ar" ? "تنشيط" : "Active", ID: "IsActive", Name: "IsActive", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.checkbox() },
		]
		//Validation: Valid.Set(true, ' ', "#Is_Active#" + "==" + "true")

		BindGridControl(Grid);
	}
	function btnSave_onclick() {
		Assign()
		Update()
	}
	function Assign() {
		ModelDetails = new Array<E_D_G_TypeTempExcel>();
		ModelDetails = Grid.ESG.Model;
	}
	function Update() {
		Ajax.CallsyncSave({
			type: "POST",
			url: sys.apiUrl("TypeTempExcel", "UpdateListTypeTempExcel"),
			data: JSON.stringify({ DataSend: JSON.stringify(ModelDetails) }),
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess == true) {
					Get_Data();
					Close_Loder();
					ShowMessage("Updated 🤞😉", "تم التحديث 🤞😉");
				} else {

				}
			}
		});

	}
}
