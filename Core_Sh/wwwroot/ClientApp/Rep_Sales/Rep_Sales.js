$(document).ready(() => {
    Rep_Sales.InitalizeComponent();
});
var Rep_Sales;
(function (Rep_Sales) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res = GetGlopelResources();
    var Pay_Type;
    var CashTypeID;
    var RepType;
    var Sales_Type;
    var Inv_Status;
    var Cash_Type;
    var CustomerID;
    var CustomerName;
    var CustNameLike;
    var btnCustomer;
    var PrintPdf;
    var PrintExcel;
    var btnDelete_Filter;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        GetCashTypes();
        Close_Loder();
    }
    Rep_Sales.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Pay_Type = document.getElementById('Pay_Type');
        CashTypeID = document.getElementById('CashTypeID');
        RepType = document.getElementById('RepType');
        Sales_Type = document.getElementById('Sales_Type');
        Inv_Status = document.getElementById('Inv_Status');
        Cash_Type = document.getElementById('Cash_Type');
        CustomerID = document.getElementById('CustomerID');
        CustomerName = document.getElementById('CustomerName');
        CustNameLike = document.getElementById('CustNameLike');
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
        Cash_Type.onchange = Cash_Type_onchange;
    }
    function Cash_Type_onchange() {
        if (Cash_Type.value == '0') {
            $('#Pay_Type').removeAttr("disabled");
            $('#CashTypeID').attr("disabled", "disabled");
            CashTypeID.selectedIndex = 0;
        }
        else if (Cash_Type.value == '1') {
            $('#Pay_Type').attr("disabled", "disabled");
            Pay_Type.selectedIndex = 0;
            $('#CashTypeID').removeAttr("disabled");
        }
        else {
            $('#Pay_Type').attr("disabled", "disabled");
            $('#CashTypeID').attr("disabled", "disabled");
            Pay_Type.selectedIndex = 0;
            CashTypeID.selectedIndex = 0;
        }
    }
    function GetCashTypes() {
        let Data = GetDataFrom("D_A_CashTypes", "CompCode = " + CompCode + "");
        FillDropwithAttr(Data, "CashTypeID", "CashTypeID", "Description", (Res.Lang == "Ar" ? "جميع الانواع" : "All Types"), "", "");
    }
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        $('#Pay_Type').attr("disabled", "disabled");
        $('#CashTypeID').attr("disabled", "disabled");
        Pay_Type.selectedIndex = 0;
        CashTypeID.selectedIndex = 0;
        RepType.value = "1";
        Sales_Type.selectedIndex = 0;
        Inv_Status.value = "null";
        Cash_Type.value = "null";
        CustomerID.value = "";
        CustomerName.value = "";
        CustNameLike.value = "";
        btnCustomer.value = "Search Customer";
    }
    function SearchCustomer() {
        //sys.FindKey("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1 ", () => {
        //sys.FindKeySpeed("Customer", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', () => {   
        sys.FindKeyPagination("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;	 
            $('#CustomerID').val(SelectedItem.CustomerId);
            $('#btnCustomer').val(SelectedItem.NAMEA);
        });
    }
    function Print_Pdf() {
        let Customer = CustomerID.value == "" ? "null" : CustomerID.value;
        var RepParam;
        RepParam =
            [
                { Parameter: 'CompCode', Value: "" + CompCode + "" },
                { Parameter: 'FromDate', Value: "" + DateFormatSql($('#Txt_From_Date').val()) + "" },
                { Parameter: 'ToDate', Value: "" + DateFormatSql($('#Txt_To_Date').val()) + "" },
                { Parameter: 'Trtype', Value: "" + Sales_Type.value + "" },
                { Parameter: 'Status', Value: "" + Inv_Status.value + "" },
                { Parameter: 'CashType', Value: "" + Cash_Type.value + "" },
                { Parameter: 'PaymentType', Value: "" + Pay_Type.value + "" },
                { Parameter: 'CustomerID', Value: "" + Customer + "" },
                { Parameter: 'CustomerName', Value: "" + CustNameLike.value.trim() + "" },
                { Parameter: 'CashTypeID', Value: "" + CashTypeID.value.trim() + "" },
            ];
        if (RepType.value == "1") {
            if (Res.Lang == "Ar") {
                Print_Report("Rpt_CustomerSalesSumAr", "IProc_Rpt_CustomerSalesSum", RepParam, "Comp" + CompCode, "");
            }
            else {
                Print_Report("Rpt_CustomerSalesSumEn", "IProc_Rpt_CustomerSalesSum", RepParam, "Comp" + CompCode, "");
            }
        }
        else {
            if (Res.Lang == "Ar") {
                Print_Report("Rpt_CustomerSalesDetAr", "IProc_Rpt_CustomerSalesDet", RepParam, "Comp" + CompCode, "");
            }
            else {
                Print_Report("Rpt_CustomerSalesDetEn", "IProc_Rpt_CustomerSalesDet", RepParam, "Comp" + CompCode, "");
            }
        }
    }
    function Print_Excel() {
        debugger;
        let Customer = CustomerID.value == "" ? "null" : Number(CustomerID.value);
        let Status = Inv_Status.value == "null" ? "null" : Number(Inv_Status.value);
        let CashType = Cash_Type.value == "null" ? "null" : Number(Cash_Type.value);
        let PaymentType = Pay_Type.value == "null" ? "null" : Number(Pay_Type.value);
        let Trtype = Sales_Type.value == "" ? "null" : Number(Sales_Type.value);
        let cashTypeId = CashTypeID.value == "null" ? "null" : Number(CashTypeID.value);
        if (RepType.value == "1") {
            if (CompCode == 7) {
                let keyMapping = {
                    dlvOrder_TRNO: 'رقم الاذن',
                    dlvOrder_Date: 'تاريخ الاذن',
                    Sls_TrNo: 'رقم الفاتورة',
                    Sls_SaleDate: 'تاريخ الفاتورة',
                    Sls_CustomerName: 'العميل',
                    ItemQuantity: 'كمية الاصناف',
                    CashTyp_DescAr: 'نوع الدفع',
                    Sls_NetAmount: 'صافي الفاتورة',
                    purchaseorderDesc: 'الملاحظات',
                };
                Print_Report_Excel("IProc_Rpt_CustomerSalesSum " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "' ," + Trtype + " ," + Status + ", " + CashType + "," + PaymentType + "," + Customer + ",'" + CustNameLike.value.trim() + "'," + cashTypeId + " ", "IProc_Rpt_CustomerSalesSum", "Report Sales Summary", keyMapping);
            }
            else {
                let keyMapping = {
                    Sls_TrNo: 'رقم الفاتورة',
                    Sls_SaleDate: 'تاريخ الفاتورة',
                    Sls_CustomerName: 'العميل',
                    ItemQuantity: 'كمية الاصناف',
                    CashTyp_DescAr: 'نوع الدفع',
                    Sls_NetAmount: 'صافي الفاتورة',
                };
                Print_Report_Excel("IProc_Rpt_CustomerSalesSum " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "' ," + Trtype + " ," + Status + ", " + CashType + "," + PaymentType + "," + Customer + ",'" + CustNameLike.value.trim() + "'," + cashTypeId + " ", "IProc_Rpt_CustomerSalesSum", "Report Sales Summary", keyMapping);
            }
        }
    }
})(Rep_Sales || (Rep_Sales = {}));
//# sourceMappingURL=Rep_Sales.js.map