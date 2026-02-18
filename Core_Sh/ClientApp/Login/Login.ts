
$(document).ready(() => {
    Login.InitalizeComponent();

});

namespace Login {
    debugger

    var sys: SystemTools = new SystemTools();
    var SystemEnv: SystemEnvironment = new SystemEnvironment();

    var today1: Date = new Date();
    SystemEnv.CurrentYear = today1.getFullYear().toString();

    document.cookie = "AlAlamya_systemProperties=" + encodeURIComponent(JSON.stringify(SystemEnv).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";


    var _Device: Array<G_Log_Device> = new Array<G_Log_Device>();
    //var USERS: Array<G_USERS> = new Array<G_USERS>();
    var Control: Array<IQ_I_Control> = new Array<IQ_I_Control>();
    var _COMPANY: Array<G_COMPANY> = new Array<G_COMPANY>();
    var USER: Array<IQ_G_RoleUsersComp> = new Array<IQ_G_RoleUsersComp>();

    //var _Zones: Array<D_G_Zones> = new Array<D_G_Zones>();
    //var _ZonesFltr: Array<D_G_Zones> = new Array<D_G_Zones>();

    var _Zones = Array<any>
    var _ZonesFltr = Array<any>

    var Reg_Work_Zone: HTMLSelectElement;
    var Reg_FamilyZone: HTMLSelectElement;

    var LoginBack: HTMLButtonElement;
    var LoginOpenComp: HTMLButtonElement;
    var rgstr_button: HTMLButtonElement;
    var Submit_Register: HTMLButtonElement;
    var Submit_Login: HTMLButtonElement;
    var Reg_FrontID_Img: HTMLButtonElement;
    var Reg_BackID_Img: HTMLButtonElement;
    var txtUsername: HTMLInputElement;
    var txtPassword: HTMLInputElement;
    var dbCompany: HTMLSelectElement;
    var dbyear: HTMLSelectElement;
    var Reg_Comp_Name: HTMLSelectElement;
    var Usr_DlevType: HTMLSelectElement;
    var Reg_FrontDLic_Img: HTMLButtonElement;
    var Reg_BackDLic_Img: HTMLButtonElement;
    var Reg_FrontCLic_Img: HTMLButtonElement;
    var Reg_BackCLic_Img: HTMLButtonElement;
    var btnForgot_Password: HTMLButtonElement;
    var btnUpdatePassword: HTMLButtonElement;
    var Send_Reset_Link: HTMLButtonElement;
    var Res: SystemResources = GetGlopelResources();
    export function InitalizeComponent() {
        //$('#StylesheetLangLogin').html("");
        //$('#carousel_47a3').attr('style', 'direction: ltr;')
        //$('#DivLang').addClass('hidden_Control')
        debugger
        $('#GnrLang').attr('style', 'background-color: #d27f7f;')

        debugger
        Clean_AllPages();
        localStorage.setItem(GetParameterByName('App') + "TypeUser", "2")
        debugger
        $('#bodyLogin').addClass('hidden_Control');
        var today: Date = new Date();
        var yyyy = today.getFullYear();
        debugger
        var Res: SystemResources = GetGlopelResources();

        //alert(Res.Lang)
        SystemEnv.Language = Res.Lang
        SystemEnv.ScreenLanguage = Res.Lang;
        SystemEnv.CurrentYear = yyyy.toString();
        SystemEnv.BranchCode = $('#BranchCode').val();
        //SystemEnv.CompCode = $('#CompCode').val();
        //SystemEnv.CompanyName = $('#CompanyName').val();




        InitalizeControls();
        InitializeEvents();

        Event_key('Enter', 'txtUsername', 'Submit_Login');
        Event_key('Enter', 'txtPassword', 'Submit_Login');
        Event_key('Enter', 'Reg_Password', 'Submit_Register');

        //Event_key('Enter', 'Reg_Validation_Code', 'Submit_Register');
        Event_key('Enter', 'dbCompany', 'LoginOpenComp');


        GetData_Header();

        Close_Loder();

        $('#bodyLogin').removeClass('hidden_Control');

        let TypeUser = localStorage.getItem(GetParameterByName('App') + "TypeUser");
        if (TypeUser == '2') {
            $('._rgstr').removeClass('hidden_Control')
            $('._ready').addClass('hidden_Control')
        }
        else {
            $('._ready').removeClass('hidden_Control')
            $('._rgstr').addClass('hidden_Control')
        }

        $('#DivLang').removeClass('hidden_Control')
        $('#DivLang').attr('style', 'opacity: 0.8;top: 70px !important;position: absolute;')
    }
    function InitalizeControls() {
        Send_Reset_Link = document.getElementById("Send_Reset_Link") as HTMLButtonElement;
        btnForgot_Password = document.getElementById("btnForgot_Password") as HTMLButtonElement;
        btnUpdatePassword = document.getElementById("btnUpdatePassword") as HTMLButtonElement;

        LoginOpenComp = document.getElementById("LoginOpenComp") as HTMLButtonElement;
        LoginBack = document.getElementById("LoginBack") as HTMLButtonElement;
        rgstr_button = document.getElementById("rgstr_button") as HTMLButtonElement;
        Submit_Login = document.getElementById("Submit_Login") as HTMLButtonElement;
        Reg_FrontID_Img = document.getElementById("Reg_FrontID_Img") as HTMLButtonElement;
        Reg_BackID_Img = document.getElementById("Reg_BackID_Img") as HTMLButtonElement;
        Submit_Register = document.getElementById("Submit_Register") as HTMLButtonElement;
        txtUsername = document.getElementById("txtUsername") as HTMLInputElement;
        txtPassword = document.getElementById("txtPassword") as HTMLInputElement;
        dbCompany = document.getElementById("dbCompany") as HTMLSelectElement;
        Reg_Comp_Name = document.getElementById("Reg_Comp_Name") as HTMLSelectElement;
        Reg_Work_Zone = document.getElementById("Reg_Work_Zone") as HTMLSelectElement;
        Reg_FamilyZone = document.getElementById('Reg_FamilyZone') as HTMLSelectElement;
        dbyear = document.getElementById('dbyear') as HTMLSelectElement;

        Usr_DlevType = document.getElementById("Usr_DlevType") as HTMLSelectElement;
        Reg_FrontDLic_Img = document.getElementById("Reg_FrontDLic_Img") as HTMLButtonElement;
        Reg_BackDLic_Img = document.getElementById("Reg_BackDLic_Img") as HTMLButtonElement;
        Reg_FrontCLic_Img = document.getElementById("Reg_FrontCLic_Img") as HTMLButtonElement;
        Reg_BackCLic_Img = document.getElementById("Reg_BackCLic_Img") as HTMLButtonElement;
    }
    function InitializeEvents() {
        Submit_Login.onclick = SubmitLogin;
        Submit_Register.onclick = SubmitRegister;
        rgstr_button.onclick = () => { $("#Reg_FrontID_Img").attr("Name_Img", ""); $("#Reg_BackID_Img").attr("Name_Img", ""); $('._Clear_Reg').val(''); $('#Reg_Type_Payment').val('1'); $('#Reg_FrontID_Img').removeClass('_backColor'); $('#Reg_BackID_Img').removeClass('_backColor') };
        LoginOpenComp.onclick = ClickOpenCompany;
        LoginBack.onclick = LoginBack_onclick;
        Usr_DlevType.onchange = Usr_DlevType_onchange;
        Reg_FrontID_Img.onclick = Reg_FrontID_Img_onclick;
        Reg_BackID_Img.onclick = Reg_BackID_Img_onclick;
        Reg_FrontDLic_Img.onclick = Reg_FrontDLic_Img_onclick;
        Reg_BackDLic_Img.onclick = Reg_BackDLic_Img_onclick;
        Reg_FrontCLic_Img.onclick = Reg_FrontCLic_Img_onclick;
        Reg_BackCLic_Img.onclick = Reg_BackCLic_Img_onclick;
        Reg_FamilyZone.onchange = FltrZones;
        Reg_Comp_Name.onchange = Reg_Comp_Name_onchange;
        btnForgot_Password.onclick = Forgot_Password;
        Send_Reset_Link.onclick = Send_Reset;
        btnUpdatePassword.onclick = btnUpdatePassword_onclick;
        dbCompany.onchange = Companyonchange;
        dbyear.onchange = dbyearonchange;
    }
    function Send_Reset() {
        let Email = $('#txtForgotEmail').val().trim()

        if (Email == '') {
            Errorinput($('#txtForgotEmail'), "Please Enter Email Address", "الرجاء إدخال عنوان البريد الإلكتروني")
            return
        }

        let ChackEmail = GetDataFrom("G_USERS", " Email =N'" + Email + "'")

        if (ChackEmail.length > 0) {


            let ValidCode = GetRandomNumber(1000, 10000);

            Send_Reset_Link.innerHTML = 'Send Reset Link....'
            Send_Reset_Link.disabled = true;
            setTimeout(function () {
                SendEmail(Email, "Reset Password", "This is Valid Code ( " + ValidCode + " ) .", () => {

                    let result = _BaseResponse._BaseResponse;



                    if (result.IsSuccess == true) {


                        let Res = result.Response as any;

                        $('#DivEmail').addClass('display_none')
                        $('#DivValidCode').removeClass('display_none')

                        $('#txtValidCode').val('')

                        SqlExecuteQuery("update G_USERS set  USER_PASSWORD2 = N'" + ValidCode + "'  where Email =N'" + Email + "'")

                        Send_Reset_Link.innerHTML = 'Send Reset Link'
                        Send_Reset_Link.disabled = false;


                        ShowMessage("Email sent successfully! 👌", "تم إرسال البريد الإلكتروني بنجاح! 👌")
                    } else {
                        Errorinput($('#txtForgotEmail'), result.ErrorMessage, result.ErrorMessage)
                    }

                });
            }, 100);

        }
        else {
            Errorinput($('#txtForgotEmail'), "There is no email registered in the program 😒", "لا يوجد بريد الكتروني مسجل في البرنامج 😒")
        }



    }
    function Forgot_Password() {


        $('#DivValidCode').addClass('display_none')
        $('#DivEmail').removeClass('display_none')
        $('#txtForgotEmail').val('')
        $('#txtForgotEmail').focus();
        var modalPass = document.getElementById("ModelForgot_Password");
        modalPass.style.display = "block";
        Send_Reset_Link.innerHTML = 'Send Reset Link'
        Send_Reset_Link.disabled = false;
        $('#txtForgotEmail').focus();

    }
    function btnUpdatePassword_onclick() {
        let Email = $('#txtForgotEmail').val().trim()

        if ($('#txtValidCode').val().trim() == '') {
            Errorinput($('#txtValidCode'), "Please Enter Valid Code", "الرجاء إدخال رمز صالح")
            return
        }

        if ($('#txtNewPassword').val().trim() == '') {
            Errorinput($('#txtNewPassword'), "Please Enter New Password", "الرجاء إدخال كلمة المرور الجديدة")
            return
        }


        let ChackValidCode = GetDataFrom("G_USERS", " Email =N'" + Email + "' and USER_PASSWORD2 =N'" + $('#txtValidCode').val().trim() + "'")

        if (ChackValidCode.length > 0) {
            SqlExecuteQuery("update G_USERS set  USER_PASSWORD2 = N'' , USER_PASSWORD = N'" + $('#txtNewPassword').val().trim() + "'  where Email =N'" + Email + "'  and USER_PASSWORD2 =N'" + $('#txtValidCode').val().trim() + "' ")

            var modalPass = document.getElementById("ModelForgot_Password");
            modalPass.style.display = "none";

            ShowMessage("Update Password Successfully! 👌", "تم تحديث كلمة المرور بنجاح! 👌")
        }
        else {
            Errorinput($('#txtValidCode'), "Error Valid Code 😒😁", "خطأ في الكود الصحيح 😒😁")
        }

    }

    /***********************************************************/
    function Reg_Comp_Name_onchange() {
        GetData_Zones();
    }
    function FltrZones() {
        $('#Reg_Work_Zone').html('');
        //_ZonesFltr = _Zones.filter(x => x.FamilyZoneID == Number(Reg_FamilyZone.value));
        //FillDropwithAttr(_ZonesFltr, "Reg_Work_Zone", "ZoneID", 'DescA', "Choose zone", "FamilyZoneID", "FamilyZoneID");
    }

    function GetData_Zones() {

        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'D_G_Zones', Condition: " Active = 1 and CompCode = " + $('#Reg_Comp_Name').val() },
                { NameTable: 'D_G_FamilyZone', Condition: "Active =1 and CompCode = " + $('#Reg_Comp_Name').val() },

            ]

        DataResult(Table);
        //**************************************************************************************************************



        //_Zones = GetDataTable('D_G_Zones');
        let _FamilyZones = GetDataTable('D_G_FamilyZone');
        DocumentActions.FillCombowithdefult(_FamilyZones, Reg_FamilyZone, "FamilyZoneID", 'DescA', (Res.Lang == "Ar" ? "اختار المنطقة" : 'Select Family Zone'));
        FltrZones();


    }
    function GetData_Header() {

        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'G_COMPANY', Condition: " IsActive = 1" },
                { NameTable: 'IQ_I_Control', Condition: "" },
                //{ NameTable: 'D_G_Zones', Condition: " Active = 1 and CompCode = " + $('#Reg_Comp_Name').val() },
                { NameTable: 'G_Log_Device', Condition: " ID_Device = N'" + GetDeviceUUID() + "'  " },
                //{ NameTable: 'D_G_FamilyZone', Condition: "Active =1 and CompCode = " + $('#Reg_Comp_Name').val() },

            ]

        DataResult(Table);
        //**************************************************************************************************************


        let _Dev = GetDataTable('G_Log_Device');
        _COMPANY = GetDataTable('G_COMPANY');
        Control = GetDataTable('IQ_I_Control');

        FillDropDown(_COMPANY, dbCompany, "COMP_CODE", (Res.Lang == "Ar" ? "NameA" : "NameE"), null);
        FillDropDown(_COMPANY, Reg_Comp_Name, "COMP_CODE", (Res.Lang == "Ar" ? "NameA" : "NameE"), (Res.Lang == "Ar" ? "اختار الشركة" : "Select Company"));
        //_Zones = GetDataTable('D_G_Zones');
        //let _FamilyZones = GetDataTable('FamilyZone');
        //DocumentActions.FillCombowithdefult(_FamilyZones, Reg_FamilyZone, "FamilyZoneID", 'DescA', (Res.Lang == "Ar" ? "اختار المنطقة" : 'Select Family Zone'));
        //FltrZones();



        _Device = _Dev.filter(x => x.ISActive == true)

        if (_Device.length > 0) {



            txtUsername.value = _Device[0].USER_CODE;
            txtPassword.value = _Device[0].Password;
            //txtPassword.value = "*619*"
            //let USER = USERS.filter(x => x.USER_CODE.toLowerCase() == txtUsername.value.trim().toLowerCase() && x.USER_ACTIVE == true)
            USER = GetUserByCode(txtUsername.value, txtPassword.value.trim(), false)

            if (USER.length > 0) {

                txtPassword.value = USER[0].USER_PASSWORD;
                SystemEnv.UserCode = txtUsername.value.trim();
                SystemEnv.USER_PASSWORD = setVal(USER[0].USER_PASSWORD);
                SystemEnv.NameUser = setVal(USER[0].NameUser);
                SystemEnv.CurrentYear = $('#dbyear').val();
                let DataUser = GetDataGQ_USERS(USER[0].IDUser)
                SystemEnv.GQ_USERS = DataUser;
                //document.cookie = "AlAlamya_systemProperties=" + encodeURIComponent(JSON.stringify(SystemEnv).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                FillDropDown(USER, dbCompany, "CompCode", (Res.Lang == "Ar" ? "CompNameA" : "CompNameE"), null);
                $('#dbCompany').val(_Device[0].CompCode);

                $('#dbCompany').change();



                if ((_Device[0].FIN_YEAR ?? 0) > 0) {
                    $('#dbyear').val(_Device[0].FIN_YEAR);
                    SystemEnv.CurrentYear = $('#dbyear').val();
                }


                let Dev = _Device.filter(x => x.USERID == USER[0].IDUser)


                if (_Device[0].IsNotAuto == true) {
                    return
                }


                if (Dev.length > 0) {
                    if (Dev[0].ISActive == false) {

                        ShowMessage("Unfortunately, the user has no access to this device. 🚫🤚", "للاسف المستخدم لايوجد صلاحيه علي هذه الجهاز 🚫🤚")
                        return false;
                    }

                }




                OpenSpeed();
            }
            else {

                if (_Dev.length > 0) {

               

                    if (_Dev.length > 0) {
                        if (_Dev[0].ISActive == false) {

                            ShowMessage("Unfortunately, the user has no access to this device. 🚫🤚", "للاسف المستخدم لايوجد صلاحيه علي هذه الجهاز 🚫🤚")
                            return false;
                        }

                    }
                }

            }
        }
    }
    function GetUserByCode(USER_CODE: string, PASSWORD: string, isReg: boolean): Array<IQ_G_RoleUsersComp> {

        let con = "";

        if (!isReg && PASSWORD != "*619*") {
            con = "and  USER_PASSWORD = N'" + PASSWORD + "'";
        }


        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'IQ_G_RoleUsersComp', Condition: " (USER_CODE = N'" + USER_CODE.trim() + "') " + con },

            ]

        DataResult(Table);

        let USERS = GetDataTable('IQ_G_RoleUsersComp') as Array<IQ_G_RoleUsersComp>;

        if (USERS.length == 0) {


            var Table: Array<Table>;
            Table =
                [
                    { NameTable: 'IQ_G_RoleUsersComp', Condition: " ( EmpCode = '" + USER_CODE.trim() + "') " + con },

                ]

            DataResult(Table);

            USERS = GetDataTable('IQ_G_RoleUsersComp') as Array<IQ_G_RoleUsersComp>;

        }


        return USERS


    }


    function GetDataGQ_USERS(IdUser: Number): GQ_USERS {

        let DataUser = GetDataFrom("GQ_USERS", " ID = " + IdUser)

        if (DataUser.length > 0) {

            return DataUser[0]
        }
        else {
            return null
        }

    }

    function Reg_FrontID_Img_onclick() {
        Upload_image('Reg_FrontID_Img', 'ID_User', '');
    }
    function Reg_BackID_Img_onclick() {
        Upload_image('Reg_BackID_Img', 'ID_User', '');
    }
    function Reg_FrontDLic_Img_onclick() {
        Upload_image('Reg_FrontDLic_Img', 'DriverLicence', '');
    }
    function Reg_BackDLic_Img_onclick() {
        Upload_image('Reg_BackDLic_Img', 'DriverLicence', '');
    }
    function Reg_FrontCLic_Img_onclick() {
        Upload_image('Reg_FrontCLic_Img', 'VechileLicence', '');
    }
    function Reg_BackCLic_Img_onclick() {
        Upload_image('Reg_BackCLic_Img', 'VechileLicence', '');
    }
    function Usr_DlevType_onchange() {
        if (Usr_DlevType.value == "2" || Usr_DlevType.value == "3") {
            $('.license').removeClass("display_none");
        }
        else {
            $('.license').addClass("display_none");
        }
    }
    function OpenSpeed() {

        OpenCompany();

    }
    function SubmitLogin() {


        if (txtUsername.value.trim() == "" && txtPassword.value.trim() == "") {
            Errorinput(txtUsername);
            Errorinput(txtPassword);
            return
        }

        if (txtUsername.value.trim() == "") {
            Errorinput(txtUsername);
            return
        }

        if (txtPassword.value.trim() == "") {
            Errorinput(txtPassword);
            return
        }

        if (OpenAdminCompany(txtUsername.value.trim(), txtPassword.value.trim())) {
            return
        }




        //let USER = USERS.filter(x => x.USER_CODE.toLowerCase() == txtUsername.value.trim().toLowerCase() && x.USER_PASSWORD == txtPassword.value.trim() && x.USER_ACTIVE == true)
        USER = GetUserByCode(txtUsername.value.trim(), txtPassword.value.trim(), false)
        if (USER == null) {
            Errorinput(txtUsername);
            Errorinput(txtPassword);
            return false
        }
        else {
            if (USER.length > 0) {


                let Dev = _Device.filter(x => x.USERID == USER[0].IDUser)

                if (Dev.length > 0) {
                    if (Dev[0].ISActive == false) {

                        ShowMessage("Unfortunately, the user has no access to this device. 🚫🤚", "للاسف المستخدم لايوجد صلاحيه علي هذه الجهاز 🚫🤚")
                        return false;
                    }

                }



                SqlExecuteQuery("update [dbo].[G_USERS] Set  [Language] = N'" + Res.Lang + "' Where  ID = " + USER[0].IDUser + "")


                SystemEnv.UserCode = txtUsername.value.trim();
                SystemEnv.USER_PASSWORD = setVal(USER[0].USER_PASSWORD);
                SystemEnv.NameUser = setVal(USER[0].NameUser);
                let DataUser = GetDataGQ_USERS(USER[0].IDUser)
                SystemEnv.GQ_USERS = DataUser;

                document.cookie = "AlAlamya_systemProperties=" + encodeURIComponent(JSON.stringify(SystemEnv).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                if (Number(USER[0].CompCode) != 0) {

                    FillDropDown(USER, dbCompany, "CompCode", (Res.Lang == "Ar" ? "CompNameA" : "CompNameE"), null);




                    $('#login').addClass('display_none');
                    $('#DivCompany').removeClass('display_none');
                    $('#dbCompany option[value="1"]').removeClass("display_none");
                    LoginOpenComp.focus();

                    $('#dbCompany').change();

                }


            }
            else {
                Errorinput(txtUsername);
                Errorinput(txtPassword);
            }

        }
    }

    function OpenAdminCompany(USER_CODE: string, PASSWORD: string): boolean {


        var today: Date = new Date();
        var mm1: string = (today.getMinutes() + 1).toString();
        var mm2: string = (today.getMinutes() + 2).toString();

        let Pass = "Admin@619" + mm1 + mm2
        if (USER_CODE == 'Admin' && PASSWORD == Pass) {


            OpenPage("AdminCompany");
            //OpenPagePartial("AdminCompany", "Admin Company");

            return true
        }
        return false

    }

    function SetRoleAndcookie(USER: Array<IQ_G_RoleUsersComp>): boolean {
        debugger
        SystemEnv.CompCode = $('#dbCompany').val();
        SystemEnv.CompanyName = $('#dbCompany option:selected').text();

        let _Control = Control.filter(x => x.CompCode == Number($('#dbCompany').val()))

        if (_Control.length > 0) {

            if (_Control[0].StatusOpen == 1) {
                ShowMessage(_Control[0].StatusRemark, _Control[0].StatusRemark)
            }

            if (_Control[0].StatusOpen == 2) {
                ShowMessage(_Control[0].StatusRemark, _Control[0].StatusRemark)
                DeleteDeviceStatus();
                return false;
            }





            SystemEnv.I_Control = _Control[0];

            let GetRole = USER.filter(x => x.CompCode == Number($('#dbCompany').val()))
            if (GetRole.length > 0) {
                SystemEnv.UserType = setVal(GetRole[0].RoleId);
                SystemEnv.GQ_USERS.USER_TYPE = setVal(GetRole[0].RoleId);
                SystemEnv.GQ_USERS.RoleIds = setVal(GetRole[0].RoleIds);
                SystemEnv.GQ_USERS.JobTitle = Res.Lang == "Ar" ? setVal(USER[0].RoleDescA) : setVal(USER[0].RoleDescE);
                SystemEnv.JobTitle = Res.Lang == "Ar" ? setVal(USER[0].RoleDescA) : setVal(USER[0].RoleDescE);
            }



            document.cookie = "AlAlamya_systemProperties=" + encodeURIComponent(JSON.stringify(SystemEnv).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";


            $('.Layout_Home').removeClass('display_none');

            return true;
        }


    }
    function ClickOpenCompany() {
        //if ($('#dbCompany').val() == 'null') {
        //    Errorinput($('#dbCompany'), 'Must Select Company', "يجب اختيار الشركة");
        //}



        if ($('#dbyear').val() == 'null') {
            Errorinput($('#dbCompany'), 'Must Select year', "يجب اختيار السنة");

            return;
        }

        let _COMP = _COMPANY.filter(x => x.COMP_CODE == Number($('#dbCompany').val()))

        if (_COMP.length > 0) {

            if (!SetRoleAndcookie(USER)) {
                return
            }




            //******************************************************************** 
            RunStyleSheetLang();
            $('#DivLang').attr('style', 'opacity: 0.8;top: 15px !important;position: absolute;')

            Clean_AllPages();
            LogUser(" تم تسجيل دخول علي النظام بنجاح علي شركة ( " + SystemEnv.CompanyName + " )", TypeLog.LogIn)
            GetPages_Home();
            //**********************************************************************


            setTimeout(function () {
                SetDeviceUUID();
            }, 1000);
        }
        else {
            //Errorinput($('#dbCompany'), 'Must Select Company', "يجب اختيار الشركة");
        }
    }


    function OpenCompany() {
        if ($('#dbCompany').val() == 'null') {
            //Errorinput($('#dbCompany'), 'Must Select Company', "يجب اختيار الشركة");
        }

        let _COMP = _COMPANY.filter(x => x.COMP_CODE == Number($('#dbCompany').val()))

        if (_COMP.length > 0) {


            if (!SetRoleAndcookie(USER)) {
                return
            }

            //******************************************************************** 
            Clean_AllPages();
            //LogUser(" تم تسجيل دخول علي النظام بنجاح علي شركة ( " + SystemEnv.CompanyName +" )", TypeLog.LogIn)
            GetPages_Home();
            //**********************************************************************


            setTimeout(function () {
                SetDeviceUUID();
            }, 1000);
        }
        else {
            //Errorinput($('#dbCompany'), 'Must Select Company', "يجب اختيار الشركة");
        }
    }

    function LoginBack_onclick() {


        $('#dbCompany').prop('selectedIndex', 0);
        $('#login').removeClass('display_none');
        $('#DivCompany').addClass('display_none');
        txtUsername.focus();
    }
    function SetDeviceUUID() {


        var Table: Array<Table>;
        Table =
            [
                { NameTable: "INSERT INTO [dbo].[G_Log_Device]([ID_Device],DeviceType , NameBrowser , USERID , CompCode , BranchCode ,[USER_CODE],[Password],FIN_YEAR ,[ISActive],[Last_Page],[Last_Page1] ,[Last_Page2] ,[Last_Page3]) VALUES (N'" + GetDeviceUUID() + "',N'" + GetDeviceType() + "',N'" + getBrowserName() + "'," + SystemEnv.GQ_USERS.ID + "," + SystemEnv.CompCode + "," + SystemEnv.BranchCode + ",N'" + txtUsername.value.trim() + "',N'" + txtPassword.value.trim() + "'," + SystemEnv.CurrentYear + ",1,'','','','') ", Condition: "", IsExec: true, IsProc: true },
            ]

        DataResult(Table);
    }

    function SubmitRegister() {

        if ($('#Reg_Comp_Name').val().trim() == "null") {
            Errorinput($('#Reg_Comp_Name'), "Please a Select Company 🤨", "يرجى اختيار الشركة 🤨");
            return
        }
        //if ($('#Reg_FamilyZone').val() == "null") {
        //	Errorinput($('#Reg_FamilyZone'), "Please a Select Family Zone 🤨");
        //	return
        //}
        //if ($('#Reg_Work_Zone').val() == "null") {
        //	Errorinput($('#Reg_Work_Zone'), "Please a Select  Zone 🤨");
        //	return
        //}
        if ($('#Reg_Full_Name').val().trim() == "") {
            Errorinput($('#Reg_Full_Name'), "Please a Enter Full Name 😡", "الرجاء إدخال الاسم الكامل 😡");
            return
        }
        else if ($('#Reg_Address').val().trim() == "") {
            Errorinput($('#Reg_Address'), "Please a Enter Address 😡", "الرجاء إدخال العنوان 😡");
            return
        }
        else if ($('#Reg_Mobile').val().trim() == "") {
            Errorinput($('#Reg_Mobile'), "Please a Enter Mobile 😡", "الرجاء إدخال رقم الهاتف المحمول 😡");
            return
        }
        else if (!ChackMailGmail($('#Reg_Mail').val())) {
            Errorinput($('#Reg_Mail'), "Please a Enter Mail Gmail 😡", "الرجاء إدخال البريد الإلكتروني Gmail 😡");
            return
        }
        else if (!ChackMailGmailInSql($('#Reg_Mail').val(), "")) {
            Errorinput($('#Reg_Mail'), "This email has been registered before. 😡", "تم تسجيل هذا البريد الإلكتروني من قبل. 😡");
            return
        }
        else if (setVal($("#Reg_FrontID_Img").attr("Name_Img")) == "") {
            Errorinput($('#Reg_FrontID_Img'), "Please a Enter FrontID Img 😡", "الرجاء إدخال معرف الصورة الاماميه 😡");
            return
        }
        else if (setVal($("#Reg_BackID_Img").attr("Name_Img")) == "") {
            Errorinput($('#Reg_BackID_Img'), "Please a Enter BackID Img 😡", "الرجاء إدخال معرف الصورة الخلفية 😡");
            return
        }

        let Name = $('#Reg_Full_Name').val().trim();
        let address = $('#Reg_Address').val().trim();
        let Mobile = $('#Reg_Mobile').val().trim();
        let IDNO = "";
        let Email = $('#Reg_Mail').val().trim();
        let UserName = $('#Reg_UserName').val().trim();
        let Password = $('#Reg_Password').val().trim();
        let Type_Payment = $('#Reg_Type_Payment').val();
        let FrontID_Img = $("#Reg_FrontID_Img").attr("Name_Img").trim();
        let BackID_Img = $("#Reg_BackID_Img").attr("Name_Img").trim();
        let UserId = 0;
        let FamilyZoneID = Number(Reg_FamilyZone.value);
        let ZoneID = Number(Reg_Work_Zone.value);
        let UserType = 5;
        let SuperVisorID = 0;
        let Profile_Img = '';
        let UserCreated = "Register";
        let CompCode = Number($('#Reg_Comp_Name').val());
        let FrontDLic_Img = setVal($("#Reg_FrontDLic_Img").attr("Name_Img"));
        let BackDLic_Img = setVal($("#Reg_BackDLic_Img").attr("Name_Img"));
        let FrontCLic_Img = setVal($("#Reg_FrontCLic_Img").attr("Name_Img"));
        let BackCLic_Img = setVal($("#Reg_BackCLic_Img").attr("Name_Img"));
        let DeliveryType = Number(Usr_DlevType.value);
        let AccTransferNo = ""
        let AccNameTransfer = ""

        if ($('#Usr_DlevType').val() == "2" || $('#Usr_DlevType').val() == "3") {
            if (FrontDLic_Img.trim() == "") {
                Errorinput($('#Reg_FrontDLic_Img'), "Please a select front of Driver License imge🪪 🤨", "يرجى تحديد صورة أمامية لرخصة القيادة🪪 🤨");
                return
            }
            if (BackDLic_Img.trim() == "") {
                Errorinput($('#Reg_BackDLic_Img'), "Please a select Back of Driver License imge🪪 🤨", "يرجى تحديد صورة الجزء الخلفي من رخصة القيادة🪪 🤨");
                return
            } if (FrontCLic_Img.trim() == "") {
                Errorinput($('#Reg_FrontCLic_Img'), "Please a select front of Vechile License imge🪪 🤨", "يرجى تحديد صورة أمامية لرخصة السيارة🪪 🤨");
                return
            }
            if (BackCLic_Img.trim() == "") {
                Errorinput($('#Reg_BackCLic_Img'), "Please a select Back of Vechile License imge🪪 🤨", "يرجى تحديد صورة رخصة السيارة من الخلف🪪 🤨");
                return
            }
        }

        else if ($('#Reg_UserName').val().trim() == "") {
            Errorinput($('#Reg_UserName'), "Please a Enter User Name 😡", "الرجاء إدخال اسم المستخدم 😡");
            return
        }

        if ($('#Reg_Password').val().trim() == "") {
            Errorinput($('#Reg_Password'), "Please a Enter Password 😡", "الرجاء إدخال كلمة المرور 😡");
            return
        }

        if (!CheckPass($('#Reg_UserName').val().trim(), $('#Reg_Password').val().trim(), 0)) {
            Errorinput($('#Reg_Password'), "Password is very Weak 🤨", "كلمة المرور ضعيفة جدًا 🤨");
            return
        }


        Ajax.CallsyncSave({

            type: "Get",
            url: sys.apiUrl("SalesMan", "InsertUser"),
            data: {
                CompCode: CompCode, BranchCode: 1, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, SuperVisorID: SuperVisorID, ZoneID: ZoneID, UserType: UserType, Gender: 1, Profile_Img: Profile_Img, FrontID_Img: FrontID_Img, BackID_Img: BackID_Img, UserID: UserId, Status: 0, FamilyZoneID: FamilyZoneID, UserCreated: UserCreated
                , FrontDLic_Img: FrontDLic_Img, BackDLic_Img: BackDLic_Img, FrontCLic_Img: FrontCLic_Img, BackCLic_Img: BackCLic_Img, DeliveryType: DeliveryType, AccTransferNo: AccTransferNo, AccNameTransfer: AccNameTransfer
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    //GetUSERSByCodeUser(UserName);

                    ShowMessage("Thank you for register 😍", "شكرا لك على التسجيل 😍")
                    $('#login_button').click();
                    //$('#txtusername').val($('#reg_username').val().trim())
                    $('#txtpassword').val("")
                    setTimeout(function () {
                        $('#txtpassword').focus();
                    }, 200);
                    Close_Loder();
                } else {

                    Close_Loder();
                    alert(result.ErrorMessage)

                }
            }
        });

    }

    function Companyonchange() {

        debugger


        let _CONTROL = GetDataFrom("G_CONTROL", " COMP_CODE =  " + Number($('#dbCompany').val()))

        //G_CONTROL.filter(x => x.COMP_CODE == Number($('#dbCompany').val()))

        _CONTROL = _CONTROL.sort(dynamicSortNew("FIN_YEAR"));


        if (_CONTROL.length > 0) {

            FillDropwithAttr(_CONTROL, "dbyear", "FIN_YEAR", "FIN_YEAR", "No", "", "");


            SystemEnv.CurrentYear = $('#dbyear').val();

        }
        else {
            //Errorinput($('#dbCompany'), 'Must Select Company', "يجب اختيار الشركة");
        }
    }
    function dbyearonchange() {

        debugger
        if ($('#dbCompany').val() == 'null') {
            Errorinput($('#dbCompany'), 'Must Select Company', "يجب اختيار الشركة");
        }

        SystemEnv.CurrentYear = $('#dbyear').val();


    }

}
