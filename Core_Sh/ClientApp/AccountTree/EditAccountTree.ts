
$(document).ready(() => {
	EditAccountTree.InitalizeComponent();

});



namespace EditAccountTree {
	var CompCode;
	var BranchCode;
	var FinYear;
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();

	var AccountDetail: AQ_A_Account = new AQ_A_Account();

	var btnAdd: HTMLButtonElement;
	var btnDelete: HTMLButtonElement;
	var btnsave: HTMLButtonElement;
	var btnback: HTMLButtonElement;
	var btnRefrash: HTMLButtonElement;

	var Acc_Parent: HTMLInputElement;
	var txt_ACC_CODE: HTMLInputElement;
	var txt_NAME_A: HTMLInputElement;
	var txt_NAME_E: HTMLInputElement;
	var txt_Type: HTMLSelectElement;
	var txt_CreditLimit: HTMLInputElement;
	var txt_note: HTMLInputElement;
	var txt_Debit: HTMLInputElement;
	var txt_DebitFC: HTMLInputElement;
	var txtACC_GROUP: HTMLInputElement;
	var txt_balance: HTMLInputElement;
	var txt_level: HTMLInputElement;
	var chkeck_active: HTMLInputElement;
	var chkeck_Detailed: HTMLInputElement;
	var txtSearch: HTMLInputElement;
	var CREATED_BY = "";
	var CREATED_AT = "";

	var AccountCode = "";
	var AddMod = true;
	var FalgClick = 0;
	var Falgdblclick = 0;
	var DeleteCode = 0;
	var Res: SystemResources = GetGlopelResources();

	CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
	FinYear = Number(sys.SysSession.CurrentEnvironment.CurrentYear);
	export function InitalizeComponent() {
		AccountDetail = new AQ_A_Account();
		InitalizeControls();
		InitializeEvents();
		GetAccType();
		Close_Loder();
		if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
			let data: A_ACCOUNT = GetModelGlopel();
			AccountCode = data.ACC_CODE;
			AddMod = false;
			localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
		}
		GetAccount(AccountCode);

	}
	function InitalizeControls() {
		btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
		btnsave = document.getElementById("btnsave") as HTMLButtonElement;
		btnDelete = document.getElementById("btnDelete") as HTMLButtonElement;
		btnback = document.getElementById("btnback") as HTMLButtonElement;
		btnRefrash = document.getElementById("btnRefrash") as HTMLButtonElement;
		//textBoxes
		Acc_Parent = document.getElementById("Acc_Parent") as HTMLInputElement;
		txt_ACC_CODE = document.getElementById("txt_ACC_CODE") as HTMLInputElement;
		txt_NAME_A = document.getElementById("txt_NAME_A") as HTMLInputElement;
		txt_NAME_E = document.getElementById("txt_NAME_E") as HTMLInputElement;
		txt_Type = document.getElementById("txt_Type") as HTMLSelectElement;
		//txtCCDT_Type = document.getElementById("txtCCDT_Type") as HTMLSelectElement;
		txt_note = document.getElementById("txt_note") as HTMLInputElement;
		txt_level = document.getElementById("txt_level") as HTMLInputElement;
		txt_Debit = document.getElementById("txt_Debit") as HTMLInputElement;
		txt_DebitFC = document.getElementById("txt_DebitFC") as HTMLInputElement;
		txtACC_GROUP = document.getElementById("txtACC_GROUP") as HTMLInputElement;
		txt_CreditLimit = document.getElementById("txt_CreditLimit") as HTMLInputElement;
		txt_balance = document.getElementById("txt_balance") as HTMLInputElement;
		chkeck_active = document.getElementById("chkeck_active") as HTMLInputElement;
		chkeck_Detailed = document.getElementById("chkeck_Detailed") as HTMLInputElement;
		txtSearch = document.getElementById("txtSearch") as HTMLInputElement;


	}
	function InitializeEvents() {
		btnsave.onclick = () => { btnsave_onClick(); LogUser(" تم عمل حفظ للبيانات ", TypeLog.Save) }
		btnback.onclick = () => { GetAccount(txt_ACC_CODE.value); LogUser(" تم عمل تراجع من التعديل ", TypeLog.BackUpdate) }
		btnDelete.onclick = () => { btnDelete_onclick(); LogUser(" تم عمل حذف للبيانات ", TypeLog.Delete) }
		btnAdd.onclick = () => { btnAdd_onclick(); LogUser(" تم ضغط علي زر الاضافه ", TypeLog.Add) }
	}
	function GetAccount(ACC_CODE: string) {
		if (AddMod == true) {
			ACC_CODE = AccountCode;
		}



		let Func = " select * from  fn_Z_A_GetAccountByCompanyByACC_CODE(" + CompCode + ", " + FinYear + ", N'" + ACC_CODE + "') ";
		let DataRes = GetDataFromProc(Func, "AQ_A_Account")
	 
		if (DataRes.length > 0) {
			AccountDetail = DataRes[0];
			txt_ACC_CODE.disabled = true;
			DisplayDetail(AccountDetail)
		}
	}
	function GetAccType() {
		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'G_Codes', Condition: "CodeType = 'AccType'" },
			]
		DataResult(Table);

		let List = GetDataTable('G_Codes');
		FillDropDown(List, txt_Type, "CodeValue", "DescA", null);
	}
	function DisplayDetail(Model: AQ_A_Account) {

		txt_ACC_CODE.value = Model.ACC_CODE;
		Acc_Parent.value = Model.PARENT_ACC;
		txt_NAME_A.value = Model.ACC_DESCA;
		txt_NAME_E.value = Model.ACC_DESCL;
		txt_note.value = Model.REMARKS;
		txt_level.value = Model.ACC_LEVEL.toString();
		txt_Debit.value = Model.Total_DEBIT.toFixed(2);
		txt_DebitFC.value = Model.Total_CREDIT.toFixed(2);
		txt_Type.value = String(Model.ACC_TYPE);
		txt_CreditLimit.value = Model.ACC_LIMIT.toFixed(2);
		txt_balance.value = Model.Total_Balance.toFixed(2);
		chkeck_Detailed.checked = Model.DETAIL;
		chkeck_active.checked = Model.ACC_ACTIVE;
		CREATED_BY = Model.CREATED_BY;
		CREATED_AT = Model.CREATED_AT;
	}
	function btnDelete_onclick() {
		debugger
		if (!Check_Not_Using(txt_ACC_CODE.value)) {
			if (DeleteCode == 1) {
				ShowMessage("You cannot delete it because it has Transactions! ", " لا يمكنك الحذف لانه لديه حركات سابقاً! ");
				Errorinput(txt_ACC_CODE);
			}
			else {
				ShowMessage("You cannot delete it because it has Accounts! ", " لا يمكنك الحذف لانه لديه حسابات! ");
			}
			return;
		}
		else {
			let NAME = SysSession.CurrentEnvironment.ScreenLanguage == "Ar" ? txt_NAME_A.value : txt_NAME_E.value;

			let _Confirm = confirm("هل تريد الحذف؟ ( " + NAME + " )")
			if (_Confirm) {
				SqlExecuteQuery("delete from A_ACCOUNT where ACC_CODE =N'" + txt_ACC_CODE.value + "'");
				ShowMessage("Deleted 🤞😉", "تم الحذف 🤞😉");
				$("#Display_Back_Page").click();
				$('#Back_Page').click();
				Close_Loder();
			}
		}
	}
	function Check_Not_Using(ACC_CODE: string): boolean {

		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'A_JOURNAL_DETAIL', Condition: "COMP_CODE = " + CompCode + " and ACC_CODE = N'" + ACC_CODE + "'" },
			]
		DataResult(Table);
		debugger
		let JournalList = GetDataTable('A_JOURNAL_DETAIL');
		if (JournalList.length > 0) {
			DeleteCode = 1;
			return false;
		} else {
			  
			let Func = " select * from  fn_Z_A_GetAccountByCompanyByACC_CODE(" + CompCode + ", " + FinYear + ", '') ";
			let DataRes = GetDataFromProc(Func, "AQ_A_Account")		   
		let AccountSons =	DataRes.filter(x => x.PARENT_ACC == ACC_CODE);

			if (AccountSons.length > 0) {
				DeleteCode = 2;
				return false;
			} else {
				return true;

			}
		}
	}
	function btnsave_onClick() {
		debugger
		if (!ValidationHeader()) return
		let Model = new A_ACCOUNT();

		Model.COMP_CODE = CompCode;
		Model.ACC_CODE = txt_ACC_CODE.value;
		Model.ACC_DESCA = txt_NAME_A.value;
		Model.ACC_DESCL = txt_NAME_E.value;
		Model.ACC_GROUP = Number(txtACC_GROUP.value);
		Model.ACC_TYPE = Number(txt_Type.value);
		Model.ACC_LEVEL = Number(txt_level.value);
		Model.ACC_ACTIVE = chkeck_active.checked;
		Model.PARENT_ACC = Acc_Parent.value.trim() == '' ? '-1' : Acc_Parent.value;
		Model.DETAIL = chkeck_Detailed.checked;
		Model.CREATED_BY = sys.SysSession.CurrentEnvironment.UserCode;
		Model.CREATED_AT = GetDateAndTime();
		let NameFunc = AddMod == true ? "Insert" : "Update";
		let MessageEn = AddMod == true ? "Inserted" : "Updated";
		let MessageAr = AddMod == true ? "اضافة" : "تعديل";

		Ajax.CallsyncSave({
			type: "Post",
			url: sys.apiUrl("Account", NameFunc),
			data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess == true) {
					ShowMessage("Account " + MessageEn + " ( " + txt_ACC_CODE.value + " ) 🤞😉", "تم " + MessageAr + " الحساب بنجاح ( " + txt_ACC_CODE.value + " ) 🤞😉");
					Close_Loder();
					$("#Display_Back_Page").click();
					$('#Back_Page').click();
				} else {

				}
			}
		});
		AddMod = false;
	}
	function btnAdd_onclick() {		 
		var Table: Array<Table>;
		Table =
			[
			{ NameTable: 'A_JOURNAL_DETAIL', Condition: "COMP_CODE = " + CompCode + " and ACC_CODE = '" + txt_ACC_CODE.value + "'" },
			]
		DataResult(Table);
		debugger
		let JournalList = GetDataTable('A_JOURNAL_DETAIL');
		if (JournalList.length > 0) {
			ShowMessage(" You cannot add Account under this account because it have transactions", "لا يمكنك اضافة حساب تحت هذا الحساب لان لديه حركات");

			return false;
		} else {
			debugger
			let Level = Number(txt_level.value);
			AddMod = true;
			Clear();
			btnAdd.disabled = true;
			btnDelete.disabled = true;
			Acc_Parent.value = AccountCode;
			txt_ACC_CODE.disabled = false;
			txt_level.value = (Level + 1).toString();
		}
	}
	function Clear() {
		txt_NAME_A.value = "";
		txt_NAME_E.value = "";
		txt_CreditLimit.value = "0";
		txt_Debit.value = "0";
		txt_DebitFC.value = "0";
		txt_balance.value = "0";
		txt_note.value = "";
		chkeck_Detailed.checked = true;
	}
	function ValidationHeader() {
		debugger
		if (txt_ACC_CODE.value == "") {
			Errorinput(txt_ACC_CODE, "Please enter account code !", "برجاء أدخل كود الحساب! ");
			return false
		}
		else if (!Check_ACC_CODE(txt_ACC_CODE.value) && AddMod == true) {
			Errorinput(txt_ACC_CODE, "This code already exists.!", "هذا الكود موجود بالفعل ");
			return;
		}
		else if (txt_NAME_A.value.trim() == "" && txt_NAME_E.value.trim() == "") {
			Errorinput(txt_NAME_A, "Please enter arabic describtion ! ", "برجاء أدخل الاسم بالعربي ");

			return false
		}
		else if (txt_Type.value == "null") {
			Errorinput(txt_Type, "Please choose type ! ", "يجب اختيار النوع !");
			return false
		}
		return true;
	}
	function Check_ACC_CODE(ACC_CODE: string) {
		debugger
		
		let Func = " select * from  fn_Z_A_GetAccountByCompanyByACC_CODE(" + CompCode + ", " + FinYear + ", N'" + ACC_CODE + "') ";
		let DataRes = GetDataFromProc(Func, "AQ_A_Account")	    
		if (DataRes.length > 0) {
			return false;
		} else {
			return true;
		}
	}



}
