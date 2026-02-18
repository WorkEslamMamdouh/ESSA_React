
$(document).ready(() => {
    COMPANY.InitalizeComponent();

});

namespace COMPANY {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();

    var btnAdd: HTMLButtonElement;
    var db_Type: HTMLSelectElement;
    var Model: G_COMPANY = new G_COMPANY();
    var Card_Type: HTMLSelectElement;
    var Customer_Type: HTMLSelectElement;
    var Txt_Amount: HTMLInputElement;
    var Txt_CardPrc: HTMLInputElement;
    var InvoiceID: HTMLInputElement;
    var Txt_NetAmount: HTMLInputElement;
    var VatNo: HTMLInputElement;
    var InvoiceNo: HTMLButtonElement


    var _TypeTrans: Array<G_COMPANY> = new Array<G_COMPANY>();
    var Res: SystemResources = GetGlopelResources();
    var COMP_CODE: HTMLInputElement;

    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    //var ACC_CODE_Custody = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody
    //var ACC_CODE_Loan = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan

    var NameFunction = "Insert";
    var InvRemain = 0; 
    var TrType = 0;
    var Status = true;
    var UpdateAt = "";
    var UpdatedBy = "";
    export function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            let data: G_COMPANY = GetModelGlopel();
            Status = data.IsActive;
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
            NameFunction = "Update"
            localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
        }
        Close_Loder();
    }
    function InitalizeControls() {
        COMP_CODE = document.getElementById('COMP_CODE') as HTMLInputElement;
        VatNo = document.getElementById('VatNo') as HTMLInputElement;
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
    }
    function InitializeEvents() {

        btnAdd.onclick = Add_COMPANY;
    }
    function Add_COMPANY() {

        if ($('#NameA').val().trim() == '') {
            Errorinput($('#NameA'), "Please Enter NameA 🤨", "برجاء ادخال اسم 🤨");
            return
        }
        if ($('#NameE').val().trim() == '') {
            Errorinput($('#NameE'), "Please Enter NameE 🤨", "برجاء ادخال اسم 🤨");
            return
        }

        if ($('#NationalityID').val().trim() == '') {
            Errorinput($('#NationalityID'), "Please Enter the NationalityID 🤨", "برجاء ادخال رقم NationalityID 🤨");
            return
        }
        if ($('#Currencyid').val().trim() == '') {
            Errorinput($('#Currencyid'), "Please Enter the Currencyid 🤨", "برجاء ادخال رقم Currencyid 🤨");
            return
        }




        if ($('#VatNo').val().trim() == '') {
            Errorinput($('#VatNo'), "Please Enter Vat No 🤨", "برجاء ادخال الرقم الضريبي 🤨");
            return
        }

        if (VatNo.value.length != 15) {
            Errorinput($('#VatNo'), "The vat number must be 15 digits.🤨", "يجب ان يتكون الرقم الضريبي من ١٥ رقم 🤨");
            return
        }

        if ($('#Address_District').val().trim() == '') {
            Errorinput($('#Address_District'), "The Address District must be entered.🤨", "يجب إدخال الحي .🤨");
            return
        }

        if ($('#Address_Postal').val().trim() == '') {
            Errorinput($('#Address_Postal'), "The Address postal must be entered.🤨", "يجب إدخال الرقم البريدي  .🤨");
            return
        }

        if ($('#Address_City').val().trim() == '') {
            Errorinput($('#Address_City'), "The Address city must be entered.🤨", "يجب إدخال المدينة  .🤨");
            return
        }

        if ($('#Address_Province').val().trim() == '') {
            Errorinput($('#Address_Province'), "The Address Province must be entered.🤨", "يجب إدخال الحافظة  .🤨");
            return
        }

        if ($('#Address_Street').val().trim() == '') {
            Errorinput($('#Address_Street'), "The Address Street must be entered.🤨", "يجب إدخال الشارع  .🤨");
            return
        }

        if ($('#Address_BuildingNo').val().trim() == '') {
            Errorinput($('#Address_BuildingNo'), "The Address BuildingNo must be entered.🤨", "يجب إدخال رقم المبني .🤨");
            return
        }

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
            url: sys.apiUrl("G_COMPANY", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    $('#Div_Header :Input').val('');
                    $('#Txt_TrData').val(GetDate());
                    ShowMessage("Done 🤞😉", "تم الحفظ 🤞😉");
                    $("#Display_Back_Page").click();
                    $('#Back_Page').click();
                    Close_Loder();
                } else {
                    ShowMessage("Error", "يوجد خطاء في الحفظ");
                    Close_Loder();
                }
            }
        });
    }

    function checkDuplicatedCode() {
        let CustCode = COMP_CODE.value;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", 'checkDuplicatedCOMP_CODE'),
            data: {COMP_CODE: COMP_CODE },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    let res = result.Response;
                    if (res > 0) {
                        Errorinput($('#COMP_CODE'), "The COMP_CODE code is already registered for another COMP_CODE. 😁", "😁 .كود الشركة مسجل مسبقا لشركة اخره")
                        COMP_CODE.value = "";
                    }
                } else {

                }
            }
        });
    }
}
