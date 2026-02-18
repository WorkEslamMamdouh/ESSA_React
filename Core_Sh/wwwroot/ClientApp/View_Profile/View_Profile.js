$(document).ready(function () {
    View_Profile.InitalizeComponent();
});
var View_Profile;
(function (View_Profile) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _ModelProfile = new GQ_USERS();
    var But_Prof_RefrashData;
    var But_Show_Detail_Salar;
    var But_Show_Detail_Covenant;
    var PrintExcel;
    var PrintPdf;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    function InitalizeComponent() {
        _ModelProfile = GetModelGlopelDataProfile();
        InitalizeControls();
        InitializeEvents();
        Display_information();
        GetData_TypeTrans();
        Display_Role_User();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        Close_Loder();
        //SetRefresh(GetModuleCode())
    }
    View_Profile.InitalizeComponent = InitalizeComponent;
    function SetRefresh(moduleCode) {
        $(document).on('click', '.Refresh_' + moduleCode, function () {
            //Dis_Refrsh();
            // Shows an alert when a dynamically created button is clicked
        });
    }
    function InitalizeControls() {
        But_Prof_RefrashData = document.getElementById('But_Prof_RefrashData');
        But_Show_Detail_Salar = document.getElementById('But_Show_Detail_Salar');
        But_Show_Detail_Covenant = document.getElementById('But_Show_Detail_Covenant');
        PrintExcel = document.getElementById('Print_Excel');
        PrintPdf = document.getElementById('Print_Pdf');
    }
    function InitializeEvents() {
        But_Prof_RefrashData.onclick = function () {
            GetData_ModelProfileAndTypeTrans(_ModelProfile.ID);
            ShowMessage(' Done Refrash 🔄️');
        };
        But_Show_Detail_Salar.onclick = But_Show_Detail_SalarOnClick;
        But_Show_Detail_Covenant.onclick = But_Show_Detail_CovenantOnClick;
        $("#_Prof_Email").on('click', function () {
            CopyToValue($('#_Prof_Email').html());
        });
        $("#_IdAccount_").on('click', function () {
            CopyToValue(_ModelProfile.ACC_CODE);
        });
        $("#_IdCustody_").on('click', function () {
            CopyToValue(_ModelProfile.Custody_Code);
        });
        $("#_IdLoan_").on('click', function () {
            CopyToValue(_ModelProfile.Loan_Code);
        });
        PrintPdf.onclick = PrintPdf_click;
        PrintExcel.onclick = PrintExcel_click;
    }
    function PrintPdf_click() {
        var RepParam;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + CompCode + "" },
                { Parameter: 'FromDate', Value: "" + DateFormat($('#Txt_From_Date').val()) + "" },
                { Parameter: 'Todate', Value: "" + DateFormat($('#Txt_To_Date').val()) + "" },
                { Parameter: 'UserID', Value: "" + _ModelProfile.USERID + "" },
            ];
        Print_Report("AccountStatment", "IProc_Rpt_AccountStatmentByUser", RepParam);
    }
    function PrintExcel_click() {
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
        Print_Report_Excel("IProc_Rpt_AccountStatmentByUser " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + _ModelProfile.USERID + "", "IProc_Rpt_AccountStatmentByUser", "Report Account Statment ( " + _ModelProfile.USER_NAME + " )", keyMapping);
    }
    function GetData_ModelProfileAndTypeTrans(ID) {
        var Table;
        Table =
            [
                { NameTable: 'GQ_USERS', Condition: " ID = " + ID + " and CompCode = " + CompCode },
                { NameTable: 'GQ_TypeTrans', Condition: " CompCode = " + CompCode + " and Is_Active = 1 and User_Type in (0," + _ModelProfile.USER_TYPE + ")" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        var listData = GetDataTable('GQ_USERS');
        var listTypeTrans = GetDataTable('GQ_TypeTrans');
        _ModelProfile = listData[0];
        SetModelGlopelDataProfile(_ModelProfile);
        Display_information();
        DisplayTypeTrans(listTypeTrans);
    }
    function GetData_TypeTrans() {
        var Table;
        Table =
            [
                { NameTable: 'GQ_TypeTrans', Condition: " CompCode = " + CompCode + " and Is_Active = 1 and User_Type in (0," + _ModelProfile.USER_TYPE + ")" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        var listTypeTrans = GetDataTable('GQ_TypeTrans');
        DisplayTypeTrans(listTypeTrans);
    }
    function Display_information() {
         ;
        $("#ID_img_Profile").attr('src', '/NewStyle/images/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg');
        if (setVal(_ModelProfile.Profile_Img).trim() != "") {
            Display_image('ID_img_Profile', 'Profile_User', _ModelProfile.Profile_Img.trim());
        }
        $("#_Prof_User_ID").html(_ModelProfile.USERID);
        $("#_Prof_Full_Name").html(_ModelProfile.USER_NAME);
        $("#_Prof_Address").html(_ModelProfile.Address);
        $("#_Prof_Email").html(_ModelProfile.Email);
        //$("#_Prof_Email").html(_ModelProfile.ACC_CODE); 
        $("#_Prof_Mobile").html(_ModelProfile.Mobile);
        $("#_Prof_ID_Number").html(_ModelProfile.IDNO);
        $("#_Prof_Gender").html(_ModelProfile.Gender == 1 ? 'Male 👨' : 'Female 👩');
        $("#_Prof_Job_Title").html(_ModelProfile.JobTitle);
        $("#_Prof_Zone_Work").html(_ModelProfile.DescZone);
        var Prg = document.getElementById('_Prof_Status');
        if (_ModelProfile.USER_ACTIVE == true) {
            Prg.innerHTML = 'Active ✅';
            Prg.style.color = '#00f300';
            Prg.style.fontWeight = 'bold';
        }
        else {
            Prg.innerHTML = 'Not Active ❌';
            Prg.style.color = 'Red';
            Prg.style.fontWeight = 'bold';
        }
        GetBalancesAndLastSalaryByUser();
    }
    function GetBalancesAndLastSalaryByUser() {
         ;
        var Qurey = " Exec ES_GetBalances " + CompCode + "," + _ModelProfile.ID + "";
        var DataRes = GetDataFromProc(Qurey, "ES_GetBalances");
        var _Balances = DataRes;
        $("#AccDebit").html(Digits(_Balances[0].AccDEBIT, 1));
        $("#AccCredit").html(Digits(_Balances[0].AccCREDIT, 1));
        $("#AccBalance").html(Digits(_Balances[0].AccBalance, 1));
        $("#CustDebit").html(Digits(_Balances[0].CustodyDEBIT, 1));
        $("#CustCredit").html(Digits(_Balances[0].CustodyCREDIT, 1));
        $("#CustBalance").html(Digits(_Balances[0].CustodyBalance, 1));
        $("#LoanDebit").html(Digits(_Balances[0].LoanDEBIT, 1));
        $("#LoanCredit").html(Digits(_Balances[0].LoanCREDIT, 1));
        $("#LoanBalance").html(Digits(_Balances[0].LoanBalance, 1));
        $("#NetDebit").html(Digits(Number((_Balances[0].LoanDEBIT + _Balances[0].CustodyDEBIT + _Balances[0].AccDEBIT).toFixed(2)), 1));
        $("#NetCredit").html(Digits(Number((_Balances[0].LoanCREDIT + _Balances[0].CustodyCREDIT + _Balances[0].AccCREDIT).toFixed(2)), 1));
        $("#NetBalance").html(Digits(Number((_Balances[0].LoanBalance + _Balances[0].CustodyBalance + _Balances[0].AccBalance).toFixed(2)), 1));
    }
    function DisplayTypeTrans(listTypeTrans) {
        listTypeTrans = listTypeTrans.sort(dynamicSortNew("Serial"));
        $("#ID_Div_Type_Trans").html('');
        for (var i = 0; i < listTypeTrans.length; i++) {
            BiuldTypeTrans(listTypeTrans[i]);
        }
    }
    function BiuldTypeTrans(_TypeTrans) {
        var html = " <div class=\"u-align-center u-container-style u-list-item u-radius-20 u-repeater-item u-shape-round u-white\" data-animation-name=\"\" data-animation-duration=\"0\" data-animation-delay=\"0\" data-animation-direction=\"\"  id=\"ID_Type".concat(_TypeTrans.IDType, "\"  style=\"background-color: ").concat(_TypeTrans.Color, ";     cursor: pointer;  border-style: outset;border-color: white;\">\n                        <div class=\"u-container-layout u-similar-container u-valign-middle u-container-layout-1\">\n                            <h3 class=\"u-text u-text-palette-2-base u-text-3\" data-animation-name=\"counter\" data-animation-event=\"scroll\" data-animation-duration=\"3000\" style=\"color: ").concat(_TypeTrans.FontColor, " !important ; font-size: 2.0rem !important ;     cursor: pointer;\" id=\"ID_Type_Font").concat(_TypeTrans.IDType, "\">").concat(_TypeTrans.TypeDesc, "</h3>\n                            <h6 class=\"u-text u-text-palette-1-base u-text-4\"> </h6>\n                        </div>\n                    </div>");
        $("#ID_Div_Type_Trans").append(html);
        $("#ID_Type".concat(_TypeTrans.IDType)).click(function () {
            //localStorage.setItem(GetParameterByName('App') + "ID", ID.toString())
            SetModelGlopel_TypeTrans(_TypeTrans);
            OpenPagePartial("TransMoney", "( " + _TypeTrans.TypeDesc + " )", function () { Display_Refrsh(); });
        });
    }
    function Display_Role_User() {
        //$(".USER" + _USER[0].USER_TYPE).removeClass('hidden_Control')
        //$(".Status" + _Inv.Status).removeClass('display_none')
        //if (_USER[0].USER_TYPE == 10) {
        //    if (_Inv.Status == 0) { //freeze
        //        $("#btn_Active").removeClass("display_none")
        //        $("#btn_freeze").addClass("display_none")
        //        $("#btn_Edit_Order").removeClass("display_none")
        //    }
        //    if (_Inv.Status == 1) { //Active
        //        $("#btn_Active").addClass("display_none")
        //        $("#btn_Edit_Order").addClass("display_none")
        //        $("#btn_freeze").removeClass("display_none")
        //    }
        //    if (_Inv.Status == 2) { //Confirm
        //        $("#btn_Active").addClass("display_none")
        //        $("#btn_freeze").removeClass("display_none")
        //        $("#btn_Edit_Order").addClass("display_none")
        //    }
        //}
        //$("#btn_Order_shipment").addClass('display_none');
        //if (_Inv.SalesmanId != 0 && _Inv.SalesmanId != null) {
        //    $("#btn_Order_shipment").removeClass('display_none');
        //}
        //if (_Inv.IsCreditVendor == false) {
        //    $("#btn_Confirm").addClass('display_none');
        //}
    }
    //******************************************************* Events Buttons ************************************
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
        GetData_ModelProfileAndTypeTrans(_ModelProfile.ID);
        //Dis_Refrsh();
    }
    function But_Show_Detail_SalarOnClick() {
        OpenPagePartial("Detail_Salary", "( DetailSalary )", function () { Display_Refrsh(); });
    }
    function But_Show_Detail_CovenantOnClick() {
        OpenPagePartial("Detail_Covenant", "( Covenant )", function () { Display_Refrsh(); });
    }
    function PrintTransaction() {
        var RepParam;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + CompCode + "" },
                { Parameter: 'ID', Value: "" + _ModelProfile.ID + "" },
            ];
        Print_Report("Detail_Salary", "ES_GetAllInformationBalByUser", RepParam);
        //****************************************Excel*********************************************
        //let keyMapping = {
        //    USERID: 'الايدي',
        //    USER_NAME: 'الاسم',
        //    Remark: 'الملاحظات',
        //    Amount: 'المبلغ'
        //};
        //Print_Report_Excel("ES_GetAllInformationBalByUser 1 ,16", "ES_GetAllInformationBalByUser","Report Test", keyMapping)
    }
})(View_Profile || (View_Profile = {}));
//# sourceMappingURL=View_Profile.js.map