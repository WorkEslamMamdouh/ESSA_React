class SearchGrid {
}
class _BaseResponse {
}
class ResultTable {
}
class ResultGrid {
}
class SelectDataSearch {
}
class SelectPageNumber {
}
class ModelSearch {
}
class SharedWork {
    static set PageIndex(value) {
        //this.SetClientSession("PageIndex", value);
        localStorage.setItem(GetParameterByName('App') + "PageIndex", value.toString());
    }
    static get PageIndex() {
        let value2 = Number(localStorage.getItem(GetParameterByName('App') + "PageIndex")); //this.GetClientSession<number>("PageIndex");
        return value2;
    }
    static set ModelCount(value) {
    }
    static get ModelCount() {
        if (localStorage.getItem(GetParameterByName('App') + "TableName") != null) {
            let _Table = localStorage.getItem(GetParameterByName('App') + "TableName");
            let _Cond = localStorage.getItem(GetParameterByName('App') + "ModelCount");
            var result = 0;
            var sys = new SystemTools();
            Ajax.Callsync({
                type: "GET",
                url: sys.apiUrl("SystemTools", "GetModelCount"),
                data: { TableName: _Table, Condition: _Cond },
                async: false,
                success: (res) => {
                    result = Number(res);
                }
            });
            return result;
        }
        return 0;
    }
    static Render() {
        if (this.PageIndex < 1) {
            $("#ModelPreview").val("");
        }
        else {
            $("#ModelPreview").val("1");
        }
        $("#txtNav").val(this.PageIndex.toString() + "/" + this.ModelCount.toString());
    }
    static SwitchModes(mode) {
        switch (mode) {
            case ScreenModes.Add:
                $("#AddIconSpan").show();
                $("#EditIconSpan").hide();
                $("#QueryIconSpan").hide();
                //ControlsButtons.AddButton.disabled = true;
                //ControlsButtons.EditButton.disabled = true;
                //ControlsButtons.DeleteButton.disabled = true;
                //ControlsButtons.SaveButton.disabled = false;
                //ControlsButtons.UndoButton.disabled = false;
                $(".xaddable").attr("disabled", "disabled");
                $(".addable").removeAttr("disabled");
                $("[name=nav]").prop('disabled', true);
                break;
            case ScreenModes.Edit:
                $("#AddIconSpan").hide();
                $("#EditIconSpan").show();
                $("#QueryIconSpan").hide();
                //ControlsButtons.AddButton.disabled = true;
                //ControlsButtons.EditButton.disabled = true;
                //ControlsButtons.DeleteButton.disabled = true;
                //ControlsButtons.SaveButton.disabled = false;
                //ControlsButtons.UndoButton.disabled = false;
                $(".xeditable").attr("disabled", "disabled");
                $(".editable").removeAttr("disabled");
                $("[name=nav]").prop('disabled', true);
                break;
            case ScreenModes.Query:
                $("#AddIconSpan").hide();
                $("#EditIconSpan").hide();
                $("#QueryIconSpan").show();
                //ControlsButtons.AddButton.disabled = false;
                //ControlsButtons.EditButton.disabled = false;
                //ControlsButtons.DeleteButton.disabled = false;
                //ControlsButtons.SaveButton.disabled = true;
                //ControlsButtons.UndoButton.disabled = true;
                $(".xaddable").removeAttr("disabled");
                $(".xeditable").removeAttr("disabled");
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
                $(".addable").val("");
                $(".editable").val("");
                $("[name=nav]").prop('disabled', false);
                break;
            case ScreenModes.DisableMenu:
                $("#AddIconSpan").hide();
                $("#EditIconSpan").hide();
                $("#QueryIconSpan").show();
                //ControlsButtons.AddButton.disabled = true;
                //ControlsButtons.EditButton.disabled = true;
                //ControlsButtons.DeleteButton.disabled = true;
                //ControlsButtons.SaveButton.disabled = true;
                //ControlsButtons.UndoButton.disabled = true;
                $(".xaddable").removeAttr("disabled");
                $(".xeditable").removeAttr("disabled");
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
                $("[name=nav]").prop('disabled', false);
                break;
        }
        //  ControlsButtons.ModuleEffects();
        SharedWork.CurrentMode = mode;
        if (SharedWork.OnSwitchModes != null)
            SharedWork.OnSwitchModes();
        SharedWork.Render();
    }
}
SharedWork.OnNavigate = null;
SharedWork.OnSwitchModes = null;
class UserPrivilege {
}
class SystemEnvironment {
}
class sysInternal_Comm {
}
sysInternal_Comm.slected_MemberID = 0;
sysInternal_Comm.period_ID = 0;
class SystemSession {
    constructor() {
        this.CurrentPrivileges = new IQ_G_RoleModule();
        this.CurrentEnvironment = new SystemEnvironment();
    }
}
function getCookie(cookieName) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(`${cookieName}=`) === 0) {
            const encodedValue = cookie.substring(cookieName.length + 1);
            const decodedValue = decodeURIComponent(encodedValue);
            return decodedValue;
        }
    }
    return null;
}
function readCookie(cookieName) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(`${cookieName}=`) === 0) {
            const encodedValue = cookie.substring(cookieName.length + 1);
            const decodedValue = decodeURIComponent(encodedValue);
            return decodedValue;
        }
    }
    return null;
}
function GetPrivileges() {
    // 
    if (document.cookie.length > 0) {
        let user = JSON.parse(getCookie("Inv1_Privilage"));
        //user.MODULE_DESCA = "";
        //user.MODULE_DESCE = "";
        //var unmaskedData = JSON.parse(JSON.parse(getCookie("Privilage")));
        //var maskedData = JSON.stringify(unmaskedData, maskInfo);
        //function maskInfo(key, value) {
        //    var maskedValue = value;
        //    if (key == "MODULE_DESCA") {
        //        maskedValue = "";
        //        return maskedValue;
        //    }
        //}
        //alert(getCookie("Privilage"));
        //alert(getCookie("Privilage").length);
        //SysSession.CurrentPrivileges = user;
        return user;
    }
}
function GetSystemEnvironment() {
    if (document.cookie.length > 0) {
        let sys = JSON.parse(getCookie("AlAlamya_systemProperties"));
        //sys.CompanyNameAr = "";
        //sys.CompanyName = "";
        //alert(getCookie("Kids_systemProperties"));
        //alert(getCookie("Kids_systemProperties").length);
        // 
        //SysSession.CurrentEnvironment = sys
        return sys;
    }
    //return null
}
//function GetI_Control(): I_Control {
//    if (document.cookie.length > 0) {
//        let sys: I_Control = JSON.parse(getCookie("kControl")) as I_Control;
//        //alert(getCookie("kControl"));
//        //alert(getCookie("kControl").length);
//        // 
//        SysSession.CurrentEnvironment.I_Control = sys
//        return sys;
//    }
//}
//function GetSystemSession(): SystemSession {
//    if (document.cookie.length > 0) {
//        // 
//        var SysSession = new SystemSession;
//        SysSession.CurrentEnvironment = JSON.parse(readCookie("Inv1_systemProperties")) as SystemEnvironment;
//        SysSession.CurrentPrivileges = JSON.parse(readCookie("Inv1_Privilage")) as UserPrivilege;
//        //RS.CurrentMemberComm = JSON.parse(getCookie("Inv1_Comm")) as Kids_Comm;
//        return SysSession;
//    }
//}
function GetSystemSession() {
    CleaningList_Table();
    var SysSession = new SystemSession;
    SysSession.CurrentEnvironment = JSON.parse(readCookie("AlAlamya_systemProperties"));
    var Privileg = GetPrivilegesByModuleCode(GetModuleCode());
    SysSession.CurrentPrivileges = Privileg;
    return SysSession;
}
function GetYearSession() {
    CleaningList_Table();
    var SysSession = new SystemSession;
    SysSession.CurrentEnvironment = JSON.parse(readCookie("AlAlamya_systemProperties"));
    return SysSession;
}
//function GetMemberComm(): Kids_Comm {
//    if (document.cookie.length > 0) {
//        // 
//       let kids = JSON.parse(getCookie("Inv1_Comm")) as Kids_Comm;
//        //Kids_Comm = Kids
//        return Kids;
//    }
//}
class PropertiesPage {
    static Render() {
        if (this.PageIndex < 1) {
            $("#ModelPreview").val("");
        }
        else {
            $("#ModelPreview").val("1");
        }
        $("#txtNav").val(this.PageIndex.toString() + "/" + this.ModelCount.toString());
    }
}
PropertiesPage.OnNavigate = null;
function GetCompanyName(compcode) {
    // 
    var sys = new SystemTools();
    var compname = new G_COMPANY();
    Ajax.Callsync({
        url: sys.apiUrl("K_CompanyControl", "GetAllCompanyName"),
        data: { compcode: compcode },
        success: (d) => {
            var result = d;
            if (result.IsSuccess) {
                compname = result.Response;
            }
        }
    });
    return compname;
}
function OpenReportsPopup(moduleCode) {
    let opt = {
        url: Url.Action(moduleCode, "GeneralReports"),
        success: (d) => {
            let result = d;
            $("#ReportPopupBody").html(result);
            $("#ReportsPopupDialog").modal("show");
            $('#ReportsPopupDialog').modal({
                refresh: true
            });
            var val = $("#rpTitle").text();
            $("#TitleSpanRep").html(val);
        }
    };
    Ajax.CallAsync(opt);
}
function GetMAxImgSize(CompCode, BranchCode) {
    let sys = new SystemTools();
    let Cont = 0;
    Ajax.Callsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "GetMaxImagesize"),
        data: { comp: CompCode, bracode: BranchCode },
        success: (d) => {
            var result = d;
            if (result.IsSuccess == true) {
                Cont = result.Response;
            }
        }
    });
    return Cont;
}
function GetSystemG_BRANCH() {
    if (document.cookie.length > 0) {
        let sys = JSON.parse(getCookie("Inv1_systemG_BRANCH"));
        return sys;
    }
}
//# sourceMappingURL=Shared.js.map