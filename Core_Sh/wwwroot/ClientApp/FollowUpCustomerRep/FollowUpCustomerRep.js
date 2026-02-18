$(document).ready(() => {
    FollowUpCustomerRep.InitalizeComponent();
});
var FollowUpCustomerRep;
(function (FollowUpCustomerRep) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res = GetGlopelResources();
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
    FollowUpCustomerRep.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
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
                { Parameter: 'FromDate', Value: "" + DateFormat($('#FromDate').val()) + "" },
                { Parameter: 'ToDate', Value: "" + DateFormat($('#ToDate').val()) + "" },
            ];
        if (Res.Lang == "Ar") {
            Print_Report("Rpt_FollowUpCustomersAr", "IProc_Rpt_FollowUpCustomers", RepParam, "Comp" + CompCode, "");
        }
        else {
            Print_Report("Rpt_FollowUpCustomersEn", "IProc_Rpt_FollowUpCustomers", RepParam, "Comp" + CompCode, "");
        }
    }
    function Print_Excel() {
        let keyMapping = {
            TrNo: 'رقم الفاتورة',
            SaleDate: ' التاريخ',
            NAMEA: 'العميل',
            MOBILE: 'الموبايل',
            CarNo: 'رقم اللوحة',
            CarBrand: 'نوع السياره',
            JobNo: 'امر العمل',
            EngineerName: 'المهندس',
            Remarks: 'الملاحظات',
        };
        Print_Report_Excel("IProc_Rpt_FollowUpCustomers " + CompCode + ",'" + DateFormat($('#FromDate').val()) + "','" + DateFormat($('#ToDate').val()) + "'", "IProc_Rpt_FollowUpCustomers", "Report Follow up Customer" + GetDate() + "", keyMapping);
    }
})(FollowUpCustomerRep || (FollowUpCustomerRep = {}));
//# sourceMappingURL=FollowUpCustomerRep.js.map