
$(document).ready(() => {
    ViewPurOrder.InitalizeComponent();

});

namespace ViewPurOrder {
     
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid: JsGrid = new JsGrid();
     
    var _Datanone: Array<IQ_TR_Purchases> = new Array<IQ_TR_Purchases>();
     
    var drpActive: HTMLSelectElement;
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;
    var Res: SystemResources = GetGlopelResources();

    export function InitalizeComponent() {
         

         
        InitalizeControls();
        InitializeEvents();

        $('#Txt_FromTrData').val(GetDate())
        $('#Txt_TOTrData').val(GetDate())
        InitializeGrid();
        SearchID();
        DownloadFileExcel();
        Close_Loder();
    }


    function DownloadFileExcel() {

        GnrGridDownloadExcel(() => {
             
                let keyMapping = {
                    TrNo: Res.Lang == "En" ? 'PurOrd.No' : 'رقم امر الشراء',
                    TrTypeDes: Res.Lang == "En" ? 'PurOrdType' : 'النوع',
                    SaleDate: Res.Lang == "En" ? 'PurOrdDate' : 'التاريخ',
                    CustomerName: Res.Lang == "En" ? 'Suplyer Name' : 'اسم المورد',
                    TotalAmount: Res.Lang == "En" ? 'Total Amount' : 'الاجمالي',
                    VatAmount: Res.Lang == "En" ? 'Vat Amount' : 'الضريبه',
                    NetAmount: Res.Lang == "En" ? 'Net Amount' : 'الصافي',
                    TaxStatusDes: Res.Lang == "En" ? 'Status' : 'الحاله',
                    CreatedBy: Res.Lang == "En" ? 'CreatedBy' : 'انشاء بوسطة', 
                };
                ConvertModelToFileExcel('PurOrdReport', _Grid.DataSource, keyMapping)
         
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
    function SearchID() {
        SearchIDGnr(() => {
            ViewUser(ModelSearch.ModelMaster)
        });
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "PurchaseID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "PurchaseID", name: "PurchaseID", visible: false, width: "100px" },
            { title: Res.Lang == "Ar" ? "رقم امر الشراء" : "Pur.No", name: "TrNo", type: "text", width: "100px" },
            //{ title: Res.Lang == "Ar" ? "رقم المرجع" : "Ref.No", name: "ReNo", type: "text", width: "100px" }, 
            {
                title: Res.Lang == "Ar" ? "التاريخ" : "TrDate", css: "PurDate", name: "IsCash", width: "100px",
                itemTemplate: (s: string, item: IQ_TR_Purchases): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

                    txt.innerHTML = DateFormat(item.PurDate)

                    return txt;
                }
            },
            { title: Res.Lang == "Ar" ? "الوقت" : "Time", name: "TrTime", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "الصافي" : "NetAmount", name: "NetAmount", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "انشاء بواسطة" : "CreatedBy", name: "CreatedBy", type: "text", width: "100px" },
            {
                title: Res.Lang == "Ar" ? "اعتماد" : "Approval",
                itemTemplate: (s: string, item: IQ_TR_Purchases): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.PurchaseID;
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
                        IsActive(item.PurchaseID, txt.checked == false ? 0 : 1);
                    };
                    return txt;
                }
            },

            {
                title: Res.Lang == "Ar" ? "تعديل" : "Edit",
                itemTemplate: (s: string, item: IQ_TR_Purchases): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("تعديل 📝") : ("Edit 📝");
                    txt.id = "butEdit" + item.PurchaseID;
                    txt.disabled = item.Status == 0 ? false : true;
                    txt.style.backgroundColor = "cornflowerblue";

                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";


                    if (!SysSession.CurrentPrivileges.EDIT) {
                        txt.disabled = true
                    }



                    txt.onclick = (e) => {

                        EditData(item);

                    };
                    return txt;
                }
            },
            
            {
                title: Res.Lang == "Ar" ? "طباعة" : "Print",
                itemTemplate: (s: string, item: IQ_TR_Purchases): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? "طباعة 🖨️" : ("Print 🖨️");
                    txt.id = "butPrint" + item.PurchaseID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    txt.disabled = item.Status == 1 ? false : true;


                    if (!SysSession.CurrentPrivileges.PRINT) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {

                        PrintInv(item.PurchaseID, item.InvoiceTransCode);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Delete" : "حذف", width: "100px",
                itemTemplate: (s: string, item: IQ_TR_Purchases): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Delete" : "حذف ");
                    txt.id = "butView" + item.PurchaseID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#860000";


                    txt.disabled = item.Status == 1 ? true : false;

                    if (!SysSession.CurrentPrivileges.DELETE) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {

                        SqlExecuteQuery("update [dbo].[I_TR_Purchases] set CompCode = (CompCode * -1 ) where PurchaseID = " + item.PurchaseID)
                        GetData(false, 0, 0, true);
                    };
                    return txt;
                }
            },
            {
                visible: (SysSession.CurrentEnvironment.I_Control.IsArchive == true ? true : false), title: Res.Lang == "Ar" ? "ارشفه" : "Archive",
                itemTemplate: (s: string, item: IQ_TR_Purchases): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = "📩"
                    txt.id = "butArchive" + item.PurchaseID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#16c76d";
                    txt.style.borderRadius = "50%";
                    txt.style.width = "50px";

                    if (!SysSession.CurrentPrivileges.IsArchive) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {
                        ShowArchive(SysSession.CurrentEnvironment.GQ_USERS.ID.toString(), SysSession.CurrentEnvironment.CompCode.toString(), GetModelCodeFromUrl(), item.PurchaseID.toString(), txt.id);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();

    }
   
    function GetData(IsChangeActive: boolean = false, ID: number = 0, Status: number = 0, ISDirect: boolean = false) {
         

        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }


        CleaningList_Table();
        let Con = "";
        if ($('#drpActive').val() != "null") {
            Con = Con + " and Status =" + Number($('#drpActive').val());
        }

        Con = Con + " and IDPeriod <> 1  and  PurDate   >= '" + $('#Txt_FromTrData').val() + "' and    PurDate   <= '" + $('#Txt_TOTrData').val() + "'";



        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'IQ_TR_Purchases', " TrType in(2) and  CompCode =" + CompCode + " " + Con, SelectPageNumber.PageNumber, 5, "PurchaseID")
        }
        else {
            DisplayGridByPagination(_Grid, 'IQ_TR_Purchases', " TrType in(2) and  CompCode =" + CompCode + " " + Con, 1, 5, "PurchaseID")
        }
         


        //var Table: Array<Table>;
        //Table =
        //    [
        //        { NameTable: 'IQ_TR_Purchases', Condition: " TrType in(2) and  CompCode =" + CompCode + " " + Con },

        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************
         
        //_DataList = GetDataTable('IQ_TR_Purchases');
        //_DataList = _DataList.sort(dynamicSortNew("PurchaseID"));
        //_Grid.DataSource = _DataList;
        //_Grid.Bind();

        $('#btnDelete_Filter').removeClass('display_none');
        if (IsChangeActive && ID > 0) {
            let chack = _Grid.DataSource.filter(x => x.PurchaseID == ID)
            if (chack.length > 0) {
                if (chack[0].Status == Status) {
                    ShowMessage("Done Change 😍👌" + (Status == 0 ? " Not Approve " : " Approve "), "تم التغيير 😍👌" + (Status == 0 ? " عدم الموافقة " : " الموافقة "));
                }
                else {
                    ShowMessage("No Changes 😒", "لا تغييرات 😒");
                }
            }
        }
    }
    function ViewUser(item: IQ_TR_Purchases) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item)
        OpenPagePartial("Purchases", "Edit Purchases ", () => { Display_Refrsh() });
    }
    function PrintInv(InvoiceID: Number, Transcode: number) {
        var RepParam: Array<RepParamter>;
        RepParam =
            [
                { Parameter: 'TrID', Value: "" + InvoiceID + "" },
            ]                                                                                                      
        Print_Report("Prnt_PurOrderAr", "IProc_Prnt_Purchases", RepParam, "Comp" + CompCode, "");

    }
    function Clear() {
        $('#drpActive').val("null");
        $('#Txt_FromTrData').val(GetDate())
        $('#Txt_TOTrData').val(GetDate())
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Datanone;
        _Grid.Bind();
    }

    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }
        GetData(false, 0, 0, true);
    }
    function IsActive(ID: number, Status: number) {

         
        SqlExecuteQuery(" update [dbo].[I_TR_Purchases] set [Status] = " + Status + " where [PurchaseID] = " + ID + ";  update G_Data_Redis set Status = 0 where KeyTrigger = 'Pur'")

        GetData(true, ID, Status,true);
    }



    function EditData(item: IQ_TR_Purchases) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item)
        OpenPagePartial("PurOrder", "Edit PurOrder ", () => { Display_Refrsh() });
    }
 
}
