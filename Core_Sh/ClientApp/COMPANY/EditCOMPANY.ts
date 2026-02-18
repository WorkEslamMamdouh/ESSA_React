
$(document).ready(() => {
    EditCOMPANY.InitalizeComponent();

});

namespace EditCOMPANY {
     
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid: JsGrid = new JsGrid();
     
    var _Usersnone: Array<G_COMPANY> = new Array<G_COMPANY>();
 
  
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;
    var Res = GetGlopelResources();

    export function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();

        $('#Txt_FromTrData').val(GetDate())
        $('#Txt_TOTrData').val(GetDate())
        Close_Loder();
    }
    function InitalizeControls() { 
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
    }
    function InitializeEvents() { 
        Filter_View.onclick = () => { GetData() };
        btnDelete_Filter.onclick = Clear;
    }
  
 
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";                     
        _Grid.PrimaryKey = "COMP_CODE";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "COMP_CODE", name: "COMP_CODE", type: "text", width: "100px" },
            { title: "NameA", name: "NameA", type: "text", width: "100px" },
            { title: "NameE", name: "NameE", type: "text", width: "100px" },
            { title: "VATNO", name: "VATNO", type: "text", width: "100px" },  
            {
                title: "Active", width: "50px", 
                itemTemplate: (s: string, item: G_COMPANY): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.COMP_CODE;
                    txt.className = "checkbox";       
                    txt.checked = item.IsActive;
                    txt.style.width = "50px"
                    txt.style.height = "35px"
                    txt.onclick = (e) => {
                        IsActive(item.COMP_CODE, txt.checked);
                    };
                    return txt;
                }
            },
            {
                title: "Edit",
                itemTemplate: (s: string, item: G_COMPANY): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Edit ⚙️");
                    txt.id = "butView" + item.COMP_CODE;
                     txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

                    txt.onclick = (e) => {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
            
        ];
        _Grid.Bind();

    }
    function ViewUser(item: G_COMPANY) {
         
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item)
        OpenPagePartial("G_COMPANY", "EditCOMPANY", () => { Display_Refrsh() });
 
    }
    function GetData(IsChangeActive: boolean = false, ID: number = 0, Status: boolean = false, ISDirect: boolean = false) {

        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }


         
        CleaningList_Table();



        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'G_COMPANY', "", SelectPageNumber.PageNumber, 5, "COMP_CODE")
        }
        else {
            DisplayGridByPagination(_Grid, 'G_COMPANY', "", 1, 5, "COMP_CODE")
        }

         

        //var Table: Array<Table>;
        //Table =
        //    [
        //    { NameTable: 'G_COMPANY', Condition: "" },

        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************
         
        //_UsersList = GetDataTable('G_COMPANY');
        //_UsersList = _UsersList.sort(dynamicSort(""));
        //_Grid.DataSource = _UsersList;
        //_Grid.Bind();

        $('#btnDelete_Filter').removeClass('display_none');

        if (IsChangeActive && ID > 0) {
            let chack = _Grid.DataSource.filter(x => x.COMP_CODE == ID)
            if (chack.length > 0) {
                if (chack[0].IsActive == Status) {
                    ShowMessage("Done Change 😍👌" + (Status == false ? " Not Approve " : " Approve "), "تم التغيير 😍👌" + (Status == false ? " عدم الموافقة " : " الموافقة "));
                }
                else {
                    ShowMessage("No Changes 😒", "لا تغييرات 😒");
                }
            }
        }

    }


    function Clear() {
 
        $('#btnDelete_Filter').addClass('display_none');
        $('#txtSearch').val('');
        CleaningList_Table();
        _Grid.DataSource = _Usersnone;
        _Grid.Bind();
    }


    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }
        GetData(false, 0, false, true);
    }


    function IsActive(ID: number, Status: boolean) {             
        let stat = Status == true ? 1 : 0;
        SqlExecuteQuery(" update [dbo].[G_COMPANY] set [IsActive] = " + stat + " where [COMP_CODE] = " + ID)

        GetData(true, ID, Status, true);
    }
}
