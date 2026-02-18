
$(document).ready(() => {
	Partners.InitalizeComponent();

});

namespace Partners {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	//GetPrivilegesByModuleCode(GetModuleCode());
	var btnAdd: HTMLButtonElement;
	var db_Type: HTMLSelectElement;
	var Model: I_TR_FinancialTransactions = new I_TR_FinancialTransactions();
	var VoucherType: HTMLSelectElement;
	var Card_Type: HTMLSelectElement;
	var Reciept_Type: HTMLSelectElement;
	var Txt_Amount: HTMLInputElement;
	var Txt_CardPrc: HTMLInputElement;
	var BeneficiaryName: HTMLInputElement;		  
	var Txt_NetAmount: HTMLInputElement;	       


	 
	var Res: SystemResources = GetGlopelResources();

	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);					   
	var NameFunction = "Insert";
	var InvRemain = 0;
	var TransactionID = 0;	   
	var Status = 1;
	var UpdateAt = "";
	var UpdatedBy = "";
	export function InitalizeComponent() {

		InitalizeControls();
		InitializeEvents();
		GetReceiptType();	  
		if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
			NameFunction = "Update"
			let data: I_TR_FinancialTransactions = GetModelGlopel();
			$('#TrNo').val(data.TrNo)
			$('#RefNo').val(data.RefNo)
			TransactionID = data.TransactionID;
			Status = data.Status;
			$('#Txt_TrData').val(data.TransactionDate)	   
			Card_Type.value = data.CashTypeID.toString()
 			Txt_CardPrc.value = (((data.DueAmount - data.Amount) / data.Amount) * 100).toString();
			$('#Txt_Amount').val(data.Amount)
			Txt_NetAmount.value = data.DueAmount.toString();
			$('#Reason').val(data.Reason)
			$('#Txt_Remarks').val(data.Remarks)	 
			UpdateAt = GetDateAndTimeSql();
			UpdatedBy = data.UpdatedBy == "" ? SysSession.CurrentEnvironment.GQ_USERS.USER_NAME : data.UpdatedBy;
			BeneficiaryName.value = data.BeneficiaryName;	  
			VoucherType.value = data.TrType.toString();
			   

			localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
		}						   
		$('#Txt_TrData').val(GetDate());
		Close_Loder();
	}
	function InitalizeControls() {

		btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
		db_Type = document.getElementById("db_Type") as HTMLSelectElement;
		Reciept_Type = document.getElementById("Reciept_Type") as HTMLSelectElement;
		VoucherType = document.getElementById("VoucherType") as HTMLSelectElement;
		Card_Type = document.getElementById("Card_Type") as HTMLSelectElement;
 		BeneficiaryName = document.getElementById("BeneficiaryName") as HTMLInputElement;
		Txt_CardPrc = document.getElementById("Txt_CardPrc") as HTMLInputElement;
		Txt_Amount = document.getElementById("Txt_Amount") as HTMLInputElement;
		Txt_NetAmount = document.getElementById("Txt_NetAmount") as HTMLInputElement;	   
	}
	function InitializeEvents() {
		btnAdd.onclick = Add_Reciept;						  
		Card_Type.onchange = Card_Type_onchange;	  			  
		Txt_Amount.onchange = Card_Type_onchange;	  			  
	}				 
	function Card_Type_onchange() {
		Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-prc');
		Txt_NetAmount.value = ((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())).toString();


	}			  
	function GetReceiptType() {
		var Table: Array<Table>;
		Table =
			[
 				{ NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },
			]
		DataResult(Table);
 		let CardType = GetDataTable('D_A_CashTypes');
 		FillDropwithAttr(CardType, "Card_Type", "CashTypeID", (Res.Lang == "Ar" ? "Description" : "Description"), "No", "prc", "ChargePrc");

	}	    
	function Add_Reciept() {
		if (!SysSession.CurrentPrivileges.CREATE) {
			ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒")
			return
		}
		if ($('#RefNo').val().trim() == '') {
			Errorinput($('#RefNo'), "Please Enter RefNo 🤨", "برجاء ادخال المرجع 🤨");
			return
		}
		if ($('#Txt_TrData').val().trim() == '') {
			Errorinput($('#Txt_TrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
			return
		}
		if ($('#BeneficiaryName').val().trim() == "") {
			Errorinput($('#BeneficiaryName'), "Please Enter Beneficiary Name 🤨", "برجاء ادخال اسم المستفيد 🤨");
			return
		}
		if ($('#db_Type').val() == '-1') {
			Errorinput($('#db_Type'), "Please Enter TrType 🤨", "برجاء ادخال نوع الحركة 🤨");
			return
		}	    
		if (Number($('#Txt_Amount').val()) == 0) {
			Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨", "برجاء ادخال المبلغ 🤨");
			return
		}	   
		if ($('#Reason').val() == "") {
			Errorinput($('#Reason'), "Please Enter Reason For payment 🤨", "برجاء ادخال سبب الصرف 🤨");
			return
		}
		if ($('#Txt_Remarks').val() == "") {
			Errorinput($('#Txt_Remarks'), "Please Enter Remarks 🤨", "برجاء ادخال الملاحظات 🤨");
			return
		}

		Model = new I_TR_FinancialTransactions();
		Model.TransactionID = TransactionID;
		Model.TrNo = Number($('#TrNo').val());
		Model.RefNo = ($('#RefNo').val());
		Model.Amount = Number($('#Txt_Amount').val());
		Model.IsCash = true;
		Model.DueAmount = Number(Txt_NetAmount.value);
		Model.BeneficiaryName = BeneficiaryName.value;
		Model.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
		Model.Status = 0;
		Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
		Model.CashTypeID = Number(Card_Type.value);
		Model.TrType = Number(VoucherType.value);
		Model.Type = Number(VoucherType.value) == 0 ? 1000 : 1001;
		Model.TransactionDate = DateFormatddmmyyyy($('#Txt_TrData').val());
		Model.Reason = $('#Reason').val();
		Model.Remarks = $('#Txt_Remarks').val();
		Model.CreatedAt = GetDateAndTimeSql();
		Model.CreatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME.toString();
		Model.PurchaseID = null;
		Model.UpdatedAt = UpdateAt;
		Model.UpdatedBy = UpdatedBy;
		Model.CompCode = CompCode;		  
		Ajax.CallsyncSave({
			type: "Post",
			url: sys.apiUrl("Receipt", NameFunction),
			data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess == true) {
					Close_Loder();
					ShowMessage("Done 🤞😉", "تم الحفظ 🤞😉");
					$('#Back_Page').click();
					$("#Display_Back_Page").click();
				} else {
					ShowMessage("Error", "يوجد خطاء في الحفظ");
					Close_Loder();
				}
			}
		});
	}
}
