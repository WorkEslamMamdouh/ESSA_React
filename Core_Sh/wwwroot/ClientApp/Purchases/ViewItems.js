$(document).ready(function () {
    ViewItems.InitalizeComponent();
});
var ViewItems;
(function (ViewItems) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid = new JsGrid();
    var _UsersList = new Array();
    var _Usersnone = new Array();
    var _G_Code = new Array();
    var txtSearch;
    var drpActive;
    var Filter_View;
    var btnDelete_Filter;
    var Res = GetGlopelResources();
    function InitalizeComponent() {
         ;
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        Close_Loder();
        GetDataFilters();
        SearchID();
    }
    ViewItems.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        txtSearch.onkeyup = _SearchBox_Change;
        Filter_View.onclick = GetData_Users;
        btnDelete_Filter.onclick = Clear;
    }
    function SearchID() {
        SearchIDGnr(function () {
            ViewUser(ModelSearch.ModelMaster);
        });
    }
    function GetDataFilters() {
        var Table;
        Table =
            [
                { NameTable: 'G_Codes', Condition: "CodeType = 'UserType' and CodeValue != 1" },
            ];
        DataResult(Table);
         ;
        _G_Code = GetDataTable('G_Codes');
        FillDropwithAttr(_G_Code, "drpUserType", "CodeValue", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "جميع الموظفين" : "All Types"), "", "");
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
        _Grid.OnItemEditing = function () { };
        _Grid.Columns = [
            //{ title: "User Code", name: "USER_CODE", type: "text", width: "100px" },
            { title: "ID", name: "ID", visible: false, width: "100px" },
            { title: "User ID", name: "USERID", type: "text", width: "100px" },
            { title: "User Name", name: "USER_NAME", type: "text", width: "100px" },
            { title: "Mobile", name: "Mobile", type: "text", width: "100px" },
            { title: "Job Title", name: "JobTitle", type: "text", width: "100px" },
            {
                title: "Active", css: "ColumPadding", name: "USER_ACTIVE", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
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
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.ID;
                    txt.className = "checkbox";
                    txt.checked = !item.USER_ACTIVE;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    txt.onclick = function (e) {
                        BlockEmp(item.ID, txt.checked == true ? 0 : 1);
                    };
                    return txt;
                }
            },
            {
                title: "View",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Edit ⚙️");
                    txt.id = "butView" + item.ID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = function (e) {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);
         ;
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _UsersList.filter(function (x) { var _a, _b; return ((_a = x.USERID) === null || _a === void 0 ? void 0 : _a.toLowerCase().search(search_1)) >= 0 || ((_b = x.USER_NAME) === null || _b === void 0 ? void 0 : _b.toLowerCase().search(search_1)) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _UsersList;
            _Grid.Bind();
        }
    }
    function GetData_Users() {
         ;
        if ($('#drpUserType').val() == "null") {
            Errorinput($('#drpUserType'), "Must Select User Type 👆");
            return;
        }
        CleaningList_Table();
        var Con = "";
        if ($('#drpActive').val() != "null") {
            Con = " and USER_ACTIVE =" + Number($('#drpActive').val());
        }
        if ($('#drpUserType').val() != "null") {
            Con = Con + " and USER_TYPE =" + Number($('#drpUserType').val());
        }
        var Table;
        Table =
            [
                { NameTable: 'GQ_USERS', Condition: " USER_TYPE != 1 and Status =1 and USER_CODE !='" + SysSession.CurrentEnvironment.UserCode + "' and CompCode =" + CompCode + " and [USER_NAME] not in ('Delivery','UserSupervisor','UserAccount','UserAdministrator') " + Con },
            ];
        DataResult(Table);
        //**************************************************************************************************************
         ;
        _UsersList = GetDataTable('GQ_USERS');
        _UsersList = _UsersList.sort(dynamicSort("USER_NAME"));
        $('#btnDelete_Filter').removeClass('display_none');
        _Grid.DataSource = _UsersList;
        _Grid.Bind();
    }
    function ViewUser(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "UserControl");
        SetModelGlopelDataProfile(item);
        OpenPagePartial("UserDef", "UserDef 👤", function () { Display_Refrsh(); });
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
        GetData_Users();
    }
    function BlockEmp(USERID, Active) {
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("User", "BlockUser"),
            data: { USERID: USERID, USER_CODE: SysSession.CurrentEnvironment.UserCode, Active: Active },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetData_Users();
                    Close_Loder();
                    Active == 0 ? ShowMessage("User Blocked 🤦‍ ") : ShowMessage("User Un Blocked 👍");
                }
                else {
                }
            }
        });
    }
})(ViewItems || (ViewItems = {}));
//# sourceMappingURL=ViewItems.js.map