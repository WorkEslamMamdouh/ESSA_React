$(document).ready(() => {
    DG_Store.InitalizeComponent();
});
var DG_Store;
(function (DG_Store) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Grid = new ESGrid();
    var ListData = new Array();
    var ModelDetails = new Array();
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    function InitalizeComponent() {
        InitializeGridControl();
        Get_Data();
        //**********************
        Close_Loder();
    }
    DG_Store.InitalizeComponent = InitalizeComponent;
    function Get_Data() {
        var Table;
        Table =
            [
                { NameTable: 'D_G_Store', Condition: " CompCode = " + CompCode },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        ListData = GetDataTable('D_G_Store');
        ListData = ListData.sort(dynamicSort("Ser"));
        DisplayDataGridControl(ListData, Grid);
    }
    function InitializeGridControl() {
        Grid.ESG.NameTable = 'div_Grid';
        Grid.ESG.PrimaryKey = 'StoreID';
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
        Grid.ESG.object = new D_G_Store();
        Grid.Column = [
            { title: "StoreID", ID: "StoreID", Name: "StoreID", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "CompCode", ID: "CompCode", Name: "CompCode", Type: "number", value: CompCode.toString(), style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "Description" : 'الوصف', ID: "Description", Name: "Description", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "location" : 'الموقع', ID: "location", Name: "location", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "Remark" : 'ملاحظات', ID: "Remark", Name: "Remark", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "IsActive" : "نشط", ID: "IsActive", Name: "IsActive", Type: "number", value: "1", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.checkbox() },
        ];
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
            url: sys.apiUrl("D_G_Store", "UpdateList"),
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
})(DG_Store || (DG_Store = {}));
//# sourceMappingURL=D_G_Store.js.map