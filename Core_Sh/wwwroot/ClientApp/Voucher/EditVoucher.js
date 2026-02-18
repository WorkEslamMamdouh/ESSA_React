//$(document).ready(() => {
//    EditVoucher.InitalizeComponent();
//});
//namespace EditVoucher {
//    var sys: SystemTools = new SystemTools();
//    var SysSession: SystemSession = GetSystemSession();
//    var btnFrom_ACC_CODE: HTMLButtonElement;
//    var btnTo_ACC_CODE: HTMLButtonElement;
//    var btnAdd: HTMLButtonElement;
//    var db_Type: HTMLSelectElement;
//    var Model: I_TransMoney = new I_TransMoney();
//    var DataView: IQ_TransMoney = new IQ_TransMoney();
//    var db_TypeFinEdit: HTMLSelectElement;
//    var _TypeTrans: Array<G_TypeTrans> = new Array<G_TypeTrans>();
//    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
//    export function InitalizeComponent() {
//         
//        if (!SysSession.CurrentEnvironment.GQ_USERS.IsRolePosted || SysSession.CurrentEnvironment.GQ_USERS.IsRolePosted == null) {
//            $('#IsPostDirectJournal').prop("checked", false)
//            $('#IsPostDirectJournal').attr("disabled", "disabled")
//        }
//        DataView = GetGlopelModelIQ_TransMoney();
//        InitalizeControls();
//        InitializeEvents();
//        GetData_Type();
//        DisplayInformation();
//        Close_Loder();
//    }
//    function DisplayInformation() {
//        $('#Txt_Ref_No').val(DataView.RefNO);
//        $('#Txt_TrData').val(DateFormat(DataView.TrDate));
//        $('#btnFrom_ACC_CODE').val(DataView.From_ACC_CODE);
//        $('#Txt_From_ACC_DESCA').val(DataView.From_ACC_DESCA);
//        $('#btnTo_ACC_CODE').val(DataView.ACC_CODE);
//        $('#Txt_To_ACC_DESCA').val(DataView.ACC_DESCA);
//        $('#Txt_Amount').val(DataView.Amount);
//        $('#Txt_Remarks').val(DataView.Remark); 
//        $('#db_Type').val(DataView.IsCash == true ? '1' : '0');
//        db_Type_Change();
//        $('#Txt_TransNO').val(DataView.TransferNo);
//        db_TypeFinEdit.value = DataView.IDType.toString();
//         
//        if (DataView.Symbols == '4' || DataView.Symbols == '5' || DataView.Symbols == '6' || DataView.Symbols == '7') {
//            $('#btnFrom_ACC_CODE').val(DataView.ACC_CODE);
//            $('#Txt_From_ACC_DESCA').val(DataView.ACC_DESCA);
//            $('#btnTo_ACC_CODE').val(DataView.From_ACC_CODE);
//            $('#Txt_To_ACC_DESCA').val(DataView.From_ACC_DESCA);
//        }
//    }
//    function InitalizeControls() {
//        btnFrom_ACC_CODE = document.getElementById("btnFrom_ACC_CODE") as HTMLButtonElement;
//        btnTo_ACC_CODE = document.getElementById("btnTo_ACC_CODE") as HTMLButtonElement;
//        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
//        db_Type = document.getElementById("db_Type") as HTMLSelectElement;
//        db_TypeFinEdit = document.getElementById("db_TypeFinEdit") as HTMLSelectElement;
//    }
//    function InitializeEvents() {
//        btnTo_ACC_CODE.onclick = SearchToAcc;
//        btnFrom_ACC_CODE.onclick = SearchFromAcc;
//        btnAdd.onclick = Add_Reciept;
//        db_Type.onchange = db_Type_Change;
//    }
//    function GetData_Type() {
//        var Table: Array<Table>;
//        Table =
//            [
//                { NameTable: 'G_TypeTrans', Condition: " Symbols not in ('1','2','0','3') and Is_Active = 1 and CompCode = " + SysSession.CurrentEnvironment.CompCode },
//            ]
//        DataResult(Table);
//        //**************************************************************************************************************
//        _TypeTrans = GetDataTable('G_TypeTrans');
//        FillDropDown(_TypeTrans, db_TypeFinEdit, "IDType", "TypeDesc", null)
//    }
//    //****************************************************** Validtion and Clear *****************************************
//    function db_Type_Change() {
//        if (db_Type.value == "0") {
//            $('#Txt_TransNO').removeAttr("disabled");
//            $('#Txt_TransNO').val("");
//        } else {
//            $('#Txt_TransNO').attr("disabled", "disabled");
//            $('#Txt_TransNO').val(""); 
//        }
//    }
//    function SearchFromAcc() {
//        sys.FindKeySpeed("Account", "   FIN_YEAR = " + GetFinYear() + " and  COMP_CODE = " + CompCode + "  and DETAIL = true "  , 'SearchForm', () => {
//        //sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + "  and DETAIL = 1 ", () => {
//            let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
//            $('#btnFrom_ACC_CODE').val(SelectedItem.ACC_CODE);
//            $('#Txt_From_ACC_DESCA').val(SelectedItem.ACC_DESCA);
//        });
//    }
//    function SearchToAcc() {
//        sys.FindKeySpeed("Account", "   FIN_YEAR = " + GetFinYear() + " and  COMP_CODE = " + CompCode + "  and DETAIL = true "  , 'SearchForm', () => {
//        //sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + "  and DETAIL = 1 ", () => {
//            let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
//            $('#btnTo_ACC_CODE').val(SelectedItem.ACC_CODE);
//            $('#Txt_To_ACC_DESCA').val(SelectedItem.ACC_DESCA);
//        });
//    }
//    function Add_Reciept() {
//        if ($('#Txt_Ref_No').val().trim() == "") {
//            Errorinput($('#Txt_Ref_No'), "Please Enter Ref No 🤨");
//            return
//        }
//        if ($('#btnFrom_ACC_CODE').val() == "Search From Account") {
//            Errorinput($('#btnFrom_ACC_CODE'), "Please Select From Account 🤨");
//            return
//        }
//        if ($('#btnTo_ACC_CODE').val() == "Search To Account") {
//            Errorinput($('#btnTo_ACC_CODE'), "Please Select To Account 🤨");
//            return
//        }
//        if (db_Type.value == "0" && $('#Txt_TransNO').val().trim() == "") {
//            Errorinput($('#Txt_TransNO'), "Please Enter Transfer No 🤨");
//            return
//        }
//        if (Number($('#Txt_Amount').val()) == 0) {
//            Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨");
//            return
//        }
//        if ($('#Txt_Remarks').val().trim() == '') {
//            Errorinput($('#Txt_Remarks'), "Please Enter Remarks 🤨");
//            return
//        }
//         
//        Model = new I_TransMoney();
//        Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
//        Model.BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
//        Model.RefNO = $('#Txt_Ref_No').val();
//        Model.TrDate = DateFormatddmmyyyy($('#Txt_TrData').val());
//        Model.TransferNo = $('#Txt_TransNO').val();
//        Model.Status = 0;
//        Model.Remark = $('#Txt_Remarks').val();
//        Model.IDType = Number(db_TypeFinEdit.value);
//        Model.TrType = 0;
//        Model.Amount = Number($('#Txt_Amount').val());
//        let Typ = _TypeTrans.filter(x => x.IDType == Model.IDType)
//        if (Typ.length > 0) {
//            Model.TrType = Number(Typ[0].Symbols);
//        }
//        Model.Debit = Number($('#Txt_Amount').val());
//        // Model.Credit = Number($('#Txt_Amount').val());
//        Model.From_ACC_CODE = $('#btnFrom_ACC_CODE').val();
//        Model.ACC_CODE = $('#btnTo_ACC_CODE').val();
//        Model.NameRecipient = $('#Txt_To_ACC_DESCA').val();
//        if (db_Type.value == "1") {
//            Model.IsCash = true;
//        }
//        else {
//            Model.IsCash = false;
//        }
//        Model.IsPosted = $('#IsPostDirectJournal').prop("checked");
//        Model.VoucherNo = 0;
//        Model.UpdatedAt = GetDateAndTimeSql();
//        Model.UpdatedBy = SysSession.CurrentEnvironment.NameUser;
//        Model.IDTrans = DataView.IDTrans;
//        Model.TrNo = DataView.TrNo;
//        Model.USERID = DataView.USERID;
//        Model.IDType = Number(db_TypeFinEdit.value);
//        Model.FromIDTrans = DataView.FromIDTrans;
//        Model.IDUserCreate = DataView.IDUserCreate;
//        Model.IDExcel = DataView.IDExcel;
//        Model.CreatedAt = DataView.CreatedAt;
//        Model.CreatedBy = DataView.CreatedBy;
//        Model.PeriodSalary = DataView.PeriodSalary;
//        Ajax.CallsyncSave({
//            type: "Get",
//            url: sys.apiUrl("TransMoney", "UpdateTransMoney"),
//            data: {
//                DataSend: JSON.stringify(Model)
//            },
//            success: (d) => {
//                let result = d as BaseResponse;
//                if (result.IsSuccess == true) {
//                    $('#Div_Header :Input').val('');
//                    $('#Txt_TrData').val(GetDate());
//                    $('#Back_Page').click();
//                    $("#Display_Back_Page").click();
//                    ShowMessage("Updated 🤞😉","تم التحديث بنجاح 🤞😉");
//                    Close_Loder();
//                } else {
//                }
//            }
//        });
//    }
//}
//# sourceMappingURL=EditVoucher.js.map