$(document).ready(() => {
    EditSuppliers.InitalizeComponent();
});
var EditSuppliers;
(function (EditSuppliers) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid = new JsGrid();
    var _UsersList = new Array();
    var _Usersnone = new Array();
    var Filter_View;
    var btnDelete_Filter;
    var Res = GetGlopelResources();
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        DownloadFileExcel();
        Close_Loder();
    }
    EditSuppliers.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        Filter_View.onclick = () => { GetData(); };
        btnDelete_Filter.onclick = Clear;
    }
    function DownloadFileExcel() {
        GnrGridDownloadExcel(() => {
            let keyMapping = {
                SuppliersCode: Res.Lang == "En" ? "SuppliersCode" : "الكود",
                SupplierName: Res.Lang == "En" ? "SupplierName" : "الاسم",
                MOBILE: Res.Lang == "En" ? "Mobile" : "الموبيل",
                Remarks: Res.Lang == "En" ? "Remarks" : "الملاحظات",
            };
            ConvertModelToFileExcel('SuppliersReport', _Grid.DataSource, keyMapping);
        });
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        _Grid.PrimaryKey = "SupplierID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: Res.Lang == "En" ? "SupplierID" : "الكود", name: "SupplierID", visible: false, type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "SuppliersCode" : "الكود", name: "SuppliersCode", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "SupplierName" : "اسم المورد ", name: "SupplierName", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "Mobile" : "الموبيل", name: "Mobile", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "Remarks" : "الملاحظات", name: "Remarks", type: "text", width: "100px" },
            {
                title: Res.Lang == "En" ? "Suppliers Type" : "نوع المورد", css: "ColumPadding", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    if (item.IsCash == true) {
                        txt.innerHTML = 'Cash';
                    }
                    else {
                        txt.innerHTML = 'Credit ';
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Active" : "نشظ", width: "50px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.SupplierID;
                    txt.className = "checkbox";
                    txt.checked = item.ISActive;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    //-------------------------Privileges-----------------------
                    txt.disabled = true;
                    if (item.ISActive == false && SysSession.CurrentPrivileges.CUSTOM1) {
                        txt.disabled = false;
                    }
                    if (item.ISActive == true && SysSession.CurrentPrivileges.CUSTOM2) {
                        txt.disabled = false;
                    }
                    //----------------------------------------------------------
                    txt.onclick = (e) => {
                        IsActive(item.SupplierID, txt.checked);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "En" ? "Edit" : "تعديل",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Edit" : "تعديل" + " ⚙️");
                    txt.id = "butView" + item.SupplierID;
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
                title: Res.Lang == "Ar" ? "الرصيد" : "Balance",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("الرصيد 💵") : ("Balance 💵");
                    txt.id = "Balance" + item.SupplierID;
                    //txt.disabled = item.TaxStatus == -1 ? false : true;
                    txt.style.backgroundColor = "#003ba5";
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    if (!SysSession.CurrentPrivileges.CUSTOM4) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        var Qurey = " Get_Balance 0, " + item.SupplierID;
                        let DataRes = GetDataFromProc(Qurey, "Get_Balance");
                        if (DataRes.length) {
                            ShowMessage("Supplier Balance 💵 ( " + DataRes[0].Balance.toFixed(2) + " )", "رصيد المورد  💵 ( " + DataRes[0].Balance.toFixed(2) + " )");
                        }
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
                    txt.id = "butArchive" + item.SaleID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#16c76d";
                    txt.style.borderRadius = "50%";
                    txt.style.width = "50px";
                    if (!SysSession.CurrentPrivileges.IsArchive) {
                        txt.disabled = true;
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
    function ViewUser(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item);
        OpenPagePartial("Suppliers", "EditSuppliers", () => { Display_Refrsh(); });
    }
    function GetData(IsChangeActive = false, ID = 0, Status = false, ISDirect = false) {
        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒");
            return;
        }
        CleaningList_Table();
        let con = "";
        if ($('#drpActive').val() != "null") {
            con = " and ISActive = " + $('#drpActive').val();
        }
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'D_A_Suppliers', "     CompCode = " + CompCode + con, SelectPageNumber.PageNumber, 5, "SupplierID");
        }
        else {
            DisplayGridByPagination(_Grid, 'D_A_Suppliers', "     CompCode = " + CompCode + con, 1, 5, "SupplierID");
        }
        //var Table: Array<Table>;
        //Table =
        //    [
        //    { NameTable: 'D_A_Suppliers', Condition: "CompCode = " + CompCode + "" + con },
        //    ]
        //DataResult(Table);
        ////**************************************************************************************************************
        //_UsersList = GetDataTable('D_A_Suppliers');
        //_UsersList = _UsersList.sort(dynamicSortNew("SuppliersCode"));
        //_Grid.DataSource = _UsersList;
        //_Grid.Bind();
        $('#btnDelete_Filter').removeClass('display_none');
        if (IsChangeActive && ID > 0) {
            let chack = _UsersList.filter(x => x.SupplierID == ID);
            if (chack.length > 0) {
                if (chack[0].ISActive == Status) {
                    ShowMessage("Done Change 😍👌" + (Status == false ? " Not Approve " : " Approve "), "تم التغيير 😍👌" + (Status == false ? " عدم الموافقة " : " الموافقة "));
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
        $('#txtSearch').val('');
        $('#drpActive').val('null');
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
        GetData(false, 0, false, true);
    }
    function IsActive(ID, Status) {
        let stat = Status == true ? 1 : 0;
        SqlExecuteQuery(" update [dbo].[D_A_Suppliers] set [ISActive] = " + stat + " where [SupplierID] = " + ID + "; update G_Data_Redis set Status = 0 where KeyTrigger = 'Supplier'");
        GetData(true, ID, Status, true);
    }
})(EditSuppliers || (EditSuppliers = {}));
//# sourceMappingURL=EditSuppliers.js.map