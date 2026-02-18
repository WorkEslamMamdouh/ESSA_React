$(document).ready(function () {
    Custody_loan.InitalizeComponent();
});
var Custody_loan;
(function (Custody_loan) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var PrintPdf;
    var PrintExcel;
    var Filter_Select_Account;
    var btnDelete_Filter;
    var db_Type;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var CondSupervisor = "";
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        Close_Loder();
    }
    Custody_loan.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        PrintExcel = document.getElementById('PrintExcel');
        PrintPdf = document.getElementById('PrintPdf');
        Filter_Select_Account = document.getElementById('Filter_Select_Account');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        db_Type = document.getElementById('db_Type');
    }
    function InitializeEvents() {
        Filter_Select_Account.onclick = SearchAcc;
        PrintPdf.onclick = Print_Pdf;
        PrintExcel.onclick = Print_Excel;
        btnDelete_Filter.onclick = Clear;
        db_Type.onchange = Clear;
    }
    function Clear() {
        $('#FiltAcc_Code').val('');
        $('#FiltToAcc_Code').val('');
        $('#Filter_Select_Account').html('Select From Account');
        $('#Filter_Select_ToAccount').html('Select To  Account');
        CleaningList_Table();
    }
    function SearchAcc() {
        var cond = "";
        if (Number(db_Type.value) == 6) {
            cond = " and PARENT_ACC = '" + SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody + "'";
        }
        if (Number(db_Type.value) == 7) {
            cond = " and PARENT_ACC = '" + SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan + "'";
        }
        sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + " and DETAIL = 1 " + CondSupervisor + cond, function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#Filter_Select_Account').html(SelectedItem.ACC_DESCA);
            $('#FiltAcc_Code').val(SelectedItem.ACC_CODE);
        });
    }
    function Print_Pdf() {
        var Type_Acc;
        var Acc;
        var Type;
        if (Number(db_Type.value) == 6) {
            Type_Acc = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody;
            Type = 1;
        }
        if (Number(db_Type.value) == 7) {
            Type_Acc = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan;
            Type = 2;
        }
        if ($('#FiltAcc_Code').val().trim() == '') {
            Acc = "Isnull";
        }
        else {
            Acc = $('#FiltAcc_Code').val();
        }
        var RepParam;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + CompCode + "" },
                { Parameter: 'Type', Value: "" + Type + "" },
                { Parameter: 'Type_Acc', Value: "" + Type_Acc + "" },
                { Parameter: 'Acc_Code', Value: "" + Acc + "" },
            ];
        Print_Report("Rpt_Custody_Loan", "IProc_Rpt_Custody_Loan", RepParam);
    }
    function Print_Excel() {
        var Type_Acc;
        var Acc;
        var Namerep;
        var keyMapping;
        if (Number(db_Type.value) == 6) {
            Type_Acc = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody;
            Namerep = "Report Custody";
            keyMapping = {
                ACC_CODE: 'رقم الحساب',
                USER_NAME: 'المستخدم',
                Balance: Number(db_Type.value) == 6 ? 'قيمة العهدة' : 'قيمة السلفة'
            };
        }
        if (Number(db_Type.value) == 7) {
            Type_Acc = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan;
            Namerep = "Report Loan";
            keyMapping = {
                ACC_CODE: 'رقم الحساب',
                USER_NAME: 'المستخدم',
                Balance: Number(db_Type.value) == 6 ? 'قيمة العهدة' : 'قيمة السلفة',
                NameSupervisor: ' اسم المشرف',
            };
        }
        if ($('#FiltAcc_Code').val().trim() == '') {
            Acc = "Isnull";
        }
        else {
            Acc = $('#FiltAcc_Code').val();
        }
        Print_Report_Excel("IProc_Rpt_Custody_Loan " + CompCode + ",1,'" + Type_Acc + "','" + Acc + "'", "IProc_Rpt_Custody_Loan", Namerep, keyMapping);
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
    }
})(Custody_loan || (Custody_loan = {}));
//# sourceMappingURL=Custody_loan.js.map