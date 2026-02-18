$(document).ready(() => {
    FinancialType.InitalizeComponent();
});
var FinancialType;
(function (FinancialType) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Grid = new ESGrid();
    var ListGCodes = new Array();
    var ListData = new Array();
    var ModelDetails = new Array();
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var TrType;
    function InitalizeComponent() {
        TrType = document.getElementById('TrType');
        TrType.onchange = Get_Data;
        Get_Data();
        //**********************
        Close_Loder();
    }
    FinancialType.InitalizeComponent = InitalizeComponent;
    function Get_Data() {
        var Table;
        Table =
            [
                { NameTable: 'D_A_FinancialType', Condition: "CompCode =" + SysSession.CurrentEnvironment.CompCode + " and  TrType = " + Number($('#TrType').val()) },
                { NameTable: 'G_Codes', Condition: " CodeType = 'FinType' and SubCode in(" + Number($('#TrType').val()) + ",3)" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        ListGCodes = GetDataTable('G_Codes');
        ListData = GetDataTable('D_A_FinancialType');
        InitializeGridControl();
        DisplayDataGridControl(ListData, Grid);
    }
    function InitializeGridControl() {
        Grid.ESG.NameTable = 'div_Grid';
        Grid.ESG.PrimaryKey = 'FinancialTypeID';
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
        Grid.ESG.object = new D_A_FinancialType();
        Grid.Column = [
            { title: "FinancialTypeID", ID: "FinancialTypeID", Name: "FinancialTypeID", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "CompCode", ID: "CompCode", Name: "CompCode", Type: "number", value: SysSession.CurrentEnvironment.CompCode, style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "TrType", ID: "TrType", Name: "TrType", Type: "number", value: $("#TrType").val(), style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "DescriptionAr" : "الوصف_العربي", ID: "DescAr", Name: "DescAr", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "DescriptionEn" : "الوصف_بالانجليزي", ID: "DescEn", Name: "DescEn", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? " Types_Link" : "نوع الربط", ID: "SearchTypes", Name: "SearchTypes", Type: "number", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Dropdown(ListGCodes, 'CodeValue', (Res.Lang == "En" ? "DescE" : "DescA")) },
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
            url: sys.apiUrl("FinancialType", "UpdateList"),
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
})(FinancialType || (FinancialType = {}));
//# sourceMappingURL=FinancialType.js.map