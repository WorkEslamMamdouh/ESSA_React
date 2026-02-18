

$(document).ready(() => {
    TypeEmployees.InitalizeComponent();
});
namespace TypeEmployees {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var Grid: ESGrid = new ESGrid();
    var _ListEmpType: Array<G_Codes> = new Array<G_Codes>();
    var ListData: Array<G_TypeEmployees> = new Array<G_TypeEmployees>();
    var ModelDetails: Array<G_TypeEmployees> = new Array<G_TypeEmployees>();
    var Res: SystemResources = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    export function InitalizeComponent() {
        InitializeGridControl();
        Get_Data();

        //**********************
        Close_Loder();


    }
    function Get_Data() {
        var Table: Array<Table>;
        Table =
            [
            { NameTable: 'G_Codes', Condition: " CodeType = 'EmpType' "  },
            { NameTable: 'G_TypeEmployees', Condition: " CompCode = " + CompCode },
            ]

        DataResult(Table);
        //**************************************************************************************************************

        _ListEmpType = GetDataTable('G_Codes'); 
        ListData = GetDataTable('G_TypeEmployees');
        debugger
        console.log(_ListEmpType)
        InitializeGridControl();
        DisplayDataGridControl(ListData, Grid);
    }
    function InitializeGridControl() {
        Grid.ESG.NameTable = 'div_Grid';
        Grid.ESG.PrimaryKey = 'IDTypeEmp';
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
        Grid.ESG.object = new G_TypeEmployees();
        Grid.Column = [
            { title: "IDTypeEmp", ID: "IDTypeEmp", Name: "IDTypeEmp", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "CompCode", ID: "CompCode", Name: "CompCode", Type: "number", value: CompCode.toString(), style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "EmpType" : 'نوع الموظف', ID: "EmpType", Name: "EmpType", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Dropdown(_ListEmpType,"CodeValue", "DescA") },
            { title: Res.Lang == "En" ? "DescA" : 'الوصف عربي', ID: "DescA", Name: "DescA", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "DescE" : 'الوصف انجليزي', ID: "DescE", Name: "DescE", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "Remark" : 'الملاحظات', ID: "Remark", Name: "Remark", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "ISActive" : "نشط", ID: "ISActive", Name: "ISActive", Type: "number", value: "1", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.checkbox() },
           
        ]
     

        BindGridControl(Grid);
    }
    function btnSave_onclick() {
        Assign()
        Update()
    }
    function Assign() {
        ModelDetails = new Array<G_TypeEmployees>();
        ModelDetails = Grid.ESG.Model;
    }
    function Update() {
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("TypeEmployees", "UpdateList"),
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

