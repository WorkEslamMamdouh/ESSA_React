
$(document).ready(() => {
    Wallet.InitalizeComponent();

});

namespace Wallet {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();


    var But_Prof_RefrashData: HTMLButtonElement;
    var But_Show_Detail_Salar: HTMLButtonElement;
    var But_Show_Detail_Covenant: HTMLButtonElement;


    var PrintExcel: HTMLButtonElement;
    var PrintPdf: HTMLButtonElement;
    var Res: SystemResources = GetGlopelResources();

    var GloplEmpID = 0;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();

        $('#Txt_From_Date').val(DateStartYear())
        $('#Txt_To_Date').val(GetDate())

        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            let data: G_Employees = GetModelGlopel();
            GloplEmpID = data.EmpID;
            GetData_Employee(data.EmpID)
        }


        Close_Loder();


    }

    function InitalizeControls() {

        But_Prof_RefrashData = document.getElementById('But_Prof_RefrashData') as HTMLButtonElement;
        But_Show_Detail_Salar = document.getElementById('But_Show_Detail_Salar') as HTMLButtonElement;
        But_Show_Detail_Covenant = document.getElementById('But_Show_Detail_Covenant') as HTMLButtonElement;

        PrintExcel = document.getElementById('Print_Excel') as HTMLButtonElement;
        PrintPdf = document.getElementById('Print_Pdf') as HTMLButtonElement;


    }
    function InitializeEvents() {
        But_Prof_RefrashData.onclick = () => {  
            GetData_Employee(GloplEmpID)
        }
        But_Show_Detail_Salar.onclick = But_Show_Detail_SalarOnClick
        But_Show_Detail_Covenant.onclick = But_Show_Detail_CovenantOnClick

        $("#_Prof_Email").on('click', function () {

            CopyToValue($('#_Prof_Email').html())

        });


        //$("#_IdAccount_").on('click', function () {

        //    CopyToValue(_ModelProfile.ACC_CODE)

        //});
        //$("#_IdCustody_").on('click', function () {

        //    CopyToValue(_ModelProfile.Custody_Code)

        //});
        //$("#_IdLoan_").on('click', function () {

        //    CopyToValue(_ModelProfile.Loan_Code)

        //});


        PrintPdf.onclick = PrintPdf_click
        PrintExcel.onclick = PrintExcel_click
    }


    function PrintPdf_click() {


        var RepParam: Array<RepParamter>;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + CompCode + "" },
                { Parameter: 'EmpID', Value: "" + GloplEmpID + "" },
                { Parameter: 'FromDate', Value: "" + DateFormat($('#Txt_From_Date').val()) + "" },
                { Parameter: 'Todate', Value: "" + DateFormat($('#Txt_To_Date').val()) + "" },
            ]
        if (Res.Lang == "Ar") {
        Print_Report("Rpt_A_AccountStatment_EmployeeAr", "IProc_Z_A_AccountStatment_Employees", RepParam);

		} else {
            Print_Report("Rpt_A_AccountStatment_EmployeeEn", "IProc_Z_A_AccountStatment_Employees", RepParam);

		}


    }
    function PrintExcel_click() {

        let keyMapping = {
            VOUCHER_CODE: 'رقم السند',
            TrDate: 'التاريخ',
            Remarks: 'الملاحظات',
            ACC_CODE: 'رقم الحساب',
            ACC_DESCA: 'اسم الحساب',
            DEBIT: 'المدين',
            CREDIT: 'الدئن'
        };

        Print_Report_Excel("IProc_Z_A_AccountStatment_Employees " + CompCode + "," + GloplEmpID + " , '" + DateFormatSql($('#Txt_From_Date').val()) + "' ,'" + DateFormatSql($('#Txt_To_Date').val()) + "' ", "IProc_Z_A_AccountStatment_Employees", "AccountStatment_Employee", keyMapping)

    }

    function GetData_Employee(ID: number) {

        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'IQ_G_Employees', Condition: " EmpID = " + ID },
            ]

        DataResult(Table);
        //**************************************************************************************************************

        let listData = GetDataTable('IQ_G_Employees');

        if (listData.length > 0) {

            Display_information(listData[0]);
        }
    }

    function Display_information(Data: IQ_G_Employees) {

        $("#ID_img_Profile").attr('src', '/NewStyle/images/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg');

        if (setVal(Data.Profile_Img).trim() != "") {
            Display_image('ID_img_Profile', 'Profile_User', Data.Profile_Img.trim());
        }
        GloplEmpID = Data.EmpID
        $("#_Prof_User_ID").html(SetValDot(Data.EmpID));
        $("#_Prof_Full_Name").html(SetValDot(Data.Emp_Name));
        $("#_Prof_Address").html(SetValDot(Data.Address));
        $("#_Prof_Email").html(SetValDot(Data.Email));
        $("#_Prof_Mobile").html(SetValDot(Data.Mobile));
        $("#_Prof_ID_Number").html(SetValDot(Data.IDNO));
        $("#_Prof_Gender").html(Data.Gender == 0 ? 'Female 👩' : 'Male 👨');
        $("#_Prof_Job_Title").html(SetValDot(Data.Job_Title));
        $("#_Prof_Zone_Work").html(SetValDot(Data.NameZone));



        let Prg = document.getElementById('_Prof_Status')
        if (Data.Status == 1) {
            Prg.innerHTML = 'Active ✅';
            Prg.style.color = '#00f300';
            Prg.style.fontWeight = 'bold';
        }
        else {
            Prg.innerHTML = 'Not Active ❌';
            Prg.style.color = 'Red';
            Prg.style.fontWeight = 'bold';
        }


        GetBalancesAndLastSalaryByUser(Data.EmpID);

    }

    function GetBalancesAndLastSalaryByUser(EmpID: number) {

        debugger

        let Qurey = " Exec G_GetEmpBalance_Profile " + EmpID + "," + GetYear() + "";
        let _Balances: Array<G_GetEmpBalance_Profile> = GetDataFromProc(Qurey, "G_GetEmpBalance_Profile")

        if (_Balances.length > 0) {



            $("#AccDebit").html(Digits(_Balances[0].DEBIT, 1));
            $("#AccCredit").html(Digits(_Balances[0].CREDIT, 1));
            $("#AccBalance").html(Digits(_Balances[0].Balance, 1));

            $("#CustDebit").html(Digits(_Balances[1].DEBIT, 1));
            $("#CustCredit").html(Digits(_Balances[1].CREDIT, 1));
            $("#CustBalance").html(Digits(_Balances[1].Balance, 1));


            $("#LoanDebit").html(Digits(_Balances[2].DEBIT, 1));
            $("#LoanCredit").html(Digits(_Balances[2].CREDIT, 1));
            $("#LoanBalance").html(Digits(_Balances[2].Balance, 1));


            $("#NetDebit").html(Digits(_Balances[3].DEBIT, 1));
            $("#NetCredit").html(Digits(_Balances[3].CREDIT, 1));
            $("#NetBalance").html(Digits(_Balances[3].Balance, 1));




            //$("#NetDebit").html(Digits(Number((_Balances[0].LoanDEBIT + _Balances[0].CustodyDEBIT + _Balances[0].AccDEBIT).toFixed(2)), 1));
            //$("#NetCredit").html(Digits(Number((_Balances[0].LoanCREDIT + _Balances[0].CustodyCREDIT + _Balances[0].AccCREDIT).toFixed(2)), 1));
            //$("#NetBalance").html(Digits(Number((_Balances[0].LoanBalance + _Balances[0].CustodyBalance + _Balances[0].AccBalance).toFixed(2)), 1));


        }


    }
    //******************************************************* Events Buttons ************************************

    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }

        //GetData_Employee(ID)

        //Dis_Refrsh();
    }


    function But_Show_Detail_SalarOnClick() {
        OpenPagePartial("Detail_Salary", Res.Detail_Salary, () => { Display_Refrsh() });
    }
    function But_Show_Detail_CovenantOnClick() {
        OpenPagePartial("Detail_Covenant", Res.Custody, () => { Display_Refrsh() });
    }
    function PrintTransaction(EmpID: number) { 
      
        //****************************************Excel*********************************************

     
    }






}
