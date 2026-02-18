
$(document).ready(() => {
	PagesInMenu.InitalizeComponent();


});

namespace PagesInMenu {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	 
	var Res: SystemResources = GetGlopelResources();

	export function InitalizeComponent() {
		   
		InitalizeControls();
		InitializeEvents();

		ApplyModules_Page_In_MENU(localStorage.getItem(GetParameterByName('App') + "NameMenu"));

		 LayOutOfApp()
		Close_Loder(); 
							    
	}
	function LayOutOfApp() {	
		var FlagShowPrice = false;
		var FlagJobOrder = false;
		var FlagPOS = false;
		var FlagItem = 0;

		FlagShowPrice = SysSession.CurrentEnvironment.I_Control.Is_ShowPrice;
		FlagJobOrder = SysSession.CurrentEnvironment.I_Control.Is_JobOrder;
		FlagPOS = SysSession.CurrentEnvironment.I_Control.IS_POS;
		FlagItem = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items;

		if (FlagShowPrice == true) {
			$('#ShowPrice').removeClass("display_none");
			$('#ViewShowPrice').removeClass("display_none");
		} else {
			$('#ShowPrice').addClass("display_none");
			$('#ViewShowPrice').addClass("display_none");

		}
		 
		if (FlagJobOrder == true) {
			$('#JobOrder').removeClass("display_none");
			$('#ViewJobOrder').removeClass("display_none");

		} else {
			$('#JobOrder').addClass("display_none");
			$('#ViewJobOrder').addClass("display_none");
		}
		 

		if (FlagItem == 2) {
			$('#ItemFamily').addClass("display_none");
			$('#Category').addClass("display_none");
			$('#Units').addClass("display_none");
			$('#Tables').addClass("display_none");
		}
		else if (FlagItem == 3) {
			$('#ItemFamily').removeClass("display_none");
			$('#Category').removeClass("display_none");
			$('#Units').addClass("display_none");
			$('#Tables').addClass("display_none");
		}
		else {
			$('#ItemFamily').removeClass("display_none");
			$('#Category').removeClass("display_none");
			$('#Units').removeClass("display_none");
		}	



		if (FlagPOS == true) {
			$('#View_Period').removeClass("display_none");
			$('#TR_Sales').removeClass("display_none");
			$('#ViewSales').removeClass("display_none");
			$('#CloseDay').removeClass("display_none");

			//$('#Tax_Sales').addClass("display_none");
			//$('#Tax_ViewSales').addClass("display_none");
			//$('#ShowPrice').addClass("display_none");
			//$('#ViewShowPrice').addClass("display_none");
			//$('#ViewJobOrder').addClass("display_none");
			//$('#JobOrder').addClass("display_none");
			//$('#Customer').addClass("display_none");
			//$('#EditCustomer').addClass("display_none");
			//$('#Rep_AccountStatment').addClass("display_none");

		} else {
			$('#View_Period').addClass("display_none");
			$('#TR_Sales').addClass("display_none");
			$('#ViewSales').addClass("display_none");
		}

	}
	function InitalizeControls() { 
	}
	function InitializeEvents() {
		 
		//$('._MODULE_CODE_Page').click(function (e) {


		//	let scrollTop = $(document).scrollTop(); 

		//	localStorage.setItem(GetParameterByName('App') + "scrollTop_Page", scrollTop.toString())

		//	//-******************

		//	let _idBtn = $(this).attr('id');
		//	//let _NameScreen = $(this).attr('NameScreen');
		//	let _NameScreen = $('#' + _idBtn +' h6').html();

		//	$('.Layout_Home').removeClass('display_none');
		//	OpenPagePartial(_idBtn, _NameScreen , null , null , true);
		//});
		 
		 
	} 
}
