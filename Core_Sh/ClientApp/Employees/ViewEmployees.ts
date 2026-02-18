
$(document).ready(() => {
    ViewEmployees.InitalizeComponent();

});

namespace ViewEmployees {
    
    var SysSession: SystemSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid: JsGrid = new JsGrid();
     
    var _Employeenone: Array<G_Employees> = new Array<G_Employees>();
  
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;
    var Res = GetGlopelResources();

    export function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        DownloadFileExcel();
        Close_Loder();
        SelectPageNumber.PageNumber = 1;
    }
    function InitalizeControls() { 
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
    }
    function InitializeEvents() { 
        Filter_View.onclick = () => { GetData() };
        btnDelete_Filter.onclick = Clear;
    }

    function DownloadFileExcel() {

        GnrGridDownloadExcel(() => {

            let keyMapping = {
                EmpCode: Res.Lang == "En" ? "EmpCode" : "الكود",
                Emp_Name: Res.Lang == "En" ? "Emp_Name" : "الاسم",
                MOBILE: Res.Lang == "En" ? "Mobile" : "الموبيل", 
                Remarks: Res.Lang == "En" ? "Remarks" : "الملاحظات", 

            };
            ConvertModelToFileExcel('EmployeeReport', _Grid.DataSource, keyMapping)
        });
    }
 
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";                     
        _Grid.PrimaryKey = "EmpID";
        _Grid.Paging = true;
        //_Grid.PageSize = 10;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: Res.Lang == "En" ? "EmpID" : "الكود", name: "EmpID", visible: false, type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "  Code" : "الكود", name: "EmpCode", type: "text", width: "100px" },
            { title: Res.Lang == "En" ?  "Name" : "الاسم  ", name: "Emp_Name", type: "text", width: "100px" },
            { title:Res.Lang == "En" ?  "Mobile" : "الموبيل", name: "Mobile", type: "text", width: "100px" }, 
            { title: Res.Lang == "En" ? "Remarks" : "الملاحظات", name: "Remarks", type: "text", width: "100px" },
             
            {
                title: Res.Lang == "En" ? "Active" : "نشظ", width: "50px", 
                itemTemplate: (s: string, item: G_Employees): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");     
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.EmpCode;
                    txt.className = "checkbox";
                    txt.checked = item.Status == 1 ? true : false;
                    txt.style.width = "50px"
                    txt.style.height = "35px"
                    //-------------------------Privileges-----------------------
                    txt.disabled = true
                    if (item.Status == 0 && SysSession.CurrentPrivileges.CUSTOM1) {
                        txt.disabled = false
                    }
                    if (item.Status == 1 && SysSession.CurrentPrivileges.CUSTOM2) {
                        txt.disabled = false
                    }
                    //----------------------------------------------------------

                    txt.onclick = (e) => {
                        Status(item.EmpID, txt.checked);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ?  "View Profile" : "الملف الشخصي",
                itemTemplate: (s: string, item: G_Employees): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "View Profile" : "الملف الشخصي");
                    txt.id = "butViewProfile" + item.EmpID;
                     txt.className = "Style_Add_Item u-btn u-btn-info u-input u-input-rectangle";            
                    txt.style.backgroundColor = "chocolate";            

                     
                    if (!SysSession.CurrentPrivileges.EDIT) {
                        txt.disabled = true
                    }


                    txt.onclick = (e) => {
                        ViewProfile(item);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Edit" : "تعديل",
                itemTemplate: (s: string, item: G_Employees): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Edit" : "تعديل" + " ⚙️");
                    txt.id = "butView" + item.EmpID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";




                    if (!SysSession.CurrentPrivileges.EDIT) {
                        txt.disabled = true
                    }


                    txt.onclick = (e) => {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
            {
                visible: (SysSession.CurrentEnvironment.I_Control.IsArchive == true ? true : false), title: Res.Lang == "Ar" ? "ارشفه" : "Archive",
                itemTemplate: (s: string, item: G_Employees): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = "📩"
                    txt.id = "butArchive" + item.EmpID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#16c76d";
                    txt.style.borderRadius = "50%";
                    txt.style.width = "50px";

                    if (!SysSession.CurrentPrivileges.IsArchive) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {
                        ShowArchive(SysSession.CurrentEnvironment.GQ_USERS.ID.toString(), SysSession.CurrentEnvironment.CompCode.toString(), GetModelCodeFromUrl(), item.EmpID.toString(), txt.id);
                    };
                    return txt;
                }
            },
            
        ];
        _Grid.Bind();

    }
    function ViewUser(item: G_Employees) {
         
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item)
        OpenPagePartial("Employees", "ViewEmployees", () => { Display_Refrsh() });
 
    }

    function ViewProfile(item: G_Employees) {

        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item)
        OpenPagePartial("Wallet", "View Profile", () => { Display_Refrsh() });

    }

    function GetData(IsChangeActive: boolean = false, ID: number = 0, Status: boolean = false, ISDirect: boolean = false) {

        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }


       

        
        CleaningList_Table();

                  

        let con = "";

        if ($('#drpActive').val() != "null") {
            con = " and Status = " + $('#drpActive').val()
        }

        debugger


        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'G_Employees', "CompCode = " + CompCode + "  " + con, SelectPageNumber.PageNumber, 5, "EmpID")
        }
        else {
            DisplayGridByPagination(_Grid, 'G_Employees', "CompCode = " + CompCode + "  " + con, 1, 5, "EmpID")
        }


        $('#btnDelete_Filter').removeClass('display_none');
        if (IsChangeActive && ID > 0) {
            let chack = _Grid.DataSource.filter(x => x.PurchaseID == ID)
            if (chack.length > 0) {
                if (chack[0].Status == Status) {
                    ShowMessage("Done Change 😍👌" + (Status == false ? " Not Approve " : " Approve "), "تم التغيير 😍👌" + (Status == false ? " عدم الموافقة " : " الموافقة "));
                }
                else {
                    ShowMessage("No Changes 😒", "لا تغييرات 😒");
                }
            }
        }
         
    }


    function Clear() {
        $('#Txt_FromTrData').val(GetDate())
        $('#Txt_TOTrData').val(GetDate())
        $('#btnDelete_Filter').addClass('display_none'); 
        CleaningList_Table();
        _Grid.DataSource = _Employeenone;
        _Grid.Bind();
    }


    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }
        GetData(false, 0, false, true);
    }


    function Status(ID: number, Status: boolean) {             
        let stat = Status == true ? 1 : 0;
        SqlExecuteQuery(" update [dbo].[G_Employees] set [Status] = " + stat + " where [EmpID] = " + ID + " ; update G_Data_Redis set Status = 0 where KeyTrigger = 'Employee' ")

        GetData(true, ID, Status, true);
    }
}
