
$(document).ready(() => {
	CashBox.InitalizeComponent();

});

namespace CashBox {
						 
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var Res: SystemResources = GetGlopelResources();
	var txtSearch: HTMLInputElement;			   
	var txtTotalDebit: HTMLInputElement;			   
	var txtTotalCredit: HTMLInputElement;			   
	var txtBalance: HTMLInputElement;			 
	var txtDayTotalDebit: HTMLInputElement;
	var txtDayTotalCredit: HTMLInputElement;
	var txtDayBalance: HTMLInputElement;			   
	var Txt_From_Date: HTMLInputElement;			   
	var Txt_To_Date: HTMLInputElement;			   
	var Fin_Type: HTMLSelectElement;			   
	var Cash_Type: HTMLSelectElement;	    
	var PrintPdf: HTMLButtonElement;
	var PrintExcel: HTMLButtonElement;
	var Filter_View: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;
	var _Grid: JsGrid = new JsGrid();
	var BoxList: Array<IProc_Rpt_CashBox> = new Array<IProc_Rpt_CashBox>();
	var cat: Array<D_A_FinancialType> = new Array<D_A_FinancialType>();
	export function InitalizeComponent() {
		 
		InitalizeControls();
		InitializeEvents();
		$('#Txt_From_Date').val(GetDate())
		$('#Txt_To_Date').val(GetDate())
		GetFinTypes();		    
		GetData();
		Close_Loder();
	}
	function InitalizeControls() {											  
		Fin_Type = document.getElementById('Fin_Type') as HTMLSelectElement;	   
		Cash_Type = document.getElementById('Cash_Type') as HTMLSelectElement;	    
		PrintExcel = document.getElementById('PrintExcel') as HTMLButtonElement;
		PrintPdf = document.getElementById('PrintPdf') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
		Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
		Txt_From_Date = document.getElementById('Txt_From_Date') as HTMLInputElement;
		Txt_From_Date = document.getElementById('Txt_From_Date') as HTMLInputElement;	
		txtTotalDebit = document.getElementById('txtTotalDebit') as HTMLInputElement;
		txtTotalCredit = document.getElementById('txtTotalCredit') as HTMLInputElement;
		txtBalance = document.getElementById('txtBalance') as HTMLInputElement;		
		txtDayTotalDebit = document.getElementById('txtDayTotalDebit') as HTMLInputElement;
		txtDayTotalCredit = document.getElementById('txtDayTotalCredit') as HTMLInputElement;
		txtDayBalance = document.getElementById('txtDayBalance') as HTMLInputElement;		
		txtSearch = document.getElementById('txtSearch') as HTMLInputElement;		
	}
	function InitializeEvents() {
		PrintPdf.onclick = Print_Pdf;
		PrintExcel.onclick = Print_Excel;
		btnDelete_Filter.onclick = Clear;
		Filter_View.onclick = GetData;
		txtSearch.onkeyup = SearchDataGrid;
	}
	function SearchDataGrid() {

		$("#_Grid1").jsGrid("option", "pageIndex", 1);


		if (txtSearch.value != "") {
			let search: string = txtSearch.value.toLowerCase();
			let SearchDetails = BoxList.filter(x => x.TrNo?.toString().toLowerCase().search(search) >= 0 || x.BeneficiaryName?.toLowerCase().search(search) >= 0 || x.DescAr?.toString().toLowerCase().search(search) >= 0 || x.Description?.toString().toLowerCase().search(search) >= 0);

			_Grid.DataSource = SearchDetails;
			_Grid.Bind();
			let Debit = 0;
			let Credit = 0;
			for (var i = 0; i < SearchDetails.length; i++) {
				Debit += SearchDetails[i].Debit;
				Credit += SearchDetails[i].Credit;
			}

			txtTotalDebit.value = Debit.toFixed(2);
			txtTotalCredit.value = Credit.toFixed(2);
			txtBalance.value = (Debit - Credit).toFixed(2);	   
			txtDayTotalDebit.value = (Debit - SearchDetails[0].Debit).toFixed(2);
			txtDayTotalCredit.value = (Credit - SearchDetails[0].Credit).toFixed(2);
			txtDayBalance.value = ((Debit - SearchDetails[0].Debit) - (Credit - SearchDetails[0].Credit)).toFixed(2);
		} else {
			_Grid.DataSource = BoxList;
			_Grid.Bind();
			let Debit = 0;
			let Credit = 0;
			for (var i = 0; i < BoxList.length; i++) {
				Debit += BoxList[i].Debit;
				Credit += BoxList[i].Credit;
			}

			txtTotalDebit.value = Debit.toFixed(2);
			txtTotalCredit.value = Credit.toFixed(2);
			txtBalance.value = (Debit - Credit).toFixed(2);



			txtDayTotalDebit.value = (Debit - BoxList[0].Debit).toFixed(2);
			txtDayTotalCredit.value = (Credit - BoxList[0].Credit).toFixed(2);
			txtDayBalance.value = ((Debit - BoxList[0].Debit) - (Credit - BoxList[0].Credit)).toFixed(2);
		}
	}
	function InitializeGrid() {
		_Grid.ElementName = "_Grid1";	    
		_Grid.Paging = true;
		_Grid.PageSize = 10;
		_Grid.Sorting = true;
		_Grid.InsertionMode = JsGridInsertionMode.Binding;
		_Grid.Editing = false;
		_Grid.Inserting = false;
		_Grid.SelectedIndex = 1;
		_Grid.OnItemEditing = () => { };
		_Grid.Columns = [
			{ title: Res.Lang == "En" ? "Type" : "النوع", visible: false, name: "TypeVoucher", width: "100px" },
			{
				title: Res.Lang == "En" ? "Date" : "التاريخ", name: "TransactionDate", type: "text", width: "100px",
				itemTemplate: (s: string, item: IProc_Rpt_CashBox): HTMLLabelElement => {
					let txt: HTMLLabelElement = document.createElement("label");

					txt.innerHTML = DateFormat(item.TransactionDate)

					return txt;
				}
			},
			{ title: Res.Lang == "En" ? "Beneficiary Name" : "المستفيد", name: "BeneficiaryName", width: "100px" },
			{ title: Res.Lang == "En" ? "Vouche No" : "رقم السند", name: "TrNo", type: "text", width: "100px" },
			{ title: Res.Lang == "En" ? "Type Voucher" : "نوع السند", name: "DescAr", type: "text", width: "100px" },
			{ title: Res.Lang == "En" ? "Type Cash" : "نوع النقدية", name: "Description", type: "text", width: "100px" },
			{ title: Res.Lang == "En" ? "Debit" : "مدين", name: "Debit", type: "text", width: "100px" },
			{ title: Res.Lang == "En" ? "Credit" : "دائن", name: "Credit", type: "text", width: "100px" },
			{ title: Res.Lang == "En" ? "Describtion" : "الوصف", name: "Remarks", type: "text", width: "200px" },			 
		];
		_Grid.Bind();
	}
	function GetData() {
		$("#_Grid1").jsGrid("option", "pageIndex", 1);
		BoxList = new  Array<IProc_Rpt_CashBox>();
		if (!SysSession.CurrentPrivileges.VIEW) {
			ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
			return
		}


		let fromdate = $('#Txt_From_Date').val();
		let todate = $('#Txt_To_Date').val();
		let FinType = $('#Fin_Type').val();
		let CashType = $('#Cash_Type').val();
		 BoxList = GetDataFromProc("IProc_Rpt_CashBox  " + CompCode + " , '" + fromdate + "' , '" + todate + "' ," + FinType + " ," + CashType + "    ", "IProc_Rpt_CashBox")
		InitializeGrid();
		_Grid.DataSource = BoxList;
		_Grid.Bind();
		let Debit = 0;
		let Credit = 0;

		for (var i = 0; i < BoxList.length; i++) {
			Debit += BoxList[i].Debit;
			Credit += BoxList[i].Credit;
		}

		txtTotalDebit.value = Debit.toFixed(2);
		txtTotalCredit.value = Credit.toFixed(2);
		txtBalance.value = (Debit - Credit).toFixed(2);



		txtDayTotalDebit.value = (Debit - BoxList[0].Debit).toFixed(2);
		txtDayTotalCredit.value = (Credit - BoxList[0].Credit).toFixed(2);
		txtDayBalance.value = ((Debit - BoxList[0].Debit) - (Credit - BoxList[0].Credit)).toFixed(2);


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
																	   
		FillDropwithAttr(CashTypes, "Cash_Type", "CashTypeID", "Description", (Res.Lang == "Ar" ? "جميع الانواع" : "AllTypes"), "", "");
		FillDropwithAttr(cat, "Fin_Type", "FinancialTypeID", (Res.Lang == "Ar" ? "DescAr" : "DescEn"), (Res.Lang == "Ar" ? "جميع الانواع" : "AllTypes"), "", "");

	}		 
	function Clear() {
		$('#Txt_From_Date').val(GetDate())
		$('#Txt_To_Date').val(GetDate())	  
		Fin_Type.value = "null";		 
		Cash_Type.value = "null";				 
	}	  
	function Print_Pdf() {													 
		var RepParam: Array<RepParamter>;
		RepParam =
			[
				{ Parameter: 'CompCode', Value: "" + CompCode + "" },
				{ Parameter: 'FromDate', Value: "" + DateFormatSql($('#Txt_From_Date').val()) + "" },
				{ Parameter: 'ToDate', Value: "" + DateFormatSql($('#Txt_To_Date').val()) + "" },
			{ Parameter: 'FinType', Value: "" + Fin_Type.value  + "" },		  
				{ Parameter: 'CashType', Value: "" + Cash_Type.value + "" },
			 
			]

	 
		Print_Report("Rpt_CashBoxAr", "IProc_Rpt_CashBox", RepParam);			 
	}
	function Print_Excel() {
		  
		    let keyMapping = {
				BeneficiaryName: 'المستفيد',
				Description: ' نوع النقدية',
				Debit: 'مدين',
				Credit: 'دائن',
		        Balance: 'الرصيد',
		    };
		Print_Report_Excel("IProc_Rpt_CashBox " + CompCode + ",'" + DateFormat($('#Txt_From_Date').val()) + "','" + DateFormat($('#Txt_To_Date').val()) + "'," + Fin_Type.value + "," + Cash_Type.value + "", "IProc_Rpt_CashBox", "Report Cashbox", keyMapping)
		  

	}

}

