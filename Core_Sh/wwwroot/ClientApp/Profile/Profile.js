$(document).ready(() => {
    Profile.InitalizeComponent();
});
var Profile;
(function (Profile) {
    var CompCode;
    var BranchCode;
    var UserID = 0;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _USER = new GQ_USERS;
    var Submit_Update_Profile;
    var img_Profile;
    var updateMod = false;
    var Res = GetGlopelResources();
    var _Grid = new JsGrid();
    function InitalizeComponent() {
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.NameUser);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        _USER = SysSession.CurrentEnvironment.GQ_USERS;
        $('#Submit_Update_Profile').val((Res.Lang == "Ar" ? "تحديث" : "Update"));
        $('#Usr_USERID').attr('disabled', 'disabled');
        Display_User();
        updateMod = true;
        Event_key('Enter', 'Usr_Password', 'Submit_Update_Profile');
        Close_Loder();
    }
    Profile.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile");
        img_Profile = document.getElementById("img_Profile");
    }
    function InitializeEvents() {
        Submit_Update_Profile.onclick = SubmitUpdate;
        img_Profile.onclick = img_Profile_onclick;
    }
    function img_Profile_onclick() {
        Upload_image('img_Profile', 'Profile_User', "");
    }
    function Display_User() {
        updateMod = true;
        UserID = _USER.ID;
        $('#Usr_USERID').val(_USER.ID);
        $('#Usr_EmpCode').val(_USER.EmpCode);
        $('#Usr_Full_Name').val(_USER.USER_NAME);
        $('#Reg_Mail').val(_USER.Email);
        $('#Usr_UserCode').val(_USER.USER_CODE);
        $('#Usr_Password').val(_USER.USER_PASSWORD);
        if (setVal(_USER.Profile_Img).trim() != "") {
            Display_image('img_Profile', 'Profile_User', _USER.Profile_Img.trim());
        }
        Display_Grid_Settings_Device(UserID);
    }
    function InitializeGrid() {
        _Grid.ElementName = "Grid_Settings_Device";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "ID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "ID", name: "ID", visible: false, width: "100px" },
            { title: Res.Lang == "Ar" ? "     م " : "Ser", name: "ID", type: "number", width: "50px" },
            { title: Res.Lang == "Ar" ? " شركه " : "Comp", name: "CompCode", type: "number", width: "50px" },
            { title: Res.Lang == "Ar" ? "  نوع الجهاز " : "Device Type", name: "DeviceType", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "المتصفح " : "Name Browser", name: "NameBrowser", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "اخر تسجيل " : "Last login", name: "LastDateUpdate", type: "text", width: "100px" },
            {
                title: Res.Lang == "Ar" ? "عدم دخول تلقائي " : "  Not Auto Open",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.ID;
                    txt.className = "checkbox";
                    txt.checked = item.IsNotAuto;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    txt.onclick = (e) => {
                        SqlExecuteQuery("Update G_Log_Device set IsNotAuto = " + (txt.checked == true ? 1 : 0) + " where ID_Device = N'" + item.ID_Device + "'");
                        ShowMessage("    Updated 👍", "تم تحديث   👍");
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "نشط" : "Active",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.ID;
                    txt.className = "checkbox";
                    txt.checked = item.ISActive;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    txt.onclick = (e) => {
                        SqlExecuteQuery("Update G_Log_Device set ISActive = " + (txt.checked == true ? 1 : 0) + " where ID_Device = N'" + item.ID_Device + "'");
                        ShowMessage("    Updated 👍", "تم تحديث   👍");
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function Display_Grid_Settings_Device(USERID) {
        debugger;
        let res = GetDataFrom("IQ_G_Log_Device", " USERID = " + USERID);
        debugger;
        for (var i = 0; i < res.length; i++) {
            res[i].ID = i + 1;
        }
        _Grid.DataSource = res;
        _Grid.Bind();
    }
    function SubmitUpdate() {
        let Profile_Img = setVal($("#img_Profile").attr("Name_Img"));
        if (Profile_Img.trim() == "") {
            Errorinput($('#img_Profile'), "Please a Enter profile Picture 😡", "الرجاء إدخال صورة الملف الشخصي 😡");
            return;
        }
        if ($('#Usr_Full_Name').val().trim() == "") {
            Errorinput($('#Usr_Full_Name'), "Please a Enter Name 😡", "الرجاء إدخال الاسم 😡");
            return;
        }
        if (!ChackMailGmail($('#Reg_Mail').val())) {
            Errorinput($('#Reg_Mail'), "Please a Enter Mail Gmail 😡", "الرجاء إدخال البريد الإلكتروني Gmail 😡");
            return;
        }
        if (!ChackMailGmailInSql($('#Reg_Mail').val(), _USER.Email)) {
            Errorinput($('#Reg_Mail'), "This email has been registered before. 😡", "تم تسجيل هذا البريد الإلكتروني من قبل. 😡");
            return;
        }
        if (!CheckPass($('#Usr_UserCode').val().trim(), $('#Usr_Password').val().trim(), Number($('#Usr_EmpCode').val()))) {
            Errorinput($('#Usr_Password'), "Password is very Weak 🤨", "كلمة المرور ضعيفة جدًا 🤨");
            return;
        }
        let email = $('#Reg_Mail').val();
        let UserName = $('#Usr_UserCode').val();
        let Password = $('#Usr_Password').val();
        if ($('#Usr_UserCode').val().trim() == "") {
            Errorinput($('#Usr_UserCode'), "Please a Enter User Name 🤨", "الرجاء إدخال اسم المستخدم 🤨");
            return;
        }
        if ($('#Usr_Password').val().trim() == "") {
            Errorinput($('#Usr_Password'), "Please a Enter User Password 🤨", "الرجاء إدخال كلمة مرور المستخدم 🤨");
            return;
        }
        Show_Loder();
        setTimeout(function () {
            SqlExecuteQuery("update G_USERS set Email = N'" + email + "' , Profile_Img = N'" + Profile_Img + "' ,USER_CODE = N'" + UserName + "', USER_PASSWORD = N'" + Password + "' ,UpdatedBy =N'" + SysSession.CurrentEnvironment.NameUser + "' where ID = " + UserID + "");
            SqlExecuteQuery("delete  [G_Log_Device] where USERID = " + $('#Usr_USERID').val() + " ; INSERT INTO [dbo].[G_Log_Device]([ID_Device],USERID , CompCode , BranchCode ,[USER_CODE],[Password] ,[ISActive],[Last_Page],[Last_Page1] ,[Last_Page2] ,[Last_Page3]) VALUES (N'" + GetDeviceUUID() + "'," + $('#Usr_USERID').val() + "," + CompCode + "," + BranchCode + ",N'" + UserName + "',N'" + Password + "',1,'','','','') ");
            SysSession.CurrentEnvironment.UserCode = UserName;
            SysSession.CurrentEnvironment.GQ_USERS.Email = email;
            //SysSession.CurrentEnvironment.GQ_USERS.Mobile = Mobile;
            //SysSession.CurrentEnvironment.GQ_USERS.Gender = Gender;
            SysSession.CurrentEnvironment.GQ_USERS.USER_CODE = UserName;
            SysSession.CurrentEnvironment.GQ_USERS.USER_PASSWORD = Password;
            SysSession.CurrentEnvironment.GQ_USERS.Profile_Img = Profile_Img;
            ShowMessage("Data profile Updated 👍", "تم تحديث ملف البيانات 👍");
            document.cookie = "AlAlamya_systemProperties=" + encodeURIComponent(JSON.stringify(SysSession.CurrentEnvironment).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
            SetModelGlopelDataProfile(SysSession.CurrentEnvironment.GQ_USERS);
            $('#Back_Page').click();
            Close_Loder();
        }, 50);
    }
})(Profile || (Profile = {}));
//# sourceMappingURL=Profile.js.map