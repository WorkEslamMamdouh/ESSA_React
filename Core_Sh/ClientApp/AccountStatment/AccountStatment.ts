


$(document).ready(() => {
	AccountStatment.InitalizeComponent();
});
namespace AccountStatment {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var Res: SystemResources = GetGlopelResources();
	var IsDetail: HTMLInputElement;
	var Acc_Code: HTMLInputElement;
	var btnAccountSrch: HTMLButtonElement;
	var PrintPdf: HTMLButtonElement;
	var PrintExcel: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;
	var CountGrid = 0;
	var cat: Array<D_A_FinancialType> = new Array<D_A_FinancialType>();
	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate());
		Close_Loder();
	}
	function InitalizeControls() {
		IsDetail = document.getElementById('IsDetail') as HTMLInputElement;
		Acc_Code = document.getElementById('Acc_Code') as HTMLInputElement;
		btnAccountSrch = document.getElementById('btnAccountSrch') as HTMLButtonElement;
		PrintExcel = document.getElementById('PrintExcel') as HTMLButtonElement;
		PrintPdf = document.getElementById('PrintPdf') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
	}
	function InitializeEvents() {
		PrintPdf.onclick = Print_Pdf;
		PrintExcel.onclick = Print_Excel;
		btnDelete_Filter.onclick = Clear;
		btnAccountSrch.onclick = SearchCustomer;
	}


	function ACCGrid(cnt: number) {
		let HTML = `<tr id= "row_no${cnt}">
		   <td>
		                     <div class="form-group">
			                        <span id="btn_minus${cnt}"><i class="fa fa-minus-circle"style="font-size: 30px;cursor: pointer;"></i></span>
                            </div>
	                    </td>                   
                        <td>
		                    <div class="form-group">
							<input type="text" id="ACC_CODE${cnt}" disabled="disabled" class=" u-input u-input-rectangle"style="border-radius: 50px;">		  
  		                    </div>
	                    </td>
                        <td>
		                    <div class="form-group">
							<input type="text" id="ACC_DESC${cnt}" disabled="disabled" class=" u-input u-input-rectangle"style="border-radius: 50px;">	    
  		                    </div>
	                    </td> 	
                        <input id="txt_StatusFlag${cnt}" name=" " type="hidden" disabled class="form-control input-sm " />
						
                </tr>`
		$("#Grid").append(HTML)
		GridControlsEvents(cnt)
	}


	function GridControlsEvents(cnt: number) {

		$("#btn_minus" + cnt).on('click', function () {
			$("#txt_StatusFlag" + cnt).val("d");
			$("#row_no" + cnt).attr("hidden", "true");
		});

	}


	function Clear() {
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate())
		btnAccountSrch.value = "اسم الحساب";
		Acc_Code.value = "";
	}
	function SearchCustomer() {
		let Con = "";
		if (IsDetail.checked) {
			Con = " and DETAIL = 1"
		} else {
			Con = "";
		}
		sys.FindKeyPagination("Account", "btnAcc", " COMP_CODE = " + CompCode + " and ACC_ACTIVE = 1" + Con, () => {

			let DataRow: A_ACCOUNT = SelectDataSearch.DataRow
			debugger
			for (var i = 0; i < CountGrid; i++) {
				if (DataRow.ACC_CODE == $(`#ACC_CODE${i}`).val()) {
					ShowMessage("You cannot add account more than once", "لا يمكنك اضافة الحساب اكثر من مرة");
					return;
				}
			}		 
			ACCGrid(CountGrid);
			$(`#ACC_CODE${CountGrid}`).val(DataRow.ACC_CODE);
			$(`#ACC_DESC${CountGrid}`).val(DataRow.ACC_DESCA);	   
			CountGrid++;
		});
	}
	function Print_Pdf() {
		let Accounts = "";
		for (var i = 0; i < CountGrid; i++) {

			if (i == 0) {
				Accounts = "" + $(`#ACC_CODE${i}`).val() + "  "
			} else if (i != CountGrid - 1) {
				Accounts = Accounts + ",  " + $(`#ACC_CODE${i}`).val() + "  ";

			}
			else {
				Accounts = Accounts + "," + $(`#ACC_CODE${i}`).val() + "  ";
			}

		}
		let Hide: number = IsDetail.checked == false ? 0 : 1;

		var RepParam: Array<RepParamter>;
		RepParam =
			[
				{ Parameter: 'comp', Value: "" + CompCode + "" },
				{ Parameter: 'AccCode', Value: "" + Accounts + "" },
				{ Parameter: 'FromDate', Value: "" + DateFormatSql($('#Txt_From_Date').val()) + "" },
				{ Parameter: 'Todate', Value: "" + DateFormatSql($('#Txt_To_Date').val()) + "" },
				{ Parameter: 'IDUser', Value: null },
				{ Parameter: 'HideParentAcc', Value: "" + Number(Hide) + "" },
			]
		Print_Report("AccountStatmentAr", "IProc_Z_A_AccountStatment", RepParam);

	}
	function Print_Excel() {
		let AccountCode = Acc_Code.value;
		let Hide: number = IsDetail.checked == false ? 0 : 1;
		let keyMapping = {
			TrDate: 'التاريخ',
			ACC_CODE: 'رقم الحساب',
			ACC_DESCA: ' الحساب',
			Remarks: ' بيان',
			DEBIT: 'مدين',
			CREDIT: 'دائن',
		};
		Print_Report_Excel("IProc_Z_A_AccountStatment " + CompCode + "," + AccountCode + ",'" + DateFormatSql($('#Txt_From_Date').val()) + "','" + DateFormatSql($('#Txt_To_Date').val()) + "'," + null + "," + Number(Hide) + " ,'", "IProc_Z_A_AccountStatment", "Report Account Statment", keyMapping)

	}
}
