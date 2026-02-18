
$(document).ready(() => {
    Home.InitalizeComponent();


});

namespace Home {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();

    var btn_Logout: HTMLButtonElement;
    var Res: SystemResources = GetGlopelResources();
    var FlagShowPrice = false;
    var FlagJobOrder = false;
    var FlagPOS = false;
    var FlagItem = 0;
    export function InitalizeComponent() {

        SetYearSession();

        $('#DivLang').attr('style', 'opacity: 0.8;top: 15px !important;position: absolute;')

        $('#UserName').html(SysSession.CurrentEnvironment.NameUser);
        $('#JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        $('#CompanyName').html(SysSession.CurrentEnvironment.CompanyName);


        if (setVal(SysSession.CurrentEnvironment.GQ_USERS.Profile_Img).trim() != "") {
            Display_image('layout_img_Profile', 'Profile_User', SysSession.CurrentEnvironment.GQ_USERS.Profile_Img.trim());
        }



        InitalizeControls();
        InitializeEvents();

        ApplyModulesNew("Home");



        Close_Loder();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "");

        $('#DivLang').removeClass('hidden_Control')

        FlagShowPrice = SysSession.CurrentEnvironment.I_Control.Is_ShowPrice;
        FlagJobOrder = SysSession.CurrentEnvironment.I_Control.Is_JobOrder;
        FlagPOS = SysSession.CurrentEnvironment.I_Control.IS_POS;
        FlagItem = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items;
        LayOutOfApp()

    }
    function LayOutOfApp() {

        if (FlagShowPrice == true) {
            $('#ShowPrice').removeClass("display_none");
            $('#ViewShowPrice').removeClass("display_none");
        } else {
            $('#ShowPrice').addClass("display_none");
            $('#ViewShowPrice').addClass("display_none");

        }

        if (FlagJobOrder == true) {
            $('#JobOrder').removeClass("display_none");
            $('#ViewJobOrder').removeClass("display_none");

        } else {
            $('#JobOrder').addClass("display_none");
            $('#ViewJobOrder').addClass("display_none");
        }


        if (FlagItem == 2) {
            $('#ItemFamily').addClass("display_none");
            $('#Category').addClass("display_none");
            $('#Units').addClass("display_none");
            $('#Tables').addClass("display_none");
        }
        else if (FlagItem == 3) {
            $('#ItemFamily').removeClass("display_none");
            $('#Category').removeClass("display_none");
            $('#Units').addClass("display_none");
            $('#Tables').addClass("display_none");
        }
        else {
            $('#ItemFamily').removeClass("display_none");
            $('#Category').removeClass("display_none");
            $('#Units').removeClass("display_none");
        }



        if (FlagPOS == true) {
            $('#View_Period').removeClass("display_none");
            $('#TR_Sales').removeClass("display_none");
            $('#ViewSales').removeClass("display_none");
            $('#CloseDay').removeClass("display_none");

            //$('#Tax_Sales').addClass("display_none");
            //$('#Tax_ViewSales').addClass("display_none");
            //$('#ShowPrice').addClass("display_none");
            //$('#ViewShowPrice').addClass("display_none");
            //$('#ViewJobOrder').addClass("display_none");
            //$('#JobOrder').addClass("display_none");
            //$('#Customer').addClass("display_none");
            //$('#EditCustomer').addClass("display_none");
            //$('#Rep_AccountStatment').addClass("display_none");

        } else {
            $('#View_Period').addClass("display_none");
            $('#TR_Sales').addClass("display_none");
            $('#ViewSales').addClass("display_none");
        }

    }
    function InitalizeControls() {
        btn_Logout = document.getElementById("btn_Logout") as HTMLButtonElement;
    }
    function InitializeEvents() {

        btn_Logout.onclick = btn_LogoutUesr;



        $('#Lab_NamePage').dblclick(function (e) {

            //SqlExecuteQuery("update [dbo].[G_Data_Redis] set Status = 0 ");

            //ShowMessage("Refresh All Data  😊", "تحديث البيانات 😊")

            RefreshRedis();
        });

        $('#Profile').click(function (e) {

            OpenPagePartial("Profile", "Profile", null, null, true);
        });
    }

    function RefreshRedis() {

        Show_Loder();
        setTimeout(function () {

            $.ajax({
                url: Url.Action("GetData_Redis", "Home"),
                type: 'GET',
                success: function (htmlContent) {

                    ShowMessage("Refresh All Data  😊", "تحديث البيانات 😊")

                    Close_Loder();
                },
                error: function (xhr, status, error) {
                    //console.error('Error fetching HTML:', error);

                    ShowMessage("Error 🚫", " Error 🚫")

                    Close_Loder();
                }
            });

        }, 100);

    }

    function btn_LogoutUesr() {

        DeleteDeviceStatus();
        LogUser("تم تسجيل الخروج من النظام", TypeLog.LogOut)
        RunInsertLogUser();
        setTimeout(function () {
            $('.Layout_Home').addClass('display_none');
            OpenPage("Login");
        }, 300);

    }




    function ApplyModules() {

        let modules: Array<UserPrivilege> = new Array<UserPrivilege>();
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = 'I';
        let SubSystemCode = 'I';
        let CurrentYear = SysSession.CurrentEnvironment.CurrentYear;

        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("Home", "GetAllUserPrivilage"),
            async: false,
            data: { year: Number(CurrentYear), compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: (d) => {


                modules = d as Array<UserPrivilege>;
            }
        });


        // filter moulules where isavailable = false or access = false 
        let MODULE_CODE;
        for (var i = 0; i < modules.length; i++) {

            let singleUserModule: UserPrivilege = modules[i];


            MODULE_CODE = document.getElementById(singleUserModule.MODULE_CODE)

            if (MODULE_CODE != null) {
                try {
                    if (singleUserModule != null) {
                        if (singleUserModule.Access === true && singleUserModule.AVAILABLE === true) {

                            $('#' + singleUserModule.MODULE_CODE + '').removeClass('hidden_Control');
                        }
                    }


                }
                catch (e) {

                }



            } else {
                //ShowMessage("wrong code  " + singleUserModule.MODULE_CODE)
            }
        }

    }

}
