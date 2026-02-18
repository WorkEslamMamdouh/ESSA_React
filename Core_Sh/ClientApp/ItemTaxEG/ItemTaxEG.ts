
$(document).ready(() => {
    ItemTaxEG.InitalizeComponent();
});
namespace ItemTaxEG {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var Grid: ESGrid = new ESGrid();
     var ModelMaster: D_I_ItemTaxEG = new D_I_ItemTaxEG();
    var _MasterDetails: MasterDetails = new MasterDetails();
     var Res: SystemResources = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);

    //var BackTap: HTMLButtonElement
     var SaveUpdate: HTMLButtonElement
    var ItemFamilyID: HTMLSelectElement
    var ISItem: HTMLInputElement;
    var IsService: HTMLInputElement;
    var flagItem = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items;
    var flagPOS = SysSession.CurrentEnvironment.I_Control.IS_POS;
    var NameFunction = "Insert";
    var GlopID = 0;
    var ViewPage = false;
    var IsActiv = false;

    export function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents(); 
        $('#ISActive').val("1")
        
        


        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            ViewPage = true;
            DisplayDataUpdate();
        }


       
        $('#TapMaster').removeClass('display_none')


       
        Close_Loder();
        
    }

    function DisplayDataUpdate() {
        $('#TapMaster').removeClass('display_none')


        debugger

        let data: D_I_ItemTaxEG = GetModelGlopel();


        GlopID = data.ItemTaxID;
        $('#ItemCode').val(data.itemCode)
        $('#codeName').val(data.codeName)
        $('#codeNameAr').val(data.codeNameAr)
        $('#Remarks').val(data.Remarks)
        $('#CodeType').val(data.codeType)
         
        
 
        
 
        NameFunction = "Update" 
        localStorage.setItem(GetParameterByName('App') + "TypePage", "0");

        let Listdata = GetDataFrom('D_I_ItemTaxEG', "ItemTaxID = " + data.ItemTaxID)

         
         
              
    }
    function InitalizeControls() {

        //BackTap = document.getElementById('BackTap') as HTMLButtonElement;
         SaveUpdate = document.getElementById('SaveUpdate') as HTMLButtonElement;
  
    }
    function InitializeEvents() {
        //BackTap.onclick = FunBackTap
         SaveUpdate.onclick = Finish
      }
       
     
    
    //function FunBackTap() {
    //    $('#TapMaster').removeClass('display_none')
 
          
    // }
    function Clear() {
        $('._Clear').val('')
         
         //FunBackTap();

    }
    function Validation() {

        

        if ($('#ItemCode').val().trim() == '') {
            Errorinput($('#ItemCode'), 'Must Enter ItemCode 😒', 'يجب إدخال رمز العنصر 😒')
            return false
        }
        if ($('#CodeType').val().trim() == '') {
            Errorinput($('#ItemCode'), 'Must Enter CodeType 😒', 'يجب إدخال رمز العنصر 😒')
            return false
        }

        if ($('#codeName').val().trim() == '') {
            Errorinput($('#codeName'), 'Must Enter ItemCode 😒', 'يجب إدخال رمز العنصر 😒')
            return false
        }

         

        return true

    }
    
    function Assign() {
        debugger
        ModelMaster = new D_I_ItemTaxEG();
        ModelMaster.ItemTaxID = GlopID;
        ModelMaster.COMP_CODE = CompCode;
        debugger
 
        ModelMaster.itemCode = $('#ItemCode').val().trim()
        ModelMaster.codeName = $('#codeName').val().trim()
        ModelMaster.codeNameAr = $('#codeNameAr').val().trim()
        ModelMaster.Remarks = $('#Remarks').val().trim()      
        ModelMaster.codeType = $('#CodeType').val().trim()      
      
         
        _MasterDetails.Master = ModelMaster
 
    }
    function Finish() {
        debugger
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒")
            return
        }

        if (!Validation()) {
            return
        }

        Save();
    }
    function Save() {
        Assign()
        debugger
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("ItemTaxEG", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(_MasterDetails) }),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    Clear()

                    $("#Display_Back_Page").click();
                    if (ViewPage) {      
                    $('#Back_Page').click();
					}

                    Close_Loder();
                    if (NameFunction == "Insert") {
                        ShowMessage("Inserted 🤞😉", "تم الاضافه 🤞😉");
                    }
                    else {
                        ShowMessage("Updated 🤞😉", "تم التعديل 🤞😉");
                    }

                    if (!IsService.checked) {
                        setTimeout(function () {
                            SqlExecuteQuery("exec G_UpdateAllStock");
                        }, 1000);
                    }

                } else {

                }
            }
        });

    }
 }
