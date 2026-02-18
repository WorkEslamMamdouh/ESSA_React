//$(document).ready(() => {
//	ViewPurchases.InitalizeComponent();
//});
//namespace ViewPurchases {
//	 
//	var sys: SystemTools = new SystemTools();
//	var SysSession: SystemSession = GetSystemSession();
//	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
//	var _Grid: JsGrid = new JsGrid();
//	var _DataList: Array<IQ_TR_Purchases> = new Array<IQ_TR_Purchases>();
//	var _Datanone: Array<IQ_TR_Purchases> = new Array<IQ_TR_Purchases>();
//	var txtSearch: HTMLInputElement;
//	var drpActive: HTMLSelectElement;
//	var Filter_View: HTMLButtonElement;
//	var btnDelete_Filter: HTMLButtonElement;
//	var Res = GetGlopelResources();
//	export function InitalizeComponent() {
//		 
//		 
//		InitalizeControls();
//		InitializeEvents();
//		$('#Txt_FromTrData').val(GetDate())
//		$('#Txt_TOTrData').val(GetDate())
//		InitializeGrid();
//		SearchID();
//		Close_Loder();
//	}
//	function InitalizeControls() {
//		txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
//		Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
//		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
//	}
//	function InitializeEvents() {
//		txtSearch.onkeyup = _SearchBox_Change;
//		Filter_View.onclick = () => { GetData() };
//		btnDelete_Filter.onclick = Clear;
//	}
//	function SearchID() {
//		SearchIDGnr(() => {
//			ViewUser(ModelSearch.ModelMaster)
//		});
//	}
//	function InitializeGrid() {
//		_Grid.ElementName = "_Grid";
//		//_Grid.OnRowDoubleClicked = GridDoubleClick;
//		_Grid.PrimaryKey = "PurchaseID";
//		_Grid.Paging = true;
//		_Grid.PageSize = 15;
//		_Grid.Sorting = true;
//		_Grid.InsertionMode = JsGridInsertionMode.Binding;
//		_Grid.Editing = false;
//		_Grid.Inserting = false;
//		_Grid.SelectedIndex = 1;
//		_Grid.OnItemEditing = () => { };
//		_Grid.Columns = [
//			{ title: "PurchaseID", name: "PurchaseID", visible: false, width: "100px" },
//			{ title: "TrNo", name: "TrNo", width: "100px" },
//			{ title: "ReNo", name: "ReNo", type: "text", width: "100px" },
//			{ title: "SupplierName", name: "SupplierName", type: "text", width: "100px" },
//			{
//				title: "TrData", css: "PurchaseDate", name: "IsCash", width: "100px",
//				itemTemplate: (s: string, item: I_TR_FinancialTransactions): HTMLLabelElement => {
//					let txt: HTMLLabelElement = document.createElement("label");
//					txt.innerHTML = DateFormat(item.TransactionDate)
//					return txt;
//				}
//			},
//			{ title: "Remarks", name: "Remarks", type: "text", width: "100px" },
//			{
//				title: "Cash Type", css: "ColumPadding", name: "IsCash", width: "100px",
//				itemTemplate: (s: string, item: I_TR_FinancialTransactions): HTMLLabelElement => {
//					let txt: HTMLLabelElement = document.createElement("label");
//					if (item.IsCash == true) {
//						txt.innerHTML = 'نقدي '
//					} else {
//						txt.innerHTML = 'علي حساب '
//					}
//					return txt;
//				}
//			},
//			{
//				title: "Active",
//				itemTemplate: (s: string, item: IQ_TR_Purchases): HTMLInputElement => {
//					let txt: HTMLInputElement = document.createElement("input");
//					txt.type = "checkbox";
//					txt.id = "ChkView" + item.PurchaseID;
//					txt.className = "checkbox";
//					txt.checked = item.Status == 1 ? true : false;
//					txt.style.width = "50px"
//					txt.style.height = "35px"
//					txt.onclick = (e) => {
//						IsActive(item.PurchaseID, txt.checked == false ? 0 : 1, item.TrNo);
//					};
//					return txt;
//				}
//			},
//			{
//				title: "Edit",
//				itemTemplate: (s: string, item: IQ_TR_Purchases): HTMLInputElement => {
//					let txt: HTMLInputElement = document.createElement("input");
//					txt.type = "button";
//					txt.value = ("Edit ⚙️");
//					txt.id = "butView" + item.PurchaseID;
//					txt.disabled = item.Status == 1 ? true : false;
//					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
//					txt.onclick = (e) => {
//						ViewUser(item);
//					};
//					return txt;
//				}
//			},
//			{
//				title: "Print",
//				itemTemplate: (s: string, item: IQ_TR_Purchases): HTMLInputElement => {
//					let txt: HTMLInputElement = document.createElement("input");
//					txt.type = "button";
//					txt.value = ("Print ");
//					txt.id = "butView" + item.PurchaseID;
//					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
//					txt.style.backgroundColor = "#c78816";
//					txt.disabled = item.Status == 1 ? false : true;
//					txt.onclick = (e) => {
//						Print_Pdf(item.PurchaseID );
//					};
//					return txt;
//				}
//			},
//		];
//		_Grid.Bind();
//	}
//	function _SearchBox_Change() {
//		$("#_Grid").jsGrid("option", "pageIndex", 1);
//		 
//		if (txtSearch.value != "") {
//			let search: string = txtSearch.value.toLowerCase();
//			let SearchDetails = _DataList.filter(x => x.ReNo?.toLowerCase().search(search) >= 0 || x.SupplierName?.toLowerCase().search(search) >= 0 || x.Mobile?.toLowerCase().search(search) >= 0 || x.Remarks?.toLowerCase().search(search) >= 0);
//			_Grid.DataSource = SearchDetails;
//			_Grid.Bind();
//		} else {
//			_Grid.DataSource = _DataList;
//			_Grid.Bind();
//		}
//	}
//	function GetData(IsChangeActive: boolean = false, ID: number = 0, Status: number = 0) {
//		 
//		CleaningList_Table();
//		let Con = "";
//		if ($('#drpActive').val() != "null") {
//			Con = Con + " and Status =" + Number($('#drpActive').val());
//		}
//		Con = Con + " and  PurchaseDate >= '" + $('#Txt_FromTrData').val() + "' and   PurchaseDate <= '" + $('#Txt_TOTrData').val() + "'";
//		var Table: Array<Table>;
//		Table =
//			[
//				{ NameTable: 'IQ_TR_Purchases', Condition: "   CompCode =" + CompCode + " " + Con },
//			]
//		DataResult(Table);
//		//**************************************************************************************************************
//		 
//		_DataList = GetDataTable('IQ_TR_Purchases');
//		_DataList = _DataList.sort(dynamicSortNew("PurchaseID"));
//		$('#btnDelete_Filter').removeClass('display_none');
//		_Grid.DataSource = _DataList;
//		_Grid.Bind();
//		if (IsChangeActive && ID > 0) {
//			let chack = _DataList.filter(x => x.PurchaseID == ID)
//			if (chack.length > 0) {
//				if (chack[0].Status == Status) {
//					ShowMessage("Done Change 😍👌" + (Status == 0 ? " Not Approve " : " Approve "));
//				}
//				else {
//					ShowMessage("Not Change 😒");
//				}
//			}
//		}
//	}
//	function ViewUser(item: IQ_TR_Purchases) {
//		$("#Open").focus();
//		localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
//		SetModelGlopel(item)
//		OpenPagePartial("Purchases", "Edit Purchases ", () => { Display_Refrsh() });
//	}
//	function Clear() {
//		$('#drpActive').val("null");
//		$('#Txt_FromTrData').val(GetDate())
//		$('#Txt_TOTrData').val(GetDate())
//		$('#btnDelete_Filter').addClass('display_none');
//		CleaningList_Table();
//		_Grid.DataSource = _Datanone;
//		_Grid.Bind();
//	}
//	var Run_Fun = false;
//	function Display_Refrsh() {
//		if (!Run_Fun) {
//			Run_Fun = true;
//			return
//		}
//		GetData();
//	}
//	function IsActive(ID: number, Status: number, TrNo: number) {
//		 
//		SqlExecuteQuery(" update [dbo].[I_TR_Purchases] set [Status] = " + Status + " where [PurchaseID] = " + ID);
//		var Mod = Status == 0 ? "Open" : "Update";
//		SqlExecuteQuery("[G_ProcessTrans] " + CompCode + ",1,'PurInv','" + Mod + "'," + ID + "," + TrNo + ",0");
//		GetData(true, ID, Status);
//	}
//	function Print_Pdf(TrID: number ) {
//		var RepParam: Array<RepParamter>;
//		RepParam =
//			[
//			{ Parameter: 'TrID', Value: "" + TrID + "" },
//			]
//			Print_Report("Prnt_PurchasesAr", "IProc_Prnt_Purchases", RepParam);
//	}
//}
//# sourceMappingURL=ViewPurchases_Old.js.map