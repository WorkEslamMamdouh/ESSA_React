$(document).ready(() => {
    IncomeStatment.InitalizeComponent();
});
var IncomeStatment;
(function (IncomeStatment) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res = GetGlopelResources();
    var FromDate;
    var ToDate;
    var PrintPdf;
    var PrintExcel;
    var btnDelete_Filter;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#FromDate').val(DateStartYear());
        $('#ToDate').val(GetDate());
        Close_Loder();
    }
    IncomeStatment.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = document.getElementById('FromDate');
        ToDate = document.getElementById('ToDate');
        PrintExcel = document.getElementById('PrintExcel');
        PrintPdf = document.getElementById('PrintPdf');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        PrintPdf.onclick = Print_Pdf;
        PrintExcel.onclick = Print_Excel;
        btnDelete_Filter.onclick = Clear;
    }
    function Clear() {
        $('#FromDate').val(DateStartYear());
        $('#ToDate').val(GetDate());
    }
    function Print_Pdf() {
        var RepParam;
        RepParam =
            [
                { Parameter: 'CompCode', Value: "" + Number(CompCode) + "" },
                { Parameter: 'FromDate', Value: "" + FromDate.value + "" },
                { Parameter: 'ToDate', Value: "" + ToDate.value + "" },
            ];
        if (Res.Lang == "Ar") {
            Print_Report("Rpt_Annual_Income_StatementAr", "IProc_Rpt_Annual_Income_Statement", RepParam);
        }
        else {
            Print_Report("Rpt_Annual_Income_StatementEn", "IProc_Rpt_Annual_Income_Statement", RepParam);
        }
    }
    function Print_Excel() {
        alert("تحت الانشاء");
        //if (Number(RepType.value) == 1) {
        //    let keyMapping = {
        //        ACC_CODE: 'رقم الحساب',
        //        ACC_DESCA: ' الحساب',
        //        DEBIT: 'مدين',
        //        CREDIT: 'دائن',
        //        Balance: 'الرصيد',
        //    };
        //    Print_Report_Excel("IProc_Rpt_AccountStatmentSum " + CompCode + ",'" + DateFormat($('#FromDate').val()) + "','" + DateFormat($('#ToDate').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatmentSum", "Report Account Statment Summary", keyMapping)
        //} else {
        //    let keyMapping = {
        //        TrNo: 'رقم الحركه',
        //        TypeTans: 'نوع القيد',
        //        VOUCHER_DATE: 'التاريخ',
        //        ACC_CODE: 'رقم الحساب',
        //        ACC_DESCA: ' الحساب',
        //        DEBIT: 'مدين',
        //        CREDIT: 'دائن',
        //        DESCA: 'الملاحظات',
        //    };
        //    Print_Report_Excel("IProc_Rpt_AccountStatment " + CompCode + ",'" + DateFormat($('#FromDate').val()) + "','" + DateFormat($('#ToDate').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatment", "Report Account Statment", keyMapping)
        //}
    }
})(IncomeStatment || (IncomeStatment = {}));
//# sourceMappingURL=IncomeStatment.js.map