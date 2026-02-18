var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
$(document).ready(function () {
    FilterTrans.InitalizeComponent();
});
var FilterTrans;
(function (FilterTrans) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var _GridView = new JsGrid();
    var _GridViewJOUR = new JsGrid();
    var _TransList = new Array();
    var _Transnone = new Array();
    var _Zones = new Array();
    var _ZonesFltr = new Array();
    var _ACCOUNT = new Array();
    var _VIEW_JOURNAL = new Array();
    var txtSearchViewJOUR;
    var txtSearchView;
    var txtSearch;
    var db_Type;
    var BtnPostAccounts;
    var BtnVIEW_JOURNAL;
    var Filter_View;
    var Tap_View_Trans;
    var Tap_VIEW_All_Trans;
    var Tap_VIEW_JOURNAL;
    var btnDelete_Filter;
    var btnSelectAll;
    var btnReverseSelection;
    var btnUnSelectAll;
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        InitializeGridView();
        InitializeGridViewJOUR();
        GetDatAQ_GetAccount();
        //$('#Txt_From_Date').val(DateStartYear())
        //$('#Txt_To_Date').val(GetDate())
        $('#Txt_From_Date').val(GetDate());
        $('#Txt_To_Date').val(GetDate());
        ActiveTab("Tap_View_Trans");
        DownloadFileExcel();
        $('#GnrGridDownloadExcelID').addClass('display_none');
        btnSelectAll.click();
        Close_Loder();
    }
    FilterTrans.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearchViewJOUR = document.getElementById('txtSearchViewJOUR');
        txtSearchView = document.getElementById('txtSearchView');
        txtSearch = document.getElementById('txtSearch');
        BtnPostAccounts = document.getElementById('BtnPostAccounts');
        BtnVIEW_JOURNAL = document.getElementById('BtnVIEW_JOURNAL');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        Tap_View_Trans = document.getElementById('Tap_View_Trans');
        Tap_VIEW_All_Trans = document.getElementById('Tap_VIEW_All_Trans');
        Tap_VIEW_JOURNAL = document.getElementById('Tap_VIEW_JOURNAL');
        btnSelectAll = document.getElementById("btnSelectAll");
        btnReverseSelection = document.getElementById("btnReverseSelection");
        btnUnSelectAll = document.getElementById("btnUnSelectAll");
        db_Type = document.getElementById("db_Type");
    }
    function InitializeEvents() {
        $('#Back_PageTap').on('click', function () {
            //ActiveTab("Tap_All_Trans");
            Tap_View_Trans.click();
        });
        Tap_View_Trans.onclick = function () {
            ActiveTab("Tap_View_Trans");
            $('#GnrGridDownloadExcelID').addClass('display_none');
        };
        Tap_VIEW_All_Trans.onclick = function () {
            ActiveTab("Tap_VIEW_All_Trans");
            ShowBack_PageTap();
        };
        Tap_VIEW_JOURNAL.onclick = function () {
            ActiveTab("Tap_VIEW_JOURNAL");
            ShowBack_PageTap();
        };
        BtnVIEW_JOURNAL.onclick = function () { BtnVIEW_JOURNAL_onclick(); LogUser(" تم عمل عرض القيد ", TypeLog.Views); };
        Filter_View.onclick = function () { Filter_View_onclick(); LogUser(" تم عمل عرض للحركات ", TypeLog.Views); };
        txtSearch.onkeyup = _SearchBox_Change;
        txtSearchView.onkeyup = _SearchBox_ChangeView;
        txtSearchViewJOUR.onkeyup = _SearchBox_ChangeViewJOUR;
        btnDelete_Filter.onclick = Clear;
        btnSelectAll.onclick = btnSelectAll_onclick;
        btnReverseSelection.onclick = btnReverseSelection_onclick;
        btnUnSelectAll.onclick = btnUnSelectAll_onclick;
        BtnPostAccounts.onclick = BtnPostAccounts_onclick;
        db_Type.onchange = db_Type_onchange;
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "ACC_CODE";
        _Grid.Paging = true;
        _Grid.PageSize = 10;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.Columns = [
            { title: Res.AccCode, name: "ACC_CODE", type: "text", width: "100px", visible: false },
            { title: Res.AccCode, name: "ACC_CODE", type: "text", width: "100px" },
            { title: Res.AccName, name: "ACC_DESCA", type: "text", width: "100px" },
            {
                title: Res.Select, css: "ColumPadding", name: "checkbox", width: "50px",
                itemTemplate: function (s, item) {
                    var txt = CreateElement("checkbox", "form-check-input", " ", " ", "", " ");
                    txt.style.height = "27px";
                    txt.style.width = "35px";
                    txt.style.marginTop = "-15px";
                    txt.onclick = function (e) {
                        item.Select = txt.checked;
                    };
                    if (item.Select == true) {
                        txt.checked = true;
                    }
                    else {
                        txt.checked = false;
                    }
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function DownloadFileExcel() {
        GnrGridDownloadExcel(function () {
            var keyMapping = {
                TrNo: 'TrNo',
                CreatedBy: 'Created By',
                TrDate: 'TrDate',
                VoucherNo: 'All_Trans No',
                IsCash: 'IsCash',
                From_ACC_DESCA: 'From Account',
                ACC_DESCA: 'To Account',
                Remark: 'Remark',
                Amount: 'Amount',
            };
            ConvertModelToFileExcel('ListTrans', _GridView.DataSource, keyMapping);
        });
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
            { title: Res.TrNo, name: "TrNo", type: "Number", width: "100px" },
            { title: Res.CreatedBy, name: "CreatedBy", type: "text", width: "100px" },
            {
                title: Res.TrDate, css: "ColumPadding", name: "TrDate", width: "120px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TrDate);
                    return txt;
                }
            },
            { title: Res.VoucherNo, name: "VoucherNo", type: "Number", width: "100px" },
            {
                title: Res.Cash_Type, css: "ColumPadding", name: "IsCash", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.IsCash == true) {
                        txt.innerHTML = Res.Cash;
                    }
                    else {
                        txt.innerHTML = Res.Transfer_Money;
                    }
                    return txt;
                }
            },
            { title: Res.From_Account, name: "From_ACC_DESCA", type: "text", width: "150px" },
            { title: Res.To_Account, name: "ACC_DESCA", type: "text", width: "150px" },
            { title: Res.Remarks, name: "Remark", type: "text", width: "200px" },
            {
                title: Res.Amount, css: "Amount", name: "Amount", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.Debit == 0) {
                        txt.style.color = "Green";
                    }
                    else {
                        txt.style.color = "Red";
                    }
                    txt.innerHTML = Digits(item.Amount, 1);
                    return txt;
                }
            },
            {
                title: Res.Status,
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.IDTrans;
                    txt.className = "checkbox";
                    txt.checked = item.Status == 1 ? true : false;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    txt.onclick = function (e) {
                        if (item.TrType == 2 || item.TrType == 3) {
                            txt.checked = true;
                            Errorinput("ChkView" + item.IDTrans + "", "This is Auto Receipt Invoice ,You Can't un Approve it");
                        }
                        else {
                            Approve(item.IDTrans, txt.checked == true ? 1 : 0);
                        }
                    };
                    return txt;
                }
            },
            {
                title: Res.Edit,
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Edit;
                    txt.style.backgroundColor = "green";
                    txt.id = "butEdit" + item.IDTrans;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    if (item.Status == 1) {
                        txt.disabled = true;
                    }
                    if (item.Status == 0 && (item.Symbols == '4' || item.Symbols == '5' || item.Symbols == '6' || item.Symbols == '7')) {
                        txt.disabled = false;
                    }
                    txt.onclick = function (e) {
                        LogUser(" تم اختيار الحركه للتعديل رقم  ( " + item.TrNo + " )", TypeLog.OpenTrans);
                        EditVoucher(item, item.IDTrans);
                    };
                    return txt;
                }
            },
            {
                title: Res.Print,
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Print;
                    txt.style.backgroundColor = "chocolate";
                    txt.id = "butView" + item.IDTrans;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    if (item.Status == 0) {
                        txt.disabled = true;
                    }
                    txt.onclick = function (e) {
                        ViewVoucher(item.IDTrans, item.Amount);
                    };
                    return txt;
                }
            },
            {
                title: Res.Delete,
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Delete;
                    txt.style.backgroundColor = "#d21e1e";
                    txt.id = "butDelete" + item.IDTrans;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    if (item.Status == 1) {
                        txt.disabled = true;
                    }
                    txt.onclick = function (e) {
                        DaleteVoucher(item.IDTrans);
                    };
                    return txt;
                }
            },
        ];
        _GridView.Bind();
    }
    function InitializeGridViewJOUR() {
        _GridViewJOUR.ElementName = "_GridViewJOUR";
        _GridViewJOUR.PrimaryKey = "IDTrans";
        _GridViewJOUR.Paging = true;
        _GridViewJOUR.PageSize = 15;
        _GridViewJOUR.Sorting = true;
        _GridViewJOUR.InsertionMode = JsGridInsertionMode.Binding;
        _GridViewJOUR.Editing = false;
        _GridViewJOUR.Inserting = false;
        _GridViewJOUR.SelectedIndex = 1;
        _GridViewJOUR.OnItemEditing = function () { };
        _GridViewJOUR.Columns = [
            { title: "IDTrans", name: "IDTrans", type: "text", width: "100px", visible: false },
            { title: Res.Serial, name: "VOUCHER_SERIAL", type: "Number", width: "100px" },
            { title: Res.AccCode, name: "ACC_CODE", type: "text", width: "100px" },
            { title: Res.AccName, name: "ACC_DESCA", type: "Number", width: "100px" },
            {
                title: Res.Debit, css: "DEBIT", name: "DEBIT", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.style.color = "Red";
                    txt.innerHTML = Digits(item.DEBIT, 1);
                    return txt;
                }
            },
            {
                title: Res.Credit, css: "CREDIT", name: "CREDIT", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.style.color = "Green";
                    txt.innerHTML = Digits(item.CREDIT, 1);
                    return txt;
                }
            },
            { title: Res.Remarks, name: "DESCA", type: "text", width: "150px" },
            { title: Res.TrNo, name: "INVOICE_NO", type: "text", width: "100px" },
        ];
        _GridViewJOUR.Bind();
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
             ;
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _ACCOUNT.filter(function (x) { return x.ACC_CODE.toLowerCase().search(search_1) >= 0 || x.ACC_DESCA.toLowerCase().search(search_1) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _ACCOUNT;
            _Grid.Bind();
        }
    }
    function _SearchBox_ChangeView() {
        $("#_GridView").jsGrid("option", "pageIndex", 1);
         ;
        if (txtSearchView.value != "") {
            var search_2 = txtSearchView.value.toLowerCase();
            var SearchDetails = _TransList.filter(function (x) { return x.NameRecipient.toLowerCase().search(search_2) >= 0 || x.Amount.toString().search(search_2) >= 0 || x.TrNo.toString().search(search_2) >= 0; });
            _GridView.DataSource = SearchDetails;
            _GridView.Bind();
        }
        else {
            _GridView.DataSource = _TransList;
            _GridView.Bind();
        }
    }
    function _SearchBox_ChangeViewJOUR() {
        $("#_GridViewJOUR").jsGrid("option", "pageIndex", 1);
        if (txtSearchViewJOUR.value != "") {
             ;
            var search_3 = txtSearchViewJOUR.value.toLowerCase();
            var SearchDetails = _VIEW_JOURNAL.filter(function (x) { return x.ACC_CODE.toLowerCase().search(search_3) >= 0 || x.ACC_DESCA.toLowerCase().search(search_3) >= 0; });
            _GridViewJOUR.DataSource = SearchDetails;
            _GridViewJOUR.Bind();
             ;
            var Rec = Number(SumValue(SearchDetails, "DEBIT"));
            var Pay = Number(SumValue(SearchDetails, "CREDIT"));
            $('#Txt_TotalRecieptView').val(Digits(Rec, 1));
            $('#Txt_TotalPaymentView').val(Digits(Pay, 1));
            $('#Txt_NetView').val(Digits((Number(Rec) - Number(Pay)), 1));
        }
        else {
            _GridViewJOUR.DataSource = _VIEW_JOURNAL;
            _GridViewJOUR.Bind();
             ;
            var Rec = Number(SumValue(_VIEW_JOURNAL, "DEBIT"));
            var Pay = Number(SumValue(_VIEW_JOURNAL, "CREDIT"));
            $('#Txt_TotalRecieptView').val(Digits(Rec, 1));
            $('#Txt_TotalPaymentView').val(Digits(Pay, 1));
            $('#Txt_NetView').val(Digits((Number(Rec) - Number(Pay)), 1));
        }
    }
    function db_Type_onchange() {
        GetDatAQ_GetAccount();
    }
    function GetDatAQ_GetAccount() {
        var UserType = "Null";
        if (db_Type.value != "1") {
            UserType = "" + Number(db_Type.value) + "";
        }
        //var Table: Array<Table>;
        //Table =
        //    [
        //    { NameTable: 'AQ_GetAccount', Condition: "   COMP_CODE = " + SysSession.CurrentEnvironment.CompCode +" "+ cond },
        //    ]
        //DataResult(Table);
        //_ACCOUNT = GetDataTable('AQ_GetAccount');
        //**************************************************************************************************************
        var Query = " GetAllAcc_UsingByComp " + CompCode + "," + UserType + "";
        _ACCOUNT = GetDataFromProc(Query, "GetAllAcc_UsingByComp");
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        _Grid.DataSource = _ACCOUNT;
        _Grid.Bind();
    }
    function Clear() {
        $('#drpActive').val("Null");
        $('#drpType').val("Null");
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Transnone;
        _Grid.Bind();
        var Rec = Number(SumValue(_Transnone, "Debit"));
        var Pay = Number(SumValue(_Transnone, "Credit"));
        $('#Txt_TotalReciept').val(Digits(Rec, 1));
        $('#Txt_TotalPayment').val(Digits(Pay, 1));
        $('#Txt_Net').val(Digits((Number(Rec) - Number(Pay)), 1));
    }
    function Filter_View_onclick() {
         ;
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        var _AccList = _Grid.DataSource.filter(function (x) { return x.Select == true; });
        if (_AccList.length == 0) {
            ShowMessage('Nothing Select Account 😁😁', " 😁😁 لا يوجد حسابات محددة");
            return;
        }
        var Cond = "";
        var From_Date = $('#Txt_From_Date').val();
        var To_Date = $('#Txt_To_Date').val();
        var IsCash = $('#drpType').val();
        if (IsCash == "Null") {
            IsCash = -1;
        }
        var ListCode = "";
        var Frist = false;
        for (var i = 0; i < _AccList.length; i++) {
            if (!Frist) {
                ListCode = ListCode + "" + _AccList[i].ACC_CODE + "";
            }
            else {
                ListCode = ListCode + "," + _AccList[i].ACC_CODE + "";
            }
            Frist = true;
        }
        var Type = '0,5,10,11';
         ;
        //var Table: Array<Table>;
        //Table =
        //    [
        //    { NameTable: "IQ_TransMoney", Condition: " TrDate >= N'" + From_Date + "' and TrDate <= N'" + To_Date + "' and ( ACC_CODE in (" + ListCode + ")  or From_ACC_CODE in (" + ListCode + ") ) and  TrType in (" + Type + " )" + Cond },
        //    ]
        //DataResult(Table);
        //_TransList = GetDataTable('IQ_TransMoney');
        //_TransList = _TransList.sort(dynamicSortNew("TrNo"));
        var Query = " View_AllTrans " + CompCode + ", N'" + From_Date + "', N'" + To_Date + "', '" + Type + "', " + IsCash + ", '" + ListCode + "'";
        Show_Loder();
        setTimeout(function () {
            _TransList = GetDataFromProc(Query, "View_AllTrans");
             ;
            ActiveTab("Tap_VIEW_All_Trans");
            ShowBack_PageTap();
             ;
            $("#_GridView").jsGrid("option", "pageIndex", 1);
            _GridView.DataSource = _TransList;
            _GridView.Bind();
            $('#GnrGridDownloadExcelID').removeClass('display_none');
        }, 10);
    }
    function Approve(IDTrans, Active) {
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("TransMoney", "ApproveOrOpenTransMoney"),
            data: { CompCode: CompCode, BranchCode: 1, IDTrans: IDTrans, Active: Active },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    Filter_View_onclick();
                    var Res_1 = _TransList.filter(function (x) { return x.IDTrans == IDTrans; });
                    if (Res_1.length > 0) {
                        if (Res_1[0].Status == Active) {
                            if (Active == 1) {
                                ShowMessage('Done Update Status ✅ ', "تم التفعيل");
                                LogUser(" تم اعتماد الحركه رقم  ( " + Res_1[0].TrNo + " )", TypeLog.ApproveTrans);
                            }
                            else {
                                ShowMessage('Done Update Status ❌ ', "تم الغاء التفعيل");
                                LogUser(" تم فك اعتماد الحركه رقم  ( " + Res_1[0].TrNo + " )", TypeLog.OpenTrans);
                            }
                        }
                        else {
                            ShowMessage('Not Update Status IsPosted ❌ ', "فشل في تحديث حالة الحركة ");
                            LogUser(" تم فشل في فك اعتماد الحركه رقم  ( " + Res_1[0].TrNo + " )", TypeLog.OpenTrans);
                        }
                    }
                    Close_Loder();
                }
                else {
                    ShowMessage('Error ❌ ', 'خطأ ❌ ');
                    Close_Loder();
                }
            }
        });
    }
    function ViewVoucher(IDTrans, Amount) {
         ;
        var tafk = TafkeetArabValue(Amount);
        var RepParam;
        RepParam =
            [
                { Parameter: 'TransID', Value: "" + IDTrans + "" },
                { Parameter: 'Tfkeet', Value: "" + tafk + "" },
            ];
        Print_Report("TransMoney", "IProc_Rpt_TransMoney", RepParam);
    }
    function EditVoucher(item, IDTrans) {
        if (item.Status != 1) {
            SetGlopelModelIQ_TransMoney(item);
            OpenPagePartial("EditVoucher", "Edit Voucher", function () { Display_Refrsh(); });
        }
        else {
            ShowMessage("No Edit This Voucher Approve 😒", "لا يمكن التعديل علي حركة معتمدة 😒");
        }
    }
    function DaleteVoucher(IDTrans) {
         ;
        SqlExecuteQuery("delete   From [dbo].[I_TransMoney] where Status = 0 and ( [IDTrans] = " + IDTrans + " or [FromIDTrans] = " + IDTrans + ")");
        Filter_View_onclick();
    }
    function btnSelectAll_onclick() {
         ;
        var newArr1 = _Grid.DataSource.map(function (object) {
            if (object.Select === false || object.Select === undefined) {
                return __assign(__assign({}, object), { Select: true });
            }
            return object;
        });
        _Grid.DataSource = newArr1;
        _Grid.Bind();
    }
    function btnReverseSelection_onclick() {
        var newArr1 = _Grid.DataSource.map(function (object) {
            if (object.Select === false || object.Select === undefined) {
                return __assign(__assign({}, object), { Select: true });
            }
            else {
                return __assign(__assign({}, object), { Select: false });
            }
        });
        _Grid.DataSource = newArr1;
        _Grid.Bind();
    }
    function btnUnSelectAll_onclick() {
        var newArr1 = _Grid.DataSource.map(function (object) {
            if (object.Select === true) {
                return __assign(__assign({}, object), { Select: false });
            }
            return object;
        });
        _Grid.DataSource = newArr1;
        _Grid.Bind();
    }
    function BtnVIEW_JOURNAL_onclick() {
         ;
        var _AccList = _Grid.DataSource.filter(function (x) { return x.Select == true; });
        if (_AccList.length == 0) {
            ShowMessage('Nothing Select Account 😁😁', "لا يوجد حسابات محددة  😁😁");
            return;
        }
        var From_Date = $('#Txt_From_Date').val();
        var To_Date = $('#Txt_To_Date').val();
        var IsCash = $('#drpType').val();
        var ListCode = "";
        var Frist = false;
        for (var i = 0; i < _AccList.length; i++) {
            if (!Frist) {
                ListCode = ListCode + "" + _AccList[i].ACC_CODE + "";
            }
            else {
                ListCode = ListCode + "," + _AccList[i].ACC_CODE + "";
            }
            Frist = true;
        }
        var Table;
        Table =
            [
                { NameTable: "VIEW_JOURNAL_Ver3 " + CompCode + ",'" + From_Date + "','" + To_Date + "'," + SysSession.CurrentEnvironment.ID + "," + IsCash + ",null," + "N'" + ListCode + "'", Condition: "", IsExec: true, IsProc: true },
                { NameTable: "A_JOURNAL_VIEW", Condition: " IDUserCreate = " + SysSession.CurrentEnvironment.ID + " and COMP_CODE = " + CompCode + "" },
            ];
        DataResult(Table);
         ;
        _VIEW_JOURNAL = GetDataTable('A_JOURNAL_VIEW');
        //_VIEW_JOURNAL = _VIEW_JOURNAL.filter(x => x.SRC_TR_CODE != '10')// 'خصم سلفة'
        ActiveTab("Tap_VIEW_JOURNAL");
        ShowBack_PageTap();
        _VIEW_JOURNAL = _VIEW_JOURNAL.sort(dynamicSort("VOUCHER_SERIAL"));
         ;
        _GridViewJOUR.DataSource = _VIEW_JOURNAL;
        _GridViewJOUR.Bind();
         ;
        var Rec = Number(SumValue(_VIEW_JOURNAL, "DEBIT"));
        var Pay = Number(SumValue(_VIEW_JOURNAL, "CREDIT"));
        $('#Txt_TotalRecieptView').val(Digits(Rec, 1));
        $('#Txt_TotalPaymentView').val(Digits(Pay, 1));
        $('#Txt_NetView').val(Digits((Number(Rec) - Number(Pay)), 1));
        ShowMessage('View Journal 👌', 'تم عرض القيد بنجاح 👌');
    }
    function BtnPostAccounts_onclick() {
        if (_VIEW_JOURNAL.length == 0) {
            ShowMessage('Nothing Journal 😁😁', 'لا يوجد قيد للعرض😁😁');
            return;
        }
        if ($('#txtRemars').val().trim() == '') {
            Errorinput($('#txtRemars'), 'Pleass Enter Remarks 😒😒', 'برجاء ادخال الملاحظات 😒😒');
            return;
        }
        var Table;
        Table =
            [
                { NameTable: "Es_GenerateJournal_From_Post " + CompCode + "," + SysSession.CurrentEnvironment.ID + ",'" + SysSession.CurrentEnvironment.NameUser + "',N'" + $('#txtRemars').val().trim() + "'", Condition: "", IsExec: true, IsProc: true },
            ];
        DataResult(Table);
        ShowMessage('Done 👌', "تم الترحيل 👌");
        ActiveTab("Tap_View_Trans");
        $('#txtRemars').val('');
        //Clear();
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
        Filter_View_onclick();
    }
})(FilterTrans || (FilterTrans = {}));
//# sourceMappingURL=FilterTrans.js.map