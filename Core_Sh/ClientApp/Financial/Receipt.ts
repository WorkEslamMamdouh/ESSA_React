
$(document).ready(() => {
	Receipt.InitalizeComponent();

});

namespace Receipt {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();

	var btnAdd: HTMLButtonElement;
	var db_Type: HTMLSelectElement;
	var Model: I_TR_FinancialTransactions = new I_TR_FinancialTransactions();
	var Card_Type: HTMLSelectElement;
	var Reciept_Type: HTMLSelectElement;
	var Txt_Amount: HTMLInputElement;
	var Txt_CardPrc: HTMLInputElement;
	var BeneficiaryName: HTMLInputElement;
	var InvoiceID: HTMLInputElement;
	var CustomerId: HTMLInputElement;
	var CustomerName: HTMLInputElement;
	var Txt_NetAmount: HTMLInputElement;
	var InvoiceNo: HTMLButtonElement
	var btnDelete_Filter: HTMLButtonElement


	var Remain: Array<I_TR_Sales> = new Array<I_TR_Sales>();
	var _TypeTrans: Array<I_TR_FinancialTransactions> = new Array<I_TR_FinancialTransactions>();
	var Res: SystemResources = GetGlopelResources();

	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	//var ACC_CODE_Custody = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Custody
	//var ACC_CODE_Loan = SysSession.CurrentEnvironment.I_Control.ACC_CODE_Loan

	var NameFunction = "Insert";
	var InvRemain = 0;
	var TransactionID = 0;
	var TrType = 0;
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
			debugger
			$('#Txt_TrData').val(data.TransactionDate)
			Reciept_Type.value = data.Type.toString();
			Reciept_Type_onchange()
			Card_Type.value = data.CashTypeID.toString()
			Txt_CardPrc.value = (((data.DueAmount - data.Amount) / data.Amount) * 100).toString();
			$('#Txt_Amount').val(data.Amount)
			Txt_NetAmount.value = data.DueAmount.toString();
			$('#Reason').val(data.Reason)
			$('#Txt_Remarks').val(data.Remarks)
			console.log(GetDateAndTimeSql());
			UpdateAt = GetDateAndTimeSql();
			UpdatedBy = data.UpdatedBy == "" ? SysSession.CurrentEnvironment.GQ_USERS.USER_NAME : data.UpdatedBy;
			BeneficiaryName.value = data.BeneficiaryName;
			InvoiceID.value = data.PurchaseID.toString();
			InvoiceNo.value = data.PurchaseID.toString();
			let search = $('option:selected', $("#Reciept_Type")).attr('data-Search')
			if (search == '3') {
				CustomerId.value = data.PurchaseID.toString();
				CustomerName.value = data.BeneficiaryName;
			}
			debugger

			TrType = data.TrType;

			if (data.PurchaseID != 0 && data.PurchaseID != null && search != '3') {
				BeneficiaryName.disabled = true;
				GetRemain(data.PurchaseID);
			}

			localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
		}
		Reciept_Type_onchange();

		$('#Txt_TrData').val(GetDate());
		Close_Loder();
	}
	function InitalizeControls() {

		btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
		db_Type = document.getElementById("db_Type") as HTMLSelectElement;
		Reciept_Type = document.getElementById("Reciept_Type") as HTMLSelectElement;
		Card_Type = document.getElementById("Card_Type") as HTMLSelectElement;
		InvoiceID = document.getElementById("InvoiceID") as HTMLInputElement;
		BeneficiaryName = document.getElementById("BeneficiaryName") as HTMLInputElement;
		Txt_CardPrc = document.getElementById("Txt_CardPrc") as HTMLInputElement;
		Txt_Amount = document.getElementById("Txt_Amount") as HTMLInputElement;
		Txt_NetAmount = document.getElementById("Txt_NetAmount") as HTMLInputElement;
		InvoiceNo = document.getElementById("InvoiceNo") as HTMLButtonElement;
		btnDelete_Filter = document.getElementById("btnDelete_Filter") as HTMLButtonElement;
		CustomerId = document.getElementById("CustomerId") as HTMLInputElement;
		CustomerName = document.getElementById("CustomerName") as HTMLInputElement;
	}
	function InitializeEvents() {
		btnAdd.onclick = Add_Reciept;
		Reciept_Type.onchange = Reciept_Type_onchange;
		Card_Type.onchange = Card_Type_onchange;
		InvoiceNo.onclick = SearchInvoices;
		CustomerName.onclick = SearchCustomer;
		Txt_Amount.onchange = Txt_Amount_onchange;
		btnDelete_Filter.onclick = btnDelete_Filter_onclick;
	}
	function btnDelete_Filter_onclick() {
		$('#InvoiceID').val(0);
		$('#InvoiceNo').val(Res.Lang == "Ar" ? "بحث عن فاتورة" : "Search Invoice");
		InvRemain = 0;
		BeneficiaryName.disabled = false;
		BeneficiaryName.value = "";
		Txt_Amount.value = "0";
		Card_Type_onchange();
		$('#btnDelete_Filter').addClass("display_none");
	}
	function SearchInvoices() {
		//sys.FindKey("Receipt", "InvoiceNo", "TrType = 0 and IsCash = 0 and Status = 1 and RemainAmount > 0 and CompCode = " + CompCode + " ", () => {
		//sys.FindKeySpeed("Invoices", " CompCode = " + CompCode + "  and Status = 1 and IsCash = false and RemainAmount != 0 and  TrType =  0 ", 'SearchForm', () => {
		sys.FindKeyPagination("Invoices", "InvoiceNo", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  0 and IsCash = 0  and RemainAmount <> 0 ", () => {
			let SelectedItem: I_TR_Sales = SelectDataSearch.DataRow;   
			//let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
			$('#InvoiceID').val(SelectedItem.SaleID);
			$('#InvoiceNo').val(SelectedItem.TrNo);
			BeneficiaryName.value = SelectedItem.CustomerName;
			InvRemain = SelectedItem.RemainAmount;
			Txt_Amount.value = InvRemain.toString();
			BeneficiaryName.disabled = true;
			Card_Type_onchange();
			$('#btnDelete_Filter').removeClass("display_none");

		});
	}
	function SearchCustomer() {
		//sys.FindKeySpeed("Customer", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', function () {
		sys.FindKeyPagination("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {

			let SelectedItem = SelectDataSearch.DataRow
			//let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
			CustomerId.value = SelectedItem.CustomerId;
			CustomerName.value = SelectedItem.NAMEA
			BeneficiaryName.value = SelectedItem.NAMEA;
			BeneficiaryName.disabled = true;
			Card_Type_onchange();
			$('#btnDelete_Filter').removeClass("display_none");

		});

	}
	function Reciept_Type_onchange() {
		$('#btnDelete_Filter').addClass("display_none");
		InvRemain = 0;
		InvoiceID.value = "";
		BeneficiaryName.value = "";
		BeneficiaryName.disabled = false;
		InvoiceNo.value = Res.Lang == "Ar" ? "بحث عن فاتورة" : "Search Invoice";

		let search = $('option:selected', $("#Reciept_Type")).attr('data-Search')
		if (search == "1") {
			$('.divInvoice').removeClass("display_none");
			$('.divCustomer').addClass("display_none");

		} else if (search == "3") {
			$('.divInvoice').addClass("display_none");
			$('.divCustomer').removeClass("display_none");

		} else {
			$('.divCustomer').addClass("display_none");
			$('.divInvoice').addClass("display_none");
		}
	}

	function Card_Type_onchange() {
		Txt_CardPrc.value = $('option:selected', $("#Card_Type")).attr('data-prc');
		Txt_NetAmount.value = ((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())).toString();
		 
	}
	function Txt_Amount_onchange() {

		if (Number($('#Txt_Amount').val()) > InvRemain && Reciept_Type.value == 'null' && (InvoiceID.value.trim() != '' && InvoiceID.value.trim() != '0')) {
			Errorinput($('#Txt_Amount'), "😒The receipt amount is enough for the invoice.", " 😒مبلغ الاستلام اكبر من المبلغ المتبقي للفاتورة")
			$('#Txt_Amount').val(InvRemain);
		}
		Card_Type_onchange();
	}
	function GetReceiptType() {
		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'D_A_FinancialType', Condition: "TrType = 0 and IsActive = 1 and CompCode =" + CompCode + "" },
				{ NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },
			]
		DataResult(Table);
		let cat = GetDataTable('D_A_FinancialType');
		let CardType = GetDataTable('D_A_CashTypes');
		FillDropwithAttr(cat, "Reciept_Type", "FinancialTypeID", (Res.Lang == "Ar" ? "DescAr" : "DescEn"), "No", "Search", "SearchTypes");
		FillDropwithAttr(CardType, "Card_Type", "CashTypeID", (Res.Lang == "Ar" ? "Description" : "Description"), "No", "prc", "ChargePrc");

	}
	function GetRemain(PurchaseID: number) {
		debugger
		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'I_TR_Sales', Condition: "SaleID = " + PurchaseID + "" },
			]
		DataResult(Table);
		Remain = GetDataTable('I_TR_Sales');
		InvRemain = Remain[0].RemainAmount;
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

		if ($('.divInvoice').is(":hidden") == false) {


			if ($('#Reciept_Type').prop("selectedIndex") == 0 && (InvoiceID.value.trim() == '' || InvoiceID.value.trim() == '0')) {
				Errorinput($('#InvoiceNo'), "Please Choose Purchase Invoice🤨", "برجاء اختيار الفاتورة 🤨");
				return
			}

			if (Number($('#Txt_Amount').val()) > InvRemain) {
				Errorinput($('#Txt_Amount'), "The amount remaining to be paid [ " + InvRemain + " ] cannot exceed the amount 😒", "المبلغ المتبقي للسداد [ " + InvRemain + " ]  لا يمكن ان تتعدي المبلغ 😒");
				return
			}


		}
		if ($('.divCustomer').is(":hidden") == false) {
			if (CustomerId.value.trim() == '0') {
				Errorinput($('#CustomerName'), "Please Choose Customer🤨", "برجاء اختيار hgudg 🤨");
				return
			}
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
		Model.TrType = TrType;
		Model.Type = Reciept_Type.value == 'null' ? null : Number(Reciept_Type.value);
		Model.TransactionDate = DateFormatddmmyyyy($('#Txt_TrData').val());
		Model.Reason = $('#Reason').val();
		Model.Remarks = $('#Txt_Remarks').val();
		Model.CreatedAt = GetDateAndTimeSql();
		Model.CreatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME.toString();
		Model.PurchaseID = Number(InvoiceID.value);
		Model.UpdatedAt = UpdateAt;
		Model.UpdatedBy = UpdatedBy;
		Model.CompCode = CompCode;
		let search = $('option:selected', $("#Reciept_Type")).attr('data-Search')
		if (search == '3') {
			Model.PurchaseID = Number(CustomerId.value);
		}
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
