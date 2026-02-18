


$(document).ready(() => {
	TrialBalance.InitalizeComponent();
});
namespace TrialBalance {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var Res: SystemResources = GetGlopelResources();

	var PrintPdf: HTMLButtonElement;
	var PrintExcel: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;
	var DropLevels: HTMLSelectElement;
 	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate());
		Close_Loder();
	}
	function InitalizeControls() {			    
		PrintExcel = document.getElementById('PrintExcel') as HTMLButtonElement;
		PrintPdf = document.getElementById('PrintPdf') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
		DropLevels = document.getElementById('DropLevels') as HTMLSelectElement;
	}
	function InitializeEvents() {
		PrintPdf.onclick = Print_Pdf;
		//PrintExcel.onclick = Print_Excel;
		btnDelete_Filter.onclick = Clear;			  
	}		   
	function Clear() {
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate())
		DropLevels.selectedIndex = 0;
	}
	 
	function Print_Pdf() {	  
		var RepParam: Array<RepParamter>;
		RepParam =
			[
			{ Parameter: 'comp', Value: "" + CompCode + "" },		  
			{ Parameter: 'FromDate', Value: "" + DateFormatSql($('#Txt_From_Date').val()) + "" },
			{ Parameter: 'ToDate', Value: "" + DateFormatSql($('#Txt_To_Date').val()) + "" },
			{ Parameter: 'Level', Value: "" + DropLevels.value + "" },								   
			]
		Print_Report("TrialBalanceAr", "IProc_Z_A_TrialBalance", RepParam);

	}
	//function Print_Excel() {
	//	let AccountCode = Acc_Code.value;
	//	let Hide: number = IsDetail.checked == false ? 0 : 1;
	//	let keyMapping = {
	//		TrDate: 'التاريخ',
	//		ACC_CODE: 'رقم الحساب',
	//		ACC_DESCA: ' الحساب',
	//		Remarks: ' بيان',
	//		DEBIT: 'مدين',
	//		CREDIT: 'دائن',
	//	};
	//	Print_Report_Excel("IProc_Z_A_AccountStatment " + CompCode + "," + AccountCode + ",'" + DateFormatSql($('#Txt_From_Date').val()) + "','" + DateFormatSql($('#Txt_To_Date').val()) + "'," + null + "," + Number(Hide) + " ,'", "IProc_Z_A_AccountStatment", "Report Account Statment", keyMapping)

	//}
}
