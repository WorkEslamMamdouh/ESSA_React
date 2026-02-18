
$(document).ready(() => {
    VendorControl.InitalizeComponent();

});

namespace VendorControl {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _Grid: JsGrid = new JsGrid(); 
    var _G_Code: Array<G_Codes> = new Array<G_Codes>();
    var _UsersList: Array<GQ_USERS> = new Array<GQ_USERS>();
    var _Usersnone: Array<GQ_USERS> = new Array<GQ_USERS>(); 
    var txtSearch: HTMLInputElement;
    var drpActive: HTMLSelectElement;
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement; 
    var Res = GetGlopelResources();

    export function InitalizeComponent() { 
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        Close_Loder();
        GetDataFilters();
    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
    }
    function InitializeEvents() { 
        txtSearch.onkeyup = _SearchBox_Change;
        Filter_View.onclick = () => { GetData_Users() };

        btnDelete_Filter.onclick = Clear;
    } 
    function GetDataFilters() { 
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'G_Codes', Condition: "CodeType = 'UserType' or CodeType ='UserStat'" }, 
            ]
        DataResult(Table);
         
        _G_Code = GetDataTable('G_Codes');
        let codusers = _G_Code.filter(x => x.CodeType == 'UserType' && x.CodeValue != 1)
        let codstat = _G_Code.filter(x => x.CodeType == 'UserStat' && x.CodeValue != 1)     
        FillDropwithAttr(codstat, "drpActive", "CodeValue", (Res.Lang == "Ar" ? "DescA" : "DescE"), (Res.Lang == "Ar" ? "اختر الحالة" : "Choose Status"), "", "");
    } 
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
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
            {
                title: "User ID",
                itemTemplate: (s: string, item: GQ_USERS): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "Input";
                    txt.id = "txt" + item.ID;
                    txt.className = "txt";
                    txt.style.width = "100px"
                    txt.style.height = "35px"
                    txt.disabled = true;
                    return txt;
                }
            },
            { title: "ID", name: "ID", visible: false, width: "100px" },    
            { title: "User Name", name: "USER_NAME", type: "text", width: "100px" },
            { title: "Mobile", name: "Mobile", type: "text", width: "100px" },
            { title: "Job Title", name: "JobTitle", type: "text", width: "100px" },
            {
                title: "Status", css: "ColumPadding", name: "Status", width: "100px",
                itemTemplate: (s: string, item: GQ_USERS): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    if (item.Status == 0) {
                        txt.innerHTML = 'Waiting ⌛'
                    }
                    else {
                        txt.innerHTML = 'Rejected ❌'
                    }
                    return txt;
                }
            },
            {
                title: "Accept",
                itemTemplate: (s: string, item: GQ_USERS): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.ID;
                    txt.className = "checkbox";
                    txt.style.width = "50px"
                    txt.style.height = "35px"
                    txt.checked = false;
                    txt.disabled = false;
                    txt.onclick = (e) => {
                         
                        if ($('#txt' + item.ID + '').val().trim() == '') {
                            $('#txt' + item.ID + '').removeAttr("disabled");
                            Errorinput($('#txt' + item.ID + ''), "You Should add User ID", "يجب عليك إضافة معرف المستخدم")
                            txt.checked = false;
                        } else if (!CheckDublicated(Number($('#txt' + item.ID + '').val()))) {
                            Errorinput($('#txt' + item.ID + ''), "This User ID already exists 🤨", "معرف المستخدم هذا موجود بالفعل 🤨");
                            txt.checked = false;
                        }
                        else {
                            AcceptEmp(item.ID, 1, Number($('#txt' + item.ID + '').val()));
                        }
                    };
                    return txt;
                }
            },
            {
                title: "Reject",
                itemTemplate: (s: string, item: GQ_USERS): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.ID;
                    txt.className = "checkbox";
                    txt.style.width = "50px"
                    txt.style.height = "35px"
                    if (item.Status == 2) {
                        txt.checked = true;
                        txt.disabled = true;
                    }
                    if (item.Status == 0) {
                        txt.checked = false;
                        txt.disabled = false;
                    }
                    txt.onclick = (e) => {
                        AcceptEmp(item.ID, 2, Number($('#txt' + item.ID + '').val()));
                    };
                    return txt;
                }
            },
            {
                title: "View",
                itemTemplate: (s: string, item: GQ_USERS): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Edit ⚙️");
                    txt.id = "butView" + item.ID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = (e) => {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);

        if (txtSearch.value != "") {
            let search: string = txtSearch.value.toLowerCase();
            let SearchDetails = _UsersList.filter(x => x.USER_CODE.toLowerCase().search(search) >= 0 || x.EmpCode.toLowerCase().search(search) >= 0 || x.ID.toString().toLowerCase().search(search) >= 0 || x.USER_NAME.toLowerCase().search(search) >= 0 || x.JobTitle.toLowerCase().search(search) >= 0 );

            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        } else {
            _Grid.DataSource = _UsersList;
            _Grid.Bind();
        }
    }
    function GetData_Users(ISDirect: boolean = false) {


        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }



        CleaningList_Table();
        let Con = "";
        if ($('#drpActive').val() != "null") {
            Con = " and Status =" + Number($('#drpActive').val());
        }


        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'GQ_USERS', " CompCode = " + SysSession.CurrentEnvironment.CompCode + " and USER_TYPE != 1 and Status != 1  and ID !='" + SysSession.CurrentEnvironment.GQ_USERS.ID + "' and [USER_NAME] not in ('UserAccount','UserSupervisor','UserAdministrator','Delivery') " + Con, SelectPageNumber.PageNumber, 5, "ID")
        }
        else {
            DisplayGridByPagination(_Grid, 'GQ_USERS', " CompCode = " + SysSession.CurrentEnvironment.CompCode + " and USER_TYPE != 1 and Status != 1  and ID !='" + SysSession.CurrentEnvironment.GQ_USERS.ID + "' and [USER_NAME] not in ('UserAccount','UserSupervisor','UserAdministrator','Delivery') " + Con, 1, 5, "ID")
        }
         
        
        //var Table: Array<Table>;
        //Table =
        //    [
        //    { NameTable: 'GQ_USERS', Condition: " CompCode = " + SysSession.CurrentEnvironment.CompCode +" and USER_TYPE != 1 and Status != 1  and ID !='" + SysSession.CurrentEnvironment.GQ_USERS.ID + "' and [USER_NAME] not in ('UserAccount','UserSupervisor','UserAdministrator','Delivery') " + Con },

        //    ]
        //DataResult(Table);
        //_UsersList = GetDataTable('GQ_USERS');
        //_UsersList = _UsersList.sort(dynamicSort("USER_NAME"));
        //$('#btnDelete_Filter').removeClass('display_none');
        //if (_UsersList.length == 0) {
        //    ShowMessage("There are no data 😂", "لا توجد بيانات 😂") 
        //}
        //_Grid.DataSource = _UsersList;
        //_Grid.Bind(); 
    }
    function ViewUser(item: GQ_USERS) {
         
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "UserControl"); 
        SetModelGlopelDataProfile(item) 
        OpenPagePartial("UserDef", "UserDef 👤", () => { Display_Refrsh() });
    }
    function Clear() {
        $('#drpActive').val("null"); 
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Usersnone;
        _Grid.Bind();
    }

    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }
        GetData_Users();
    }

    function AcceptEmp(ID: number, Active: number, EmpCode: number) {
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("User", "Accept_RejectEmp"),
            data: { ID: ID, USER_CODE: SysSession.CurrentEnvironment.UserCode, Active: Active, EmpCode: EmpCode, CompCode: SysSession.CurrentEnvironment.CompCode },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    GetData_Users();
                    Close_Loder();
                    Active == 1 ? ShowMessage("User Accepted 😁 ", "تم قبول المستخدم 😁") : ShowMessage("User Rejected 👌", "تم رفض المستخدم 👌")
                } else {

                }
            }
        });

    }
    function CheckDublicated(EmpCode): boolean {
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'G_USERS', Condition: " EmpCode = " + EmpCode + "" },
            ]

        DataResult(Table);
        let _USER = GetDataTable('G_USERS');
        return _USER.length > 0 ? false : true;

    }
}
