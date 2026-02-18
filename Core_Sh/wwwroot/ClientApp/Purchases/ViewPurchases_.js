$(document).ready(function () {
    ViewPurchases.InitalizeComponent();
});
var ViewPurchases;
(function (ViewPurchases) {
     ;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid = new JsGrid();
    var _DataList = new Array();
    var _Datanone = new Array();
    var txtSearch;
    var drpActive;
    var Filter_View;
    var btnDelete_Filter;
    var Res = GetGlopelResources();
    function InitalizeComponent() {
         ;
         ;
        InitalizeControls();
        InitializeEvents();
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        InitializeGrid();
        SearchID();
        Close_Loder();
    }
    ViewPurchases.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        txtSearch.onkeyup = _SearchBox_Change;
        Filter_View.onclick = function () { GetData(); };
        btnDelete_Filter.onclick = Clear;
    }
    function SearchID() {
        SearchIDGnr(function () {
            ViewUser(ModelSearch.ModelMaster);
        });
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "PurchaseID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = function () { };
        _Grid.Columns = [
            { title: "PurchaseID", name: "PurchaseID", visible: false, width: "100px" },
            { title: "TrNo", name: "TrNo", width: "100px" },
            { title: "ReNo", name: "ReNo", type: "text", width: "100px" },
            { title: "SupplierName", name: "SupplierName", type: "text", width: "100px" },
            {
                title: "TrData", css: "PurchaseDate", name: "IsCash", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TransactionDate);
                    return txt;
                }
            },
            { title: "Remarks", name: "Remarks", type: "text", width: "100px" },
            {
                title: "Cash Type", css: "ColumPadding", name: "IsCash", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.IsCash == true) {
                        txt.innerHTML = 'نقدي ';
                    }
                    else {
                        txt.innerHTML = 'علي حساب ';
                    }
                    return txt;
                }
            },
            {
                title: "Active",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.PurchaseID;
                    txt.className = "checkbox";
                    txt.checked = item.Status == 1 ? true : false;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    txt.onclick = function (e) {
                        IsActive(item.PurchaseID, txt.checked == false ? 0 : 1, item.TrNo);
                    };
                    return txt;
                }
            },
            {
                title: "Edit",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Edit ⚙️");
                    txt.id = "butView" + item.PurchaseID;
                    txt.disabled = item.Status == 1 ? true : false;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = function (e) {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
            {
                title: "Print",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Print ");
                    txt.id = "butView" + item.PurchaseID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    txt.disabled = item.Status == 1 ? false : true;
                    txt.onclick = function (e) {
                        Print_Pdf(item.PurchaseID);
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
            var SearchDetails = _DataList.filter(function (x) { var _a, _b, _c, _d; return ((_a = x.ReNo) === null || _a === void 0 ? void 0 : _a.toLowerCase().search(search_1)) >= 0 || ((_b = x.SupplierName) === null || _b === void 0 ? void 0 : _b.toLowerCase().search(search_1)) >= 0 || ((_c = x.Mobile) === null || _c === void 0 ? void 0 : _c.toLowerCase().search(search_1)) >= 0 || ((_d = x.Remarks) === null || _d === void 0 ? void 0 : _d.toLowerCase().search(search_1)) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _DataList;
            _Grid.Bind();
        }
    }
    function GetData(IsChangeActive, ID, Status) {
        if (IsChangeActive === void 0) { IsChangeActive = false; }
        if (ID === void 0) { ID = 0; }
        if (Status === void 0) { Status = 0; }
         ;
        CleaningList_Table();
        var Con = "";
        if ($('#drpActive').val() != "null") {
            Con = Con + " and Status =" + Number($('#drpActive').val());
        }
        Con = Con + " and  PurchaseDate >= '" + $('#Txt_FromTrData').val() + "' and   PurchaseDate <= '" + $('#Txt_TOTrData').val() + "'";
        var Table;
        Table =
            [
                { NameTable: 'IQ_TR_Purchases', Condition: "   CompCode =" + CompCode + " " + Con },
            ];
        DataResult(Table);
        //**************************************************************************************************************
         ;
        _DataList = GetDataTable('IQ_TR_Purchases');
        _DataList = _DataList.sort(dynamicSortNew("PurchaseID"));
        $('#btnDelete_Filter').removeClass('display_none');
        _Grid.DataSource = _DataList;
        _Grid.Bind();
        if (IsChangeActive && ID > 0) {
            var chack = _DataList.filter(function (x) { return x.PurchaseID == ID; });
            if (chack.length > 0) {
                if (chack[0].Status == Status) {
                    ShowMessage("Done Change 😍👌" + (Status == 0 ? " Not Approve " : " Approve "));
                }
                else {
                    ShowMessage("Not Change 😒");
                }
            }
        }
    }
    function ViewUser(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item);
        OpenPagePartial("Purchases", "Edit Purchases ", function () { Display_Refrsh(); });
    }
    function Clear() {
        $('#drpActive').val("null");
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Datanone;
        _Grid.Bind();
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
        GetData();
    }
    function IsActive(ID, Status, TrNo) {
         ;
        SqlExecuteQuery(" update [dbo].[I_TR_Purchases] set [Status] = " + Status + " where [PurchaseID] = " + ID);
        var Mod = Status == 0 ? "Open" : "Update";
        SqlExecuteQuery("[G_ProcessTrans] " + CompCode + ",1,'PurInv','" + Mod + "'," + ID + "," + TrNo + ",0");
        GetData(true, ID, Status);
    }
    function Print_Pdf(TrID) {
        var RepParam;
        RepParam =
            [
                { Parameter: 'TrID', Value: "" + TrID + "" },
            ];
        Print_Report("Prnt_PurchasesAr", "IProc_Prnt_Purchases", RepParam);
    }
})(ViewPurchases || (ViewPurchases = {}));
//# sourceMappingURL=ViewPurchases_.js.map