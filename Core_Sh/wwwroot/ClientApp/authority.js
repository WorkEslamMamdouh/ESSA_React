$(document).ready(() => {
    authority.InitalizeComponent();
});
var authority;
(function (authority) {
    var btnLogin;
    var txtUsername;
    var txtPassword;
    var btnLogout;
    function InitalizeComponent() {
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
        btnLogin = document.getElementById("btnLogin");
        txtUsername = document.getElementById("txtUsername");
        txtPassword = document.getElementById("txtPassword");
        btnLogout = document.getElementById("btnLogout");
        btnLogin.onclick = AutoLogin;
        try {
            btnLogout.onclick = Logout;
        }
        catch (e) {
        }
    }
    authority.InitalizeComponent = InitalizeComponent;
    function Logout() {
        $.ajax({
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
        });
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
        let _Uri = Url.Action("Login", "Home");
        //var settings = {
        //    "url": "https://localhost:44383/Home/Login?Username=55&Password=66",
        //    "method": "POST",
        //    "timeout": 0,
        //};
        //$.ajax(settings).done(function (response) {
        //    console.log(response);
        //});
        $.ajax({
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
        });
    }
})(authority || (authority = {}));
//# sourceMappingURL=authority.js.map