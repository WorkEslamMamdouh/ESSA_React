$(document).ready(function () {
    EditOutWorks.InitalizeComponent();
});
var EditOutWorks;
(function (EditOutWorks) {
    var sys = new SystemTools();
    var _Grid = new JsGrid();
    var _UsersList = new Array();
    var _Usersnone = new Array();
    var FinancialType = new Array();
    var CompCode = sys.SysSession.CurrentEnvironment.CompCode;
    var LabelFinType;
    var Fin_Type;
    var Type;
    var txtSearch;
    var Filter_View;
    var btnDelete_Filter;
    var Res = GetGlopelResources();
    var invRemain = new Array();
    var purRemain = new Array();
    var Remain = 0;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        GetFinicialTypes();
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        DownloadFileExcel();
        Close_Loder();
        $('#Fin_Type').append("<option value=null>" + (Res.Lang == "Ar" ? "جميع الانواع" : "All Types") + "</option>");
    }
    EditOutWorks.InitalizeComponent = InitalizeComponent;
    function DownloadFileExcel() {
        GnrGridDownloadExcel(function () {
            var keyMapping = {
                TrNo: Res.Lang == "En" ? 'VoucherNo' : 'رقم السند',
                RefNo: Res.Lang == "En" ? 'RefNo' : 'رقم المرجع',
                Amount: Res.Lang == "En" ? 'Amount' : 'المبلغ',
                BeneficiaryName: Res.Lang == "En" ? 'BeneficiaryName' : 'المستفيد',
                TaxStatusDes: Res.Lang == "En" ? 'Status' : 'الحاله',
                Remarks: Res.Lang == "En" ? "Remarks" : "ملاحظات",
            };
            ConvertModelToFileExcel(Type.value == '0' ? 'ReceiptReport' : 'ExpenseReport', _Grid.DataSource, keyMapping);
        });
    }
    function InitalizeControls() {
        LabelFinType = document.getElementById('LabelFinType');
        Fin_Type = document.getElementById('Fin_Type');
        Type = document.getElementById('Type');
        txtSearch = document.getElementById('txtSearch');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        Type.onchange = Type_onchange;
        txtSearch.onkeyup = _SearchBox_Change;
        Filter_View.onclick = function () { GetData(); };
        btnDelete_Filter.onclick = Clear;
    }
    function GetFinicialTypes() {
        var Table;
        Table =
            [
                { NameTable: 'D_A_FinancialType', Condition: "  IsActive = 1 and CompCode =" + CompCode + "" },
            ];
        DataResult(Table);
        FinancialType = GetDataTable('D_A_FinancialType');
    }
    function Type_onchange() {
        $('#Fin_Type').html("");
        if (Type.value == "null") {
            $('#Fin_Type').append("<option value=null>" + (Res.Lang == "Ar" ? "جميع الانواع" : "All Types") + "</option>");
            LabelFinType.innerHTML = "Finincial Types";
        }
        else {
            LabelFinType.innerHTML = Res.Lang == "Ar" ? " انواع " + Type.options[Type.selectedIndex].text : Type.options[Type.selectedIndex].text + " Types";
            var FltrFinancial = FinancialType.filter(function (x) { return x.TrType == Number(Type.value); });
            FillDropwithAttr(FltrFinancial, "Fin_Type", "FinancialTypeID", (Res.Lang == "Ar" ? "DescAr" : "DescEn"), (Res.Lang == "Ar" ? "جميع الانواع" : "All Types"), "", "");
        }
        Filter_View.click();
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _UsersList.filter(function (x) { var _a, _b; return ((_a = x.RefNo) === null || _a === void 0 ? void 0 : _a.toLowerCase().search(search_1)) >= 0 || ((_b = x.Amount) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase().search(search_1)) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _UsersList;
            _Grid.Bind();
        }
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        _Grid.PrimaryKey = "TransactionID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = function () { };
        _Grid.Columns = [
            { title: Res.Lang == "En" ? "TransactionID" : "الكود", name: "TransactionID", visible: false, width: "7%" },
            { title: Res.Lang == "En" ? "VoucherNo" : "رقم السند", name: "TrNo", type: "text", width: "6%" },
            { title: Res.Lang == "En" ? "RefNo" : "رقم المرجع", name: "RefNo", type: "text", width: "6%" },
            { title: Res.Lang == "En" ? "Amount" : "المبلغ", name: "Amount", type: "number", width: "8%" },
            { title: Res.Lang == "En" ? "Tr.Date" : "التاريخ", css: "TransactionDate", name: "IsCash", width: "8%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TransactionDate);
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "BeneficiaryName" : "المستفيد", css: "BeneficiaryName", name: "BeneficiaryName", width: "15%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = item.BeneficiaryName;
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Cash Type" : "النوع", css: "ColumPadding", name: "IsCash", width: "7%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (Res.Lang == "Ar") {
                        txt.innerHTML = item.IsCash == true ? "نقدي" : "علي حساب";
                    }
                    else {
                        txt.innerHTML = item.IsCash == true ? "Cash" : "Credit";
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Trans Type" : "نوع الحركه", css: "ColumPadding", name: "IsCash", width: "6%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (Res.Lang == "Ar") {
                        txt.innerHTML = item.TrType == 1 ? "صرف" : "قبض";
                    }
                    else {
                        txt.innerHTML = item.TrType == 1 ? "Expense" : "Reciept";
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Finicial Type" : "نوع الماليات", css: "ColumPadding", name: "IsCash", width: "10%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (Res.Lang == "Ar") {
                        txt.innerHTML = FinancialType.filter(function (x) { return x.FinancialTypeID == item.Type; })[0].DescAr;
                    }
                    else {
                        txt.innerHTML = FinancialType.filter(function (x) { return x.FinancialTypeID == item.Type; })[0].DescEn;
                    }
                    return txt;
                }
            },
            { title: Res.Lang == "En" ? "Remarks" : "ملاحظات", name: "Remarks", type: "text", width: "15%" },
            {
                title: Res.Lang == "En" ? "Active" : "نشط", width: "3%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.TransactionID;
                    txt.className = "checkbox";
                    txt.checked = item.Status == 1 ? true : false;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    txt.onclick = function (e) {
                        IsActive(item.TransactionID, txt.checked == false ? 0 : 1, item.TrType, item.Amount, item.InvoiceID);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Edit" : "تعديل ", width: "5%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Edit" : "تعديل" + " ⚙️");
                    txt.id = "butView" + item.TransactionID;
                    txt.disabled = item.Status == 1 ? true : false;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = function (e) {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Print" : "طباعه", width: "5%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Print" : "طباعه ");
                    txt.id = "butView" + item.TransactionID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    txt.disabled = item.Status == 1 ? false : true;
                    txt.onclick = function (e) {
                        Print_Pdf(item.TransactionID, item.TrType);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function ViewUser(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item);
        if (item.TrType == 0) {
            OpenPagePartial("Receipt", "EditReceipt", function () { Display_Refrsh(); });
        }
        else {
            OpenPagePartial("Payment", "EditReceipt", function () { Display_Refrsh(); });
        }
    }
    function GetData(IsChangeActive, ID, Status) {
        if (IsChangeActive === void 0) { IsChangeActive = false; }
        if (ID === void 0) { ID = 0; }
        if (Status === void 0) { Status = 0; }
        if ($('#Txt_TOTrData').val() == "") {
            Errorinput($('#Txt_TOTrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
            return;
        }
        if ($('#Txt_FromTrData').val() == "") {
            Errorinput($('#Txt_FromTrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
            return;
        }
        CleaningList_Table();
        var Cond = "";
        if (Type.value != "null") {
            if (Fin_Type.value != "null") {
                Cond = " and TrType = " + Type.value + " and Type = " + Fin_Type.value;
            }
            else {
                Cond = " and TrType = " + Type.value;
            }
        }
        var Table;
        Table =
            [
                { NameTable: 'I_TR_ExternalLabor', Condition: " CompCode = " + CompCode + " and  TransactionDate >= '" + $('#Txt_FromTrData').val() + "' and   TransactionDate <= '" + $('#Txt_TOTrData').val() + "'" + Cond + "" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        _UsersList = GetDataTable('I_TR_ExternalLabor');
        _UsersList = _UsersList.sort(dynamicSortNew("TrNo"));
        $('#btnDelete_Filter').removeClass('display_none');
        _Grid.DataSource = _UsersList;
        _Grid.Bind();
        if (IsChangeActive && ID > 0) {
            var chack = _UsersList.filter(function (x) { return x.TransactionID == ID; });
            if (chack.length > 0) {
                if (chack[0].Status == Status) {
                    ShowMessage("Done Change 😍👌" + (Status == 0 ? " Not Approve " : " Approve "), "تم التغيير 😍👌" + (Status == 0 ? " عدم الموافقة " : " الموافقة "));
                }
                else {
                    ShowMessage("No Changes 😒", "لا تغييرات 😒");
                }
            }
        }
    }
    function Clear() {
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        $('#btnDelete_Filter').addClass('display_none');
        $('#txtSearch').val('');
        //Type.value = "null";
        Type_onchange();
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
        GetData();
    }
    function GetRemaininv(PurchaseID) {
        var Table;
        Table =
            [
                { NameTable: 'I_TR_Sales', Condition: "SaleID = " + PurchaseID + "" },
            ];
        DataResult(Table);
        invRemain = GetDataTable('I_TR_Sales');
        Remain = invRemain[0].RemainAmount;
    }
    function GetRemainPur(PurchaseID) {
        var Table;
        Table =
            [
                { NameTable: 'I_TR_Purchases', Condition: "PurchaseID = " + PurchaseID + "" },
            ];
        DataResult(Table);
        purRemain = GetDataTable('I_TR_Purchases');
        Remain = purRemain[0].RemainAmount;
    }
    function IsActive(ID, Status, TrType, Amount, PurchaseID) {
        if (Status == 1) {
            if (TrType == 0 && PurchaseID != 0) {
                GetRemaininv(PurchaseID);
                if (Amount > Remain) {
                    ShowMessage("The amount remaining to be paid [ " + Remain + " ] cannot exceed the amount 😒", "المبلغ المتبقي للسداد [ " + Remain + " ]  لا يمكن ان تتعدي المبلغ 😒");
                    GetData(true, ID, Status);
                    return;
                }
            }
            if (TrType == 1 && PurchaseID != 0) {
                GetRemainPur(PurchaseID);
                if (Amount > Remain) {
                    ShowMessage("The amount remaining to be paid [ " + Remain + " ] cannot exceed the amount 😒", "المبلغ المتبقي للسداد [ " + Remain + " ]  لا يمكن ان تتعدي المبلغ 😒");
                    GetData(true, ID, Status);
                    return;
                }
            }
        }
        SqlExecuteQuery(" update [dbo].[I_TR_ExternalLabor] set [Status] = " + Status + " where [TransactionID] = " + ID);
        var Mod = Status == 0 ? "Open" : "Update";
        var Type = TrType == 0 ? "Receipt" : "Payment";
        SqlExecuteQuery("[G_ProcessTrans] " + sys.SysSession.CurrentEnvironment.CompCode + ",1,'" + Type + "','" + Mod + "'," + ID + "," + 1 + ",0");
        GetData(true, ID, Status);
    }
    function Print_Pdf(TrID, Trtype) {
        var RepParam;
        RepParam =
            [
                { Parameter: 'TrID', Value: "" + TrID + "" },
            ];
        if (Trtype == 0) { // Summary
            Print_Report("Prnt_FinancialRecieptAr", "IProc_Prnt_Financial", RepParam);
        }
        else {
            Print_Report("Prnt_FinancialExpenseAr", "IProc_Prnt_Financial", RepParam);
        }
    }
})(EditOutWorks || (EditOutWorks = {}));
//# sourceMappingURL=EditOutWorks.js.map