$(document).ready(() => {
    ViewPurchases.InitalizeComponent();
});
var ViewPurchases;
(function (ViewPurchases) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid = new JsGrid();
    var _DataList = new Array();
    var _Datanone = new Array();
    var drpActive;
    var btnItem;
    var ItemID;
    var Filter_View;
    var btnDelete_Filter;
    var FiltrBtnNameSupplier;
    var ExcelCon = "";
    var Res = GetGlopelResources();
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        InitializeGrid();
        SearchID();
        Close_Loder();
        DownloadFileExcel();
    }
    ViewPurchases.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Filter_View = document.getElementById('Filter_View');
        FiltrBtnNameSupplier = document.getElementById('FiltrBtnNameSupplier');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        ItemID = document.getElementById('ItemID');
        btnItem = document.getElementById('btnItem');
    }
    function InitializeEvents() {
        Filter_View.onclick = () => { GetData(); };
        btnDelete_Filter.onclick = Clear;
        FiltrBtnNameSupplier.onclick = SearchSupplier;
        btnItem.onclick = SearchItem;
    }
    function SearchSupplier() {
        //sys.FindKey("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and ISActive = 1  and IsCash = " + _IsCash, () => {
        //sys.FindKeySpeed("Supplier", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', function () {
        sys.FindKeyPagination("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#FiltrSupplierID').val(SelectedItem.SupplierID);
            $('#FiltrBtnNameSupplier').html(SelectedItem.SupplierName);
        });
    }
    function SearchID() {
        SearchIDGnr(() => {
            ViewUser(ModelSearch.ModelMaster);
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
            { title: Res.Lang == "Ar" ? "رقم المشتريات" : "PurchaseNo", name: "TrNo", type: "text", width: "100px" },
            {
                title: Res.Lang == "Ar" ? "النوع" : "Type", css: "ColumPadding", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    if (item.TrType == 0) {
                        txt.innerHTML = Res.Lang == "Ar" ? "مشتريات" : 'Purchases';
                    }
                    else {
                        txt.innerHTML = Res.Lang == "Ar" ? "مرتجع" : 'Return';
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "التاريخ" : "TrDate", css: "PurDate", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.PurDate);
                    return txt;
                }
            },
            { title: Res.Lang == "Ar" ? "الوقت" : "Time", name: "TrTime", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "الصافي" : "NetAmount", name: "NetAmount", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "المورد" : "Supplier", name: "SupplierName", type: "text", width: "100px" },
            //{ title: Res.Lang == "Ar" ? "انشاء بواسطة" : "CreatedBy", name: "CreatedBy", type: "text", width: "100px" },  
            {
                title: Res.Lang == "Ar" ? "اعتماد" : "Approval",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.PurchaseID;
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
                        IsActive(item.PurchaseID, item.TrType, txt.checked == false ? 0 : 1);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "تعديل" : "Edit",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? "تعديل 📝 " : ("Edit 📝");
                    txt.id = "butEdit" + item.PurchaseID;
                    txt.disabled = item.Status == 0 ? false : true;
                    txt.style.backgroundColor = "cornflowerblue";
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    if (!SysSession.CurrentPrivileges.EDIT) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        EditData(item);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "مرتجع" : "Return",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? "مرتجع 🔃" : ("Return 🔃");
                    txt.id = "butReturn" + item.PurchaseID;
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
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        ReturnData(item);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "طباعة 🖨️" : "Print",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? "طباعة 🖨️" : "Print";
                    txt.id = "butPrint" + item.PurchaseID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    //txt.disabled = item.Status == 1 ? false : true; 
                    if (!SysSession.CurrentPrivileges.PRINT) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        PrintInv(item.PurchaseID);
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
                    txt.id = "butView" + item.PurchaseID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#860000";
                    txt.disabled = item.Status == 1 ? true : false;
                    if (!SysSession.CurrentPrivileges.DELETE) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        SqlExecuteQuery("update [dbo].[I_TR_Purchases] set CompCode = (CompCode * -1 ) where PurchaseID = " + item.PurchaseID);
                        GetData(false, 0, 0, true);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "التفاصيل" : "التفاصيل",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Detail" : "التفاصيل " + " ⚙️");
                    txt.id = "butView" + item.PurchaseID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#0a0fa9";
                    txt.onclick = (e) => {
                        ViewItemDetail(item.PurchaseID);
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
                    txt.id = "butArchive" + item.PurchaseID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#16c76d";
                    txt.style.borderRadius = "50%";
                    txt.style.width = "50px";
                    if (!SysSession.CurrentPrivileges.IsArchive) {
                        txt.disabled = true;
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
    function ViewItemDetail(PurchaseID) {
        sys.FindKeyPagination("Pur", "BtnDetailPur", " PurchaseID = " + PurchaseID, () => {
            //let DataRow: IQ_ItemQtyHanging = SelectDataSearch.DataRow;   
        });
    }
    function GetData(IsChangeActive = false, ID = 0, Status = 0, ISDirect = false) {
        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒");
            return;
        }
        CleaningList_Table();
        let Con = "";
        if ($('#drpActive').val() != "null") {
            Con = Con + " and Status =" + Number($('#drpActive').val());
        }
        if ($('#drpPurchases').val() != "null") {
            Con = Con + " and TrType =" + Number($('#drpPurchases').val());
        }
        debugger;
        if (Number($('#FiltrSupplierID').val()) > 0) {
            Con = Con + " and SupplierID =" + Number($('#FiltrSupplierID').val());
        }
        Con = Con + " and IDPeriod <> 1 and   PurDate   >= '" + $('#Txt_FromTrData').val() + "' and   PurDate  <= '" + $('#Txt_TOTrData').val() + "'";
        ExcelCon = " TrType in(0,1) and  CompCode =" + CompCode + " " + Con;
        if (ItemID.value.trim() != "") {
            Con = Con + "and ItemIDs LIKE '%" + ItemID.value + "%'";
        }
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'PurchaseMasterDetail', " TrType in(0,1) and  CompCode =" + CompCode + " " + Con, SelectPageNumber.PageNumber, 5, "PurchaseID");
        }
        else {
            DisplayGridByPagination(_Grid, 'PurchaseMasterDetail', " TrType in(0,1) and  CompCode =" + CompCode + " " + Con, 1, 5, "PurchaseID");
        }
        //var Table: Array<Table>;
        //Table =
        //    [
        //    { NameTable: 'IQ_TR_Purchases', Condition: " TrType in(0,1) and  CompCode =" + CompCode + " " + Con },
        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************
        //_DataList = GetDataTable('IQ_TR_Purchases');
        //_DataList = _DataList.sort(dynamicSortNew("PurchaseID"));
        $('#btnDelete_Filter').removeClass('display_none');
        //for (var i = 0; i < _DataList.length; i++) {              
        //    if (_DataList[i].TrType == 0) {
        //        _DataList[i].TrTypeDes = Res.Lang == "AR" ? " مشتريات" : " Purchases";
        //    }
        //    if (_DataList[i].TrType == 1) {
        //        _DataList[i].TrTypeDes = Res.Lang == "AR" ? " مرتجع" : " Return";
        //    }
        //}
        //_Grid.DataSource = _DataList;
        //_Grid.Bind();
        if (IsChangeActive && ID > 0) {
            let chack = _Grid.DataSource.filter(x => x.PurchaseID == ID);
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
    function ViewUser(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item);
        OpenPagePartial("Purchases", "Edit Purchases ", () => { Display_Refrsh(); });
    }
    function PrintInv(PurchaseID) {
        var RepParam;
        RepParam =
            [
                { Parameter: 'TrID', Value: "" + PurchaseID + "" },
            ];
        if (Res.Lang == "Ar") {
            Print_Report("Prnt_PurchasesAr", "IProc_Prnt_Purchases", RepParam, "Comp" + CompCode, "");
        }
        else {
            Print_Report("Prnt_PurchasesAr", "IProc_Prnt_Purchases", RepParam, "Comp" + CompCode, "");
        }
    }
    function Clear() {
        debugger;
        let lap = (Res.Lang == 'En' ? 'Search Supplier ' : 'بحث الموردين');
        $('#FiltrSupplierID').val("");
        $('#FiltrBtnNameSupplier').html(lap);
        $('#drpActive').val("null");
        $('#btnItem').val("الصنف");
        $('#ItemID').val("");
        $('#drpPurchases').val("null");
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Datanone;
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
    function IsActive(ID, TrType, Status) {
        var _TrType = TrType == 0 ? "PurInv" : "PurInvRet";
        var StatusMod = Status == 0 ? "Open" : "Update";
        Show_Loder();
        setTimeout(function () {
            var Query = `  update [dbo].[I_TR_Purchases] set [Status] = ${Status} where [PurchaseID] =${ID}
                            DECLARE @TrNo INT;
                            DECLARE @Ok INT;

                            EXEC [dbo].[G_ProcessTrans]
                                @Comp = ${CompCode},       -- Example company ID
                                @Branch = 1,     -- Example branch ID
                                @TrType = '${_TrType}',  -- Example transaction type
                                @OpMode = '${StatusMod}', -- Example operation mode
                                @TrID = ${ID},    -- Example transaction ID
                                @TrNo = @TrNo OUTPUT,
                                @Ok = @Ok OUTPUT;
                                
                                `;
            SqlExecuteQuery(Query);
            GetData(true, ID, Status, true);
            Close_Loder();
        }, 50);
    }
    function EditData(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item);
        OpenPagePartial("Purchases", "Edit Purchases ", () => { Display_Refrsh(); });
    }
    function ReturnData(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "2");
        SetModelGlopel(item);
        OpenPagePartial("Purchases", "Return Purchases ", () => { Display_Refrsh(); });
    }
    function SearchItem() {
        sys.FindKeyPagination("Items", "btnItems", " CompCode = " + CompCode + "  and ISActive = 1 and IsService = 0  ", () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            ItemID.value = SelectedItem.ItemID.toString();
            btnItem.value = SelectedItem.ItemName;
        });
    }
    function DownloadFileExcel() {
        GnrGridDownloadExcel(() => {
            GnrGridDownloadExcel(() => {
                let keyMapping = {
                    TrNo: Res.Lang == "En" ? 'Pur.No' : 'رقم الشراء',
                    TrTypeDes: Res.Lang == "En" ? 'PurType' : 'النوع',
                    SaleDate: Res.Lang == "En" ? 'PurDate' : 'التاريخ',
                    CustomerName: Res.Lang == "En" ? 'Suplyer Name' : 'اسم المورد',
                    TotalAmount: Res.Lang == "En" ? 'Total Amount' : 'الاجمالي',
                    VatAmount: Res.Lang == "En" ? 'Vat Amount' : 'الضريبه',
                    NetAmount: Res.Lang == "En" ? 'Net Amount' : 'الصافي',
                    TaxStatusDes: Res.Lang == "En" ? 'Status' : 'الحاله',
                    CreatedBy: Res.Lang == "En" ? 'CreatedBy' : 'انشاء بوسطة',
                };
                //ConvertModelToFileExcel('PurReport', _Grid.DataSource, keyMapping)
                ConvertModelToFileExcelAllData('PurReport', "IQ_TR_Purchases", ExcelCon, keyMapping);
            });
        });
    }
})(ViewPurchases || (ViewPurchases = {}));
//# sourceMappingURL=ViewPurchases.js.map