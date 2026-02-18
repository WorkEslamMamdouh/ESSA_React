$(document).ready(() => {
    UserDef.InitalizeComponent();
});
var UserDef;
(function (UserDef) {
    var CompCode;
    var BranchCode;
    var UserID = 0;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _USER = new GQ_USERS;
    //var _SuperUsers: Array<GQ_USERS> = new Array<GQ_USERS>();
    //var _SuperUsersFltr: Array<GQ_USERS> = new Array<GQ_USERS>();
    var _G_Code = new Array();
    var _G_Role = new Array();
    //var _Zones: Array<Zones> = new Array<Zones>();
    //var _ZonesFltr: Array<Zones> = new Array<Zones>();
    // var Usr_Zone: HTMLSelectElement;
    //var FamilyZone: HTMLSelectElement;
    var Submit_Update_Profile;
    //var Usr_SuperVisor: HTMLSelectElement;
    var Usr_UserType;
    var Usr_G_Role;
    //var Usr_DlevType: HTMLSelectElement;
    var img_Profile;
    var Reg_FrontID_Img;
    var Reg_BackID_Img;
    var Res = GetGlopelResources();
    var updateMod = false;
    function InitalizeComponent() {
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.NameUser);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControls();
        InitializeEvents();
        $('#Submit_Update_Profile').val('Add');
        $('#Usr_UserCode').removeAttr('disabled');
        Display_Data();
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "UserControl") {
            _USER = GetModelGlopelDataProfile();
            $('#Submit_Update_Profile').val('Update');
            $('#Usr_UserCode').attr('disabled', 'disabled');
            $('#Usr_USERID').attr('disabled', 'disabled');
            Display_User();
            updateMod = true;
        }
        Close_Loder();
    }
    UserDef.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile");
        img_Profile = document.getElementById("img_Profile");
        Usr_UserType = document.getElementById("Usr_UserType");
        Usr_G_Role = document.getElementById("Usr_G_Role");
        Usr_G_Role = document.getElementById("Usr_G_Role");
        //Usr_Zone = document.getElementById('Usr_Zone') as HTMLSelectElement;
        //Usr_SuperVisor = document.getElementById('Usr_SuperVisor') as HTMLSelectElement;
        //Usr_DlevType = document.getElementById('Usr_DlevType') as HTMLSelectElement;
        //FamilyZone = document.getElementById('FamilyZone') as HTMLSelectElement;
        Reg_FrontID_Img = document.getElementById("Reg_FrontID_Img");
        Reg_BackID_Img = document.getElementById("Reg_BackID_Img");
        //Reg_FrontDLic_Img = document.getElementById("Reg_FrontDLic_Img") as HTMLButtonElement;
        //Reg_BackDLic_Img = document.getElementById("Reg_BackDLic_Img") as HTMLButtonElement;
        //Reg_FrontCLic_Img = document.getElementById("Reg_FrontCLic_Img") as HTMLButtonElement;
        //Reg_BackCLic_Img = document.getElementById("Reg_BackCLic_Img") as HTMLButtonElement;
    }
    function InitializeEvents() {
        Submit_Update_Profile.onclick = SubmitUpdate;
        Usr_UserType.onchange = UserType_Change;
        Usr_G_Role.onchange = Usr_G_Role_Change;
        //FamilyZone.onchange = FltrZones;
        img_Profile.onclick = img_Profile_onclick;
        //Usr_DlevType.onchange = Usr_DlevType_onchange;
        Reg_FrontID_Img.onclick = Reg_FrontID_Img_onclick;
        Reg_BackID_Img.onclick = Reg_BackID_Img_onclick;
        //Reg_FrontDLic_Img.onclick = Reg_FrontDLic_Img_onclick;
        //Reg_BackDLic_Img.onclick = Reg_BackDLic_Img_onclick;
        //Reg_BackCLic_Img.onclick = Reg_BackCLic_Img_onclick;
        //Reg_FrontCLic_Img.onclick = Reg_FrontCLic_Img_onclick;
    }
    function Reg_FrontID_Img_onclick() {
        //if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "UserControl") {
        //	if (_USER.FrontID_Img == null) {
        //		Upload_image('Reg_FrontID_Img', 'ID_User', "");
        //	}
        //	else {
        //		if (_USER.FrontID_Img.trim() == "") {
        //			Upload_image('Reg_FrontID_Img', 'ID_User', "");
        //		}
        //		else {
        //			let UrlImg = GetUrlImg('ID_User', setVal(_USER.FrontID_Img))
        //			OpenImg(UrlImg);
        //		}
        //	}
        //}
        //else {
        //	Upload_image('Reg_FrontID_Img', 'ID_User', "");
        //}
    }
    function Reg_BackID_Img_onclick() {
        //if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "UserControl") {
        //	if (_USER.BackID_Img == null) {
        //		Upload_image('Reg_BackID_Img', 'ID_User', "");
        //	}
        //	else {
        //		if (_USER.BackID_Img.trim() == "") {
        //			Upload_image('Reg_BackID_Img', 'ID_User', "");
        //		}
        //		else {
        //			let UrlImg = GetUrlImg('ID_User', setVal(_USER.BackID_Img))
        //			OpenImg(UrlImg);
        //		}
        //	}
        //}
        //else {
        //	Upload_image('Reg_BackID_Img', 'ID_User', "");
        //}
    }
    //function Reg_FrontDLic_Img_onclick() {
    //    if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "UserControl") {
    //        if (_USER.FrontDrivLicense_Img == null) {
    //            Upload_image('Reg_FrontDLic_Img', 'DriverLicence', "");
    //        }
    //        else {
    //            if (_USER.FrontDrivLicense_Img.trim() == "") {
    //                Upload_image('Reg_FrontDLic_Img', 'DriverLicence', "");
    //            }
    //            else {
    //                let UrlImg = GetUrlImg('DriverLicence', setVal(_USER.FrontDrivLicense_Img))
    //                OpenImg(UrlImg);
    //            }
    //        }
    //    }
    //    else {
    //        Upload_image('Reg_FrontDLic_Img', 'VechileLicence', "");
    //    }
    //}
    //function Reg_BackDLic_Img_onclick() {
    //    if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "UserControl") {
    //        if (_USER.BackDrivLicense_Img == null) {
    //            Upload_image('Reg_BackDLic_Img', 'VechileLicence', "");
    //        }
    //        else {
    //            if (_USER.BackDrivLicense_Img.trim() == "") {
    //                Upload_image('Reg_BackDLic_Img', 'VechileLicence', "");
    //            }
    //            else {
    //                let UrlImg = GetUrlImg('VechileLicence', setVal(_USER.BackDrivLicense_Img))
    //                OpenImg(UrlImg);
    //            }
    //        }
    //    }
    //    else {
    //        Upload_image('Reg_BackDLic_Img', 'VechileLicence', "");
    //    }
    //}
    //function Reg_FrontCLic_Img_onclick() {
    //    if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "UserControl") {
    //        if (_USER.FrontDrivLicense_Img == null) {
    //            Upload_image('Reg_FrontCLic_Img', 'VechileLicence', "");
    //        }
    //        else {
    //            if (_USER.FrontVicLicense_Img.trim() == "") {
    //                Upload_image('Reg_FrontCLic_Img', 'VechileLicence', "");
    //            }
    //            else {
    //                let UrlImg = GetUrlImg('VechileLicence', setVal(_USER.FrontVicLicense_Img))
    //                OpenImg(UrlImg);
    //            }
    //        }
    //    }
    //    else {
    //        Upload_image('Reg_FrontCLic_Img', 'VechileLicence', "");
    //    }
    //}
    //function Reg_BackCLic_Img_onclick() {
    //    if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "UserControl") {
    //        if (_USER.BackVicLicense_Img == null) {
    //            Upload_image('Reg_BackCLic_Img', 'VechileLicence', "");
    //        }
    //        else {
    //            if (_USER.BackVicLicense_Img.trim() == "") {
    //                Upload_image('Reg_BackCLic_Img', 'VechileLicence', "");
    //            }
    //            else {
    //                let UrlImg = GetUrlImg('VechileLicence', setVal(_USER.BackVicLicense_Img))
    //                OpenImg(UrlImg);
    //            }
    //        }
    //    }
    //    else {
    //        Upload_image('Reg_BackCLic_Img', 'VechileLicence', "");
    //    }
    //}
    function img_Profile_onclick() {
        Upload_image('img_Profile', 'Profile_User', "");
    }
    function Display_User() {
        updateMod = true;
        UserID = _USER.ID;
        $('#Usr_USERID').val(_USER.EmpCode);
        $('#Usr_Full_Name').val(_USER.USER_NAME);
        //$('#Usr_Address').val(_USER.Address);
        //$('#Usr_Mobile').val(_USER.Mobile);
        $('#Usr_Mail').val(_USER.Email);
        //$('#Usr_AccTransferNo').val(_USER.AccTransferNo);
        //$('#Usr_AccNameTransfer').val(_USER.AccNameTransfer);
        $('#Usr_UserCode').val(_USER.USER_CODE);
        $('#Usr_UserType').val(_USER.USER_TYPE);
        $('#Usr_Password').val(_USER.USER_PASSWORD);
        //$('#Usr_ID_Num').val(_USER.IDNO);
        //$('#Usr_Gender').val(_USER.Gender);
        //$('#FamilyZone').val(_USER.FamilyZoneID);
        $('#Usr_UserType').val(_USER.USER_TYPE);
        //$('#Usr_DlevType').val(_USER.DeliveryType);
        //Usr_DlevType_onchange();
        //FltrZones();
        UserType_Change();
        //$('#Usr_SuperVisor').val(_USER.SupervisorID);
        //$('#Usr_Zone').val(_USER.ZoneID);
        if (setVal(_USER.Profile_Img).trim() != "") {
            Display_image('img_Profile', 'Profile_User', _USER.Profile_Img.trim());
        }
        //if (setVal(_USER.FrontID_Img).trim() != "") {
        //	Display_image('Reg_FrontID_Img', 'ID_User', _USER.FrontID_Img.trim());
        //}
        //if (setVal(_USER.BackID_Img).trim() != "") {
        //	Display_image('Reg_BackID_Img', 'ID_User', _USER.BackID_Img.trim());
        //}
        //if (setVal(_USER.FrontDrivLicense_Img).trim() != "") {
        //    Display_image('Reg_FrontDLic_Img', 'DriverLicence', _USER.FrontDrivLicense_Img.trim());
        //}
        //if (setVal(_USER.BackDrivLicense_Img).trim() != "") {
        //    Display_image('Reg_BackDLic_Img', 'DriverLicence', _USER.BackDrivLicense_Img.trim());
        //}
        //if (setVal(_USER.FrontVicLicense_Img).trim() != "") {
        //    Display_image('Reg_FrontCLic_Img', 'VechileLicence', _USER.FrontVicLicense_Img.trim());
        //}
        //if (setVal(_USER.BackVicLicense_Img).trim() != "") {
        //    Display_image('Reg_BackCLic_Img', 'VechileLicence', _USER.BackVicLicense_Img.trim());
        //}
    }
    function Display_Data() {
        debugger;
        $('#DivContainer :input').val("");
        $('#Usr_Gender').val("1");
        $('#Submit_Update_Profile').val("Add");
        var Table;
        Table =
            [
                { NameTable: 'G_Codes', Condition: "CodeType= 'EmpType' and CodeValue not in (1,10)" },
                { NameTable: 'G_Role', Condition: "IsAvailable = 1 " },
                //{ NameTable: 'GQ_USERS', Condition: "USER_TYPE =4 and CompCode = " + CompCode + "" },
                //{ NameTable: 'FamilyZone', Condition: "Active =1 and CompCode = " + SysSession.CurrentEnvironment.CompCode },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        _G_Code = GetDataTable('G_Codes');
        _G_Role = GetDataTable('G_Role');
        //_Zones = GetDataTable('Zones');
        //_SuperUsers = GetDataTable('GQ_USERS');
        //let _FamilyZones = GetDataTable('FamilyZone');
        FillDropwithAttr(_G_Code, "Usr_UserType", "CodeValue", (Res.Lang == "Ar" ? "DescA" : "DescE"), "No", "", "");
        FillDropwithAttr(_G_Role, "Usr_G_Role", "RoleId", (Res.Lang == "Ar" ? "DescA" : "DescE"), "No", "", "");
        //DocumentActions.FillCombowithdefult(_FamilyZones, FamilyZone, "FamilyZoneID", 'DescA', 'Select Family Zone');
        //FltrZones();
    }
    //function FltrZones() {
    //    $('#Usr_SuperVisor').html('');
    //    _ZonesFltr = _Zones.filter(x => x.FamilyZoneID == Number(FamilyZone.value));
    //    //_SuperUsersFltr = _SuperUsers.filter(x => x.FamilyZoneID == Number(FamilyZone.value));
    //    _SuperUsersFltr = _SuperUsers;
    //    FillDropwithAttr(_SuperUsersFltr, "Usr_SuperVisor", "ID", "USER_NAME", "No", "", "");
    //    FillDropwithAttr(_Zones, "drp_Zone", "ZoneID", 'DescA', "No", "FamilyZoneID", "FamilyZoneID");
    //    DocumentActions.FillCombowithdefult(_ZonesFltr, Usr_Zone, "ZoneID", 'DescA', 'Select Zone');
    //}
    function UserType_Change() {
        //if (Usr_UserType.value == "5") {
        //    $('#DlevType').removeClass('display_none');
        //    $('#SuperVisor').removeClass('display_none');
        //    $('#Usr_SuperVisor').append('<option value="null">Choose Supervisor</option>');
        //    if (updateMod == false) {
        //        Usr_DlevType.value = "0";
        //    }
        //} else {
        //   $('#DlevType').addClass('display_none');
        //  $('.license').addClass('display_none');
        //  $('#SuperVisor').addClass('display_none');
        //}
    }
    function Usr_G_Role_Change() {
        //if (Usr_UserType.value == "5") {
        //    $('#DlevType').removeClass('display_none');
        //    $('#SuperVisor').removeClass('display_none');
        //    $('#Usr_SuperVisor').append('<option value="null">Choose Supervisor</option>');
        //    if (updateMod == false) {
        //        Usr_DlevType.value = "0";
        //    }
        //} else {
        //   $('#DlevType').addClass('display_none');
        //  $('.license').addClass('display_none');
        //  $('#SuperVisor').addClass('display_none');
        //}
    }
    function SubmitUpdate() {
        let Profile_Img = setVal($("#img_Profile").attr("Name_Img"));
        //if (Profile_Img.trim() == "") {
        //	Errorinput($('#img_Profile'), "Please a Enter profile Picture 🤨", "الرجاء إدخال صورة الملف الشخصي 🤨");
        //	return
        //}
        //if ($('#Usr_USERID').val().trim() == "") {
        //	Errorinput($('#Usr_USERID'), "Please a Enter User ID 🤨", "الرجاء إدخال معرف المستخدم 🤨");
        //	return
        //}
        //if (!CheckDublicated($('#Usr_USERID').val()) && updateMod == false) {
        //	Errorinput($('#Usr_USERID'), "This User ID already exists 🤨", "معرف المستخدم هذا موجود بالفعل 🤨");
        //	return
        //}
        if ($('#Usr_Full_Name').val().trim() == "") {
            Errorinput($('#Usr_Full_Name'), "Please a Enter Name 🤨", "الرجاء إدخال الاسم 🤨");
            return;
        }
        if ($('#Usr_Address').val().trim() == "") {
            Errorinput($('#Usr_Address'), "Please a Enter Address 🤨", "الرجاء إدخال العنوان 🤨");
            return;
        }
        if ($('#Usr_Mobile').val().trim() == "") {
            Errorinput($('#Usr_Mobile'), "Please a Enter Mobile 🤨", "الرجاء إدخال رقم الهاتف المحمول 🤨");
            return;
        }
        //if ($('#Usr_ID_Num').val().trim() == "") {
        //    Errorinput($('#Usr_ID_Num'), "Please a Enter Identity No 14 🤨");
        //    return
        //} 
        //let ID_Num: string = $('#Usr_ID_Num').val();
        //if (ID_Num.length != 14) {
        //    Errorinput($('#Usr_ID_Num'), "Please a Enter Identity No length ( 14 ) 🤨");
        //    return
        //}
        if (!ChackMailGmail($('#Usr_Mail').val())) {
            Errorinput($('#Usr_Mail'), "Please a Enter Mail Gmail 😡", "الرجاء إدخال البريد الإلكتروني Gmail 😡");
            return;
        }
        if (!ChackMailGmailInSql($('#Usr_Mail').val(), _USER.Email)) {
            Errorinput($('#Usr_Mail'), "This email has been registered before. 😡", "تم تسجيل هذا البريد الإلكتروني من قبل. 😡");
            return;
        }
        if ($('#Usr_Gender').val().trim() == "") {
            Errorinput($('#Usr_Gender'), "Please a Enter Gender 🤨", "الرجاء إدخال الجنس 🤨");
            return;
        }
        //if ($('#FamilyZone').val() == "null") {
        //    Errorinput($('#FamilyZone'), "Please a Select Family Zone 🤨");
        //    return
        //}
        //if ($('#Usr_Zone').val() == "null") {
        //    Errorinput($('#Usr_Zone'), "Please a Select  Zone 🤨");
        //    return
        //} 
        //if ($('#Usr_UserType').val() == '5') {
        //    if ($('#Usr_SuperVisor').val() == null ) {
        //        Errorinput($('#Usr_SuperVisor'), "Please a Select  Supervisor 🤨");
        //        return
        //    } 
        //}
        let UserId = $('#Usr_USERID').val();
        let Name = $('#Usr_Full_Name').val();
        let address = $('#Usr_Address').val();
        let Mobile = $('#Usr_Mobile').val();
        let IDNO = $('#Usr_ID_Num').val();
        let Email = $('#Usr_Mail').val();
        //let AccTransferNo = $('#Usr_AccTransferNo').val();
        //let AccNameTransfer = $('#Usr_AccNameTransfer').val();
        let Gender = $('#Usr_Gender').val();
        let UserName = $('#Usr_UserCode').val();
        let Password = $('#Usr_Password').val();
        let DepartmentName = Usr_G_Role.options[Usr_G_Role.selectedIndex].text;
        let JobTitle = Usr_UserType.options[Usr_UserType.selectedIndex].text;
        debugger;
        let UserType = Number(Usr_UserType.value);
        let RoleId = Number(Usr_G_Role.value);
        let UserCreated = SysSession.CurrentEnvironment.NameUser;
        if ($('#Usr_UserCode').val().trim() == "") {
            Errorinput($('#Usr_UserCode'), "Please a Enter User Name 🤨", "الرجاء إدخال اسم المستخدم 🤨");
            return;
        }
        if ($('#Usr_Password').val().trim() == "") {
            Errorinput($('#Usr_Password'), "Please a Enter User Password 🤨", "الرجاء إدخال كلمة مرور المستخدم 🤨");
            return;
        }
        //if (FrontID_Img.trim() == "") {
        //	Errorinput($('#Reg_FrontID_Img'), "Please a select front of nationality ID imge🪪 🤨", "يرجى تحديد صورة أمامية لبطاقة الهوية الوطنية🪪 🤨");
        //	return
        //}
        //if (BackID_Img.trim() == "") {
        //	Errorinput($('#Reg_BackID_Img'), "Please a select Back of nationality ID imge🪪 🤨", "يرجى اختيار صورة من الخلف لبطاقة الهوية الوطنية🪪 🤨");
        //	return
        //}
        if (!CheckPass($('#Usr_UserCode').val().trim(), $('#Usr_Password').val().trim(), Number(UserId))) {
            Errorinput($('#Usr_Password'), "Password is very Weak 🤨", "كلمة المرور ضعيفة جدًا 🤨");
            return;
        }
        if (updateMod == true) {
            Ajax.CallsyncSave({
                type: "Get",
                url: sys.apiUrl("SalesMan", "UpdateUser"),
                //data: {
                //    ID: UserID, CompCode: CompCode, BranchCode: BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, SuperVisorID: SuperVisorID, ZoneID: ZoneID, UserType: UserType, Gender: Gender, Profile_Img: Profile_Img, FrontID_Img: FrontID_Img, BackID_Img: BackID_Img, UserID: UserId, Status: 1, FamilyZoneID: FamilyZoneID, UserCreated: UserCreated
                //    , FrontDLic_Img: FrontDLic_Img, BackDLic_Img: BackDLic_Img, FrontCLic_Img: FrontCLic_Img, BackCLic_Img: BackCLic_Img, DeliveryType: DeliveryType, AccTransferNo: AccTransferNo, AccNameTransfer: AccNameTransfer
                //},
                data: {
                    ID: UserID, CompCode: CompCode, BranchCode: BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, SuperVisorID: null, ZoneID: null, UserType: UserType, Gender: Gender, Profile_Img: Profile_Img, UserID: UserId, Status: 1, FamilyZoneID: null, UserCreated: UserCreated,
                    FrontDLic_Img: "", BackDLic_Img: "", FrontCLic_Img: "", BackCLic_Img: "", DeliveryType: null, AccTransferNo: "", AccNameTransfer: ""
                },
                success: (d) => {
                    let result = d;
                    if (result.IsSuccess == true) {
                        ShowMessage("Updated 😍", "تم التحديث 😍");
                        $("#Display_Back_Page").click();
                        $('#Back_Page').click();
                        Close_Loder();
                    }
                    else {
                        alert("An error occurred while Update User");
                    }
                }
            });
        }
        else {
            debugger;
            Ajax.CallsyncSave({
                type: "Get",
                url: sys.apiUrl("User", "InsertUser"),
                data: {
                    CompCode: Number(CompCode), Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName,
                    Password: Password, UserType: UserType,
                    Status: 1, UserCreated: UserCreated,
                    DepartmentName: DepartmentName, RoleId: RoleId, JobTitle: JobTitle
                },
                success: (d) => {
                    let result = d;
                    if (result.IsSuccess == true) {
                        ShowMessage("Inserted 😍", "تم إدراجه 😍");
                        $("#Display_Back_Page").click();
                        $('#Back_Page').click();
                        Close_Loder();
                    }
                    else {
                        alert("An error occurred while Add User");
                    }
                }
            });
        }
    }
    function Clean() {
        $('._Clear_Reg').val("");
        $('#Usr_Gender').val('1');
        $('#Usr_UserType').val('2');
        //$('#FamilyZone').val('null')
        //$('#Usr_Zone').val('null')
    }
    function CheckDublicated(UserID) {
        var Table;
        Table =
            [
                { NameTable: 'G_USERS', Condition: " USERID = " + UserID + " and CompCode = " + CompCode + "" },
            ];
        DataResult(Table);
        let _USER = GetDataTable('G_USERS');
        return _USER.length > 0 ? false : true;
    }
    //function Usr_DlevType_onchange() {
    //    if (Usr_DlevType.value == "2" || Usr_DlevType.value == "3") {
    //        $('.license').removeClass("display_none");
    //    }
    //    else {
    //        $('.license').addClass("display_none");
    //    }
    //}
})(UserDef || (UserDef = {}));
//# sourceMappingURL=UserDef.js.map