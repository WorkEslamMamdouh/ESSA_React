
$(document).ready(() => {
	IncomeStatment.InitalizeComponent();

});

namespace IncomeStatment {	 
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var Res: SystemResources = GetGlopelResources();
 
	var FromDate: HTMLInputElement;
	var ToDate: HTMLInputElement;		 
	var PrintPdf: HTMLButtonElement;
	var PrintExcel: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;
	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();
		$('#FromDate').val(DateStartYear());
		$('#ToDate').val(GetDate());	  
		Close_Loder();
	}
	function InitalizeControls() {			 
		FromDate = document.getElementById('FromDate') as HTMLInputElement;	   
		ToDate = document.getElementById('ToDate') as HTMLInputElement;	   
		PrintExcel = document.getElementById('PrintExcel') as HTMLButtonElement;
		PrintPdf = document.getElementById('PrintPdf') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
	}
	function InitializeEvents() {
		PrintPdf.onclick = Print_Pdf;
		PrintExcel.onclick = Print_Excel;
		btnDelete_Filter.onclick = Clear;		  
	}	   
	function Clear() {
		$('#FromDate').val(DateStartYear());
		$('#ToDate').val(GetDate());
	}		    
	function Print_Pdf() {
		 
		var RepParam: Array<RepParamter>;
		RepParam =
			[
			{ Parameter: 'CompCode', Value: "" + Number(CompCode) + "" },
			{ Parameter: 'FromDate', Value: "" + FromDate.value + "" },
			{ Parameter: 'ToDate', Value: "" + ToDate.value + "" },					   
			]
		if (Res.Lang == "Ar") {
			Print_Report("Rpt_Annual_Income_StatementAr", "IProc_Rpt_Annual_Income_Statement", RepParam);
		} else {
			Print_Report("Rpt_Annual_Income_StatementEn", "IProc_Rpt_Annual_Income_Statement", RepParam);

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
		//    Print_Report_Excel("IProc_Rpt_AccountStatmentSum " + CompCode + ",'" + DateFormat($('#FromDate').val()) + "','" + DateFormat($('#ToDate').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatmentSum", "Report Account Statment Summary", keyMapping)

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
		//    Print_Report_Excel("IProc_Rpt_AccountStatment " + CompCode + ",'" + DateFormat($('#FromDate').val()) + "','" + DateFormat($('#ToDate').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatment", "Report Account Statment", keyMapping)
		//}


	}

}
