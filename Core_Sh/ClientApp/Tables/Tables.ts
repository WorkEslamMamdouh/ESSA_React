
$(document).ready(() => {
    Tables.InitalizeComponent(); 
}); 
namespace Tables {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var Grid: ESGrid = new ESGrid(); 
    var ListData: Array<D_I_Tables> = new Array<D_I_Tables>();
    var ModelDetails: Array<D_I_Tables> = new Array<D_I_Tables>();
    var Res: SystemResources = GetGlopelResources();
    
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
            { NameTable: 'D_I_Tables', Condition: ""  },
            ]

        DataResult(Table);
        //**************************************************************************************************************
   
        ListData = GetDataTable('D_I_Tables');

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
        Grid.ESG.object = new D_I_Tables(); 
        Grid.Column = [
            { title: "TableID", ID: "TableID", Name: "TableID", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "TableNumber", ID: "TableNumber", Name: "TableNumber", Type: "TableNumber", value: "cnt", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: "ISActive", ID: "ISActive", Name: "ISActive", Type: "number", value: "1", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.checkbox() },
                    
        ]
        //Validation: Valid.Set(true, 'ياحمار', "#Is_Active#" + "==" + "true")

        BindGridControl(Grid);
    }   
    function btnSave_onclick() {
        Assign()
        Update()
    }
    function Assign() {
        ModelDetails = new Array<D_I_Tables>();
        ModelDetails = Grid.ESG.Model;
    }
    function Update() {  
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("Tables", "UpdateList"),
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
