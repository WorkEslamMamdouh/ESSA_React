$(document).ready(function () {
    balance_sheet.InitalizeComponent();
});
var balance_sheet;
(function (balance_sheet) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var PrintPdf;
    var PrintExcel;
    var Filter_Select_Account;
    var Filter_Select_ToAccount;
    var btnDelete_Filter;
    var db_Type;
    var RepType;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var CondSupervisor = "";
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear());
        //$('#Txt_From_Date').val(GetDate())
        $('#Txt_To_Date').val(GetDate());
        //if (SysSession.CurrentEnvironment.GQ_USERS.USER_TYPE == 4) {
        //    CondSupervisor = " and ACC_CODE In (select ACC_CODE from [dbo].[G_USERS]  where [SupervisorID] = " + SysSession.CurrentEnvironment.GQ_USERS.ID + ") "
        //    //$('#Filter_Select_Account').html(SysSession.CurrentEnvironment.GQ_USERS.USER_NAME);
        //    //$('#FiltAcc_Code').val(SysSession.CurrentEnvironment.GQ_USERS.ACC_CODE);
        //    //$('#Filter_Select_ToAccount').html(SysSession.CurrentEnvironment.GQ_USERS.USER_NAME);
        //    //$('#FiltToAcc_Code').val(SysSession.CurrentEnvironment.GQ_USERS.ACC_CODE);
        //    //$('#Filter_Select_Account').attr('style', 'opacity: 1.4;pointer-events:none;')
        //    $('#Filter_Select_ToAccount').attr('style', 'opacity: 1.4;pointer-events:none;')
        //}
        Close_Loder();
    }
    balance_sheet.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        PrintExcel = document.getElementById('PrintExcel');
        PrintPdf = document.getElementById('PrintPdf');
        Filter_Select_Account = document.getElementById('Filter_Select_Account');
        Filter_Select_ToAccount = document.getElementById('Filter_Select_ToAccount');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        RepType = document.getElementById('RepType');
        db_Type = document.getElementById('db_Type');
    }
    function InitializeEvents() {
        Filter_Select_Account.onclick = SearchAcc;
        Filter_Select_ToAccount.onclick = SearchToAcc;
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
    function SearchAcc() {
        var cond = "";
        cond = "and USER_TYPE = " + Number(db_Type.value) + "";
        if (Number(db_Type.value) == 1) {
            cond = "and USER_TYPE is null ";
        }
        sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + " and DETAIL = 1 " + CondSupervisor + cond, function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#Filter_Select_Account').html(SelectedItem.ACC_DESCA);
            $('#FiltAcc_Code').val(SelectedItem.ACC_CODE);
            $('#Filter_Select_ToAccount').html(SelectedItem.ACC_DESCA);
            $('#FiltToAcc_Code').val(SelectedItem.ACC_CODE);
        });
    }
    function SearchToAcc() {
        var cond = "";
        cond = "and USER_TYPE = " + Number(db_Type.value) + "";
        if (Number(db_Type.value) == 1) {
            cond = "and USER_TYPE is null ";
        }
        sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + " and DETAIL = 1 " + CondSupervisor + cond, function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#Filter_Select_ToAccount').html(SelectedItem.ACC_DESCA);
            $('#FiltToAcc_Code').val(SelectedItem.ACC_CODE);
        });
    }
    function Print_Pdf() {
        var RepParam;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + CompCode + "" },
                { Parameter: 'FromDate', Value: "" + DateFormat($('#Txt_From_Date').val()) + "" },
                { Parameter: 'Todate', Value: "" + DateFormat($('#Txt_To_Date').val()) + "" },
                { Parameter: 'Type', Value: "" + Number(db_Type.value) + "" },
                { Parameter: 'FromAccCode', Value: "" + $('#FiltAcc_Code').val() + "" },
                { Parameter: 'ToAccCode', Value: "" + $('#FiltToAcc_Code').val() + "" },
            ];
        if (Number(RepType.value) == 1) {
            Print_Report("AccountStatmentSum", "IProc_Rpt_AccountStatmentSum", RepParam);
        }
        else {
            Print_Report("AccountStatment", "IProc_Rpt_AccountStatment", RepParam);
        }
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
            Print_Report_Excel("IProc_Rpt_AccountStatmentSum " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Type.value + ",'" + $('#FiltAcc_Code').val() + "','" + $('#FiltToAcc_Code').val() + "'", "IProc_Rpt_AccountStatmentSum", "Report Account Statment Summary", keyMapping);
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
            Print_Report_Excel("IProc_Rpt_AccountStatment " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Type.value + ",'" + $('#FiltAcc_Code').val() + "','" + $('#FiltToAcc_Code').val() + "'", "IProc_Rpt_AccountStatment", "Report Account Statment", keyMapping);
        }
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
    }
})(balance_sheet || (balance_sheet = {}));
//# sourceMappingURL=balance-sheet.js.map