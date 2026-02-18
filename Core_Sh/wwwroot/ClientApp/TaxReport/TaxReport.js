$(document).ready(() => {
    TaxReport.InitalizeComponent();
});
var TaxReport;
(function (TaxReport) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid = new JsGrid();
    var _Grid1 = new JsGrid();
    var PeriodList = new Array();
    var _Datanone = new Array();
    var _Datanone1 = new Array();
    var SalesList = new Array();
    var PurList = new Array();
    var today = new Date();
    var currentYear = today.getFullYear();
    var PeriodStatus = 0;
    var TotalSales;
    var TotalSalesRet;
    var TotalSalesVat;
    var TotalPur;
    var TotalPurRet;
    var TotalPurVat;
    var DueTax;
    var Txt_FromTrData;
    var Txt_TOTrData;
    var drpPeriod;
    var btnDelete_Filter;
    var btnClose;
    var btnprint;
    var Res = GetGlopelResources();
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        GetAllPeriod();
        InitializeGrid();
        InitializeGrid1();
        Close_Loder();
    }
    TaxReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Txt_FromTrData = document.getElementById('Txt_FromTrData');
        Txt_TOTrData = document.getElementById('Txt_TOTrData');
        drpPeriod = document.getElementById('drpPeriod');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        btnClose = document.getElementById('btnClose');
        btnprint = document.getElementById('btnprint');
        TotalSales = document.getElementById('TotalSales');
        TotalSalesRet = document.getElementById('TotalSalesRet');
        TotalSalesVat = document.getElementById('TotalSalesVat');
        TotalPur = document.getElementById('TotalPur');
        TotalPurRet = document.getElementById('TotalPurRet');
        TotalPurVat = document.getElementById('TotalPurVat');
        DueTax = document.getElementById('DueTax');
    }
    function InitializeEvents() {
        btnClose.onclick = ClosePeriod;
        btnDelete_Filter.onclick = Clear;
        drpPeriod.onchange = drpPeriod_onchange;
        btnprint.onclick = btnprint_onclick;
    }
    function ClosePeriod() {
        Show_Loder();
        setTimeout(function () {
            if (drpPeriod.value == "null") {
                Errorinput($('#drpPeriod'), "You must select period 😛", "يجب اختيار الفترة 😛");
            }
            else {
                var Query = "update[dbo].[VAT_PERIOD] set STATUS = 1 where COMP_CODE = " + CompCode + " and VAT_YEAR = " + currentYear + " and PERIOD_CODE = " + Number(drpPeriod.value) + "; IF @@ROWCOUNT > 0 select 1 as Result; ELSE select 0 as Result;";
                let Resullt = GetDataFromProc(Query, "Result_Execute");
                PeriodStatus = Number(Resullt[0].Result);
                if (PeriodStatus == 1) {
                    ShowMessage("Period Closed 👌", "تم اغلاق الفترة 👌");
                    $('#btnClose').addClass("disabledDiv");
                }
                else {
                    $('#btnClose').removeClass("disabledDiv");
                }
                let index = drpPeriod.selectedIndex;
                GetAllPeriod();
                drpPeriod.selectedIndex = index;
            }
            Close_Loder();
        }, 50);
    }
    function GetAllPeriod() {
        var Table;
        Table =
            [
                { NameTable: 'VAT_PERIOD', Condition: "   COMP_CODE =" + CompCode + "and VAT_YEAR = " + currentYear + "" },
            ];
        DataResult(Table);
        PeriodList = GetDataTable('VAT_PERIOD');
        FillDropwithAttr(PeriodList, "drpPeriod", "PERIOD_CODE", "PERIOD_CODE", (Res.Lang == "Ar" ? "اختر الفترة" : "Choose Period"), "FROM", "FROM_DATE", "TO", "TO_DATE", "Status", "STATUS");
    }
    function drpPeriod_onchange() {
        if (drpPeriod.value == "null") {
            $('#btnClose').addClass("disabledDiv");
            Txt_FromTrData.value = "";
            Txt_TOTrData.value = "";
            _Grid.DataSource = _Datanone;
            _Grid.Bind();
            _Grid1.DataSource = _Datanone1;
            _Grid1.Bind();
        }
        else {
            Txt_FromTrData.value = DateFormat($('option:selected', $("#drpPeriod")).attr('data-from'));
            Txt_TOTrData.value = DateFormat($('option:selected', $("#drpPeriod")).attr('data-to'));
            PeriodStatus = Number($('option:selected', $("#drpPeriod")).attr('data-Status'));
            if (PeriodStatus == 1) {
                $('#btnClose').addClass("disabledDiv");
            }
            else {
                $('#btnClose').removeClass("disabledDiv");
            }
            GetData();
        }
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        //_Grid.PrimaryKey = "PurchaseID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: Res.Lang == "En" ? "Tax Describtion" : "وصف الضريبة", name: "Describtion", width: "100px" },
            { title: Res.Lang == "En" ? "Sales Amount" : "مبلغ المبيعات", name: "SalesTotal", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "Retun Amount" : "مبلغ الإرجاع", name: "ReturnSales", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "Tax Amount" : "مبلغ الضريبة", name: "VatAmount", type: "text", width: "100px" },
        ];
        _Grid.Bind();
    }
    function InitializeGrid1() {
        _Grid1.ElementName = "_Grid1";
        _Grid1.Paging = true;
        _Grid1.PageSize = 15;
        _Grid1.Sorting = true;
        _Grid1.InsertionMode = JsGridInsertionMode.Binding;
        _Grid1.Editing = false;
        _Grid1.Inserting = false;
        _Grid1.SelectedIndex = 1;
        _Grid1.OnItemEditing = () => { };
        _Grid1.Columns = [
            { title: Res.Lang == "En" ? "Tax Describtion" : "وصف الضريبة", name: "Describtion", width: "100px" },
            { title: Res.Lang == "En" ? "Purcahse Amount" : "مبلغ الشراء", name: "PurTotal", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "Retun Amount " : "مبلغ الإرجاع", name: "ReturnPur", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "Tax Amount" : "مبلغ الضريبة", name: "VatAmount", type: "text", width: "100px" },
        ];
        _Grid1.Bind();
    }
    function GetData(IsChangeActive = false, ID = 0, Status = 0) {
        CleaningList_Table();
        SalesList = GetDataFromProc("V_Proc_GetVatSales  " + CompCode + " , " + Number(drpPeriod.value) + " ", "V_Proc_GetVatSales");
        PurList = GetDataFromProc("V_Proc_GetVatPurchase  " + CompCode + " , " + Number(drpPeriod.value) + " ", "V_Proc_GetVatPurchase");
        _Grid.DataSource = SalesList;
        _Grid.Bind();
        _Grid1.DataSource = PurList;
        _Grid1.Bind();
        let SumTotalSales = 0;
        let SumTotalSalesRet = 0;
        let SumTotalSalesVat = 0;
        let SumTotalPur = 0;
        let SumTotalPurRet = 0;
        let SumTotalPurVat = 0;
        for (var i = 0; i < SalesList.length; i++) {
            SumTotalSales += SalesList[i].SalesTotal;
            SumTotalSalesRet += SalesList[i].ReturnSales;
            SumTotalSalesVat += SalesList[i].VatAmount;
        }
        for (var i = 0; i < PurList.length; i++) {
            SumTotalPur += PurList[i].PurTotal;
            SumTotalPurRet += PurList[i].ReturnPur;
            SumTotalPurVat += PurList[i].VatAmount;
        }
        TotalSales.innerHTML = SumTotalSales.toFixed(2);
        TotalSalesRet.innerHTML = SumTotalSalesRet.toFixed(2);
        TotalSalesVat.innerHTML = SumTotalSalesVat.toFixed(2);
        TotalPur.innerHTML = SumTotalPur.toFixed(2);
        TotalPurRet.innerHTML = SumTotalPurRet.toFixed(2);
        TotalPurVat.innerHTML = SumTotalPurVat.toFixed(2);
        DueTax.value = (SumTotalSalesVat - SumTotalPurVat).toFixed(2);
    }
    function Clear() {
        $('#drpPeriod').val("null");
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        CleaningList_Table();
    }
    function btnprint_onclick() {
        if (drpPeriod.value == "null") {
            Errorinput($('#drpPeriod'), "You must select period 😛", "يجب اختيار الفترة 😛");
        }
        else {
            var RepParam;
            RepParam =
                [
                    { Parameter: 'Comp', Value: "" + CompCode + "" },
                    { Parameter: 'periodCode', Value: "" + Number(drpPeriod.value) + "" },
                ];
            if (Res.Lang == "Ar") {
                Print_Report("Rpt_TaxReportAr", "IProc_Rpt_TaxReport", RepParam);
            }
            else {
                Print_Report("Rpt_TaxReportEn", "IProc_Rpt_TaxReport", RepParam);
            }
        }
    }
})(TaxReport || (TaxReport = {}));
//# sourceMappingURL=TaxReport.js.map