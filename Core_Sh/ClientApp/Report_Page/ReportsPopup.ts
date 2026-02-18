
$(document).ready(() => {
    ReportsPopup.InitalizeComponent();
});

namespace ReportsPopup {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _USER: Array<G_USERS> = new Array<G_USERS>();

 


    var _Print_Recoice: HTMLButtonElement;

    var ItemTotal = 0;
    var ItemCount = 0;
    var ReceiptID = 0;
    var ReceiptNote = 0;

    export function InitalizeComponent() { 
        $(".User" + _USER[0].USER_TYPE).removeClass('display_none');
        InitalizeControls();
        InitializeEvents();
           
        Display_Reports();

        Close_Loder();

    }
    function InitalizeControls() {

        _Print_Recoice = document.getElementById("_Print_Recoice") as HTMLButtonElement;

    }
    function InitializeEvents() {
        _Print_Recoice.onclick = _Print_Recoice_onclick;

    }
    function Display_Reports() {
         
        //let TafkeetArab = TafkeetArabValue(Number(_Rec.Amount.toFixed(2)))

        var ReportData = localStorage.getItem(GetParameterByName('App') + "Report_Data");

        var data_New: ReportParameters = JSON.parse(ReportData);
        if (ReportData != null) {


            let date = JSON.stringify(data_New);

            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("GeneralReports", "" + data_New.Name_function + ""),
                data: { rp: date },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {

                         
                        let Path = result.Response as string;

                        $('#printableArea').html("");
                        let x = Url.Action("OpenPdf", "Home");

                        let UrlPdf = x + "/" + "?" + "path=" + Path + "";

                        $('#printableAreaNew').attr("style", "direction: ltr!important;height: 90%;overflow: scroll;margin-right: 4%;width: 90%;  overflow: hidden; ");
                        $('#printableAreaNew').append('<iframe src="' + UrlPdf + '" frameBorder="0"scrolling="auto"height="100%" width="100%"></iframe>');


                    }
                }
            });
        }
    }
     
      
    function _Print_Recoice_onclick() {
        printDiv('Body_Print_Rec')
    }
}
