$(document).ready(function () {
    Upload_Excel_Data.InitalizeComponent();
});
var Upload_Excel_Data;
(function (Upload_Excel_Data) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var JGrid = new JsGrid();
    var ExGrid = new JsGrid();
    var ListExcelMaster = new Array();
    var ModelMaster = new G_ExcelMaster();
    var btnShow;
    var btnSave;
    var btnTo_ACC_CODE;
    var btnChooseFileExcel;
    var btnUploadFileExcel;
    var btnDownloadTemp;
    var Tap_All_Trans;
    var Tap_Make_Trans;
    var dbStatusF;
    var dbTypeTemp;
    var txtSearch;
    var txtDateFrom;
    var txtDateTo;
    var txtTrDate;
    var IsPostDirectJournal;
    var ListdataExcel = new Array();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res = GetGlopelResources();
    var _G_DefTempExcel = new Array();
    function InitalizeComponent() {
         ;
         ;
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        //InitializeGridExcel();
        txtDateFrom.value = DateStartYear();
        txtDateTo.value = GetDate();
        txtTrDate.value = GetDate();
        IsPostDirectJournal.checked = true;
        GetAllData();
        GetDefTempAndInitializeGridExcel();
        ActiveTab("Tap_Make_Trans");
        Close_Loder();
    }
    Upload_Excel_Data.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
         ;
        btnShow = document.getElementById('btnShow');
        btnSave = document.getElementById('btnSave');
        btnTo_ACC_CODE = document.getElementById('btnTo_ACC_CODE');
        btnChooseFileExcel = document.getElementById('btnChooseFileExcel');
        btnUploadFileExcel = document.getElementById('btnUploadFileExcel');
        btnDownloadTemp = document.getElementById('btnDownloadTemp');
        Tap_All_Trans = document.getElementById('Tap_All_Trans');
        Tap_Make_Trans = document.getElementById('Tap_Make_Trans');
        dbStatusF = document.getElementById("dbStatusF");
        dbTypeTemp = document.getElementById("dbTypeTemp");
        txtSearch = document.getElementById("txtSearch");
        txtDateFrom = document.getElementById("txtDateFrom");
        txtDateTo = document.getElementById("txtDateTo");
        txtTrDate = document.getElementById("txtTrDate");
        IsPostDirectJournal = document.getElementById("IsPostDirectJournal");
    }
    function InitializeEvents() {
        $('#Back_PageTap').on('click', function () {
            ActiveTab("Tap_Make_Trans");
        });
        Tap_All_Trans.onclick = function () {
            ActiveTab("Tap_All_Trans");
            ShowBack_PageTap();
            Clean();
        };
        Tap_Make_Trans.onclick = function () {
            ActiveTab("Tap_Make_Trans");
            Clean();
        };
        btnChooseFileExcel.onclick = btnChooseFileExcel_onclick;
        btnUploadFileExcel.onclick = UploadFileExcel;
        btnDownloadTemp.onclick = DownloadExcelFileTemp;
        btnShow.onclick = GetAllData;
        btnSave.onclick = btnSave_onclick;
        btnTo_ACC_CODE.onclick = SearchToAcc;
        txtSearch.onkeyup = txtSearch_change;
        dbTypeTemp.onchange = dbTypeTemp_onchange;
    }
    function dbTypeTemp_onchange() {
        GetDefTempAndInitializeGridExcel();
    }
    function InitializeGrid() {
        JGrid.ElementName = "JGrid";
        JGrid.PrimaryKey = "IDExcel";
        //JGrid.OnRowDoubleClicked = GridDoubleClick;
        JGrid.Paging = true;
        JGrid.PageSize = 5;
        JGrid.Sorting = true;
        JGrid.InsertionMode = JsGridInsertionMode.Binding;
        JGrid.Editing = false;
        JGrid.Inserting = false;
        JGrid.SelectedIndex = 1;
        JGrid.OnItemEditing = function () { };
        JGrid.Columns = [
            { title: "IDExcel", name: "IDExcel", type: "text", width: " ", visible: false },
            { title: "IDExcel", name: "IDExcel", type: "text" },
            { title: Res.NameExcel, name: "NameExcel", type: "text", width: "200px" },
            {
                title: Res.TrDate, css: "ColumPadding", name: "TrDate", width: "120px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TrDate);
                    return txt;
                }
            },
            { title: Res.Remarks, name: "Remark", type: "text", width: "300px" },
            { title: Res.CreatedBy, name: "CreatedBy", type: "text", width: "120px" },
            { title: Res.CreatedAt, name: "CreatedAt", type: "text", width: "180px" },
            { title: Res.ReturnBy, name: "UpdatedBy", type: "text", width: "120px" },
            { title: Res.ReturnAt, name: "UpdatedAt", type: "text", width: "180px" },
            //{ title: "Status", name: "ISClose", type: "text" },
            {
                title: Res.Status, css: "ColumPadding", name: "Status", width: "120px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.Status == 1) {
                        txt.innerHTML = Res.Success;
                        txt.style.color = "#00b020";
                    }
                    else if (item.Status == 2) {
                        txt.innerHTML = Res.Return;
                        txt.style.color = "rgb(255 162 11)";
                    }
                    else if (item.Status == 3) {
                        txt.innerHTML = Res.Waiting;
                        txt.style.color = "blue";
                    }
                    else {
                        txt.innerHTML = Res.Failed;
                        txt.style.color = "Red";
                    }
                    return txt;
                }
            },
            {
                title: Res.DownloadExcel, width: "150px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.DownloadExcel;
                    txt.id = "butDownload" + item.IDExcel;
                    txt.className = "btn btn-custon-four btn-info ";
                    txt.onclick = function (e) {
                        var NameFile = CustomNameFile(item.NameExcel, item.IDExcel.toString(), ".xlsx");
                        DownloadFile("/ExcelLoader/FolderDownloadExcel/" + NameFile);
                    };
                    return txt;
                }
            },
            {
                title: Res.Return,
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Return;
                    txt.id = "butReturn" + item.IDExcel;
                    txt.className = "btn btn-custon-four btn-danger ";
                    if (item.Status == 3) {
                        txt.disabled = true;
                    }
                    txt.onclick = function (e) {
                        ReturnProcess(item.IDExcel);
                    };
                    return txt;
                }
            },
        ];
        JGrid.Bind();
    }
    function GetToAccDefault() {
        sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + "  and DETAIL = 1 ", function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#btnTo_ACC_CODE').val(SelectedItem.ACC_CODE);
            $('#Txt_To_ACC_DESCA').val(SelectedItem.ACC_DESCA);
        });
    }
    function SearchToAcc() {
        sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + "  and DETAIL = 1 ", function () {
            var SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#btnTo_ACC_CODE').val(SelectedItem.ACC_CODE);
            $('#Txt_To_ACC_DESCA').val(SelectedItem.ACC_DESCA);
            SqlExecuteQuery("update [I_Control] set Comp_ACC_CODE = N'" + SelectedItem.ACC_CODE + "' where CompCode =  " + CompCode + "");
            ShowMessage('Done Update Account 👌', "تم تحديث الحساب ");
        });
    }
    function ReturnProcess(IDExcel) {
        Show_Loder();
        var Table;
        Table =
            [
                { NameTable: '', Condition: " [Return_ProecssTransTemplate]  " + CompCode + " ," + IDExcel + " ", IsExec: true, IsProc: true },
                { NameTable: 'I_TransMoney', Condition: " IDExcel = " + IDExcel },
            ];
        DataResult(Table);
        var Res = GetDataTable('I_TransMoney');
        if (Res.length == 0) {
            SqlExecuteQuery("Update [G_ExcelMaster] Set [UpdatedBy] = '" + SysSession.CurrentEnvironment.NameUser + "'  , [UpdatedAt] =( GETDATE()) where IDExcel = " + IDExcel);
            ShowMessage("Done Return Proecss Trans Excel ✅", "تم ارجاع الاكسيل وحركاته");
        }
        else {
            ShowMessage("Not Return ❌ There is Transaction  is Post ", "لم يتم الارجاع لوجود حركات مرحلة للحسابات");
        }
        GetAllData();
        Close_Loder();
    }
    function txtSearch_change() {
        $("#JGrid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = ListExcelMaster.filter(function (x) { return x.IDExcel.toString().search(search_1) >= 0 || x.Remark.toLowerCase().search(search_1) >= 0 || x.CreatedBy.toLowerCase().search(search_1) >= 0 || x.UpdatedBy.toLowerCase().search(search_1) >= 0; });
            JGrid.DataSource = SearchDetails;
            JGrid.Bind();
        }
        else {
            JGrid.DataSource = ListExcelMaster;
            JGrid.Bind();
        }
    }
    function InitializeGridExcel(ListDef) {
        ExGrid.ElementName = "div_ExGrid";
        ExGrid.PrimaryKey = "ID";
        ExGrid.Paging = true;
        ExGrid.PageSize = 15;
        ExGrid.Sorting = true;
        ExGrid.InsertionMode = JsGridInsertionMode.Binding;
        ExGrid.Editing = false;
        ExGrid.Inserting = false;
        ExGrid.SelectedIndex = 1;
        ExGrid.OnItemEditing = function () { };
        ExGrid.Columns = ListDef;
        ExGrid.Bind();
    }
    function GetAllData() {
        CleaningList_Table();
        var StartDate = DateFormat($('#txtDateFrom').val());
        var EndDate = DateFormat($('#txtDateTo').val());
        var Con = "";
        if ($('#dbStatusF').val() != 'All') {
            Con = " and Status = " + $('#dbStatusF').val();
        }
        var Table;
        Table =
            [
            { NameTable: 'E_D_G_TypeTempExcel', Condition: " CompCode = " + CompCode },
                { NameTable: 'G_ExcelMaster', Condition: " TrType = 0 and Status <> 2 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' and CompCode = " + CompCode + " " + Con },
                { NameTable: 'A_ACCOUNT', Condition: "  ACC_CODE =(select Comp_ACC_CODE from [dbo].[I_Control] where CompCode = " + CompCode + ") and COMP_CODE = " + CompCode + " " },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        var TypeEx = GetDataTable('E_D_G_TypeTempExcel');
        FillDropDown(TypeEx, dbTypeTemp, "IDTypeTemp", "DescA", null);
        ListExcelMaster = GetDataTable('G_ExcelMaster');
        var A_ToAccDefault = GetDataTable('A_ACCOUNT');
        ListExcelMaster = ListExcelMaster.sort(dynamicSortNew("IDExcel"));
        JGrid.DataSource = ListExcelMaster;
        JGrid.Bind();
        if (A_ToAccDefault.length > 0) {
            $('#btnTo_ACC_CODE').val(A_ToAccDefault[0].ACC_CODE);
            $('#Txt_To_ACC_DESCA').val(A_ToAccDefault[0].ACC_DESCA);
        }
    }
    function GetDefTempAndInitializeGridExcel() {
         ;
        _G_DefTempExcel = GetDataFrom("G_DefTempExcel", " CompCode = " + CompCode + " and IDTypeTemp = " + dbTypeTemp.value + "");
        _G_DefTempExcel = _G_DefTempExcel.sort(dynamicSort("Serial"));
         ;
        var _ListDefGrid = [];
        for (var i = 0; i < _G_DefTempExcel.length; i++) {
            var DefGrid = {};
            DefGrid["title"] = _G_DefTempExcel[i].NameTitle;
            DefGrid["name"] = _G_DefTempExcel[i].NameTitle;
            DefGrid["type"] = "text";
            DefGrid["width"] = "300px";
            _ListDefGrid.push(DefGrid);
        }
         ;
        InitializeGridExcel(_ListDefGrid);
    }
    function btnChooseFileExcel_onclick() {
        dbTypeTemp_onchange();
        $("#div_ExGrid").jsGrid("option", "pageIndex", 1);
        ListdataExcel = new Array;
        ExGrid.DataSource = ListdataExcel;
        ExGrid.Bind();
         ;
        $('#fileName').val('');
        $('#ChooseFileExcel').val('');
        $('#ChooseFileExcel').click();
         ;
    }
    function UploadFileExcel() {
        $("#div_ExGrid").jsGrid("option", "pageIndex", 1);
        var jsonString = $('#OutPutExcel').val();
         ;
        ListdataExcel = JSON.parse(jsonString);
        console.log(ListdataExcel);
        ExGrid.DataSource = ListdataExcel;
        ExGrid.Bind();
        Close_Loder();
    }
    function DownloadExcelFileTemp() {
        dbTypeTemp_onchange();
        Show_Loder();
        setTimeout(function () {
            if (_G_DefTempExcel.length > 0) {
                var result = ConvertModelToListByFeild(_G_DefTempExcel, "NameTitle");
                console.log(result);
                ConvertModelToFileExcel("ExcelTemplate", result);
                //ConvertModelToFileExcel(G_DefTempExcel, ["NameTitle","ID"])
            }
            else {
                ShowMessage("There is no Template 😒", "لا يوجد نموذج للتحيل");
            }
            Close_Loder();
        }, 100);
    }
    function Clean() {
        $("#div_ExGrid").jsGrid("option", "pageIndex", 1);
        ListdataExcel = new Array;
        ExGrid.DataSource = ListdataExcel;
        ExGrid.Bind();
         ;
        IsPostDirectJournal.checked = true;
        $('#txtTrDate').val(GetDate());
        $('#txtRemars').val('');
        $('#fileName').val('');
        $('#ChooseFileExcel').val('');
        $("#btnChooseFileExcel").attr('style', 'width: 100%;background-color:#46b8da;');
        $("#btnChooseFileExcel").html("ChooseFileExcel 🔰");
        //$("#tab_MakeTrans :input").val("");
        //dbTypeTemp.selectedIndex=1
        //$('#txtTrDate').val(GetDate())
        //$("#div_ExGrid").jsGrid("option", "pageIndex", 1);
        //ListdataExcel = new Array<any>;
        //ExGrid.DataSource = ListdataExcel;
        //ExGrid.Bind();
        //IsPostDirectJournal.checked = true
        //dbTypeTemp.selectedIndex = 0
        //dbTypeTemp_onchange();
    }
    function btnSave_onclick() {
         ;
        if ($('#txtRemars').val().trim() == "") {
            Errorinput($('#txtRemars'), " Must Enter Remarks", "يجب ادخال الملاحظات");
            return;
        }
        if (Number(dbTypeTemp.value) == 0) {
            Errorinput(dbTypeTemp, " Must Type Temp", "يجب اختيار نوع النموذج");
            return;
        }
        //if ($('#ChooseFileExcel').val().trim() == "") {
        //    Errorinput($('#btnChooseFileExcel'), " Must Select  File Excel")
        //    return
        //}
        Assign();
    }
    function Assign() {
         ;
        ModelMaster = new G_ExcelMaster();
        ModelMaster.IDExcel = 0;
        ModelMaster.NameExcel = $('#btnChooseFileExcel').html();
        ModelMaster.TrDate = DateFormat($('#txtTrDate').val());
        ModelMaster.Remark = $('#txtRemars').val();
        ModelMaster.IDTypeTemp = Number(dbTypeTemp.value);
        ModelMaster.CompCode = CompCode;
        ModelMaster.TrType = 0;
        ModelMaster.Status = 3;
        ModelMaster.IsPostDirectJournal = IsPostDirectJournal.checked;
        ;
        ModelMaster.CreatedAt = GetDateTime();
        ModelMaster.CreatedBy = SysSession.CurrentEnvironment.NameUser;
        Insert(ModelMaster);
    }
    function Insert(Model) {
         ;
        var _SendDataExcel = new SendDataExcel();
        _SendDataExcel.G_ExcelMaster = Model;
        _SendDataExcel.DataTemp = ListdataExcel;
        _SendDataExcel.IsPostDirectJournal = IsPostDirectJournal.checked;
        Ajax.CallsyncModel({
            url: sys.apiUrl("Excel_Upload", "Insert"),
            type: "Post",
            data: JSON.stringify({ DataSend: JSON.stringify(_SendDataExcel) }),
            success: function (d) {
                 ;
                var result = d;
                if (result.isSuccess == true) {
                    var res = result.response;
                    ShowMessage("Upload 👌( " + res.idExcel + " ) ", "تم الرفع 👌( " + res.idExcel + " ) ");
                     ;
                    var NameFile = CustomNameFile($('#btnChooseFileExcel').html(), res.idExcel.toString(), ".xlsx");
                    Save_File("ChooseFileExcel", "/ExcelLoader/FolderDownloadExcel/", NameFile);
                    GetAllData();
                    setTimeout(function () {
                        Clean();
                        ActiveTab("Tap_All_Trans");
                        ShowBack_PageTap();
                    }, 800);
                    Close_Loder();
                }
                else {
                    ShowMessage("Error", "خطأ !");
                    Close_Loder();
                }
            }
        });
    }
})(Upload_Excel_Data || (Upload_Excel_Data = {}));
//# sourceMappingURL=Upload_Excel_Data.js.map