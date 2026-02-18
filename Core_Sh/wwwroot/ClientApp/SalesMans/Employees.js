$(document).ready(() => {
    Employees.InitalizeComponent();
});
var Employees;
(function (Employees) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var btnAdd;
    var Model = new G_Employees();
    var Res = GetGlopelResources();
    var EmpCode;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var NameFunction = "Insert";
    var EmpID = 0;
    var Status = 0;
    var UpdateAt = "";
    var UpdatedBy = "";
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            let data = GetModelGlopel();
            EmpID = data.EmpID;
            Status = data.Status;
            $('#EmpID').attr('disabled', 'disabled');
            $('#EmpCode').val(data.EmpCode);
            $('#EmpID').val(data.EmpID);
            $('#Emp_Name').val(data.Emp_Name);
            $('#Mobile').val(data.Mobile);
            $('#Remarks').val(data.Remarks);
            UpdateAt = GetDate();
            UpdatedBy = "";
            NameFunction = "Update";
            localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
        }
        Close_Loder();
    }
    Employees.InitalizeComponent = InitalizeComponent;
    function checkDuplicatedCode() {
        let Code = Number(EmpCode.value);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Employees", 'checkDuplicatedCode'),
            data: { CompCode: CompCode, EmpCode: Code },
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    let res = result.Response;
                    if (res > 0) {
                        Errorinput($('#EmpCode'), "The Employees code is already registered for another Employees. 😁", "😁 .كود المندوب مسجل مسبقا لمندوب اخر");
                        EmpCode.value = "";
                    }
                }
                else {
                }
            }
        });
    }
    function InitalizeControls() {
        EmpCode = document.getElementById('EmpCode');
        btnAdd = document.getElementById("btnAdd");
    }
    function InitializeEvents() {
        EmpCode.onchange = checkDuplicatedCode;
        btnAdd.onclick = Add_Employees;
    }
    function Add_Employees() {
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒");
            return;
        }
        if ($('#Emp_Name').val().trim() == '') {
            Errorinput($('#Emp_Name'), "Please Enter name of Sales Man 🤨", "برجاء ادخال اسم المندوب 🤨");
            return;
        }
        Model = new G_Employees();
        Model.EmpID = EmpID;
        Model.EmpCode = ($('#EmpCode').val());
        Model.Emp_Name = ($('#Emp_Name').val());
        Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        Model.Mobile = ($('#Mobile').val());
        Model.Remarks = ($('#Remarks').val());
        Model.Status = 1;
        Model.EmpType = 3;
        Model.CompCode = CompCode;
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("Employees", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    $('#Div_Header :Input').val('');
                    $('#Txt_TrData').val(GetDate());
                    ShowMessage("Done 🤞😉", "تم الحفظ 🤞😉");
                    $("#Display_Back_Page").click();
                    $('#Back_Page').click();
                    Close_Loder();
                }
                else {
                    ShowMessage("Error", "يوجد خطاء في الحفظ");
                    Close_Loder();
                }
            }
        });
    }
})(Employees || (Employees = {}));
//# sourceMappingURL=Employees.js.map