$(document).ready(() => {
    ViewJournals.InitalizeComponent();
});
var ViewJournals;
(function (ViewJournals) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid = new JsGrid();
    var _Datanone = new Array();
    var Filter_View;
    var btnDelete_Filter;
    var Res = GetGlopelResources();
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        debugger;
        //$('#Txt_FromTrData').val(getFirstDayOfCurrentMonth());
        $('#Txt_FromTrData').val(getFirstDayOfCurrentYear());
        $('#Txt_TOTrData').val(GetDate());
        InitializeGrid();
        DownloadFileExcel();
        $('#drpType option[value="1"]').remove();
        Close_Loder();
    }
    ViewJournals.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        Filter_View.onclick = () => { GetData(false); };
        btnDelete_Filter.onclick = Clear;
    }
    function DownloadFileExcel() {
        GnrGridDownloadExcel(() => {
            let keyMapping = {
                VOUCHER_CODE: Res.Lang == "En" ? 'SelesNo' : 'الرقم ',
                VOUCHER_DATE: Res.Lang == "En" ? 'Sale Date' : 'التاريخ',
                CREATED_BY: Res.Lang == "En" ? 'CreatedBy' : 'انشاء بواسطة',
            };
            ConvertModelToFileExcel('ShowPriceReport', _Grid.DataSource, keyMapping);
        });
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        _Grid.PrimaryKey = "VoucherID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "VoucherID", name: "VoucherID", visible: false, width: "100px" },
            { title: Res.Lang == "Ar" ? "رقم الحركة" : "TRNO", name: "VoucherID", type: "text", width: "100px" },
            {
                title: Res.Lang == "Ar" ? "التاريخ" : "Tr.Date", css: "VOUCHER_DATE", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.VOUCHER_DATE);
                    return txt;
                }
            },
            { title: Res.Lang == "Ar" ? "الوصف" : "Desc", name: "VOUCHER_DESC", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "انشاء بواسطة" : "CreatedBy", name: "CREATED_BY", type: "text", width: "100px" },
            {
                title: Res.Lang == "Ar" ? "نوع القيد" : "Type", css: "VOUCHER_DATE", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    if (item.TYPE_CODE == 0) {
                        txt.innerHTML = Res.Lang == "Ar" ? "قيد افتتاحي " : "Journal Opening";
                    }
                    if (item.TYPE_CODE == 1) {
                        txt.innerHTML = Res.Lang == "Ar" ? "قيد الي " : "Journal Auto";
                    }
                    if (item.TYPE_CODE == 2) {
                        txt.innerHTML = Res.Lang == "Ar" ? " قيد يدوي " : "Journal Manual";
                    }
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "مدين" : "Debit", css: "VOUCHER_DATE", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = item.TotalDebit.toFixed(2);
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "دائن" : "Credit", css: "VOUCHER_DATE", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = item.TotalCredit.toFixed(2);
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "الحاله ؟" : "Status ?",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.VoucherID;
                    txt.className = "checkbox";
                    txt.checked = item.VOUCHER_STATUS == 1 ? true : false;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    //-------------------------Privileges-----------------------
                    txt.disabled = true;
                    if (item.VOUCHER_STATUS == 0 && SysSession.CurrentPrivileges.CUSTOM1) {
                        txt.disabled = false;
                    }
                    if (item.VOUCHER_STATUS == 1 && SysSession.CurrentPrivileges.CUSTOM2) {
                        txt.disabled = false;
                    }
                    //----------------------------------------------------------
                    if (item.TYPE_CODE == 1) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        IsActive(item.VoucherID, txt.checked == false ? 0 : 1);
                    };
                    return txt;
                }
            },
            {
                title: Res.Lang == "Ar" ? "تعديل" : "Edit",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("تعديل 📝") : ("Edit 📝");
                    txt.id = "butEdit" + item.VoucherID;
                    txt.disabled = item.VOUCHER_STATUS == 0 ? false : true;
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
                title: Res.Lang == "Ar" ? "طباعة" : "Print",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Lang == "Ar" ? ("طباعة 🖨️") : ("Print 🖨️");
                    txt.id = "butView" + item.VoucherID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    if (!SysSession.CurrentPrivileges.PRINT) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        PrintInv(item.VoucherID);
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
                    txt.id = "butArchive" + item.VoucherID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#16c76d";
                    txt.style.borderRadius = "50%";
                    txt.style.width = "50px";
                    if (!SysSession.CurrentPrivileges.IsArchive) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        ShowArchive(SysSession.CurrentEnvironment.GQ_USERS.ID.toString(), SysSession.CurrentEnvironment.CompCode.toString(), GetModelCodeFromUrl(), item.VoucherID.toString(), txt.id);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function PrintInv(VoucherID) {
        var RepParam;
        RepParam =
            [
                { Parameter: 'VoucherID', Value: "" + VoucherID + "" },
            ];
        Print_Report("Prnt_VoucherAr", "Iproc_Prnt_Voucher", RepParam);
    }
    function GetData(ISDirect = false) {
        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒");
            return;
        }
        CleaningList_Table();
        let Con = "";
        if ($('#drpActive').val() != "null") {
            Con = Con + " and VOUCHER_STATUS =" + Number($('#drpActive').val());
        }
        if ($('#drpType').val() != "null") {
            Con = Con + " and TYPE_CODE =" + Number($('#drpType').val());
        }
        debugger;
        Con = Con + " and  VOUCHER_DATE   >= '" + $('#Txt_FromTrData').val() + "' and   VOUCHER_DATE  <= '" + $('#Txt_TOTrData').val() + "'";
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'AQ_JOURNAL_HEADER', " COMP_CODE = " + CompCode + Con, SelectPageNumber.PageNumber, 5, "VoucherID");
        }
        else {
            DisplayGridByPagination(_Grid, 'AQ_JOURNAL_HEADER', " COMP_CODE = " + CompCode + Con, 1, 5, "VoucherID");
        }
    }
    function Clear() {
        $('#drpActive').val("null");
        $('#drpType').val("null");
        $('#Txt_FromTrData').val(getFirstDayOfCurrentYear());
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
        GetData(true);
    }
    function IsActive(ID, VOUCHER_STATUS) {
        SqlExecuteQuery(" update [dbo].[A_JOURNAL_HEADER] set [VOUCHER_STATUS] = " + VOUCHER_STATUS + " where [VoucherID] = " + ID + " ;  ");
        GetData(true);
    }
    function EditData(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item);
        OpenPagePartial("Journal", "Journal", () => { Display_Refrsh(); });
    }
})(ViewJournals || (ViewJournals = {}));
//# sourceMappingURL=ViewJournals.js.map