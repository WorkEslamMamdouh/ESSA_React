$(document).ready(() => {
    EmpControl.InitalizeComponent();
});
var EmpControl;
(function (EmpControl) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid = new JsGrid();
    var _Usersnone = new Array();
    var _G_Role = new Array();
    var drpActive;
    var Filter_View;
    var btnDelete_Filter;
    var Res = GetGlopelResources();
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        Close_Loder();
        GetDataFilters();
        SearchID();
    }
    EmpControl.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        Filter_View.onclick = () => { GetData_Users(); };
        btnDelete_Filter.onclick = Clear;
    }
    function SearchID() {
        SearchIDGnr(() => {
            ViewUser(ModelSearch.ModelMaster);
        });
    }
    function GetDataFilters() {
        var Table;
        Table =
            [
                { NameTable: 'G_Role', Condition: "" },
            ];
        DataResult(Table);
        _G_Role = GetDataTable('G_Role');
        FillDropwithAttr(_G_Role, "drpUserType", "RoleId", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "جميع الموظفين" : "All Types"), "", "");
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "ID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            //{ title: "User Code", name: "USER_CODE", type: "text", width: "100px" },
            { title: "ID", name: "ID", visible: false, width: "100px" },
            { title: "User ID", name: "USERID", type: "text", width: "100px" },
            { title: "User Name", name: "USER_NAME", type: "text", width: "100px" },
            { title: "Mobile", name: "Mobile", type: "text", width: "100px" },
            { title: "Job Title", name: "JobTitle", type: "text", width: "100px" },
            {
                title: "Active", css: "ColumPadding", name: "USER_ACTIVE", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    if (item.USER_ACTIVE == true) {
                        txt.innerHTML = 'Active ✅';
                    }
                    else {
                        txt.innerHTML = 'Not Active ❌';
                    }
                    return txt;
                }
            },
            {
                title: "Block",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.ID;
                    txt.className = "checkbox";
                    txt.checked = !item.USER_ACTIVE;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    txt.onclick = (e) => {
                        BlockEmp(item.ID, txt.checked == true ? 0 : 1);
                    };
                    return txt;
                }
            },
            {
                title: "View",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Edit ⚙️");
                    txt.id = "butView" + item.ID;
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
    function GetData_Users(ISDirect = false) {
        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒");
            return;
        }
        if ($('#drpUserType').val() == "null") {
            Errorinput($('#drpUserType'), "Must Select User Type 👆", "يجب تحديد نوع المستخدم 👆");
            return;
        }
        CleaningList_Table();
        let Con = "";
        if ($('#drpActive').val() != "null") {
            Con = " and USER_ACTIVE =" + Number($('#drpActive').val());
        }
        if ($('#drpUserType').val() != "null") {
            Con = Con + " and USER_TYPE =" + Number($('#drpUserType').val());
        }
        debugger;
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'GQ_USERS', "  Status =1   and CompCode =" + CompCode + ") " + Con, SelectPageNumber.PageNumber, 5, "ID");
        }
        else {
            DisplayGridByPagination(_Grid, 'GQ_USERS', "  Status =1 and CompCode =" + CompCode + " ) " + Con, 1, 5, "ID");
        }
        //var Table: Array<Table>;
        //Table =
        //    [
        //    { NameTable: 'GQ_USERS', Condition: " USER_TYPE != 1 and Status =1 and USER_CODE !='" + SysSession.CurrentEnvironment.UserCode + "' and CompCode =" + CompCode +" and [USER_NAME] not in ('Delivery','UserSupervisor','UserAccount','UserAdministrator') " + Con },
        //    ]       
        //DataResult(Table);
        ////**************************************************************************************************************
        //_UsersList = GetDataTable('GQ_USERS');    
        //_UsersList = _UsersList.sort(dynamicSort("USER_NAME"));           
        //$('#btnDelete_Filter').removeClass('display_none');
        //_Grid.DataSource = _UsersList;
        //_Grid.Bind(); 
    }
    function ViewUser(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "UserControl");
        SetModelGlopelDataProfile(item);
        OpenPagePartial("UserDef", "UserDef 👤", () => { Display_Refrsh(); });
    }
    function Clear() {
        $('#drpActive').val("null");
        $('#drpUserType').val("null");
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Usersnone;
        _Grid.Bind();
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
        GetData_Users(true);
    }
    function BlockEmp(USERID, Active) {
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("User", "BlockUser"),
            data: { USERID: USERID, USER_CODE: SysSession.CurrentEnvironment.UserCode, Active: Active },
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    GetData_Users(true);
                    Close_Loder();
                    Active == 0 ? ShowMessage("User Blocked 🤦‍ ", "تم حظر المستخدم 🤦‍ ") : ShowMessage("User UnBlocked 👍", "تم إلغاء حظر المستخدم 👍");
                }
                else {
                }
            }
        });
    }
})(EmpControl || (EmpControl = {}));
//# sourceMappingURL=EmpControl.js.map