
$(document).ready(() => {
    EmployeeManagement.InitalizeComponent();

});

namespace EmployeeManagement {
    
    var SysSession: SystemSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid: JsGrid = new JsGrid();
     
    var _Employeenone: Array<IQ_G_TypeEmployeesByUsing> = new Array<IQ_G_TypeEmployeesByUsing>();
   
    var Res = GetGlopelResources();

    export function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();          
        Close_Loder();
        SelectPageNumber.PageNumber = 1;
        GetData();
    }
    function InitalizeControls() { 
 
    }
    function InitializeEvents() { 
     
    }        
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";                     
        _Grid.PrimaryKey = "IDTypeEmp";
        _Grid.Paging = true;
        //_Grid.PageSize = 10;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: Res.Lang == "En" ? "EmpType" : "EmpType", name: "EmpType", visible: false, type: "text", width: "100px" },
            {
                title: Res.Lang == "En" ? "Add a Team Member" : "ادراج موظف جديد",
                itemTemplate: (s: string, item: IQ_G_TypeEmployeesByUsing): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Add a >>> " : " <<< ادراج");
                    txt.id = "butAddEmp" + item.IDTypeEmp;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "cadetblue";


                    if (!SysSession.CurrentPrivileges.CREATE) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {
                        AddEmp(item);
                    };
                    return txt;
                }
            },
            { title: Res.Lang == "En" ? "Employee Type" : "نوع الموظف", name: Res.Lang == 'Ar' ? "DescA" : "DescE", type: "text", width: "100px" },       
            {
                title: Res.Lang == "En" ? "Enter" : "دخول", width: "100px",
                itemTemplate: (s: string, item: IQ_G_TypeEmployeesByUsing): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "View Team Members ⚙️" : "عرض أعضاء القسم  ⚙️");
                    txt.id = "butViewProfile" + item.EmpType;
                     txt.className = "Style_Add_Item u-btn u-btn-info u-input u-input-rectangle";            
                    txt.style.backgroundColor = "chocolate";     
                    if (!SysSession.CurrentPrivileges.EDIT) {
                        txt.disabled = true
                    }          
                    txt.onclick = (e) => {
                        ViewEmpType(item);
                    };
                    return txt;
                }
            },     
        ];
        _Grid.Bind();

    }          
    function ViewEmpType(item: IQ_G_TypeEmployeesByUsing) {   
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        localStorage.setItem(GetParameterByName('App') + "EmpType", item.EmpType.toString());
        localStorage.setItem(GetParameterByName('App') + "limted_ManagerID","0");
        SetModelGlopel(item);
        OpenPagePartial("VeiwEmployeeManage", "View Employee ", () => { Display_Refrsh() });        
    }

    function GetData(IsChangeActive: boolean = false, ID: number = 0, Status: boolean = false, ISDirect: boolean = false) {
                          debugger
        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }         
        CleaningList_Table();       
 
        
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'IQ_G_TypeEmployeesByUsing', "CompCode = " + CompCode + " and EmpID = 0 " , SelectPageNumber.PageNumber, 5, "IDTypeEmp")
        }
        else {
            DisplayGridByPagination(_Grid, 'IQ_G_TypeEmployeesByUsing', "CompCode = " + CompCode + " and EmpID = 0 " , 1, 5, "IDTypeEmp")
        }
          
         
    }

    function AddEmp(item: IQ_G_TypeEmployeesByUsing) {

        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "4");
        localStorage.setItem(GetParameterByName('App') + "EmpType", item.EmpType.toString());
        SetModelGlopel(item)
        OpenPagePartial("Employees", "ViewEmployees", () => { Display_Refrsh() });

    }

    function Clear() {        
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
}
