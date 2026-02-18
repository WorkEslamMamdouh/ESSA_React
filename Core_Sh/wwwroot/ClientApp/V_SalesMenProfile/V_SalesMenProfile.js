$(document).ready(function () {
    V_SalesMenProfile.InitalizeComponent();
});
var V_SalesMenProfile;
(function (V_SalesMenProfile) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var New_DataProfile = new Array();
    var _DataProfile = new Array();
    var _Zones = new Array();
    var _ZonesFltr = new Array();
    var txtSearch;
    var db_Zone;
    var db_FamilyZone;
    var Filter_Supervisor;
    var Filter_View;
    var btnDelete_Filter;
    var CompCode = 0;
    var Res = GetGlopelResources();
    function InitalizeComponent() {
        CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        GetData_Zones();
        Close_Loder();
        SearchID();
        ValidUser();
        DownloadFileExcel();
        //SetRefresh(GetModuleCode())
    }
    V_SalesMenProfile.InitalizeComponent = InitalizeComponent;
    function ValidUser() {
        if (SysSession.CurrentEnvironment.UserType == 4) { // UserSupervisor
            $('#Supervisor_ID').val(SysSession.CurrentEnvironment.ID);
            Filter_Supervisor.innerHTML = "( " + SysSession.CurrentEnvironment.NameUser + " )";
            $('#Filter_Supervisor').attr("style", "opacity: 1.4;pointer-events: none;cursor: no-drop;width: 100%;     background-color: rgb(103 169 204);");
        }
    }
    function SetRefresh(moduleCode) {
        $(document).on('click', '.Refresh_' + moduleCode, function () {
            if ($('#db_FamilyZone').val() == 'null') {
                return;
            }
            GetData_SalesMen();
        });
    }
    function SearchID() {
        if (SysSession.CurrentEnvironment.UserType == 4) { // UserSupervisor
            SearchIDGnr(function () {
                 ;
                InitializeGrid();
                _DataProfile = new Array();
                _DataProfile.push(ModelSearch.ModelMaster);
                SetGlopelDataProfile(_DataProfile);
                Display_Profile();
                $('#btnDelete_Filter').removeClass('display_none');
                $('#butView' + ModelSearch.ModelMaster.ID).click();
            }, " and SupervisorID = " + SysSession.CurrentEnvironment.ID);
        }
        else {
            SearchIDGnr(function () {
                 ;
                InitializeGrid();
                _DataProfile = new Array();
                _DataProfile.push(ModelSearch.ModelMaster);
                SetGlopelDataProfile(_DataProfile);
                Display_Profile();
                $('#btnDelete_Filter').removeClass('display_none');
                $('#butView' + ModelSearch.ModelMaster.ID).click();
            });
        }
    }
    function DownloadFileExcel() {
        GnrGridDownloadExcel(function () {
            var keyMapping = {
                USERID: 'المعرف',
                USER_NAME: 'الاسم',
                Mobile: 'رقم الموبيل',
                DescZone: 'المنطقه'
            };
            ConvertModelToFileExcel('List Sales Men', _Grid.DataSource, keyMapping);
        });
    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
        db_FamilyZone = document.getElementById('db_FamilyZone');
        db_Zone = document.getElementById('db_Zone');
        Filter_Supervisor = document.getElementById('Filter_Supervisor');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        txtSearch.onkeyup = _SearchBox_Change;
        Filter_View.onclick = GetData_SalesMen;
        Filter_Supervisor.onclick = Filter_Supervisor_onclick;
        btnDelete_Filter.onclick = Clear;
        db_FamilyZone.onchange = FltrZones;
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
            { title: "ID", name: "ID", type: "text", width: "5%", visible: false },
            { title: Res.UserID, name: "USERID", type: "number", width: "100px" },
            { title: Res.Name, name: "USER_NAME", type: "string", width: "100px" },
            { title: Res.Mobile, name: "Mobile", type: "string", width: "100px" },
            { title: Res.Zone, name: "DescZone", type: "string", width: "100px" },
            {
                title: Res.Status, css: "ColumPadding", name: "Status", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.USER_ACTIVE == true) {
                        txt.innerHTML = Res.Active;
                        txt.style.color = 'Green';
                        txt.style.fontWeight = 'bold';
                    }
                    else {
                        txt.innerHTML = Res.Not_Active;
                        txt.style.color = 'Red';
                        txt.style.fontWeight = 'bold';
                    }
                    return txt;
                }
            },
            {
                title: Res.Profile,
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Profile + " 🧒 ";
                    txt.id = "butView" + item.ID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = '#c95b56';
                    txt.onclick = function (e) {
                        ViewProfile(item.ID, item);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _DataProfile.filter(function (x) { return x.USERID.toString().search(search_1) >= 0 || x.USER_NAME.toLowerCase().search(search_1) >= 0 || x.Mobile.toLowerCase().search(search_1) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _DataProfile;
            _Grid.Bind();
        }
    }
    function Filter_Supervisor_onclick() {
        if ($('#db_FamilyZone').val() == 'null') {
            Errorinput($('#db_FamilyZone'), "Must Select Family Zone", "يجب اختيار المنطقة");
            return;
        }
        var Con = "";
        if ($('#db_Zone').val() != 'null') {
            Con = " and ZoneID = " + $('#db_Zone').val();
        }
        sys.FindKey("USERS", "btnUSERS", " CompCode = " + CompCode + " and USER_TYPE = 4 and FamilyZoneID = " + $('#db_FamilyZone').val() + "" + Con, function () {
            var dataScr = SearchGrid.SearchDataGrid.dataScr;
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            dataScr = dataScr.filter(function (x) { return x.ID == id; });
            $('#Supervisor_ID').val(id);
            Filter_Supervisor.innerHTML = "( " + dataScr[0].USER_NAME + " )";
        });
    }
    function GetData_Zones() {
        var Table;
        Table =
            [
                { NameTable: 'Zones', Condition: " Active = 1 and CompCode = " + SysSession.CurrentEnvironment.CompCode },
                { NameTable: 'FamilyZone', Condition: " Active = 1 and CompCode = " + SysSession.CurrentEnvironment.CompCode },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        _Zones = GetDataTable('Zones');
        var _FamilyZones = GetDataTable('FamilyZone');
        DocumentActions.FillCombowithdefult(_FamilyZones, db_FamilyZone, "FamilyZoneID", 'DescA', 'Select Family Zone');
        FltrZones();
    }
    function FltrZones() {
        _ZonesFltr = _Zones.filter(function (x) { return x.FamilyZoneID == Number(db_FamilyZone.value); });
        DocumentActions.FillCombowithdefult(_ZonesFltr, db_Zone, "ZoneID", 'DescA', 'Select Zone');
    }
    function GetData_SalesMen() {
        CleaningList_Table();
        var Con = "";
        if ($('#db_FamilyZone').val() == 'null') {
            Errorinput($('#db_FamilyZone'), "Must Select Family  Zone", "يجب اختيار المنطقة");
            return;
        }
         ;
        if (Number($('#Supervisor_ID').val()) != 0) {
            Con = " and SupervisorID = " + Number($('#Supervisor_ID').val());
        }
        var zoneValues = "";
        if ($('#db_Zone').val() != 'null') {
            Con = Con + " and ZoneID =" + Number($('#db_Zone').val());
        }
        else {
            for (var i = 1; i < db_Zone.childElementCount; i++) {
                db_Zone.selectedIndex = i;
                var valu = db_Zone.value;
                zoneValues = zoneValues + valu;
                if (i != db_Zone.childElementCount - 1) {
                    zoneValues = zoneValues + ",";
                }
            }
            db_Zone.selectedIndex = 0;
            Con = Con + " and ZoneID in (" + zoneValues + ")";
        }
        if ($('#db_ACTIVE').val() != '-1') {
            Con = Con + " and USER_ACTIVE =" + Number($('#db_ACTIVE').val());
        }
        localStorage.setItem(GetParameterByName('App') + "zoneValues", zoneValues);
        var Table;
        Table =
            [
                { NameTable: 'GQ_USERS', Condition: " USER_TYPE = 5 and Status = 1 and CompCode = " + CompCode + Con },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        _DataProfile = GetDataTable('GQ_USERS');
        _DataProfile = _DataProfile.sort(dynamicSortNew("ID"));
        SetGlopelDataProfile(_DataProfile);
        Display_Profile();
        $('#btnDelete_Filter').removeClass('display_none');
    }
    function Display_Profile() {
        _DataProfile = _DataProfile.sort(dynamicSortNew("ID"));
        var _Data = _DataProfile;
        _Grid.DataSource = _Data;
        _Grid.Bind();
        $('#Txt_Total_LineCount').val(_DataProfile.length);
        //$('#Txt_Total_ItemsCount').val(SumValue(_DataProfile, "ItemCount"));
        //$('#Txt_Total_Amount').val(SumValue(_DataProfile, "NetAfterVat", 1));
    }
    function Clear() {
        $('#Supervisor_ID').val('0');
        Filter_Supervisor.innerHTML = Res.Lang == "Ar" ? "اختيار المشرف" : "Select Supervisor";
        $('#db_Zone').val('null');
        $('#db_FamilyZone').val('null');
        $('#db_ACTIVE').val('-1');
        $('#btnDelete_Filter').addClass('display_none');
        _Grid.DataSource = New_DataProfile;
        _Grid.Bind();
        $('#Txt_Total_LineCount').val(New_DataProfile.length);
    }
    function ViewProfile(ID, Model) {
        localStorage.setItem(GetParameterByName('App') + "ID", ID.toString());
        SetModelGlopelDataProfile(Model);
        OpenPagePartial("View_Profile", "Profile 🧒", function () { Display_Refrsh(); });
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
        //GetData_SalesMen();
    }
})(V_SalesMenProfile || (V_SalesMenProfile = {}));
//# sourceMappingURL=V_SalesMenProfile.js.map