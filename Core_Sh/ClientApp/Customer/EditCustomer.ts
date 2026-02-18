
$(document).ready(() => {
    EditCustomer.InitalizeComponent();

});

namespace EditCustomer {
     
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid: JsGrid = new JsGrid();
     
    var _Usersnone: Array<D_Customer> = new Array<D_Customer>();
 
  
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;
    var Res = GetGlopelResources();

    export function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();

        DownloadFileExcel();
        Close_Loder();
    }



    function DownloadFileExcel() {
         
        GnrGridDownloadExcel(() => {
             
                let keyMapping = { 
                    CustomerCODE: Res.Lang == "En" ? "Customer Code" : "الكود",
                    NAMEA: Res.Lang == "En" ? "Name" : "الاسم",
                    MOBILE: Res.Lang == "En" ? "Mobile" : "الموبيل",
                    //VatNo: Res.Lang == "En" ? "VatNo" : "رقم الضريبي",
                    Remarks: Res.Lang == "En" ? "Remarks" : "الملاحظات",
                    ISPersonal: Res.Lang == "En" ? "Customer Type" : "نوع العميل",


                };
            ConvertModelToFileExcel('CustomerReport', _Grid.DataSource, keyMapping)  
        }); 
    }
    function InitalizeControls() { 
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
    }
    function InitializeEvents() { 
        Filter_View.onclick = () => { GetData() };
        btnDelete_Filter.onclick = Clear;
    }
   
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";                     
        _Grid.PrimaryKey = "CustomerId";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: Res.Lang == "En" ?  "CustomerCODE" : "الكود", name: "CustomerCODE", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "Name" : "الاسم" , name: "NAMEA", type: "text", width: "100px" },
            //{ title: Res.Lang == "En" ? "VatNo" : "رقم الضريبي", name: "VatNo", type: "text", width: "100px" },

            { title: Res.Lang == "En" ? "Remarks" : "الملاحظات", name: "REMARKS", type: "text", width: "100px" },
            {
                title: Res.Lang == "En" ?  "Customer Type" : "نوع العميل", css: "ColumPadding", name: "ISPersonal", width: "100px",
                itemTemplate: (s: string, item: D_Customer): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
 
                    if (item.ISPersonal == true) {
                        txt.innerHTML = 'شخصي'
                    } else {
                        txt.innerHTML = 'شركة '
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Active" : "نشط", width: "50px", 
                itemTemplate: (s: string, item: D_Customer): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.CustomerId;
                    txt.className = "checkbox";       
                    txt.checked = item.Isactive;
                    txt.style.width = "50px"
                    txt.style.height = "35px"
                    txt.onclick = (e) => {
                        IsActive(item.CustomerId, txt.checked);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Edit" : "تعديل",
                itemTemplate: (s: string, item: D_Customer): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Edit" : "تعديل" + " ⚙️");
                    txt.id = "butView" + item.CustomerId;
                     txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

                    txt.onclick = (e) => {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "الرصيد" : "Balance",
                itemTemplate: (s: string, item: D_Customer): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("الرصيد 💵") : ("Balance 💵");
                    txt.id = "Balance" + item.CustomerId;
                    //txt.disabled = item.TaxStatus == -1 ? false : true;
                    txt.style.backgroundColor = "#003ba5";

                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                             
                    if (!SysSession.CurrentPrivileges.CUSTOM4) {
                        txt.disabled = true
                    }



                    txt.onclick = (e) => {

                        var Qurey = " Get_Balance 1, " + item.CustomerId;
                        let DataRes: Array<Get_Balance> = GetDataFromProc(Qurey, "Get_Balance")

                        if (DataRes.length) {
                            ShowMessage("Customer Balance 💵 ( " + DataRes[0].Balance.toFixed(2) + " )", "رصيد العميل  💵 ( " + DataRes[0].Balance.toFixed(2) + " )")
                        }

                    };
                    return txt;
                }
            },
            {
                visible: (SysSession.CurrentEnvironment.I_Control.IsArchive == true ? true : false), title: Res.Lang == "Ar" ? "ارشفه" : "Archive",
                itemTemplate: (s: string, item: D_Customer): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = "📩"
                    txt.id = "butArchive" + item.CustomerId;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#16c76d";
                    txt.style.borderRadius = "50%";
                    txt.style.width = "50px";

                    if (!SysSession.CurrentPrivileges.IsArchive) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {
                        ShowArchive(SysSession.CurrentEnvironment.GQ_USERS.ID.toString(), SysSession.CurrentEnvironment.CompCode.toString(), GetModelCodeFromUrl(), item.CustomerId.toString(), txt.id);
                    };
                    return txt;
                }
            },
            
        ];
        _Grid.Bind();

    }
    function ViewUser(item: D_Customer) {
         
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item)
        OpenPagePartial("Customer", "EditCustomer", () => { Display_Refrsh() });
 
    }
    function GetData(IsChangeActive: boolean = false, ID: number = 0, Status: boolean = false, ISDirect: boolean = false) {

        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }


        
         
        CleaningList_Table();

         

            let con = "";

        if ($('#drpActive').val() != "null" ) {
            con = " and Isactive = "+ $('#drpActive').val() 
        }
        
        if ($('#ISPersonal').val() != "null" ) {
            con = " and ISPersonal = " + $('#ISPersonal').val() 
        }


        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'D_Customer', "     CompCode = " + CompCode + con, SelectPageNumber.PageNumber, 5, "CustomerId")
        }
        else {
            DisplayGridByPagination(_Grid, 'D_Customer', "     CompCode = " + CompCode + con, 1, 5, "CustomerId")
        }

         
        //var Table: Array<Table>;
        //Table =
        //    [
        //    { NameTable: 'D_Customer', Condition: " CompCode = " + CompCode + " " + con },

        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************
         
        //_UsersList = GetDataTable('D_Customer');
        //_UsersList = _UsersList.sort(dynamicSortNew("CustomerCODE"));
        //$('#btnDelete_Filter').removeClass('display_none');
        //_Grid.DataSource = _UsersList;
        //_Grid.Bind();

        $('#btnDelete_Filter').removeClass('display_none');

        if (IsChangeActive && ID > 0) {
            let chack = _Grid.DataSource.filter(x => x.CustomerId == ID)
            if (chack.length > 0) {
                if (chack[0].Isactive == Status) {
                    ShowMessage("Done Change 😍👌" + (Status == false ? " Not Approve " : " Approve "), "تم التغيير 😍👌" + (Status == false ? " عدم الموافقة " : " الموافقة "));
                }
                else {
                    ShowMessage("No Changes 😒", "لا تغييرات 😒");   
                }
            }
        }

    }


    function Clear() { 
        $('#btnDelete_Filter').addClass('display_none');
        $('#txtSearch').val('');
        $('#drpActive').val('null');
        $('#ISPersonal').val('null');
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
        GetData(false, 0, false, true);
    }


    function IsActive(ID: number, Status: boolean) {             
        let stat = Status == true ? 1 : 0;
        SqlExecuteQuery(" update [dbo].[D_Customer] set [Isactive] = " + stat + " where [CustomerId] = " + ID +" ;      update G_Data_Redis set Status = 0 where KeyTrigger = 'Customer' ;")

        GetData(true, ID, Status, true);
    }
}
