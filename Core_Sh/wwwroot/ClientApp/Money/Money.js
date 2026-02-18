$(document).ready(function () {
    Money.InitalizeComponent();
});
var Money;
(function (Money) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var _TransList = new Array();
    var _Transnone = new Array();
    var txtSearch;
    var drpActive;
    var Filter_View;
    var Filter_Select_Account;
    var Filter_Select_Excel;
    var btnDelete_Filter;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        //$('#Txt_From_Date').val(DateStartYear())
        $('#Txt_From_Date').val(GetDate());
        $('#Txt_To_Date').val(GetDate());
        DownloadFileExcel();
        Close_Loder();
    }
    Money.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
        Filter_View = document.getElementById('Filter_View');
        Filter_Select_Account = document.getElementById('Filter_Select_Account');
        Filter_Select_Excel = document.getElementById('Filter_Select_Excel');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        Filter_Select_Account.onclick = SearchAcc;
        Filter_Select_Excel.onclick = SearchExcel;
        Filter_View.onclick = function () {
            LogUser(" عمل عرض يبانات ", TypeLog.Views);
            GetData_Money();
        };
        txtSearch.onkeyup = _SearchBox_Change;
        btnDelete_Filter.onclick = Clear;
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
            { title: "Journal No", name: "VoucherNo", type: "Number", width: "100px" },
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
                title: "Status",
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
                title: "Edit",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Edit");
                    txt.style.backgroundColor = "green";
                    txt.id = "butEdit" + item.IDTrans;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    if (item.Status == 1) {
                        txt.disabled = true;
                    }
                    txt.onclick = function (e) {
                        LogUser(" تم اختيار الحركه للتعديل رقم  ( " + item.TrNo + " )", TypeLog.OpenTrans);
                        EditVoucher(item, item.IDTrans);
                    };
                    return txt;
                }
            },
            {
                title: "Print",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Print");
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
                title: "Delete",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Delete");
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
        _Grid.Bind();
    }
    function DownloadFileExcel() {
        GnrGridDownloadExcel(function () {
            var keyMapping = {
                TrNo: 'TrNo',
                CreatedBy: 'Created By',
                TrDate: 'TrDate',
                VoucherNo: 'Journal No',
                IsCash: 'IsCash',
                From_ACC_DESCA: 'From Account',
                ACC_DESCA: 'To Account',
                Remark: 'Remark',
                Amount: 'Amount',
            };
            ConvertModelToFileExcel('ListVoucher', _Grid.DataSource, keyMapping);
        });
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
    function GetData_Money() {
         ;
        CleaningList_Table();
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        var Con = '';
        var Active = $('#drpActive').val() == "Null" ? "0,1" : $('#drpActive').val();
        var IsCash = $('#drpType').val() == "Null" ? "0,1" : $('#drpType').val();
        if (Number($('#FiltAcc_Code').val()) != 0) {
            Con = Con + ' and ( ACC_CODE = ' + $('#FiltAcc_Code').val() + ' Or From_ACC_CODE =' + $('#FiltAcc_Code').val() + '  )';
        }
        if (Number($('#Excel_ID').val()) != 0) {
            Con = Con + ' and  IDExcel = ' + $('#Excel_ID').val();
        }
        var Type = '0,5'; //"0,1,2,3"
        var From_Date = $('#Txt_From_Date').val();
        var To_Date = $('#Txt_To_Date').val();
        var Table;
        Table =
            [
                { NameTable: 'IQ_TransMoney', Condition: "CompCode = " + CompCode + " and TrDate >= '" + From_Date + "' and TrDate <= '" + To_Date + "' and  TrType in (" + Type + " )  and Status in(" + Active + ") and IsCash in(" + IsCash + ") " + Con },
            ];
        DataResult(Table);
        //**************************************************************************************************************
         ;
        _TransList = GetDataTable('IQ_TransMoney');
        _TransList = _TransList.sort(dynamicSortNew("IDTrans"));
        $('#btnDelete_Filter').removeClass('display_none');
        _Grid.DataSource = _TransList;
        _Grid.Bind();
        var _Trans = _TransList.filter(function (x) { return x.Status == 1; });
        var Rec = Number(SumValue(_Trans, "Debit"));
        var Pay = Number(SumValue(_Trans, "Credit"));
        $('#Txt_TotalReciept').val(Digits(Rec, 1));
        $('#Txt_TotalPayment').val(Digits(Pay, 1));
        $('#Txt_Net').val(Digits((Number(Rec) + Number(Pay)), 1));
    }
    function Clear() {
        $('#drpActive').val("Null");
        $('#drpType').val("Null");
        $('#Excel_ID').val('');
        $('#FiltAcc_Code').val('');
        $('#Filter_Select_Account').html('Select Account');
        $('#Filter_Select_Excel').html('Select Excel');
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
    function SearchAcc() {
        sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + " and DETAIL = 1 ", function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#Filter_Select_Account').html(SelectedItem.ACC_DESCA);
            $('#FiltAcc_Code').val(SelectedItem.ACC_CODE);
            LogUser(" تم عمل بحث واختيار الحساب (" + SelectedItem.ACC_DESCA + ") ", TypeLog.Search);
        });
    }
    function SearchExcel() {
        sys.FindKey("Excel", "btnExcel", " CompCode = " + CompCode + " and Status = 1", function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#Filter_Select_Excel').html(SelectedItem.IDExcel);
            $('#Excel_ID').val(SelectedItem.IDExcel);
        });
    }
    function Approve(IDTrans, Active) {
        //  var G_DefTempExcel = [{ ID: 1, NameTitle: "Ser" }, { ID: 2, NameTitle: "Name" }, { ID: 3, NameTitle: "Age" }]
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("TransMoney", "ApproveOrOpenTransMoney"),
            data: { CompCode: CompCode, BranchCode: 1, IDTrans: IDTrans, Active: Active },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetData_Money();
                    var Res = _TransList.filter(function (x) { return x.IDTrans == IDTrans; });
                    if (Res.length > 0) {
                        if (Res[0].Status == Active) {
                            if (Active == 1) {
                                ShowMessage('Done Update Status ✅ ');
                                LogUser(" تم اعتماد الحركه رقم  ( " + Res[0].TrNo + " )", TypeLog.ApproveTrans);
                            }
                            else {
                                ShowMessage('Done Update Status ❌ ');
                                LogUser(" تم فك اعتماد الحركه رقم  ( " + Res[0].TrNo + " )", TypeLog.OpenTrans);
                            }
                        }
                        else {
                            ShowMessage('Not Update Status IsPosted ❌ ');
                            LogUser(" تم فشل في فك اعتماد الحركه رقم  ( " + Res[0].TrNo + " )", TypeLog.OpenTrans);
                        }
                    }
                    Close_Loder();
                }
                else {
                    ShowMessage('Error ❌ ');
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
            ShowMessage("No Edit This Voucher Approve 😒");
        }
    }
    function DaleteVoucher(IDTrans) {
         ;
        SqlExecuteQuery("delete   From [dbo].[I_TransMoney] where Status = 0 and ( [IDTrans] = " + IDTrans + " or [FromIDTrans] = " + IDTrans + ")");
        GetData_Money();
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
        GetData_Money();
    }
})(Money || (Money = {}));
//# sourceMappingURL=Money.js.map