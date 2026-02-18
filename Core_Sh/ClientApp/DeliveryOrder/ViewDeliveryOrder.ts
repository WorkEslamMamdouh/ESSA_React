
$(document).ready(() => {
    ViewDeliveryOrder.InitalizeComponent();

});

namespace ViewDeliveryOrder {

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid: JsGrid = new JsGrid();
     
    var _Datanone: Array<IQ_TR_Sales> = new Array<IQ_TR_Sales>();
     
    var drpActive: HTMLSelectElement;
    var BtnSearchJobOrderView: HTMLButtonElement;
    var BtnSalesManIDView: HTMLButtonElement;
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;
    var Res: SystemResources = GetGlopelResources();

    export function InitalizeComponent() {



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
                SaleDate: Res.Lang == "En" ? 'Sale Date' : 'التاريخ',
                TrTime: Res.Lang == "En" ? 'Time' : 'الوقت',
                JobOrderNo: Res.Lang == "En" ? 'Job Order No' : 'رقم امر العمل',
                SalesManName: Res.Lang == "En" ? 'SalesMan Name' : 'اسم المندوب',
                TaxStatusDes: Res.Lang == "En" ? 'Status' : 'الحاله',
                CreatedBy: Res.Lang == "En" ? 'CreatedBy' : 'انشاء بواسطة',


            };
            ConvertModelToFileExcel('DeliveryOrderReport', _Grid.DataSource, keyMapping)

        });

    }
    function InitalizeControls() { 
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        BtnSearchJobOrderView = document.getElementById('BtnSearchJobOrderView') as HTMLButtonElement;
        BtnSalesManIDView = document.getElementById('BtnSalesManIDView') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
    }
    function InitializeEvents() {
         
        Filter_View.onclick = () => { GetData() };
        BtnSearchJobOrderView.onclick = BtnSearchJobOrder_onclick;
        BtnSalesManIDView.onclick = SearchSalesMan;
        btnDelete_Filter.onclick = Clear;
    }


    function BtnSearchJobOrder_onclick() {

        //sys.FindKeySpeed("View_JobOrd", " CompCode = " + CompCode + "  and Status = 1   ", 'SearchForm', () => {
        //sys.FindKeySpeed("Invoices", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  3 ", 'SearchForm', () => {
        sys.FindKeyPagination("View_JobOrd", "View_JobOrd", " CompCode = " + CompCode + "  and Status = 1   ", () => {
            let SelectedItem: I_TR_Sales = SelectDataSearch.DataRow;  

            //let SelectedItem: I_TR_Sales = SearchGrid.SearchDataGrid.SelectedItem;
            $('#JobOrderIDView').val(SelectedItem.SaleID)
            $('#BtnSearchJobOrderView').html(SelectedItem.TrNo.toString())
        });


    }


    function SearchSalesMan() { 
        //sys.FindKeySpeed("Employees", " CompCode = " + CompCode + "  and Status = 1 and EmpType = 3  ", 'SearchForm', function () {
            sys.FindKeyPagination("Employees", "BtnEmployees", " CompCode = " + CompCode + "  and Status = 1   and EmpType = 3 ", () => {


                let SelectedItem = SelectDataSearch.DataRow;  

            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            console.log(SelectedItem);
            $('#SalesManIDView').val(SelectedItem.EmpID);
            $('#BtnSalesManIDView').html(SelectedItem.Emp_Name);
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
            { title: Res.Lang == "Ar" ? "رقم امر التسليم" : "DeliveryOrderNo", name: "TrNo", type: "text", width: "100px" },
            //{ title: Res.Lang == "Ar" ? "رقم المرجع" : "Ref.No", name: "ReNo", type: "text", width: "100px" },
            {
                title: Res.Lang == "Ar" ? "التاريخ" : "Tr.Date", css: "SaleDate", name: "IsCash", width: "100px",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

                    txt.innerHTML = DateFormat(item.SaleDate)

                    return txt;
                }
            },
            { title: Res.Lang == "Ar" ? "الوقت" : "Time", name: "TrTime", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "امر العمل" : "JobOrderNo", name: "JobOrderNo", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "المندوب" : "SalesManName", name: "SalesManName", type: "text", width: "100px" },
            //{ title: Res.Lang == "Ar" ? "صافي المبلغ" : "NetAmount", name: "NetAmount", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "انشاء بواسطة" : "CreatedBy", name: "CreatedBy", type: "text", width: "100px" },

            {
                title: Res.Lang == "Ar" ? "فعال ؟" : "Active ?",
                itemTemplate: (s: string, item: IQ_TR_Sales): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.SaleID;
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
                    txt.disabled = true


                    if (item.Status == 1) {
                        txt.disabled = false
                    }

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

        if (Number($('#SalesManIDView').val()) != 0) {
            Con = Con + " and SalesManID =" + Number($('#SalesManIDView').val());
        }
        
        if (Number($('#JobOrderIDView').val()) != 0) {
            Con = Con + " and JobOrderID =" + Number($('#JobOrderIDView').val());
        }

        Con = Con + " and  CAST(SaleDate AS DATE) >= '" + $('#Txt_FromTrData').val() + "' and   CAST(SaleDate AS DATE) <= '" + $('#Txt_TOTrData').val() + "'";



        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'IQ_TR_Sales', " TrType in(4) and   CompCode =" + CompCode + " " + Con, SelectPageNumber.PageNumber, 15, "SaleID")
        }
        else {
            DisplayGridByPagination(_Grid, 'IQ_TR_Sales', " TrType in(4) and   CompCode =" + CompCode + " " + Con, 1, 15, "SaleID")
        }

         

        //var Table: Array<Table>;
        //Table =
        //    [
        //        { NameTable: 'IQ_TR_Sales', Condition: " TrType in(4) and   CompCode =" + CompCode + " " + Con },

        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************

        //_DataList = GetDataTable('IQ_TR_Sales');
        //_DataList = _DataList.sort(dynamicSortNew("SaleID"));
        //$('#btnDelete_Filter').removeClass('display_none');
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
        Print_Report("PrintDeliveryOrderAr", "IProc_Prnt_SlsInvoice", RepParam , "Comp" + CompCode, "");

    }
    function Clear() {
        $('#SalesManIDView').val("0");
        $('#BtnSalesManIDView').html(Res.Lang == "Ar" ? "المندوب" : "Sales Man");

        $('#JobOrderIDView').val("0");
        $('#BtnSearchJobOrderView').html(Res.Lang == "Ar" ? "امر العمل" : "JobOrder");

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

        if (Status == 1 && !CheckQtyInDev(ID)) {
            GetData(true, ID, Status, true);
            return
        }

        SqlExecuteQuery(" update [dbo].[I_TR_Sales] set [Status] = " + Status + " where [SaleID] = " + ID + " ; update G_Data_Redis set Status = 0 where KeyTrigger = 'Invoices'")

        GetData(true, ID, Status, true);
    }

    function CheckQtyInDev(_SaleID: number) {
        debugger
        let Proc = "G_CheckQtyInDev " + _SaleID

        let DataRes = GetDataFromProc(Proc, "G_CheckQtyInInvoice")
        debugger
        if (DataRes.length > 0) {

            let messag: string = Res.Lang == 'Ar' ? DataRes[0].Message_ItemIssueAr : DataRes[0].Message_ItemIssueEn

            if ((messag ?? '').trim() != '') {

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
        OpenPagePartial("DeliveryOrder", "Edit Job Order ", () => { Display_Refrsh() });
    }
    function ReturnData(item: IQ_TR_Sales) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "2");
        SetModelGlopel(item)
        OpenPagePartial("Tax_Sales", "Return Tax Sales ", () => { Display_Refrsh() });
    }
}
