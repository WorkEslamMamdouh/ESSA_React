
$(document).ready(() => {
	Customer.InitalizeComponent();

});

namespace Customer {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();

	var btnAdd: HTMLButtonElement;
	var db_Type: HTMLSelectElement;
	var Model: D_Customer = new D_Customer();
	var Card_Type: HTMLSelectElement;
	var Customer_Type: HTMLSelectElement;
	var Txt_Amount: HTMLInputElement;
	var Txt_CardPrc: HTMLInputElement;
	var InvoiceID: HTMLInputElement;
	var Txt_NetAmount: HTMLInputElement;
	var VatNo: HTMLInputElement;
	var InvoiceNo: HTMLButtonElement    
	var SalesList: Array<I_TR_Sales> = new Array<I_TR_Sales>();
	var _TypeTrans: Array<D_Customer> = new Array<D_Customer>();
	var Res: SystemResources = GetGlopelResources();
	var CustomerCODE: HTMLInputElement;
	var Cust_Open_Balance: HTMLInputElement;
	var Open_BalanceDate: HTMLInputElement;
	var Cust_Credit: HTMLInputElement;
	var Cust_Debit: HTMLInputElement;
	var Cust_Balance: HTMLInputElement;
	var AutoCode = SysSession.CurrentEnvironment.I_Control.AutoCode;

	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	//var ACC_CODE_Custody = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody
	//var ACC_CODE_Loan = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan

	var NameFunction = "Insert";
	var InvRemain = 0;
	var CustomerID = 0;
	var AccountNo = '';
	var TrType = 0;
	var Status = true;
	var UpdateAt = "";
	var UpdatedBy = "";
	var OldCus_ISPersonal = 0;
	var Is_CarCenter = SysSession.CurrentEnvironment.I_Control.Is_CarCenter;
	var TaxLinked = SysSession.CurrentEnvironment.I_Control.TaxLinked;
	var TaxLinkedEG = SysSession.CurrentEnvironment.I_Control.TaxLinkedEG;

	export function InitalizeComponent() {

		if (Is_CarCenter) {
			$('._CenterCar').removeClass('display_none')
			$('._CenterCarNot').addClass('display_none')
		}
        else {
			$('._CenterCar').addClass('display_none')

		}


		if (!TaxLinked) {
			$('._CenterCarNot').addClass('display_none')

		}

		if (SysSession.CurrentEnvironment.I_Control.TaxLinkedEG == true) {
			$('.TaxCode').removeClass("display_none");
			//$('#divTaxEG').removeClass("display_none");

			GetNationality()

		} else {

			$('.TaxCode').addClass("display_none");
			//$('#divTaxEG').addClass("display_none");
		}


		$('#Cus_ISPersonal').val("1");


		InitalizeControls();
		InitializeEvents();

		AccountNo = '';

		if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
			let data: D_Customer = GetModelGlopel();
			CustomerID = data.CustomerId;
			Status = data.Isactive;
			AccountNo = data.AccountNo;	   
 			$('#Cust_CustomerCODE').val(data.CustomerCODE);
			$('#Cust_NAMEA').val(data.NAMEA);
			$('#Cust_MOBILE').val(data.MOBILE);
			$('#IsCreditCustomer').val(data.IsCreditCustomer == true ? '1' : '0');
			$('#Cus_ISPersonal').val(data.ISPersonal == true ? '1' : '0');
			OldCus_ISPersonal = data.ISPersonal == true ? 1 : 0;
			$('#Cust_VatNo').val(data.VatNo);
			$('#Cust_Address_District').val(data.Address_District);
			$('#Cust_Address_postal').val(data.Address_postal);
			$('#Cust_Address_City').val(data.Address_City);
			$('#Cust_Address_Province').val(data.Address_Province);
			$('#Cust_Address_Street').val(data.Address_Street);
			$('#Cust_Address_BuildingNo').val(data.Address_BuildingNo);
			$('#Cust_Address_Str_Additional').val(data.Address_Str_Additional);
			$('#Cust_Address_Build_Additional').val(data.Address_Build_Additional);
			Cust_Open_Balance.value = (Number(data.PreviousDebit == null ? 0 : data.PreviousDebit) - Number(data.PreviousCredit == null ? 0 : data.PreviousCredit)).toFixed(2);	 
			Open_BalanceDate.value = data.OpenbalanceAt == null ? "" : DateFormat(data.OpenbalanceAt);
			Cust_Credit.value = data.Credit == null ? "0" : data.Credit.toFixed(2);	 
			Cust_Debit.value = data.Debit == null ? "0" : data.Debit.toFixed(2);	 	 		 
			Cust_Balance.value = ((Number(data.PreviousDebit) + Number(data.Debit)) - (Number(data.PreviousCredit) + Number(data.Credit))).toFixed(2);	    
			$('#Cust_CarBrand').val(data.CarBrand);
			$('#Cust_CarNo').val(data.CarNo);
			$('#Cust_DestructionKm').val(data.DestructionKm);
			$('#Cust_DrivingNum').val(data.DrivingNum);
			$('#Cust_Remarks').val(data.REMARKS);
			$('#NationalityID').val(data.NationalityID);
			$('#Address_Floor').val(data.Address_Floor);
			$('#Address_Room').val(data.Address_Room);


			NameFunction = "Update"
			localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
		} else {
			Cust_Open_Balance.value = "0";
			Cust_Credit.value = "0";
			Cust_Debit.value = "0";
			Cust_Balance.value = "0";
			Open_BalanceDate.value = DateFormat(GetDate());
	 
		}				   
		if (!AutoCode) {
			$('#Cust_CustomerCODE').removeAttr("disabled");

		} else {
			$('#Cust_CustomerCODE').attr("disabled", "disabled");

		}	
		Close_Loder();
	}
	function checkDuplicatedCode() {
		let CustCode = CustomerCODE.value;
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("Customer", 'checkDuplicatedCode'),
			data: { CompCode: CompCode, CustomerId: CustomerID, CustomerCode: CustCode },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess == true) {
					let res = result.Response;
					if (res > 0) {
						Errorinput($('#Cust_CustomerCODE'), "The customer code is already registered for another customer. 😁", "😁 .كود العميل مسجل مسبقا لعميل اخر")
						CustomerCODE.value = "";
					}
				} else {

				}
			}
		});
	}

	function GetNationality() {
		debugger
		let Data=GetDataFrom("D_G_Nationality","");
		FillDropwithAttr(Data, "NationalityID", "NationalityID", (Res.Lang == "Ar" ? "DescA" : "DescL"), "No", "", "");
		
	}
	function InitalizeControls() {
		CustomerCODE = document.getElementById('Cust_CustomerCODE') as HTMLInputElement;
		VatNo = document.getElementById('Cust_VatNo') as HTMLInputElement;
		Cust_Open_Balance = document.getElementById('Cust_Open_Balance') as  HTMLInputElement;
		Open_BalanceDate = document.getElementById('Open_BalanceDate') as  HTMLInputElement;
		Cust_Credit = document.getElementById('Cust_Credit') as  HTMLInputElement;
		Cust_Debit = document.getElementById('Cust_Debit') as  HTMLInputElement;
		Cust_Balance = document.getElementById('Cust_Balance') as  HTMLInputElement;
		btnAdd = document.getElementById("Cust_btnAdd") as HTMLButtonElement;
	}
	function InitializeEvents() {
		CustomerCODE.onchange = checkDuplicatedCode;		   
		btnAdd.onclick = Add_Customer;
	}
	function Add_Customer() {
		if ($('#Cust_CustomerCODE').val().trim() == '' && AutoCode == false) {
			Errorinput($('#Cust_CustomerCODE'), "Please Enter customer Code 🤨", "برجاء ادخال كود العميل 🤨");
			return
		}			  
		if (!SysSession.CurrentPrivileges.CREATE) {
			ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒")
			return
		}
		debugger
		if ($('#Cust_NAMEA').val().trim() == '') {
			Errorinput($('#Cust_NAMEA'), "Please Enter name of customer 🤨", "برجاء ادخال اسم العميل 🤨");
			return
		}

		if (Is_CarCenter == true &&$('#Cust_MOBILE').val().trim() == '') {
			Errorinput($('#Cust_MOBILE'), "Please Enter the mobile 🤨", "برجاء ادخال رقم الجوال 🤨");
			return
		}



		if (Is_CarCenter) {
			let Data = GetDataFrom("D_Customer", " CarNo = N'" + $('#Cust_CarNo').val().trim() + "'  and  CustomerId <>  " + Number(CustomerID));
			if (Data.length > 0) {
				Errorinput($('#Cust_CarNo'), "Unfortunately, there is no work data on this   Car Brand 🤨", "للاسف يوجد بيانات العمل علي هذا رقم العربيه  🤨");
				return
			}
		}

		


		if ($('#Cus_ISPersonal').val() == '0') {

			if ($('#Cust_VatNo').val().trim() == '') {
				Errorinput($('#Cust_VatNo'), "Please Enter Vat No 🤨", "برجاء ادخال الرقم الضريبي 🤨");
				return
			}


			if (TaxLinked == true && VatNo.value.length != 15) {
				Errorinput($('#Cust_VatNo'), "The vat number must be 15 digits.🤨", "يجب ان يتكون الرقم الضريبي من ١٥ رقم 🤨");
				return
			}

			if (TaxLinkedEG == true && VatNo.value.length != 9) {
				Errorinput($('#Cust_VatNo'), "The vat number must be 9 digits.🤨", "يجب ان يتكون الرقم الضريبي من 9 رقم 🤨");
				return
			}


			if ($('#Cust_Address_District').val().trim() == '') {
				Errorinput($('#Cust_Address_District'), "The Address District must be entered.🤨", "يجب إدخال الحي .🤨");
				return
			}

			if ($('#Cust_Address_postal').val().trim() == '') {
				Errorinput($('#Cust_Address_postal'), "The Address postal must be entered.🤨", "يجب إدخال الرقم البريدي  .🤨");
				return
			} 
			 
			if (TaxLinked == true && $('#Cust_Address_postal').val().length != 5) {
				Errorinput($('#Cust_Address_postal'), "The Postal number must be 5 digits.🤨", "يجب ان يتكون الرقم البريدي من ٥ رقم 🤨");
				return
			}

			if ($('#Cust_Address_City').val().trim() == '') {
				Errorinput($('#Cust_Address_City'), "The Address city must be entered.🤨", "يجب إدخال المدينة  .🤨");
				return
			}

			if ($('#Cust_Address_Province').val().trim() == '') {
				Errorinput($('#Cust_Address_Province'), "The Address Province must be entered.🤨", "يجب إدخال الحافظة  .🤨");
				return
			}

			if ($('#Cust_Address_Street').val().trim() == '') {
				Errorinput($('#Cust_Address_Street'), "The Address Street must be entered.🤨", "يجب إدخال الشارع  .🤨");
				return
			}

			if ($('#Cust_Address_BuildingNo').val().trim() == '') {
				Errorinput($('#Cust_Address_BuildingNo'), "The Address BuildingNo must be entered.🤨", "يجب إدخال رقم المبني .🤨");
				return
			}
		}
		if (!CheckCustomerPersonal(Number($('#Cus_ISPersonal').val()), CustomerID) && NameFunction != "Insert") {
			let msgAr = $('#Cus_ISPersonal').val() == "1" ? "هذا العميل نوعه شخصي وتم اصدار فواتير عليه لا يمكنك تغيير نوعه" : "هذا العميل نوعه شركة وتم اصدار فواتير عليه لا يمكنك تغيير نوعه"
			let msgEn = $('#Cus_ISPersonal').val() == "1" ? "This customer is a personal type and has been invoiced. You cannot change its type." : "This customer is a company and invoices have been issued to him. You cannot change his type."
			Errorinput($('#Cus_ISPersonal'), msgEn, msgAr);
			return
		}
		Model = new D_Customer();
		Model.CustomerId = CustomerID;
		Model.CustomerCODE = ($('#Cust_CustomerCODE').val());
		Model.NAMEA = ($('#Cust_NAMEA').val());
		Model.MOBILE = ($('#Cust_MOBILE').val());
		Model.IsCreditCustomer = $('#IsCreditCustomer').val() == "1" ? true : false;
		Model.ISPersonal = $('#Cus_ISPersonal').val() == "1" ? true : false;
		Model.VatNo = ($('#Cust_VatNo').val());
		Model.Address_District = ($('#Cust_Address_District').val());
		Model.Address_postal = ($('#Cust_Address_postal').val());
		Model.Address_City = ($('#Cust_Address_City').val());
		Model.Address_Province = ($('#Cust_Address_Province').val());
		Model.Address_Street = ($('#Cust_Address_Street').val());
		Model.Address_BuildingNo = ($('#Cust_Address_BuildingNo').val());
		Model.Address_Str_Additional = ($('#Cust_Address_Str_Additional').val());
		Model.Address_Build_Additional = ($('#Cust_Address_Build_Additional').val());
		Model.NationalityID = ($('#NationalityID').val());
		Model.Address_Floor = ($('#Address_Floor').val());
		Model.Address_Room = ($('#Address_Room').val());
		Model.Address_LandMarks = "";  
		Model.CarBrand = ($('#Cust_CarBrand').val());
		Model.CarNo = ($('#Cust_CarNo').val());
		Model.DestructionKm = ($('#Cust_DestructionKm').val());
		Model.DrivingNum = ($('#Cust_DrivingNum').val());
		Model.REMARKS = ($('#Cust_Remarks').val());
		Model.AccountNo = AccountNo;



		Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
		Model.Isactive = true;

		Ajax.CallsyncSave({
			type: "Post",
			url: sys.apiUrl("Customer", NameFunction),
			data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess == true) {
					$('#Div_Header :Input').val('');
					//$('#Txt_TrData').val(GetDate());
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
	function CheckCustomerPersonal(Cus_ISPersonal: number, CusromerID: number): boolean {
		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'I_TR_Sales', Condition: " CustomerID = " + CusromerID + " and CompCode = " + CompCode + "" },

			]
		DataResult(Table);
		SalesList = GetDataTable('I_TR_Sales');
		if (SalesList.length > 0 && Cus_ISPersonal != OldCus_ISPersonal) {
			return false;
		} else {
			return true;
		}
	}
}
