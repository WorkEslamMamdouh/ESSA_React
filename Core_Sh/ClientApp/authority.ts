$(document).ready(() => {
    authority.InitalizeComponent();
})

namespace authority {
    var btnLogin: HTMLButtonElement;
    var txtUsername: HTMLInputElement;
    var txtPassword: HTMLInputElement;
    var btnLogout: HTMLButtonElement;

    export function InitalizeComponent() {
        //try auto login 
        //01- get client user, check in database if exist and valid (set session and go to open system)
        // if not exist (go to login page) 

        //when open login page (
        //check user, pass in domain (check is active on domain and loacal database)
        //*if exist login 
        //*not exist 
        //check in database user, pass 
        //*if ok open system 
        //*not ok show user msg you have no acces  )

        btnLogin = document.getElementById("btnLogin") as HTMLButtonElement;
        txtUsername = document.getElementById("txtUsername") as HTMLInputElement;
        txtPassword = document.getElementById("txtPassword") as HTMLInputElement;
        btnLogout = document.getElementById("btnLogout") as HTMLButtonElement;
        btnLogin.onclick = AutoLogin;
        try {
        btnLogout.onclick = Logout;

        } catch (e) {

        }

    }
    function Logout() {
        $.ajax(
            {
                type: "GET",
                "url": Url.Action("Logout", "Home"),
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json'
                },
                cache: false,
                async: false,
                success: (d) => {
                     
                    if (d = "ok") {
                        window.open(Url.Action("LoginPage", "Home"), '_self');
                    }
                }
            }
        )
    }

    function AutoLogin() {
         
        if (IsNullOrEmpty(txtUsername.value.trim())) {
            alert("Please enter valid user");
            return;
        }

        if (IsNullOrEmpty(txtPassword.value.trim())) {
            alert("Please enter valid password");
            return;
        }

        let _Uri: string = Url.Action("Login", "Home");

        //var settings = {
        //    "url": "https://localhost:44383/Home/Login?Username=55&Password=66",
        //    "method": "POST",
        //    "timeout": 0,
        //};

        //$.ajax(settings).done(function (response) {
        //    console.log(response);
        //});

        $.ajax(
            {
                type: "GET",
                "url": _Uri,
                data: { Username: txtUsername.value.trim(), Password: txtPassword.value.trim() },
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json'
                },
                cache: false,
                async: false,
                success: (d) => {
                     
                    if (d = "ok") {
                         
                        window.open(Url.Action("Index", "Home"), '_self');
                        //$.ajax.call({
                        //    "url": Url.Action("Index", "Home"),
                        //})
                    }
                    //alert(d);
                }
            }
        )
    }

}