$(document).ready(() => {
    Valid_Code.InitalizeComponent();
});
var Valid_Code;
(function (Valid_Code) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var _UsersList = new Array();
    var _Usersnone = new Array();
    var txtSearch;
    var Filter_View;
    var btnDelete_Filter;
    function InitalizeComponent() {
        GetCode();
        Close_Loder();
    }
    Valid_Code.InitalizeComponent = InitalizeComponent;
    function GetCode() {
        var Table;
        Table =
            [
                { NameTable: 'I_Control', Condition: " CompCode = 1 " },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        let list = GetDataTable('I_Control');
        $("#IDVaild_Code").html(list[0].InvoiceTransCode);
        CopyToValue(list[0].InvoiceTransCode);
        ShowMessage('Copy Code ( ' + list[0].InvoiceTransCode + ' ) ✅', 'نسخ الكود ( ' + list[0].InvoiceTransCode + ' ) ✅');
    }
})(Valid_Code || (Valid_Code = {}));
//# sourceMappingURL=Valid_Code.js.map