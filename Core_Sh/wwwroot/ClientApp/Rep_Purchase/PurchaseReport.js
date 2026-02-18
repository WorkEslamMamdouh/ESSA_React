$(document).ready(function () {
    PurchaseReport.InitalizeComponent();
});
var PurchaseReport;
(function (PurchaseReport) {
     ;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var PrintPdf;
    var PrintExcel;
    var Filter_Select_CustomerID;
    var btnDelete_Filter;
    var db_Type;
    var RepType;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    //var CondSupervisor = "";
    function InitalizeComponent() {
         ;
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        //Close_Loder();
    }
    PurchaseReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        PrintExcel = document.getElementById('PrintExcel');
        PrintPdf = document.getElementById('PrintPdf');
        Filter_Select_CustomerID = document.getElementById('Filter_Select_CustomerID');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        RepType = document.getElementById('RepType');
        db_Type = document.getElementById('db_Type');
    }
    function InitializeEvents() {
        Filter_Select_CustomerID.onclick = SearchCustomer;
        PrintPdf.onclick = Print_Pdf;
        PrintExcel.onclick = Print_Excel;
        btnDelete_Filter.onclick = Clear;
    }
    function Clear() {
        $('#CustomerID').val('');
        $('#CustomerName').val('');
        $('#Filter_Select_CustomerID').html('Select From Customer');
        CleaningList_Table();
    }
    function SearchCustomer() {
         ;
        sys.FindKey("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1 ", function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#CustomerID').val(SelectedItem.CustomerID);
            $('#CustomerName').val(SelectedItem.NAMEA);
        });
    }
    function Print_Pdf() {
        //var RepParam: Array<RepParamter>;
        //RepParam =
        //    [
        //    { Parameter: 'comp', Value: "" + CompCode + "" },
        //    { Parameter: 'FromDate', Value: "" + DateFormat($('#Txt_From_Date').val()) + "" },
        //    { Parameter: 'Todate', Value: "" + DateFormat($('#Txt_To_Date').val()) + "" },
        //    { Parameter: 'Type', Value: "" + Number(db_Type.value) + "" },
        //    { Parameter: 'CustomerID', Value: "" + $('#CustomerID').val() + "" },
        //    { Parameter: 'CustomerName', Value: "" + $('#CustomerName').val() + "" },
        //    ]
        //if (Number(RepType.value) == 1) {
        //    Print_Report("AccountStatmentSum", "IProc_Rpt_AccountStatmentSum", RepParam);
        //} else {
        //    Print_Report("AccountStatment", "IProc_Rpt_AccountStatment", RepParam);
        //}
    }
    function Print_Excel() {
        if (Number(RepType.value) == 1) {
            var keyMapping = {
                ACC_CODE: 'رقم الحساب',
                ACC_DESCA: ' الحساب',
                DEBIT: 'مدين',
                CREDIT: 'دائن',
                Balance: 'الرصيد',
            };
            Print_Report_Excel("IProc_Rpt_AccountStatmentSum " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatmentSum", "Report Account Statment Summary", keyMapping);
        }
        else {
            var keyMapping = {
                TrNo: 'رقم الحركه',
                TypeTans: 'نوع القيد',
                VOUCHER_DATE: 'التاريخ',
                ACC_CODE: 'رقم الحساب',
                ACC_DESCA: ' الحساب',
                DEBIT: 'مدين',
                CREDIT: 'دائن',
                DESCA: 'الملاحظات',
            };
            Print_Report_Excel("IProc_Rpt_AccountStatment " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatment", "Report Account Statment", keyMapping);
        }
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
    }
})(PurchaseReport || (PurchaseReport = {}));
//# sourceMappingURL=PurchaseReport.js.map