$(document).ready(function () {
    Balance_Sheet.InitalizeComponent();
});
var Balance_Sheet;
(function (Balance_Sheet) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var PrintPdf;
    var PrintExcel;
    var btnDelete_Filter;
    var db_Level;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var CondSupervisor = "";
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        GetAccLevels();
        Close_Loder();
    }
    Balance_Sheet.InitalizeComponent = InitalizeComponent;
    function GetAccLevels() {
        var DataRes = GetDataFromProc("select ACC_LEVEL from A_ACCOUNT Group by ACC_LEVEL", "ACC_LEVELS");
        FillDropDown(DataRes, db_Level, "ACC_LEVEL", "ACC_LEVEL", "All Levels");
    }
    function InitalizeControls() {
        PrintExcel = document.getElementById('PrintExcel');
        PrintPdf = document.getElementById('PrintPdf');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        db_Level = document.getElementById('db_Level');
    }
    function InitializeEvents() {
        PrintPdf.onclick = Print_Pdf;
        PrintExcel.onclick = Print_Excel;
        btnDelete_Filter.onclick = Clear;
    }
    function Clear() {
        $('#FiltAcc_Code').val('');
        $('#FiltToAcc_Code').val('');
        $('#Filter_Select_Account').html('Select From Account');
        $('#Filter_Select_ToAccount').html('Select To  Account');
        CleaningList_Table();
    }
    function Print_Pdf() {
        var Level = db_Level.value == "null" ? -1 : Number(db_Level.value);
        var RepParam;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + CompCode + "" },
                { Parameter: 'FromDate', Value: "" + DateFormat($('#Txt_From_Date').val()) + "" },
                { Parameter: 'Todate', Value: "" + DateFormat($('#Txt_To_Date').val()) + "" },
                { Parameter: 'Level', Value: "" + Level + "" },
            ];
        Print_Report("Rpt_Balancesheet", "IProc_Rpt_Balancesheet", RepParam);
    }
    function Print_Excel() {
        var keyMapping = {
            ACC_CODE: 'رقم الحساب',
            ACC_DESCA: ' الحساب',
            DEBIT: 'مدين',
            CREDIT: 'دائن',
            Balance: 'الرصيد',
        };
        Print_Report_Excel("IProc_Rpt_Balancesheet " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Level.value + "", "IProc_Rpt_Balancesheet", "Report Balance Sheet", keyMapping);
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
    }
})(Balance_Sheet || (Balance_Sheet = {}));
//# sourceMappingURL=Balance_Sheet.js.map