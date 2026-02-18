
$(document).ready(() => {
    Tax_ViewSales.InitalizeComponent();

});

namespace Tax_ViewSales {

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid: JsGrid = new JsGrid();

    var _DataList: Array<IQ_TR_Sales> = new Array<IQ_TR_Sales>();
    var _Datanone: Array<IQ_TR_Sales> = new Array<IQ_TR_Sales>();
     
    var drpActive: HTMLSelectElement;
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;
    var FiltrBtnNameCustomer: HTMLButtonElement
    var Res: SystemResources = GetGlopelResources(); 
    var Is_CarCenter = SysSession.CurrentEnvironment.I_Control.Is_CarCenter;
    var IS_POS = SysSession.CurrentEnvironment.I_Control.IS_POS;
    var TaxLinkedEG = SysSession.CurrentEnvironment.I_Control.TaxLinkedEG;
    var TaxLinked = SysSession.CurrentEnvironment.I_Control.TaxLinked;
    var ExcelCon = "" ;
    export function InitalizeComponent() {



        InitalizeControls();
        InitializeEvents();

        $('#Txt_FromTrData').val(getFirstDayOfCurrentMonth())
        $('#Txt_FromTrData').val(GetDate())
        $('#Txt_TOTrData').val(GetDate())

        InitializeGrid();
        SearchID();
        Close_Loder();
        DownloadFileExcel();
    }
    function InitalizeControls() { 
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
        FiltrBtnNameCustomer = document.getElementById('FiltrBtnNameCustomer') as HTMLButtonElement;
    }
    function InitializeEvents() {
         
        Filter_View.onclick = () => { GetData() };
        btnDelete_Filter.onclick = Clear;
        FiltrBtnNameCustomer.onclick = SearchCustomer;
    }


    function SearchCustomer() {
        //and IsCreditCustomer = " + IsCredit
        //let IsCredit = IsCash.value == "1" ? "0" : "1"
        //  sys.FindKey("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
        //sys.FindKeySpeed("Customer", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', () => {
        sys.FindKeyPagination("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {

            let SelectedItem = SelectDataSearch.DataRow
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
         
            $('#FiltrCustomerID').val(SelectedItem.CustomerId);
            $('#FiltrBtnNameCustomer').html(SelectedItem.NAMEA); 



        });
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
            //    title: Res.Lang == "Ar" ? "النوع" : "Type", css: "ColumPadding", name: "IsCash", width: "100px",
            //    itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
            //        let txt: HTMLLabelElement = document.createElement("label");
            //        if (item.TrType == 0) {
            //            txt.innerHTML = Res.Lang == "En" ? 'Sales' : 'فاتوره'
            //        } else {
            //            txt.innerHTML = Res.Lang == "En" ? 'Return' : 'مرتجع'
            //        }
            //        return txt;
            //    }
            //},

            //{
            //    title: Res.Lang == "Ar" ? "نوع الفاتورة" : "Invoice Trans", css: "ColumPadding", name: "TrDate", width: "100px",
            //    itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
            //        let txt: HTMLLabelElement = document.createElement("label");
            //        if (item.InvoiceTransCode == 2) {
            //            txt.innerHTML = Res.Lang == "Ar" ? "مبسطة" : "Simple"
            //        }
            //        else {
            //            txt.innerHTML = Res.Lang == "Ar" ? "قياسية" : "Standar"
            //        }
            //        txt.style.color = "green"

            //        return txt;
            //    }
            //},
            {
                title: Res.Lang == "Ar" ? "التاريخ" : "TrDate", css: "SaleDate", name: "IsCash", width: "150px",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

                    txt.innerHTML = DateFormat(item.SaleDate)

                    return txt;
                }
            },
            //{ title: Res.Lang == "Ar" ? "الوقت" : "Time", name: "TrTime", type: "text", width: "100px" },
            //{ title: Res.Lang == "Ar" ? "انشاء بواسطة" : "CreatedBy", name: "CreatedBy", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "العميل" : "Customer", name: "CustomerName", type: "text", width: "100px" },
            {
                visible: Is_CarCenter,
                title: Res.Lang == "Ar" ? "رقم امر العمل" : "JobOrder No", css: "ColumPadding", name: "TaxStat_DescA", width: "100px",    
                    itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                        let txt: HTMLLabelElement = document.createElement("label");       
                        txt.innerHTML = item.JobRefNO; 
                        return txt;
                    }
            },
            {
                visible: Is_CarCenter,
                title: Res.Lang == "Ar" ? "نوع السيارة" : "CarBrand", css: "ColumPadding", name: "TaxStat_DescA", width: "100px",    
                    itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                        let txt: HTMLLabelElement = document.createElement("label");       
                        txt.innerHTML = item.CarBrand; 
                        return txt;
                    }
            },
            {
                visible: Is_CarCenter,
                title: Res.Lang == "Ar" ? "رقم السيارة" : "Car No", css: "ColumPadding", name: "TaxStat_DescA", width: "100px",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.CarNo;
                    return txt;
                }
            },      
            {
                visible: Is_CarCenter,
                title: Res.Lang == "Ar" ? "رقم الشاسيه" : "Chassis No", css: "ColumPadding", name: "TaxStat_DescA", width: "100px",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.ChassisNo;
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "نوع الدفع" : "Pay Type", css: "DescPayType", name: "IsCash", width: "100px",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label"); debugger
                    txt.innerHTML = item.DescPayType == null ? "آجل" : item.DescPayType;           
                    return txt;
                }
            },
            { title: Res.Lang == "Ar" ? "المستحق" : "DueAmount", name: "DueAmount", type: "text", width: "100px" },

            { visible: (TaxLinked == true ? true : (TaxLinkedEG == true ? true : false)),
                title: Res.Lang == "Ar" ? "الحالة" : "Status", css: "ColumPadding", name: "TaxStat_DescA", width: "100px",

                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

                    if (item.TaxStatus == -1) {
                        txt.style.fontWeight = 'bold';
                        txt.style.fontSize = '12px';
                        txt.innerHTML = Res.Lang == "AR" ? "جديد" : "New";
                    }

                    if (item.TaxStatus == 0) {
                        txt.style.color = '#0037ff';
                        txt.style.fontWeight = 'bold';
                        txt.style.fontSize = '12px';
                        txt.innerHTML = Res.Lang == "AR" ? "جاري المعالجة " : "In Progress";
                    }

                    if (item.TaxStatus == 1) {
                        txt.style.color = '#fd7f35';
                        txt.style.fontWeight = 'bold';
                        txt.style.fontSize = '12px';
                        txt.innerHTML = Res.Lang == "AR" ? "تم التوليد " : "Generated";
                    }

                    if (item.TaxStatus == 2) {
                        txt.style.color = '#06b30b';
                        txt.style.fontWeight = 'bold';
                        txt.style.fontSize = '12px';
                        txt.innerHTML = Res.Lang == "AR" ? "تم الرفع و التوثيق" : "Approved";
                    }

                    if (item.TaxStatus == 3) {
                        txt.style.fontWeight = 'bold';
                        txt.style.fontSize = '12px';
                        txt.innerHTML = Res.Lang == "AR" ? "مرفوضة" : "Rejected";
                    }


                    return txt;
                }
            },
            {
                visible: (TaxLinked == true ? false : (TaxLinkedEG == true ? false : true) ),
                title: Res.Lang == "Ar" ? "اعتماد" : "Active" ,
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.SaleID;
                    txt.className = "checkbox";
                    txt.checked = item.Status == 1 ? true : false;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    //-------------------------Privileges-----------------------
                    txt.disabled = true
                    if (item.Status == 0 && SysSession.CurrentPrivileges.CUSTOM1) {
                        txt.disabled = false
                    }
                    if (item.Status == 1 && SysSession.CurrentPrivileges.CUSTOM2) {
                        txt.disabled = false
                    }
                    //----------------------------------------------------------


                    //txt.disabled = item.Status == 0 ? false : true;

                    txt.onclick = (e) => {
                        IsActive(item.SaleID, txt.checked == false ? 0 : 1, item.TrType);
                    };
                    return txt;
                }
            },
            {
                visible: TaxLinked,
                title: Res.Lang == "Ar" ? "اعتماد" : "Approval",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("معتمدة ⏏️") : ("Approved ⏏️");
                    txt.id = "butSend" + item.SaleID;
                    txt.disabled = item.TaxStatus == -1 ? SysSession.CurrentPrivileges.CUSTOM5 == true ? false : true : true;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

                
                    txt.onclick = (e) => {
                        SendInvToTax(item.SaleID, item.TrType)
                    };
                    return txt;
                }
            },  
            {
                visible: TaxLinkedEG,
                title: Res.Lang == "Ar" ? "اعتماد" : "Approval",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("معتمدة ⏏️") : ("Approved ⏏️");
                    txt.id = "butSend" + item.SaleID;
                    txt.disabled = item.TaxStatus == -1 ? SysSession.CurrentPrivileges.CUSTOM5 == true ? false : true : true;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";


                    txt.onclick = (e) => {
                        SendInvToTaxEG(item.SaleID, item.TrType)
                    };
                    return txt;
                }
            },  
            {
                title: Res.Lang == "Ar" ? "الربح" : "Net Profit",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("الربح 💵") : ("Profit 💵");
                    txt.id = "butProfit" + item.SaleID;
                    //txt.disabled = item.TaxStatus == -1 ? false : true;
                    txt.style.backgroundColor = "#003ba5";

                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";



                    if (!SysSession.CurrentPrivileges.CUSTOM4) {
                        txt.disabled = true
                    }



                    txt.onclick = (e) => {

                        var Qurey = " ProfitInvoice " + item.SaleID;
                        let DataRes: Array<ProfitInvoice> = GetDataFromProc(Qurey, "ProfitInvoice")

                        if (DataRes.length) {
                            ShowMessage("Profit Invoice 💵 ( " + DataRes[0].Profit.toFixed(2) + " )", "ربح الفاتوره  💵 ( " + DataRes[0].Profit.toFixed(2) + " )")
                        }

                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "تعديل" : "Edit",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("تعديل 📝") : ("Edit 📝");
                    txt.id = "butEdit" + item.SaleID;
                    txt.style.backgroundColor = "cornflowerblue";

                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";


                    if (!SysSession.CurrentPrivileges.EDIT) {
                        txt.disabled = true
                    }

                    txt.disabled = item.Status == 0 ? false : true;

                    txt.onclick = (e) => {

                        EditData(item);

                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "مرتجع" : "Return",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("مرتجع 🔃") : ("Return 🔃");
                    txt.id = "butReturn" + item.SaleID;
                    if (item.Status == 1) {
                        if (item.TrType == 1) {
                            txt.disabled = true;
                        }
                        else {
                            txt.disabled = false;
                        }
                    }
                    else {
                        txt.disabled = true;
                    }

                    txt.style.backgroundColor = "darkred";
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                     

                    if (!SysSession.CurrentPrivileges.CUSTOM3) {
                        txt.disabled = true
                    }
                     

                    txt.onclick = (e) => {
                        ReturnData(item);

                    };
                    return txt;
                }
            },
            {
                visible: (TaxLinkedEG == true ? false : IS_POS == true ? false : true),
                title: Res.Lang == "Ar" ? "طباعة" : "Print",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? "طباعة 🖨️" : ("Print 🖨️");
                    txt.id = "butPrint" + item.SaleID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    //txt.disabled = item.TaxStatus == 2 ? false : true;

                    //txt.disabled = item.Status == 0 ? false : true;

                    if (!SysSession.CurrentPrivileges.PRINT) {
                        txt.disabled = true
                    }


                    txt.onclick = (e) => {

                        PrintInv(item.SaleID, item.InvoiceTransCode);
                    };
                    return txt;
                }
            },
            {
                visible: TaxLinkedEG,
                title: Res.Lang == "Ar" ? " طباعة ضريبيه" : "Print Tax",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? "طباعة 🖨️" : ("Print 🖨️");
                    txt.id = "butPrint" + item.SaleID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                     
                    txt.disabled = item.TaxStatus == 2 ? false : true;
                     
                    if (!SysSession.CurrentPrivileges.PRINT) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => { 
                        PrintInvTax(item.DocUUID);
                    };
                    return txt;
                }
            },
            {
                visible: IS_POS,
                title: Res.Lang == "Ar" ? "طباعة Slip" : "Print Slip",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? "   Slip 🖨️" : ("  Slip 🖨️");
                    txt.id = "butView" + item.SaleID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#25229c";
                    //txt.disabled = item.Status == 1 ? false : true; 

                    txt.onclick = (e) => {

                        PrintInvPOS(item);
                    };
                    return txt;
                }
            },
            {
                visible: (TaxLinked == true ? false : (TaxLinkedEG == true ? false : true)),
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
                        GetData(false , 0 , 0 , true);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "التفاصيل" : "التفاصيل",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Detail" : "التفاصيل " + " ⚙️");
                    txt.id = "butView" + item.SaleID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#0a0fa9";

                    txt.onclick = (e) => {
                        ViewItemDetail(item.SaleID);
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
    function ViewItemDetail(SaleID: number) {
        sys.FindKeyPagination("Sales", "BtnDetailSls", " SaleID = " + SaleID, () => {

            //let DataRow: IQ_ItemQtyHanging = SelectDataSearch.DataRow;   
        });


    }

    function PrintInvPOS(item: IQ_TR_Sales) {
        $("#Open").focus();
        SetModelGlopel(item)
        OpenPagePartial("PrintInvPos", "Print", () => { });
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
        if ($('#drpSales').val() != "null") {
            Con = Con + " and TrType =" + Number($('#drpSales').val());
        } if ($('#drpInvoiceTransCode').val() != "null") {
            Con = Con + " and InvoiceTransCode =" + Number($('#drpInvoiceTransCode').val());
        }

        debugger
        if (Number($('#FiltrCustomerID').val()) > 0) {
            Con = Con + " and CustomerID =" + Number($('#FiltrCustomerID').val());
        }


        Con = Con + " and   SaleDate   >= '" + $('#Txt_FromTrData').val() + "' and   SaleDate   <= '" + $('#Txt_TOTrData').val() + "'";



        ExcelCon = " TrType in(0,1) and CompCode = " + CompCode + Con;
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'IQ_TR_Sales', " TrType in(0,1) and CompCode = " + CompCode + Con, SelectPageNumber.PageNumber, 5, "SaleID")
        }
        else {
            DisplayGridByPagination(_Grid, 'IQ_TR_Sales', "   TrType in(0,1) and CompCode = " + CompCode + Con, 1, 5, "SaleID")
        }

        $('#btnDelete_Filter').removeClass('display_none');

        //var Table: Array<Table>;
        //Table =
        //    [
        //        { NameTable: 'IQ_TR_Sales', Condition: " TrType in(0,1) and  CompCode =" + CompCode + " " + Con },

        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************

        //_DataList = GetDataTable('IQ_TR_Sales');
        //_DataList = _DataList.sort(dynamicSortNew("SaleID"));
        //$('#btnDelete_Filter').removeClass('display_none');
        //for (var i = 0; i < _DataList.length; i++) {

        //    if (_DataList[i].TrType == 0) {

        //        _DataList[i].TrTypeDes = Res.Lang == "Ar" ? " مبيعات" : " Invoce";
        //    }

        //    if (_DataList[i].TrType == 1) {

        //        _DataList[i].TrTypeDes = Res.Lang == "Ar" ? " مرتجع" : " Return";
        //    }

        //    if (_DataList[i].TaxStatus == -1) {

        //        _DataList[i].TaxStatusDes = Res.Lang == "Ar" ? "جديد" : "New";
        //    }

        //    if (_DataList[i].TaxStatus == 0) {

        //        _DataList[i].TaxStatusDes = Res.Lang == "Ar" ? "جاري المعالجة " : "In Progress";
        //    }

        //    if (_DataList[i].TaxStatus == 1) {

        //        _DataList[i].TaxStatusDes = Res.Lang == "Ar" ? "تم التوليد " : "Generated";
        //    }

        //    if (_DataList[i].TaxStatus == 2) {

        //        _DataList[i].TaxStatusDes = Res.Lang == "Ar" ? "تم الرفع و التوثيق" : "Approved";
        //    }

        //    if (_DataList[i].TaxStatus == 3) {

        //        _DataList[i].TaxStatusDes = Res.Lang == "Ar" ? "مرفوضة" : "Rejected";
        //    }

        //}
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
    function PrintInv(InvoiceID: Number, Transcode: number) {
        var RepParam: Array<RepParamter>;
        RepParam =
            [
                { Parameter: 'InvoiceID', Value: "" + InvoiceID + "" },
            ]
        let NameRep = Transcode == 2 ? "PrintInvoiceSimpleAr" : "PrintInvoiceStanderAr";
        Print_Report(NameRep, "IProc_Prnt_SlsInvoice", RepParam, "Comp" + CompCode, "");

    }


    function PrintInvTax(DocUUID: string) {


        Show_Loder();

        setTimeout(function () {


            debugger

            let x = sys.apiUrl("Home", "PrintTax");

        let UrlPdf = x + "/" + "?" + "CompCode=" + CompCode + "&DocUUID=" + DocUUID + "&Lang=" + Res.Lang;

        console.log(UrlPdf)
        window.open(UrlPdf, "blank");

        }, 50);

        Close_Loder();




        //Ajax.CallsyncSave({
        //    type: "Get",
        //    url: sys.apiUrl("SalesTax", "PrintTax"),
        //    data: { CompCode: CompCode, DocUUID: DocUUID, Lang: Res.Lang },
        //    success: (d) => {
        //        debugger
        //        let Res = d as BaseResponse;
        //        let result = Res.Response as BaseResponse;

        //        if (result.IsSuccess) {

        //            ShowMessage("Send 🤞😉", "تم الرفع 🤞😉");
        //            Filter_View.click();
        //            Close_Loder();


        //        }
        //        else {

        //            ShowMessage(result.ErrorMessage + " ❌", result.ErrorMessage + " ❌");

        //            Filter_View.click();
        //            Close_Loder();

        //        }

        //    }
        //});

    }


    function Clear() {

        $('#FiltrCustomerID').val('');
        $('#FiltrBtnNameCustomer').html(Res.Lang == 'En' ? 'Search Customer' : 'بحث عملاء'); 

        $('#drpActive').val("null");
        //$('#drpSales').val("null"); 
        $('#drpInvoiceTransCode').val("null");
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
    function IsActive(ID: number, Status: number, TrType: number) {

     
        if (Status == 1 && !CheckQtyInInvoice(ID)) {
            GetData(true, ID, Status, true);
            return 
        }

        SqlExecuteQuery(" update [dbo].[I_TR_Sales] set [Status] = " + Status + " , TaxStatus = " + (Status == 1 ? "2" : "-1") + "  where [SaleID] = " + ID)

        var Mod = Status == 0 ? "Open" : "Update";
        var Type = TrType == 0 ? "SalesInv" : "SalesRet";
        SqlExecuteQuery("[G_ProcessTrans] " + sys.SysSession.CurrentEnvironment.CompCode + ",1,'" + Type + "','" + Mod + "'," + ID + "," + 1 + ",0");

        GetData(true, ID, Status, true);
    }


    function CheckQtyInInvoice(_SaleID: number) {
        debugger
        let Proc = "G_CheckQtyInInvoice " + _SaleID

        let DataRes = GetDataFromProc(Proc, "G_CheckQtyInInvoice")
        debugger
        if (DataRes.length > 0 ) {

            let messag: string = Res.Lang == 'Ar' ? DataRes[0].Message_ItemIssueAr : DataRes[0].Message_ItemIssueEn

            if ((messag ?? '').trim() != '' ) {

                let Spltmessag = messag.split('-').join('\n');
                alert(Spltmessag)
                //ShowMessage(Spltmessag + "🚫", Spltmessag + "🚫");

                return false; 
            }
            else {
                return true; 
            }

             
        }

        return true; 
    }

    function ValidInvoiceStatus(SaleID: number, TrType: number) {
        let ListInvoiceStatus: Array<I_TR_Sales> = GetDataFrom("I_TR_Sales", " CompCode = " + CompCode + " and  Status =  0  and TrType = " + TrType + " and SaleID < " + SaleID)

        if (ListInvoiceStatus.length > 0) {

            var frist = 0;
            let ListTrNo = ''
            for (var i = 0; i < ListInvoiceStatus.length; i++) {
                if (frist == 0) {
                    ListTrNo = ListInvoiceStatus[i].TrNo.toString();
                }
                else {
                    ListTrNo = ListTrNo + " , " + ListInvoiceStatus[i].TrNo.toString();
                }
            }



            ShowMessage("This invoice requires prior approval of the mentioned invoices.  ( " + ListTrNo + " ) 😒", "تتطلب هذه الفاتورة موافقة مسبقة على الفواتير المذكورة. ( " + ListTrNo + " ) 😒")

            return false;
        }
        return true;

    }
    function SendInvToTax(SaleID: number, TrType: number) {
        if (!ValidInvoiceStatus(SaleID, TrType)) {
            return false;

        }

        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("SalesTax", "SendInvToTax"),
            data: { SaleID: SaleID },
            success: (d) => {

                let Res = d as BaseResponse;
                let result = Res.Response as BaseResponse;

                if (result.IsSuccess) {

                    ShowMessage("Send 🤞😉", "تم الرفع 🤞😉");
                    Filter_View.click();
                    Close_Loder();


                }
                else {

                    ShowMessage(result.ErrorMessage + " ❌", result.ErrorMessage + " ❌");

                    Filter_View.click();
                    Close_Loder();

                }

            }
        });
    }

    function SendInvToTaxEG(SaleID: number, TrType: number) {
        if (!ValidInvoiceStatus(SaleID, TrType)) {
            return false;

        }


        let Status = 1

        SqlExecuteQuery(" update [dbo].[I_TR_Sales] set [Status] = " + Status + " , TaxStatus = 0  where [SaleID] = " + SaleID)

        var Mod = Status == 0 ? "Open" : "Update";
        var Type = TrType == 0 ? "SalesInv" : "SalesRet";
        SqlExecuteQuery("[G_ProcessTrans] " + sys.SysSession.CurrentEnvironment.CompCode + ",1,'" + Type + "','" + Mod + "'," + SaleID + "," + 1 + ",0");

        GetData(true, SaleID, Status, true);

        
    }

    function EditData(item: IQ_TR_Sales) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item)
        OpenPagePartial("Tax_Sales", "Edit Tax Sales ", () => { Display_Refrsh() });
    }
    function ReturnData(item: IQ_TR_Sales) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "2");
        SetModelGlopel(item)
        OpenPagePartial("Tax_Sales", "Return Tax Sales ", () => { Display_Refrsh() });
    }

    function DownloadFileExcel() {
       
        GnrGridDownloadExcel(() => {


            if (SysSession.CurrentEnvironment.Language == "Ar") {
                let keyMapping = {
                    TrNo: 'رقم الفاتورة',
                    TrTypeDes: 'نوع الفاتورة',
                    SaleDate: 'تاريخ الفاتورة',
                    CustomerName: 'اسم العميل',
                    TotalAmount: 'صافي الفاتورة',
                    VatAmount: 'صافي الضريبة  ',
                    DueAmount: 'اجمالي المستحق',
                    TaxStatusDes: 'الحالة',
                    CreatedBy: 'تم إنشاؤه بواسطة',


                };
                ConvertModelToFileExcelAllData('SelesReport', "IQ_TR_Sales", ExcelCon, keyMapping);
                //ConvertModelToFileExcel('SelesReport', _Grid.DataSource, keyMapping)

            } else {
                let keyMapping = {
                    TrNo: 'SelesNo',
                    TrTypeDes: 'Seles Type',
                    SaleDate: 'Sale Date',
                    CustomerName: 'Customer Name',
                    TotalAmount: 'Total Amount',
                    VatAmount: 'Vat Amount', 
                    DueAmount: 'Due Amount',
                    TaxStatusDes: 'Status',
                    CreatedBy: 'CreatedBy',


                };
                ConvertModelToFileExcelAllData('SelesReport', "IQ_TR_Sales", ExcelCon, keyMapping);        
                //ConvertModelToFileExcel('SelesReport', _Grid.DataSource, keyMapping)
            }


        });

    }
}
