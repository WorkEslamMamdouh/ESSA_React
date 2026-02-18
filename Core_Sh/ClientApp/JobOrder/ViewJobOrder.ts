
$(document).ready(() => {
    ViewJobOrder.InitalizeComponent();

});

namespace ViewJobOrder {

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
    var ExcelCon = "";

    export function InitalizeComponent() {



        //alert(SysSession.CurrentPrivileges.CUSTOM1)

        InitalizeControls();
        InitializeEvents();
        $('#Txt_FromTrData').val(getFirstDayOfCurrentMonth())
        $('#Txt_TOTrData').val(GetDate())
        InitializeGrid();
        DownloadFileExcel();
        Close_Loder();
    }

    function DownloadFileExcel() {

        GnrGridDownloadExcel(() => {

            let keyMapping = {
                TrNo: Res.Lang == "En" ? 'SelesNo' : 'الرقم ',
                ReNo: Res.Lang == "En" ? 'Ref.No' : 'رقم المرجع ',
                TrTypeDes: Res.Lang == "En" ? 'Seles Type' : 'النوع ',
                SaleDate: Res.Lang == "En" ? 'Sale Date' : 'التاريخ',
                CustomerName: Res.Lang == "En" ? 'Customer Name' : 'اسم العميل',
                TotalAmount: Res.Lang == "En" ? 'Total Amount' : 'الاجمالي',
                VatAmount: Res.Lang == "En" ? 'Vat Amount' : 'الضريبه',
                NetAmount: Res.Lang == "En" ? 'Net Amount' : 'الصافي',
                TaxStatusDes: Res.Lang == "En" ? 'Status' : 'الحاله',
                CreatedBy: Res.Lang == "En" ? 'CreatedBy' : 'انشاء بواسطة',


            };
            //ConvertModelToFileExcel('JobOrderReport', _Grid.DataSource, keyMapping)
            ConvertModelToFileExcelAllData('JobOrderReport', "IQ_TR_Sales", ExcelCon, keyMapping);      

        });

    }
    function InitalizeControls() {
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
        FiltrBtnNameCustomer = document.getElementById('FiltrBtnNameCustomer') as HTMLButtonElement;
    }
    function InitializeEvents() {

        Filter_View.onclick = () => {
            if (!SysSession.CurrentPrivileges.VIEW) {
                ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
                return
            }

            GetData()
        };
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
            { title: Res.Lang == "Ar" ? "رقم الحركة" : "JobOrderNo", name: "TrNo", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "رقم المرجع" : "Ref.No", name: "ReNo", type: "text", width: "100px" },
            {
                title: Res.Lang == "Ar" ? "التاريخ" : "Tr.Date", css: "SaleDate", name: "IsCash", width: "100px",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

                    txt.innerHTML = DateFormat(item.SaleDate)

                    return txt;
                }
            },
            { title: Res.Lang == "Ar" ? "الوقت" : "Time", name: "TrTime", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "صافي المبلغ" : "NetAmount", name: "NetAmount", type: "text", width: "100px" },
            //{ title: Res.Lang == "Ar" ? "انشاء بواسطة" : "CreatedBy", name: "CreatedBy", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "العميل" : "Customer", name: "CustomerName", type: "text", width: "100px" },
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
                title: Res.Lang == "Ar" ? "فعال ؟" : "Active ?",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.SaleID;
                    txt.className = "checkbox";
                    //-------------------------Privileges-----------------------
                    txt.disabled = true
                    if (item.Status == 0 && SysSession.CurrentPrivileges.CUSTOM1) {
                        txt.disabled = false
                    }
                    if (item.Status == 1 && SysSession.CurrentPrivileges.CUSTOM2) {
                        txt.disabled = false
                    }
                    //----------------------------------------------------------
                    txt.checked = item.Status == 1 ? true : false;
                    txt.style.width = "50px"
                    txt.style.height = "35px"
                    txt.onclick = (e) => {
                        IsActive(item.SaleID, txt.checked == false ? 0 : 1);
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
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("طباعة 🖨️") : ("Print 🖨️");
                    txt.id = "butView" + item.SaleID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";

                    if (!SysSession.CurrentPrivileges.PRINT) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {

                        PrintInv(item.SaleID, 0);
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
        debugger

        CleaningList_Table();
        let Con = "";
        if ($('#drpActive').val() != "null") {
            Con = Con + " and Status =" + Number($('#drpActive').val());
        }


        debugger
        if (Number($('#FiltrCustomerID').val()) > 0) {
            Con = Con + " and CustomerID =" + Number($('#FiltrCustomerID').val());
        }


        Con = Con + " and  SaleDate   >= '" + $('#Txt_FromTrData').val() + "' and   SaleDate  <= '" + $('#Txt_TOTrData').val() + "'";
        debugger


        ExcelCon = " TrType in(3) and CompCode = " + CompCode + Con;
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'IQ_TR_Sales', " TrType in(3) and CompCode = " + CompCode + Con, SelectPageNumber.PageNumber, 5, "SaleID")
        }
        else {
            DisplayGridByPagination(_Grid, 'IQ_TR_Sales', "   TrType in(3) and CompCode = " + CompCode + Con, 1, 5, "SaleID")
        }


        //var Table: Array<Table>;
        //Table =
        //    [
        //        { NameTable: 'IQ_TR_Sales', Condition: " TrType in(3) and   CompCode =" + CompCode + " " + Con },

        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************
        //debugger

        //_DataList = GetDataTable('IQ_TR_Sales');
        //_DataList = _DataList.sort(dynamicSortNew("SaleID"));
        //_Grid.DataSource = _DataList;
        //_Grid.Bind();

        $('#btnDelete_Filter').removeClass('display_none');
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

    function PrintInv(InvoiceID: Number, Transcode: number) {

        var RepParam: Array<RepParamter>;
        RepParam =
            [
                { Parameter: 'InvoiceID', Value: "" + InvoiceID + "" },
            ]

        if (Res.Lang == "Ar") {
            Print_Report("PrintJobOrderAr", "IProc_Prnt_SlsInvoice", RepParam, "Comp" + CompCode, "");

        } else {
            Print_Report("PrintJobOrderEn", "IProc_Prnt_SlsInvoice", RepParam, "Comp" + CompCode, "");

        }

    }
    function Clear() {


        $('#FiltrCustomerID').val('');
        $('#FiltrBtnNameCustomer').html(Res.Lang == 'En' ? 'Search Customer' : 'بحث عملاء');

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
        GetData(true);
    }
    function IsActive(ID: number, Status: number) {

        debugger

        if (!SysSession.CurrentPrivileges.CUSTOM3) {

            let Res: Array<I_TR_Sales> = GetDataFrom("I_TR_Sales", "JobOrderID =" + ID + " and TrType = 0")
            if (Res.length > 0) {

                ShowMessage("The work order cannot be cancelled because there is an approved invoice ( " + Res[0].TrNo + " ) for it. 😒", " لا يمكن فك امر العمل لوجود فاتوره  ( " + Res[0].TrNo + " )  معتمده عليه 😒")

                GetData(true, ID, Status, true);
                return

            }
        }
        SqlExecuteQuery(" update [dbo].[I_TR_Sales] set [Status] = " + Status + " where [SaleID] = " + ID + " ; ")

        GetData(true, ID, Status, true);
    }



    function SendInvToTax(SaleID: number) {

        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("SalesTax", "SendInvToTax"),
            data: { SaleID: SaleID },
            success: (d) => {

                let Res = d as BaseResponse;
                let result = Res.Response as BaseResponse;

                if (result.IsSuccess) {

                    ShowMessage("Sent 🤞😉", "تم الرفع 🤞😉");
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

    function EditData(item: IQ_TR_Sales) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item)
        OpenPagePartial("JobOrder", "Edit Job Order ", () => { Display_Refrsh() });
    }
    function ReturnData(item: IQ_TR_Sales) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "2");
        SetModelGlopel(item)
        OpenPagePartial("Tax_Sales", "Return Tax Sales ", () => { Display_Refrsh() });
    }
}
