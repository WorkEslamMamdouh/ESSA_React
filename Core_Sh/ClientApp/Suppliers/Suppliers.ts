 
$(document).ready(() => {
	Suppliers.InitalizeComponent();

});

namespace Suppliers {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();

	var btnAdd: HTMLButtonElement;
	var db_Type: HTMLSelectElement;
	var Model: D_A_Suppliers = new D_A_Suppliers();
	var Card_Type: HTMLSelectElement;
	var Supplier_Type: HTMLSelectElement;
	var Txt_Amount: HTMLInputElement;
	var Txt_CardPrc: HTMLInputElement;
	var InvoiceID: HTMLInputElement;
	var Txt_NetAmount: HTMLInputElement;
	var VatNo: HTMLInputElement;
	var InvoiceNo: HTMLButtonElement

	var AutoCode = SysSession.CurrentEnvironment.I_Control.AutoCode;

	var _TypeTrans: Array<D_A_Suppliers> = new Array<D_A_Suppliers>();
	var Res: SystemResources = GetGlopelResources();
	var SupplierCODE: HTMLInputElement;
	var TextSupplierID: HTMLInputElement;

	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	//var ACC_CODE_Custody = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody
	//var ACC_CODE_Loan = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan

	var NameFunction = "Insert";
	var InvRemain = 0;
	var SupplierID = 0;
	var TrType = 0;
	var Status = true;
	var AccountNo = "";
	var UpdateAt = "";
	var UpdatedBy = "";
	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();

		$('#Supp_SupplierCODE').val("0"); 

		AccountNo = ''
		if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
			let data: D_A_Suppliers = GetModelGlopel();
			SupplierID = data.SupplierID;
			Status = data.ISActive;
			AccountNo = data.AccountNo;
			$('#Supp_SupplierID').attr('disabled', 'disabled');		   
			$('#Supp_SupplierCODE').val(data.SuppliersCode); 
			$('#Supp_TextSupplierID').val(data.SupplierID); 
			$('#Supp_SupplierName').val(data.SupplierName); 
			$('#Supp_IsCash').val(data.IsCash == true ? '1' : '0'); 
			$('#Supp_Mobile').val(data.Mobile);
			$('#Supp_Remarks').val(data.Remarks);
			NameFunction = "Update"
			localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
		}
		if (!AutoCode) {
			$('#Supp_SupplierCODE').removeAttr("disabled");

		} else {
			$('#Supp_SupplierCODE').attr("disabled", "disabled");

		}	
		Close_Loder();
	}
 
	function InitalizeControls() {
		SupplierCODE = document.getElementById('Supp_SupplierCODE') as HTMLInputElement;
		TextSupplierID = document.getElementById('Supp_TextSupplierID') as HTMLInputElement;
		btnAdd = document.getElementById("Supp_btnAdd") as HTMLButtonElement;
	}
	function InitializeEvents() { 

		btnAdd.onclick = Add_Supplier;
		SupplierCODE.onchange = checkDuplicatedCode;
	}
	function checkDuplicatedCode() {
		let SupplierCode = SupplierCODE.value;
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("Suppliers", 'checkDuplicatedCode'),
			data: { CompCode: CompCode, SupplierID: SupplierID, SupplierCode: SupplierCode },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess == true) {
					let res = result.Response;
					if (res > 0) {
						Errorinput($('#Supp_SupplierCODE'), "The supplier code is already registered for another supplier. 😁", "😁 .كود المورد مسجل مسبقا لمورد اخر")
						SupplierCODE.value = "";
					}
				} else {

				}
			}
		});
	}
	function Add_Supplier() {

		if (!SysSession.CurrentPrivileges.CREATE) {
			ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒")
			return
		}

		if ($('#Supp_SupplierCODE').val().trim() == '' && AutoCode == false) {
			Errorinput($('#Supp_SupplierCODE'), "Please Enter name of Supplier 🤨", "برجاء ادخال كود المورد 🤨");
			return
		}
  		if ($('#Supp_SupplierName').val().trim() == '') {
			Errorinput($('#Supp_SupplierName'), "Please Enter name of Supplier 🤨", "برجاء ادخال اسم المورد 🤨");
			return
		}
  
		 
		Model = new D_A_Suppliers();
		 
		Model.SupplierID = SupplierID;
		Model.SuppliersCode = ($('#Supp_SupplierCODE').val());
		Model.SupplierName = ($('#Supp_SupplierName').val());
		Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode); 
		Model.Mobile = ($('#Supp_Mobile').val());
		Model.Remarks = ($('#Supp_Remarks').val());
		Model.ISActive = true;
		Model.IsCash = $('#Supp_IsCash').val() == "1" ? true : false;
		Model.CompCode = CompCode;
		Model.AccountNo = AccountNo;

		 
		Ajax.CallsyncSave({
			type: "Post",
			url: sys.apiUrl("Suppliers", NameFunction),
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
}
