
$(document).ready(() => {
    ViewLogUser.InitalizeComponent();

});

namespace ViewLogUser {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _Grid: JsGrid = new JsGrid();

    var _dateList: Array<IProc_Rpt_LogUser> = new Array<IProc_Rpt_LogUser>();
    var _Datanone: Array<IProc_Rpt_LogUser> = new Array<IProc_Rpt_LogUser>();
    var SearchDetails: Array<IProc_Rpt_LogUser> = new Array<IProc_Rpt_LogUser>();
     
    var drpModeUser: HTMLSelectElement;
    var Filter_View: HTMLButtonElement;
    var Filter_Users: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;

    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        FilddbModeUser();
        FilddbModule();
        //$('#Txt_From_Date').val(DateStartYear())


        $('#Txt_From_Date').val(GetDate())
        $('#Txt_To_Date').val(GetDate())

        if (SysSession.CurrentEnvironment.GQ_USERS.USER_TYPE == 5) {
            $('#Filter_Select_Account').html(SysSession.CurrentEnvironment.GQ_USERS.USER_NAME);
            $('#TxtUserId').val(SysSession.CurrentEnvironment.GQ_USERS.ID);
            $('#Filter_Select_Account').attr('style', 'opacity: 1.4;pointer-events:none;')



            $('#Txt_From_Date').val(DateStartMonth())
            $('#Txt_To_Date').val(GetDate())
        }

         
        DownloadFileExcel();
         

        Close_Loder();
    }
    function InitalizeControls() { 
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        Filter_Users = document.getElementById('Filter_Users') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
    }
    function InitializeEvents() {

        Filter_Users.onclick = Filter_Users_onclick;
        Filter_View.onclick = GetData_Log; 
        btnDelete_Filter.onclick = Clear;
    }
    function DownloadFileExcel() {

        GnrGridDownloadExcel(() => {

            let keyMapping = {
                UserID: 'UserID',
                USER_NAME: 'User Name',
                JobTitle: 'JobTitle',
                TrType: 'ModuleCode',
                Mode: 'Mode',
                Remarks: 'Remarks',
                Date: 'Date',

                //IsSuccess: 'IsSuccess',
                ID_Device: 'IDDevice',
                DeviceType: 'DeviceType',
                NameBrowser: 'NameBrowser',
            };

            ConvertModelToFileExcel('ListLogUser', _Grid.DataSource, keyMapping)
        });
         
    }
    function FilddbModeUser() {

        $.each(TypeLog, function (key, value) {
            $('#drpModeUser').append('<option value="' + key + '" data-calc="">' + value + '</option>');
        });

    }

    function FilddbModule() {

         
        let ListModule = GetAllModule();
         

        for (var i = 0; i < ListModule.length; i++) {
            $('#dbModule').append('<option value="' + ListModule[i].ModuleCode + '" data-calc="">' + ListModule[i].ModuleCode + '</option>');
        }

    }

    function InitializeGrid() {

        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "IDTrans";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "UserID", name: "UserID", type: "text", width: "100px", visible: false },
            { title: "UserID", name: "UserID", type: "Number", width: "100px" },
            { title: "User Name", name: "USER_NAME", type: "text", width: "100px" },
            { title: "JobTitle", name: "JobTitle", type: "text", width: "100px" },
            { title: "ModuleCode", name: "TrType", type: "text", width: "150px" },
            { title: "Mode", name: "Mode", type: "text", width: "100px" },
            {
                title: "Remarks", css: "ColumPadding", name: "Remarks", width: "200px",
                itemTemplate: (s: string, item: IProc_Rpt_LogUser): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

                    txt.innerHTML = item.Remarks;
                     
                    txt.style.direction = "rtl";
                     
                    return txt;
                }
            },
            //{ title: "Remarks", name: "Remarks", type: "text", width: "200px" },
            { title: "Date", name: "Date", type: "text", width: "150px" },
            /*{ title: "IsSuc", name: "IsSuccess", type: "text", width: "50px" },*/
            { title: "IDDevice", name: "ID_Device", type: "text", width: "120px" },
            { title: "DeviceType", name: "DeviceType", type: "text", width: "120px" },
            { title: "NameBrowser", name: "NameBrowser", type: "text", width: "150px" },

        ];
        _Grid.Bind();
    }

     
    function GetData_Log() {


        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }



        CleaningList_Table();

        $("#_Grid").jsGrid("option", "pageIndex", 1);


        let From_Date = DateFormat($('#Txt_From_Date').val());
        let To_Date = DateFormat($('#Txt_To_Date').val());
        let ModuleCode = $('#dbModule').val();
        let Mode = $('#drpModeUser').val();
        let USERID = -1;


        if (Number($('#TxtUserId').val()) != 0) {
            USERID = Number($('#TxtUserId').val());
        }



         
        let Qurey = "IProc_Rpt_LogUser " + CompCode + ",N'" + From_Date + " 0:00:00',N'" + To_Date + " 23:59:59','" + ModuleCode + "','" + Mode + "'," + USERID + "";
        _dateList = GetDataFromProc(Qurey, "IProc_Rpt_LogUser")


        //**************************************************************************************************************

        if (SysSession.CurrentEnvironment.GQ_USERS.USER_TYPE != 1) {
            _dateList = _dateList.filter(x => x.USER_TYPE != 1);
        }

        $('#btnDelete_Filter').removeClass('display_none');
        _Grid.DataSource = _dateList;
        _Grid.Bind();


    }
    function Clear() {
        $('#dbModule').val("1");
        $('#drpModeUser').val("1");

        if (SysSession.CurrentEnvironment.GQ_USERS.USER_TYPE != 5) {
            $('#TxtUserId').val('')
            $('#Filter_Users').html('Select User')
        }
        else {
            $('#Txt_From_Date').val(DateStartMonth())
            $('#Txt_To_Date').val(GetDate())
        }

        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Datanone;
        _Grid.Bind();

        _dateList = _Datanone;
    }
    function Filter_Users_onclick() {

        let Con = "";
        //if (SysSession.CurrentEnvironment.GQ_USERS.USER_TYPE != 1) {
        //    Con = " and USER_TYPE <> 1 ";
        //}

        //sys.FindKey("USERS", "btnUSERS", " ( CompCode = " + CompCode + " or  CompCode = -1 ) " + Con, () => {
        sys.FindKeyPagination("USERS", "btnUSERS", "  CompCode = " + CompCode + " and RoleId <> 1 " + Con, () => {
            let SelectedItem: IQ_G_RoleUsersComp = SelectDataSearch.DataRow;  
            $('#Filter_Users').html("( " + SelectedItem.NameUser + " )");
            $('#TxtUserId').val(SelectedItem.IDUser)
        });

    }


    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }
        //GetData_Log();
    }
}
