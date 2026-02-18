$(document).ready(() => {
    Employees.InitalizeComponent();
});
var Employees;
(function (Employees) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var btnAdd;
    var SerchManager;
    var Model = new G_Employees();
    var Res = GetGlopelResources();
    var EmpCode;
    var Password;
    var Email;
    var UserLogin;
    var drpRole;
    var drpEmpType;
    var Gender;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var NameFunction = "Insert";
    var EmpID = 0;
    var Status = 0;
    var UpdateAt = "";
    var UpdatedBy = "";
    var ACC_CODE = "";
    var Custody_Code = "";
    var Loan_Code = "";
    var IsUser = false;
    var PayLoan_Cust_Code = "";
    var Glop_ManagerID = 0;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        Get_TypeEmployees();
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            let data = GetModelGlopel();
            EmpID = data.EmpID;
            Status = data.Status;
            $('#EmpID').attr('disabled', 'disabled');
            $('#EmpCode').val(data.EmpCode);
            $('#UserLogin').val(data.USER_CODE);
            $('#Password').val(data.USER_PASSWORD);
            $('#Email').val(data.Email);
            $('#EmpID').val(data.EmpID);
            $('#Emp_Name').val(data.Emp_Name);
            $('#Mobile').val(data.Mobile);
            $('#Remarks').val(data.Remarks);
            $('#Salary').val(data.SalaryAmount);
            $('#Loan').val(data.LoanAmount);
            $('#Custody').val(data.CustodyAmount);
            $('#drpIsStatus').val(data.Status);
            $('#drpEmpType').val(data.EmpType);
            $('#drpRole').val(data.EmpRole == null ? "null" : data.EmpRole);
            $('#Gender').val(data.Gender);
            ACC_CODE = data.ACC_CODE;
            Custody_Code = data.Custody_Code;
            Loan_Code = data.Loan_Code;
            PayLoan_Cust_Code = data.PayLoan_Cust_Code;
            IsUser = data.IsUser;
            Glop_ManagerID = data.ManagerID;
            if (IsUser == true) {
                UserLogin.disabled = true;
                Password.disabled = true;
                drpRole.disabled = true;
            }
            else {
                UserLogin.disabled = false;
                Password.disabled = false;
                drpRole.disabled = false;
            }
            UpdateAt = GetDate();
            UpdatedBy = "";
            NameFunction = "Update";
            localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
        }
        if (!SysSession.CurrentPrivileges.CUSTOM1) {
            drpEmpType.disabled = true;
        }
        if (!SysSession.CurrentPrivileges.CUSTOM2) {
            SerchManager.disabled = true;
            $('#SerchManager').addClass('div_disabled');
        }
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "3") { ///EditEmployeeSetting
            let dataEmp = GetModelGlopel();
            drpEmpType.value = localStorage.getItem(GetParameterByName('App') + "EmpType");
            drpEmpType.disabled = true;
            $('#SerchManager').addClass('div_disabled');
            Glop_ManagerID = dataEmp.EmpID;
        }
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "4") { ///EmployeeSetting 
            drpEmpType.value = localStorage.getItem(GetParameterByName('App') + "EmpType");
            drpEmpType.disabled = true;
            $('#SerchManager').addClass('div_disabled');
            Glop_ManagerID = 0;
        }
        GetManager(Glop_ManagerID);
        Close_Loder();
    }
    Employees.InitalizeComponent = InitalizeComponent;
    function GetManager(ManagerID) {
        let Listemp = GetDataFrom('IQ_G_Employees', ' EmpID = ' + ManagerID);
        if (Listemp.length > 0) {
            $('#SerchManager').html(Listemp[0].Emp_Name);
            $('#Glop_ManagerID').val(Listemp[0].EmpID);
        }
        else {
            $('#SerchManager').html("Manager");
            $('#Glop_ManagerID').val("0");
        }
    }
    function Get_TypeEmployees() {
        var Table;
        Table =
            [
                { NameTable: 'G_TypeEmployees', Condition: " CompCode = " + CompCode },
                { NameTable: 'G_Role', Condition: " CompCode = " + CompCode + " and IsShowable = 1 " },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        let _TypeEmployees = GetDataTable('G_TypeEmployees');
        let _Roles = GetDataTable('G_Role');
        FillDropDown(_TypeEmployees, drpEmpType, "EmpType", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "اختار" : "Select"));
        FillDropDown(_Roles, drpRole, "RoleId", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "اختار" : "Select"));
    }
    function checkDuplicatedCode() {
        let Code = Number(EmpCode.value);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Employees", 'checkDuplicatedCode'),
            data: { CompCode: CompCode, EmpCode: Code },
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    let res = result.Response;
                    if (res > 0) {
                        Errorinput($('#EmpCode'), "The Employees code is already registered for another Employees. 😁", "😁 .كود الموظف مسجل مسبقا لمندوب اخر");
                        EmpCode.value = "";
                    }
                }
                else {
                }
            }
        });
    }
    function InitalizeControls() {
        EmpCode = document.getElementById('EmpCode');
        UserLogin = document.getElementById('UserLogin');
        Password = document.getElementById('Password');
        Email = document.getElementById('Email');
        SerchManager = document.getElementById("SerchManager");
        btnAdd = document.getElementById("btnAdd");
        drpEmpType = document.getElementById("drpEmpType");
        drpRole = document.getElementById("drpRole");
        Gender = document.getElementById("Gender");
    }
    function InitializeEvents() {
        EmpCode.onchange = checkDuplicatedCode;
        UserLogin.onchange = checkDuplicatedUserLogin;
        btnAdd.onclick = Add_Employees;
        SerchManager.onclick = SearchEmployees;
        drpEmpType.onchange = () => {
            $('#SerchManager').html("Manager");
            $('#Glop_ManagerID').val(0);
            Glop_ManagerID = 0;
        };
    }
    function SearchEmployees() {
        debugger;
        let cond = Number($('#EmpID').val()) == 0 ? "" : " and EmpId != " + Number($('#EmpID').val());
        sys.FindKeyPagination("Employees", "BtnEmployees", " CompCode = " + CompCode + "  and Status = 1  " + cond, () => {
            let SelectedItem = SelectDataSearch.DataRow;
            $('#SerchManager').html(SelectedItem.Emp_Name);
            $('#Glop_ManagerID').val(SelectedItem.EmpID);
            Glop_ManagerID = SelectedItem.EmpID;
            $('.CancelSalesMan').removeClass("display_none");
        });
    }
    function Add_Employees() {
        debugger;
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒");
            return;
        }
        if ($('#Emp_Name').val().trim() == '') {
            Errorinput($('#Emp_Name'), "Please Enter name of Employee 🤨", "برجاء ادخال اسم الموظف 🤨");
            return;
        }
        if ($('#drpEmpType').val() == 'null') {
            Errorinput($('#drpEmpType'), "Please Select Employee Type 🤨", "برجاء اختيار نوع الموظف 🤨");
            return;
        }
        //if ($('#drpRole').val() == 'null') {
        //	Errorinput($('#drpRole'), "Please Select Role 🤨", "برجاء اختيار  صلاحية الموظف   🤨");
        //	return
        //}
        Model = new G_Employees();
        //Model.ManagerID = Glop_ManagerID;
        Model.ManagerID = null;
        Model.EmpID = EmpID;
        Model.EmpCode = ($('#EmpCode').val());
        Model.Emp_Name = ($('#Emp_Name').val());
        Model.User_Login = ($('#UserLogin').val());
        Model.Password_Login = ($('#Password').val());
        Model.Email = ($('#Email').val());
        Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        Model.Mobile = ($('#Mobile').val());
        Model.Remarks = ($('#Remarks').val());
        Model.SalaryAmount = Number($('#Salary').val());
        Model.LoanAmount = Number($('#Loan').val());
        Model.CustodyAmount = Number($('#Custody').val());
        Model.Status = Number($('#drpIsStatus').val());
        Model.EmpType = Number($('#drpEmpType').val());
        ;
        //Model.EmpRole = Number($('#drpRole').val());;
        Model.EmpRole = null;
        Model.Gender = Number($('#Gender').val());
        Model.CompCode = CompCode;
        Model.ACC_CODE = ACC_CODE;
        Model.Custody_Code = Custody_Code;
        Model.Loan_Code = Loan_Code;
        Model.PayLoan_Cust_Code = PayLoan_Cust_Code;
        Model.IsUser = IsUser;
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("Employees", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    $('#Div_Header :Input').val('');
                    $('#Txt_TrData').val(GetDate());
                    ShowMessage("Done 🤞😉", "تم الحفظ 🤞😉");
                    $("#Display_Back_Page").click();
                    $('#Back_Page').click();
                    Close_Loder();
                }
                else {
                    ShowMessage("Error", "يوجد خطاء في الحفظ");
                    Close_Loder();
                }
            }
        });
    }
    function checkDuplicatedUserLogin() {
        debugger;
        if (UserLogin.value.trim() != "") {
            let User = UserLogin.value.trim();
            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("Employees", 'checkDuplicatedUserLogin'),
                data: { UserLogin: User },
                success: (d) => {
                    let result = d;
                    if (result.IsSuccess == true) {
                        let res = result.Response;
                        if (res > 0) {
                            Errorinput($('#UserLogin'), "The User Name is already registered for another User. 😁", "😁 .أسم المستخدم موجود مسبقا لمستخدم اخر يرجي تغيره");
                            UserLogin.value = "";
                        }
                    }
                    else {
                    }
                }
            });
        }
    }
})(Employees || (Employees = {}));
//# sourceMappingURL=Employees.js.map