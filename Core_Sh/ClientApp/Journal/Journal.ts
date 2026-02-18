
$(document).ready(() => {
    Journal.InitalizeComponent();
});
namespace Journal {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var Res: SystemResources = GetGlopelResources();
    var Grid: StGridBuilder = new StGridBuilder();

    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _MasterDetails: MasterDetails = new MasterDetails();
    var Assign_DataGrid: AQ_JOURNAL_DETAIL = new AQ_JOURNAL_DETAIL();

    var BackTap: HTMLButtonElement
    var NextTap: HTMLButtonElement
    var SaveUpdate: HTMLButtonElement

    /****************************** Glop***********************************************/
    var NameFunction = "Insert";
    var UpdatedAt = "";
    var UpdatedBy = "";
    var GlopID = 0;
    var Glopl_CreatedAt = "";
    var Glopl_CreatedBy = "";
    var Glopl_IDUserCreate = 0;
    export function InitalizeComponent() {

        InitalizeControls();
        InitializeEvents();


        $('#VOUCHER_DATE').val(GetDate())

        //Get_Data(); 

        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            DisplayDataUpdate();
        }
        else {

            var data: Array<A_JOURNAL_DETAIL> = new Array<A_JOURNAL_DETAIL>();

            Grid.DataSource = data;
            Grid.Bind();

        }

        localStorage.setItem(GetParameterByName('App') + "TypePage", "0");

        if (NameFunction == "Insert") {
            $('#TYPE_CODE').val("2")
        }

        //**********************
        Close_Loder();
    }
    function DisplayDataUpdate() {
        NameFunction = "Update"

        let data: AQ_JOURNAL_HEADER = GetModelGlopel();
        GlopID = data.VoucherID;

        $('#TYPE_CODE').attr("disabled", "disabled")
        $('#TYPE_CODE').val(data.TYPE_CODE)
        $('#VOUCHER_CODE').val(data.VoucherID)
        $('#VOUCHER_DATE').val(DateFormat(data.VOUCHER_DATE))
        $('#REF_CODE').val(data.REF_CODE);

        $('#VOUCHER_DESC').val(data.VOUCHER_DESC)
        $('#TotalDebit').val(data.TotalDebit)
        $('#TotalCredit').val(data.TotalCredit)
        $('#Difference').val((Number(data.NetDifference)).toFixed(2))

        UpdatedAt = GetDateAndTimeSql();
        UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
        Glopl_CreatedAt = data.CREATED_AT.toString();
        Glopl_CreatedBy = data.CREATED_BY.toString();
        Glopl_IDUserCreate = data.IDUser


        InitalizeGridDetail(data.VoucherID)


    }
    function InitalizeControls() {

        BackTap = document.getElementById('BackTap') as HTMLButtonElement;
        NextTap = document.getElementById('NextTap') as HTMLButtonElement;
        SaveUpdate = document.getElementById('SaveUpdate') as HTMLButtonElement;

    }
    function InitializeEvents() {
        BackTap.onclick = FunBackTap
        NextTap.onclick = FunNextTap
        NextTap.onclick = Finish
        //SaveUpdate.onclick = Finish
    }

    function FunNextTap() {


        $('.TapMaster').addClass('display_none')
        $('.TapDetails').removeClass('display_none')

        $('#NextTap').addClass('display_none')
        $('#BackTap').removeClass('display_none')
        $('#SaveUpdate').addClass('display_none')
        $('#BackTap').focus();
    }
    function FunBackTap() {
        $('.TapMaster').removeClass('display_none')
        $('.TapDetails').addClass('display_none')

        $('#NextTap').removeClass('display_none')
        $('#BackTap').addClass('display_none')
        $('#SaveUpdate').addClass('display_none')
        $('#NextTap').focus();
    }
    function Clear() {
        $('._Clear').val('')
        FunBackTap();

    }

    function Validation() {

        if ($('#VOUCHER_DESC').val().trim() == "") {
            Errorinput($('#VOUCHER_DESC'), 'Must Enter  Describtion 😒', 'يجب إدخال الوصف 😒')
            return false
        }


        return true
    }

    //*************************************************************************************
    function InitalizeGridDetail(VoucherID: number) {

        let _PageSize = 22;
        Assign_DataGrid = new AQ_JOURNAL_DETAIL();

        Grid.ElementName = "StGrid_Journal";
        Grid.keyField = "VoucherDetailID";
        Grid.enableInsert = true;
        Grid.enableEdit = true;
        Grid.enableDelete = true;
        Grid.enableCopy = true;
        Grid.enableSearch = true;
        Grid.infiniteScroll = true;
        Grid.pageSize = _PageSize;
        Grid.direction = "ltr";
        Grid.onClickInsert = (item: AQ_JOURNAL_DETAIL) => {
            const result = SaveGridViews(item, "Insert");
            if (result === true) {
                InitalizeGridDetail(VoucherID)
            }
            return result;
        };
        Grid.onClickCopy = (item: AQ_JOURNAL_DETAIL) => {
            const result = SaveGridViews(item, "Copy");
            if (result === true) {
                InitalizeGridDetail(VoucherID)
            }
            return result;
        };
        Grid.onClickEdit = (item: AQ_JOURNAL_DETAIL) => { return SaveGridViews(item, "Update") };
        Grid.onClickDelete = (item: AQ_JOURNAL_DETAIL) => { SaveGridViews(item, "Delete") };
        Grid.onRowDoubleClicked = (item: AQ_JOURNAL_DETAIL) => alert("نقر مزدوج:" + item.VoucherDetailID);
        Grid.onFetchPage = async (pageNumber: number) => {
            //console.log("  البيانات للصفحة:", pageNumber); 
            let ListDataScroll = GetDataFrom("AQ_JOURNAL_DETAIL", " VoucherID = " + VoucherID, pageNumber, _PageSize, "VoucherDetailID")
            return ListDataScroll; // يجب أن يكون Array
        };
        Grid.columns = [
            { name: "VoucherDetailID", title: "VoucherDetailID", type: "number", visible: false, width: 100 },
            {
                title: "Ser", name: "Serial", width: 50, editing: false, inserting: false,
                itemTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.Serial.toString();
                    return txt;
                },
                editTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLInputElement => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.value = item.Serial.toString();
                    txt.id = "txt_Serial" + item.Serial;
                    txt.disabled = true;
                    txt.onkeyup = () => {
                    };
                    return txt;
                },

                insertTemplate: () => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.id = "txt_Serial";
                    txt.disabled = true;
                    txt.onkeyup = () => {
                    };
                    return txt;
                },


            },
            {
                title: "ACC CODE", name: "ACC_CODE", width: 100, editing: false, inserting: false,
                itemTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.ACC_CODE;
                    return txt;
                },
                editTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLButtonElement => {
                    let Btn = document.createElement("button");
                    Btn.textContent = item.ACC_CODE;
                    Btn.className = "btn btn-warning btn-sm";
                    Btn.style.width = "100%";
                    Btn.id = "Btn_Acc_Grid_" + item.VoucherDetailID;
                    Assign_DataGrid.ACC_CODE = item.ACC_CODE;
                    Btn.onclick = () => {

                        SearchAccount(Btn, "txt_ACC_DESC" + item.VoucherDetailID)


                    };
                    return Btn;
                },

                insertTemplate: () => {
                    const btn = document.createElement("button");
                    btn.className = "btn btn-success btn-sm";
                    btn.textContent = "اختر الحساب";
                    btn.style.width = "100%";
                    btn.id = "Btn_Acc_Grid_";
                    btn.onclick = () => {

                        SearchAccount(btn, "txt_ACC_DESC")
                    };
                    return btn;
                },



            },
            {
                title: "Desc", name: "ACC_DESCA", width: 100, editing: false, inserting: false,
                itemTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.ACC_DESCA.toString();
                    return txt;
                },
                editTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLInputElement => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.value = item.ACC_DESCA.toString();
                    txt.id = "txt_ACC_DESC" + item.VoucherDetailID;
                    txt.disabled = true;
                    Assign_DataGrid.ACC_DESCA = item.ACC_DESCA;
                    txt.onkeyup = () => {
                    };
                    return txt;
                },

                insertTemplate: () => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.id = "txt_ACC_DESC";
                    txt.disabled = true;
                    txt.onkeyup = () => {
                    };
                    return txt;
                },


            },
            {
                title: "Debit", name: "DEBIT", width: 50, editing: false, inserting: false, decimal: true, Digits: true,
                itemTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.DEBIT.toString();

                    return txt;
                },
                editTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLInputElement => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.type = "number";
                    txt.value = item.DEBIT.toString();
                    txt.id = "txt_DEBIT" + item.VoucherDetailID;
                    Assign_DataGrid.DEBIT = item.DEBIT;
                    txt.onchange = () => {
                        Assign_DataGrid.DEBIT = Number(txt.value);

                        $("#txt_CREDIT" + item.VoucherDetailID).val("0")
                        Assign_DataGrid.CREDIT = 0

                    };
                    return txt;
                },

                insertTemplate: () => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.id = "txt_DEBIT";
                    txt.type = "number";
                    txt.value = "0";
                    txt.onchange = () => {
                        Assign_DataGrid.DEBIT = Number(txt.value);


                        $("#txt_CREDIT").val("0")
                        Assign_DataGrid.CREDIT = 0
                    };
                    return txt;
                },


            },
            {
                title: "Credit", name: "CREDIT", width: 50, editing: false, inserting: false, decimal: true, Digits: true,
                itemTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.CREDIT.toString();
                    return txt;
                },
                editTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLInputElement => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.type = "number";
                    txt.value = item.CREDIT.toString();
                    txt.id = "txt_CREDIT" + item.VoucherDetailID;
                    Assign_DataGrid.CREDIT = item.CREDIT;
                    txt.onchange = () => {
                        Assign_DataGrid.CREDIT = Number(txt.value);

                        $("#txt_DEBIT" + item.VoucherDetailID).val("0")
                        Assign_DataGrid.DEBIT = 0

                    };
                    return txt;
                },

                insertTemplate: () => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.type = "number";
                    txt.id = "txt_CREDIT";
                    txt.value = "0";
                    txt.onchange = () => {
                        Assign_DataGrid.CREDIT = Number(txt.value);



                        $("#txt_DEBIT").val("0")
                        Assign_DataGrid.DEBIT = 0

                    };
                    return txt;
                },


            },

            {
                title: "Remarks", name: "Remarks", width: 100, editing: false, inserting: false,
                itemTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.Remarks.toString();
                    return txt;
                },
                editTemplate: (value: AQ_JOURNAL_DETAIL, item: AQ_JOURNAL_DETAIL): HTMLInputElement => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.id = "txt_Remarks" + item.VoucherDetailID;
                    txt.value = item.Remarks; 
                    Assign_DataGrid.Remarks = item.Remarks;
                    txt.onkeyup = () => {

                        Assign_DataGrid.Remarks = txt.value.trim();

                    };
                    return txt;
                },

                insertTemplate: () => {
                    let txt = document.createElement("input");
                    txt.style.width = "100%";
                    txt.id = "txt_Remarks"; 
                    txt.onkeyup = () => {
                        Assign_DataGrid.Remarks = txt.value.trim();
                    };
                    return txt;
                },


            },

            //{ name: "Remarks", title: "Remarks", type: "text", width: 100 },

        ];


        let Listdata = GetDataFrom("AQ_JOURNAL_DETAIL", " VoucherID = " + VoucherID, 1, _PageSize, "VoucherDetailID")
        Grid.DataSource = Listdata;
        Grid.Bind();

    }
    function SaveGridViews(item: AQ_JOURNAL_DETAIL, TypeTrans: string): boolean {

        debugger
        if (TypeTrans != "Delete" && TypeTrans != "Copy") {
            if (!ValidationRow(item, TypeTrans)) {
                return false; // مهم
            }
        }

        var Model: A_JOURNAL_DETAIL = new A_JOURNAL_DETAIL();


        if (TypeTrans != "Copy") {

            //************************************ Value Set In Grid ************************************

            item.ACC_DESCA = Assign_DataGrid.ACC_DESCA
            item.ACC_CODE = Assign_DataGrid.ACC_CODE
            item.DEBIT = Number(Assign_DataGrid.DEBIT.toFixed(2))
            item.CREDIT = Number(Assign_DataGrid.CREDIT.toFixed(2))
            item.Remarks = Assign_DataGrid.Remarks

        }




        //*******************************************************************************************

        //************************************ MergeData Value  From Grid in Mode *******************
        let _Model = MergeData(item, Model, "StatusFlag")
        //*******************************************************************************************

        //************************************  Assign Value In Mode ************************************

        if (TypeTrans == "Insert" || TypeTrans == "Copy") {
            _Model.VoucherDetailID = null;
        }
        _Model.COMP_CODE = CompCode
        _Model.VOUCHER_CODE = GlopID
        _Model.VoucherID = GlopID

        debugger
 
 

        _Model.TrDate = $('#VOUCHER_DATE').val()


        if (Number($('#TYPE_CODE').val()) == 0) {
            _Model.Trans_Type = 'Journal_Opening'
        }


        if (Number($('#TYPE_CODE').val()) == 1) {
            _Model.Trans_Type = 'Journal_Auto'
        }


        if (Number($('#TYPE_CODE').val()) == 2) {
            _Model.Trans_Type = 'Journal_Manual'
        }



        

        if (TypeTrans != "Copy") {
            _Model.ACC_CODE = Assign_DataGrid.ACC_CODE
            _Model.DEBIT = Assign_DataGrid.DEBIT
            _Model.CREDIT = Assign_DataGrid.CREDIT

            //*************************************************** 
            _Model.Remarks = Assign_DataGrid.Remarks
          
        }


        if ((_Model.Remarks ?? '') == '' || _Model.Remarks.trim() == '') {
            _Model.Remarks = ($('#VOUCHER_DESC').val());
            item.Remarks = _Model.Remarks
            Assign_DataGrid.Remarks = _Model.Remarks
        }


        //*******************************************************************************************

        //************************************ Save Data in DataBase ************************************

        debugger
        let Query = " exec A_CalculationTotalJournal " + GlopID;
        UpdateDataBase(_Model, "A_JOURNAL_DETAIL", (TypeTrans == "Copy" ? "Insert" : TypeTrans), Query, "A_CalculationTotalJournal")
        debugger
        //************************************ Return Data ************************************

        // Return Data Table ************************************

        let Rest = ResultTable.ResReturn as A_JOURNAL_DETAIL
        item.VoucherDetailID = Rest.VoucherDetailID;


        // Return Query Extra || ************************************

        let ResQuery = ResultTable.ResQuery as Array<A_CalculationTotalJournal>;
        if (ResQuery.length > 0) {

            if (TypeTrans == "Insert") {
                item.Serial = ResQuery[0].Serial_Det;
            }

            $('#TotalDebit').val(ResQuery[0].TotalDebit)
            $('#TotalCredit').val(ResQuery[0].TotalCredit)
            $('#Difference').val(ResQuery[0].NetDifference)
        }

        Assign_DataGrid = new AQ_JOURNAL_DETAIL();

        return true; // لازم يرجع true لو كل شيء تم بنجاح
    }
    //*************************************************************************************
    function ValidationRow(item: AQ_JOURNAL_DETAIL, TypeTrans: string): boolean {

        debugger

        if (TypeTrans == "Insert") {

            if ($('#Btn_Acc_Grid_').text().trim() == "") {
                ShowMessage(" Must Select Account 😒", " برجاء اختيار الحساب 😒")
                Errorinput($('#Btn_Acc_Grid_'))

                return false
            }

            if ($('#Btn_Acc_Grid_').text().trim() == "اختر الحساب") {
                ShowMessage(" Must Select Account 😒", " برجاء اختيار الحساب 😒")
                Errorinput($('#Btn_Acc_Grid_'))

                return false
            }

            if (Number($('#txt_DEBIT').val()) == 0 && Number($('#txt_CREDIT').val()) == 0) {
                ShowMessage(" Must Enter Debit or Credit 😒", " برجاء ادخال المدين او الدائن 😒")
                Errorinput($('#txt_CREDIT'))
                Errorinput($('#txt_DEBIT'))

                return false
            }

        }
        else {
            if ($('#Btn_Acc_Grid_' + item.VoucherDetailID).text().trim() == "") {
                ShowMessage(" Must Select Account 😒", " برجاء اختيار الحساب 😒")
                Errorinput($('#Btn_Acc_Grid_' + item.VoucherDetailID))

                return false
            }

            if (Number($('#txt_DEBIT' + item.VoucherDetailID).val()) == 0 && Number($('#txt_CREDIT' + item.VoucherDetailID).val()) == 0) {
                ShowMessage(" Must Enter Debit or Credit 😒", " برجاء ادخال المدين او الدائن 😒")
                Errorinput($('#txt_CREDIT' + item.VoucherDetailID))
                Errorinput($('#txt_DEBIT' + item.VoucherDetailID))

                return false
            }
        }




        return true
    }
    //*************************************************************************************
    function Assign() {

        let ModelMaster = new A_JOURNAL_HEADER();
        if (GlopID > 0) {
            NameFunction = "Update";
            ModelMaster.VoucherID = GlopID;
        }
        else {
            NameFunction = "Insert";
            ModelMaster.VoucherID = null;
        }
        ModelMaster.COMP_CODE = CompCode;
        ModelMaster.VOUCHER_CODE = Number($('#VOUCHER_CODE').val());
        ModelMaster.TYPE_CODE = Number($('#TYPE_CODE').val());
        ModelMaster.REF_CODE = ($('#REF_CODE').val());
        ModelMaster.VOUCHER_DESC = ($('#VOUCHER_DESC').val());
        //ModelMaster.TotalDebit = Number($('#TotalDebit').val());
        //ModelMaster.TotalCredit = Number($('#TotalCredit').val());
        ModelMaster.VOUCHER_DATE = $('#VOUCHER_DATE').val() 



        if (Number($('#TYPE_CODE').val()) == 0) {
            ModelMaster.Trans_Type = 'Journal_Opening'
        }


        if (Number($('#TYPE_CODE').val()) == 1) {
            ModelMaster.Trans_Type = 'Journal_Auto'
        }


        if (Number($('#TYPE_CODE').val()) == 2) {
            ModelMaster.Trans_Type = 'Journal_Manual'
        }



        let ModelDetails = new Array<A_JOURNAL_DETAIL>();
        //ModelDetails = Grid.ESG.Model;
        if (NameFunction == "Insert") {
            ModelMaster.CREATED_AT = GetDateAndTimeSql();
            ModelMaster.CREATED_BY = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
            ModelMaster.UPDATED_AT = null

            ModelMaster.IDUser = SysSession.CurrentEnvironment.GQ_USERS.ID
        }
        else {
            ModelMaster.CREATED_AT = Glopl_CreatedAt
            ModelMaster.CREATED_BY = Glopl_CreatedBy
            ModelMaster.IDUser = SysSession.CurrentEnvironment.GQ_USERS.ID

            ModelMaster.UPDATED_AT = GetDateAndTimeSql();
            ModelMaster.UPDATED_BY = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;

        }
        debugger
        _MasterDetails.Master = ModelMaster

        _MasterDetails.Details = ModelDetails

    }
    function Finish() {
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒")
            return
        }


        if (!Validation()) {
            return
        }

        Save();
    }
    function Save() {
        Assign();

        Show_Loder();
        debugger
        setTimeout(function () {
            debugger
            UpdateDataBase(_MasterDetails.Master, "A_JOURNAL_HEADER", NameFunction, "", "")
            if (ResultTable.ResReturn != null) {

                let res: A_JOURNAL_HEADER = ResultTable.ResReturn
                debugger
                GlopID = res.VoucherID;

                debugger
                if (NameFunction == "Insert") {
                    InitalizeGridDetail(res.VoucherID)
                }

                FunNextTap();


                $("#Display_Back_Page").click();
            }


            Close_Loder();

        }, 50);

    }


    //*************************************************************************************************************************

    function SearchAccount(Btn: HTMLButtonElement, IDDecs: string) {

        sys.FindKeyPagination("Account", "btnAcc", " COMP_CODE = " + CompCode + " and ACC_ACTIVE = 1 and Detail = 1", () => {

            let DataRow: A_ACCOUNT = SelectDataSearch.DataRow

            Btn.textContent = DataRow.ACC_CODE;
            Assign_DataGrid.ACC_CODE = DataRow.ACC_CODE;
            Assign_DataGrid.ACC_DESCA = DataRow.ACC_DESCA;
            $('#' + IDDecs).val(DataRow.ACC_DESCA)

        });
    }      

}
