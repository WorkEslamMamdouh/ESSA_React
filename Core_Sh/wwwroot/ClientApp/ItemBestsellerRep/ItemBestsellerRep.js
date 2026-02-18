$(document).ready(() => {
    ItemBestsellerRep.InitalizeComponent();
});
var ItemBestsellerRep;
(function (ItemBestsellerRep) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res = GetGlopelResources();
    var _Category = new Array();
    var _ItemFamily = new Array();
    var BalType;
    var drpCatID;
    var drpFamilyID;
    var PrintPdf;
    var PrintExcel;
    var btnDelete_Filter;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        DisplayDataDropDown();
        Close_Loder();
    }
    ItemBestsellerRep.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        BalType = document.getElementById('BalType');
        drpCatID = document.getElementById('drpCatID');
        drpFamilyID = document.getElementById('drpFamilyID');
        PrintExcel = document.getElementById('PrintExcel');
        PrintPdf = document.getElementById('PrintPdf');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        PrintPdf.onclick = Print_Pdf;
        PrintExcel.onclick = Print_Excel;
        btnDelete_Filter.onclick = Clear;
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
        FillDropwithAttr(_Category, "drpCatID", "CatID", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "جميع الفئات" : "All Category"), "", "");
        //FillDropwithAttr(_ItemFamily, "drpFamilyID", "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "جميع انواع الاصناف" : "All Item Family"), "", "");
    }
    function drpCatID_onchange() {
        $('#drpFamilyID').html("");
        if (drpCatID.value == "null") {
            $('#drpFamilyID').append("<option value=null>" + Res.All + "</option>");
        }
        else {
            let fltr_ItemFamily = _ItemFamily.filter(x => x.CatID == Number(drpCatID.value));
            FillDropwithAttr(fltr_ItemFamily, "drpFamilyID", "ItemFamilyID", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "جميع انواع الاصناف" : "All Item Family"), "", "");
        }
    }
    function Clear() {
        BalType.value = "0";
        drpCatID.value = "null";
        drpFamilyID.value = "null";
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
    }
    function Print_Pdf() {
        var RepParam;
        RepParam =
            [
                { Parameter: 'CompCode', Value: "" + Number(CompCode) + "" },
                { Parameter: 'FromDate', Value: "" + $('#Txt_From_Date').val() + "" },
                { Parameter: 'ToDate', Value: "" + $('#Txt_To_Date').val() + "" },
                { Parameter: 'FamilyID', Value: "" + drpFamilyID.value + "" },
            ];
        if (Res.Lang == "Ar") {
            Print_Report("Rpt_ItemBestSalesAr", "IProc_Rpt_ItemBestSales", RepParam);
        }
        else {
            Print_Report("Rpt_ItemBestSalesEn", "IProc_Rpt_ItemBestSales", RepParam);
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
})(ItemBestsellerRep || (ItemBestsellerRep = {}));
//# sourceMappingURL=ItemBestsellerRep.js.map