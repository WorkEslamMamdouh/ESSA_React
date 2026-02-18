
$(document).ready(() => {
	VeiwEmployeeManage.InitalizeComponent();

});
namespace VeiwEmployeeManage {

	var SysSession: SystemSession = GetSystemSession();
	var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	var _Grid: JsGrid = new JsGrid();

	var _Employeenone: Array<IQ_G_Employees> = new Array<IQ_G_Employees>();
	var EmpType: number;

	var EmpBack_View: HTMLButtonElement;

	var Res = GetGlopelResources();

	var limted_ManagerID = 0
	var glopManagerID = 0;
	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();
		InitializeGrid();

		if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
			EmpType = Number(localStorage.getItem(GetParameterByName('App') + "EmpType"))
			limted_ManagerID = Number(localStorage.getItem(GetParameterByName('App') + "limted_ManagerID"))
			localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
		}

		GetData();
		SelectPageNumber.PageNumber = 1;
		Close_Loder();
	}
	function InitalizeControls() {
		EmpBack_View = document.getElementById('EmpBack_View') as HTMLButtonElement;
	}
	function InitializeEvents() {
		EmpBack_View.onclick = () => { Back_View() };
	}
	function InitializeGrid() {
		_Grid.ElementName = "_Grid_Edit";
		_Grid.PrimaryKey = "EmpID";
		_Grid.Paging = true;
		//_Grid.PageSize = 10;
		_Grid.Sorting = true;
		_Grid.InsertionMode = JsGridInsertionMode.Binding;
		_Grid.Editing = false;
		_Grid.Inserting = false;
		_Grid.SelectedIndex = 1;
		_Grid.OnItemEditing = () => { };
		_Grid.Columns = [
			{ title: Res.Lang == "En" ? "EmpID" : "الكود", name: "EmpID", visible: false, type: "text", width: "100px" },
			{
				title: Res.Lang == "En" ? "Add a Team Member" : "ادراج موظف جديد",
				itemTemplate: (s: string, item: IQ_G_Employees): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "button";
					txt.value = (Res.Lang == "En" ? "Add a >>> " : " <<< ادراج");
					txt.id = "butAddEmp" + item.EmpID;
					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
					txt.style.backgroundColor = "cadetblue";

					let _ManagerID = Number($('#ManagerID' + 9).val())
					if (_ManagerID > 0) {
						txt.className = 'display_none'
					}

					if (!SysSession.CurrentPrivileges.CREATE) {
						txt.disabled = true
					}

					txt.onclick = (e) => {
						AddEmp(item);
					};
					return txt;
				}
			},
			{ title: Res.Lang == "En" ? "  Code" : "الكود", name: "EmpCode", type: "text", width: "100px" },
			{ title: Res.Lang == "En" ? "Name" : "الاسم  ", name: "Emp_Name", type: "text", width: "100px" },
			{ title: Res.Lang == "En" ? "Mobile" : "الموبيل", name: "Mobile", type: "text", width: "100px" },
			//{ title: Res.Lang == "En" ? "Remarks" : "الملاحظات", name: "Remarks", type: "text", width: "100px" },

			{
				title: Res.Lang == "En" ? "Active" : "نشط", width: "50px",
				itemTemplate: (s: string, item: IQ_G_Employees): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "checkbox";
					txt.id = "ChkView" + item.EmpCode;
					txt.className = "checkbox";
					txt.checked = item.Status == 1 ? true : false;
					txt.style.width = "50px"
					txt.style.height = "35px"
					//-------------------------Privileges-----------------------
					txt.disabled = true
					if (item.Status == 0 && SysSession.CurrentPrivileges.CUSTOM1) {
						txt.disabled = false
					}
					if (item.Status == 1 && SysSession.CurrentPrivileges.CUSTOM2) {
						txt.disabled = false
					}
					//----------------------------------------------------------

					txt.onclick = (e) => {
						Status(item.EmpID, txt.checked, item.ManagerID);
					};

					return txt;
				}
			},
			{
				title: Res.Lang == "En" ? "View Profile" : "الملف الشخصي",
				itemTemplate: (s: string, item: IQ_G_Employees): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "button";
					txt.value = (Res.Lang == "En" ? "View Profile" : "الملف الشخصي");
					txt.id = "butViewProfile" + item.EmpID;
					txt.className = "Style_Add_Item u-btn u-btn-info u-input u-input-rectangle";
					txt.style.backgroundColor = "chocolate";


					if (!SysSession.CurrentPrivileges.VIEW) {
						txt.disabled = true
					}


					txt.onclick = (e) => {
						ViewProfile(item);
					};

					return txt;
				}
			},
			{
				title: Res.Lang == "En" ? "Edit" : "تعديل",
				itemTemplate: (s: string, item: IQ_G_Employees): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "button";
					txt.value = (Res.Lang == "En" ? "Edit" : "تعديل" + " ⚙️");
					txt.id = "butView" + item.EmpID;
					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";




					if (!SysSession.CurrentPrivileges.EDIT) {
						txt.disabled = true
					}


					txt.onclick = (e) => {
						ViewUser(item);
					};
					return txt;
				}
			},
			{
				title: Res.Lang == "En" ? "View Team" : "عرض فريق العمل",
				itemTemplate: (s: string, item: IQ_G_Employees): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "button";
					txt.value = (Res.Lang == "En" ? "View Team" : "عرض فريق العمل");
					txt.id = "butViewTeam" + item.EmpID;
					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
					txt.style.backgroundColor = "crimson";

					if (!SysSession.CurrentPrivileges.VIEW) {
						txt.disabled = true
					}

					txt.onclick = (e) => {

						GetData(false, item.EmpID)

						SetLastValueManagerID(item.EmpID)
					};
					return txt;
				}
			},
			{
				title: Res.Lang == "En" ? "Create User 👤" : " 👤إنشاء مستخدم",
				itemTemplate: (s: string, item: IQ_G_Employees): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "button";
					txt.value = (Res.Lang == "En" ? "Create User 👤" : "إنشاء مستخدم👤");
					txt.id = "butViewTeam" + item.EmpID;
					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
					txt.style.backgroundColor = "#147fed";


					txt.disabled = item.IsUser == true ? true : false;	    

					txt.onclick = (e) => {

						CreateUser(item.EmpID, 0, item.CompCode, item.User_Login, item.Password_Login, item.Email)
					};
					return txt;
				}
			},

		];
		_Grid.Bind();

	}
	function CreateUser(EmpID: number, RoleID: number, CompCode: number, User_Login: string, Password_Login: string, Email: string) {

		if (User_Login == null || User_Login == "") {
			Errorinput("", "This Employee without User Name To login Update him and Generte User Again", "هذا الموظف بدون اسم مستخدم قم بتعديله ثم الرجوع لانشاء مستخدم"); 
		}
		else if (Password_Login == null || Password_Login == "") {
			Errorinput("", "This Employee without Password To login Update him and Generte User Again 🤨", "هذا الموظف بدون رمز دخول قم بتعديله ثم الرجوع لانشاء مستخدم 🤨");

		}
		else if (Email == null || Email == "") {
			Errorinput("", "This Employee without Email To reset Password Update him and Generte User Again 🤨", "هذا الموظف بدون ايميل لاسترجاع رمز الدخول في حال نسيانه قم بتعديله ثم الرجوع لانشاء مستخدم 🤨");		   
		}
		else {
			var Res = SqlExecuteQuery("G_CreateUserEmployee " + EmpID + " , " + RoleID + " , " + CompCode + " ");
			console.log(Res);
			Display_Refrsh();
		}

	}
	function AddEmp(item: IQ_G_Employees) {

		$("#Open").focus();
		localStorage.setItem(GetParameterByName('App') + "TypePage", "3");
		localStorage.setItem(GetParameterByName('App') + "EmpType", EmpType.toString());
		SetModelGlopel(item)
		OpenPagePartial("Employees", "ViewEmployees", () => { Display_Refrsh() });

	}

	function ViewUser(item: IQ_G_Employees) {

		$("#Open").focus();
		localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
		SetModelGlopel(item)
		OpenPagePartial("Employees", "ViewEmployees", () => { Display_Refrsh() });

	}

	function ViewProfile(item: IQ_G_Employees) {

		$("#Open").focus();
		localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
		SetModelGlopel(item)
		OpenPagePartial("Wallet", "View Profile", () => { Display_Refrsh() });

	}

	function GetData(ISDirect: boolean = false, ManagerID: number = 0) {
		debugger
		Show_Loder();

		setTimeout(function () {



			glopManagerID = ManagerID

			if (!SysSession.CurrentPrivileges.VIEW) {
				ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
				return
			}
			CleaningList_Table();
			let con = "";
			debugger
			if (ISDirect) {
				DisplayDirectPagination(_Grid, 'IQ_G_Employees', "CompCode = " + CompCode + " and  EmpType = " + EmpType + " and isnull(ManagerID,0) = " + ManagerID + " " + con, SelectPageNumber.PageNumber, 5, "EmpID")
			}
			else {
				DisplayGridByPagination(_Grid, 'IQ_G_Employees', "CompCode = " + CompCode + "and  EmpType = " + EmpType + "  and isnull(ManagerID,0) = " + ManagerID + " " + con, 1, 5, "EmpID")
			}

			Close_Loder();
		}, 0.5);

	}

	function Back_View() {
		debugger
		let ManagerID = GetLastValueManagerID();
		debugger
		GetData(false, ManagerID);
	}
	function GetLastValueManagerID(): number {
		debugger
		for (var i = 0; i < 10; i++) {

			let ManagerID = Number($('#ManagerID' + i).val())

			if (ManagerID == i && i == 0) {
				$('#EmpBack_View').addClass('display_none')
			}
			else {
				$('#EmpBack_View').removeClass('display_none')
			}


			if (ManagerID == 0) {

				let Mang = Number($('#ManagerID' + (i - 2)).val() ?? 0)
				$('#ManagerID' + (i - 1)).val('0')


				ManagerID = Number($('#ManagerID' + (i - 1)).val())

				if (Mang == limted_ManagerID) {
					$('#EmpBack_View').addClass('display_none')
				}
				else {
					$('#EmpBack_View').removeClass('display_none')
				}

				return Mang
			}
		}

		return 0

	}

	function SetLastValueManagerID(ManagerID: number) {

		for (var i = 0; i < 10; i++) {
			let _ManagerID = Number($('#ManagerID' + i).val())

			if (ManagerID == i && i == 0) {
				$('#EmpBack_View').addClass('display_none')
			}
			else {
				$('#EmpBack_View').removeClass('display_none')
			}

			if (_ManagerID == 0) {
				$('#ManagerID' + i).val(ManagerID)
				return
			}
		}

	}

	var Run_Fun = false;
	function Display_Refrsh() {
		if (!Run_Fun) {
			Run_Fun = true;
			return
		}
		GetData(true, glopManagerID);
	}
	function Status(ID: number, Status: boolean, ManagerID: number) {
		let stat = Status == true ? 1 : 0;
		SqlExecuteQuery(" update [dbo].[G_Employees] set [Status] = " + stat + " where [EmpID] = " + ID + " ; update G_Data_Redis set Status = 0 where KeyTrigger = 'Employee' ")

		GetData(true, ManagerID);

		ShowMessage("Change Status 😊", 'تغير الحاله  😊')
	}
}
