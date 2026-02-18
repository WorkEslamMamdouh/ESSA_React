
$(document).ready(() => {
    Category.InitalizeComponent(); 
}); 
namespace Category {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var Grid: ESGrid = new ESGrid(); 
    var ListData: Array<D_I_Category> = new Array<D_I_Category>();
    var ModelDetails: Array<D_I_Category> = new Array<D_I_Category>();
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
            { NameTable: 'D_I_Category', Condition: " CompCode = " + CompCode },
            ]

        DataResult(Table);
        //**************************************************************************************************************
   
        ListData = GetDataTable('D_I_Category');

        DisplayDataGridControl(ListData, Grid);
    }
    function InitializeGridControl() { 

        var List = [
            { Type_Show: 0 , Name : "مبيعات و مشتريات"},
            { Type_Show: 1 , Name : "مبيعات "},
            { Type_Show: 2 , Name : "  مشتريات"},
        ]
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
        Grid.ESG.object = new D_I_Category(); 
        Grid.Column = [
            { title: "CatID", ID: "CatID", Name: "CatID", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "CompCode", ID: "CompCode", Name: "CompCode", Type: "number", value: CompCode.toString(), style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "Ser", ID: "Ser", Name: "Ser", Type: "number", value: "cnt", style: "width: 100%", Edit: false, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "CatCode_____", ID: "CatCode", Name: "CatCode", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true, (Res.Lang == "Ar" ? 'برجاء ادخال الكود ' : 'Please enter code')), ColumnType: ControlType.Input() },
            { title: "Description___", ID: "DescA", Name: "DescA", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            //{ title: "DescE", ID: "DescE", Name: "DescE", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title: "Remarks__________", ID: "Remarks", Name: "Remarks", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },         
            { title: "Type_Show", ID: "Type_Show", Name: "Type_Show", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Dropdown(List,"Type_Show" , "Name", null, () => { }) },
        ]
        //Validation: Valid.Set(true, 'ياحمار', "#Is_Active#" + "==" + "true")

        BindGridControl(Grid);
    }   
    function btnSave_onclick() {
        Assign()
        Update()
    }
    function Assign() {
        ModelDetails = new Array<D_I_Category>();
        ModelDetails = Grid.ESG.Model;
    }
    function Update() {  
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("Category", "UpdateList"),
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
