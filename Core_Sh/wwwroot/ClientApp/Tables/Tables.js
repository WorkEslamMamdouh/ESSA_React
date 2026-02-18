$(document).ready(() => {
    Tables.InitalizeComponent();
});
var Tables;
(function (Tables) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Grid = new ESGrid();
    var ListData = new Array();
    var ModelDetails = new Array();
    var Res = GetGlopelResources();
    function InitalizeComponent() {
        InitializeGridControl();
        Get_Data();
        //**********************
        Close_Loder();
    }
    Tables.InitalizeComponent = InitalizeComponent;
    function Get_Data() {
        var Table;
        Table =
            [
                { NameTable: 'D_I_Tables', Condition: "" },
            ];
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
        ];
        //Validation: Valid.Set(true, 'ياحمار', "#Is_Active#" + "==" + "true")
        BindGridControl(Grid);
    }
    function btnSave_onclick() {
        Assign();
        Update();
    }
    function Assign() {
        ModelDetails = new Array();
        ModelDetails = Grid.ESG.Model;
    }
    function Update() {
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("Tables", "UpdateList"),
            data: JSON.stringify({ DataSend: JSON.stringify(ModelDetails) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    Get_Data();
                    Close_Loder();
                    ShowMessage("Updated 🤞😉", "تم التحديث 🤞😉");
                }
                else {
                }
            }
        });
    }
})(Tables || (Tables = {}));
//# sourceMappingURL=Tables.js.map