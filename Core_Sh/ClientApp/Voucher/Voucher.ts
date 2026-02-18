
//$(document).ready(() => {
//    Voucher.InitalizeComponent();

//});

//namespace Voucher {
//    var sys: SystemTools = new SystemTools();
//    var SysSession: SystemSession = GetSystemSession();

//    var btnFrom_ACC_CODE: HTMLButtonElement;
//    var btnTo_ACC_CODE: HTMLButtonElement;
//    var btnAdd: HTMLButtonElement;
//    var db_Type: HTMLSelectElement;
//    var Model: I_TransMoney = new I_TransMoney();
//    var db_TypeFin: HTMLSelectElement;
//    var _TypeTrans: Array<G_TypeTrans> = new Array<G_TypeTrans>();
//    var Res: SystemResources = GetGlopelResources();

//    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
//    var ACC_CODE_Custody = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody
//    var ACC_CODE_Loan = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan
//    export function InitalizeComponent() {
//         
//        if (!SysSession.CurrentEnvironment.GQ_USERS.IsRolePosted || SysSession.CurrentEnvironment.GQ_USERS.IsRolePosted == null) {
//            $('#IsPostDirectJournal').prop("checked", false)
//            $('#IsPostDirectJournal').attr("disabled", "disabled")
//        }


//        InitalizeControls();
//        InitializeEvents();
//        GetData_Type();
//        $('#Txt_TrData').val(GetDate());

//        Close_Loder();
//    }
//    function InitalizeControls() {
//        btnFrom_ACC_CODE = document.getElementById("btnFrom_ACC_CODE") as HTMLButtonElement;
//        btnTo_ACC_CODE = document.getElementById("btnTo_ACC_CODE") as HTMLButtonElement;
//        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
//        db_Type = document.getElementById("db_Type") as HTMLSelectElement;
//        db_TypeFin = document.getElementById("db_TypeFin") as HTMLSelectElement;
//    }
//    function InitializeEvents() {
//        btnTo_ACC_CODE.onclick = SearchToAcc;
//        btnFrom_ACC_CODE.onclick = SearchFromAcc;
//        btnAdd.onclick = Add_Reciept;
//        db_Type.onchange = db_Type_Change;
//    }
//    //****************************************************** Validtion and Clear *****************************************
 
     
//    function SearchToAcc() { 
//        let Con = ""


//        sys.FindKey("Account", "btnAcc", " COMP_CODE = " + CompCode + "  and DETAIL = 1 " + Con, () => {
    
//            let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
//            $('#btnTo_ACC_CODE').val(SelectedItem.ACC_CODE);
//            $('#Txt_To_ACC_DESCA').val(SelectedItem.ACC_DESCA);
//        });
//    }
//    function Add_Reciept() {
//        if ($('#Txt_Ref_No').val().trim() == "") {
//            Errorinput($('#Txt_Ref_No'), "Please Enter Ref No 🤨", "برجاء ادخال الرقم المرجعي 🤨");
//            return
//        }

//        if ($('#btnFrom_ACC_CODE').val() == "Search From Account") {
//            Errorinput($('#btnFrom_ACC_CODE'), "Please Select From Account 🤨", "برجاء اختيار الحاب المحول منه 🤨");
//            return
//        }

//        if ($('#btnTo_ACC_CODE').val() == "Search To Account") {
//            Errorinput($('#btnTo_ACC_CODE'), "Please Select To Account 🤨", "برجاء اختيار الحساب المحول اليه 🤨");
//            return
//        }
//        if (db_Type.value == "0" && $('#Txt_TransNO').val().trim() == "") {
//            Errorinput($('#Txt_TransNO'), "Please Enter Transfer No 🤨", "برجاء ادخال رقم التحويل 🤨");
//            return
//        }
//        if (Number($('#Txt_Amount').val()) == 0) {
//            Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨", "برجاء ادخال المبلغ 🤨");
//            return
//        }
//        if ($('#Txt_Remarks').val().trim() == '') {
//            Errorinput($('#Txt_Remarks'), "Please Enter Remarks 🤨", "برجاء ادخال الملاحظات 🤨");
//            return
//        } 

//        Model = new I_TransMoney();
//        Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
//        Model.BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
//        Model.RefNO = $('#Txt_Ref_No').val();
//        Model.TrDate = DateFormatddmmyyyy($('#Txt_TrData').val());
//        Model.TransferNo = $('#Txt_TransNO').val();
//        Model.Status = 1;
//        Model.Remark = $('#Txt_Remarks').val();


//        Model.USERID = SysSession.CurrentEnvironment.USERID;
//        Model.IDType = Number(db_TypeFin.value);
//        Model.Amount = Number($('#Txt_Amount').val());

//        Model.TrType = 0;


//         
      


//        Model.IDUserCreate = SysSession.CurrentEnvironment.ID;
//        //Model.CreatedAt = DateFormatddmmyyyy(GetDateAndTime());
//        //alert(GetDateAndTimeSql())
//        Model.CreatedAt =  GetDateAndTimeSql();
//        //alert("Done")

//        Model.CreatedBy = SysSession.CurrentEnvironment.NameUser;


//        Ajax.CallsyncSave({
//            type: "Get",
//            url: sys.apiUrl("TransMoney", "InsertTransMoneyVoucher"),
//            data: {
//                DataSend: JSON.stringify(Model)
//            },
//            success: (d) => {
//                let result = d as BaseResponse;
//                if (result.IsSuccess == true) {
//                    $('#Div_Header :Input').val('');
//                    $('#Txt_TrData').val(GetDate());
//                    ShowMessage("Done 🤞😉","تم الحفظ 🤞😉");
//                    $('#Back_Page').click();
//                    Close_Loder();
//                } else {

//                    ShowMessage("Error", "يوجد خطاء في الحفظ" ); 
//                    Close_Loder();

//                }
//            }
//        });




//    }



     


//}
