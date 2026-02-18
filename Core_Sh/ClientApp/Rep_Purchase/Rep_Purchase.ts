
$(document).ready(() => {
	Rep_Purchase.InitalizeComponent();

});

namespace Rep_Purchase {

	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var Res: SystemResources = GetGlopelResources();
	var CashTypeID: HTMLSelectElement;
	CashTypeID = document.getElementById('CashTypeID') as HTMLSelectElement;
	var Pay_Type: HTMLSelectElement;

	var RepType: HTMLSelectElement;
	var Sales_Type: HTMLSelectElement;
	var Inv_Status: HTMLSelectElement;
	var Cash_Type: HTMLSelectElement;
	var CustomerID: HTMLInputElement;
	var btnCustomer: HTMLButtonElement;
	var PrintPdf: HTMLButtonElement;
	var PrintExcel: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;
	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate())
		GetCashTypes()
		Close_Loder();
	}
	function InitalizeControls() {
		Pay_Type = document.getElementById('Pay_Type') as HTMLSelectElement;

		RepType = document.getElementById('RepType') as HTMLSelectElement;
		Sales_Type = document.getElementById('Sales_Type') as HTMLSelectElement;
		Inv_Status = document.getElementById('Inv_Status') as HTMLSelectElement;
		Cash_Type = document.getElementById('Cash_Type') as HTMLSelectElement;
		CustomerID = document.getElementById('CustomerID') as HTMLInputElement;
		btnCustomer = document.getElementById('btnCustomer') as HTMLButtonElement;
		PrintExcel = document.getElementById('PrintExcel') as HTMLButtonElement;
		PrintPdf = document.getElementById('PrintPdf') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
	}
	function InitializeEvents() {
		PrintPdf.onclick = Print_Pdf;
		PrintExcel.onclick = Print_Excel;
		btnDelete_Filter.onclick = Clear;
		btnCustomer.onclick = SearchCustomer;
		Cash_Type.onchange = Cash_Type_onchange;

	}
	function Cash_Type_onchange() {
		if (Cash_Type.value == '0') {
			$('#Pay_Type').removeAttr("disabled");
			$('#CashTypeID').attr("disabled", "disabled");
			CashTypeID.selectedIndex = 0;
		} else if (Cash_Type.value == '1') {
			$('#Pay_Type').attr("disabled", "disabled");
			Pay_Type.selectedIndex = 0;
			$('#CashTypeID').removeAttr("disabled");
		} else {
			$('#Pay_Type').attr("disabled", "disabled");
			$('#CashTypeID').attr("disabled", "disabled");
			Pay_Type.selectedIndex = 0;
			CashTypeID.selectedIndex = 0;
		}
	}

	function GetCashTypes() {
		let Data = GetDataFrom("D_A_CashTypes", "CompCode = " + CompCode + "");
		FillDropwithAttr(Data, "CashTypeID", "CashTypeID", "Description", (Res.Lang == "Ar" ? "جميع الانواع" : "All Types"), "", "");
	}
	function Clear() {
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate())
		$('#Pay_Type').attr("disabled", "disabled");
		$('#CashTypeID').attr("disabled", "disabled");
		Pay_Type.selectedIndex = 0;
		CashTypeID.selectedIndex = 0;
		RepType.value = "1";
		Sales_Type.value = "null";
		Inv_Status.value = "null";
		Cash_Type.value = "null";
		CustomerID.value = "";
		btnCustomer.value = "Search Supplier";
	}
	function SearchCustomer() {
		//sys.FindKey("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and Isactive = 1 ", () => {
		//sys.FindKeySpeed("Supplier", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', function () {
		sys.FindKeyPagination("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
			let SelectedItem: D_A_Suppliers = SelectDataSearch.DataRow;
			//let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
			$('#CustomerID').val(SelectedItem.SupplierID);
			$('#btnCustomer').val(SelectedItem.SupplierName);
		});
	}
	function Print_Pdf() {
		let Customer = CustomerID.value == "" ? "null" : CustomerID.value;
		var RepParam: Array<RepParamter>;
		RepParam =
			[
				{ Parameter: 'CompCode', Value: "" + CompCode + "" },
				{ Parameter: 'FromDate', Value: "" + DateFormatSql($('#Txt_From_Date').val()) + "" },
				{ Parameter: 'ToDate', Value: "" + DateFormatSql($('#Txt_To_Date').val()) + "" },
				{ Parameter: 'Trtype', Value: "" + Sales_Type.value + "" },
				{ Parameter: 'Status', Value: "" + Inv_Status.value + "" },
				{ Parameter: 'CashType', Value: "" + Cash_Type.value + "" },
			{ Parameter: 'SupplierID', Value: "" + Customer + "" },
			{ Parameter: 'PaymentType', Value: "" + Pay_Type.value + "" },	    
				{ Parameter: 'CashTypeID', Value: "" + CashTypeID.value.trim() + "" },

			]

		if (RepType.value == "1") {		// Summary
			if (Res.Lang == "Ar") {
				Print_Report("Rpt_SupplierPurSumAr", "IProc_Rpt_SupplierPurSum", RepParam);
			}
			else {
				Print_Report("Rpt_SupplierPurSumEn", "IProc_Rpt_SupplierPurSum", RepParam);

			}
		}
		else {
			if (Res.Lang == "Ar") {
				Print_Report("Rpt_SupplierPurDetAr", "IProc_Rpt_SupplierPurDet", RepParam);
			} else {
				Print_Report("Rpt_SupplierPurDetEn", "IProc_Rpt_SupplierPurDet", RepParam);

			}
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
		//  Print_Report_Excel("IProc_Rpt_AccountStatment " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + db_Type.value + ",'" + $('#CustomerID').val() + "','", "IProc_Rpt_AccountStatment", "Report Account Statment", keyMapping)
		//}


	}

}