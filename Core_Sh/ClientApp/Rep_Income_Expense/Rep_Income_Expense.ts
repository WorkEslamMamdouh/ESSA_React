
$(document).ready(() => {
	Rep_Income_Expense.InitalizeComponent();

});

namespace Rep_Income_Expense {

	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var Res: SystemResources = GetGlopelResources();
	var RepType: HTMLSelectElement;
	var Fin_Type: HTMLSelectElement;
	var Cash_Type: HTMLSelectElement;
	var PrintPdf: HTMLButtonElement;
	var PrintExcel: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;

	var cat: Array<D_A_FinancialType> = new Array<D_A_FinancialType>();
	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate())
		GetFinTypes();
		Close_Loder();
	}
	function InitalizeControls() {
		RepType = document.getElementById('RepType') as HTMLSelectElement;
		Fin_Type = document.getElementById('Fin_Type') as HTMLSelectElement;
		Cash_Type = document.getElementById('Cash_Type') as HTMLSelectElement;
		PrintExcel = document.getElementById('PrintExcel') as HTMLButtonElement;
		PrintPdf = document.getElementById('PrintPdf') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
	}
	function GetFinTypes() {
		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'D_A_FinancialType', Condition: "CompCode = " + CompCode + "  and IsActive = 1" },
				{ NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + "  and IsActive = 1" },


			]
		DataResult(Table);
		cat = GetDataTable('D_A_FinancialType');
		let CashTypes = GetDataTable('D_A_CashTypes');
		let CardType = GetDataTable('D_A_CashTypes');
		debugger
		var pushfinob: D_A_FinancialType = new D_A_FinancialType();
		pushfinob.FinancialTypeID = 1001;
		pushfinob.IsActive = true;
		pushfinob.TrType = 1;
		pushfinob.DescAr = "سحب شركاء";
		pushfinob.DescEn = "Pull Partners";
		cat.push(pushfinob);
		pushfinob = new D_A_FinancialType();

		pushfinob.IsActive = true;
		pushfinob.DescAr = "ضخ شركاء";
		pushfinob.DescEn = "push Partners";
		pushfinob.TrType = 0;
		pushfinob.FinancialTypeID = 1000;
		cat.push(pushfinob);


		let catRest = cat.filter(x => x.TrType == 0)


		cat.concat
		FillDropwithAttr(CashTypes, "Cash_Type", "CashTypeID", "Description", (Res.Lang == "Ar" ? "جميع الانواع" : "AllTypes"), "", "");
		FillDropwithAttr(catRest, "Fin_Type", "FinancialTypeID", (Res.Lang == "Ar" ? "DescAr" : "DescEn"), (Res.Lang == "Ar" ? "جميع الانواع" : "AllTypes"), "", "");

	}
	function InitializeEvents() {
		PrintPdf.onclick = Print_Pdf;
		PrintExcel.onclick = Print_Excel;
		btnDelete_Filter.onclick = Clear;
		RepType.onchange = RepType_onchange;
	}
	function RepType_onchange() {
		let catRest;
		if (RepType.value == "1") {	 // Customers		 
			catRest = cat.filter(x => x.TrType == 0)

		} else {
			catRest = cat.filter(x => x.TrType == 1)
		}


		FillDropwithAttr(catRest, "Fin_Type", "FinancialTypeID", (Res.Lang == "Ar" ? "DescAr" : "DescEn"), (Res.Lang == "Ar" ? "جميع الانواع" : "AllTypes"), "", "");


	}
	function Clear() {
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate())
		RepType.value = "1";
		Fin_Type.value = "null";
		Cash_Type.value = "null";
	}
	function Print_Pdf() {
		let TrType = RepType.value == "1" ? 0 : 1;
		var RepParam: Array<RepParamter>;
		RepParam =
			[
				{ Parameter: 'comp', Value: "" + CompCode + "" },
				{ Parameter: 'CashTypeID', Value: "" + Cash_Type.value + "" },
				{ Parameter: 'FromDate', Value: "" + DateFormatSql($('#Txt_From_Date').val()) + "" },
				{ Parameter: 'Todate', Value: "" + DateFormatSql($('#Txt_To_Date').val()) + "" },
				{ Parameter: 'IDUser', Value: "-1" },
				{ Parameter: 'IDExcel', Value: "-1" },
				{ Parameter: 'TrType', Value: "" + Number(TrType) + "" },
				{ Parameter: 'TypeFin', Value: "" + Fin_Type.value + "" },
			]

		if (RepType.value == "1") {		// Summary
			Print_Report("Rpt_RecieptAr", "IProc_Z_A_AccountStatment_Pay_Recpt", RepParam, "Comp" + CompCode, "");
		} else {
			Print_Report("Rpt_ExpencesAr", "IProc_Z_A_AccountStatment_Pay_Recpt", RepParam, "Comp" + CompCode, "");
		}
	}
	function Print_Excel() {
		alert("تحت الانشاء")
		//if (Number(RepType.value) == 1) {
		//    let keyMapping = {
		//        ACC_CODE: 'رقم الحساب',
		//        ACC_DESCA: ' الحساب',
		//        DEBIT: 'مدين',
		//        CREDIT: 'دائن',
		//        Balance: 'الرصيد',
		//    };
		//    Print_Report_Excel("IProc_Rpt_AccountStatmentSum " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatmentSum", "Report Account Statment Summary", keyMapping)

		//} else {
		//    let keyMapping = {
		//        TrNo: 'رقم الحركه',
		//        TypeTans: 'نوع القيد',
		//        VOUCHER_DATE: 'التاريخ',
		//        ACC_CODE: 'رقم الحساب',
		//        ACC_DESCA: ' الحساب',
		//        DEBIT: 'مدين',
		//        CREDIT: 'دائن',
		//        DESCA: 'الملاحظات',
		//    };
		//    Print_Report_Excel("IProc_Rpt_AccountStatment " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatment", "Report Account Statment", keyMapping)
		//}


	}

}

