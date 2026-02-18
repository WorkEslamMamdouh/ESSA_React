
$(document).ready(() => {
	FollowUpCustomerRep.InitalizeComponent();

});

namespace FollowUpCustomerRep {

	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var Res: SystemResources = GetGlopelResources();
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
				{ Parameter: 'FromDate', Value: "" + DateFormat($('#FromDate').val()) + "" },
				{ Parameter: 'ToDate', Value: "" + DateFormat($('#ToDate').val()) + "" },
			]
		if (Res.Lang == "Ar") {
			Print_Report("Rpt_FollowUpCustomersAr", "IProc_Rpt_FollowUpCustomers", RepParam, "Comp" + CompCode, "");
		} else {
			Print_Report("Rpt_FollowUpCustomersEn", "IProc_Rpt_FollowUpCustomers", RepParam, "Comp" + CompCode, "");

		}
	}
	function Print_Excel() {
		 
		    let keyMapping = {
				TrNo: 'رقم الفاتورة',
				SaleDate: ' التاريخ',
				NAMEA: 'العميل',
				MOBILE: 'الموبايل',
				CarNo: 'رقم اللوحة',
				CarBrand: 'نوع السياره',
				JobNo: 'امر العمل',
				EngineerName: 'المهندس',
				Remarks: 'الملاحظات',
		};
		Print_Report_Excel("IProc_Rpt_FollowUpCustomers " + CompCode + ",'" + DateFormat($('#FromDate').val()) + "','" + DateFormat($('#ToDate').val()) + "'","IProc_Rpt_FollowUpCustomers", "Report Follow up Customer" + GetDate() + "", keyMapping)
	    

	}

}
