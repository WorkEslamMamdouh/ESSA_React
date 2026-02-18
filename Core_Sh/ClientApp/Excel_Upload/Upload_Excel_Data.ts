
$(document).ready(() => {
    Upload_Excel_Data.InitalizeComponent();

});

namespace Upload_Excel_Data {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var JGrid: JsGrid = new JsGrid();
    var ExGrid: JsGrid = new JsGrid();


    var ModelMaster: E_I_LogUploadExcel = new E_I_LogUploadExcel();

    var btnShow: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnTo_ACC_CODE: HTMLButtonElement;


    var btnChooseFileExcel: HTMLButtonElement;
    var btnUploadFileExcel: HTMLButtonElement;
    var btnDownloadTemp: HTMLButtonElement;

    var Tap_All_Trans: HTMLButtonElement;
    var Tap_Make_Trans: HTMLButtonElement;

    var dbStatusF: HTMLSelectElement;
    var dbTypeTemp: HTMLSelectElement;

    var txtDateFrom: HTMLInputElement;
    var txtDateTo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;

    var ListdataExcel = new Array<any>();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var Res: SystemResources = GetGlopelResources();

    var _E_D_G_TypeTempExcel: Array<E_D_G_TypeTempExcel> = new Array<E_D_G_TypeTempExcel>();
    var _E_D_G_CreateTempExcel: Array<E_D_G_CreateTempExcel> = new Array<E_D_G_CreateTempExcel>();
    export function InitalizeComponent() {
        debugger
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        txtDateFrom.value = DateStartYear();
        txtDateTo.value = GetDate();
        txtTrDate.value = GetDate();
        GetAllData();
        GetDefTempAndInitializeGridExcel();
        ActiveTab("Tap_Make_Trans");

        Close_Loder();
    }
    function InitalizeControls() {

        debugger
        btnShow = document.getElementById('btnShow') as HTMLButtonElement;
        btnSave = document.getElementById('btnSave') as HTMLButtonElement;
        btnTo_ACC_CODE = document.getElementById('btnTo_ACC_CODE') as HTMLButtonElement;
        btnChooseFileExcel = document.getElementById('btnChooseFileExcel') as HTMLButtonElement;
        btnUploadFileExcel = document.getElementById('btnUploadFileExcel') as HTMLButtonElement;
        btnDownloadTemp = document.getElementById('btnDownloadTemp') as HTMLButtonElement;

        Tap_All_Trans = document.getElementById('Tap_All_Trans') as HTMLButtonElement;
        Tap_Make_Trans = document.getElementById('Tap_Make_Trans') as HTMLButtonElement;

        dbStatusF = document.getElementById("dbStatusF") as HTMLSelectElement;
        dbTypeTemp = document.getElementById("dbTypeTemp") as HTMLSelectElement;

        txtDateFrom = document.getElementById("txtDateFrom") as HTMLInputElement;
        txtDateTo = document.getElementById("txtDateTo") as HTMLInputElement;
        txtTrDate = document.getElementById("txtTrDate") as HTMLInputElement;


    }
    function InitializeEvents() {

        $('#Back_PageTap').on('click', function () {
            ActiveTab("Tap_Make_Trans");
        });

        Tap_All_Trans.onclick = () => {
            ActiveTab("Tap_All_Trans");
            ShowBack_PageTap();
            Clean();
        }
        Tap_Make_Trans.onclick = () => {
            ActiveTab("Tap_Make_Trans");
            Clean();
        }


        btnChooseFileExcel.onclick = btnChooseFileExcel_onclick;
        btnUploadFileExcel.onclick = UploadFileExcel;
        btnDownloadTemp.onclick = DownloadExcelFileTemp;
        btnShow.onclick = () => { GetAllData() };
        btnSave.onclick = btnSave_onclick;
        btnTo_ACC_CODE.onclick = SearchToAcc;
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
        JGrid.OnItemEditing = () => { };
        JGrid.Columns = [
            { title: "IDExcel", name: "IDExcel", type: "text", width: " ", visible: false },
            { title: Res.IDExcel, name: "IDExcel", type: "text" },
            { title: Res.NameExcel, name: "NameExcel", type: "text", width: "200px" },
            {
                title: Res.TrDate, css: "ColumPadding", name: "TrDate", width: "120px",
                itemTemplate: (s: string, item: E_I_LogUploadExcel): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
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
                itemTemplate: (s: string, item: E_I_LogUploadExcel): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");


                    if (item.Status == 0) {
                        txt.innerHTML = "جديد";
                        //txt.style.color = "#00b020";

                    }
                    if (item.Status == 1) {
                        txt.innerHTML = "جاري المعالجة";
                        txt.style.color = "#00b020";


                    }
                    else if (item.Status == 2) {
                        txt.innerHTML = "عماليه   ناجحه";
                        txt.style.color = "rgb(255 162 11)";

                    }
                    else if (item.Status == 3) {
                        txt.innerHTML = "تم الرفع مع وجود خطأ فى الربط";
                        txt.style.color = "#008e70";

                    }
                    else if (item.Status == 4) {
                        txt.innerHTML = "تم الرفع مع وجود خطأ فى البيانات";
                        txt.style.color = "#30eec6";

                    }
                    else if (item.Status == 6) {
                        txt.innerHTML = "تم ارجاع العماليه بنجاح";
                        txt.style.color = "#ff00bc";

                    }
                    else if (item.Status == 7) {
                        txt.innerHTML = "خطاء في ارجاع العماليه";
                        txt.style.color = "Red";

                    }
                    else {
                        txt.innerHTML = "عملية فاشلة";
                        txt.style.color = "Red";
                    }


                    return txt;
                }
            },
            {
                title: Res.DownloadExcel, width: "150px",
                itemTemplate: (s: string, item: E_I_LogUploadExcel): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.DownloadExcel;
                    txt.id = "butDownload" + item.IDExcel;
                    txt.className = "btn btn-custon-four btn-info ";

                    txt.onclick = (e) => {

                        let NameFile = CustomNameFile(item.NameExcel, item.IDExcel.toString(), ".xlsx");
                        DownloadFile("/ExcelLoader/FolderDownloadExcel/" + NameFile);
                    };
                    return txt;
                }
            },
            {
                title: Res.Return,
                itemTemplate: (s: string, item: E_I_LogUploadExcel): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = Res.Return;
                    txt.id = "butReturn" + item.IDExcel;
                    txt.className = "btn btn-custon-four btn-danger ";

                    if (item.Status != 2 && item.Status != 3 && item.Status != 4) {
                        txt.disabled = true
                    }

                    txt.onclick = (e) => {
                        ReturnProcess(item.IDExcel);
                    };
                    return txt;
                }
            },


        ];
        JGrid.Bind();
    }
    function SearchToAcc() {
        let Con = "";
        //if (IsDetail.checked) {
        //    Con = " and DETAIL = 1"
        //} else {
        //    Con = "";
        //}
        sys.FindKeyPagination("Account", "btnAcc", " COMP_CODE = " + CompCode + " and ACC_ACTIVE = 1" + Con, () => {

            let DataRow: A_ACCOUNT = SelectDataSearch.DataRow
            $('#btnTo_ACC_CODE').val(DataRow.ACC_CODE);
            $('#Txt_To_ACC_DESCA').val(DataRow.ACC_DESCA);
        });
    }

    function ReturnProcess(IDExcel: number) {

        Show_Loder();

        setTimeout(function () {
            var Table: Array<Table>;
            Table =
                [
                    { NameTable: '', Condition: "  Z_EX_ReturnProcessExcel  " + IDExcel + "  , " + CompCode + " ", IsExec: true, IsProc: true },

                ]

            DataResult(Table);

            GetAllData(true);

            Close_Loder();
        }, 50);

    }

    function InitializeGridExcel(ListDef: any) {
        ExGrid.ElementName = "div_ExGrid";
        ExGrid.PrimaryKey = "ID";
        ExGrid.Paging = true;
        ExGrid.PageSize = 15;
        ExGrid.Sorting = true;
        ExGrid.InsertionMode = JsGridInsertionMode.Binding;
        ExGrid.Editing = false;
        ExGrid.Inserting = false;
        ExGrid.SelectedIndex = 1;
        ExGrid.OnItemEditing = () => { };
        ExGrid.Columns = ListDef;
        ExGrid.Bind();
    }
    function GetAllData(ISDirect: boolean = false) {

        CleaningList_Table();


        let StartDate = DateFormat($('#txtDateFrom').val());
        let EndDate = DateFormat($('#txtDateTo').val());

        let Con = "";

        if ($('#dbStatusF').val() != 'All') {
            Con = " and Status = " + $('#dbStatusF').val()
        }


        if (ISDirect) {
            DisplayGridByPagination(JGrid, 'E_I_LogUploadExcel', "   TrType = 0   and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' and CompCode = " + CompCode + " " + Con, SelectPageNumber.PageNumber, 5, "IDExcel")
        }
        else {
            DisplayGridByPagination(JGrid, 'E_I_LogUploadExcel', "   TrType = 0   and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' and CompCode = " + CompCode + " " + Con, 1, 5, "IDExcel")
        }


        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'E_D_G_TypeTempExcel', Condition: " CompCode = " + CompCode + " and IsActive = 1" },
                // { NameTable: 'E_I_LogUploadExcel', Condition: " TrType = 0 and Status <> 2 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' and CompCode = " + CompCode + " " + Con },
                { NameTable: 'A_ACCOUNT', Condition: "  ACC_CODE =(select Comp_ACC_CODE from [dbo].[I_Control] where CompCode = " + CompCode + ") and COMP_CODE = " + CompCode + " " },
            ]

        DataResult(Table);
        //**************************************************************************************************************

        _E_D_G_TypeTempExcel = GetDataTable('E_D_G_TypeTempExcel');
        FillDropwithAttr(_E_D_G_TypeTempExcel, "dbTypeTemp", "IDTypeTemp", "DescA", "No", "IDLnkExcel", "IDLnkExcel");

        let A_ToAccDefault = GetDataTable('A_ACCOUNT');

        if (A_ToAccDefault.length > 0) {
            $('#btnTo_ACC_CODE').val(A_ToAccDefault[0].ACC_CODE);
            $('#Txt_To_ACC_DESCA').val(A_ToAccDefault[0].ACC_DESCA);
        }

    }

    function GetDefTempAndInitializeGridExcel() {

        debugger

        if (dbTypeTemp.value == '') {
            return;
        }

        _E_D_G_CreateTempExcel = GetDataFrom("E_D_G_CreateTempExcel", " CompCode = " + CompCode + " and IDTypeTemp = " + dbTypeTemp.value + "")

        _E_D_G_CreateTempExcel = _E_D_G_CreateTempExcel.sort(dynamicSort("Serial"));
        debugger
        var _ListDefGrid = [];
        for (var i = 0; i < _E_D_G_CreateTempExcel.length; i++) {
            var DefGrid = {};
            DefGrid["title"] = _E_D_G_CreateTempExcel[i].NameTitle;
            DefGrid["name"] = _E_D_G_CreateTempExcel[i].NameTitle;
            DefGrid["type"] = "text";
            DefGrid["width"] = "300px";
            _ListDefGrid.push(DefGrid);
        }
        debugger
        InitializeGridExcel(_ListDefGrid)



        let TypeRes = _E_D_G_TypeTempExcel.filter(x => x.IDTypeTemp == Number(dbTypeTemp.value))

        if (TypeRes.length > 0) { 

            if (TypeRes[0].ProssType == 3) {
                $('._Acc').removeClass("display_none");
            }

            else if (TypeRes[0].ProssType == 2) {
                $('._User').removeClass("display_none");
            }
            else {
                $('._User').addClass("display_none");
                $('._Acc').addClass("display_none");
            }

            

        }


    }

    function btnChooseFileExcel_onclick() {
        dbTypeTemp_onchange();

        $("#div_ExGrid").jsGrid("option", "pageIndex", 1);
        ListdataExcel = new Array<any>;
        ExGrid.DataSource = ListdataExcel;
        ExGrid.Bind();
        debugger

        $('#fileName').val('');
        $('#ChooseFileExcel').val('');
        $('#ChooseFileExcel').click();

        debugger

    }
    function UploadFileExcel() {

        $("#div_ExGrid").jsGrid("option", "pageIndex", 1);

        let jsonString = $('#OutPutExcel').val();
        debugger

        ListdataExcel = JSON.parse(jsonString);

        console.log(ListdataExcel);

        ExGrid.DataSource = ListdataExcel;
        ExGrid.Bind();

        Close_Loder();
    }
    function DownloadExcelFileTemp() {
        debugger
        dbTypeTemp_onchange();
        Show_Loder();
        setTimeout(function () {


            if (_E_D_G_CreateTempExcel.length > 0) {

                const result = ConvertModelToListByFeild(_E_D_G_CreateTempExcel, "NameTitle");
                console.log(result);

                ConvertModelToFileExcel("ExcelTemplate", result)
                //ConvertModelToFileExcel(G_DefTempExcel, ["NameTitle","ID"])
            }
            else {
                ShowMessage("There is no Template 😒", "لا يوجد نموذج للتحيل")
            }
            Close_Loder();
        }, 100);
    }





    function Clean() {


        $("#div_ExGrid").jsGrid("option", "pageIndex", 1);
        ListdataExcel = new Array<any>;
        ExGrid.DataSource = ListdataExcel;
        ExGrid.Bind();
        debugger

        $('#txtTrDate').val(GetDate())
        $('#txtRemars').val('');
        $('#fileName').val('');
        $('#ChooseFileExcel').val('');

        $("#btnChooseFileExcel").attr('style', 'width: 100%;background-color:#46b8da;')
        $("#btnChooseFileExcel").html(Res.Lang == "Ar" ? "اختار ملف الاكسيل 🔰" : "ChooseFileExcel 🔰");


        //$("#tab_MakeTrans :input").val("");
        //dbTypeTemp.selectedIndex=1
        //$('#txtTrDate').val(GetDate())
        //$("#div_ExGrid").jsGrid("option", "pageIndex", 1);
        //ListdataExcel = new Array<any>;
        //ExGrid.DataSource = ListdataExcel;
        //ExGrid.Bind();                         
        //dbTypeTemp.selectedIndex = 0
        //dbTypeTemp_onchange();
    }
    function btnSave_onclick() {

        if ($('#txtRemars').val().trim() == "") {
            Errorinput($('#txtRemars'), " Must Enter Remarks", "يجب ادخال الملاحظات")
            return
        }
        if (Number(dbTypeTemp.value) == 0) {
            Errorinput(dbTypeTemp, " Must Type Temp", "يجب اختيار نوع النموذج")
            return
        }

        if ($('#ChooseFileExcel').val().trim() == "") {
            Errorinput($('#btnChooseFileExcel'), " Must Select  File Excel",)
            return
        }



        let TypeRes = _E_D_G_TypeTempExcel.filter(x => x.IDTypeTemp == Number(dbTypeTemp.value))

        if (TypeRes.length > 0) {

            if ($('#Txt_To_ACC_DESCA').val().trim() == "" && TypeRes[0].ProssType == 3 ) {
                Errorinput($('#Txt_To_ACC_DESCA'), " Must Select  Acc ")
                return
            }
        }







        Assign();


    }

    function Assign() {

        debugger
        ModelMaster = new E_I_LogUploadExcel();
        ModelMaster.IDExcel = 0;
        ModelMaster.NameExcel = $('#btnChooseFileExcel').html()
        ModelMaster.TrDate = DateFormat($('#txtTrDate').val())
        ModelMaster.Remark = $('#txtRemars').val()
        ModelMaster.IDTypeTemp = Number(dbTypeTemp.value);
        ModelMaster.CompCode = CompCode;
        ModelMaster.From_ACC_CODE = $('#btnTo_ACC_CODE').val();
        ModelMaster.TrType = 0;
        ModelMaster.Status = 0;
        ModelMaster.IDLnkExcel = Number($("#dbTypeTemp option:selected").attr("data-IDLnkExcel"));
        ModelMaster.CreatedAt = GetDateTime();
        ModelMaster.CreatedBy = SysSession.CurrentEnvironment.NameUser;
        ModelMaster.CreateByUserID = SysSession.CurrentEnvironment.GQ_USERS.ID;


        let res: Array<E_G_Link_CreateExcelByTable> = GetDataFrom("E_G_Link_CreateExcelByTable", " IDLnkExcel = " + ModelMaster.IDLnkExcel)
        if (res.length > 0) {
            ModelMaster.KeyTrans = res[0].KeyTrans
        }


        Insert(ModelMaster)
    }
    function AssignListdataExcel() {

        debugger

    }
    function Insert(Model: E_I_LogUploadExcel) {

        debugger

        AssignListdataExcel();

        let _SendDataExcel: SendDataExcel = new SendDataExcel();
        _SendDataExcel.E_I_LogUploadExcel = Model
        _SendDataExcel.DataTemp = ListdataExcel

        Ajax.CallsyncModel({
            url: sys.apiUrl("Excel_Upload", "Insert"),
            type: "Post",
            data: JSON.stringify({ DataSend: JSON.stringify(_SendDataExcel) }),
            success: (d) => {
                debugger
                let result = d;
                if (result.isSuccess == true) {
                    let res = result.response

                    ShowMessage("Upload 👌( " + res.idExcel + " ) ", "تم الرفع 👌( " + res.idExcel + " ) ")

                    debugger
                    let NameFile = CustomNameFile($('#btnChooseFileExcel').html(), res.idExcel.toString(), ".xlsx");
                    Save_File("ChooseFileExcel", "/ExcelLoader/FolderDownloadExcel/", NameFile)

                    GetAllData();
                    setTimeout(function () {
                        Clean();
                        ActiveTab("Tap_All_Trans");
                        ShowBack_PageTap();

                    }, 800);
                    Close_Loder();
                } else {
                    ShowMessage("Error", "خطأ !")
                    Close_Loder();

                }



            }
        })
    }




}
