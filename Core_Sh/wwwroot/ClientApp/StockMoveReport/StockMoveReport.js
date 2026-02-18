$(document).ready(() => {
    StockMoveReport.InitalizeComponent();
});
var StockMoveReport;
(function (StockMoveReport) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res = GetGlopelResources();
    var _Category = new Array();
    var _ItemFamily = new Array();
    var drpCatID;
    var drpFamilyID;
    var drpType;
    var FromDate;
    var ToDate;
    var ItemID;
    var IncludeOpeningBalance;
    var btnItem;
    var PrintPdf;
    var PrintExcel;
    var btnDelete_Filter;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#FromDate').val(DateStartYear());
        $('#ToDate').val(GetDate());
        DisplayDataDropDown();
        Close_Loder();
    }
    StockMoveReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        IncludeOpeningBalance = document.getElementById('IncludeOpeningBalance');
        FromDate = document.getElementById('FromDate');
        ToDate = document.getElementById('ToDate');
        drpCatID = document.getElementById('drpCatID');
        drpFamilyID = document.getElementById('drpFamilyID');
        drpType = document.getElementById('drpType');
        ItemID = document.getElementById('ItemID');
        btnItem = document.getElementById('btnItem');
        PrintExcel = document.getElementById('PrintExcel');
        PrintPdf = document.getElementById('PrintPdf');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        PrintPdf.onclick = Print_Pdf;
        PrintExcel.onclick = Print_Excel;
        btnDelete_Filter.onclick = Clear;
        btnItem.onclick = SearchItem;
        drpCatID.onchange = drpCatID_onchange;
    }
    function DisplayDataDropDown() {
        var Table;
        Table =
            [
                { NameTable: 'D_I_Category', Condition: " CompCode = " + CompCode + " and Type_Show = 0" },
                { NameTable: 'D_I_ItemFamily', Condition: " CompCode = " + CompCode },
            ];
        DataResult(Table);
        //************************************************************************************************************** 
        _Category = GetDataTable('D_I_Category');
        _ItemFamily = GetDataTable('D_I_ItemFamily');
        debugger;
        FillDropwithAttr(_Category, "drpCatID", "CatID", (Res.Lang == "Ar" ? "DescA" : "DescA"), (Res.Lang == "Ar" ? "جميع الفئات" : "All Category"), "", "");
        //FillDropwithAttr(_ItemFamily, "drpFamilyID", "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "جميع انواع الاصناف" : "All Item Family"), "", "");
    }
    function drpCatID_onchange() {
        $('#drpFamilyID').html("");
        if (drpCatID.value == "null") {
            $('#drpFamilyID').append("<option value=null>" + Res.All + "</option>");
        }
        else {
            let fltr_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(drpCatID.value));
            FillDropwithAttr(fltr_ItemFamily, "drpFamilyID", "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescA"), (Res.Lang == "Ar" ? "جميع انواع الاصناف" : "All Item Family"), "", "");
        }
    }
    function Clear() {
        $('#FromDate').val(DateStartYear());
        $('#ToDate').val(GetDate());
        drpCatID.value = "null";
        drpFamilyID.value = "null";
        ItemID.value = "";
        btnItem.value = Res.Lang == "Ar" ? "بحث صنف" : "Search Item";
    }
    function SearchItem() {
        let cond = "";
        if (drpCatID.value != "null") {
            cond = " and CatID = " + drpCatID.value + "";
        }
        if (drpFamilyID.value != "null") {
            cond += " and ItemFamilyID = " + drpFamilyID.value + "";
        }
        //sys.FindKey("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1 ", () => {
        //sys.FindKeySpeed("Items", " CompCode = " + CompCode + "  and ISActive = true " + cond, 'SearchForm', () => {
        sys.FindKeyPagination("Items", "btnItems", " CompCode = " + CompCode + "  and ISActive = 1  " + cond, () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            ItemID.value = SelectedItem.ItemID.toString();
            btnItem.value = SelectedItem.ItemName;
        });
    }
    function Print_Pdf() {
        let Item = ItemID.value == "" ? "null" : ItemID.value;
        if (drpType.value == "2") {
            var RepParam;
            RepParam =
                [
                    { Parameter: 'CompCode', Value: "" + Number(CompCode) + "" },
                    { Parameter: 'FamilyID', Value: "" + drpFamilyID.value + "" },
                    { Parameter: 'ItemID', Value: "" + Item + "" },
                    { Parameter: 'FromDate', Value: "" + DateFormat(FromDate.value) + "" },
                    { Parameter: 'ToDate', Value: "" + DateFormat(ToDate.value) + "" },
                ];
            if (Res.Lang == "Ar") {
                Print_Report("Rpt_StockItemMovementAr", "IProc_Rpt_StockItemMovement", RepParam);
            }
            else {
                Print_Report("Rpt_StockItemMovementEn", "IProc_Rpt_StockItemMovement", RepParam);
            }
        }
        else if (drpType.value == "1") {
            var RepParam;
            RepParam =
                [
                    { Parameter: 'CompCode', Value: "" + Number(CompCode) + "" },
                    { Parameter: 'FamilyID', Value: "" + drpFamilyID.value + "" },
                    { Parameter: 'ItemID', Value: "" + Item + "" },
                    { Parameter: 'IsService', Value: "null" },
                    { Parameter: 'FromDate', Value: "" + DateFormat(FromDate.value) + "" },
                    { Parameter: 'ToDate', Value: "" + DateFormat(ToDate.value) + "" },
                ];
            if (Res.Lang == "Ar") {
                Print_Report("Rpt_StockItemMovementDetAr", "IProc_Rpt_StockItemMovementDet", RepParam);
            }
            else {
                Print_Report("Rpt_StockItemMovementDetEn", "IProc_Rpt_StockItemMovementDet", RepParam);
            }
        }
        else {
            let IncludeOpenBalance = IncludeOpeningBalance.checked == false ? 0 : 1;
            var RepParam;
            RepParam =
                [
                    { Parameter: 'CompCode', Value: "" + Number(CompCode) + "" },
                    { Parameter: 'FamilyID', Value: "" + drpFamilyID.value + "" },
                    { Parameter: 'ItemID', Value: "" + Item + "" },
                    { Parameter: 'IsService', Value: "0" },
                    { Parameter: 'FromDate', Value: "" + DateFormat(FromDate.value) + "" },
                    { Parameter: 'ToDate', Value: "" + DateFormat(ToDate.value) + "" },
                    { Parameter: 'IsNotZero', Value: "0" },
                    { Parameter: 'OpenBalance', Value: "" + IncludeOpenBalance + "" },
                ];
            if (Res.Lang == "Ar") {
                Print_Report("Rpt_StockItemMovementSumAr", "IProc_Rpt_StockItemMovementSum", RepParam);
            }
            else {
                Print_Report("Rpt_StockItemMovementSumEn", "IProc_Rpt_StockItemMovementSum", RepParam);
            }
        }
    }
    function Print_Excel() {
        let IncludeOpenBalance = IncludeOpeningBalance.checked == false ? 0 : 1;
        debugger;
        let Item = ItemID.value == "" ? "null" : ItemID.value;
        if (drpType.value == "2") {
            let keyMapping = {
                ItemCode: 'كود الصنف',
                itemname: ' الوصف',
                PurchaseCost: 'تكلفة المشتريات',
                salesCost: 'تكلفة المبيعات',
                SalesPrice: 'اجمالي المبيعات',
            };
            Print_Report_Excel("IProc_Rpt_StockItemMovement " + CompCode + "," + drpFamilyID.value + "," + Item + " ,'" + DateFormat($('#FromDate').val()) + "','" + DateFormat($('#ToDate').val()) + "'", "IProc_Rpt_StockItemMovement", "Report Stock Cost", keyMapping);
        }
        else if (drpType.value == "1") {
            alert("detail");
            //IProc_Rpt_StockItemMovementDet
            let keyMapping = {
                ItemName: ' الوصف',
                TypeTrans: ' نوع الحركة',
                TrNo: 'رقم الحركة',
                TrDate: 'تاريخ الحركة',
                InQty: 'الكمية الواردة',
                OutQty: 'االكمية المنصرفة',
            };
            Print_Report_Excel("IProc_Rpt_StockItemMovementDet " + CompCode + "," + drpFamilyID.value + "," + Item + ", null ,'" + DateFormat($('#FromDate').val()) + "','" + DateFormat($('#ToDate').val()) + "'", "IProc_Rpt_StockItemMovementDet", "Report Stock Movment Detail", keyMapping);
        }
        else {
            //IProc_Rpt_StockItemMovementSum
            let keyMapping = {
                ItemName: ' الوصف',
                InQty: 'الكمية الواردة',
                OutQty: 'االكمية المنصرفة',
                DefQty: 'االكمية الحاليه',
            };
            Print_Report_Excel("IProc_Rpt_StockItemMovementSum " + CompCode + "," + drpFamilyID.value + "," + Item + ", 0 ,  '" + DateFormat($('#FromDate').val()) + "','" + DateFormat($('#ToDate').val()) + "', 0 , " + IncludeOpenBalance + " ", "IProc_Rpt_StockItemMovementSum", "Report Stock Movment Summary", keyMapping);
        }
    }
})(StockMoveReport || (StockMoveReport = {}));
//# sourceMappingURL=StockMoveReport.js.map