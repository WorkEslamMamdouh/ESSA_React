var ScreenModes;
(function (ScreenModes) {
    ScreenModes[ScreenModes["Query"] = 0] = "Query";
    ScreenModes[ScreenModes["Add"] = 1] = "Add";
    ScreenModes[ScreenModes["Edit"] = 2] = "Edit";
    ScreenModes[ScreenModes["Start"] = 3] = "Start";
    ScreenModes[ScreenModes["DisableMenu"] = 4] = "DisableMenu";
})(ScreenModes || (ScreenModes = {}));
const JsGridHeaderCenter = "JsGridHeaderCenter";
const TransparentButton = "TransparentButton";
var Modules = {
    Home: "Home",
    SlsTrSalesManagerNew: "SlsTrSalesManagerNew",
    SlsTrShowPrice: "SlsTrShowPrice"
};
var MessageType = {
    Error: '2',
    Succeed: '1',
    Worning: '3',
};
var TransType = {
    Invoice: 'Inv',
    InvoiceReturn: 'Inv_Ret',
    InvoiceOperation: 'Pro',
    InvoiceOperationReturn: 'Pro_Ret',
    Pur_Receive: 'Pur',
    Pur_Receive_Return: 'Pur_Ret',
    AccReceive: 'AccReceive',
    AccPayment: 'AccPayment',
};
var TypeLog = {
    LogIn: 'LogIn',
    LogOut: 'LogOut',
    OpenSystem: 'OpenSystem',
    OpenPage: 'OpenPage',
    BackPage: 'BackPage',
    Views: 'Views',
    ShowReport: 'ShowReport',
    DownloadExcel: 'DownloadExcel',
    OpenTrans: 'OpenTrans',
    ApproveTrans: 'ApproveTrans',
    Insert: 'Insert',
    Update: 'Update',
    Delete: 'Delete',
    Search: 'Search',
    Save: 'Save',
    BackUpdate: 'BackUpdate',
    Add: 'Add',
};
var Keys = {
    Enter: "Enter"
};
var setVal = function (value) {
    let Input = this;
    if (value == null) {
        value = '';
        return value;
    }
    else if (value == undefined) {
        value = '';
        return value;
    }
    else if (value == '') {
        value = '';
        return value;
    }
    else {
        return value;
    }
};
var SetValDot = function (value) {
    let Input = this;
    if (value == null) {
        value = '------';
        return value;
    }
    else if (value == undefined) {
        value = '------';
        return value;
    }
    else if (value == '') {
        value = '------';
        return value;
    }
    else {
        return value;
    }
};
debugger;
var SystemEnv = new SystemEnvironment();
var today1 = new Date();
SystemEnv.CurrentYear = today1.getFullYear().toString();
document.cookie = "AlAlamya_systemProperties=" + encodeURIComponent(JSON.stringify(SystemEnv).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
var KeyToken = "QDYxOUA2MTlANjE5QA==";
function IsNullOrEmpty(value) {
    if (value == null || value == "")
        return true;
    else
        return false;
}
function GetIndexByUseId(idValue, BaseTableName, idFieldName, Condition) {
    let result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    }
    else {
        let sys = new SystemTools;
        let result = "";
        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetIndexByUseId"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, Condition: Condition },
            success: (d) => {
                result = d;
            }
        });
        return result;
    }
}
function GetIndexByUseCode(idValue, BaseTableName, idFieldName, condition) {
    let result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    }
    else {
        let result = Ajax.Call({
            url: Url.Action("GetIndexByUseCode", "ClientTools"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condition: condition }
        });
        return result;
    }
}
var SearchModulesNames = {
    cashCustomer: "cashCustomer",
    cashCustomerCategory: "cashCustomerCategory",
    categories: "categories",
    colours: "colours",
    CostCenter: "CostCenter",
    CustAdjType: "CustAdjType",
    customerInformation: "customerInformation",
    customers: "customers",
    groups: "groups",
    Icustomers: "Icustomers",
    items: "items",
    Items2: "Items2",
    marks: "marks",
    movements: "movements",
    nations: "nations",
    salesMan: "salesMan",
    TrReceipt: "TrReceipt",
    types: "types",
    uoms: "uoms",
    store: "store",
    View_Deleted_Orders: "View_Deleted_Orders"
};
function Numeric(value) {
    let result = 0;
    if (!isNaN(value)) {
        let strValue = value.RoundToSt(2);
        result = Number(strValue); // value;
    }
    return result;
}
function Fixed(value) {
    return Number(value.RoundToSt(2));
}
var App;
(function (App) {
    //Number.prototype.RoundToNum = function (dec: number): number {
    //    let num = this;
    //    return (Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec));
    //};
    //Number.prototype.RoundToSt = function (dec: number): string {
    //    let num = this;
    //    return (Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)).toString();
    //};
    Number.prototype.RoundToNum = function (dec) {
        let num = this;
        //let stnum = num.toString();
        if (num.toString().indexOf(".") == -1) {
            return Number(num);
        }
        else {
            let stfix = num.toString().substr(0, num.toString().indexOf("."));
            if (Number(stfix) < 0) {
                let stfrac = num.toString().substr(num.toString().indexOf(".") + 1, num.toString().length);
                return ((Number(stfix) - Math.round(Number(stfrac) / Math.pow(10, (stfrac.length - dec))) / Math.pow(10, dec)));
            }
            else {
                let stfrac = num.toString().substr(num.toString().indexOf(".") + 1, num.toString().length);
                let Math_round = Math.round(Number(stfrac) / Math.pow(10, (stfrac.length - dec)));
                let fix = Math_round / Math.pow(10, dec);
                return (Number(stfix) + Number(fix));
            }
        }
        //return (Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec));
    };
    Number.prototype.RoundToSt = function (dec) {
        let num = this;
        //let stnum = num.toString();
        if (num.toString().indexOf(".") == -1) {
            return Number(num).toString();
        }
        else {
            let stfix = num.toString().substr(0, num.toString().indexOf("."));
            if (Number(stfix) < 0) {
                let stfrac = num.toString().substr(num.toString().indexOf(".") + 1, num.toString().length);
                return ((Number(stfix) - Math.round(Number(stfrac) / Math.pow(10, (stfrac.length - dec))) / Math.pow(10, dec)).toString());
            }
            else {
                let stfrac = num.toString().substr(num.toString().indexOf(".") + 1, num.toString().length);
                let Math_round = Math.round(Number(stfrac) / Math.pow(10, (stfrac.length - dec)));
                let fix = Math_round / Math.pow(10, dec);
                return (Number(stfix) + Number(fix)).toString();
                //return (stfix + fix.toString().substr(1, 3)).toString();
            }
        }
        //return (Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)).toString();
    };
    Number.prototype.setVal = function (value) {
        let Input = this;
        value == null || Number(value) == 0 ? Input.value = '' : Input.value = value;
        return value;
    };
    HTMLInputElement.prototype.setVal = function (value) {
        let Input = this;
        value == null || Number(value) == 0 ? Input.value = '' : Input.value = value;
        return value;
    };
    HTMLSelectElement.prototype.SetValSelect = function (value) {
        let Input = this;
        value == null || value == '' || value == 0 || value == '0' ? Input.value = 'null' : Input.value = value;
        return value;
    };
    let branchCodeSelected = "";
    var LanguageButton;
    function AssignLoginInformation() {
        var Env = GetSystemEnvironment();
        if (DocumentActions.GetElementById("infoSysName") != null)
            DocumentActions.GetElementById("infoSysName").innerText = Env.SystemCode;
        if (DocumentActions.GetElementById("infoSubSysName") != null)
            DocumentActions.GetElementById("infoSubSysName").innerText = Env.SubSystemCode;
        if (DocumentActions.GetElementById("infoCompanyName") != null) {
            if (Env.ScreenLanguage == "ar")
                DocumentActions.GetElementById("infoCompanyName").innerText = Env.CompanyNameAr;
            else
                DocumentActions.GetElementById("infoCompanyName").innerText = Env.CompanyName;
        }
        if (DocumentActions.GetElementById("infoCurrentYear") != null)
            DocumentActions.GetElementById("infoCurrentYear").innerText = Env.CurrentYear;
        if (DocumentActions.GetElementById("infoUserCode") != null)
            DocumentActions.GetElementById("infoUserCode").innerText = Env.UserCode;
    }
    function Startup() {
        var Env = GetSystemEnvironment();
        try {
            let SpanUserName = DocumentActions.GetElementById("SpanUserName");
            SpanUserName.innerText = Env.UserCode;
            SpanUserName.style.display = "block";
            SpanUserName.onclick = GetBranchs;
        }
        catch (e) {
        }
        var btnEditUserBranchs;
        try {
            btnEditUserBranchs = DocumentActions.GetElementById("btnEditUserBranchs");
            btnEditUserBranchs.onclick = EnableBranchSelected;
        }
        catch (e) {
        }
        //var btnChangeBranch: HTMLButtonElement;
        //try {
        //    btnChangeBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnChangeBranch");
        //    btnChangeBranch.onclick = ChangeBranch;
        //} catch (e) {
        //}
        AssignLoginInformation();
        try {
            LanguageButton = DocumentActions.GetElementById("LanguageButton");
            LanguageButton.onclick = LanguageButton_Click;
        }
        catch (e) {
        }
        try {
            DocumentActions.GetElementById("btnChangePassword").onclick = () => {
                let oldPassword = DocumentActions.GetElementById("txtOldPassword").value;
                let newPassword = DocumentActions.GetElementById("txtNewPassword").value;
                ChangePassword(oldPassword, newPassword);
            };
        }
        catch (e) {
        }
        try {
        }
        catch (e) {
        }
        AssignLoginInformation();
    }
    App.Startup = Startup;
    function LanguageButton_Click() {
        var SysSession = GetSystemEnvironment();
        if (SysSession.ScreenLanguage == "ar") {
            SysSession.ScreenLanguage = "en";
            //SysSession.CurrentEnvironment.ScreenLanguage = "en";
            //SysSession.CurrentEnvironment.CompanyNameAr = "";
            //SysSession.CurrentEnvironment.CompanyName = "";
        }
        else { // Arabic Mode other mohaamed ragab
            SysSession.ScreenLanguage = "ar";
            //SysSession.CurrentEnvironment.ScreenLanguage = "ar";
            //SysSession.CurrentEnvironment.CompanyNameAr = "";
            //SysSession.CurrentEnvironment.CompanyName = "";
        }
        document.cookie = "Inv1_systemProperties=" + JSON.stringify(SysSession) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
        //Ajax.CallAsync({
        //    url: Url.Action("SetScreenLang", "ClientTools"),
        //    data: { lang: SysSession.CurrentEnvironment.ScreenLanguage },
        //    success: (response) => { }
        //});
    }
    function AppendStyleSheet(fileName) {
        var lnk = document.createElement('link');
        lnk.href = "../css/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        var $head = $("head");
        var $headlinklast = $head.find("link[rel='stylesheet']:first");
        $headlinklast.after(lnk);
        //document.getElementsByTagName("head")[0].appendChild(lnk);
    }
    function RemoveStyleSheet(fileName) {
        let href = "../css/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }
})(App || (App = {}));
function EnableBranchSelected() {
    let ddlBrachs = DocumentActions.GetElementById("ddlBrachs");
    ddlBrachs.removeAttribute("disabled");
}
function GetBranchs() {
    var sys = new SystemTools();
    var Env = GetSystemEnvironment();
    let ddlBrachs = DocumentActions.GetElementById("ddlBrachs");
    Ajax.Callsync({
        url: sys.apiUrl("SystemTools", "GetBranchsByUserCode"),
        data: { userCode: Env.UserCode, compCode: Env.CompCode },
        success: (response) => {
            let result = response;
            DocumentActions.FillCombo(result, ddlBrachs, "BRA_CODE", "BRA_DESCL");
        }
    });
}
class Ajax_Data {
    constructor() {
        this.type = "";
        this.url = "";
        this.data = "";
        this.ISObject = false;
    }
}
class GQ_GetUserBranch {
    constructor() {
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESCL = "";
        this.BRA_DESCE = "";
        this.BRA_DESC = "";
    }
}
function InitalizeLayout() {
    //ControlsButtons.ModuleEffects();
}
function GetParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function ChangePassword(OldPassword, NewPassword) {
    var sys = new SystemTools();
    var Env = GetSystemEnvironment();
    let UserCode = Env.UserCode;
    if (OldPassword.trim() == '') {
        alert("يجب ادخال الباسور كلمة المرور القديمة");
        Errorinput($('#txtOldPassword'));
        return;
    }
    if (NewPassword.trim() == '') {
        alert("يجب ادخال الباسور كلمة المرور الجديدة");
        Errorinput($('#txtNewPassword'));
        return;
    }
    Ajax.Callsync({
        url: sys.apiUrl("SystemTools", "ChangePassword"),
        data: { OldPassword: OldPassword, NewPassword: NewPassword, UserCode: UserCode },
        success: (response) => {
            let result = response;
            if (result.IsSuccess == true) {
                alert("تم تغيير كلمة السر");
                $("#user_setting").modal("hide");
            }
            else {
                alert("فشل تغيير كلمة المرور");
            }
        }
    });
}
function CloseSearchBox() {
    $("#SearchBox").modal("hide"); //.css("display", "none");
}
// mahroos
function NavigateToSearchResultKey(IndexNo, Navigate) {
    //    CloseSearchBox();
    //    SharedWork.PageIndex = IndexNo;
    //    Navigate();
    //    SharedWork.Render();
}
function NavigateToSearchResult(Navigate) {
    //    CloseSearchBox();
    //    let index = SearchGrid.SearchDataGrid.SelectedKey;
    //    SharedWork.PageIndex = Number(index);
    //    Navigate();
    //    SharedWork.Render();
}
//var Url = {
//    Action: (actionName: string, controllerName: string) => ($.ajax({
//        url: $("#GetActionUrl").val(),
//        async: false,
//        data: { actionName: actionName, controllerName: controllerName }
//    }).responseJSON).result as string
//};
var Url = {
    Action: (actionName, controllerName) => (location.origin + "/" + controllerName + "/" + actionName)
};
function isObject(obj, keys) {
    if (typeof obj[keys] === 'object' && obj[keys] !== null) {
        return true;
    }
}
var Ajax = {
    Call: (settings) => {
        try {
            //CheckTime(); 
            let json = $.ajax({
                url: settings.url,
                data: settings.data,
                cache: false,
                async: false
            }).responseJSON;
            let result = json.result;
            return result;
        }
        catch (e) {
            $(".waitMe").removeAttr("style").fadeOut(200);
            return null;
        }
    },
    CallAsync: (settings) => {
        //CheckTime();
        //run_waitMe();
        Show_Loder();
        $.ajax({
            type: settings.type,
            url: settings.url,
            data: settings.data,
            cache: false,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json',
                'ESSA-Token': GenerateToken(KeyToken)
            },
            success: (d) => {
                var result = JSON.parse(d);
                settings.success(result, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
                Close_Loder();
            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(200); }
        });
    },
    Callsync: (settings) => {
        //CheckTime();
        //run_waitMe();
        //alert(settings.url);
        Show_Loder();
        $.ajax({
            type: settings.type,
            url: settings.url,
            data: settings.data,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json',
                'ESSA-Token': GenerateToken(KeyToken)
            },
            cache: false,
            async: false,
            success: (d) => {
                var result = JSON.parse(d);
                settings.success(result, "", null);
                $(".waitMe").removeAttr("style").fadeOut(2500);
                Close_Loder();
            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(2500); }
        });
    },
    CallsyncSave: (settings) => {
        //CheckTime();
        //run_waitMe();
        //alert(settings.url);
        Show_Loder();
        setTimeout(() => {
            $.ajax({
                type: settings.type,
                url: settings.url,
                data: settings.data,
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json',
                    'ESSA-Token': GenerateToken(KeyToken)
                },
                cache: false,
                async: false,
                success: (d) => {
                    var result = JSON.parse(d);
                    settings.success(result, "", null);
                    $(".waitMe").removeAttr("style").fadeOut(2500);
                    setTimeout(function () {
                        RunInsertLogUser();
                    }, 1000);
                    Close_Loder();
                },
                error: () => { $(".waitMe").removeAttr("style").fadeOut(2500); }
            });
        }, 50);
    },
    CallsyncModel: (settings) => {
        //CheckTime();
        //run_waitMe();
        //alert(settings.url);
        Show_Loder();
        setTimeout(() => {
            $.ajax({
                type: settings.type,
                url: settings.url,
                data: settings.data,
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json',
                    'ESSA-Token': GenerateToken(KeyToken)
                },
                cache: false,
                async: false,
                success: (d) => {
                    //var result = JSON.parse(d);
                    settings.success(d, "", null);
                    $(".waitMe").removeAttr("style").fadeOut(2500);
                    setTimeout(function () {
                        RunInsertLogUser();
                    }, 1000);
                    Close_Loder();
                },
                error: () => { $(".waitMe").removeAttr("style").fadeOut(2500); }
            });
        }, 50);
    }
};
function cheakUrl(url) {
    let Nurl = url.replace(location.origin, "");
    let ChUrl = url.replace(Nurl, "");
    let islocal = false;
    if (ChUrl == location.origin) {
        islocal = true;
    }
    return islocal;
}
function JsonAddValue(data, Address) {
    var obj = JSON.parse(data);
    obj["Address"] = '' + Address + '';
    return JSON.stringify(obj);
}
function GetView(controllerName, ModuleCode) {
    ////// ;
    //HomeComponent.UserAcsses(ModuleCode);
    let json = Ajax.CallAsync({
        //type: "GET",
        url: "OpenView",
        data: { controllerName: controllerName, ModuleCode: ModuleCode },
        cache: true,
        async: true,
        success: function (response) {
            window.open(Url.Action(controllerName + "Index", controllerName), "_self");
            //$("#cont").html(response);
        }
    });
    //back to home 
    //SysSession.ModuleCode = "Home";
}
function OpenPartial(ModuleCode, DivName) {
    let jsonf = $.ajax({
        type: "GET", //HTTP POST Method
        url: "OpenView", // Controller/View 
        data: { ModuleCode: ModuleCode },
        cache: false,
        async: false,
        success: function (response) {
            $("#" + DivName).html(response);
        }
    }).responseJSON;
}
function loading(NameBtn) {
    $('#' + NameBtn + '').attr('disabled', 'disabled');
    $('#Loading_Div').html('<span class="loader" style="font-size: 465%;z-index: 99999;"></span>');
    //$('#Loading_Div').html('<i class="fa fa-spinner fa-spin lod  Loading" style="font-size: 465%;z-index: 99999;"></i>');
    $('.iconbar-container').attr('style', 'display : none');
    setTimeout(function () {
        $('#Loading_Div').html('');
        $('.iconbar-container').attr('style', '');
    }, 150);
}
function finishSave(NameBtn) {
    setTimeout(function () {
        $('#' + NameBtn + '').removeAttr('disabled');
    }, 100);
}
function Save_Succ_But() {
    $('#divIconbar').removeClass('display_none');
    $('#btnPrintTransaction').removeClass('display_none');
    $('#btnUpdate').removeClass('display_none');
    $('#btnBack').addClass('display_none');
    $('#btnSave').addClass('display_none');
    $('#btnPrintslip').removeClass('display_none');
    $('#btnPrintTransaction').removeClass('display_none');
    $("#NewAdd_Falg").val('0');
    $("#Mod_Flag").val('0');
    document.body.scrollTop = 600;
    document.documentElement.scrollTop = 600;
}
function run_waitMe() {
    $('.please_wait').waitMe({
        effect: "win8",
        text: `...Pleasewait`,
        color: '#fff',
        sizeW: '80px',
        sizeH: '80px',
        textPos: "horizontal"
    });
    $('.please_wait').waitMe({
        effect: "win8",
        text: `...Pleasewait`,
        color: '#fff',
        sizeW: '400',
        waitTime: '40000',
        sizeH: '400'
    });
}
var RequiredClassName = " required";
var RequiredElements = new Array();
var exchangeElements = new Array();
var DocumentActions = {
    SetRequiredElements: (...elements) => {
        RequiredElements = new Array();
        for (var element of elements) {
            //element.className += RequiredClassName;
            RequiredElements.push(element);
        }
    },
    SetExchangeElements: (ArElement, EnElement) => {
        exchangeElements = new Array();
        exchangeElements.push(ArElement);
        exchangeElements.push(EnElement);
    },
    ValidateRequired: () => {
        //let result: boolean = false;
        let bools = new Array();
        let elements = RequiredElements; // Array.prototype.slice.call(document.getElementsByClassName("required")) as Array<HTMLElement>;
        for (var element of elements) {
            switch (element.tagName.toUpperCase()) {
                case "INPUT":
                    if (element.type == "check") {
                        if (element.checked == false) {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    else {
                        if (element.value == "") {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    break;
                case "SELECT":
                    if (element.value == "") {
                        bools.push(false);
                        element.style.borderColor = "red";
                    }
                    else {
                        bools.push(true);
                        element.style.borderColor = "";
                    }
                    break;
                default:
            }
        }
        if (exchangeElements.length > 0) {
            if (exchangeElements[0].value == "" && exchangeElements[1].value == "") {
                bools.push(false);
                exchangeElements[0].style.borderColor = "orange";
                exchangeElements[1].style.borderColor = "orange";
            }
            else {
                bools.push(true);
                exchangeElements[0].style.borderColor = "";
                exchangeElements[1].style.borderColor = "";
            }
        }
        let count = bools.filter(f => f == false).length;
        if (count > 0)
            return false;
        else
            return true;
    },
    RenderFromModel: (dataSource) => {
        try {
            let properties = Object.getOwnPropertyNames(dataSource);
            for (var property of properties) {
                let element = document.getElementsByName(property)[0];
                if (element == null)
                    continue;
                if (property == "CreatedAt" || property == "UpdatedAt") {
                    if (String(dataSource[property]).indexOf("Date") > -1) {
                        element.value = DateTimeFormat(dataSource[property]);
                    }
                    else {
                        element.value = dataSource[property];
                    }
                    continue;
                }
                if (property == "CreatedBy" || property == "UpdatedBy") {
                    let value = String(dataSource[property]).toString();
                    if (value != null)
                        element.value = value;
                    else
                        element.value = "";
                    continue;
                }
                if (dataSource[property] == null) {
                    try {
                        element.value = dataSource[property];
                    }
                    catch (e) {
                    }
                    finally {
                        continue;
                    }
                }
                if (element.type == "checkbox")
                    element.checked = (dataSource[property]);
                else if (element.type == "date") {
                    element.value = dataSource[property];
                }
                else
                    element.value = dataSource[property];
            }
        }
        catch (e) {
        }
    },
    AssignToModel: (model) => {
        let properties = Object.getOwnPropertyNames(model);
        for (var property of properties) {
            let element = document.getElementsByName(property)[0];
            if (element != null) {
                if (element.type == "checkbox")
                    model[property] = element.checked;
                else
                    model[property] = element.value;
            }
        }
        return model;
    },
    //eslam elassal
    FillComboSingular: (dataSource, combo) => {
        if (combo != null) {
            for (let i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (let i = 0; i < dataSource.length; i++) {
                //let code = dataSource[i][i];
                //let name = dataSource[i][dataSource[i]];
                combo.add(new Option(dataSource[i], i.toString()));
            }
        }
    },
    FillCombo: (dataSource, combo, codeField, textField) => {
        if (combo != null) {
            for (let i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (let i = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                combo.add(new Option(name, code));
            }
        }
    },
    FillComboFirstvalue: (dataSource, combo, codeField, textField, Name, Code) => {
        if (combo != null) {
            for (let i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(Name, Code));
            for (let i = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                combo.add(new Option(name, code));
                if (name == Name && code == Code) {
                    combo.remove(i + 1);
                }
            }
        }
    },
    FillCombowithdefultAndEmptyChoice: (dataSource, combo, codeField, textField, NameDefult, EmptyChoiceName) => {
        var Res = GetGlopelResources();
        if (combo != null) {
            for (let i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(Res.Select, null));
            for (let i = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                let id = dataSource[i][codeField];
                combo.add(new Option(name, code));
            }
            //add empty
            combo.add(new Option(EmptyChoiceName, "-1"));
        }
    },
    FillCombowithdefult: (dataSource, combo, codeField, textField, NameDefult) => {
        var Res = GetGlopelResources();
        if (combo != null) {
            for (let i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(Res.Select, null));
            for (let i = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                let id = dataSource[i][codeField];
                //var x = true;
                //if (x==true) {
                //    $("#name").attr('id', id);
                //}
                //let test = 
                combo.add(new Option(name, code));
                //
            }
        }
    },
    //Filldefult: (combo: HTMLSelectElement, codeField: any, textField: any, NameDefult: any) => {
    //    if (combo != null) {
    //        for (let i: number = combo.length; i >= 0; i--) {
    //            combo.remove(i);
    //        }
    //        combo.add(new Option(NameDefult, null));              
    //    }
    //},
    FillComboWithEmpty: (dataSource, combo, codeField, textField) => {
        for (let i = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        combo.add(new Option("", ""));
        for (let i = 0; i < dataSource.length; i++) {
            let code = dataSource[i][codeField];
            let name = dataSource[i][textField];
            combo.add(new Option(name, code));
        }
    },
    GetElementById: (id) => {
        let element = document.getElementById(id);
        return element;
    },
    CreateElement: (id) => {
        let element = document.createElement(id);
        return element;
    }
};
function FillDropwithAttr(Datasource, InputID, Value, TextField, DefaultText = "", Attrname, AttrValue, Attrname2 = "", AttrValue2 = "", Attrname3 = "", AttrValue3 = "") {
    var Res = GetGlopelResources();
    debugger;
    $('#' + InputID + '').empty();
    if (DefaultText != "No") {
        if (DefaultText != "") {
            $('#' + InputID + '').append("<option value=null>" + DefaultText + "</option>");
        }
        else {
            $('#' + InputID + '').append("<option value=null>" + Res.Select + "</option>");
        }
    }
    if (Attrname != "" && Attrname2 == "" && Attrname3 == "") {
        for (var i = 0; i < Datasource.length; i++) {
            let Code = Datasource[i][Value];
            let Text = Datasource[i][TextField];
            let attrval = Datasource[i][AttrValue];
            $('#' + InputID + '').append("<option value=" + Code + " data-" + Attrname + "=" + attrval + " >" + Text + "</option>");
        }
    }
    else if (Attrname != "" && Attrname2 != "" && Attrname3 == "") {
        for (var i = 0; i < Datasource.length; i++) {
            let Code = Datasource[i][Value];
            let Text = Datasource[i][TextField];
            let attrval = Datasource[i][AttrValue];
            let attrval2 = Datasource[i][AttrValue2];
            $('#' + InputID + '').append("<option value=" + Code + " data-" + Attrname + "=" + attrval + "  data-" + Attrname2 + "=" + attrval2 + " >" + Text + "</option>");
        }
    }
    else if (Attrname != "" && Attrname2 != "" && Attrname3 != "") {
        for (var i = 0; i < Datasource.length; i++) {
            let Code = Datasource[i][Value];
            let Text = Datasource[i][TextField];
            let attrval = Datasource[i][AttrValue];
            let attrval2 = Datasource[i][AttrValue2];
            let attrval3 = Datasource[i][AttrValue3];
            $('#' + InputID + '').append("<option value=" + Code + " data-" + Attrname + "=" + attrval + "  data-" + Attrname2 + "=" + attrval2 + "  data-" + Attrname3 + "=" + attrval3 + " >" + Text + "</option>");
        }
    }
    else {
        for (var i = 0; i < Datasource.length; i++) {
            let Code = Datasource[i][Value];
            let Text = Datasource[i][TextField];
            $('#' + InputID + '').append("<option value=" + Code + ">" + Text + "</option>");
        }
    }
}
//function DateFormatddmmyyyy(dateForm: string): string {
//    try {
//        var date: Date = new Date();
//        let myDate: string = "";
//        if (dateForm.indexOf("Date(") > -1) {
//            myDate = dateForm.split('(')[1].split(')')[0];
//            date = new Date(Number(myDate));
//        }
//        else {
//            date = new Date(ConvertTDate(dateForm).toString());
//        }
//        let yy = date.getFullYear();
//        let mm = (date.getMonth() + 1);
//        let dd = date.getDate();
//        let year = yy;
//        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
//        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
//        var startDate = year + "-" + month + "-" + day;
//        let form_date = startDate;
//        return form_date;
//    } catch (e) {
//        return DateFormat((new Date()).toString());
//    }
//}
// Function to convert date to "yyyy-mm-dd" format
function DateFormatddmmyyyy(dateString) {
    // Create a new Date object using the input date string
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }
    // Extract year, month, and day from the Date object
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero indexed, so we add 1
    const day = ('0' + date.getDate()).slice(-2);
    var SysSession = GetYearSession();
    let yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    // Return the formatted date string in "yyyy-mm-dd" format
    return `${yyyy}-${month}-${day}`;
}
function DateFormat(dateForm) {
    try {
        // Create a new Date object using the input date string
        const date = new Date(dateForm);
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }
        // Extract year, month, and day from the Date object
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero indexed, so we add 1
        const day = ('0' + date.getDate()).slice(-2);
        var SysSession = GetYearSession();
        let yyyy = SysSession.CurrentEnvironment.CurrentYear;
        if (Number(yyyy) < Number(date.getFullYear())) {
            return `${yyyy}-12-31`;
        }
        // Return the formatted date string in "yyyy-mm-dd" format
        return `${yyyy}-${month}-${day}`;
    }
    catch (e) {
        //return DateFormat((new Date()).toString());
    }
}
//function DateFormat(dateForm: string): string {
//    try {
//        var date: Date = new Date();
//        let myDate: string = "";
//        if (dateForm.indexOf("Date(") > -1) {
//            myDate = dateForm.split('(')[1].split(')')[0];
//            date = new Date(Number(myDate));
//        }
//        else {
//            date = new Date(dateForm);
//        }
//        let yy = date.getFullYear();
//        let mm = (date.getMonth() + 1);
//        let dd = date.getDate();
//        let year = yy;
//        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
//        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
//        //The specified value "'2018-01-15'" does not conform to the required format, "yyyy-MM-dd".
//        var startDate = year + "-" + month + "-" + day;
//        let form_date = startDate;
//        return form_date;
//    } catch (e) {
//        return DateFormat((new Date()).toString());
//    }
//}
function DateFormatRep(dateForm) {
    try {
        // Create a new Date object using the input date string
        const date = new Date(dateForm);
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }
        // Extract year, month, and day from the Date object
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero indexed, so we add 1
        const day = ('0' + date.getDate()).slice(-2);
        var SysSession = GetYearSession();
        let yyyy = SysSession.CurrentEnvironment.CurrentYear;
        if (Number(yyyy) < Number(date.getFullYear())) {
            return "31/12/" + yyyy;
        }
        // Return the formatted date string in "yyyy-mm-dd" format
        var startDate = day + "/" + month + "/" + yyyy;
        return startDate;
    }
    catch (e) {
        return DateFormatRep((new Date()).toString());
    }
}
function DateFormatSql(dateForm) {
    try {
        // Create a new Date object using the input date string
        const date = new Date(dateForm);
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }
        // Extract year, month, and day from the Date object
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero indexed, so we add 1
        const day = ('0' + date.getDate()).slice(-2);
        var SysSession = GetYearSession();
        let yyyy = SysSession.CurrentEnvironment.CurrentYear;
        if (Number(yyyy) < Number(date.getFullYear())) {
            return yyyy + "-12-31";
        }
        // Return the formatted date string in "yyyy-mm-dd" format  
        var startDate = yyyy + "-" + month + "-" + day;
        return startDate;
    }
    catch (e) {
        return DateFormatRep((new Date()).toString());
    }
}
function GetTime_No_amORpm() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    //var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ':' + minutes;
    let TrTime = strTime;
    return TrTime;
}
function GetTimeNumber() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    //var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ':' + minutes + ':00';
    let TrTime = strTime;
    return TrTime;
}
function GetTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    //var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    let TrTime = strTime;
    return TrTime;
}
function DateTimeFormatRep(dateForm) {
    try {
        var date = new Date();
        let myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();
        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());
        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = year + "-" + month + "-" + day + " " + hour + ":" + Minute + ":" + Second; //+ ":" + Second;
        let form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat((new Date()).toString());
    }
}
function DateTimeFormat2(dateForm) {
    try {
        var date = new Date();
        let myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();
        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());
        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = year + "-" + month + "-" + day + " " + hour + ":" + Minute; //+ ":" + Second;
        let form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat((new Date()).toString());
    }
}
function TimeFormat(dateForm) {
    try {
        var date = new Date();
        let myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var Time = hour + ":" + Minute + ":" + Second;
        return Time;
    }
    catch (e) {
        return "23:59:00";
    }
}
function DateTimeFormat(dateForm) {
    try {
        var date = new Date();
        let myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();
        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());
        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var SysSession = GetYearSession();
        let yyyy = SysSession.CurrentEnvironment.CurrentYear;
        if (Number(yyyy) < Number(date.getFullYear())) {
            return yyyy + "-12-31T" + hour + ":" + Minute; //+ ":" + Second;
        }
        var startDate = yyyy + "-" + month + "-" + day + "T" + hour + ":" + Minute; //+ ":" + Second;
        let form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat((new Date()).toString());
    }
}
function DateStartYear() {
    var dateString = GetDate();
    var yyyy = dateString.substring(0, 4);
    var mm = dateString.substring(5, 7);
    var dd = dateString.substring(8, 10);
    var SysSession = GetYearSession();
    yyyy = SysSession.CurrentEnvironment.CurrentYear;
    var ReturnedDate;
    ReturnedDate = yyyy + '-' + '01' + '-' + '01';
    return ReturnedDate;
}
function DateStartSetMonth(mm) {
    var dateString = GetDate();
    var yyyy = dateString.substring(0, 4);
    var dd = dateString.substring(8, 10);
    var SysSession = GetYearSession();
    yyyy = SysSession.CurrentEnvironment.CurrentYear;
    var ReturnedDate;
    ReturnedDate = yyyy + '-' + mm + '-' + '01';
    return ReturnedDate;
}
function DateStartMonth() {
    var dateString = GetDate();
    var yyyy = dateString.substring(0, 4);
    var mm = dateString.substring(5, 7);
    var dd = dateString.substring(8, 10);
    var SysSession = GetYearSession();
    yyyy = SysSession.CurrentEnvironment.CurrentYear;
    var ReturnedDate;
    ReturnedDate = yyyy + '-' + mm + '-' + '01';
    return ReturnedDate;
}
function ConvertToDateDash(date) {
    try {
        let x = date.split(" ");
        let dt = x[0].split("-");
        let year = dt[0];
        let month = dt[1];
        let day = dt[2];
        var startDate = year + "-" + month + "-" + day + "T00:00:00";
        let form_date = new Date(startDate);
        return form_date;
    }
    catch (e) {
        return (GetCurrentDate());
    }
}
function ConvertToDate(date) {
    try {
        let x = date.split(" ");
        let dt = x[0].split("/");
        let tm = x[1].split(":");
        let st = x[2];
        let day = dt[0];
        let month = dt[1];
        let year = dt[2];
        var hour = tm[0];
        let Minute = tm[1];
        let Second = tm[2];
        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute + ":" + Second;
        let form_date = new Date(startDate);
        return form_date;
    }
    catch (e) {
        return (GetCurrentDate());
    }
}
function DateTimeFormatWithoutT(dateForm) {
    try {
        var date = new Date();
        let myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();
        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());
        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = year + "-" + month + "-" + day + " " + hour + ":" + Minute; //+ ":" + Second;
        let form_date = new Date(startDate);
        return form_date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    }
    catch (e) {
        return DateFormat(new Date().toString());
    }
}
function ConvertTDate(date) {
    try {
        let x = date.split(" ");
        let dt = x[0].split("/");
        let day = dt[0];
        let month = dt[1];
        let year = dt[2];
        var startDate = year + "-" + month + "-" + day;
        let form_date = new Date(startDate);
        return form_date;
    }
    catch (e) {
        return (GetCurrentDate());
    }
}
function ClearGrid(_Grid = new JsGrid(), arr) {
    arr = new Array();
    _Grid.DataSource = arr;
    _Grid.Bind();
}
function HeaderTemplate(headerTitle, element) {
    let tbl = DocumentActions.CreateElement("table");
    tbl.style.width = "100%";
    let headerTr = DocumentActions.CreateElement("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";
    let cellTr = DocumentActions.CreateElement("tr");
    let cell = DocumentActions.CreateElement("td");
    cell.style.textAlign = "center";
    cell.appendChild(element);
    cellTr.appendChild(cell);
    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);
    return tbl;
}
//eslam 25 oct 2020
function HeaderTemplate_ThreeElements(headerTitle, element_1, element_2) {
    let tbl = DocumentActions.CreateElement("table");
    tbl.style.width = "100%";
    let headerTr = DocumentActions.CreateElement("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";
    let cellTr = DocumentActions.CreateElement("tr");
    let cell = DocumentActions.CreateElement("td");
    cell.style.textAlign = "center";
    cell.appendChild(element_1);
    cell.appendChild(element_2);
    cellTr.appendChild(cell);
    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);
    return tbl;
}
class Resources {
}
function CreateElement(typeElement, className, defaultValue, minValue, id, step) {
    typeElement = typeElement.toLocaleLowerCase();
    let element = DocumentActions.CreateElement("input");
    element.className = className;
    element.id = "h_" + id;
    element.type = typeElement;
    element.value = defaultValue;
    element.min = minValue;
    element.step = step;
    return element;
}
//eslam 25 oct 2020
function CreateLabelElement(defaultValue, id) {
    let element = DocumentActions.CreateElement("label");
    element.style.textAlign = "center";
    element.id = id;
    element.innerText = defaultValue;
    return element;
}
function SetSearchControlName(id) {
    $("#SearchControlName").val(id);
}
class CodeDesciptionModel {
}
function WorningMessage(msg_Ar, msg_En, tit_ar = "تنبيه", tit_en = "Worning", OnOk) {
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Ask(msg_Ar, tit_ar, OnOk);
            focus();
            break;
        case "en":
            MessageBox.Ask(msg_En, tit_en, OnOk);
            focus();
            break;
    }
    $('#MessageBoxOk').focus();
}
function WorningMessageOnCancel(msg_Ar, msg_En, tit_ar = "تنبيه", tit_en = "Worning", OnCancel) {
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Ask(msg_Ar, tit_ar, null, OnCancel);
            focus();
            break;
        case "en":
            MessageBox.Ask(msg_En, tit_en, null, OnCancel);
            focus();
            break;
    }
}
function DisplayMassage(msg_Ar, msg_En, msg_type, OnOk) {
    var Env = GetSystemEnvironment();
    // msgtype : 1 : Sucess , 2: Fetal Error , 3: Data Entry Error 
    if (Env.ScreenLanguage == "en")
        $('#Text_Massage').html(msg_En);
    else
        $('#Text_Massage').html(msg_Ar);
    $('#DivMassage').removeClass("display_none");
    if (msg_type == '1') {
        $('#DivMassage .alert-message').attr("Class", "toast align-items-center text-white border-0 alert-message show bg-success");
        $('#DivMassage #icon_Massage').attr("Class", "fas fa-check-circle pe-3");
    }
    else if (msg_type == '2') {
        $('#DivMassage .alert-message').attr("Class", "toast align-items-center text-white border-0 alert-message show bg-danger");
        $('#DivMassage #icon_Massage').attr("Class", "fas fa-times-circle pe-3");
    }
    else if (msg_type == '3') {
        $('#DivMassage .alert-message').attr("Class", "toast align-items-center text-white border-0 alert-message show bg-orange");
        $('#DivMassage #icon_Massage').attr("Class", "fas fa-exclamation-triangle pe-3");
    }
    setTimeout(function () { $('#DivMassage').addClass("display_none"); }, 6000);
}
function DisplayMassageMoreTime(msg_Ar, msg_En, msg_type, OnOk) {
    var Env = GetSystemEnvironment();
    // msgtype : 1 : Sucess , 2: Fetal Error , 3: Data Entry Error 
    if (Env.ScreenLanguage == "en")
        $('#Text_Massage').html(msg_En);
    else
        $('#Text_Massage').html(msg_Ar);
    $('#DivMassage').removeClass("display_none");
    if (msg_type == '1') {
        $('#DivMassage .alert-message').attr("Class", "toast align-items-center text-white border-0 alert-message show bg-success");
        $('#DivMassage #icon_Massage').attr("Class", "fas fa-check-circle pe-3");
    }
    else if (msg_type == '2') {
        $('#DivMassage .alert-message').attr("Class", "toast align-items-center text-white border-0 alert-message show bg-danger");
        $('#DivMassage #icon_Massage').attr("Class", "fas fa-times-circle pe-3");
    }
    else if (msg_type == '3') {
        $('#DivMassage .alert-message').attr("Class", "toast align-items-center text-white border-0 alert-message show bg-orange");
        $('#DivMassage #icon_Massage').attr("Class", "fas fa-exclamation-triangle pe-3");
    }
    setTimeout(function () { $('#DivMassage').addClass("display_none"); }, 8000);
}
function DisplayMassage_Processes(msg_Ar, msg_En, msg_type, OnOk) {
    var Env = GetSystemEnvironment();
    // msgtype : 1 : Sucess , 2: Fetal Error , 3: Data Entry Error 
    $('#Text_Massage').html("");
    if (Env.ScreenLanguage == "en")
        $('#Text_Massage').html(msg_En);
    else
        $('#Text_Massage').html(msg_Ar);
    if (msg_type == '1') {
        $('#DivMassage .alert-message').attr("Class", "toast align-items-center text-white border-0 alert-message show bg-success");
    }
    else if (msg_type == '2') {
        $('#DivMassage .alert-message').attr("Class", "toast align-items-center text-white border-0 alert-message show bg-danger");
    }
    else if (msg_type == '3') {
        $('#DivMassage .alert-message').attr("Class", "toast align-items-center text-white border-0 alert-message show bg-orange");
    }
    setTimeout(function () { $('#DivMassage').addClass("display_none"); }, 6000);
    //if (msg_type == '1') {
    //    $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
    //    $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #5cb702; background-color : #000000 !important	');
    //    $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #5cb702;margin-top: 14px; font-size: 24px; margin-left: 10%; margin-right: 6%;');
    //    setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #5cb702; display: none; '); }, 7000);
    //}
    //else if (msg_type == '2') {
    //    $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
    //    $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; background-color : #000000 !important	');
    //    $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #e41b1b;margin-top: 14px; font-size: 24px; margin-left: 10%;  margin-right: 6%;');
    //    setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; display: none; '); }, 7000);
    //}
    //else if (msg_type == '3') {
    //    $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
    //    $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #f0ad4e; background-color : #000000 !important	');
    //    $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #f0ad4e;margin-top: 14px; font-size: 24px; margin-left: 10%;  margin-right: 6%;');
    //    setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; display: none; '); }, 7000);
    //}
}
function Errorinput(input, TxtMessageEn, TxtMessageAr) {
    var Res = GetGlopelResources();
    try {
        if (TxtMessageEn.trim() != '' /*|| TxtMessageAr.trim() != ''*/) {
            if (Res.Lang == "Ar") {
                ShowMessage("", TxtMessageAr.trim());
            }
            else {
                ShowMessage(TxtMessageEn.trim(), "");
            }
        }
    }
    catch (e) {
    }
    var id = '';
    if (input.selector != null) {
        $('' + input.selector + '').addClass('text_Mandatory');
        $('' + input.selector + '').addClass('animate__animated animate__shakeX');
        $('' + input.selector + '').focus();
        setTimeout(function () { $('' + input.selector + '').removeClass('animate__shakeX'); $('' + input.selector + '').removeClass('text_Mandatory'); }, 5000);
    }
    else {
        try {
            id = input.getAttribute('id');
        }
        catch (e) {
            id = input[0].id;
        }
        $('#' + id + '').addClass('text_Mandatory');
        $('#' + id + '').addClass('animate__animated animate__shakeX');
        $('#' + id + '').focus();
        setTimeout(function () { $('#' + id + '').removeClass('animate__shakeX'); $('#' + id + '').removeClass('text_Mandatory'); }, 5000);
        $('#select2-' + id + '-container').addClass('text_Mandatory');
        $('#select2-' + id + '-container').focus();
        setTimeout(function () { $('#select2-' + id + '-container').removeClass('animate__shakeX'); $('#select2-' + id + '-container').removeClass('text_Mandatory'); }, 5000);
    }
}
function fractionInput(input) {
    var id = '';
    if (input.selector != null) {
        id = input.selector;
    }
    else {
        try {
            id = input.getAttribute('id');
        }
        catch (e) {
            id = input[0].id;
        }
        id = '#' + id + '';
    }
    const inputValue = $('' + id + '').val();
    // Use a regular expression to match the desired format (up to two decimal places)
    const fractionPattern = /^\d+(\.\d{0,2})?$/;
    // Check if the input matches the desired format
    if (inputValue.trim() != "") {
        if (!fractionPattern.test(inputValue)) {
            let NewVal = Number(inputValue).RoundToSt(2);
            $('' + id + '').val(NewVal);
            Errorinput($('' + id + ''));
        }
    }
}
function findIndexInData(data, property, value) {
    var result = -1;
    data.some(function (item, i) {
        if (item[property] === value) {
            result = i;
            return true;
        }
    });
    return result;
}
function ConfirmMessage(msg_Ar = "تمت عملية الحفظ  بنجاح", msg_En = "Data Saved Successfully", tit_ar = "تأكيد", tit_en = "Confirm", OnOk) {
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            break;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            break;
    }
}
function ConfirmMessagee(msg_Ar = "تمت عملية الحفظ  بنجاح", msg_En = "Data Saved Successfully", tit_ar = "تأكيد", tit_en = "Confirm", OnOk) {
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            return 1;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            return 1;
    }
}
function WorningMessageDailog(msg_Ar, msg_En, tit_ar = "تنبيه", tit_en = "Worning", OnOk, OnCancel) {
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Ask(msg_Ar, tit_ar, OnOk, OnCancel);
            break;
        case "en":
            MessageBox.Ask(msg_En, tit_en, OnOk, OnCancel);
            break;
    }
}
//function MessageDailog(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "Worning") {
//     
//    switch (SysSession.CurrentEnvironment.ScreenLanguage) {
//        case "ar":
//            MessageBox.MSgBox(msg_Ar, tit_ar);
//            break;
//        case "en":
//            MessageBox.MSgBox(msg_En, tit_en);
//            break;
//    }
//}
function AddDate(prd, Sdate, count) {
    let Tdate;
    Tdate = Sdate; //new Date();
    switch (prd) {
        case 1: //hours
            Tdate.setHours(Sdate.getHours() + count);
            break;
        case 2: //Days
            Tdate.setDate(Sdate.getDate() + (count - 1));
            break;
        case 3: //week
            Tdate.setDate(Sdate.getDate() + ((7 * count) - 1));
            break;
        case 4: //month
            // Loop from cur month with Qty * Prd times 
            Tdate = Sdate;
            Tdate.setMonth(Tdate.getMonth() + count);
            Tdate.setDate(Tdate.getDate() + -1);
            break;
        case 5: //year
            // add 365 or 366 days 
            Tdate = Sdate;
            Tdate.setFullYear(Tdate.getFullYear() + count);
            Tdate.setDate(Tdate.getDate() + -1);
            break;
    }
    return Tdate;
}
function GetResourceByName(Sourcekey) {
    var result = "";
    Ajax.Callsync({
        url: Url.Action("GetResourceByName", "ClientTools"),
        data: { key: Sourcekey },
        success: (d) => {
            result = d.result;
        }
    });
    return result;
}
function GetResourceList(Sourcekey) {
    var result = Ajax.Call({
        url: Url.Action("GetResourceNames", "ClientTools"),
        data: { _prefix: Sourcekey },
        success: (d) => {
            result = JSON.parse(d.result);
        }
    });
    return result;
}
function GetCurrentDate() {
    //  
    let ses = GetSystemEnvironment();
    let kControl = ses.I_Control;
    if (kControl != undefined) {
        var now = new Date;
        var utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        utc.setHours(utc.getHours() + kControl.UserTimeZoneUTCDiff);
        return utc;
    }
    else {
        return (new Date());
    }
}
// Doha
function GetLastDayOfMonth(mm) {
    var today = new Date();
    var ReturnedDate;
    var yyyy = today.getFullYear();
    var dd = new Date(yyyy, Number(mm), 0).getDate();
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    if (Number(yyyy) < Number(today.getFullYear())) {
        return yyyy + "-12-31";
    }
    ReturnedDate = yyyy + '-' + mm + '-' + dd;
    return ReturnedDate;
}
function getFirstDayOfCurrentYear() {
    var today = new Date();
    var dd = today.getDate().toString();
    var ReturnedDate;
    var mm = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(mm) < 10) {
        mm = ('0' + mm);
    }
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    ReturnedDate = yyyy + '-01-' + '01';
    return ReturnedDate;
}
function getFirstDayOfCurrentMonth() {
    var today = new Date();
    var dd = today.getDate().toString();
    var ReturnedDate;
    var mm = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(mm) < 10) {
        mm = ('0' + mm);
    }
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    ReturnedDate = yyyy + '-' + mm + '-' + '01';
    return ReturnedDate;
}
function GetDate() {
    var today = new Date();
    var dd = today.getDate().toString();
    var ReturnedDate;
    var mm = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(mm) < 10) {
        mm = ('0' + mm);
    }
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    if (Number(yyyy) < Number(today.getFullYear())) {
        return yyyy + "-12-31";
    }
    ReturnedDate = yyyy + '-' + mm + '-' + dd;
    return ReturnedDate;
}
function GetYear() {
    var today = new Date();
    var ReturnedDate;
    var yyyy = today.getFullYear();
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    return yyyy.toString();
}
function GetDateTime() {
    var today = new Date();
    var dd = today.getDate().toString();
    var ReturnedDate;
    var mm = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(mm) < 10) {
        mm = ('0' + mm);
    }
    ReturnedDate = yyyy + '-' + mm + '-' + dd;
    var datetime = ReturnedDate + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return datetime;
}
function GetDateAndTime() {
    return new Date().toISOString().slice(0, 19);
    //var today: Date = new Date();
    //var dd: string = today.getDate().toString();
    //var ReturnedDate: string;
    //var M: string = (today.getMonth() + 1).toString();
    //var yyyy = today.getFullYear();
    //if (Number(dd) < 10) {
    //	dd = ('0' + dd);
    //}
    //if (Number(M) < 10) {
    //	M = ('0' + M);
    //}
    //var HH = today.getHours();
    //var MM = today.getMinutes();
    //var SS = today.getSeconds();
    //ReturnedDate = dd + '/' + M + '/' + yyyy + ' ' + HH + ':' + MM + ':' + SS;
    //return ReturnedDate;
}
//function GetTime() {
//	var date2 = new Date();
//	date2.toTimeString()
//	return date2
//}
function GetDateAndTimeSql() {
    var today = new Date();
    var dd = today.getDate().toString();
    var ReturnedDate;
    var M = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(M) < 10) {
        M = ('0' + M);
    }
    var HH = today.getHours().toString();
    var MM = today.getMinutes().toString();
    var SS = today.getSeconds().toString();
    if (Number(HH) < 10) {
        HH = ('0' + HH);
    }
    if (Number(MM) < 10) {
        MM = ('0' + MM);
    }
    if (Number(SS) < 10) {
        SS = ('0' + SS);
    }
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    if (Number(yyyy) < Number(today.getFullYear())) {
        return yyyy + '-12-31T' + HH + ':' + MM + ':' + SS;
    }
    //ReturnedDate = dd + '/' + M + '/' + yyyy + ' ' + HH + ':' + MM + ':' + SS;
    ReturnedDate = yyyy + '-' + M + '-' + dd + 'T' + HH + ':' + MM + ':' + SS;
    return ReturnedDate;
}
function GetDateAndTimeBakup() {
    var today = new Date();
    var dd = today.getDate().toString();
    var ReturnedDate;
    var M = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(M) < 10) {
        M = ('0' + M);
    }
    var HH = today.getHours();
    var MM = today.getMinutes();
    var SS = today.getSeconds();
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    //ReturnedDate = dd + '/' + M + '/' + yyyy + ' ' + HH + ':' + MM + ':' + SS;
    ReturnedDate = yyyy + '_' + M + '_' + dd + '_______' + HH + '_' + MM + '_' + SS;
    return ReturnedDate;
}
function GetDateAndTimeNew() {
    var today = new Date();
    var dd = today.getDate().toString();
    var ReturnedDate;
    var M = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(M) < 10) {
        M = ('0' + M);
    }
    var d = new Date();
    var hour = d.getHours();
    var MM = d.getMinutes().toString();
    var fulltime = "";
    // create a 24 elements(0-23) array containing following values
    var arrayHrs = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    // since getMinutes() returns 0 to 9 for upto 9 minutes, not 00 to 09, we can do this
    if (MM < '10') {
        MM = "0" + MM.toString();
    }
    if (hour < 12) {
        // Just for an example, if hour = 11 and minute = 29
        fulltime = arrayHrs[hour] + ":" + MM + " AM"; // fulltime = 11:29 AM
    }
    else {
        // similarly, if hour = 22 and minute = 8
        fulltime = arrayHrs[hour] + ":" + MM + " PM"; // fulltime = 10:08 PM
    }
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    ReturnedDate = dd + '/' + M + '/' + yyyy + ' ' + fulltime;
    return ReturnedDate;
}
function CreateDropdownList(arr, Name_Ar, Name_En, Key, IsSelectNull = false) {
    var Env = GetSystemEnvironment();
    let element = document.createElement("select");
    element.className = "form-control input-sm";
    if (IsSelectNull == true)
        element.options.add(new Option(" ", "null"));
    switch (Env.Language) {
        case "ar":
            for (var item of arr) {
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var item of arr) {
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
    return element;
}
//eslam elassal 20 oct 2020 => CreateDropdownListWithDefaultValue(K_D_ExpensesDataSource, "DescA", "DescE", "ExpenseID", "اختر",true);s
function CreateDropdownListWithDefaultValue(arr, Name_Ar, Name_En, Key, DefaultVal, IsSelectNull = false) {
    var Env = GetSystemEnvironment();
    let element = document.createElement("select");
    element.className = "form-control input-sm";
    if (IsSelectNull == true)
        element.options.add(new Option(DefaultVal, "null"));
    switch (Env.Language) {
        case "ar":
            for (var item of arr) {
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var item of arr) {
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
    return element;
}
//function CreateListMaleFemale(): HTMLSelectElement {
//    var offDay = [
//        {
//            Name_Ar: "ولد",
//            Name_En: "Male",
//            Id: 1
//        },
//        {
//            Name_Ar: "بنت",
//            Name_En: "Female",
//            Id: 0
//        },
//    ];
//    let element = document.createElement("select") as HTMLSelectElement;
//    element.className = "form-control input-sm";
//    switch (SharedWork.Session.Language) {
//        case "ar":
//            for (var item of offDay) {
//                element.options.add(new Option(item.Name_Ar, item.Id.toString()));
//            }
//            break;
//        case "en":
//            for (var item of offDay) {
//                element.options.add(new Option(item.Name_En, item.Id.toString()));
//            }
//            break;
//    }
//    return element;
//}
function OpenPopUp(moduleCode, PopupBody, PopupDialog) {
    let json = Ajax.Callsync({
        type: "GET",
        url: "OpenView",
        data: { ModuleCode: moduleCode },
        cache: false,
        async: false,
        success: function (response) {
            $("#" + PopupBody).html(response);
            //$("#PopupDialog").modal("show");
            $("#" + PopupDialog).modal('show');
            $("#" + PopupDialog).modal({
                refresh: true
            });
            //var val = $("#rpTitle").text();
            //$("#TitleSpanRep").html(val);
        }
    });
}
//to be validated  in insert / update all trnasacations 
function CheckDate(TrDate, StDt, EdDt) {
    //// 
    var check = Date.parse(TrDate);
    var from = Date.parse(StDt);
    var to = Date.parse(EdDt);
    if ((check <= to && check >= from))
        return (true);
    else
        return false;
}
function ThousandsSeparator(num) {
    let numAsString = num.toString();
    let characters = numAsString.split("").reverse();
    let parts = [];
    for (let i = 0; i < characters.length; i += 3) {
        let part = characters.slice(i, i + 3).reverse().join("");
        parts.unshift(part);
    }
    return parts.join(",");
}
function convertToH(date) {
    var sys = new SystemTools();
    var HDate = "";
    if (date != "")
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SystemTools", "GetHDate"),
            data: { GDate: date },
            success: (d) => {
                let result = d;
                HDate = result;
            }
        });
    return HDate;
}
function convertToG(date) {
    var sys = new SystemTools();
    var result = null;
    if (date != "")
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Tools", "GetGDate"),
            data: { HDate: date },
            success: (d) => {
                result = d;
                //GDate = result;
                //  ;
            }
        });
    return result;
}
//function CheckTime() {
//    try {
//        var SysSession = GetSystemEnvironment();
//        var timelogin;
//        var dt = new Date();
//        var timenow = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
//        var LastAccess = localStorage.getItem(GetParameterByName('App') + "LastAccess");
//        var SysTimeOut = localStorage.getItem(GetParameterByName('App') + "startTimeOut");
//        timelogin = LastAccess
//        var timeout = CompareTime(timenow, timelogin);
//        localStorage.setItem(GetParameterByName('App') + "LastAccess", timenow)
//        var newSysTimeOut;
//        try {
//            if (SysSession.I_Control[0].SysTimeOut == null) {
//                newSysTimeOut = 10;
//            }
//            else {
//                newSysTimeOut = SysSession.I_Control[0].SysTimeOut;
//            }
//        } catch (e) {
//            newSysTimeOut = 10;
//        }
//        if (timeout > newSysTimeOut || timeout < 0)
//            MessageBox.Show("لقد استنفذت وقت الجلسة، يجب معاودة الدخول مرة اخري ", "System Time out , Please relogin ", function () {
//                document.cookie = "Inv1_systemProperties=" + null + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
//                //document.cookie = "Inv1_Privilage=" + null + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
//                //document.cookie = "Privilage=" + null + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
//                window.location.href = "/Login/HomePage";
//            }), 1000;
//    } catch (e) {
//    }
//}
function daysDifference(dateI1, dateI2) {
    //define two date object variables to store the date values
    var date1 = new Date(dateI1);
    var date2 = new Date(dateI2);
    //calculate time difference
    var time_difference = date2.getTime() - date1.getTime();
    //calculate days difference by dividing total milliseconds in a day
    var result = time_difference / (1000 * 60 * 60 * 24);
    return parseInt(result.toString());
}
function addDaysOrMonth(date, days, Month) {
    var result = new Date(date);
    days != 0 ? result.setDate(result.getDate() + days) : days = 0;
    Month != 0 ? result.setMonth(result.getMonth() + Month) : Month = 0;
    var today = result;
    var dd = today.getDate().toString();
    var ReturnedDate;
    var mm = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(mm) < 10) {
        mm = ('0' + mm);
    }
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    ReturnedDate = yyyy + '-' + mm + '-' + dd;
    return ReturnedDate;
}
function CompareTime(t1, t2) {
    // add days 
    //// ;
    var h1 = Number(t1.slice(0, 2));
    var m1 = Number(t1.slice(3, 5));
    var h2 = Number(t2.slice(0, 2));
    var m2 = Number(t2.slice(3, 5));
    var h3 = (h1 - h2) * 60 + (m1 - m2);
    return h3;
}
function Cheak_UserTokenlog() {
    var SysSession = GetSystemEnvironment();
    let compCode = SysSession.CompCode;
    let branchCode = SysSession.BranchCode;
    let userCode = SysSession.UserCode;
    let sys = new SystemTools;
    Ajax.Callsync({
        type: "GET",
        url: sys.apiUrl("G_USERS", "Cheak_UserTokenlog"),
        data: { user: userCode, compcode: compCode, Branch_Code: branchCode, Token: "HGFD-" + SysSession.Token },
        success: (d) => {
            if (d == false) {
                //alert("تم تسجيل الخروج من النظام اعد التسجيل مره اخري")
                DisplayMassage("تم تسجيل الخروج من النظام اعد التسجيل مره اخري", "You logout from the system, Login again", MessageType.Error);
                localStorage.setItem(GetParameterByName('App') + "OutUesr", "0");
                document.cookie = "Inv1_systemProperties=" + null + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                document.cookie = "Inv1_Privilage=" + null + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                document.cookie = "Privilage=" + null + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                window.open(Url.Action("HomePage", "Login"), "_self");
                $('#GetIPAddress').val("");
                return;
            }
        }
    });
}
;
function dynamicSortNew(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (b, a) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
function printDiv(divName) {
    $('#' + divName).attr('style', 'width: 377px;');
    //var printContents = document.getElementById(divName).innerHTML;
    //var originalContents = document.body.innerHTML; 
    //document.body.innerHTML = printContents;
    //window.print();
    //document.body.innerHTML = originalContents;
    var sOption = "toolbar=no,location=no,directories=yes,menubar=no,";
    sOption += "scrollbars=yes,width=775,height=600,left=10,top=25";
    var mywindow = window.open('', 'PRINT', sOption);
    mywindow.document.write(document.getElementById(divName).innerHTML);
    //document.getElementById('header').style.display = 'none';
    //document.getElementById('footer').style.display = 'none';
    //mywindow.document.styl
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/ 
    mywindow.pageXOffset; // necessary for IE >= 10*/ 
    mywindow.history.back();
    mywindow.onload = function () {
        mywindow.moveTo(0, 0);
        mywindow.resizeTo(640, 480);
    };
    mywindow.print();
    mywindow.close();
    setTimeout(function () {
        $('#' + divName).attr('style', '');
    }, 200);
}
function PrintInvSlip(divId) {
    // الحصول على محتوى القسم المطلوب طباعته
    var content = document.getElementById(divId).outerHTML;
    var sOption = "toolbar=no,location=no,directories=yes,menubar=no,";
    sOption += "scrollbars=yes,width=775,height=600,left=10,top=25";
    var printWindow = window.open('', 'PRINT', sOption);
    // فتح نافذة جديدة للطباعة
    //var printWindow = window.open('', '_blank', 'width=800,height=600');
    // إضافة أنماط CSS الأساسية للطباعة
    printWindow.document.open();
    printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Invoice</title>
                        <style>
                            body { font-family: Arial, sans-serif; direction: rtl; text-align: right; }
                            .invoice { width: 100%; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; } 
                        </style>
						   <style>
     

       .invoice {
           position: fixed;
           bottom: 0;
           <!-- left: -400px; -->
           width: 300px;
           height: 100%;
           background-color: white;
           box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
           overflow-y: auto;
           transition: left 0.3s ease;
           padding: 20px;
       }

           .invoice.open {
               left: 0;
           }

           .invoice h2 {
               text-align: center;
               color: #007bff;
           }

       .invoice-item {
           display: flex;
           justify-content: space-between;
           margin: -3px 0;
           border-bottom: 2px solid black;
           margin-bottom: 0px;
           padding: 10px;
       }

           .invoice-item span {
               width: 40%;
           }

           .invoice-item .total {
               font-weight: bold;
           }

  

   </style>
       
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }

        #invoice {
            width: 400px;
            margin: 30px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            direction: rtl;
            text-align: right;
        }

        /* شعار الشركة */
        #company-logo {
            text-align: center;
            margin-bottom: 10px;
        }

            #company-logo img {
                max-width: 80px;
                border-radius: 8px;
            }

        /* عنوان الفاتورة */
        #invoice-title {
            text-align: center;
            color: #007BFF;
            font-size: 22px;
            margin-bottom: 10px;
        }

        /* معلومات الفاتورة */
        #invoice-details {
            font-size: 14px;
            color: #555;
            margin-bottom: 10px;
            line-height: 1.6;
        }

        /* العناصر */
        .invoice-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 0;
            border-bottom: 1px solid #ddd;
            font-size: 16px;
        }

            .invoice-item span {
                font-weight: bold;
            }

        /* تحسين عرض السعر والكمية */
        .item-details {
            font-size: 15px;
            color: #555;
            margin-top: 4px;
        }

            .item-details span {
                /*     display: inline-block;
                    margin-left: 5px;
                    color: #000;
                    font-weight: bold;
                    font-size: 18px; /* تكبير السعر والكمية */
                color: #000;
                font-weight: bold;
                font-size: 18px;
            }

        .total-per-item {
            font-size: 16px;
            color: #007BFF;
            font-weight: bold;
        }

        /* الإجماليات */
        .invoice-item.total {
            font-size: 18px;
            font-weight: bold;
            color: #000;
        }

        #invoice-cart-total, #invoice-total {
            color: #007BFF;
            font-size: 18px; /* تكبير الإجمالي */
        }

        /* ترحيب بالعميل */
        #customer-greeting {
            font-size: 14px;
            color: #333;
            text-align: center;
            margin-top: 15px;
        }

        /* اسم المنشئ */
        #creator-name {
            font-size: 12px;
            color: #555;
            text-align: left;
            margin-top: 10px;
        }

        /* أرقام الشركة */
        #company-contact {
            font-size: 12px;
            color: #999;
            text-align: center;
            margin-top: 15px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }

        /* QR Code */
        #qr-code {
            text-align: center;
            margin-top: 20px;
        }

            #qr-code img {
                width: 100px;
                height: 100px;
            }
    </style>
                    </head>
                    <body>
                        ${content}
                    </body>
                </html>
            `);
    printWindow.document.close(); // necessary for IE >= 10
    printWindow.focus(); // necessary for IE >= 10*/ 
    printWindow.pageXOffset; // necessary for IE >= 10*/ 
    printWindow.history.back();
    printWindow.onload = function () {
        printWindow.moveTo(0, 0);
        printWindow.resizeTo(640, 480);
    };
    printWindow.print();
    printWindow.close();
}
function PrintInvSlipVer3(divId) {
    const targetDiv = document.getElementById(divId);
    if (!targetDiv) {
        alert("العنصر غير موجود!");
        return;
    }
    // إنشاء إطار مخفي للطباعة
    const printFrame = document.createElement("iframe");
    printFrame.style.position = "absolute";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "none";
    document.body.appendChild(printFrame);
    // كتابة المحتوى داخل `iframe`
    const doc = printFrame.contentWindow.document;
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html lang="ar">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Print Invoice</title>
            <style>
                body { font-family: Arial, sans-serif; direction: rtl; text-align: right; margin: 0; padding: 10px; }
                .invoice { width: 100%; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; }
                img { max-width: 100%; height: auto; }
            </style>
            <style>
                .invoice {
                    position: relative;
                    width: 300px;
                    height: auto;
                    background-color: white;
                    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
                    overflow-y: auto;
                    transition: left 0.3s ease;
                    padding: 20px;
                }
                .invoice h2 { text-align: center; color: #007bff; }
                .invoice-item {
                    display: flex;
                    justify-content: space-between;
                    margin: -3px 0;
                    border-bottom: 2px solid black;
                    margin-bottom: 0px;
                    padding: 10px;
                }
                .invoice-item span { width: 40%; }
                .invoice-item .total { font-weight: bold; }
            </style>
            <style>
                #invoice {
                    width: 400px;
                    margin: 30px auto;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    direction: rtl;
                    text-align: right;
                }
                #company-logo { text-align: center; margin-bottom: 10px; }
                #company-logo img { max-width: 80px; border-radius: 8px; }
                #invoice-title {
                    text-align: center;
                    color: #007BFF;
                    font-size: 22px;
                    margin-bottom: 10px;
                }
                #invoice-details {
                    font-size: 14px;
                    color: #555;
                    margin-bottom: 10px;
                    line-height: 1.6;
                }
                .invoice-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #ddd;
                    font-size: 16px;
                }
                .invoice-item span { font-weight: bold; }
                .item-details {
                    font-size: 15px;
                    color: #555;
                    margin-top: 4px;
                }
                .item-details span {
                    color: #000;
                    font-weight: bold;
                    font-size: 18px;
                }
                .total-per-item { font-size: 16px; color: #007BFF; font-weight: bold; }
                .invoice-item.total {
                    font-size: 18px;
                    font-weight: bold;
                    color: #000;
                }
                #invoice-cart-total, #invoice-total {
                    color: #007BFF;
                    font-size: 18px;
                }
                #customer-greeting {
                    font-size: 14px;
                    color: #333;
                    text-align: center;
                    margin-top: 15px;
                }
                #creator-name {
                    font-size: 12px;
                    color: #555;
                    text-align: left;
                    margin-top: 10px;
                }
                #company-contact {
                    font-size: 12px;
                    color: #999;
                    text-align: center;
                    margin-top: 15px;
                    border-top: 1px solid #ddd;
                    padding-top: 10px;
                }
                #qr-code {
                    text-align: center;
                    margin-top: 20px;
                }
                #qr-code img { width: 100px; height: 100px; }
            </style>
        </head>
        <body>
            <div class="invoice">${targetDiv.innerHTML}</div>
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => { window.close(); }, 500);
                };
            </script>
        </body>
        </html>
    `);
    doc.close();
    // ضمان الطباعة بعد تحميل `iframe`
    printFrame.onload = function () {
        printFrame.contentWindow.focus();
    };
}
function PrintDivNew(divName) {
    // تعيين عرض العنصر للطباعة بشكل مناسب
    const targetDiv = document.getElementById(divName);
    targetDiv.style.width = '377px'; // عرض مخصص للطباعة
    // فتح نافذة جديدة للطباعة
    const sOption = "toolbar=no,location=no,directories=no,menubar=no," +
        "scrollbars=yes,width=640,height=480,left=10,top=25";
    const mywindow = window.open('', '_blank', sOption);
    // إضافة محتوى الـ div في نافذة الطباعة
    mywindow.document.write(`
        <html>
        <head>
            <title>Print</title>
            <style>
                /* أسلوب الطباعة: نسخة طبق الأصل */
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                    }
                    #${divName} {
                        width: 377px; /* عرض ثابت */
                        margin: 0 auto; /* توسيط */
                        font-size: 12px; /* حجم خط صغير */
                    }
                    img {
                        max-width: 100%; /* الحفاظ على نسبة الصور */
                        height: auto;
                    }
                }
                /* تنسيق الشاشة */
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                }
            </style>
        </head>
        <body>
            ${targetDiv.outerHTML} <!-- إدراج HTML الخاص بالـ div -->
        </body>
        </html>
    `);
    // إغلاق المستند وتحميل نافذة الطباعة
    mywindow.document.close();
    mywindow.focus();
    // الطباعة
    mywindow.print();
    // إغلاق نافذة الطباعة
    mywindow.close();
    // استعادة التنسيقات الأصلية بعد الطباعة
    setTimeout(() => {
        targetDiv.style.width = ''; // إزالة العرض المؤقت
    }, 200);
}
function DateSetsSccess(TxtDateProcesses, TxtDatefrom, TxtDateend) {
    let DateProcesses = $('#' + TxtDateProcesses + '').val();
    let Datefrom = $('#' + TxtDatefrom + '').val();
    let Dateend = $('#' + TxtDateend + '').val();
    var check = Date.parse(DateProcesses);
    var from = Date.parse(Datefrom);
    var End = Date.parse(Dateend);
    if ((check < from)) {
        $('#' + TxtDatefrom + '').val(DateProcesses);
    }
    else {
        $('#' + TxtDatefrom + '').val(Datefrom);
    }
    if ((check > End)) {
        $('#' + TxtDateend + '').val(DateProcesses);
    }
    else {
        $('#' + TxtDateend + '').val(Dateend);
    }
}
function OnClick_Tree() {
    $('span').on('click', function () {
        //let ul = $(this).attr("href");
        //alert($('' + ul + '').attr("class"))
        let expanded = $(this).attr("aria-expanded");
        if (expanded == 'false') {
            $(this).attr("aria-expanded", "true");
            $(this).attr("class", "sign");
            let data_i = $(this).attr("data_i");
            let ul = $(this).attr("href");
            //alert($('' + ul + '').attr("class"))
            $('#' + data_i + '').attr("class", "fas fa-minus-circle");
            $('' + ul + '').attr("class", "children nav-child unstyled small ---");
            $('' + ul + '').attr("aria-expanded", "true");
            $('' + ul + '').attr("style", "");
        }
        if (expanded == 'true') {
            $(this).attr("aria-expanded", "false");
            $(this).attr("class", "sign");
            let data_i = $(this).attr("data_i");
            let ul = $(this).attr("href");
            $('#' + data_i + '').attr("class", "fas fa-plus-circle");
            $('' + ul + '').attr("class", "children nav-child unstyled small collapse in");
            $('' + ul + '').attr("aria-expanded", "false");
            $('' + ul + '').attr("style", "height: 0px;");
        }
    });
}
function Back() {
    $('#icon-bar').addClass('display_none');
    $('#divIconbar').removeClass('display_none');
    $('#btnPrintTransaction').removeClass('display_none');
    $('#btnUpdate').removeClass('display_none');
    $('#btnBack').addClass('display_none');
    $('#btnSave').addClass('display_none');
    $('#btnPrintslip').removeClass('display_none');
    $('#btnPrintTransaction').removeClass('display_none');
    $("#NewAdd_Falg").val('0');
    $("#Mod_Flag").val('0');
}
function RemoveDisabledToolBar() {
    $('#divIconbar').removeClass('disabledDiv');
}
function DisabledToolBar() {
    $('#divIconbar').addClass('disabledDiv');
}
function Resizable_Table() {
    'use strict';
    var initResizable = function (that) {
        //Deletes the plugin to re-create it
        that.$el.colResizable({ disable: true });
        //Creates the plugin
        that.$el.colResizable({
            liveDrag: that.options.liveDrag,
            fixed: that.options.fixed,
            headerOnly: that.options.headerOnly,
            minWidth: that.options.minWidth,
            hoverCursor: that.options.hoverCursor,
            dragCursor: that.options.dragCursor,
            onResize: that.onResize,
            onDrag: that.options.onResizableDrag
        });
    };
    $.extend($.fn.bootstrapTable.defaults, {
        resizable: false,
        liveDrag: false,
        fixed: true,
        headerOnly: false,
        minWidth: 15,
        hoverCursor: 'e-resize',
        dragCursor: 'e-resize',
        onResizableResize: function (e) {
            return false;
        },
        onResizableDrag: function (e) {
            return false;
        }
    });
    var BootstrapTable = $.fn.bootstrapTable.Constructor, _toggleView = BootstrapTable.prototype.toggleView, _resetView = BootstrapTable.prototype.resetView;
    BootstrapTable.prototype.toggleView = function () {
        _toggleView.apply(this, Array.prototype.slice.apply(arguments));
        if (this.options.resizable && this.options.cardView) {
            //Deletes the plugin
            $(this.$el).colResizable({ disable: true });
        }
    };
    BootstrapTable.prototype.resetView = function () {
        var that = this;
        _resetView.apply(this, Array.prototype.slice.apply(arguments));
        if (this.options.resizable) {
            // because in fitHeader function, we use setTimeout(func, 100);
            setTimeout(function () {
                initResizable(that);
            }, 100);
        }
    };
    BootstrapTable.prototype.onResize = function (e) {
        var that = $(e.currentTarget);
        that.bootstrapTable('resetView');
        that.data('bootstrap.table').options.onResizableResize.apply(e);
    };
    $('[data-toggle="table"]').bootstrapTable();
}
var outUesr = 0;
function CheckTime() {
    var sys = new SystemTools();
    try {
        var CheckLogin = document.getElementById('btnLogin');
        if (CheckLogin != null) {
            return;
        }
        var CheckUesr = sys.SysSession.CurrentEnvironment.UserCode;
    }
    catch (e) {
        outUesr += 1;
        if (outUesr == 2) {
            localStorage.setItem(GetParameterByName('App') + "OutUesr", "1");
            window.open(Url.Action("HomePage", "Login"), "_self");
        }
        return;
    }
}
function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
function PrintsFrom_To(Type_Trans, Name_ID, NameTable, Condation, length) {
    if (length <= 0) {
        MessageBox.Show('لا توجد فواتير ', 'تحزير');
        return;
    }
    if (length > 100) {
        MessageBox.Show('الحد الاقصي لي عدد الفواتير ( 100 )', 'تحزير');
    }
    var SysSession = GetSystemEnvironment();
    let rp = new ReportParameters();
    //$('#btnPrintsFrom_To').attr('style', 'width: 104%;')
    //$('#btnPrintsFrom_To').html('<i class="fa fa-spinner fa-spin lod  Loading" style="font-size: 195%;z-index: 99999;"></i>');
    rp.CompCode = SysSession.CompCode;
    rp.BranchCode = SysSession.BranchCode;
    rp.CompNameA = SysSession.CompanyNameAr;
    rp.CompNameE = SysSession.CompanyName;
    rp.UserCode = SysSession.UserCode;
    rp.Tokenid = SysSession.Token;
    rp.ScreenLanguage = SysSession.ScreenLanguage;
    rp.SystemCode = SysSession.SystemCode;
    rp.SubSystemCode = SysSession.SubSystemCode;
    rp.BraNameA = SysSession.BranchName;
    rp.BraNameE = SysSession.BranchName;
    rp.DocPDFFolder = SysSession.I_Control[0].DocPDFFolder;
    rp.LoginUser = SysSession.UserCode;
    rp.Type_Trans = Type_Trans;
    rp.Name_ID = Name_ID;
    rp.NameTable = NameTable;
    rp.Condation = Condation;
    if (Type_Trans == "AccReceive") {
        rp.Repdesign = 1;
    }
    if (Type_Trans == "AccPayment") {
        rp.Repdesign = 2;
    }
    rp.FinYear = Number(SysSession.CurrentYear);
    $('#btnPrintsFrom_To').attr('style', 'width: 104%;');
    $('#btnPrintsFrom_To').html(' جاري تنزيل الفواتير <span class="glyphicon glyphicon-file"></span>  <i class="fa fa-spinner fa-spin lod  Loading" style="font-size: 195% !important;z-index: 99999;"></i>');
    $('#btnPrintsFrom_To').attr('disabled', 'disabled');
    setTimeout(function () {
        Ajax.CallAsync({
            url: Url.Action("Prnt_From_To", "GeneralRep"),
            data: rp,
            success: (d) => {
                let result = d;
                $('#btnPrintsFrom_To').attr('style', '');
                $('#btnPrintsFrom_To').html(' <span class="glyphicon glyphicon-file"></span>    تنزيل ملف بطباعة الحركة المختارية ');
                $('#btnPrintsFrom_To').removeAttr('disabled');
                //alert(result);
                //
                //window.open(result, "blank");
                let x = Url.Action("OpenPdfS", "Home");
                let UrlPdf = x + "/" + "?" + "path=" + result + "";
                window.open(UrlPdf, "blank");
                return result;
            }
        });
    }, 150);
    return '';
}
function GetSerialNumber() {
    Ajax.Callsync({
        type: "GET",
        url: Url.Action("GetSerialNumber", "Home"),
        success: (d) => {
            let result = d;
            return result;
        }
    });
    return "";
}
function isDateValidInYear(dateString, year) {
    const date = new Date(dateString);
    // Check if the date is valid
    const isValidDate = /*!isNaN(date) &&*/ date.toString() !== "Invalid Date" && date.toISOString().slice(0, 10) === dateString;
    // Check if the year matches
    const isValidYear = date.getFullYear() === year;
    // Check if the date falls within the valid range of the year
    const isValidDateInYear = date.getFullYear() === year && date.getMonth() < 12 && date.getDate() <= new Date(year, date.getMonth() + 1, 0).getDate();
    return isValidDate && isValidYear && isValidDateInYear;
}
function SendInv_to_Cust(data_New) {
    var SysSession = GetSystemEnvironment();
    data_New.CompCode = SysSession.CompCode;
    data_New.BranchCode = SysSession.BranchCode;
    data_New.CompNameA = SysSession.CompanyNameAr;
    data_New.CompNameE = SysSession.CompanyName;
    data_New.UserCode = SysSession.UserCode;
    data_New.Tokenid = SysSession.Token;
    data_New.ScreenLanguage = SysSession.ScreenLanguage;
    data_New.SystemCode = SysSession.SystemCode;
    data_New.SubSystemCode = SysSession.SubSystemCode;
    data_New.BraNameA = SysSession.BranchName;
    data_New.BraNameE = SysSession.BranchName;
    data_New.DocPDFFolder = SysSession.I_Control[0].DocPDFFolder;
    data_New.LoginUser = SysSession.UserCode;
    data_New.Send_Pdf = 1;
    if (data_New.BraNameA == null || data_New.BraNameE == null) {
        data_New.BraNameA = " ";
        data_New.BraNameE = " ";
    }
    setTimeout(function () {
        $('#btnSend').attr('style', 'position: fixed;top: auto;bottom: 4px;left: 0%;');
        $('#btnSend').html(' جاري ارسال <span class="glyphicon glyphicon-file"></span>  <i class="fa fa-spinner fa-spin lod  Loading" style="font-size: 195% !important;z-index: 99999;"></i>');
        $('#btnSend').attr('disabled', 'disabled');
    }, 200);
    const baseDocUUID = "" + data_New.TrNo.toString() + "_" + data_New.Module + "" + SysSession.CompCode + "" + SysSession.BranchCode;
    data_New.DocUUID = baseDocUUID;
    //data_New.DocUUID = window.btoa(baseDocUUID);
    //alert(data_New.DocUUID)
    Ajax.CallAsync({
        url: Url.Action("" + data_New.Name_function + "", "GeneralRep"),
        data: data_New,
        success: (d) => {
            let result = d;
            let res = window.btoa("" + result + "");
            //$('#printableArea').html("" + result + "");
            $('#printableArea').html("");
            let x = Url.Action("O", "H");
            //let UrlPdf = x + "/" + "?" + "N=" + res + "";
            let UrlPdf = location.origin + "/" + res + "";
            var index1 = UrlPdf.length;
            if (location.hostname != "localhost") {
                //var index2 = UrlPdf.indexOf('/');
                //UrlPdf = UrlPdf.substring(index2 + 2, index1);
                UrlPdf = UrlPdf.replace('www.', '');
            }
            //else if (true) {
            //    //var index2 = UrlPdf.indexOf('.');
            //    //UrlPdf = UrlPdf.substring(index2 + 1, index1);
            //}
            alert(UrlPdf);
            //UrlPdf = location.protocol +'//'+ UrlPdf
            //alert(UrlPdf);
            SendMessg(Number(SysSession.CompCode), data_New.Title_Mess, UrlPdf, data_New.ContactMobile, data_New.TRId);
            $('#btnSend').attr('style', 'position: fixed;top: auto;bottom: 4px;');
            $('#btnSend').html('<i class="fas fa-file-pdf fa-fw side-icon ms-1"></i> <span class="align-self-center mb-3">  ارسال PDF</span>');
            $('#btnSend').removeAttr('disabled');
            //alert(UrlPdf)
            //alert(window.btoa("/H/O/" + "?" + "N=" + res + ""))
        }
    });
}
function SendMessg(CompCode, HdMsg, DetMsg, ContactMobile, TrID) {
    let sys = new SystemTools;
    Ajax.Callsync({
        type: "Get",
        url: sys.apiUrl("SystemTools", "SendMessage"),
        data: { CompCode: CompCode, HdMsg: HdMsg, DetMsg: DetMsg, ContactMobile: ContactMobile, TrID: TrID },
        success: (d) => {
            let result = d;
            if (result.IsSuccess) {
                let res = result.Response;
                MessageBox.Show(res, "الرساله");
                //alert(res)
            }
        }
    });
}
function PrintTransactionLog(UserCode, compcode, BranchCode, ModuleCode, FinYear, TRId) {
    var sys = new SystemTools();
    Ajax.CallAsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "InsertLog"),
        data: { UserCode: UserCode, compcode: compcode, BranchCode: BranchCode, ModuleCode: ModuleCode, FinYear: FinYear, TRId: TRId },
        success: (response) => {
        }
    });
}
function PrintReportLog(UserCode, compcode, BranchCode, ModuleCode, FinYear) {
    var sys = new SystemTools();
    Ajax.CallAsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "PrintliestLog"),
        data: { UserCode: UserCode, compcode: compcode, BranchCode: BranchCode, FinYear: FinYear, ModuleCode: ModuleCode },
        success: (response) => {
        }
    });
}
function ViewListLog(UserCode, compcode, BranchCode, ModuleCode, FinYear) {
    var sys = new SystemTools();
    Ajax.CallAsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "ViewListLog"),
        data: { UserCode: UserCode, compcode: compcode, BranchCode: BranchCode, FinYear: FinYear, ModuleCode: ModuleCode },
        success: (response) => {
        }
    });
}
function UpdateListLog(UserCode, compcode, BranchCode, ModuleCode, FinYear) {
    var sys = new SystemTools();
    Ajax.CallAsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "UpdateListLog"),
        data: { UserCode: UserCode, compcode: compcode, BranchCode: BranchCode, FinYear: FinYear, ModuleCode: ModuleCode },
        success: (response) => {
        }
    });
}
function PrintReportLogOperation(UserCode, compcode, BranchCode, ModuleCode, FinYear, ExtraData) {
    var sys = new SystemTools();
    Ajax.CallAsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "InsertLogOperation"),
        data: { UserCode: UserCode, compcode: compcode, BranchCode: BranchCode, FinYear: FinYear, ModuleCode: ModuleCode, ExtraData: ExtraData },
        success: (response) => {
        }
    });
}
function OpenScreen(UserCode, compcode, BranchCode, ModuleCode, FinYear) {
    var sys = new SystemTools();
    Ajax.CallAsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "OpenScreenLog"),
        data: { UserCode: UserCode, compcode: compcode, BranchCode: BranchCode, FinYear: FinYear, ModuleCode: ModuleCode },
        success: (response) => {
        }
    });
}
function LoginOpen(UserCode, compcode, BranchCode, ModuleCode, FinYear, InOrOut) {
    var sys = new SystemTools();
    Ajax.CallAsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "LoginOpen"),
        data: { UserCode: UserCode, compcode: compcode, BranchCode: BranchCode, FinYear: FinYear, ModuleCode: ModuleCode, InOrOut: InOrOut },
        success: (response) => {
        }
    });
}
function DoubleClickLog(UserCode, compcode, BranchCode, ModuleCode, FinYear, TRId, TrNo) {
    var sys = new SystemTools();
    Ajax.CallAsync({
        type: "GET",
        url: sys.apiUrl("SystemTools", "InsertLogDoubleClick"),
        data: { UserCode: UserCode, compcode: compcode, BranchCode: BranchCode, ModuleCode: ModuleCode, FinYear: FinYear, TRId: TRId, TrNo: TrNo },
        success: (response) => {
        }
    });
}
function Event_key(key, Nameinput, NameBtnEvent) {
    var input = document.getElementById(Nameinput);
    input.addEventListener("keypress", function (event) {
        if (event.key === key) {
            event.preventDefault();
            document.getElementById(NameBtnEvent).click();
        }
    });
}
function Event_keyAndShiftKey(key, Nameinput, NameBtnEvent) {
    var input = document.getElementById(Nameinput);
    input.addEventListener("keypress", function (event) {
        if (event.shiftKey && event.key === key) {
            event.preventDefault();
            document.getElementById(NameBtnEvent).click();
        }
    });
}
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#' + element).val()).select();
    document.execCommand("copy");
    $temp.remove();
    $('#' + element).focus();
}
function CopyToValue(value) {
    // Create a temporary input element
    const $tempInput = $("<input>");
    // Append the input element to the body
    $("body").append($tempInput);
    // Set the value of the input element
    $tempInput.val(value).select();
    try {
        // Execute the 'copy' command
        document.execCommand("copy");
        // Inform the user (you may replace this with your own notification logic)	    
    }
    catch (err) {
        // Handle the exception, if any
        //console.error("Unable to copy to clipboard", err);
    }
    finally {
        // Remove the temporary input element
        $tempInput.remove();
    }
    ShowMessage('Copy ( ' + value + ' ) ✅', 'نسخ ( ' + value + ' ) ✅');
}
function CopyRowGrid(DataList, Key, value) {
    let flagNewH;
    flagNewH = false;
    let NewModel = new Array();
    for (var i = 0; i < DataList.length; i++) {
        ;
        NewModel.push(DataList[i]);
        if (flagNewH == true) {
            if (NewModel[i].StatusFlag != 'i' && NewModel[i].StatusFlag != 'd' && NewModel[i].StatusFlag != 'm') {
                NewModel[i].StatusFlag = 'u';
            }
        }
        let List = DataList[i];
        if (List[Key] == value) {
            let ModelPur = JSON.parse(JSON.stringify(DataList[i]));
            ModelPur[Key] = Number(DataList.length + 20);
            ModelPur.StatusFlag = 'i';
            NewModel.push(ModelPur);
            flagNewH = true;
        }
    }
    return NewModel;
}
var List_Table = new Array();
var globle_Table = new Array();
function CleaningList_Table() {
    List_Table = new Array();
    globle_Table = new Array();
}
function DataResult(Table) {
    CleaningList_Table();
    let sys = new SystemTools;
    globle_Table = Table;
    //console.log("1")
    //console.log(Table)
    let EncrTable = JSON.parse(JSON.stringify(Table));
    for (var i = 0; i < EncrTable.length; i++) {
        EncrTable[i].Condition = xorEncrypt(EncrTable[i].Condition, KeyToken);
        EncrTable[i].NameTable = xorEncrypt(EncrTable[i].NameTable, KeyToken);
        EncrTable[i].OrderByID = xorEncrypt(EncrTable[i].OrderByID, KeyToken);
        EncrTable[i].SearchValue = xorEncrypt(EncrTable[i].SearchValue, KeyToken);
    }
    console.log(EncrTable);
    try {
        Ajax.Callsync({
            type: "Post",
            url: sys.apiUrl("SystemTools", "Get_TableNew"),
            data: JSON.stringify(EncrTable),
            success: (d) => {
                let result = d;
                if (result.IsSuccess) {
                    List_Table = result.Response;
                    return List_Table;
                }
            }
        });
    }
    catch (e) {
        alert(EncrTable);
        console.log(EncrTable);
    }
    return List_Table;
}
function DataResultPagination(Table) {
    CleaningList_Table();
    let sys = new SystemTools;
    globle_Table = Table;
    let EncrTable = JSON.parse(JSON.stringify(Table));
    for (var i = 0; i < EncrTable.length; i++) {
        EncrTable[i].Condition = xorEncrypt(EncrTable[i].Condition, KeyToken);
        EncrTable[i].NameTable = xorEncrypt(EncrTable[i].NameTable, KeyToken);
        EncrTable[i].OrderByID = xorEncrypt(EncrTable[i].OrderByID, KeyToken);
        EncrTable[i].SearchValue = xorEncrypt(EncrTable[i].SearchValue, KeyToken);
    }
    Ajax.Callsync({
        type: "Post",
        url: sys.apiUrl("SystemTools", "Get_TableNew_Pagination"),
        data: JSON.stringify(EncrTable),
        success: (d) => {
            let result = d;
            if (result.IsSuccess) {
                List_Table = result.Response;
                return List_Table;
            }
        }
    });
    return List_Table;
}
function GetDataTable(NameTable) {
    let table;
    for (var i = 0; i < globle_Table.length; i++) {
        if (globle_Table[i].NameTable == NameTable) {
            table = List_Table[i];
            break;
        }
    }
    return table;
}
function GetDataFromProc(Exec_Stored, ModelStored) {
    var Table;
    Table =
        [
            { NameTable: ModelStored, Condition: Exec_Stored, IsProc: true },
        ];
    DataResult(Table);
    let ListTable = GetDataTable(ModelStored);
    return ListTable;
}
function GetAllData(Table) {
    let sys = new SystemTools;
    let List_Table = new Array();
    Ajax.Callsync({
        type: "Post",
        url: sys.apiUrl("SystemTools", "Get_TableNew"),
        data: JSON.stringify(Table),
        success: (d) => {
            let result = d;
            if (result.IsSuccess) {
                List_Table = result.Response;
                return List_Table;
            }
        }
    });
    return List_Table;
}
function BuildAllFild(dataSource, cnt, NameRow) {
    dataSource = getClass(dataSource.name);
    let properties = Object.getOwnPropertyNames(dataSource);
    let html = ``;
    for (var property of properties) {
        if (document.getElementById(property + cnt) == null) {
            html += `<input id="${property + cnt}" type="hidden" value="" class="form-control "/>`;
        }
        else {
            $("#" + property + cnt).on('change', function () {
                if ($("#StatusFlag" + cnt).val() != "i")
                    $("#StatusFlag" + cnt).val("u");
            });
        }
    }
    $("#" + NameRow + cnt).append(html);
}
function ShowMessage(TxtMessageEn, TxtMessageAr) {
    var Res = GetGlopelResources();
    let Message;
    try {
        if (Res.Lang == "Ar") {
            Message = TxtMessageAr;
        }
        else {
            Message = TxtMessageEn;
        }
    }
    catch (e) {
    }
    const toastContainer = document.getElementById('toastContainer');
    // Create a new toast element
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast');
    toastElement.textContent = Message + ' !';
    // Append the toast element to the container
    toastContainer.appendChild(toastElement);
    // Display the toast using CSS animations
    setTimeout(function () {
        toastElement.style.opacity = '1';
        toastElement.style.transform = 'translateY(0)';
    }, 100);
    // Hide the toast after a delay (adjust as needed)
    setTimeout(function () {
        hideToast(toastElement);
    }, 5000);
}
function hideToast(toastElement) {
    toastElement.style.opacity = '0';
    toastElement.style.transform = 'translateY(100%)';
    // Remove the toast element from the container after the animation ends
    toastElement.addEventListener('transitionend', function () {
        toastElement.remove();
    });
}
function ConvertTo12HourFormat(timeString) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(':');
    // Convert the hours to a number
    let hours12 = parseInt(hours, 10);
    // Determine whether it's AM or PM
    const meridiem = hours12 >= 12 ? 'PM' : 'AM';
    // Convert to 12-hour format
    hours12 = hours12 % 12 || 12;
    // Pad single-digit hours with a leading zero
    const formattedHours = hours12.toString();
    let hoursNew = Number(formattedHours) < 10 ? "0" + formattedHours : formattedHours;
    // Return the formatted time string in 12-hour format
    return `${hoursNew}:${minutes}:${seconds} ${meridiem}`;
}
function GetTimeDifference(targetTime) {
    // Parse the target time string
    const [Convhours, Convminutes, Convseconds] = targetTime.split(':');
    // Convert the hours to a number
    let hours12 = parseInt(Convhours, 10);
    // Convert to 12-hour format
    hours12 = hours12 % 12 || 12;
    // Pad single-digit hours with a leading zero
    const formattedHours = hours12.toString();
    const currentDate = GetTime_No_amORpm();
    const [hoursNow, minutesNow] = currentDate.split(':');
    let hoursLast = Number(hoursNow) - Number(formattedHours);
    let minutesLast = Number(minutesNow) - Number(Convminutes);
    let hoursNew = hoursLast < 10 ? "0" + hoursLast : hoursLast;
    let minute = minutesLast.toString();
    if (minutesLast < 10) {
        minute = '0' + minutesLast;
    }
    return `${hoursNew}:${minute}`;
    //const targetDate: any = new Date();
    //const [targetHours, targetMinutes, targetSeconds] = targetTime.split(':');
    //targetDate.setHours(parseInt(targetHours, 10));
    //targetDate.setMinutes(parseInt(targetMinutes, 10));
    //targetDate.setSeconds(parseInt(targetSeconds, 10));
    //// Get the current time
    //const currentDate: any = new Date();
    //// Calculate the time difference in milliseconds
    //const timeDifference = targetDate - currentDate;
    //// Convert the time difference to hours, minutes, and seconds
    //const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    //const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    //const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    //return `${hours}:${minutes}:${seconds}`; 
}
function CheckDuplicateGrid(Cnt, CountGrid, inputName, StatusInput) {
    for (var i = 0; i < CountGrid; i++) {
        if ($('#' + inputName + '' + i + '').val().trim() == $('#' + inputName + '' + Cnt + '').val().trim() && ($('#' + StatusInput + '' + i + '').val() != "m" && $('#' + StatusInput + '' + i + '').val() != "d") && Cnt != i) {
            $('#' + inputName + '' + Cnt + '').val("");
            $('#' + inputName + '' + i + '').addClass('text_Mandatory');
            $('#' + inputName + '' + Cnt + '').addClass('text_Mandatory');
            $('#' + inputName + '' + Cnt + '').focus();
            setTimeout(function () { $('#' + inputName + '' + i + '').removeClass('text_Mandatory'); $('#' + inputName + '' + Cnt + '').removeClass('text_Mandatory'); }, 500);
            return false;
        }
    }
    return true;
}
function inputError(input) {
    $('#' + input + '').addClass('text_Mandatory');
    $('#' + input + '').focus();
    setTimeout(function () { $('#' + input + '').removeClass('text_Mandatory'); }, 5000);
}
function DisplayBuildControls(dataSource, cnt) {
    let properties = Object.getOwnPropertyNames(dataSource);
    for (var property of properties) {
        $("#" + property + cnt).val(setVal(dataSource[property]));
    }
}
function AssignBuildControls(dataSource, CountGrid) {
    let dataSourceName = getClass(dataSource.name);
    let DetailsModel = new Array();
    let StatusFlag = "StatusFlag";
    let properties = Object.getOwnPropertyNames(dataSourceName);
    for (var i = 0; i < CountGrid; i++) {
        let Model = JSON.parse(JSON.stringify(dataSourceName));
        let Status = $('#' + StatusFlag + i).val();
        if (Status != 'i' && Status != 'u' && Status != 'd') {
            continue;
        }
        for (var property of properties) {
            let NameID = "" + property + "" + i + "";
            let element = document.getElementById(NameID);
            if (element != null) {
                if (element.type == "checkbox")
                    Model[property] = element.checked;
                else
                    Model[property] = setVal(element.value);
            }
        }
        DetailsModel.push(Model);
    }
    return DetailsModel;
}
function Valid_Input(NameId, Message, Type) {
    if (Number(Type) == 1) { //number
        if (Number($("#" + NameId + "").val()) <= 0) {
            Errorinput($("#" + NameId + ""), Message, Message);
            return false;
        }
    }
    else {
        if ($("#" + NameId + "").val().trim() == "") {
            Errorinput($("#" + NameId + ""), Message, Message);
            return false;
        }
    }
    return true;
}
function GetDeviceUUIDSup() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function GetDeviceUUID() {
    let uuid = localStorage.getItem("device_uuid");
    if (!uuid) {
        uuid = GetDeviceUUIDSup();
        localStorage.setItem("device_uuid", uuid);
    }
    return uuid;
}
function getBrowserName() {
    const userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Mozilla Firefox";
    }
    else if (userAgent.indexOf("SamsungBrowser") > -1) {
        browserName = "Samsung Internet";
    }
    else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browserName = "Opera";
    }
    else if (userAgent.indexOf("Trident") > -1) {
        browserName = "Microsoft Internet Explorer";
    }
    else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Microsoft Edge";
    }
    else if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Google Chrome";
    }
    else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Apple Safari";
    }
    else {
        browserName = "unknown";
    }
    return browserName;
}
function getClass(className) {
    if (typeof className !== 'string') {
        throw new Error('Class name must be a string');
    }
    const constructorFunc = window[className];
    if (typeof constructorFunc === 'function') {
        return new constructorFunc();
    }
    else {
        throw new Error('Invalid class name: ' + className);
    }
}
//var getClass = function (className) {
//    var constructorFunc = window[className]
//    if (typeof constructorFunc === 'function') {
//        return new constructorFunc();
//    } else {
//        throw new Error('Invalid class name: ' + className);
//    }
//};
var _AllPages = new Array();
var _AllPagesLogin_Home = new Array();
var ModulesOpenPages = new Array();
var _RoleModule_ = new Array();
var CounterPage = 0;
function GetAllModule() {
    return _AllPages;
}
function Clean_AllPages() {
    _AllPages = new Array();
    _AllPages = [..._AllPagesLogin_Home];
}
function GetModuleCode() {
    try {
        return ModulesOpenPages[ModulesOpenPages.length - 1].ModuleCode.toString();
    }
    catch (e) {
        return "";
    }
}
function GetPrivilegesByModuleCode(ModuleCode) {
    try {
        //let PrivilegsPage = _RoleModule_.filter(x => x.MODULE_CODE == ModuleCode.trim())
        const PrivilegsPage = _RoleModule_
            .filter(x => x.MODULE_CODE === ModuleCode.trim())
            .reduce((max, curr) => (curr.Prc_Preference > max.Prc_Preference ? curr : max));
        if (PrivilegsPage != null) {
            ////console.log(PrivilegsPage)
            return PrivilegsPage;
        }
        let PrivilegPage = new IQ_G_RoleModule();
        return PrivilegPage;
    }
    catch (e) {
        let PrivilegPage = new IQ_G_RoleModule();
        return PrivilegPage;
    }
}
function filterModules(modules, moduleMenu) {
    let filteredModules = new Array();
    const seenCodes = {};
    for (let i = 0; i < modules.length; i++) {
        const item = modules[i];
        if (item.MODULE_MENU.trim().toLowerCase() !== moduleMenu.trim().toLowerCase())
            continue;
        const existingIndex = seenCodes[item.MODULE_CODE];
        if (existingIndex === undefined) {
            filteredModules.push(item);
            seenCodes[item.MODULE_CODE] = filteredModules.length - 1;
        }
        else {
            if (item.Prc_Preference > filteredModules[existingIndex].Prc_Preference) {
                filteredModules[existingIndex] = item;
            }
        }
    }
    filteredModules = filteredModules.sort(dynamicSort("MODULE_SORT"));
    return filteredModules;
}
function ApplyModulesNew(MODULE_MENU) {
    let sys = new SystemTools;
    var SysSession = GetSystemSession();
    _RoleModule_ = new Array();
    let modules = new Array();
    let compCode = SysSession.CurrentEnvironment.CompCode;
    let RoleIds = SysSession.CurrentEnvironment.GQ_USERS.RoleIds;
    let FIN_YEAR = SysSession.CurrentEnvironment.CurrentYear;
    Ajax.Callsync({
        type: "GET",
        url: sys.apiUrl("Home", "GetAllUserPrivilageNew"),
        async: false,
        data: { CompCode: compCode, RoleIds: RoleIds, NameFolder: 'DataTable', FIN_YEAR: FIN_YEAR },
        success: (d) => {
            let Privilage_Pages = d;
            modules = Privilage_Pages.UserPrivilege;
            modules = modules.sort(dynamicSort("MODULE_SORT"));
            _RoleModule_ = modules;
            let Pages = JSON.parse(Privilage_Pages.AllPages);
            _AllPages = [..._AllPagesLogin_Home, ...Pages];
        }
    });
    modules = filterModules(modules, MODULE_MENU);
    let NumShowPage = 0;
    $('#Div_Menus_' + CounterPage).html("");
    for (let i = 0, len = modules.length; i < len; i++) { // Cache the length of the array
        const singleUserModule = modules[i]; // Use `const` for singleUserModule
        if (MODULE_MENU.trim() != "") {
            if (singleUserModule.MODULE_MENU.trim().toLowerCase() != MODULE_MENU.trim().toLowerCase()) {
                NumShowPage++;
                if (modules.length == NumShowPage) {
                    CounterPage = CounterPage - 1;
                    OpenPagePartial("NotFound", "", null, null, true);
                }
                continue;
            }
            else {
            }
        }
        try {
            if (singleUserModule.EXECUTE === true && singleUserModule.IS_Show === 1) { // Directly check conditions
                //MODULE_CODE.classList.remove('hidden_Control');
                if (singleUserModule.MODULE_TYPE == "M") {
                    Build_Menu(singleUserModule.MODULE_CODE, singleUserModule.MODULE_DESCA, singleUserModule.MODULE_DESCE, singleUserModule.Url_Image);
                }
                else {
                    Build_Tap_Page(singleUserModule.MODULE_CODE, singleUserModule.MODULE_DESCA, singleUserModule.MODULE_DESCE, singleUserModule.Url_Image);
                }
            }
        }
        catch (e) {
            // Handle error if necessary
        }
    }
}
function Build_Menu(MODULE_CODE, MODULE_DESCA, MODULE_DESCE, Url_Image) {
    var Res = GetGlopelResources();
    let Name = Res.Lang == "Ar" ? MODULE_DESCA : MODULE_DESCE;
    let Meun = ` <div id="${MODULE_CODE}"   namescreen="${Name}" class="_MODULE_CODE  animate__animated  u-align-center u-container-style u-list-item u-radius-20 u-repeater-item u-shape-round u-video-cover u-white u-list-item-2" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
                    <div class="u-container-layout u-similar-container u-container-layout-2">
                        <img class="u-expanded-width u-image u-image-round u-radius-20 u-image-2" src="${Url_Image}" alt="" data-image-width="444" data-image-height="444">
                        <h6 class="u-hover-feature u-text u-text-1">${Name}</h6>
                    </div>
                </div>
                `;
    $('#Div_Menus_' + CounterPage).append(Meun);
    $('#' + MODULE_CODE).click(function (e) {
        //alert(MODULE_CODE)
        let scrollTop = $(document).scrollTop();
        localStorage.setItem(GetParameterByName('App') + "scrollTop_" + CounterPage, scrollTop.toString());
        //-******************
        let _idBtn = $(this).attr('id');
        if (_idBtn != "Profile") {
            //let _NameScreen = $(this).attr('NameScreen');
            let NameMenu = $(this).attr('NameMenu');
            let _NameScreen = $('#' + _idBtn + ' h6').html();
            $('.Layout_Home').removeClass('display_none');
            localStorage.setItem(GetParameterByName('App') + "NameMenu", _idBtn);
            //alert("PagesInMenu_" + (CounterPage + 1))
            OpenPagePartial("PagesInMenu_" + (CounterPage + 1), _NameScreen, null, null, true);
        }
        else {
            OpenPagePartial("Profile", "", null, null, true);
        }
    });
}
function ApplyModules_Page_In_MENU(MODULE_MENU) {
    let Modules_Menu = filterModules(_RoleModule_, MODULE_MENU);
    let NumShowPage = 0;
    $('#Div_Menus_' + CounterPage).html("");
    if (Modules_Menu.length == 0) {
        CounterPage = CounterPage - 1;
        OpenPagePartial("NotFound", "", null, null, true);
    }
    for (let i = 0, len = Modules_Menu.length; i < len; i++) { // Cache the length of the array
        const singleUserModule = Modules_Menu[i]; // Use `const` for singleUserModule
        if (MODULE_MENU.trim() != "") {
            if (singleUserModule.MODULE_MENU.trim().toLowerCase() != MODULE_MENU.trim().toLowerCase()) {
                NumShowPage++;
                if (Modules_Menu.length == NumShowPage) {
                    CounterPage = CounterPage - 1;
                    OpenPagePartial("NotFound", "", null, null, true);
                }
                continue;
            }
            else {
            }
        }
        try {
            if (singleUserModule.EXECUTE === true && singleUserModule.IS_Show === 1) { // Directly check conditions
                //MODULE_CODE.classList.remove('hidden_Control');
                if (singleUserModule.MODULE_TYPE == "M") {
                    Build_Menu(singleUserModule.MODULE_CODE, singleUserModule.MODULE_DESCA, singleUserModule.MODULE_DESCE, singleUserModule.Url_Image);
                }
                else {
                    Build_Tap_Page(singleUserModule.MODULE_CODE, singleUserModule.MODULE_DESCA, singleUserModule.MODULE_DESCE, singleUserModule.Url_Image);
                }
            }
        }
        catch (e) {
            // Handle error if necessary
        }
    }
}
function Build_Tap_Page(MODULE_CODE, MODULE_DESCA, MODULE_DESCE, Url_Image) {
    var Res = GetGlopelResources();
    let Name = Res.Lang == "Ar" ? MODULE_DESCA : MODULE_DESCE;
    let Meun = ` <div id="${MODULE_CODE}"   namescreen="${Name}" class="_MODULE_CODE  animate__animated  u-align-center u-container-style u-list-item u-radius-20 u-repeater-item u-shape-round u-video-cover u-white u-list-item-2" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
                    <div class="u-container-layout u-similar-container u-container-layout-2">
                        <img class="u-expanded-width u-image u-image-round u-radius-20 u-image-2" src="${Url_Image}" alt="" data-image-width="444" data-image-height="444">
                        <h6 class="u-hover-feature u-text u-text-1">${Name}</h6>
                    </div>
                </div>
                `;
    $('#Div_Menus_' + CounterPage).append(Meun);
    $('#' + MODULE_CODE).click(function (e) {
        let scrollTop = $(document).scrollTop();
        localStorage.setItem(GetParameterByName('App') + "scrollTop_" + CounterPage, scrollTop.toString());
        //-******************
        let _idBtn = $(this).attr('id');
        //let _NameScreen = $(this).attr('NameScreen');
        let _NameScreen = $('#' + _idBtn + ' h6').html();
        $('.Layout_Home').removeClass('display_none');
        OpenPagePartial(_idBtn, _NameScreen, null, null, true);
    });
}
function GetPagesLogin_Home() {
    Clean_AllPages();
    $.ajax({
        url: Url.Action("GetPagesLogin_Home", "Home"),
        type: 'GET',
        success: function (htmlContent) {
            _AllPagesLogin_Home = new Array();
            _AllPagesLogin_Home = JSON.parse(htmlContent);
            // Display the HTML content in a container element
            //$('.Layout_Home').addClass('display_none');
            _AllPages = [..._AllPagesLogin_Home];
            //window.location.hash = "Login";
            window.location.hash = `module=Login`;
            OpenPage("Login");
        },
        error: function (xhr, status, error) {
            //console.error('Error fetching HTML:', error);
        }
    });
}
function GetPages_Home() {
    Clean_AllPages();
    Show_Loder();
    //$('#htmlContainer').html("");
    $('#DivLang').addClass('display_none');
    $('#GnrLang').attr('style', '    background-color: #d27f7f;');
    OpenPage("HomeLoder");
    setTimeout(function () {
        $.ajax({
            url: Url.Action("GetPagesLogin_Home", "Home"),
            type: 'GET',
            success: function (htmlContent) {
                _AllPagesLogin_Home = new Array();
                _AllPagesLogin_Home = JSON.parse(htmlContent);
                // Display the HTML content in a container element
                //$('.Layout_Home').addClass('display_none');
                _AllPages = [..._AllPagesLogin_Home];
                OpenPage("Home");
                $('#DivLang').removeClass('display_none');
                $('#DivLang').attr('style', 'opacity: 0.8;top: 15px !important;position: absolute;');
                Close_Loder();
            },
            error: function (xhr, status, error) {
                Close_Loder();
                //console.error('Error fetching HTML:', error);
                Close_Loder();
            }
        });
    }, 1);
}
function GetAllPages() {
    $.ajax({
        url: Url.Action("GetAllView", "Home"),
        type: 'GET',
        success: function (htmlContent) {
            _AllPages = new Array();
            _AllPages = JSON.parse(htmlContent);
            // Display the HTML content in a container element
            //$('.Layout_Home').addClass('display_none');
            OpenPage("Login");
        },
        error: function (xhr, status, error) {
            //console.error('Error fetching HTML:', error);
        }
    });
}
function OpenPage(moduleCode) {
    Show_Loder();
    let Page = _AllPages.filter(x => x.ModuleCode == moduleCode);
    if (Page.length > 0) {
        DefSearchIDGnr(moduleCode);
        DefGridDownloadExcel(moduleCode);
        let htmlContainer = document.getElementById("htmlContainer");
        // Set HTML content and show the container
        $('#htmlContainer').html(Page[0].Page_Html).removeClass("display_none");
        // Remove loading class from button
        $('._Loding').removeClass('Btn_Loder');
        // Style the logout button
        $('#btn_Logout').css({
            "will-change": "transform, opacity",
            "animation-duration": "1000ms"
        });
        // Hide the back button
        $('#Back_Page').addClass("display_none");
        // Scroll to top
        $(window).scrollTop(0);
        var SysSession = GetYearSession();
        window.history.replaceState(null, "", "");
        // Log user activity if necessary
        if (moduleCode != "HomeLoder" && moduleCode != "Login") {
            window.history.replaceState(null, "", "?Comp=" + SysSession.CurrentEnvironment.CompCode + " " + '?App=' + new Date().getTime());
            LogUser("تم فتح شاشة (" + moduleCode + ")", TypeLog.OpenPage);
        }
        // Update URL hash
        //window.location.hash = moduleCode;
        //window.location.hash = SysSession.CurrentEnvironment.CurrentYear;
        window.location.hash = `module=${moduleCode}&year=${SysSession.CurrentEnvironment.CurrentYear}`;
    }
    else {
        Close_Loder();
        ShowMessage("No Privilage", "لا يوجد صلاحية");
    }
}
function OpenPagePartial(moduleCode, NamePage, OnDisplay_Back1, OnDisplay_Back2, IsHome = false) {
    Show_Loder();
    var Res = GetGlopelResources();
    setTimeout(function () {
        let Page = _AllPages.filter(x => x.ModuleCode == moduleCode);
        if (Page.length > 0) {
            DefSearchIDGnr(moduleCode);
            DefGridDownloadExcel(moduleCode);
            CounterPage++;
            let _OpenPages = new OpenPages();
            _OpenPages.ModuleCode = moduleCode;
            ModulesOpenPages.push(_OpenPages);
            Set_Refresh(moduleCode);
            // Prepare UI
            $('#btn_Logout').css({
                "will-change": "transform, opacity",
                "animation-duration": "1000ms",
                "visibility": "hidden"
            });
            $('#htmlContainer, .Page_Partial').addClass("display_none");
            let $partialPage = $('#Partial_' + CounterPage);
            $partialPage.html(Page[0].Page_Html).removeClass("display_none animate__animated animate__pulse");
            //$partialPage.append('<script src="/ClientApp/JsGrid.js"></script>')
            //$partialPage.append('<script src = "/Scripts/jsgrid/jsgrid.js" > </script>')
            //$partialPage.append('<script src="/Scripts/DataTables/jquery.dataTables.min.js"></script>')
            $('#div_jsgrid_Script').html("");
            //$('#div_jsgrid_Script').append('<script src="/ClientApp/JsGrid.js"></script>');
            //$('#div_jsgrid_Script').append('<script src="/ClientApp/StGrid/StGrid.js"></script>');
            $('#div_jsgrid_Script').append('<script src = "/Scripts/jsgrid/jsgrid.js" > </script>');
            $('#div_jsgrid_Script').append('<script src="/Scripts/DataTables/jquery.dataTables.min.js"></script>');
            setTimeout(function () {
                $partialPage.removeClass('animate__animated animate__pulse');
            }, 800);
            $('#Back_Page').removeClass("display_none");
            if (moduleCode != 'Profile') {
                if (IsHome) {
                    $('#Lab_NamePage').html(`${NamePage}<span style="font-weight: 700;">
                <span style="font-weight: 400;"></span>
			      </span>`);
                }
                else {
                    var TextView = Res.Lang == 'En' ? 'Details' : 'تفاصيل';
                    TextView = TextView + " " + $('#Lab_NamePage').html();
                    $('#Lab_NamePage').html(TextView);
                }
            }
            else {
                var TextView = Res.Lang == 'En' ? 'My Profile' : 'الملف الشخصي';
                $('#Lab_NamePage').html(`${TextView}<span style="font-weight: 700;">
                <span style="font-weight: 400;"></span>
			      </span>`);
            }
            //$('#Lab_NamePage').dblclick(function (e) {
            //    
            //    SqlExecuteQuery("update [dbo].[G_Data_Redis] set Status = 0 ");
            //    ShowMessage("Refresh All Data  😊", "تحديث البيانات 😊")
            //});
            localStorage.setItem(GetParameterByName('App') + "Partial_NamePage_" + CounterPage, NamePage);
            $(window).scrollTop(0);
            setupBackButtons(OnDisplay_Back1, OnDisplay_Back2);
            var SysSession = GetYearSession();
            //window.location.hash = moduleCode;
            //window.location.hash = SysSession.CurrentEnvironment.CurrentYear;
            window.location.hash = `module=${moduleCode}&year=${SysSession.CurrentEnvironment.CurrentYear}`;
            if (moduleCode != "HomeLoder" && moduleCode != "Home") {
                LogUser("تم فتح شاشة (" + moduleCode + ")", TypeLog.OpenPage);
            }
        }
        else {
            Close_Loder();
            ShowMessage("No Privilage", "لا يوجد صلاحية");
        }
    }, 5);
}
function setupBackButtons(OnDisplay_Back1, OnDisplay_Back2) {
    Close_Loder();
    $('#_Btn_Back').html(`
        <a id="Display_Back_Page" class="display_none"></a>
        <a id="Display_Back_Page2" class="display_none"></a>
    `);
    if (OnDisplay_Back1 != null) {
        try {
            OnDisplay_Back1();
            $("#Display_Back_Page").on('click', OnDisplay_Back1);
        }
        catch (e) {
        }
    }
    if (OnDisplay_Back2 != null) {
        try {
            OnDisplay_Back2();
            $("#Display_Back_Page2").on('click', OnDisplay_Back2);
        }
        catch (e) {
        }
    }
}
function Set_Refresh(moduleCode) {
    let btnhtml = `   <a id="Refresh_${moduleCode}" style="" class="Refresh_${moduleCode}">Refresh</a>`;
    $("#Div_Refresh").html(btnhtml);
    setInterval(() => { $(".Refresh_" + moduleCode).click(); }, 12000);
}
function Back_Page_Partial() {
    Close_Loder();
    try {
        var Res = GetGlopelResources();
        HiddenDivSearchID();
        HiddenDivDownload_Excel();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "");
        if (CounterPage == 0) {
            return;
        }
        // Clear the content of the element with ID "Partial_2" 
        $('#Partial_' + CounterPage).html("");
        // Remove all script elements within the element with ID "Partial_2"
        $('#Partial_' + CounterPage + ' script').remove();
        $('.Page_Partial').addClass("display_none");
        $('#htmlContainer').addClass("display_none");
        //$('#btn_Logout').addClass("display_none");
        $('#btn_Logout').attr("style", "will-change: transform, opacity;animation-duration: 1000ms;visibility: hidden;");
        CounterPage--;
        $("#Div_Refresh").html("");
        if (CounterPage == 0) {
            //$('#btn_Logout').removeClass("display_none");
            $('#btn_Logout').attr("style", "will-change: transform, opacity;animation-duration: 1000ms;");
            $('#htmlContainer').removeClass("display_none");
            $('#Back_Page').addClass("display_none");
            var PageHome = Res.Lang == 'En' ? 'Home' : 'الصفحة الرئيسية';
            $('#Lab_NamePage').html(PageHome + `<span style="font-weight: 700;">
                    <span style="font-weight: 400;"></span>
                </span>`);
            //********************************************************************
            $('#_Btn_Back').html('');
            $('#_Btn_Back').append(`<a id="Display_Back_Page"  class="display_none">

                </a>
                <a id="Display_Back_Page2" class="display_none">
                </a>`);
            var SysSession = GetYearSession();
            //console.log(SysSession.CurrentEnvironment.GQ_USERS.Profile_Img)
            if ((SysSession.CurrentEnvironment.GQ_USERS.Profile_Img).trim() != "") {
                Display_image('layout_img_Profile', 'Profile_User', SysSession.CurrentEnvironment.GQ_USERS.Profile_Img.trim());
            }
            //window.location.hash = "Home";
            //window.location.hash = SysSession.CurrentEnvironment.CurrentYear;
            window.location.hash = `module=Home`;
            setTimeout(function () {
                // استرجاع قيمة التمرير المخزنة
                let scrollTop = localStorage.getItem(GetParameterByName('App') + "scrollTop_0");
                if (scrollTop) {
                    window.scrollTo({
                        top: Number(scrollTop),
                        behavior: "smooth" // يجعل النزول سلسًا
                    });
                }
            }, 100);
            LogUser("تم رجوع لي شاشة (" + "Home" + ")", TypeLog.BackPage);
        }
        else {
            let _NamePage = localStorage.getItem(GetParameterByName('App') + "Partial_NamePage_" + CounterPage);
            $('#Lab_NamePage').html(`` + _NamePage + `<span style="font-weight: 700;">
                    <span style="font-weight: 400;"></span>
                </span>`);
            $('#Partial_' + CounterPage).removeClass("display_none");
            let _Mod = GetModuleCode();
            ModulesOpenPages = ModulesOpenPages.filter(x => x.ModuleCode != _Mod);
            _Mod = GetModuleCode();
            //window.location.hash = _Mod;
            //window.location.hash = SysSession.CurrentEnvironment.CurrentYear;
            window.location.hash = `module=${_Mod}&year=${SysSession.CurrentEnvironment.CurrentYear}`;
            LogUser("تم رجوع لي شاشة (" + _Mod + ")", TypeLog.BackPage);
            setTimeout(function () {
                // استرجاع قيمة التمرير المخزنة
                let scrollTop = localStorage.getItem(GetParameterByName('App') + "scrollTop_" + CounterPage);
                if (scrollTop) {
                    window.scrollTo({
                        top: Number(scrollTop),
                        behavior: "smooth" // يجعل النزول سلسًا
                    });
                }
            }, 100);
            DefSearchIDGnr(_Mod);
            DefGridDownloadExcel(_Mod);
            Set_Refresh(_Mod);
        }
        //var Env = GetSystemEnvironment();
        var SysSession = GetSystemSession();
        let _USERS = GetGlopelDataUser();
        let _USER = _USERS.filter(x => x.USER_CODE.toLowerCase() == SysSession.CurrentEnvironment.UserCode.toLowerCase());
        try {
            if (setVal(_USER[0].Profile_Img).trim() != "" && localStorage.getItem(GetParameterByName('App') + 'SetProfile') == '1') {
                Display_image('layout_img_Profile', 'Profile_User', _USER[0].Profile_Img.trim());
                localStorage.setItem(GetParameterByName('App') + 'SetProfile', '0');
            }
        }
        catch (e) {
        }
    }
    catch (e) {
    }
}
function GetModelCodeFromUrl() {
    //let mode = window.location.hash.toString();
    //mode = mode.replace("#", "");
    const params = new URLSearchParams(window.location.hash.substring(1));
    const module = params.get('module');
    return module;
}
function Close_Loder() {
    var modal = document.getElementById("myModalLoder");
    modal.style.display = "none";
}
function Show_Loder() {
    var modal = document.getElementById("myModalLoder");
    modal.style.display = "block";
}
function CheckPass(UserCode, Password, USERID) {
    var Table;
    Table =
        [
            { NameTable: 'GQ_USERS', Condition: " USER_CODE = N'" + UserCode + "' and USER_PASSWORD = N'" + Password + "' and  isnull(EmpCode,0) != " + USERID + "" },
        ];
    DataResult(Table);
    let _USER = GetDataTable('GQ_USERS');
    return _USER.length > 0 ? false : true;
}
function SumValue(ListData, Key, FractionDigits) {
    const SumValues = ListData.reduce((total, obj) => total + obj[Key], 0);
    if (FractionDigits > 0) {
        return Digits(SumValues, FractionDigits);
    }
    else {
        return SumValues.toString();
    }
}
function Digits(_number, FractionDigits) {
    if (_number == null) {
        _number = 0;
    }
    if (FractionDigits > 0) {
        return _number.toLocaleString('en-US', { maximumFractionDigits: FractionDigits });
    }
    else {
        return _number.toLocaleString('en-US', { maximumFractionDigits: 1 });
    }
}
var GlopelUSERSControl = new Array();
var GlopelUSERS = new Array();
var GlopelProfile = new Array();
var GlopelResources;
var GlopelModelProfile = new GQ_USERS();
var GlopelModel;
function SetGlopelDataUserControl(Send_USERS) {
    GlopelUSERSControl = Send_USERS;
}
function GetGlopelDataUserControl() {
    return GlopelUSERSControl;
}
function SetGlopelDataUser(Send_USERS) {
    GlopelUSERS = Send_USERS;
}
function GetGlopelDataUser() {
    return GlopelUSERS;
}
function SetModelGlopel(Send_Model) {
    GlopelModel = Send_Model;
}
function GetModelGlopel() {
    return GlopelModel;
}
function SetGlopelDataProfile(Send_Profile) {
    GlopelProfile = Send_Profile;
}
function GetGlopelDataProfile() {
    return GlopelProfile;
}
function SetModelGlopelDataProfile(Send_ModelProfile) {
    GlopelModelProfile = Send_ModelProfile;
}
function GetModelGlopelDataProfile() {
    return GlopelModelProfile;
}
function SetGlopelResources(Send_G_Resources) {
    GlopelResources = Send_G_Resources;
}
function GetGlopelResources() {
    return GlopelResources;
}
function UpdateInvStatus(_InvoiceID, SlsManID, Status, StatusDesc, OnSuccess) {
    let sys = new SystemTools;
    var Env = GetSystemEnvironment();
    //var SysSession: SystemSession = GetSystemSession();
    Ajax.CallsyncSave({
        type: "Get",
        url: sys.apiUrl("SlsInvoice", "UpdateInvStatus"),
        data: { CompCode: Env.CompCode, BranchCode: Env.BranchCode, InvoiceID: _InvoiceID, SlsManID: SlsManID, Status: Status, UserCode: Env.UserCode, StatusDesc: StatusDesc },
        success: (d) => {
            let result = d;
            if (result.IsSuccess == true) {
                if (Status < 0) {
                    Status = 0;
                }
                $("._clearSta").removeClass("is-active");
                $("#View_Status" + Status).addClass("is-active");
                ShowMessage('Updated ✅', 'تم التحديث ✅');
                OnSuccess();
                return;
                Close_Loder();
            }
            else {
                Close_Loder();
            }
        }
    });
}
function PrintTable(ID_Table) {
    var table = document.getElementById(ID_Table);
    var newWin = window.open('', '_blank');
    // Build the HTML content for the new window
    newWin.document.write('<html><head><title>Print Table</title></head><body>');
    newWin.document.write('<h1>Table Content</h1>');
    newWin.document.write(table.outerHTML);
    newWin.document.write('</body></html>');
    // Close the document
    newWin.document.close();
    // Print the new window
    newWin.print();
}
function GenerateUUID() {
    return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function Upload_image(IdName_View_Img, Name_Folder, Name_Img) {
    $('#Name_Folder').val(Name_Folder);
    if (Name_Img.trim() == "") {
        $("#fileName").val(GenerateUUID());
    }
    else {
        $("#fileName").val(Name_Img);
    }
    $("#fileUploadInput").attr("accept", ".jpg");
    $("#" + IdName_View_Img + "").attr("Name_Img", "");
    $("#" + IdName_View_Img + "").removeClass("_backColor");
    let UrlImg = GetUrlImgCach(Name_Folder, $("#fileName").val());
    $("#UrlImg").val(UrlImg);
    $("#IdName_View_Img").val(IdName_View_Img);
    $('#fileUploadInput').click();
}
function Display_image(IdName_View_Img, Name_Folder, Name_Img) {
    //alert(100)
    $("#" + IdName_View_Img + "").attr('src', "");
    if (Name_Img.trim() == "") {
        return;
    }
    $("#" + IdName_View_Img + "").attr('Name_Img', Name_Img);
    let UrlImg = GetUrlImgCach(Name_Folder, Name_Img);
    $("#" + IdName_View_Img + "").attr('src', UrlImg);
}
function GetUrlImgCach(Name_Folder, Name_Img) {
    //let x = Url.Action("OpenImg", "Home");
    let path = "";
    if (Name_Folder.trim() == "") {
        path = $('#Path_Save').val() + '/' + Name_Img;
    }
    else {
        path = $('#Path_Save').val() + '/' + Name_Folder + '/' + Name_Img;
    }
    //let UrlImg = x + "/" + "?" + "path=" + path + ".jpg";
    // Append a timestamp as a query parameter
    //var timestamp = new Date().getTime();
    //UrlImg += '&timestamp=' + timestamp;
    let UrlImg = path + ".jpg";
    var timestamp = new Date().getTime();
    UrlImg += '?timestamp=' + timestamp;
    //alert(UrlImg)
    return UrlImg;
}
function GetUrlImg(Name_Folder, Name_Img) {
    //let x = Url.Action("OpenImg", "Home");
    let path = "";
    if (Name_Folder.trim() == "") {
        path = $('#Path_Save').val() + '/' + Name_Img;
    }
    else {
        path = $('#Path_Save').val() + '/' + Name_Folder + '/' + Name_Img;
    }
    //let UrlImg = x + "/" + "?" + "path=" + path + ".jpg";
    // Append a timestamp as a query parameter
    //var timestamp = new Date().getTime();
    //UrlImg += '&timestamp=' + timestamp;
    let UrlImg = path + ".jpg";
    //alert(UrlImg)
    return UrlImg;
}
function OpenImg(path) {
    let x = Url.Action("OpenImg", "Home");
    let UrlImg = x + "/" + "?" + "path=" + path;
    //let UrlImg = path + ".jpg";
    window.open(UrlImg, "_blank");
    return UrlImg;
}
function TafkeetArabValue(Amount) {
    let _Amount = "";
    $.ajax({
        url: Url.Action("TafkeetArabValue", "Home"),
        type: 'GET',
        data: { Amount: Amount },
        async: false,
        cache: false,
        success: function (ArabValue) {
            _Amount = ArabValue;
            return _Amount;
        },
        error: function (xhr, status, error) {
            return _Amount;
        }
    });
    return _Amount;
}
function Print_Report(NameReport, NameStord, DataParamter, FromFolder = "", PDFName = "") {
    Show_Loder();
    setTimeout(function () {
        let sys = new SystemTools;
        //if ((PDFName ?? "").trim() == "") {
        //    PDFName = NameReport
        //}
        let x = sys.apiUrl("GeneralReports", "PrintReport");
        let UrlPdf = x + "/" + "?" + "NameStord=" + NameStord + "&NameReport=" + NameReport + "&DataParamter=" + JSON.stringify(DataParamter) + "&FromFolder=" + FromFolder + "&PDFName=" + PDFName;
        ////////console.log(UrlPdf)
        window.open(UrlPdf, "blank");
        LogUser(" تم طباعة تقرير (" + NameReport + ")", TypeLog.ShowReport);
        Close_Loder();
    }, 50);
}
function Print_Report_Excel(Qurey, NameStord, NameExcel, ModelFilds = null) {
    Show_Loder();
    setTimeout(function () {
        let DataRes = GetDataFromProc(Qurey, NameStord);
        ConvertModelToFileExcel(NameExcel, DataRes, ModelFilds);
        Close_Loder();
    }, 50);
}
function ShowBack_PageTap() {
    $('#Back_PageTap').removeClass('display_none');
    $('#Back_Page').addClass('display_none');
}
function ActiveTab(ID_Tab) {
    $('#Back_PageTap').addClass('display_none');
    $('#Back_Page').removeClass('display_none');
    $('.u-active-palette-1-base').attr('class', 'u-active-palette-1-base u-button-style u-grey-10 u-tab-link u-text-active-white u-text-black u-tab-link-1');
    $('.u-active-palette-1-base').attr('aria-selected', 'false');
    $('#' + ID_Tab + '').attr('class', 'u-active-palette-1-base u-button-style u-grey-10 u-tab-link u-text-active-white u-text-black u-tab-link-1 active');
    $('#' + ID_Tab + '').attr('aria-selected', 'true');
    $('.u-container-style').removeClass('u-tab-active');
    $('[aria-labelledby="' + ID_Tab + '"]').addClass('u-tab-active');
    $('[role="tabpanel"]').attr('style', 'display: none;');
    $('[aria-labelledby="' + ID_Tab + '"]').attr('style', 'display: block;');
}
function RemoveHost() {
    $('[onmouseover="S_ssac();"]').remove();
    $('[style="opacity: 0.9; z-index: 2147483647; position: fixed; left: 0px; bottom: 0px; height: 65px; right: 0px; display: block; width: 100%; background-color: #202020; margin: 0px; padding: 0px;"]').remove();
    $('[href="http://somee.com"]').remove();
    setTimeout(function () {
        $('[onmouseover="S_ssac();"]').remove();
        $('[style="opacity: 0.9; z-index: 2147483647; position: fixed; left: 0px; bottom: 0px; height: 65px; right: 0px; display: block; width: 100%; background-color: #202020; margin: 0px; padding: 0px;"]').remove();
        $('[href="http://somee.com"]').remove();
    }, 100);
    setTimeout(function () {
        $('[onmouseover="S_ssac();"]').remove();
        $('[style="opacity: 0.9; z-index: 2147483647; position: fixed; left: 0px; bottom: 0px; height: 65px; right: 0px; display: block; width: 100%; background-color: #202020; margin: 0px; padding: 0px;"]').remove();
        $('[href="http://somee.com"]').remove();
    }, 500);
    setTimeout(function () {
        $('[onmouseover="S_ssac();"]').remove();
        $('[style="opacity: 0.9; z-index: 2147483647; position: fixed; left: 0px; bottom: 0px; height: 65px; right: 0px; display: block; width: 100%; background-color: #202020; margin: 0px; padding: 0px;"]').remove();
        $('[href="http://somee.com"]').remove();
    }, 1000);
    setTimeout(function () {
        $('[onmouseover="S_ssac();"]').remove();
        $('[style="opacity: 0.9; z-index: 2147483647; position: fixed; left: 0px; bottom: 0px; height: 65px; right: 0px; display: block; width: 100%; background-color: #202020; margin: 0px; padding: 0px;"]').remove();
        $('[href="http://somee.com"]').remove();
    }, 5000);
    setTimeout(function () {
        $('[onmouseover="S_ssac();"]').remove();
        $('[style="opacity: 0.9; z-index: 2147483647; position: fixed; left: 0px; bottom: 0px; height: 65px; right: 0px; display: block; width: 100%; background-color: #202020; margin: 0px; padding: 0px;"]').remove();
        $('[href="http://somee.com"]').remove();
    }, 10000);
}
function FillDropDown(dataSource, combo, codeField, textField, NameDefult) {
    if (combo != null) {
        for (let i = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        if (NameDefult != null) {
            combo.add(new Option(NameDefult, null));
        }
        for (let i = 0; i < dataSource.length; i++) {
            let code = dataSource[i][codeField];
            let name = dataSource[i][textField];
            let id = dataSource[i][codeField];
            //var x = true;
            //if (x==true) {
            //    $("#name").attr('id', id);
            //}
            //let test = 
            combo.add(new Option(name, code));
            //
        }
    }
}
function FillDropDownGrid(dataSource, combo, codeField, textField, NameDefult) {
    if (combo != null) {
        for (let i = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        if (NameDefult != null) {
            combo.add(new Option(NameDefult, '-1'));
        }
        for (let i = 0; i < dataSource.length; i++) {
            let code = dataSource[i][codeField];
            let name = dataSource[i][textField];
            let id = dataSource[i][codeField];
            //var x = true;
            //if (x==true) {
            //    $("#name").attr('id', id);
            //}
            //let test = 
            combo.add(new Option(name, code));
            //
        }
    }
}
function HiddenDivSearchID() {
    $("#DivSearchID").addClass('display_none');
    $("#DivSearchBtnID").addClass('display_none');
    $("#IconSearchID").removeClass('display_none');
    $("#IconSearchDeleteID").addClass('display_none');
    $("#DivSearchID").attr('style', 'width: 0px; opacity: 0;');
}
function HiddenDivDownload_Excel() {
    $("#DivDownload_Excel").addClass('display_none');
}
var ListPage;
function DefSearchIDGnr(Module) {
    HiddenDivSearchID();
    var SysSession = GetSystemEnvironment();
    ListPage =
        [
            { Module: 'V_SupervisorProfile', visible: true, NameTableMaster: "GQ_USERS", NameTableDetail: "", NameFieldTrNo: "USERID", NameFieldID: "ID", NameFieldCompCode: "CompCode", NameFieldBranch: "", CustomCond: " and USER_TYPE = 4 " }, // المشرفين             
            { Module: 'V_SalesMenProfile', visible: true, NameTableMaster: "GQ_USERS", NameTableDetail: "", NameFieldTrNo: "USERID", NameFieldID: "ID", NameFieldCompCode: "CompCode", NameFieldBranch: "", CustomCond: " and USER_TYPE = 5 " }, // المنديب             
            { Module: 'EmpControl', visible: true, NameTableMaster: "G_USERS", NameTableDetail: "", NameFieldTrNo: "USERID", NameFieldID: "ID", NameFieldCompCode: "CompCode", NameFieldBranch: "", CustomCond: "" }, // جميع المستخدمين             
            { Module: 'TR_Sales', visible: true, NameTableMaster: "IQ_DisplayAllItemsUnites", NameTableDetail: "", NameFieldTrNo: "QRCode", NameFieldID: "ItemUnitID", NameFieldCompCode: "CompCode", NameFieldBranch: "", CustomCond: "" }, // جميع المستخدمين             
        ];
    ListPage = ListPage.filter(x => x.Module == Module);
    if (ListPage.length > 0) {
        if (ListPage[0].visible == true) {
            $("#DivSearchBtnID").removeClass('display_none');
            setTimeout(function () { $('#txtSearchIDGnr').focus(); $('#txtSearchIDGnr').val(''); }, 1500);
            setTimeout(function () { $('#txtSearchIDGnr').focus(); $('#txtSearchIDGnr').val(''); }, 2000);
            setTimeout(function () {
                document.addEventListener("keydown", function (event) {
                    if (event.ctrlKey && event.shiftKey && event.key === "F") {
                        event.preventDefault();
                        var NameBtnEvent = "IconSearchID";
                        var button = $("#" + NameBtnEvent);
                        if (!button.is(":visible")) { // Check if the button is not visible
                            return;
                        }
                        button.click();
                    }
                });
            }, 2500);
        }
    }
    //////////console.log("ListPage : " +ListPage);
    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.shiftKey && event.key === "F") {
            event.preventDefault();
            var NameBtnEvent = "IconSearchID";
            var button = $("#" + NameBtnEvent);
            if (!button.is(":visible")) { // Check if the button is not visible
                return;
            }
            button.click();
        }
    });
}
function SearchIDGnr(OnRunFunction, CustomCond = "") {
    var SysSession = GetSystemSession();
    $("#SearchIDGnr").html("");
    $("#SearchIDGnr").append('<input type="number" placeholder="   Search : " id="txtSearchIDGnr" name="" class="u-input u-input-rectangle search-TextID" required="">');
    $("#txtSearchIDGnr").on('change', function () {
        if ($("#txtSearchIDGnr").val().trim() == '') {
            return;
        }
        if (ListPage.length == 0) {
            return;
        }
        let TrNo = $("#txtSearchIDGnr").val();
        let NameFieldCompCode = ListPage[0].NameFieldCompCode.trim() == "" ? "" : (ListPage[0].NameFieldCompCode + " = " + SysSession.CurrentEnvironment.CompCode + " and ");
        let NameFieldBranch = ListPage[0].NameFieldBranch.trim() == "" ? "" : (ListPage[0].NameFieldBranch + " = " + SysSession.CurrentEnvironment.BranchCode + " and ");
        let Condition = NameFieldCompCode + NameFieldBranch + ListPage[0].NameFieldTrNo + " = " + TrNo;
        Condition = Condition + ListPage[0].CustomCond + CustomCond;
        /*  alert(Condition)*/
        var Table;
        Table =
            [
                { NameTable: ListPage[0].NameTableMaster, Condition: Condition },
                //{ NameTable: ListPage[0].NameTableDetail, Condition: ListPage[0].NameFieldID + " in ( select " + ListPage[0].NameFieldID + " from  " + ListPage[0].NameTableMaster + " Where " + Condition + " ) " },
            ];
        DataResult(Table);
        let ListMaster = GetDataTable(ListPage[0].NameTableMaster);
        let ListDetail = GetDataTable(ListPage[0].NameTableDetail);
        if (ListMaster.length > 0) {
            ModelSearch.ModelMaster = ListMaster[0];
            ModelSearch.ModelDetail = ListDetail;
            //$('#Loading_Div').html('<span class="loader" style="font-size: 465%;z-index: 99999;"></span>');
            Show_Loder();
            setTimeout(function () {
                OnRunFunction();
                $('#IconSearchDeleteID').click();
                ShowMessage("Done Search ✅", "تم البحث ✅");
                Close_Loder();
                //document.body.scrollTop = 500;
                //document.documentElement.scrollTop = 500;
            }, 100);
        }
        else {
            Errorinput($('#txtSearchIDGnr'), 'Error ID ❌', 'معرف الخطأ ❌');
        }
    });
}
var ListPageExcel;
function DefGridDownloadExcel(Module) {
    HiddenDivDownload_Excel();
    ListPageExcel =
        [
            { Module: 'V_SupervisorProfile', visible: true }, // المشرفين             
            { Module: 'V_SalesMenProfile', visible: true }, // المنديب             
            { Module: 'Money', visible: true }, // جميع الحركات             
            { Module: 'Journal', visible: true }, // سند القيد             
            { Module: 'ViewLogUser', visible: true }, // log User             
            { Module: 'FilterTrans', visible: true }, // جميع الحركات             
            { Module: 'Tax_ViewSales', visible: true },
            { Module: 'ViewPurchases', visible: true },
            { Module: 'EditCustomer', visible: true },
            { Module: 'ViewItems', visible: true },
            { Module: 'ViewPurOrder', visible: true },
            { Module: 'ViewJobOrder', visible: true },
            { Module: 'EditReceipt', visible: true },
            { Module: 'EditSalesMan', visible: true },
            { Module: 'EditSuppliers', visible: true },
            { Module: 'ViewShowPrice', visible: true },
            { Module: 'ViewOutWorks', visible: true },
            { Module: 'ViewFinancial', visible: true },
            { Module: 'ViewDeliveryOrder', visible: true },
        ];
    ListPageExcel = ListPageExcel.filter(x => x.Module == Module);
    if (ListPageExcel.length > 0) {
        if (ListPageExcel[0].visible == true) {
            $("#DivDownload_Excel").removeClass('display_none');
        }
    }
}
function GnrGridDownloadExcel(OnRunFunction) {
    $("#DivDownload_Excel").html('');
    $("#DivDownload_Excel").html('<button id="GnrGridDownloadExcelID" class=" search-button" title="Download Grid To Excel ⏬" style="    background-color: rgb(2 141 31);"><i class="fa fa-file-excel-o"></i></button>');
    $("#GnrGridDownloadExcelID").on('click', function () {
        Show_Loder();
        setTimeout(function () {
            OnRunFunction();
            ShowMessage("Done Download Excel ✅", "تم تنزيل Excel ✅");
            Close_Loder();
        }, 100);
    });
}
function CustomNameFile(NameFile, CustomFild, StrReplace) {
    let LastName = "";
    NameFile = NameFile.replace(StrReplace, "");
    LastName = NameFile + CustomFild + StrReplace;
    return LastName;
}
function DownloadFile(PathFolderDownload) {
    let UrlPdf = location.origin + PathFolderDownload;
    //var filename = "TemplateExcel.xlsx";
    const fileUrl = UrlPdf;
    // Create an anchor element
    const anchor = document.createElement('a');
    // Set the anchor's href attribute to the file URL
    anchor.href = fileUrl;
    // Set the anchor's download attribute to specify the desired file name
    //anchor.download = filename;
    // Programmatically trigger a click event on the anchor element
    anchor.click();
}
function Save_File(NamefileInput, Path, FileName) {
    localStorage.setItem(GetParameterByName('App') + "NamefileInput", NamefileInput);
    localStorage.setItem(GetParameterByName('App') + "Path", Path);
    localStorage.setItem(GetParameterByName('App') + "FileName", FileName);
    $('#SaveFile').click();
}
function GetDataFrom(NameTable, Condition, PageNumber = 0, PageSize = 0, OrderByID = "") {
    var Table;
    Table =
        [
            { NameTable: NameTable, Condition: Condition, IsPage: (PageNumber > 0 ? true : false), PageNumber: PageNumber, PageSize: PageSize, OrderByID: OrderByID },
        ];
    DataResult(Table);
    let ListTable = GetDataTable(NameTable);
    return ListTable;
}
function Bind_data_Search(NameTable, Condition, NameFildID, NameElmentID, NameFildCode, NameElmentCode, NameFildDesc, NameElmentDesc) {
    var Table;
    Table =
        [
            { NameTable: NameTable, Condition: Condition },
        ];
    DataResult(Table);
    let ListTable = GetDataTable(NameTable);
    let model;
    if (ListTable.length > 0) {
        model = ListTable[0];
        $('#' + NameElmentID + '').val(model[NameFildID]);
        $('#' + NameElmentCode + '').val(model[NameFildCode]);
        $('#' + NameElmentDesc + '').val(model[NameFildDesc]);
    }
    return model;
}
function ConvertModelToFileExcel(NameFileSave, ModelExcel, ModelFilds = null) {
    if (ModelFilds == null) {
        DownloadModelToFileExcel(NameFileSave, ModelExcel);
    }
    else {
        try {
            var _Model = CleanModel(ModelExcel, ModelFilds);
            DownloadModelToFileExcel(NameFileSave, _Model);
        }
        catch (e) {
        }
    }
}
function ConvertModelToFileExcelAllData(NameFileSave, NameTable, Condition, ModelFilds = null) {
    let ModelExcel = GetDataFrom(NameTable, Condition);
    if (ModelFilds == null) {
        DownloadModelToFileExcel(NameFileSave, ModelExcel);
    }
    else {
        try {
            var _Model = CleanModel(ModelExcel, ModelFilds);
            DownloadModelToFileExcel(NameFileSave, _Model);
        }
        catch (e) {
        }
    }
}
function DownloadModelToFileExcel(NameFileSave, ModelExcel) {
    LogUser("تم تنزيل اكسل (" + NameFileSave + ") ", TypeLog.DownloadExcel);
    let SendModel = JSON.stringify(ModelExcel);
    $('#SendModelExcel').val(SendModel);
    $('#NameFileSaveExcel').val(NameFileSave);
    $('#GenDownloadExcel').click();
}
function CleanModel(ModelExcel, ModelFields) {
    let Model = KeepOnlySpecifiedFields(ModelExcel, ModelFields);
    return replaceKeysInArray(Model, ModelFields);
}
function KeepOnlySpecifiedFields(arr, keys) {
    return arr.map(obj => {
        let newObj = {};
        Object.keys(keys).forEach(key => {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        });
        return newObj;
    });
}
function replaceKeysInArray(arr, keyMap) {
    return arr.map(obj => {
        let newObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let newKey = keyMap[key] || key; // Use the mapped key or fallback to the original key if no mapping exists
                newObj[newKey] = obj[key];
            }
        }
        return newObj;
    });
}
//function KeepOnlySpecifiedFields(arr, keys) {
//    return arr.map(obj => {
//        let newObj = {};
//        keys.forEach(key => {
//            if (obj.hasOwnProperty(key)) {
//                newObj[key] = obj[key];
//            }
//        });
//        return newObj;
//    });
//}
function ConvertModelToListByFeild(arr, key) {
    const result = {};
    for (const item of arr) {
        const keyValue = String(item[key]);
        result[keyValue] = "";
    }
    const Arra = [];
    Arra.push(result);
    return Arra;
}
function SqlExecuteQuery(Query) {
    var Table;
    Table =
        [
            { NameTable: '', Condition: Query, IsExec: true, IsProc: true },
        ];
    DataResult(Table);
}
function GetAllResourcesOld() {
    var sys = new SystemTools();
    Ajax.Callsync({
        type: "Get",
        url: sys.apiUrl("SystemTools", "GetAllResources"),
        success: (d) => {
            let result = d;
            if (result.IsSuccess == true) {
                let Res = result.Response;
                ////////console.log("AllResources");
                ////////console.log(Res);
                SetGlopelResources(Res);
                RunStyleSheetLang();
                Close_Loder();
            }
            else {
            }
        }
    });
    //let Res: Array<G_Resources> = GetDataFrom("G_Resources", "");
    //SetGlopelResources(Res);
}
function GetAllResourcesByOld(Language) {
    var sys = new SystemTools();
    Ajax.Callsync({
        type: "Get",
        url: sys.apiUrl("SystemTools", "GetAllResourcesBy"),
        data: { Language: Language },
        success: (d) => {
            let result = d;
            if (result.IsSuccess == true) {
                let Res = result.Response;
                ////////console.log("AllResources");
                ////////console.log(Res);
                SetGlopelResources(Res);
                //$('#StylesheetLangLogin').html("");
                RunStyleSheetLang();
                Close_Loder();
            }
            else {
            }
        }
    });
    //let Res: Array<G_Resources> = GetDataFrom("G_Resources", "");
    //SetGlopelResources(Res);
}
function ChangeLang() {
    var sys = new SystemTools();
    GetAllResourcesNew();
    $("#GnrLang").on('click', function () {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SystemTools", "ChangeLanguage"),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    //ShowMessage("Done Change Language 👌");
                    //Close_Loder();
                    var SysSession = GetSystemSession();
                    var Res = GetGlopelResources();
                    if (Res.Lang == 'Ar') {
                        UpdateSettingsDevice("En");
                        //SqlExecuteQuery("update [dbo].[G_USERS] Set  [Language] = 'En' Where  ID = " + SysSession.CurrentEnvironment.GQ_USERS.ID + "")
                    }
                    else {
                        UpdateSettingsDevice("Ar");
                        //SqlExecuteQuery("update [dbo].[G_USERS] Set  [Language] = 'Ar' Where  ID = " + SysSession.CurrentEnvironment.GQ_USERS.ID + "")
                    }
                    location.reload();
                }
                else {
                }
            }
        });
    });
}
function GetAllResourcesNew() {
    let _Language = GetLanguageDevice();
    var sys = new SystemTools();
    Ajax.Callsync({
        type: "Get",
        url: sys.apiUrl("SystemTools", "GetAllResourcesBy"),
        data: { Language: _Language },
        success: (d) => {
            let result = d;
            if (result.IsSuccess == true) {
                let Res = result.Response;
                //var SystemEnv: SystemEnvironment = new SystemEnvironment();
                //SystemEnv.Language = Res.Lang
                //SystemEnv.ScreenLanguage = Res.Lang
                //alert(100)
                //document.cookie = "AlAlamya_systemProperties=" + encodeURIComponent(JSON.stringify(sys.SysSession.CurrentEnvironment).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                //alert(200)
                //////////console.log("AllResources");
                //////////console.log(Res);
                SetGlopelResources(Res);
                //$('#StylesheetLangLogin').html("");
                RunStyleSheetLang();
                Close_Loder();
            }
            else {
            }
        }
    });
    //let Res: Array<G_Resources> = GetDataFrom("G_Resources", "");
    //SetGlopelResources(Res);
}
function GetLanguageDevice() {
    let IdDevice = GetDeviceUUID();
    let DataDevice = GetDataFrom("G_Settings_Device", " ID_Device = N'" + IdDevice + "' ");
    if (DataDevice.length > 0) {
        return DataDevice[0].Language;
    }
    else {
        UpdateSettingsDevice("En");
        return "En";
    }
}
function UpdateSettingsDevice(Lang) {
    var Res = GetGlopelResources();
    let IdDevice = GetDeviceUUID();
    let DeviceType = GetDeviceType();
    let BrowserName = getBrowserName();
    let _Date = GetDateAndTimeSql();
    var Table;
    Table =
        [
            { NameTable: "Delete [dbo].[G_Settings_Device] where ID_Device = N'" + GetDeviceUUID() + "' ", Condition: "", IsExec: true, IsProc: true },
            { NameTable: "INSERT INTO [dbo].[G_Settings_Device]([ID_Device],[Language],[DeviceType],[NameBrowser],[LastDateUpdate]) VALUES(N'" + IdDevice + "',N'" + Lang + "',N'" + DeviceType + "',N'" + BrowserName + "',N'" + _Date + "')", Condition: "", IsExec: true, IsProc: true },
        ];
    DataResult(Table);
}
function RunStyleSheetLang() {
    var Res = GetGlopelResources();
    if (Res.Lang == 'Ar') {
        $('#carousel_47a3').attr('style', 'direction: rtl;');
        $('#StylesheetLangAr').append(' <link href="/NewStyle/nicepageAr.css" rel="stylesheet" />');
        $('#StylesheetLangAr').append(' <link href="/NewStyle/HomeAr.css" rel="stylesheet" />');
        $('#StylesheetLangAr').append(' <link href="/NewStyle/css/bootstrapAr.min.css" rel="stylesheet" />');
        $('#StylesheetLangAr').append(' <link href="/NewStyle/StyleAr.css" rel="stylesheet" />');
        $('#StylesheetLangLogin').append(' <link rel="stylesheet" href="/NewStyle/Login/Login_StyleAr.css">');
        setTimeout(function () {
            $('#StylesheetLangEn').html("");
        }, 1000);
    }
    else {
        $('#carousel_47a3').attr('style', 'direction: ltr;');
        $('#StylesheetLangEn').append(' <link href="/NewStyle/nicepage.css" rel="stylesheet" />');
        $('#StylesheetLangEn').append(' <link href="/NewStyle/HomeEn.css" rel="stylesheet" />');
        $('#StylesheetLangEn').append(' <link href="/NewStyle/css/bootstrapEn.min.css" rel="stylesheet" />');
        $('#StylesheetLangEn').append(' <link href="/NewStyle/StyleEn.css" rel="stylesheet" />');
        $('#StylesheetLangLogin').append(' <link rel="stylesheet" href="/NewStyle/Login/Login_Style.css">');
        //$('#StylesheetLangAr').html(""); 
        setTimeout(function () {
            $('#StylesheetLangAr').html("");
        }, 1000);
    }
}
//function Res(Key: string): string {
//    //let AllRes: Array<G_Resources> = GetGlopelResources();
//    //let _Res = AllRes.filter(x => x.KeyRes.toLowerCase() == Key.toLowerCase())
//    //let Name = Key;
//    //if (_Res.length > 0) {
//    //    Name = _Res[0].NameResAr;
//    //}
//    //return Name;
//}
//**************************************************Log User*********************************************
function GetDeviceType() {
    let Type = $('#TxtDeviceType').val();
    // Default to unknown
    return Type;
}
function LogUser(DataLogUser, Mode = "", CodeRun = "", IsSuccess = true) {
    var SysSession = GetSystemSession();
    let WriteInsertLogUser = document.getElementById("WriteInsertLogUser");
    let CompCode = SysSession.CurrentEnvironment.CompCode;
    let USERID = SysSession.CurrentEnvironment.GQ_USERS.ID;
    let TransID = 0;
    let TrType = GetModelCodeFromUrl();
    let Remarks = DataLogUser;
    let _Date = GetDateAndTimeSql();
    let IsSuc = 0;
    if (IsSuccess) {
        IsSuc = 1;
    }
    let FormatDataSql = "(" + CompCode + "," + USERID + "," + TransID + ",N'" + TrType + "',N'" + Mode + "',N'" + Remarks + "',N'" + _Date + "'," + IsSuc + ",N'" + GetDeviceUUID() + "',N'" + GetDeviceType() + "',N'" + getBrowserName() + "',N'" + CodeRun + "')";
    if (WriteInsertLogUser.innerHTML.trim() == "") {
        WriteInsertLogUser.append("INSERT INTO [dbo].[G_Log_User] ([CompCode],[UserID],[TransID],[TrType],[Mode],[Remarks],[Date],[IsSuccess],[ID_Device],[DeviceType],[NameBrowser],[CodeRun]) VALUES");
        //WriteInsertLogUser.textContent += "\n"// Add a newline if the textarea is not empty
        WriteInsertLogUser.append(FormatDataSql); // Add a newline if the textarea is not empty
    }
    else {
        //WriteInsertLogUser.textContent += "\\n"; // Add a newline if the textarea is not empty
        //WriteInsertLogUser.textContent += "," + FormatDataSql;
        WriteInsertLogUser.append("," + FormatDataSql);
    }
}
function RunInsertLogUser() {
    //var WriteLogUser = $('#WriteInsertLogUser').html();
    //// Data to send to the server
    //const data = JSON.stringify({ DataSend: JSON.stringify({ DataLogUser: WriteLogUser }) })
    //const blob = new Blob([data], { type: 'application/json' });
    //// Use navigator.sendBeacon for asynchronous sending
    //const url = location.origin + '/Home/InsertLogUser'; // Replace with your actual API endpoint
    //navigator.sendBeacon(url, blob);
    //$('#WriteInsertLogUser').html("");
}
function Run_Trigger() {
    //var Query = " exec G_Run_Job_UpdateAccount ";
    //// Data to send to the server
    //const data = JSON.stringify({ DataSend: JSON.stringify({ DataLogUser: Query }) })
    //const blob = new Blob([data], { type: 'application/json' });
    //// Use navigator.sendBeacon for asynchronous sending
    //const url = location.origin + '/Home/Run_Trigger'; // Replace with your actual API endpoint
    //navigator.sendBeacon(url, blob);
}
// دالة للتحقق من التكرار
function checkDuplicateData(data, NameField) {
    const serialMap = {};
    const duplicates = [];
    data.forEach(item => {
        const fieldValue = item[NameField]; // الحصول على قيمة الحقل الديناميكية
        if (serialMap[fieldValue]) {
            duplicates.push(item); // إذا كانت القيمة مكررة، أضف العنصر إلى قائمة التكرارات
        }
        else {
            serialMap[fieldValue] = true; // إذا لم تكن مكررة، سجل القيمة
        }
    });
    return duplicates;
}
function SendEmail(ToEmail, subject, body, OnSuccess) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    let CompCode = SysSession.CurrentEnvironment.CompCode;
    Ajax.Callsync({
        type: "Get",
        url: sys.apiUrl("SendMail", "SendEmail"),
        data: { ToEmail: ToEmail, subject: subject, body: body, CompCode: CompCode }, //string ToEmail, string subject, string body
        success: (d) => {
            let result = d;
            _BaseResponse._BaseResponse = result;
            OnSuccess();
        }
    });
}
function GetRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function ChackMailGmail(Email) {
    var gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (gmailRegex.test(Email.trim())) {
        return true;
    }
    else {
        return false;
    }
}
function ChackMailGmailInSql(Email, OldEmail) {
    Email = Email.trim();
    if (OldEmail != null) {
        OldEmail = OldEmail.trim();
    }
    if (Email == OldEmail) {
        return true;
    }
    var gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (gmailRegex.test(Email.trim())) {
        let ChackMail = GetDataFrom('G_USERS', " [Email] = N'" + Email + "'");
        if (ChackMail.length > 0) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}
var SetTr = {
    Insert: 'Insert',
    Update: 'Update',
    Delete: 'Delete',
};
function UpdateDataBase(Model, TableName, TypeProcss, Query = "", NameClass = "") {
    if (Model == null || TableName.trim() == "" || TypeProcss.trim() == "") {
        return;
    }
    Model = MergeData(Model, Model, "StatusFlag");
    let CallFunction = "";
    let Message = "";
    let _Res = GetGlopelResources();
    if (TypeProcss.toLowerCase().trim() == "insert") {
        CallFunction = "InsertAnyTable";
        Message = _Res.Lang == 'Ar' ? " تم الاضافة 😍" : " Done Insert 😍";
    }
    if (TypeProcss.toLowerCase().trim() == "update") {
        CallFunction = "UpdateAnyTable";
        Message = _Res.Lang == 'Ar' ? " تم التعديل 😍" : " Done Update 😍";
    }
    if (TypeProcss.toLowerCase().trim() == "delete") {
        CallFunction = "DeleteAnyTable";
        Message = _Res.Lang == 'Ar' ? " تم الخذف 😍" : " Done Delete 😍";
    }
    var sys = new SystemTools();
    Ajax.Callsync({
        type: "Post",
        url: sys.apiUrl("SystemTools", CallFunction),
        data: JSON.stringify({ Entity: Model, TableName: TableName.trim(), Query: Query, NameClass: NameClass }),
        success: (d) => {
            let result = d;
            if (result.IsSuccess) {
                //////////console.log(result.Response)
                var Res = result.Response;
                ResultTable.ResReturn = Res.ResultTable;
                ResultTable.ResQuery = Res.ResultQuery;
                ShowMessage(Message, Message);
                return Res;
            }
        }
    });
}
function UpdateListDataBase(TransTable) {
    //var TransTable: Array<TransTable>;
    //TransTable =
    //    [
    //        { TableName: "D_I_Category", TypeTrans: SetTr.Insert, ModelList: ListcatI },
    //        { TableName: "D_I_Category", TypeTrans: SetTr.Update, ModelList: ListcatU },
    //        { TableName: "D_I_Category", TypeTrans: SetTr.Delete, ModelList: ListcatD },
    //    ]
    var sys = new SystemTools();
    Ajax.Callsync({
        type: "Post",
        url: sys.apiUrl("SystemTools", "ProccAnyTableList"),
        data: JSON.stringify({ DataSend: JSON.stringify(TransTable) }),
        success: (d) => {
            let result = d;
            if (result.IsSuccess) {
                //////////console.log(result.Response)
                List_Table = result.Response;
                //////////console.log(List_Table)
                return List_Table;
            }
        }
    });
}
function ActiveBtn(ClassActive, ClassTypeBtn, _this, ClassAnimateOut = "", ClassAnimateIn = "") {
    let IDBtn = _this.id;
    $('.' + ClassTypeBtn + '').removeClass(ClassActive);
    $('#' + IDBtn).attr("Class", " " + ClassTypeBtn + " animate__animated  " + ClassAnimateOut);
    setTimeout(function () {
        $('#' + IDBtn).attr("Class", " " + ClassTypeBtn + " animate__animated   " + ClassAnimateIn);
    }, 250);
    setTimeout(function () {
        $('#' + IDBtn).addClass(ClassActive);
    }, 500);
}
function CreateBarCode(ID) {
    setTimeout(function () {
        $('#numberInput').val(ID);
        $('#btnBarcode').click();
    }, 500);
}
function CreateQRCode(_Text) {
    setTimeout(function () {
        $('#numberInput').val(_Text);
        $('#btnQRCode').click();
    }, 300);
}
function encodeToBase64(text) {
    return btoa(unescape(encodeURIComponent(text)));
}
function decodeFromBase64(base64Text) {
    return decodeURIComponent(escape(atob(base64Text)));
}
function ExtractText(IDDiv) {
    $('#IDExtract').val(IDDiv);
    $('#btnExtractText').click();
}
function formatDateTime(dateTimeStr) {
    let date = new Date(dateTimeStr);
    let formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    return formattedDate.replace(',', ''); // Remove the default comma in US format
}
//***********************************************************Pagination********************************************************
//function GetTotalPages(NameTable: string, Condition: string, PageSize: number): PaginationResult {
//    var sys: SystemTools = new SystemTools();
//    let res: PaginationResult = new PaginationResult();
//    Ajax.Callsync({
//        type: "Get",
//        url: sys.apiUrl("SystemTools", "GetPageNumberFromTable"),
//        data: { NameTable: NameTable, Condition: Condition, PageSize: PageSize },
//        success: (d) => {
//            let result = d as BaseResponse;
//            if (result.IsSuccess == true) {
//                res = result.Response as PaginationResult;
//                if (res != null) {
//                    return res
//                }
//                else {
//                    return res
//                }
//            } else {
//                return res
//            }
//        }
//    });
//    return res
//}
function GetDataFromPagination(NameTable, Condition, currentPage = 0, PageSize = 0, OrderByID = "", SearchValue, ISFrist = true) {
    let _DataTablePaginationResult = new DataTablePaginationResult();
    let ConditionProc = Condition.replace(/'/g, "''");
    if (ISFrist) {
        var Table;
        Table =
            [
                { NameTable: "PaginationResult", Condition: " G_Search_GetPageNumFromTable '" + NameTable + "','" + ConditionProc + "','" + SearchValue + "'," + PageSize + "  ", IsProc: true },
                { NameTable: "PageNumber", Condition: currentPage.toString(), IsProc: true },
                { NameTable: NameTable, Condition: ConditionProc, IsPage: (currentPage > 0 ? true : false), PageNumber: currentPage, PageSize: PageSize, OrderByID: OrderByID, SearchValue: SearchValue },
            ];
        DataResultPagination(Table);
    }
    else {
        var Table;
        Table =
            [
                { NameTable: NameTable, Condition: ConditionProc, IsPage: (currentPage > 0 ? true : false), PageNumber: currentPage, PageSize: PageSize, OrderByID: OrderByID, SearchValue: SearchValue },
            ];
        DataResultPagination(Table);
    }
    _DataTablePaginationResult.DataTable = GetDataTable(NameTable);
    if (!ISFrist) {
        return _DataTablePaginationResult;
    }
    let _PaginationResult = GetDataTable("PaginationResult");
    if (_PaginationResult.length > 0) {
        _DataTablePaginationResult.PaginationResult = _PaginationResult[0];
    }
    return _DataTablePaginationResult;
}
function DisplayStGridByPagination(_JsGrid, NameTable, Condition, currentPage = 1, PageSize = 10, OrderByID = "", SearchValue, IsSearch) {
    let idGrid = _JsGrid.ElementName;
    $("#" + idGrid + "").jsGrid("option", "pageIndex", 1);
    let _DataTableTotalPages = new DataTablePaginationResult();
    _DataTableTotalPages = GetDataFromPagination(NameTable, Condition, currentPage, PageSize, OrderByID, SearchValue);
    ////console.log(_DataTableTotalPages)
    let TotalPages = 1;
    if (_DataTableTotalPages.PaginationResult != null) {
        TotalPages = _DataTableTotalPages.PaginationResult.TotalPages;
        //alert(TotalPages)
        if (TotalPages < currentPage) {
            if (IsSearch) {
                SelectPageNumber.SearchPageNumber = 1;
            }
            else {
                SelectPageNumber.PageNumber = 1;
            }
            currentPage = 1;
        }
    }
    _JsGrid.pageSize = PageSize;
    _JsGrid.DataSource = _DataTableTotalPages.DataTable;
    _JsGrid.Bind();
    //alert(100)
    BiuldPagination(idGrid, TotalPages, currentPage, IsSearch, () => {
        /*    alert(200)*/
        let PageNum = 1;
        if (IsSearch) {
            PageNum = SelectPageNumber.SearchPageNumber;
        }
        else {
            PageNum = SelectPageNumber.PageNumber;
        }
        let _ResData = GetDataFrom(NameTable, Condition, PageNum, PageSize, OrderByID);
        let idGrid = _JsGrid.ElementName;
        $("#" + idGrid + "").jsGrid("option", "pageIndex", 1);
        _JsGrid.pageSize = PageSize;
        _JsGrid.DataSource = _ResData;
        _JsGrid.Bind();
        //alert(300)
    });
}
function DisplayGridByPagination(_JsGrid, NameTable, Condition, currentPage = 1, PageSize = 10, OrderByID = "", IsSearch = false) {
    let idGrid = _JsGrid.ElementName;
    $("#Div_Search_Grid_" + idGrid).remove();
    let _Search = `

        <form id="Div_Search_Grid_${idGrid}" action="https://forms.nicepagesrv.com/v2/form/process" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" style="padding: 10px" source="email" name="form">
            <div class="u-form-email u-form-group u-form-partition-factor-9">
            </div>

            <div class="u-form-group u-form-name u-form-partition-factor-6" style="width: 218px;">
                <label for="" class="u-label u-text-grey-40">Search</label>
                <input type="text" placeholder="Search" id="${idGrid}_SearchGrid" name="date" class="u-input u-input-rectangle"  >
            </div>
             


            <div class="u-form-group u-form-name u-form-partition-factor-6" style="width: 162px;">
                <label for="" class="u-label u-text-grey-40"> </label>
                <a id="btnSearchGrid_${idGrid}"   class="Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle Grid-search_Pages">🔍</a>

            </div> 
        </form> 
 `;
    $('#' + idGrid + '').before(_Search);
    DisplayDirectPagination(_JsGrid, NameTable, Condition, currentPage, PageSize, OrderByID, IsSearch);
    $('#btnSearchGrid_' + idGrid).click(function (e) {
        DisplayDirectPagination(_JsGrid, NameTable, Condition, currentPage, PageSize, OrderByID, IsSearch);
    });
    $('#' + idGrid + '_SearchGrid').on('change', function () {
        DisplayDirectPagination(_JsGrid, NameTable, Condition, currentPage, PageSize, OrderByID, IsSearch);
    });
    Event_key('Enter', `${idGrid}_SearchGrid`, 'btnSearchGrid_' + idGrid);
}
function DisplayDirectPagination(_JsGrid, NameTable, Condition, currentPage = 1, PageSize = 10, OrderByID = "", IsSearch = false) {
    let idGrid = _JsGrid.ElementName;
    $("#" + idGrid + "").jsGrid("option", "pageIndex", 1);
    let SearchValue = $("#" + idGrid + "_SearchGrid").val().trim();
    let _DataTableTotalPages = new DataTablePaginationResult();
    _DataTableTotalPages = GetDataFromPagination(NameTable, Condition, currentPage, PageSize, OrderByID, SearchValue);
    //////console.log(_DataTableTotalPages)
    let TotalPages = 1;
    if (_DataTableTotalPages.PaginationResult != null) {
        TotalPages = _DataTableTotalPages.PaginationResult.TotalPages;
        //alert(TotalPages)
        if (TotalPages < currentPage) {
            if (IsSearch) {
                SelectPageNumber.SearchPageNumber = 1;
            }
            else {
                SelectPageNumber.PageNumber = 1;
            }
            currentPage = 1;
        }
    }
    _JsGrid.PageSize = PageSize;
    _JsGrid.DataSource = _DataTableTotalPages.DataTable;
    _JsGrid.Bind();
    BiuldPagination(idGrid, TotalPages, currentPage, IsSearch, () => {
        let PageNum = 1;
        if (IsSearch) {
            PageNum = SelectPageNumber.SearchPageNumber;
        }
        else {
            PageNum = SelectPageNumber.PageNumber;
        }
        let _ResData = GetDataFromPagination(NameTable, Condition, PageNum, PageSize, OrderByID, SearchValue, false);
        let idGrid = _JsGrid.ElementName;
        $("#" + idGrid + "").jsGrid("option", "pageIndex", 1);
        ////console.log(_ResData)
        _JsGrid.PageSize = PageSize;
        _JsGrid.DataSource = _ResData.DataTable;
        _JsGrid.Bind();
    });
}
function BiuldPagination(IdGrid, totalPages, currentPage = 1, IsSearch, OnRunCodeDisplay) {
    $('#' + IdGrid + ' .jsgrid-pager-container').remove();
    let NumRandom = GetRandomNumber(1, 1000);
    let BiuldDiv_In_Grid = `<div class="jsgrid-pager-container">
                              <div class="jsgrid-pager  paginationContainer " id="paginationContainer${NumRandom}"></div>
                            </div>`;
    $('#' + IdGrid + '').append(BiuldDiv_In_Grid);
    const container = document.getElementById("paginationContainer" + NumRandom);
    if (!container)
        return;
    container.innerHTML = "";
    const maxVisiblePages = 5;
    const createButton = (label, page, disabled = false, active = false) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.id = IdGrid + "Tap" + label;
        if (disabled)
            btn.classList.add("disabled");
        if (active)
            btn.classList.add("active");
        if (!disabled && page !== undefined) {
            btn.onclick = () => {
                if (IsSearch) {
                    SelectPageNumber.SearchPageNumber = page;
                }
                else {
                    SelectPageNumber.PageNumber = page;
                }
                OnRunCodeDisplay();
                BiuldPagination(IdGrid, totalPages, page, IsSearch, OnRunCodeDisplay); // إعادة توليد الصفحات
            };
        }
        return btn;
    };
    // أول صفحة
    container.appendChild(createButton("1", 1, false, currentPage === 1));
    if (currentPage > maxVisiblePages) {
        const dots = document.createElement("button");
        dots.textContent = "...";
        dots.classList.add("dots");
        container.appendChild(dots);
    }
    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);
    for (let i = start; i <= end; i++) {
        container.appendChild(createButton(i.toString(), i, false, i === currentPage));
    }
    if (end < totalPages - 1) {
        const dots = document.createElement("button");
        dots.textContent = "...";
        dots.classList.add("dots");
        container.appendChild(dots);
    }
    // آخر صفحة
    if (totalPages > 1) {
        container.appendChild(createButton(totalPages.toString(), totalPages, false, currentPage === totalPages));
    }
    // زر "التالي"
    if (currentPage < totalPages) {
        container.appendChild(createButton("Next", currentPage + 1));
        container.appendChild(createButton("Last", totalPages));
    }
}
function DisplaySearch_BoxPagination(_JsGrid, NameTable, Condition, currentPage = 1, PageSize = 10, OrderByID = "", IsSearch = false) {
    let idGrid = _JsGrid.ElementName;
    $("#" + idGrid + "").jsGrid("option", "pageIndex", 1);
    let SearchValue = $("#" + idGrid + "_SearchGrid").val().trim();
    let _DataTableTotalPages = new DataTablePaginationResult();
    _DataTableTotalPages = GetDataFromPagination(NameTable, Condition, currentPage, PageSize, OrderByID, SearchValue);
    //////console.log(_DataTableTotalPages)
    let TotalPages = 1;
    if (_DataTableTotalPages.PaginationResult != null) {
        TotalPages = _DataTableTotalPages.PaginationResult.TotalPages;
        //alert(TotalPages)
        if (TotalPages < currentPage) {
            if (IsSearch) {
                SelectPageNumber.SearchPageNumber = 1;
            }
            else {
                SelectPageNumber.PageNumber = 1;
            }
            currentPage = 1;
        }
    }
    _JsGrid.PageSize = PageSize;
    _JsGrid.DataSource = _DataTableTotalPages.DataTable;
    _JsGrid.Bind();
    BiuldPagination(idGrid, TotalPages, currentPage, IsSearch, () => {
        let PageNum = 1;
        if (IsSearch) {
            PageNum = SelectPageNumber.SearchPageNumber;
        }
        else {
            PageNum = SelectPageNumber.PageNumber;
        }
        let _ResData = GetDataFromPagination(NameTable, Condition, PageNum, PageSize, OrderByID, SearchValue, false);
        let idGrid = _JsGrid.ElementName;
        $("#" + idGrid + "").jsGrid("option", "pageIndex", 1);
        ////console.log(_ResData)
        _JsGrid.PageSize = PageSize;
        _JsGrid.DataSource = _ResData.DataTable;
        _JsGrid.Bind();
    });
}
function MergeData(source, target, RemoveFild1 = "", RemoveFild2 = "", RemoveFild3 = "", RemoveFild4 = "") {
    const result = {};
    // 1. نقل القيم من source إلى target إذا كان لهم نفس المفتاح
    for (const key in target) {
        if (key in source) {
            target[key] = source[key];
        }
    }
    // 2. حذف الفيلدات المرسلة كـ باراميترات لو موجودة في target
    const directRemoveFields = [RemoveFild1, RemoveFild2, RemoveFild3, RemoveFild4].filter(f => f);
    for (const field of directRemoveFields) {
        if (field in target) {
            delete target[field];
        }
    }
    // 3. حذف كل الخصائص اللي موجودة في CustomClass
    const removeClassFields = new CustomClass();
    for (const key in removeClassFields) {
        if (key in target) {
            delete target[key];
        }
    }
    return target;
}
function xorEncrypt(text, key) {
    const encoder = new TextEncoder();
    const textBytes = encoder.encode(text);
    const keyBytes = encoder.encode(key);
    const result = new Uint8Array(textBytes.length);
    for (let i = 0; i < textBytes.length; i++) {
        result[i] = textBytes[i] ^ keyBytes[i % keyBytes.length];
    }
    // التحويل من Uint8Array إلى Base64
    let binary = '';
    for (let i = 0; i < result.length; i++) {
        binary += String.fromCharCode(result[i]);
    }
    return btoa(binary);
}
function xorDecrypt(encryptedBase64, key) {
    const binary = atob(encryptedBase64);
    const encryptedBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        encryptedBytes[i] = binary.charCodeAt(i);
    }
    const keyBytes = new TextEncoder().encode(key);
    const result = new Uint8Array(encryptedBytes.length);
    for (let i = 0; i < encryptedBytes.length; i++) {
        result[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
    }
    return new TextDecoder().decode(result);
}
//function GenerateToken(secretKey: string): string {
//    const now = new Date();
//    const minutes = Math.floor(now.getTime() / 60000); // عدد الدقائق منذ Unix Epoch
//    const payload = `USER-${minutes}`;
//    const encoder = new TextEncoder();
//    const dataBytes = encoder.encode(payload);
//    const keyBytes = encoder.encode(secretKey);
//    const result = new Uint8Array(dataBytes.length);
//    for (let i = 0; i < dataBytes.length; i++) {
//        result[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length];
//    }
//    // تحويل للـ Base64
//    const binary = String.fromCharCode(...result);
//    return btoa(binary);
//}
function GenerateToken(secretKey) {
    const unique = Date.now().toString(); // أو UUID
    const payload = `USER-${unique}`;
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(payload);
    const keyBytes = encoder.encode(secretKey);
    const result = new Uint8Array(dataBytes.length);
    for (let i = 0; i < dataBytes.length; i++) {
        result[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length];
    }
    const binary = String.fromCharCode(...result);
    return btoa(binary);
}
function GetFinYear() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var SysSession = GetYearSession();
    yyyy = Number(SysSession.CurrentEnvironment.CurrentYear);
    return yyyy;
}
function DeleteDeviceStatus() {
    var Table;
    Table =
        [
            { NameTable: "delete [G_Log_Device] where [ID_Device] = N'" + GetDeviceUUID() + "' and isnull(IsNotAuto,0) <> 1  ;", Condition: "", IsExec: true, IsProc: true },
        ];
    DataResult(Table);
}
//****************************************************************
var SysSessionSet = GetYearSession();
var defaultYear = Number(SysSessionSet.CurrentEnvironment.CurrentYear);
var minDate = defaultYear + "-01-01";
var maxDate = defaultYear + "-12-31";
function SetYearSession() {
    // 👈 غير السنة هنا
    let SysSession = GetYearSession();
    defaultYear = Number(SysSession.CurrentEnvironment.CurrentYear);
    minDate = defaultYear + "-01-01";
    maxDate = defaultYear + "-12-31";
}
// 1️⃣ تطبيق min / max على كل input date موجود
$('input[type="date"]').each(function () {
    $(this)
        .attr("min", minDate)
        .attr("max", maxDate);
    // لو فاضي حط default
    if (!$(this).val()) {
        var today = new Date();
        if (Number(defaultYear) < Number(today.getFullYear())) {
            $(this).val(maxDate);
        }
        else {
            $(this).val(GetDate());
        }
    }
});
// 2️⃣ منع أي تغيير يدوي للسنة (حتى لو كتبها)
$(document).on('change', 'input[type="date"]', function () {
    let val = $(this).val();
    if (!val)
        return;
    let year = val.split('-')[0];
    if (parseInt(year) !== defaultYear) {
        alert("❌ ممنوع اختيار سنة غير اللي انت داخل بيها " + defaultYear + ". برجاء اعادة تسجيل الدخول وختيار السنه التي تريد التعديل فيها ");
        var today = new Date();
        if (Number(defaultYear) < Number(today.getFullYear())) {
            $(this).val(maxDate);
        }
        else {
            $(this).val(GetDate());
        }
    }
});
//*****************************
let GloplArchFilesUrl = $('#Path_Save').val() + 'Archive/';
let GloplArchdownloadUrl = "/FileUpload/Download?downloadUrl=";
function Upload_File(NameIDBtn, Name_Folder, Name_Bind) {
    $('#Name_Folder').val(Name_Folder);
    if (Name_Bind.trim() == "") {
        $("#fileName").val(GenerateUUID());
    }
    else {
        $("#fileName").val(Name_Bind);
    }
    $("#fileUploadInputArchive").attr("accept", "");
    $("#" + NameIDBtn + "").attr("Name_Img", "");
    $("#" + NameIDBtn + "").removeClass("_backColor");
    let UrlImg = GetUrlImgCach(Name_Folder, $("#fileName").val());
    $("#UrlImg").val(UrlImg);
    $("#IdName_View_Img").val(NameIDBtn);
    $('#fileUploadInputArchive').click();
}
function ShowArchive(Arch_IDUserCreate, Arch_CompCode, Arch_MODULE_CODE, Arch_TransID, Arch_NameIDBtn) {
    var SysSession = GetYearSession();
    GloplArchFilesUrl = $('#Path_Save').val() + '/Archive/' + "Comp" + Arch_CompCode + '/' + SysSession.CurrentEnvironment.CurrentYear + '/';
    $('#Arch_IDUserCreate').val(Arch_IDUserCreate);
    $('#Arch_CompCode').val(Arch_CompCode);
    $('#Arch_MODULE_CODE').val(Arch_MODULE_CODE);
    $('#Arch_FinYear').val(SysSession.CurrentEnvironment.CurrentYear);
    $('#Arch_TransID').val(Arch_TransID);
    $('#Arch_NameIDBtn').val(Arch_NameIDBtn);
    var modalPass = document.getElementById("archiveModal");
    modalPass.style.display = "block";
    DisplayListFileArchive(Arch_CompCode, Arch_MODULE_CODE, Arch_TransID);
}
function DisplayListFileArchive(Arch_CompCode, Arch_MODULE_CODE, Arch_TransID) {
    fileList.innerHTML = "";
    let listFiles = GetDataFrom("G_Tr_Archive", " CompCode = " + Arch_CompCode + " and  MODULE_CODE = N'" + Arch_MODULE_CODE + "' and  TransID = " + Arch_TransID);
    for (var i = 0; i < listFiles.length; i++) {
        let Url = GloplArchFilesUrl + Arch_MODULE_CODE + "/" + Arch_TransID + "/" + listFiles[i].UUID + "." + listFiles[i].TypeFile;
        DisplayArchiveFiles(listFiles[i].NameFile, listFiles[i].TypeFile, listFiles[i].UUID, listFiles[i].Remarks, Url);
    }
}
$("#Arch_AddFile").on('click', function () {
    var SysSession = GetYearSession();
    let Arch_MODULE_CODE = $('#Arch_MODULE_CODE').val();
    let Arch_TransID = $('#Arch_TransID').val();
    let Arch_NameIDBtn = $('#Arch_NameIDBtn').val();
    let urlFiles = '/Archive/' + "Comp" + SysSession.CurrentEnvironment.CompCode + '/' + SysSession.CurrentEnvironment.CurrentYear + '/' + Arch_MODULE_CODE + "/" + Arch_TransID;
    Upload_File(Arch_NameIDBtn, urlFiles, "");
});
$("#Arch_IsSuccess").on('click', function () {
    let Url = GloplArchFilesUrl + $('#Arch_MODULE_CODE').val() + "/" + $('#Arch_TransID').val() + "/" + $("#fileName").val() + "." + $('#Arch_extension').val();
    DisplayArchiveFiles($('#Arch_NameFile').val(), $('#Arch_extension').val(), $("#fileName").val(), $("#Arch_Remarks").val(), Url);
    $('#Arch_NameFile').val("");
    $('#Arch_Remarks').val("");
});
const fileList = document.getElementById("fileList");
function DisplayArchiveFiles(fileName, TypeFile, UUID, Remark, FilesUrl) {
    let downloadUrl = GloplArchdownloadUrl + FilesUrl;
    const div = document.createElement("div");
    div.className = "file-item";
    div.id = "file_item_" + UUID;
    div.innerHTML = `
    <div class="file-left">
        <img class="file-icon" src="${getIcon(TypeFile)}" />

        <div class="file-info">
            <div class="file-name"
                 title="${Remark} / TypeFile = ${TypeFile}">
                ${fileName}
            </div>
            <div class="file-type">${TypeFile.toUpperCase()}</div>
            <div class="file-type"> Remarks : ${Remark}</div>
        </div>
    </div>

    <div class="file-actions">

        <a class="delete"
                title="Share"
                id="shareUrl_${UUID}" >
            📤
        </a>

        <a class="download"
           href="${downloadUrl}"
           target="_blank"
           rel="noopener noreferrer"
           title="Download ${fileName}">
           ⬇️
        </a>

        <a class="delete"
                title="Delete"
                id="DeleteArchiveFile_${UUID}" >
            ✖
        </a>
    </div>
`;
    fileList.appendChild(div);
    $("#DeleteArchiveFile_" + UUID).on('click', function () {
        let x = confirm("هل تريد الحذف");
        if (x) {
            removeFile(UUID, FilesUrl);
        }
    });
    $("#shareUrl_" + UUID).on('click', function () {
        shareUrl(downloadUrl);
    });
}
function removeFile(UUID, UrlFile) {
    var sys = new SystemTools();
    Ajax.Callsync({
        type: "get",
        url: sys.apiUrl("FileUpload", "DeleteFile"),
        data: { UrlFile: UrlFile },
        success: (d) => {
            let result = d;
            if (result.IsSuccess == true) {
                SqlExecuteQuery("Delete G_Tr_Archive where UUID = N'" + UUID + "'");
                $("#file_item_" + UUID).remove();
                ShowMessage("Done 🤞😉", "تم الحذف    🤞😉");
                Close_Loder();
            }
            else {
                ShowMessage("Error", result.ErrorMessage);
                Close_Loder();
            }
        }
    });
}
function getIcon(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
        case "jpg":
        case "jpeg":
        case "png":
            return "/images/Icon/2659360.png";
        case "pdf":
            return "/images/Icon/337946.png";
        case "doc":
        case "docx":
            return "/images/Icon/337932.png";
        case "xls":
        case "xlsx":
            return "/images/Icon/337958.png";
        case "zip":
            return "/images/Icon/337960.png";
        default:
            return "/images/Icon/833524.png";
    }
}
function shareUrl(customUrl) {
    const url = customUrl || window.location.href;
    if (navigator.share) {
        navigator.share({ url });
    }
    else {
        copyTo(url);
    }
}
function copyTo(text) {
    navigator.clipboard.writeText(text).then(() => {
        ShowMessage("Link copied ✔", "Link copied ✔");
    });
}
function GetItemInfoByItemID(ItemID, CompCode, WhereCon, TypeUsing) {
    let res = GetDataFrom("IQ_GetItemInfo", "ItemID = " + ItemID + " and  CompCode = " + CompCode + "  and TypeUsing in (0," + TypeUsing + ")  " + WhereCon);
    return res;
}
function GetItemInfoByItemUnitID(ItemUnitID, CompCode, WhereCon, TypeUsing) {
    let res = GetDataFrom("IQ_GetItemInfo", "ItemUnitID = " + ItemUnitID + " and  CompCode = " + CompCode + "  and TypeUsing in (0," + TypeUsing + ")  " + WhereCon);
    return res;
}
function GetItemInfoByItemCode(ItemCode, CompCode, WhereCon, TypeUsing) {
    let res = GetDataFrom("IQ_GetItemInfo", "ItemCode = N'" + ItemCode + "' and  CompCode = " + CompCode + "  and TypeUsing in (0," + TypeUsing + ")  " + WhereCon);
    return res;
}
//# sourceMappingURL=App.js.map