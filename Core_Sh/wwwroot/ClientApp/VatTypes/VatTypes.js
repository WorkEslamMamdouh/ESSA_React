$(document).ready(() => {
    VatTypes.InitalizeComponent();
});
var VatTypes;
(function (VatTypes) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Grid = new ESGrid();
    var ListData = new Array();
    var ModelDetails = new Array();
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    function InitalizeComponent() {
        Get_Data();
        Close_Loder();
    }
    VatTypes.InitalizeComponent = InitalizeComponent;
    function Get_Data() {
        var Table;
        Table =
            [
                { NameTable: 'D_A_VatType', Condition: " CompCode = " + CompCode },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        ListData = GetDataTable('D_A_VatType');
        ListData.sort((a, b) => {
            if (a.Type !== b.Type) {
                return a.Type - b.Type;
            }
            else {
                return a.LineOrder - b.LineOrder;
            }
        });
        InitializeGridControl();
        DisplayDataGridControl(ListData, Grid);
    }
    function InitializeGridControl() {
        let typeVat = [
            { Desc: Res.Lang == "En" ? "Sales" : "المبيعات", Type: 1 },
            { Desc: Res.Lang == "En" ? "Purchase" : "المشتريات", Type: 2 },
        ];
        Grid.ESG.NameTable = 'div_Grid';
        Grid.ESG.PrimaryKey = 'VatTypeID';
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
        Grid.ESG.object = new D_A_VatType();
        Grid.Column = [
            { title: "VatTypeID", ID: "VatTypeID", Name: "VatTypeID", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "CompCode", ID: "CompCode", Name: "CompCode", Type: "number", value: CompCode.toString(), style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "Ser" : "المسلسل", ID: "LineOrder", Name: "LineOrder", Type: "number", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "Type" : "النوع", ID: "Type", Name: "Type", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Dropdown(typeVat, "Type", "Desc", null) },
            { title: Res.Lang == "En" ? "Description" : "الوصف", ID: "Describtion", Name: "Describtion", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "VatPrc" : "النسبه", ID: "VatPrc", Name: "VatPrc", Type: "number", value: "0", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
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
            url: sys.apiUrl("VatTypes", "UpdateList"),
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
})(VatTypes || (VatTypes = {}));
//# sourceMappingURL=VatTypes.js.map