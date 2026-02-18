$(document).ready(() => {
    Rep_AccountStatment.InitalizeComponent();
});
var Rep_AccountStatment;
(function (Rep_AccountStatment) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res = GetGlopelResources();
    var RepType;
    var CustomerID;
    var btnCustomer;
    var PrintPdf;
    var PrintExcel;
    var btnDelete_Filter;
    var cat = new Array();
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        Close_Loder();
    }
    Rep_AccountStatment.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        RepType = document.getElementById('RepType');
        CustomerID = document.getElementById('CustomerID');
        btnCustomer = document.getElementById('btnCustomer');
        PrintExcel = document.getElementById('PrintExcel');
        PrintPdf = document.getElementById('PrintPdf');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        PrintPdf.onclick = Print_Pdf;
        PrintExcel.onclick = Print_Excel;
        btnDelete_Filter.onclick = Clear;
        btnCustomer.onclick = SearchCustomer;
        RepType.onchange = RepType_onchange;
    }
    function RepType_onchange() {
        CustomerID.value = "";
        let catRest;
        if (RepType.value == "1") { // Customers
            btnCustomer.value = Res.Lang == "Ar" ? "بحث العملاء" : "Search Customer";
        }
        else {
            btnCustomer.value = Res.Lang == "Ar" ? "بحث الموردين" : "Search Supplier";
        }
    }
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        RepType.value = "1";
        CustomerID.value = "";
        if (RepType.value == "1") { // Customers
            btnCustomer.value = Res.Lang == "Ar" ? "بحث العملاء" : "Search Customer";
        }
        else {
            btnCustomer.value = Res.Lang == "Ar" ? "بحث الموردين" : "Search Supplier";
        }
    }
    function SearchCustomer() {
        if (RepType.value == "1") { // Customers
            /*sys.FindKey("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1 ", () => {*/
            //sys.FindKeySpeed("Customer", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', () => {
            sys.FindKeyPagination("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
                let SelectedItem = SelectDataSearch.DataRow;
                //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
                $('#CustomerID').val(SelectedItem.CustomerId);
                $('#btnCustomer').val(SelectedItem.NAMEA);
            });
        }
        else {
            //sys.FindKey("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and Isactive = 1 ", () => {
            //sys.FindKeySpeed("Supplier", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', function () {
            sys.FindKeyPagination("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
                let SelectedItem = SelectDataSearch.DataRow;
                //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
                $('#CustomerID').val(SelectedItem.SupplierID);
                $('#btnCustomer').val(SelectedItem.SupplierName);
            });
        }
    }
    function Print_Pdf() {
        if (CustomerID.value == "0" || CustomerID.value.trim() == "") {
            Errorinput($('#btnCustomer'), RepType.value == "1" ? 'Please choose Customer' : 'Please choose Supplier', RepType.value == "1" ? 'برجاء اختيار العميل' : 'برجاء اختيار المورد');
            return;
        }
        let Customer = CustomerID.value;
        let trtype = RepType.value == "1" ? 0 : 1;
        let NameReport = "Rpt_AccStatmentCustomerAr";
        //let NameReport = RepType.value == "1" ? "Rpt_AccStatmentCustomerAr" : "Rpt_AccStatmentSuppliersAr";
        var RepParam;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + CompCode + "" },
                { Parameter: 'ID', Value: "" + Customer + "" },
                { Parameter: 'TrType', Value: "" + trtype + "" },
                { Parameter: 'FromDate', Value: "" + DateFormatSql($('#Txt_From_Date').val()) + "" },
                { Parameter: 'ToDate', Value: "" + DateFormatSql($('#Txt_To_Date').val()) + "" },
            ];
        Print_Report(NameReport, "IProc_Z_A_AccountStatment_ByCustomerOrSupplier", RepParam);
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
        //    Print_Report_Excel("IProc_Rpt_AccountStatmentSum " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatmentSum", "Report Account Statment Summary", keyMapping)
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
        //    Print_Report_Excel("IProc_Rpt_AccountStatment " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatment", "Report Account Statment", keyMapping)
        //}     
    }
})(Rep_AccountStatment || (Rep_AccountStatment = {}));
//# sourceMappingURL=Rep_AccountStatment.js.map