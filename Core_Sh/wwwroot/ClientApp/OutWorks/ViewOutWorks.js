$(document).ready(() => {
    ViewOutWorks.InitalizeComponent();
});
var ViewOutWorks;
(function (ViewOutWorks) {
    var sys = new SystemTools();
    var _Grid = new JsGrid();
    var SysSession = GetSystemSession();
    var _UsersList = new Array();
    var _Usersnone = new Array();
    var CompCode = sys.SysSession.CurrentEnvironment.CompCode;
    var Filter_View;
    var InvoiceNo;
    var btnDelete_Filter;
    var Res = GetGlopelResources();
    var invRemain = new Array();
    var purRemain = new Array();
    var Remain = 0;
    var ExcelCon = "";
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        DownloadFileExcel();
        Close_Loder();
        $('#Fin_Type').append("<option value=null>" + (Res.Lang == "Ar" ? "جميع الانواع" : "All Types") + "</option>");
    }
    ViewOutWorks.InitalizeComponent = InitalizeComponent;
    function DownloadFileExcel() {
        GnrGridDownloadExcel(() => {
            let keyMapping = {
                TrNo: Res.Lang == "En" ? 'TrNo' : 'رقم السند',
                InvoiceNo: Res.Lang == "En" ? 'JobOrder' : 'رقم امر العمل',
                TransactionDate: Res.Lang == "En" ? 'TrDate' : 'التاريخ',
                Amount: Res.Lang == "En" ? 'Amount' : 'المبلغ',
                BeneficiaryName: Res.Lang == "En" ? 'BeneficiaryName' : 'المستفيد',
                TaxStatusDes: Res.Lang == "En" ? 'Status' : 'الحاله',
                Remarks: Res.Lang == "En" ? "Remarks" : "ملاحظات",
            };
            ConvertModelToFileExcelAllData('ExternalLabour', "I_TR_ExternalLabor", ExcelCon, keyMapping);
            //ConvertModelToFileExcel('ExternalLabour', _Grid.DataSource, keyMapping)
        });
    }
    function InitalizeControls() {
        InvoiceNo = document.getElementById('InvoiceNo');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        Filter_View.onclick = () => { GetData(); };
        btnDelete_Filter.onclick = Clear;
        InvoiceNo.onclick = SearchInvoices;
    }
    function SearchInvoices() {
        //sys.FindKey("Receipt", "InvoiceNo", "TrType = 0 and IsCash = 0 and Status = 1 and RemainAmount > 0 and CompCode = " + CompCode + " ", () => {
        //sys.FindKeySpeed("Invoices", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  3 ", 'SearchForm', () => {   
        sys.FindKeyPagination("Invoices", "InvoiceNo", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  3 ", () => {
            let SelectedItem = SelectDataSearch.DataRow;
            /*sys.FindKeySpeed("View_JobOrd", " CompCode = " + CompCode + "  and Status = 1   ", 'SearchForm', () => {*/
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#InvoiceID').val(SelectedItem.SaleID);
            $('#InvoiceNo').val(SelectedItem.TrNo);
        });
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        _Grid.PrimaryKey = "TransactionID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: Res.Lang == "En" ? "TransactionID" : "الكود", name: "TransactionID", visible: false, width: "100px" },
            { title: Res.Lang == "En" ? "TrNo" : "رقم السند", name: "TrNo", type: "text", width: "6%" },
            //{ title: Res.Lang == "En" ? "RefNo" : "رقم المرجع", name: "RefNo", type: "text", width: "6%" },
            { title: Res.Lang == "En" ? "Job Order" : "رقم امر العمل", name: "InvoiceNo", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "Amount" : "المبلغ", name: "Amount", type: "number", width: "8%" },
            {
                title: Res.Lang == "En" ? "Tr.Date" : "التاريخ", css: "TransactionDate", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TransactionDate);
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "BeneficiaryName" : "المستفيد", css: "BeneficiaryName", name: "BeneficiaryName", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = item.BeneficiaryName;
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Cash Type" : "النوع", css: "ColumPadding", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    if (Res.Lang == "Ar") {
                        txt.innerHTML = item.IsCash == true ? "نقدي" : "علي حساب";
                    }
                    else {
                        txt.innerHTML = item.IsCash == true ? "Cash" : "Credit";
                    }
                    return txt;
                }
            },
            { title: Res.Lang == "En" ? "Remarks" : "ملاحظات", name: "Remarks", type: "text", width: "100px" },
            {
                title: Res.Lang == "En" ? "Active" : "نشط", width: "3%",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.TransactionID;
                    txt.className = "checkbox";
                    txt.checked = item.Status == 1 ? true : false;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    //-------------------------Privileges-----------------------
                    txt.disabled = true;
                    if (item.Status == 0 && SysSession.CurrentPrivileges.CUSTOM1) {
                        txt.disabled = false;
                    }
                    if (item.Status == 1 && SysSession.CurrentPrivileges.CUSTOM2) {
                        txt.disabled = false;
                    }
                    //----------------------------------------------------------
                    txt.onclick = (e) => {
                        IsActive(item.TransactionID, txt.checked == false ? 0 : 1, item.TrType, item.Amount, item.InvoiceID);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Edit" : "تعديل ", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Edit" : "تعديل" + " ⚙️");
                    txt.id = "butView" + item.TransactionID;
                    txt.disabled = item.Status == 1 ? true : false;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    if (!SysSession.CurrentPrivileges.EDIT) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Print" : "طباعه", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Print" : "طباعه ");
                    txt.id = "butView" + item.TransactionID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    txt.disabled = item.Status == 1 ? false : true;
                    if (!SysSession.CurrentPrivileges.PRINT) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        Print_Pdf(item.TransactionID, item.TrType);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Delete" : "حذف", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Delete" : "حذف ");
                    txt.id = "butView" + item.TransactionID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#860000";
                    txt.disabled = item.Status == 1 ? true : false;
                    if (!SysSession.CurrentPrivileges.DELETE) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        SqlExecuteQuery("update [dbo].[I_TR_ExternalLabor] set CompCode = (CompCode * -1 ) where TransactionID = " + item.TransactionID);
                        GetData(false, 0, 0, true);
                    };
                    return txt;
                }
            },
            {
                visible: (SysSession.CurrentEnvironment.I_Control.IsArchive == true ? true : false), title: Res.Lang == "Ar" ? "ارشفه" : "Archive",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = "📩";
                    txt.id = "butArchive" + item.TransactionID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#16c76d";
                    txt.style.borderRadius = "50%";
                    txt.style.width = "50px";
                    if (!SysSession.CurrentPrivileges.IsArchive) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        ShowArchive(SysSession.CurrentEnvironment.GQ_USERS.ID.toString(), SysSession.CurrentEnvironment.CompCode.toString(), GetModelCodeFromUrl(), item.TransactionID.toString(), txt.id);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function ViewUser(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item);
        OpenPagePartial("OutWorks", "Edit OutWorks", () => { Display_Refrsh(); });
    }
    function GetData(IsChangeActive = false, ID = 0, Status = 0, ISDirect = false) {
        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒");
            return;
        }
        if ($('#Txt_TOTrData').val() == "") {
            Errorinput($('#Txt_TOTrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
            return;
        }
        if ($('#Txt_FromTrData').val() == "") {
            Errorinput($('#Txt_FromTrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
            return;
        }
        CleaningList_Table();
        let Cond = "";
        if (Number($('#InvoiceID').val()) != 0) {
            Cond = " and InvoiceID = " + Number($('#InvoiceID').val());
        }
        ExcelCon = " CompCode = " + CompCode + " and  TransactionDate >= '" + $('#Txt_FromTrData').val() + "' and   TransactionDate <= '" + $('#Txt_TOTrData').val() + "'" + Cond;
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'I_TR_ExternalLabor', " CompCode = " + CompCode + " and  TransactionDate >= '" + $('#Txt_FromTrData').val() + "' and   TransactionDate <= '" + $('#Txt_TOTrData').val() + "'" + Cond, SelectPageNumber.PageNumber, 5, "TransactionID");
        }
        else {
            DisplayGridByPagination(_Grid, 'I_TR_ExternalLabor', " CompCode = " + CompCode + " and  TransactionDate >= '" + $('#Txt_FromTrData').val() + "' and   TransactionDate <= '" + $('#Txt_TOTrData').val() + "'" + Cond, 1, 5, "TransactionID");
        }
        //var Table: Array<Table>;
        //Table =
        //    [
        //        { NameTable: 'I_TR_ExternalLabor', Condition: " CompCode = " + CompCode + " and  TransactionDate >= '" + $('#Txt_FromTrData').val() + "' and   TransactionDate <= '" + $('#Txt_TOTrData').val() + "'" + Cond + "" },
        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************
        //_UsersList = GetDataTable('I_TR_ExternalLabor');
        //_UsersList = _UsersList.sort(dynamicSortNew("TrNo"));
        //_Grid.DataSource = _UsersList;
        //_Grid.Bind();
        $('#btnDelete_Filter').removeClass('display_none');
        if (IsChangeActive && ID > 0) {
            let chack = _Grid.DataSource.filter(x => x.TransactionID == ID);
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
    function Clear() {
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        $('#btnDelete_Filter').addClass('display_none');
        $('#InvoiceID').val(0);
        $('#InvoiceNo').val(Res.Lang == "Ar" ? "بحث عن امر العمل" : "Search Job Order");
        //Type.value = "null";
        CleaningList_Table();
        _Grid.DataSource = _Usersnone;
        _Grid.Bind();
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
        GetData(false, 0, 0, true);
    }
    function IsActive(ID, Status, TrType, Amount, PurchaseID) {
        SqlExecuteQuery(" update [dbo].[I_TR_ExternalLabor] set [Status] = " + Status + " where [TransactionID] = " + ID);
        var Mod = Status == 0 ? "Open" : "Update";
        var Type = "OutWorks";
        SqlExecuteQuery("[G_ProcessTrans] " + sys.SysSession.CurrentEnvironment.CompCode + ",1,'" + Type + "','" + Mod + "'," + ID + "," + 1 + ",0");
        GetData(true, ID, Status, true);
    }
    function Print_Pdf(TrID, Trtype) {
        var RepParam;
        RepParam =
            [
                { Parameter: 'TrID', Value: "" + TrID + "" },
            ];
        Print_Report("Prnt_ExternalLaborAr", "IProc_Prnt_ExternalLabor", RepParam);
    }
})(ViewOutWorks || (ViewOutWorks = {}));
//# sourceMappingURL=ViewOutWorks.js.map