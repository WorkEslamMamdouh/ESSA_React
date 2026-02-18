

$(document).ready(() => {
    CashTypes.InitalizeComponent();
});
namespace CashTypes {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var Grid: ESGrid = new ESGrid();
    var ListData: Array<D_A_CashTypes> = new Array<D_A_CashTypes>();
    var ModelDetails: Array<D_A_CashTypes> = new Array<D_A_CashTypes>();
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
            { NameTable: 'D_A_CashTypes', Condition: " CompCode = " + CompCode },
            ]

        DataResult(Table);
        //**************************************************************************************************************

        ListData = GetDataTable('D_A_CashTypes');
        ListData = ListData.sort(dynamicSort("Ser"));

        DisplayDataGridControl(ListData, Grid);
    }
    function InitializeGridControl() {
        Grid.ESG.NameTable = 'div_Grid';
        Grid.ESG.PrimaryKey = 'CashTypeID';
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
        Grid.ESG.object = new D_A_CashTypes();
        Grid.Column = [
            { title: "CashTypeID", ID: "CashTypeID", Name: "CashTypeID", Type: "number", value: "0", style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: "CompCode", ID: "CompCode", Name: "CompCode", Type: "number", value: CompCode.toString(), style: "width: 100%", Edit: false, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title:Res.Lang == "En" ?  "Ser" : 'المسلسل', ID: "Ser", Name: "Ser", Type: "number", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title:Res.Lang == "En" ?  "Description" : 'الوصف', ID: "Description", Name: "Description", Type: "text", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.Input() },
            { title:Res.Lang == "En" ?  "ChargePrc" : "نسبة_الاضافه", ID: "ChargePrc", Name: "ChargePrc", Type: "number", value: "", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title:Res.Lang == "En" ?  "CashAccCode" : "رقم_الحساب", ID: "CashAccCode", Name: "CashAccCode", Type: "text", value: "", style: "width: 100%", Edit: true, visible: false, Validation: Valid.Set(false), ColumnType: ControlType.Input() },
            { title: Res.Lang == "En" ? "IsActive" : "نشط", ID: "IsActive", Name: "IsActive", Type: "number", value: "1", style: "width: 100%", Edit: true, visible: true, Validation: Valid.Set(true), ColumnType: ControlType.checkbox() },
           
        ]
     

        BindGridControl(Grid);
    }
    function btnSave_onclick() {
        Assign()
        Update()
    }
    function Assign() {
        ModelDetails = new Array<D_A_CashTypes>();
        ModelDetails = Grid.ESG.Model;
    }
    function Update() {
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("CashTypes", "UpdateList"),
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

