
$(document).ready(() => {
    ViewSales.InitalizeComponent();

});

namespace ViewSales {
     
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid: JsGrid = new JsGrid();
     
    var _Datanone: Array<IQ_TR_Sales> = new Array<IQ_TR_Sales>(); 
     
    var drpActive: HTMLSelectElement;
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement; 
    var Res = GetGlopelResources();

    export function InitalizeComponent() {
         

         
        InitalizeControls();
        InitializeEvents();

        $('#Txt_FromTrData').val(GetDate())
        $('#Txt_TOTrData').val(GetDate())

        InitializeGrid(); 
        SearchID();
        Close_Loder();
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
        _Grid.PrimaryKey = "SaleID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "SaleID", name: "SaleID", visible: false, width: "100px" },
            { title: Res.Lang == "Ar" ? "الرقم " : "No", name: "TrNo", type: "text", width: "100px" },
            //{
            //    title: "Cash Type", css: "ColumPadding", name: "IsCash", width: "100px",
            //    itemTemplate: (s: string, item: I_TR_FinancialTransactions): HTMLLabelElement => {
            //        let txt: HTMLLabelElement = document.createElement("label");
            //        if (item.TrType == 0) {
            //            txt.innerHTML = 'فاتوره'
            //        } else {
            //            txt.innerHTML = 'مرتجع'
            //        }
            //        return txt;
            //    }
            //},
            {
                title: Res.Lang == "Ar" ? "التاريخ " : "Date", css: "SaleDate", name: "IsCash", width: "100px",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

                    txt.innerHTML = DateFormat(item.SaleDate)

                    return txt;
                }
            },
            { title: Res.Lang == "Ar" ? "الوقت " : "Time", name: "TrTime", type: "text", width: "100px" }, 
            { title: Res.Lang == "Ar" ? "الدفع " : "Pay Type", name: "DescPayType", type: "text", width: "100px" }, 
            { title: Res.Lang == "Ar" ? "المبلغ " : "NetAmount", name: "NetAmount", type: "text", width: "100px" }, 
            { title: Res.Lang == "Ar" ? "انشاء " : "CreatedBy", name: "CreatedBy", type: "text", width: "100px" }, 
            { title: Res.Lang == "Ar" ? "الفني " : "SalesManName", name: "SalesManName", type: "text", width: "100px" }, 
         
            {
                title: "Active",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.SaleID;
                    txt.className = "checkbox";
                    txt.checked = item.Status == 1 ? true : false;
                    txt.style.width = "50px"
                    txt.style.height = "35px"

                    txt.disabled = true
                    if (item.Status == 0 && SysSession.CurrentPrivileges.CUSTOM1) {
                        txt.disabled = false
                    }
                    if (item.Status == 1 && SysSession.CurrentPrivileges.CUSTOM2) {
                        txt.disabled = false
                    }


                    txt.onclick = (e) => {
                        IsActive(item.SaleID, txt.checked == false ? 0 : 1);
                    };
                    return txt;
                }
            },
            //{
            //    title: "Return",
            //    itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
            //        let txt: HTMLInputElement = document.createElement("input");
            //        txt.type = "button";
            //        txt.value = ("Return 🔃");
            //        txt.id = "butView" + item.SaleID;
            //        txt.disabled = item.Status == 1 ? true : false; 
            //        txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

            //        txt.onclick = (e) => {
            //            //ViewUser(item);
            //            ShowMessage("تحت الانشاء 😁")

                        
            //        };
            //        return txt;
            //    }
            //},
            {
                title: "Print",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Print ");
                    txt.id = "butView" + item.SaleID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    txt.disabled = item.Status == 1 ? false : true; 
                    txt.onclick = (e) => {
                         
                        PrintInv(item); 
                    };
                    return txt;
                }
            },
            { 
                title: Res.Lang == "En" ? "Delete" : "حذف", width: "100px",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Delete" : "حذف ");
                    txt.id = "butView" + item.SaleID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#860000";


                    txt.disabled = item.Status == 1 ? true : false;

                    if (!SysSession.CurrentPrivileges.DELETE) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {

                        SqlExecuteQuery("update [dbo].[I_TR_Sales] set CompCode = (CompCode * -1 ) , JobOrderID = null ,   ShowPriceID = null where SaleID = " + item.SaleID)
                        GetData(false, 0, 0, true);
                    };
                    return txt;
                }
            },
            {
                visible: (SysSession.CurrentEnvironment.I_Control.IsArchive == true ? true : false), title: Res.Lang == "Ar" ? "ارشفه" : "Archive",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = "📩"
                    txt.id = "butArchive" + item.SaleID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#16c76d";
                    txt.style.borderRadius = "50%";
                    txt.style.width = "50px";

                    if (!SysSession.CurrentPrivileges.IsArchive) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {
                        ShowArchive(SysSession.CurrentEnvironment.GQ_USERS.ID.toString(), SysSession.CurrentEnvironment.CompCode.toString(), GetModelCodeFromUrl(), item.SaleID.toString(), txt.id);
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

        Con = Con + " and  IDPeriod <> 1  and CAST(SaleDate AS DATE) >= '" + $('#Txt_FromTrData').val() + "' and   CAST(SaleDate AS DATE) <= '" + $('#Txt_TOTrData').val() + "'";



        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'IQ_TR_Sales', "   CompCode =" + CompCode + " " + Con, SelectPageNumber.PageNumber, 5, "SaleID")
        }
        else {
            DisplayGridByPagination(_Grid, 'IQ_TR_Sales', "   CompCode =" + CompCode + " " + Con, 1, 5, "SaleID")
        }
         

        //var Table: Array<Table>;
        //Table =
        //    [
        //    { NameTable: 'IQ_TR_Sales', Condition: "   CompCode =" + CompCode + " " + Con },

        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************
         
        //_DataList = GetDataTable('IQ_TR_Sales');
        //_DataList = _DataList.sort(dynamicSortNew("SaleID"));
        //$('#btnDelete_Filter').removeClass('display_none');
        //_Grid.DataSource = _DataList;
        //_Grid.Bind();

        if (IsChangeActive && ID > 0) {
            let chack = _Grid.DataSource.filter(x => x.SaleID == ID)
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
    function ViewUser(item: IQ_TR_Sales) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item)
        OpenPagePartial("Purchases", "Edit Purchases ", () => { Display_Refrsh() });
    }
    function PrintInv(item: IQ_TR_Sales) {
        $("#Open").focus(); 
        SetModelGlopel(item)
        OpenPagePartial("PrintInvPos", "Print", () => {  });
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

         
        SqlExecuteQuery(" update [dbo].[I_TR_Sales] set [Status] = " + Status + " where [SaleID] = " + ID)


        var Mod = Status == 0 ? "Open" : "Update";
        //var Type = TrType == 0 ? "SalesInv" : "SalesRet";
        var Type = "SalesInv";
        SqlExecuteQuery("[G_ProcessTrans] " + sys.SysSession.CurrentEnvironment.CompCode + ",1,'" + Type + "','" + Mod + "'," + ID + "," + 1 + ",0");


        GetData(true, ID, Status, true);
    }
}
