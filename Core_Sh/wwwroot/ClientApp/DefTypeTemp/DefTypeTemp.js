$(document).ready(function () {
    DefTypeTemp.InitalizeComponent();
});
var DefTypeTemp;
(function (DefTypeTemp) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Grid = new ESGrid();
    var ListData = new Array();
    var ModelDetails = new Array();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGridControl();
        Get_Data();
        Close_Loder();
    }
    DefTypeTemp.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitializeEvents() {
    }
    function Get_Data() {
         ;
        var Table;
        Table =
            [
                { NameTable: 'G_TypeTempExcel', Condition: " CompCode = " + CompCode },
            ];
        DataResult(Table);
        //**************************************************************************************************************
         ;
        ListData = GetDataTable('G_TypeTempExcel');
        Display_Grid(ListData);
    }
    function InitializeGridControl() {
        Grid.ESG.NameTable = 'div_Grid';
        Grid.ESG.PrimaryKey = 'IDTypeTemp';
        Grid.ESG.Right = false;
        Grid.ESG.Edit = true;
        Grid.ESG.Back = true;
        Grid.ESG.Save = true;
        Grid.ESG.Add = true;
        Grid.ESG.DeleteRow = true;
        Grid.ESG.CopyRow = true;
        Grid.ESG.OnfunctionSave = btnSave_onclick;
        //Grid.ESG.OnfunctionTotal = computeTotal;
        //Grid.ESG.OnRowDoubleClicked = DoubleClicked; // Grid.ESG.SelectedKey
        Grid.ESG.OnRowRunFunction = OnRowRunFunction; //  OnRowRunFunction
        Grid.ESG.OnEditGridRunFunction = EditGrid; //  OnEditGridRunFunction
        Grid.ESG.object = new G_TypeTempExcel();
        Grid.Column = [
            { title: "IDTypeTemp", ID: "IDTypeTemp", Name: "IDTypeTemp", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "CompCode", ID: "CompCode", Name: "CompCode", Type: "number", value: CompCode.toString(), style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "TypeDesc_______________", ID: "DescA", Name: "DescA", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true, 'برجاء ادخال اسم نوع العهده'), ColumnType: ControlType.Input() },
            { title: "Remark___________________", ID: "Remark", Name: "Remark", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "StatusFlag_________", ID: "StatusFlag", Name: "StatusFlag", Type: "text", value: "", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input(function () { }) },
        ];
        //Validation: Valid.Set(true, 'ياحمار', "#Is_Active#" + "==" + "true")
        BindGridControl(Grid);
    }
    function EditGrid() {
         ;
        if (('Type').Get_ValInRow(Grid) == '0') {
            ('User_Type').Set_ValInRow('-1', Grid);
            ('User_Type').Add_AttrInRow('disabled', 'disabled', Grid);
        }
        else {
            ('User_Type').RemoveAttrInRow('disabled', Grid);
        }
    }
    function OnRowRunFunction() {
         ;
        //alert(Grid.ESG.Cnt);
        //if (('ISClose').Get_CheakInRow(Grid) == true) {
        //    $('.ISClose' + Grid.ESG.Cnt).attr('disabled', 'disabled');
        //    $('.ISClose' + Grid.ESG.Cnt).removeClass('Edit_div_Grid');
        //}
        //else {
        //    $('.ISClose' + Grid.ESG.Cnt).removeAttr('disabled')
        //    $('.ISClose' + Grid.ESG.Cnt).addClass('Edit_div_Grid');
        //}
        //alert(('ISClose').Get_CheakInRow(Grid))
    }
    function Display_Grid(Display) {
        Display = Display.sort(dynamicSort("Serial"));
        DisplayDataGridControl(Display, Grid);
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
        Assign();
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("TypeTempExcel", "UpdateList"),
            data: JSON.stringify({ DataSend: JSON.stringify(ModelDetails) }),
            //data: {
            //    DataSend: JSON.stringify(ModelDetails)
            //},
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    Get_Data();
                    Close_Loder();
                    ShowMessage("Done 🤞😉");
                }
                else {
                }
            }
        });
    }
})(DefTypeTemp || (DefTypeTemp = {}));
//# sourceMappingURL=DefTypeTemp.js.map