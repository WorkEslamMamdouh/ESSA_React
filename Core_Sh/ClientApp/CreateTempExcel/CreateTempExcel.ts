
$(document).ready(() => {
	CreateTempExcel.InitalizeComponent();

});

namespace CreateTempExcel {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var Grid: ESGrid = new ESGrid();
	var ListFltr: Array<E_D_G_TypeTempExcel> = new Array<E_D_G_TypeTempExcel>();
	var ListDrop: Array<E_G_Link_BuildFeildExcelTable> = new Array<E_G_Link_BuildFeildExcelTable>();
	var ListData: Array<E_D_G_CreateTempExcel> = new Array<E_D_G_CreateTempExcel>();
	var ModelDetails: Array<E_D_G_CreateTempExcel> = new Array<E_D_G_CreateTempExcel>();
	var Res: SystemResources = GetGlopelResources();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var DrpTypeTemp: HTMLSelectElement;
	export function InitalizeComponent() {
		DrpTypeTemp = document.getElementById("DrpTypeTemp") as HTMLSelectElement;
		GetTypeTrans();
		InitializeGridControl();
		Get_Data();

		//**********************
		Close_Loder();
		InitializeEvent();

	}
	function InitializeEvent() {
		DrpTypeTemp.onchange = Get_Data;
	}
	function GetTypeTrans() {
		var Table: Array<Table>;
		Table =
			[
			{ NameTable: 'E_D_G_TypeTempExcel', Condition: " CompCode = " + CompCode + " and IsActive = 1" },
			{ NameTable: 'E_G_Link_BuildFeildExcelTable', Condition: " IsActive = 1 and IsShow = 1 " },
			]

		DataResult(Table);
		ListFltr = GetDataTable('E_D_G_TypeTempExcel');
		ListDrop = GetDataTable('E_G_Link_BuildFeildExcelTable');

 		FillDropDown(ListFltr, DrpTypeTemp, "IDTypeTemp", (Res.Lang == "Ar" ? "DescA" : "DescE"), null)
	}
	function Get_Data() {

		if (DrpTypeTemp.value == '') {
			return
        }

		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'E_D_G_CreateTempExcel', Condition: " CompCode = " + CompCode + " and IDTypeTemp = " + DrpTypeTemp.value },
			]

		DataResult(Table);
		//**************************************************************************************************************

		ListData = GetDataTable('E_D_G_CreateTempExcel');
		DisplayDataGridControl(ListData, Grid);
	}
	function InitializeGridControl() {
		 
		Grid.ESG.NameTable = 'div_Grid';
		Grid.ESG.PrimaryKey = 'IDTempExcel';
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
		Grid.ESG.object = new E_D_G_CreateTempExcel();
		Grid.Column = [
			{ title: "IDTempExcel", ID: "IDTempExcel", Name: "IDTempExcel", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
			{ title: "CompCode", ID: "CompCode", Name: "CompCode", Type: "number", value: CompCode.toString(), style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
			{ title: "CustomFeild", ID: "CustomFeild", Name: "CustomFeild", Type: "number", value:"", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
			{ title: "IDTypeTemp", ID: "IDTypeTemp", Name: "IDTypeTemp", Type: "number", value: DrpTypeTemp.value, style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
			{ title: Res.Lang == "Ar" ? "مسلسل" : "serial", ID: "Serial", Name: "Serial", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
			{ title: Res.Lang == "Ar" ? "العنوان" : "Title", ID: "NameTitle", Name: "NameTitle", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
			{ title: Res.Lang == "Ar" ? "الملاحظات" : "Remarks", ID: "Remark", Name: "Remark", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
			{ title: Res.Lang == "Ar" ? "ربط الحقل" : "Field link", ID: "IDFeildExcel", Name: "IDFeildExcel", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Dropdown(ListDrop, "IDFeildExcel", "DescA", null, () => { }) },
 		]
		//Validation: Valid.Set(true, ' ', "#Is_Active#" + "==" + "true")

		BindGridControl(Grid);
	}
	function btnSave_onclick() {

		if (true) {

		}

		Assign()
		Update()
	}
	function Assign() {
		ModelDetails = new Array<E_D_G_CreateTempExcel>();
		ModelDetails = Grid.ESG.Model;
		for (var i = 0; i < ModelDetails.length; i++) {

			let res = ListDrop.filter(x => x.IDFeildExcel == ModelDetails[i].IDFeildExcel)
			if (res.length > 0) {
				ModelDetails[i].IDLnkExcel = res[0].IDLnkExcel
			}

			ModelDetails[i].IDTypeTemp = Number(DrpTypeTemp.value);
		}

	}
	function Validation() {
		//debugger
		//alert("ss")
		//ModelDetails = Grid.ESG.Model;

		/*() => { Validation() }*/

		//for (var i = 0; i < Grid.ESG.LastCounter; i++) {
		//	Grid.ESG.RowCnt =i
		//	let ID = ('NameTitle').Get_IDInRow(Grid);
		//	let ID = ('NameTitle').Get_IDInRow(Grid);



		//	$('#' + ID).val()


		//}

	}
	function Update() {
		Ajax.CallsyncSave({
			type: "POST",
			url: sys.apiUrl("TypeTempExcel", "UpdateListCreateTempExcel"),
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
