$(document).ready(function () {
    PostAccounts.InitalizeComponent();
});
var PostAccounts;
(function (PostAccounts) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var _GridView = new JsGrid();
    var _TransList = new Array();
    var _Transnone = new Array();
    var _Zones = new Array();
    var _ZonesFltr = new Array();
    var _VIEW_JOURNAL = new Array();
    var txtSearchView;
    var txtSearch;
    var drpActive;
    var Filter_View;
    var BtnPostAccounts;
    var BtnVIEW_JOURNAL;
    var Tap_View_Trans;
    var Tap_VIEW_JOURNAL;
    var btnDelete_Filter;
    var db_Zone;
    var db_FamilyZone;
    var Filter_Supervisor;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        InitializeGridView();
        GetData_Zones();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        ActiveTab("Tap_View_Trans");
        Close_Loder();
    }
    PostAccounts.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearchView = document.getElementById('txtSearchView');
        txtSearch = document.getElementById('txtSearch');
        Filter_View = document.getElementById('Filter_View');
        BtnPostAccounts = document.getElementById('BtnPostAccounts');
        BtnVIEW_JOURNAL = document.getElementById('BtnVIEW_JOURNAL');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        Tap_View_Trans = document.getElementById('Tap_View_Trans');
        Tap_VIEW_JOURNAL = document.getElementById('Tap_VIEW_JOURNAL');
        db_FamilyZone = document.getElementById('db_FamilyZone');
        db_Zone = document.getElementById('db_Zone');
        Filter_Supervisor = document.getElementById('Filter_Supervisor');
    }
    function InitializeEvents() {
        $('#Back_PageTap').on('click', function () {
            //ActiveTab("Tap_All_Trans");
            Tap_View_Trans.click();
        });
        Tap_View_Trans.onclick = function () {
            ActiveTab("Tap_View_Trans");
        };
        Tap_VIEW_JOURNAL.onclick = function () {
            ActiveTab("Tap_VIEW_JOURNAL");
            ShowBack_PageTap();
        };
        BtnVIEW_JOURNAL.onclick = function () { BtnVIEW_JOURNAL_onclick(); LogUser(" تم عمل عرض القيد ", TypeLog.Update); };
        BtnPostAccounts.onclick = function () { BtnPostAccounts_onclick(); LogUser(" تم عمل ترحيل الحركات الي الحسابات ", TypeLog.Update); };
        Filter_View.onclick = function () { GetData_Money(); LogUser(" تم عمل عرض للحركات ", TypeLog.Views); };
        txtSearch.onkeyup = _SearchBox_Change;
        txtSearchView.onkeyup = _SearchBox_ChangeView;
        btnDelete_Filter.onclick = Clear;
        db_FamilyZone.onchange = FltrZones;
        Filter_Supervisor.onclick = Filter_Supervisor_onclick;
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "IDTrans";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = function () { };
        _Grid.Columns = [
            { title: "IDTrans", name: "IDTrans", type: "text", width: "100px", visible: false },
            { title: "TrNo", name: "TrNo", type: "Number", width: "100px" },
            { title: "CreatedBy", name: "CreatedBy", type: "text", width: "100px" },
            {
                title: "TrDate", css: "ColumPadding", name: "TrDate", width: "120px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TrDate);
                    return txt;
                }
            },
            {
                title: "Cash Type", css: "ColumPadding", name: "IsCash", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.IsCash == true) {
                        txt.innerHTML = 'Cash';
                    }
                    else {
                        txt.innerHTML = 'Transfer';
                    }
                    return txt;
                }
            },
            { title: "From Account", name: "From_ACC_DESCA", type: "text", width: "150px" },
            { title: "To Account", name: "ACC_DESCA", type: "text", width: "150px" },
            { title: "Remark", name: "Remark", type: "text", width: "200px" },
            {
                title: "Amount", css: "Amount", name: "Amount", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.Debit == 0) {
                        txt.style.color = "Red";
                    }
                    else {
                        txt.style.color = "Green";
                    }
                    txt.innerHTML = Digits(item.Amount, 1);
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function InitializeGridView() {
        _GridView.ElementName = "_GridView";
        _GridView.PrimaryKey = "IDTrans";
        _GridView.Paging = true;
        _GridView.PageSize = 15;
        _GridView.Sorting = true;
        _GridView.InsertionMode = JsGridInsertionMode.Binding;
        _GridView.Editing = false;
        _GridView.Inserting = false;
        _GridView.SelectedIndex = 1;
        _GridView.OnItemEditing = function () { };
        _GridView.Columns = [
            { title: "IDTrans", name: "IDTrans", type: "text", width: "100px", visible: false },
            { title: "Serial", name: "VOUCHER_SERIAL", type: "Number", width: "100px" },
            { title: "Acc Code", name: "ACC_CODE", type: "text", width: "100px" },
            { title: "Acc Desc", name: "ACC_DESCA", type: "Number", width: "100px" },
            {
                title: "Debit", css: "DEBIT", name: "DEBIT", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.style.color = "Red";
                    //txt.style.color = "Green";
                    txt.innerHTML = Digits(item.DEBIT, 1);
                    return txt;
                }
            },
            {
                title: "Credit", css: "CREDIT", name: "CREDIT", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    //txt.style.color = "Red";
                    txt.style.color = "Green";
                    txt.innerHTML = Digits(item.CREDIT, 1);
                    return txt;
                }
            },
            { title: "Remark", name: "DESCA", type: "text", width: "150px" },
            { title: "TrNo", name: "INVOICE_NO", type: "text", width: "100px" },
        ];
        _GridView.Bind();
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
             ;
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _TransList.filter(function (x) { return x.NameRecipient.toLowerCase().search(search_1) >= 0 || x.Amount.toString().search(search_1) >= 0 || x.TrNo.toString().search(search_1) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _TransList;
            _Grid.Bind();
        }
    }
    function _SearchBox_ChangeView() {
        $("#_GridView").jsGrid("option", "pageIndex", 1);
        if (txtSearchView.value != "") {
             ;
            var search_2 = txtSearchView.value.toLowerCase();
            var SearchDetails = _VIEW_JOURNAL.filter(function (x) { return x.ACC_CODE.toLowerCase().search(search_2) >= 0 || x.ACC_DESCA.toLowerCase().search(search_2) >= 0; });
            _GridView.DataSource = SearchDetails;
            _GridView.Bind();
             ;
            var Rec = Number(SumValue(SearchDetails, "DEBIT"));
            var Pay = Number(SumValue(SearchDetails, "CREDIT"));
            $('#Txt_TotalRecieptView').val(Digits(Rec, 1));
            $('#Txt_TotalPaymentView').val(Digits(Pay, 1));
            $('#Txt_NetView').val(Digits((Number(Rec) - Number(Pay)), 1));
        }
        else {
            _GridView.DataSource = _VIEW_JOURNAL;
            _GridView.Bind();
             ;
            var Rec = Number(SumValue(_VIEW_JOURNAL, "DEBIT"));
            var Pay = Number(SumValue(_VIEW_JOURNAL, "CREDIT"));
            $('#Txt_TotalRecieptView').val(Digits(Rec, 1));
            $('#Txt_TotalPaymentView').val(Digits(Pay, 1));
            $('#Txt_NetView').val(Digits((Number(Rec) - Number(Pay)), 1));
        }
    }
    function Filter_Supervisor_onclick() {
        if ($('#db_FamilyZone').val() == 'null') {
            Errorinput($('#db_FamilyZone'), "Must Select Family  Zone");
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
            $('#Supervisor_AccCode').val(dataScr[0].ACC_CODE);
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
    function GetData_Money() {
         ;
        CleaningList_Table();
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        var Con = '';
        if ($('#db_FamilyZone').val() != 'null') {
            if (Number($('#Supervisor_ID').val()) == 0) {
                Errorinput($('#Filter_Supervisor'), "Must Select Supervisor");
                Errorinput($('#db_FamilyZone'));
                return;
            }
        }
        if (Number($('#Supervisor_ID').val()) != 0) {
            Con = " and ( From_ACC_CODE = N'" + $('#Supervisor_AccCode').val().trim() + "' or  ACC_CODE = N'" + $('#Supervisor_AccCode').val().trim() + "' )";
        }
        var IsCash = $('#drpType').val() == "Null" ? "0,1" : $('#drpType').val();
        var Type = 0; //"0,1,2,3"
        var From_Date = $('#Txt_From_Date').val();
        var To_Date = $('#Txt_To_Date').val();
        var Table;
        Table =
            [
                { NameTable: 'IQ_TransMoney', Condition: "CompCode = " + CompCode + " and TrDate >= '" + From_Date + "' and TrDate <= '" + To_Date + "' and  IsPosted = 0 and TrType in (" + Type + " )  and Status = 1 and IsCash in(" + IsCash + ") " + Con },
            ];
        DataResult(Table);
        //**************************************************************************************************************
         ;
        _TransList = GetDataTable('IQ_TransMoney');
        _TransList = _TransList.sort(dynamicSortNew("IDTrans"));
        $('#btnDelete_Filter').removeClass('display_none');
        $('#BtnVIEW_JOURNAL').removeClass('display_none');
        _Grid.DataSource = _TransList;
        _Grid.Bind();
    }
    function Clear() {
        $('#drpActive').val("Null");
        $('#drpType').val("Null");
        $('#Supervisor_ID').val('0');
        $('#Supervisor_AccCode').val('');
        Filter_Supervisor.innerHTML = 'Select Supervisor';
        $('#db_Zone').val('null');
        $('#db_FamilyZone').val('null');
        $('#btnDelete_Filter').addClass('display_none');
        $('#BtnVIEW_JOURNAL').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Transnone;
        _Grid.Bind();
        var Rec = Number(SumValue(_Transnone, "Debit"));
        var Pay = Number(SumValue(_Transnone, "Credit"));
        $('#Txt_TotalReciept').val(Digits(Rec, 1));
        $('#Txt_TotalPayment').val(Digits(Pay, 1));
        $('#Txt_Net').val(Digits((Number(Rec) - Number(Pay)), 1));
    }
    function BtnVIEW_JOURNAL_onclick() {
         ;
        if (_TransList.length == 0) {
            ShowMessage('Nothing Transaction 😁😁');
            return;
        }
        var From_Date = $('#Txt_From_Date').val();
        var To_Date = $('#Txt_To_Date').val();
        var IsCash = $('#drpType').val();
        var ACC_CODE = "null";
        if (Number($('#Supervisor_ID').val()) != 0) {
            ACC_CODE = "N'" + $('#Supervisor_AccCode').val().trim() + "'";
        }
        var Table;
        Table =
            [
                { NameTable: "VIEW_JOURNAL_Ver2 " + CompCode + ",'" + From_Date + "','" + To_Date + "'," + SysSession.CurrentEnvironment.ID + "," + IsCash + ",null," + ACC_CODE, Condition: "", IsExec: true, IsProc: true },
                { NameTable: "A_JOURNAL_VIEW", Condition: " IDUserCreate = " + SysSession.CurrentEnvironment.ID + " and COMP_CODE = " + CompCode + "" },
            ];
        DataResult(Table);
         ;
        _VIEW_JOURNAL = GetDataTable('A_JOURNAL_VIEW');
        ActiveTab("Tap_VIEW_JOURNAL");
        ShowBack_PageTap();
        _VIEW_JOURNAL = _VIEW_JOURNAL.sort(dynamicSort("VOUCHER_SERIAL"));
         ;
        _GridView.DataSource = _VIEW_JOURNAL;
        _GridView.Bind();
         ;
        var Rec = Number(SumValue(_VIEW_JOURNAL, "DEBIT"));
        var Pay = Number(SumValue(_VIEW_JOURNAL, "CREDIT"));
        $('#Txt_TotalRecieptView').val(Digits(Rec, 1));
        $('#Txt_TotalPaymentView').val(Digits(Pay, 1));
        $('#Txt_NetView').val(Digits((Number(Rec) - Number(Pay)), 1));
        ShowMessage('View Journal 👌');
    }
    function BtnPostAccounts_onclick() {
         ;
        if (_VIEW_JOURNAL.length == 0) {
            ShowMessage('Nothing Journal 😁😁');
            return;
        }
        if ($('#txtRemars').val().trim() == '') {
            Errorinput($('#txtRemars'), 'Pleass Enter Remars 😒😒');
            return;
        }
        var Table;
        Table =
            [
                { NameTable: "Es_GenerateJournal_From_Post " + CompCode + "," + SysSession.CurrentEnvironment.ID + ",'" + SysSession.CurrentEnvironment.NameUser + "',N'" + $('#txtRemars').val().trim() + "'", Condition: "", IsExec: true, IsProc: true },
            ];
        DataResult(Table);
        ShowMessage('Done 👌');
        ActiveTab("Tap_View_Trans");
        $('#txtRemars').val('');
        Clear();
    }
})(PostAccounts || (PostAccounts = {}));
//# sourceMappingURL=PostAccounts.js.map