$(document).ready(() => {
    TechnicalReport.InitalizeComponent();
});
var TechnicalReport;
(function (TechnicalReport) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res = GetGlopelResources();
    var PrintPdf;
    var PrintExcel;
    var btnDelete_Filter;
    var btnTechID;
    var RepType;
    var TechID;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#FromDate').val(DateStartYear());
        $('#ToDate').val(GetDate());
        $('#PrintExcel').addClass("display_none");
        Close_Loder();
    }
    TechnicalReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        PrintExcel = document.getElementById('PrintExcel');
        PrintPdf = document.getElementById('PrintPdf');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        btnTechID = document.getElementById('btnTechID');
        RepType = document.getElementById('RepType');
        TechID = document.getElementById('TechID');
    }
    function InitializeEvents() {
        PrintPdf.onclick = Print_Pdf;
        PrintExcel.onclick = Print_Excel;
        btnDelete_Filter.onclick = Clear;
        btnTechID.onclick = SearchTech;
    }
    function SearchTech() {
        //sys.FindKeySpeed("Employees", " CompCode = " + CompCode + "  and Status = 1 and EmpType = 3  ", 'SearchForm', function () {
        sys.FindKeyPagination("Employees", "BtnEmployees", " CompCode = " + CompCode + "  and Status = 1   and EmpType = 3 ", () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            console.log(SelectedItem);
            $('#TechID').val(SelectedItem.EmpID);
            $('#btnTechID').val(SelectedItem.Emp_Name);
        });
    }
    function Clear() {
        $('#FromDate').val(DateStartYear());
        $('#ToDate').val(GetDate());
        $('#TechID').val(0);
        $('#btnTechID').val(Res.Lang == "ar" ? "بحث الموظفين" : "Search Employee");
    }
    function Print_Pdf() {
        let Tech = TechID.value == "" ? "null" : TechID.value;
        var RepParam;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + Number(CompCode) + "" },
                { Parameter: 'FromDate', Value: "" + DateFormat($('#FromDate').val()) + "" },
                { Parameter: 'ToDate', Value: "" + DateFormat($('#ToDate').val()) + "" },
                { Parameter: 'TechnicalID', Value: "" + Tech + "" },
            ];
        if (RepType.value == "0") {
            if (Res.Lang == "Ar") {
                Print_Report("Rpt_TecnicalSumAr", "IProc_Rpt_TecnicalSum", RepParam, "Comp" + CompCode, "");
            }
            else {
                Print_Report("Rpt_TecnicalSumEn", "IProc_Rpt_TecnicalSum", RepParam, "Comp" + CompCode, "");
            }
        }
        else {
            if (Res.Lang == "Ar") {
                Print_Report("Rpt_Tecnical_DetAr", "IProc_Rpt_Tecnical_Det", RepParam, "Comp" + CompCode, "");
            }
            else {
                Print_Report("Rpt_Tecnical_DetEn", "IProc_Rpt_Tecnical_Det", RepParam, "Comp" + CompCode, "");
            }
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
})(TechnicalReport || (TechnicalReport = {}));
//# sourceMappingURL=TechnicalReport.js.map