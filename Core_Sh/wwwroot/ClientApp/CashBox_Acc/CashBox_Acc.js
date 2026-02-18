$(document).ready(() => {
    CashBox_Acc.InitalizeComponent();
});
var CashBox_Acc;
(function (CashBox_Acc) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res = GetGlopelResources();
    var Txt_From_Date;
    var Txt_To_Date;
    var IncludeOpeningBalance;
    var Cash_Type;
    var Filter_View;
    var Filter_Users;
    var Filter_Excel;
    var HangingTrans;
    var PostTrans;
    var btnDelete_Filter;
    var _Grid = new JsGrid();
    var BoxList = new Array();
    function InitalizeComponent() {
        debugger;
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        $('#Txt_From_Date').val(DateStartYear());
        //$('#Txt_From_Date').val(GetDate())
        $('#Txt_To_Date').val(GetDate());
        GetFinTypes();
        GetData();
        if (!SysSession.CurrentEnvironment.I_Control.IS_POS) {
            $('._IDExcel').addClass("display_none");
        }
        Close_Loder();
    }
    CashBox_Acc.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Cash_Type = document.getElementById('Cash_Type');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        Filter_View = document.getElementById('Filter_View');
        Filter_Users = document.getElementById('Filter_Users');
        HangingTrans = document.getElementById('HangingTrans');
        PostTrans = document.getElementById('PostTrans');
        Filter_Excel = document.getElementById('Filter_Excel');
        Txt_From_Date = document.getElementById('Txt_From_Date');
        Txt_To_Date = document.getElementById('Txt_To_Date');
        IncludeOpeningBalance = document.getElementById('IncludeOpeningBalance');
    }
    function InitializeEvents() {
        btnDelete_Filter.onclick = Clear;
        Filter_View.onclick = GetData;
        Cash_Type.onchange = GetData;
        IncludeOpeningBalance.onchange = GetData;
        Filter_Users.onclick = Filter_Users_onclick;
        HangingTrans.onclick = HangingTrans_onclick;
        PostTrans.onclick = PostTrans_onclick;
        Filter_Excel.onclick = Filter_DayShift_onclick;
    }
    function Filter_Users_onclick() {
        let Con = "";
        //if (SysSession.CurrentEnvironment.GQ_USERS.USER_TYPE != 1) {
        //    Con = " and USER_TYPE <> 1 ";
        //}
        //sys.FindKey("USERS", "btnUSERS", " ( CompCode = " + CompCode + " or  CompCode = -1 ) " + Con, () => {
        sys.FindKeyPagination("USERS", "btnUSERS", "  CompCode = " + CompCode + " and RoleId <> 1 " + Con, () => {
            let SelectedItem = SelectDataSearch.DataRow;
            $('#Filter_Users').html("( " + SelectedItem.NameUser + " )");
            $('#TxtUserId').val(SelectedItem.IDUser);
            GetData();
        });
    }
    function HangingTrans_onclick() {
        debugger;
        let Con = "";
        sys.FindKeyPagination("TransUnPosted", "TransUnPosted", "  Comp_Code = " + CompCode + " and FinYear = " + SysSession.CurrentEnvironment.CurrentYear, () => {
            let SelectedItem = SelectDataSearch.DataRow;
            console.log(SelectedItem);
        });
    }
    function PostTrans_onclick() {
        if (confirm("هل تريد ترحيل الحركات بالفعل ؟ ")) {
            SqlExecuteQuery("exec Z_A_Post_TransToJournalUnBalance " + CompCode + "," + SysSession.CurrentEnvironment.CurrentYear);
            ShowMessage('Transactions Posted Succesfuly ✅', 'تم ترحيل الحركات بنجاح ✅');
        }
    }
    function Filter_DayShift_onclick() {
        let Con = "";
        sys.FindKeyPagination("DayShift", "DayShift", "  CompCode = " + CompCode + " and Status = 1 " + Con, () => {
            let SelectedItem = SelectDataSearch.DataRow;
            $('#Filter_Excel').html("( " + SelectedItem.DescA + " )");
            $('#IDExcel').val(SelectedItem.LastCount);
            GetData();
        });
    }
    function Filter_Excel_onclick() {
        let Con = "";
        sys.FindKeyPagination("Excel", "btnExcel", "  CompCode = " + CompCode + " and Status = 1 " + Con, () => {
            let SelectedItem = SelectDataSearch.DataRow;
            $('#Filter_Excel').html("( " + SelectedItem.NameExcel + " )");
            $('#IDExcel').val(SelectedItem.IDExcel);
            GetData();
        });
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid1";
        _Grid.Paging = true;
        _Grid.PageSize = 10;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: Res.Lang == "En" ? "CashTypeID" : "CashTypeID", visible: false, name: "CashTypeID", width: "100px" },
            {
                title: Res.Lang == "En" ? "Account Code" : "رقم الحساب", name: "CashAccCode", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = (item.CashAccCode);
                    if (item.CashAccCode == "-------") {
                        txt.classList.add("TotaleGrid");
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Name Account" : "اسم الحساب", name: "ACC_DESCA", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = (item.ACC_DESCA);
                    if (item.CashAccCode == "-------") {
                        txt.classList.add("TotaleGrid");
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Debit" : "مدين", name: "DEBIT", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = Digits(item.DEBIT);
                    if (item.DEBIT >= 0) {
                        txt.style.color = "Green";
                    }
                    else {
                        txt.style.color = "Red";
                    }
                    if (item.CashAccCode == "-------") {
                        txt.classList.add("TotaleGrid");
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Credit" : "دائن", name: "CREDIT", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = Digits(item.CREDIT);
                    if (item.CREDIT >= 0) {
                        txt.style.color = "Green";
                    }
                    else {
                        txt.style.color = "Red";
                    }
                    if (item.CashAccCode == "-------") {
                        txt.classList.add("TotaleGrid");
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Balance" : "الرصيد", name: "Balance", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = Digits(item.Balance);
                    if (item.Balance >= 0) {
                        txt.style.color = "Green";
                    }
                    else {
                        txt.style.color = "Red";
                    }
                    if (item.CashAccCode == "-------") {
                        txt.classList.add("TotaleGrid");
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Print" : "طباعه", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? " Print Detail " : "طباعه التفاصيل ");
                    txt.id = "butView" + item.CashTypeID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    if (!SysSession.CurrentPrivileges.PRINT) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        Print_Pdf(item.CashTypeID);
                    };
                    if (item.CashAccCode == "-------") {
                        txt.classList.add("TotaleGrid");
                    }
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function GetData() {
        $("#_Grid1").jsGrid("option", "pageIndex", 1);
        BoxList = new Array();
        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒");
            return;
        }
        let fromdate = $('#Txt_From_Date').val();
        let todate = $('#Txt_To_Date').val();
        let CashType = $('#Cash_Type').val();
        let IncludeOpeningBalance = $('#IncludeOpeningBalance').prop("checked");
        let IncOpenBal = '0';
        if (CashType == 'null') {
        }
        if (IncludeOpeningBalance) {
            IncOpenBal = "1";
        }
        let IDUser = "null";
        if (Number($('#TxtUserId').val()) > 0) {
            IDUser = $('#TxtUserId').val();
        }
        let IDExcel = "null";
        if (Number($('#IDExcel').val()) > 0) {
            IDExcel = $('#IDExcel').val();
        }
        BoxList = GetDataFromProc("IProc_Z_A_AccountStatment_CachBox_Sum  " + CompCode + " ," + CashType + ", '" + fromdate + "' , '" + todate + "' , " + IDUser + " , " + IDExcel + " ," + IncOpenBal + "   ", "IProc_Z_A_AccountStatment_CachBox_Sum");
        debugger;
        let AllCREDIT = 0;
        let AllDEBIT = 0;
        let AllBalance = 0;
        for (var i = 0; i < BoxList.length; i++) {
            AllCREDIT = AllCREDIT + BoxList[i].CREDIT;
            AllDEBIT = AllDEBIT + BoxList[i].DEBIT;
            AllBalance = AllBalance + BoxList[i].Balance;
        }
        let CashAllModel = new IProc_Z_A_AccountStatment_CachBox_Sum();
        CashAllModel.CashTypeID = 0;
        CashAllModel.CashAccCode = '-------';
        CashAllModel.ACC_DESCA = 'اجمالي الخزينة';
        CashAllModel.CREDIT = AllCREDIT;
        CashAllModel.DEBIT = AllDEBIT;
        CashAllModel.Balance = AllBalance;
        BoxList.push(CashAllModel);
        _Grid.DataSource = BoxList;
        _Grid.Bind();
        //$("label.TotaleGrid").closest("td").addClass("highlight-row");
        $("label.TotaleGrid").closest("td").attr("class", "highlight-row");
    }
    function GetFinTypes() {
        var Table;
        Table =
            [
                { NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + "  and IsActive = 1" },
            ];
        DataResult(Table);
        let CashTypes = GetDataTable('D_A_CashTypes');
        FillDropwithAttr(CashTypes, "Cash_Type", "CashTypeID", "Description", (Res.Lang == "Ar" ? "جميع الانواع" : "AllTypes"), "", "");
    }
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        Cash_Type.value = "null";
        $('#Filter_Users').html(Res.Lang == "En" ? "User Name" : "  المستخدم");
        $('#Filter_Excel').html(Res.Lang == "En" ? "Close Day" : "  الايام المغلقة");
        $('#TxtUserId').val(0);
        $('#IDExcel').val(0);
        $('#IncludeOpeningBalance').prop("checked", true);
        GetData();
    }
    function Print_Pdf(CashTypeID) {
        debugger;
        let CashType = 'null';
        if (CashTypeID > 0) {
            CashType = CashTypeID.toString();
        }
        let IncludeOpeningBalance = $('#IncludeOpeningBalance').prop("checked");
        let IncOpenBal = '0';
        if (IncludeOpeningBalance) {
            IncOpenBal = "1";
        }
        let IDUser = "null";
        if (Number($('#TxtUserId').val()) > 0) {
            IDUser = $('#TxtUserId').val();
        }
        let IDExcel = "null";
        if (Number($('#IDExcel').val()) > 0) {
            IDExcel = $('#IDExcel').val();
        }
        var RepParam;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + CompCode + "" },
                { Parameter: 'CashTypeID', Value: "" + CashType + "" },
                { Parameter: 'FromDate', Value: "" + DateFormatSql($('#Txt_From_Date').val()) + "" },
                { Parameter: 'ToDate', Value: "" + DateFormatSql($('#Txt_To_Date').val()) + "" },
                { Parameter: 'IDUser', Value: "" + IDUser + "" },
                { Parameter: 'IDExcel', Value: "" + IDExcel + "" },
                { Parameter: 'IncludeOpenBal', Value: "" + IncOpenBal + "" },
            ];
        if (Res.Lang == "Ar") {
            Print_Report("Rpt_CashBox_AccAr", "IProc_Z_A_AccountStatment_CachBox", RepParam);
        }
        else {
            Print_Report("Rpt_CashBox_AccEn", "IProc_Z_A_AccountStatment_CachBox", RepParam);
        }
    }
})(CashBox_Acc || (CashBox_Acc = {}));
//# sourceMappingURL=CashBox_Acc.js.map