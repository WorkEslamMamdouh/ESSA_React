
$(document).ready(() => {
    try {

        Layout.InitalizeComponent();
    } catch (e) {
        //window.open(Url.Action("HomePage", "Login"), "_self");

    }
});

namespace Layout {
    var sys: SystemTools = new SystemTools();


    var Back_Page: HTMLButtonElement;


    export function InitalizeComponent() {
         
        //GetAllPages();
        ChangeLang();
        //GetAllResources();        
        Clean_AllPages();
        GetPagesLogin_Home();
        InitalizeControls();
        InitializeEvents();


        //setInterval(RunAlSarunah, 15000)

        //setInterval(RunInsertLogUser, 50000) 

        ////setInterval(Run_Trigger, 10000)
        setInterval(Close_Loder, 5000)
         
        
         
    }


  
    function RunAlSarunah() {
        $('#Photo_Logo_').removeClass("animate__animated animate__flip")
        $('#Photo_Logo_').addClass("animate__animated animate__zoomInRight")

        $('#UserName').addClass("animate__animated animate__rubberBand")

        $('#Lab_AlSarunah').removeClass("animate__animated animate__fadeInUpBig")
        $('#Lab_AlSarunah').addClass("animate__animated animate__hinge")

        setTimeout(function () {

            $('#UserName').removeClass("animate__animated animate__rubberBand")

            $('#Lab_AlSarunah').removeClass("animate__animated animate__hinge")
            $('#Lab_AlSarunah').addClass("animate__animated animate__fadeInUpBig")

            $('#Photo_Logo_').removeClass("animate__animated animate__zoomInRight")
            $('#Photo_Logo_').addClass("animate__animated animate__flip")
        }, 2000);


    }

    function InitalizeControls() {
        Back_Page = document.getElementById("Back_Page") as HTMLButtonElement;
    }
    function InitializeEvents() {

        Back_Page.onclick = Back_Page_Partial;

    }




}
