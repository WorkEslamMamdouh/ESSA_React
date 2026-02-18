$(document).ready(() => {
    AdminCompany.InitalizeComponent();
});
var AdminCompany;
(function (AdminCompany) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var JGrid = new JsGrid();
    var AllCOMPANY = new Array();
    var Model = new G_COMPANY();
    var Create_drpCompany;
    var Create_COMP_CODE;
    var checkDef;
    var btnUpdate;
    var Tap_All_Trans;
    var Tap_Make_Trans;
    var btnCreateCompany;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        ActiveTab("Tap_All_Trans");
        GetAllData();
        Close_Loder();
        $('#Tap_Make_Trans').addClass('display_none');
    }
    AdminCompany.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Create_COMP_CODE = document.getElementById('Create_COMP_CODE');
        checkDef = document.getElementById('Create_checkDef');
        Create_drpCompany = document.getElementById('Create_drpCompany');
        btnUpdate = document.getElementById('btnUpdate');
        Tap_All_Trans = document.getElementById('Tap_All_Trans');
        Tap_Make_Trans = document.getElementById('Tap_Make_Trans');
        btnCreateCompany = document.getElementById('btnCreateCompany');
    }
    function InitializeEvents() {
        Tap_All_Trans.onclick = () => { ActiveTab("Tap_All_Trans"); };
        Tap_Make_Trans.onclick = () => { ActiveTab("Tap_Make_Trans"); };
        btnCreateCompany.onclick = CreateCompany;
        btnUpdate.onclick = Update_Company_Data;
        Create_COMP_CODE.onchange = CheckComp;
    }
    function CreateCompany() {
        if ($('#Create_COMP_CODE').val().trim() == '') {
            Errorinput($('#Create_COMP_CODE'), "Please Enter Code 🤨", "برجاء ادخال الكود 🤨");
            return;
        }
        if ($('#Create_NameA').val().trim() == '') {
            Errorinput($('#Create_NameA'), "Please Enter NameA 🤨", "برجاء ادخال اسم 🤨");
            return;
        }
        if ($('#Create_NameE').val().trim() == '') {
            Errorinput($('#Create_NameE'), "Please Enter NameE 🤨", "برجاء ادخال اسم 🤨");
            return;
        }
        if ($('#Create_NationalityID').val().trim() == '') {
            Errorinput($('#Create_NationalityID'), "Please Enter the NationalityID 🤨", "برجاء ادخال رقم NationalityID 🤨");
            return;
        }
        if ($('#Create_Currencyid').val().trim() == '') {
            Errorinput($('#Create_Currencyid'), "Please Enter the Currencyid 🤨", "برجاء ادخال رقم Currencyid 🤨");
            return;
        }
        if ($('#Create_VatNo').val().trim() == '') {
            Errorinput($('#Create_VatNo'), "Please Enter Vat No 🤨", "برجاء ادخال الرقم الضريبي 🤨");
            return;
        }
        if ($('#Create_VatNo').val().length != 15) {
            Errorinput($('#Create_VatNo'), "The vat number must be 15 digits.🤨", "يجب ان يتكون الرقم الضريبي من ١٥ رقم 🤨");
            return;
        }
        if ($('#Create_Address_District').val().trim() == '') {
            Errorinput($('#Create_Address_District'), "The Address District must be entered.🤨", "يجب إدخال الحي .🤨");
            return;
        }
        if ($('#Create_Address_Postal').val().trim() == '') {
            Errorinput($('#Create_Address_Postal'), "The Address postal must be entered.🤨", "يجب إدخال الرقم البريدي  .🤨");
            return;
        }
        if ($('#Create_Address_City').val().trim() == '') {
            Errorinput($('#Create_Address_City'), "The Address city must be entered.🤨", "يجب إدخال المدينة  .🤨");
            return;
        }
        if ($('#Create_Address_Province').val().trim() == '') {
            Errorinput($('#Create_Address_Province'), "The Address Province must be entered.🤨", "يجب إدخال الحافظة  .🤨");
            return;
        }
        if ($('#Create_Address_Street').val().trim() == '') {
            Errorinput($('#Create_Address_Street'), "The Address Street must be entered.🤨", "يجب إدخال الشارع  .🤨");
            return;
        }
        if ($('#Create_Address_BuildingNo').val().trim() == '') {
            Errorinput($('#Create_Address_BuildingNo'), "The Address BuildingNo must be entered.🤨", "يجب إدخال رقم المبني .🤨");
            return;
        }
        Show_Loder();
        Model = new G_COMPANY();
        Model.COMP_CODE = ($('#Create_COMP_CODE').val());
        Model.NameA = ($('#Create_NameA').val());
        Model.NameE = ($('#Create_NameE').val());
        Model.Address_BuildingNo = ($('#Create_Address_BuildingNo').val());
        Model.Address_Build_Additional = ($('#Create_Address_Build_Additional').val());
        Model.Address_City = ($('#Create_Address_City').val());
        Model.Address_District = ($('#Create_Address_District').val());
        Model.Address_Postal = ($('#Create_Address_Postal').val());
        Model.Address_Province = ($('#Create_Address_Province').val());
        Model.Address_Street = ($('#Create_Address_Street').val());
        Model.Address_Str_Additional = ($('#Create_Address_Str_Additional').val());
        Model.Address_Build_Additional = ($('#Create_Address_Build_Additional').val());
        Model.Tel = ($('#Create_Tel').val());
        Model.Email = ($('#Create_Email').val());
        Model.VATNO = ($('#Create_VatNo').val());
        Model.NationalityID = ($('#Create_NationalityID').val());
        Model.Currencyid = ($('#Create_Currencyid').val());
        Model.IsActive = true;
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("G_COMPANY", "Insert"),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    let checker = checkDef.checked == true ? 1 : 0;
                    SqlExecuteQuery(" ES_Create_Company  " + $('#Create_COMP_CODE').val() + "," + $('#Create_drpCompany').val().trim() + "," + checker + "");
                    GetAllData();
                    ShowMessage("Company Created ✅", ' تم انشاء الشركة ✅');
                    $('#Txt_NameCompany').val('');
                    ActiveTab("Tap_All_Trans");
                    ShowMessage("Saved 🤞😉", "تم الحفظ 🤞😉");
                    Close_Loder();
                }
                else {
                    ShowMessage("Error", "يوجد خطاء في الحفظ");
                    Close_Loder();
                }
            }
        });
    }
    function InitializeGrid() {
        JGrid.ElementName = "JGrid";
        JGrid.PrimaryKey = "COMP_CODE";
        JGrid.Paging = true;
        JGrid.PageSize = 50;
        JGrid.Sorting = true;
        JGrid.InsertionMode = JsGridInsertionMode.Binding;
        JGrid.Editing = false;
        JGrid.Inserting = false;
        JGrid.SelectedIndex = 1;
        JGrid.OnItemEditing = () => { };
        JGrid.Columns = [
            { title: "الرقم", name: "COMP_CODE", type: "text", width: "100px" },
            { title: "الشركة", name: "NameA", type: "text", width: "100px" },
            {
                title: "السنه", css: "ColumPadding", type: "number", visible: false, name: "FinYear", width: "80px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "number";
                    var today = new Date();
                    var yyyy = today.getFullYear();
                    txt.id = "FinYear" + item.COMP_CODE;
                    txt.value = yyyy.toString();
                    txt.style.width = '80px';
                    return txt;
                }
            },
            {
                title: "مسار اللي هينزل فيه النسخه الاحطياطيه", css: "ColumPadding", type: "text", name: "FinYear", width: "80px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "text";
                    var today = new Date();
                    var yyyy = today.getFullYear();
                    txt.id = "Path" + item.COMP_CODE;
                    txt.value = item.Systems;
                    txt.style.width = '150px';
                    txt.onchange = (e) => {
                        Show_Loder();
                        setTimeout(function () {
                            let Sql = "update [dbo].[G_COMPANY] set [Systems] = N'" + $('#Path' + item.COMP_CODE).val() + "'";
                            SqlExecuteQuery(Sql);
                            ShowMessage('The path has been modified ✅', 'تم تعديل المسار ✅');
                            Close_Loder();
                        }, 50);
                    };
                    return txt;
                }
            },
            {
                title: "Name Data Base", css: "ColumPadding", type: "text", name: "FinYear", width: "80px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "text";
                    var today = new Date();
                    txt.id = "GMName" + item.COMP_CODE;
                    txt.value = item.GMName;
                    txt.style.width = '150px';
                    txt.onchange = (e) => {
                        Show_Loder();
                        setTimeout(function () {
                            let Sql = "update [dbo].[G_COMPANY] set [GMName] = N'" + $('#GMName' + item.COMP_CODE).val() + "'";
                            SqlExecuteQuery(Sql);
                            ShowMessage('The name of the data base has been modified ✅', 'تم تعديل اسم الداته بيز ✅');
                            Close_Loder();
                        }, 50);
                    };
                    return txt;
                }
            },
            {
                title: "اخذ نسخه احتياطيه", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("نسخه");
                    txt.id = "butUpdateAccount" + item.COMP_CODE;
                    txt.className = "btn btn-custon-four btn-info ";
                    txt.style.backgroundColor = "#03bb10";
                    txt.style.width = "100px";
                    txt.onclick = (e) => {
                        Show_Loder();
                        setTimeout(function () {
                            let Sql = "BACKUP DATABASE " + $('#GMName' + item.COMP_CODE).val() + "  TO DISK = '" + $('#Path' + item.COMP_CODE).val() + "\\" + "" + $('#GMName' + item.COMP_CODE).val() + "___" + GetDateAndTimeBakup() + ".bak' WITH FORMAT, INIT;";
                            SqlExecuteQuery(Sql);
                            ShowMessage('Backup taken ✅', 'تم اخذ نسخه احتياطيه ✅');
                            Close_Loder();
                        }, 50);
                    };
                    return txt;
                }
            },
            {
                title: "تحديث ارصدة المخزون", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("تحديث");
                    txt.id = "butUpdateAccount" + item.COMP_CODE;
                    txt.className = "btn btn-custon-four btn-info ";
                    txt.style.backgroundColor = "#03bb10";
                    txt.style.width = "100px";
                    txt.onclick = (e) => {
                        Show_Loder();
                        setTimeout(function () {
                            SqlExecuteQuery('exec G_UpdateAllStock');
                            ShowMessage('Inventory updated ✅', 'تم تحديث المخزون ✅');
                            Close_Loder();
                        }, 50);
                    };
                    return txt;
                }
            },
            {
                title: "تعديل البيانات ", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("تعديل");
                    txt.style.backgroundColor = "#1a2fc9";
                    txt.id = "butEdit" + item.COMP_CODE;
                    txt.className = "btn btn-custon-four btn-info ";
                    txt.style.width = "100px";
                    txt.onclick = (e) => {
                        ActiveTab("EditCompany");
                        BindCompanyData(item);
                    };
                    return txt;
                }
            },
            {
                title: "السنة الجديدة", css: "ColumPadding", type: "text", name: "Year", width: "80px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "text";
                    var today = new Date();
                    var yyyy = today.getFullYear();
                    txt.id = "newYear" + item.COMP_CODE;
                    debugger;
                    yyyy += 1;
                    txt.value = yyyy.toString();
                    txt.style.width = '150px';
                    return txt;
                }
            },
            {
                title: "توليد بيانات السنة الجديدة", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("توليد بيانات السنة الجديدة");
                    txt.style.backgroundColor = "#1a2fc9";
                    txt.id = "butJournal" + item.COMP_CODE;
                    txt.className = "btn btn-custon-four btn-info ";
                    txt.style.width = "170px";
                    debugger;
                    txt.onclick = (e) => {
                        debugger;
                        var Year = $("#newYear" + item.COMP_CODE).val();
                        SqlExecuteQuery('exec Z_A_Create_Open_Journal ' + Number(Year) + '');
                        ShowMessage('Inventory updated ✅', 'تم توليد بيانات السنة الجديدة ✅');
                        Close_Loder();
                    };
                    return txt;
                }
            },
        ];
        JGrid.Bind();
    }
    function GetAllData() {
        CleaningList_Table();
        ActiveTab("Tap_All_Trans");
        var Table;
        Table =
            [
                { NameTable: 'G_COMPANY', Condition: "" },
                { NameTable: 'I_Control', Condition: " CompCode = 0" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        AllCOMPANY = GetDataTable('G_COMPANY');
        FillDropDown(AllCOMPANY, Create_drpCompany, 'COMP_CODE', 'NameA', null);
        let _Control = GetDataTable('I_Control');
        let _COMPANY = AllCOMPANY.filter(x => x.COMP_CODE != 0).sort(dynamicSort("COMP_CODE"));
        JGrid.DataSource = _COMPANY;
        JGrid.Bind();
        $('#Txt_AccCodeDownloadUsers').val(_Control[0].ACC_CODE_Create_User);
        $('#Txt_AccCodeStartUsers').val(_Control[0].StartAccCode_User);
        $('#Txt_AccCodeStartLoanCustody').val(_Control[0].Start_Loan_Custody);
    }
    function BindCompanyData(data) {
        $('#COMP_CODE').attr('disabled', 'disabled');
        $('#COMP_CODE').val(data.COMP_CODE);
        $('#NameA').val(data.NameA);
        $('#NameE').val(data.NameE);
        $('#Address_BuildingNo').val(data.Address_BuildingNo);
        $('#Address').val(data.Address);
        $('#Address_Build_Additional').val(data.Address_Build_Additional);
        $('#Address_City').val(data.Address_City);
        $('#Address_District').val(data.Address_District);
        $('#Address_Postal').val(data.Address_Postal);
        $('#Address_Province').val(data.Address_Province);
        $('#Address_Street').val(data.Address_Street);
        $('#Address_Str_Additional').val(data.Address_Str_Additional);
        $('#Tel').val(data.Tel);
        $('#VatNo').val(data.VATNO);
        $('#Email').val(data.Email);
        $('#NationalityID').val(data.NationalityID);
        $('#Currencyid').val(data.Currencyid);
    }
    function Update_Company_Data() {
        if ($('#NameA').val().trim() == '') {
            Errorinput($('#NameA'), "Please Enter NameA 🤨", "برجاء ادخال اسم 🤨");
            return;
        }
        if ($('#NameE').val().trim() == '') {
            Errorinput($('#NameE'), "Please Enter NameE 🤨", "برجاء ادخال اسم 🤨");
            return;
        }
        if ($('#NationalityID').val().trim() == '') {
            Errorinput($('#NationalityID'), "Please Enter the NationalityID 🤨", "برجاء ادخال رقم NationalityID 🤨");
            return;
        }
        if ($('#Currencyid').val().trim() == '') {
            Errorinput($('#Currencyid'), "Please Enter the Currencyid 🤨", "برجاء ادخال رقم Currencyid 🤨");
            return;
        }
        if ($('#VatNo').val().trim() == '') {
            Errorinput($('#VatNo'), "Please Enter Vat No 🤨", "برجاء ادخال الرقم الضريبي 🤨");
            return;
        }
        if ($('#VatNo').val().length != 15) {
            Errorinput($('#VatNo'), "The vat number must be 15 digits.🤨", "يجب ان يتكون الرقم الضريبي من ١٥ رقم 🤨");
            return;
        }
        if ($('#Address_District').val().trim() == '') {
            Errorinput($('#Address_District'), "The Address District must be entered.🤨", "يجب إدخال الحي .🤨");
            return;
        }
        if ($('#Address_Postal').val().trim() == '') {
            Errorinput($('#Address_Postal'), "The Address postal must be entered.🤨", "يجب إدخال الرقم البريدي  .🤨");
            return;
        }
        if ($('#Address_City').val().trim() == '') {
            Errorinput($('#Address_City'), "The Address city must be entered.🤨", "يجب إدخال المدينة  .🤨");
            return;
        }
        if ($('#Address_Province').val().trim() == '') {
            Errorinput($('#Address_Province'), "The Address Province must be entered.🤨", "يجب إدخال الحافظة  .🤨");
            return;
        }
        if ($('#Address_Street').val().trim() == '') {
            Errorinput($('#Address_Street'), "The Address Street must be entered.🤨", "يجب إدخال الشارع  .🤨");
            return;
        }
        if ($('#Address_BuildingNo').val().trim() == '') {
            Errorinput($('#Address_BuildingNo'), "The Address BuildingNo must be entered.🤨", "يجب إدخال رقم المبني .🤨");
            return;
        }
        Show_Loder();
        Model = new G_COMPANY();
        Model.COMP_CODE = ($('#COMP_CODE').val());
        Model.NameA = ($('#NameA').val());
        Model.NameE = ($('#NameE').val());
        Model.Address_BuildingNo = ($('#Address_BuildingNo').val());
        Model.Address_Build_Additional = ($('#Address_Build_Additional').val());
        Model.Address_City = ($('#Address_City').val());
        Model.Address_District = ($('#Address_District').val());
        Model.Address_Postal = ($('#Address_Postal').val());
        Model.Address_Province = ($('#Address_Province').val());
        Model.Address_Street = ($('#Address_Street').val());
        Model.Address_Str_Additional = ($('#Address_Str_Additional').val());
        Model.Address_Build_Additional = ($('#Address_Build_Additional').val());
        Model.Tel = ($('#Tel').val());
        Model.Email = ($('#Email').val());
        Model.VATNO = ($('#VatNo').val());
        Model.NationalityID = ($('#NationalityID').val());
        Model.Currencyid = ($('#Currencyid').val());
        Model.IsActive = true;
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("G_COMPANY", "Update"),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    GetAllData();
                    ShowMessage("Saved 🤞😉", "تم الحفظ 🤞😉");
                    Close_Loder();
                }
                else {
                    ShowMessage("Error", "يوجد خطاء في الحفظ");
                    Close_Loder();
                }
            }
        });
    }
    function CheckComp() {
        let Com_lenght = AllCOMPANY.filter(x => x.COMP_CODE == Number(Create_COMP_CODE.value));
        if (Com_lenght.length > 0) {
            Create_COMP_CODE.value = "";
            Errorinput(Create_COMP_CODE, "Compcode already exits 😱", "كود الشركة موجود مسبقاً 😱");
        }
    }
})(AdminCompany || (AdminCompany = {}));
//# sourceMappingURL=AdminCompany.js.map