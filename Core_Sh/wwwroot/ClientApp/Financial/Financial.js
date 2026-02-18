$(document).ready(() => {
    Financial.InitalizeComponent();
});
var Financial;
(function (Financial) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var btnAdd;
    var Salary_Grid = new JsGrid();
    var Model = new I_TR_FinancialTransactions();
    var Res = GetGlopelResources();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var TrType;
    var Card_Type;
    var Financial_Type;
    var Txt_Amount;
    var Txt_CardPrc;
    var SearchTrans;
    var NameFunction = "Insert";
    var GlopID = 0;
    var UpdatedAt = "";
    var UpdatedBy = "";
    var Glopl_CreatedAt = "";
    var Glopl_CreatedBy = "";
    var Glopl_IDUserCreate = 0;
    var LoanAmount = 0;
    function InitalizeComponent() {
        debugger;
        InitalizeControls();
        InitializeEvents();
        $('#Txt_TrData').val(GetDate());
        InitializeSalary_Grid();
        if (localStorage.getItem(GetParameterByName('App') + "TypePage") == "1") {
            DisplayData();
        }
        else {
            GetData();
            Card_Type_onchange();
            Checked_ShowButton();
        }
        Close_Loder();
    }
    Financial.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnAdd = document.getElementById("btnAdd");
        SearchTrans = document.getElementById("SearchTrans");
        Card_Type = document.getElementById("Card_Type");
        Financial_Type = document.getElementById("Financial_Type");
        TrType = document.getElementById("TrType");
        Txt_CardPrc = document.getElementById("Txt_CardPrc");
        Txt_Amount = document.getElementById("Txt_Amount");
    }
    function InitializeEvents() {
        SearchTrans.onclick = BtnSearchTrans;
        btnAdd.onclick = Save;
        Card_Type.onchange = Card_Type_onchange;
        Financial_Type.onchange = Checked_ShowButton;
        Txt_Amount.onchange = Txt_Amount_onchange;
        Txt_CardPrc.onchange = Txt_Amount_onchange;
        TrType.onchange = GetData;
    }
    function InitializeSalary_Grid() {
        Salary_Grid.ElementName = "Salary_Grid";
        Salary_Grid.PrimaryKey = "Ser";
        Salary_Grid.Paging = true;
        Salary_Grid.PageSize = 15;
        Salary_Grid.Sorting = true;
        Salary_Grid.InsertionMode = JsGridInsertionMode.Binding;
        Salary_Grid.Editing = false;
        Salary_Grid.Inserting = false;
        Salary_Grid.SelectedIndex = 1;
        Salary_Grid.OnItemEditing = () => { };
        Salary_Grid.Columns = [
            { title: Res.Lang == "En" ? "Ser" : "الكود", name: "Ser", width: "100px" },
            { title: Res.Lang == "En" ? "DescA" : " الوصف  ", name: "DescA", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "Balance" : "المبلغ", name: "Balance", type: "text", width: "100px" },
            {
                title: Res.Lang == "En" ? "Pay" : "الدفع", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "number";
                    txt.id = "Pay" + item.Ser;
                    txt.className = "Clear_Header u-input u-input-rectangle";
                    txt.style.width = "100%";
                    txt.style.height = "100%";
                    txt.value = item.Amount.toString();
                    if (item.Ser == 3) {
                        $('#Txt_Amount').val(Number(txt.value));
                        let SumCus_Lon = Number($('#CustodyPayAmount').val()) + Number($('#LoanPayAmount').val());
                        $('#Txt_NetAmount').val((((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())) - SumCus_Lon).toFixed(2));
                    }
                    txt.onchange = (e) => {
                        if (item.Ser == 1) {
                            $('#CustodyPayAmount').val(Number(txt.value));
                        }
                        if (item.Ser == 2) {
                            $('#LoanPayAmount').val(Number(txt.value));
                        }
                        if (item.Ser == 3) {
                            $('#Txt_Amount').val(Number(txt.value));
                        }
                        let SumCus_Lon = Number($('#CustodyPayAmount').val()) + Number($('#LoanPayAmount').val());
                        $('#Txt_NetAmount').val((((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())) - SumCus_Lon).toFixed(2));
                    };
                    return txt;
                }
            },
        ];
        Salary_Grid.Bind();
    }
    function Change_Amount() {
        debugger;
        if (Number($('#Txt_RemainAmount').val()) != -1) {
            if (Number($('#Txt_Amount').val()) > Number($('#Txt_RemainAmount').val()) && Number($('#PurchaseID').val()) > 0) {
                Errorinput($('#Txt_Amount'), "😒The  amount is enough for .", " 😒مبلغ  اكبر من المبلغ المتبقي ");
                $('#Txt_Amount').val($('#Txt_RemainAmount').val());
            }
            else {
                let SumCus_Lon = Number($('#CustodyPayAmount').val()) + Number($('#LoanPayAmount').val());
                $('#Txt_NetAmount').val((((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())) - SumCus_Lon).toFixed(2));
            }
        }
    }
    function GetData() {
        var Table;
        Table =
            [
                { NameTable: 'D_A_FinancialType', Condition: " TrType = " + TrType.value + " and IsActive = 1 and CompCode =" + CompCode + "" },
                { NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },
            ];
        DataResult(Table);
        let FinTypes = GetDataTable('D_A_FinancialType');
        let CardType = GetDataTable('D_A_CashTypes');
        FillDropwithAttr(FinTypes, "Financial_Type", "FinancialTypeID", (Res.Lang == "Ar" ? "DescAr" : "DescEn"), "No", "Search", "SearchTypes");
        FillDropwithAttr(CardType, "Card_Type", "CashTypeID", (Res.Lang == "Ar" ? "Description" : "Description"), "No", "prc", "ChargePrc");
        Checked_ShowButton();
    }
    function DisplayData() {
        let data = GetModelGlopel();
        GlopID = data.TransactionID;
        TrType.value = data.TrType.toString();
        GetData();
        Card_Type_onchange();
        debugger;
        $('#TrNo').val(data.TrNo);
        $('#RefNo').val(data.RefNo);
        $('#Txt_TrData').val(DateFormat(data.TransactionDate));
        $('#Financial_Type').val(data.Type);
        $('#SearchTrans').val(data.TrNo_Ref);
        $('#PurchaseID').val(data.PurchaseID);
        $('#BeneficiaryName').val(data.BeneficiaryName);
        $('#Card_Type').val(data.CashTypeID);
        $('#Txt_Amount').val(data.Amount);
        $('#Txt_NetAmount').val(data.DueAmount);
        $('#Reason').val(data.Reason);
        $('#Txt_Remarks').val(data.Remarks);
        $('#LoanPayAmount').val(data.LoanPayAmount);
        $('#CustodyPayAmount').val(data.CustodyPayAmount);
        $('#Txt_CardPrc').val(data.ChargePrc);
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) != 6 && Number($('option:selected', $("#Financial_Type")).attr('data-Search')) != 7) {
            $('._SearchTrans').removeClass("display_none");
            $('#BeneficiaryName').attr("disabled", "disabled");
        }
        else {
            $('._SearchTrans').addClass("display_none");
            $('#BeneficiaryName').removeAttr("disabled");
        }
        //if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 5) {
        //	$('.Remain').removeClass("display_none")
        //	$('#Txt_Loan').val(data.Amount - data.DueAmount);
        //} else {
        //	$('.Remain').addClass("display_none")
        //	$('#Txt_Loan').val("0")
        //}
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 5) {
            $('#Txt_Amount').attr("disabled", "disabled");
            $('._Salary').removeClass("display_none");
            GetSalaryDetails(Number($('#PurchaseID').val()), data.TransactionID.toString());
            let SumCus_Lon = Number($('#CustodyPayAmount').val()) + Number($('#LoanPayAmount').val());
            $('#Txt_NetAmount').val((((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())) - SumCus_Lon).toFixed(2));
        }
        else {
            $('._Salary').addClass("display_none");
            $('#Txt_Amount').removeAttr("disabled");
            $('#LoanPayAmount').val('0');
            $('#CustodyPayAmount').val('0');
            let SumCus_Lon = Number($('#CustodyPayAmount').val()) + Number($('#LoanPayAmount').val());
            $('#Txt_NetAmount').val((((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())) - SumCus_Lon).toFixed(2));
        }
        UpdatedAt = GetDateAndTimeSql();
        UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
        Glopl_CreatedAt = data.CreatedAt.toString();
        Glopl_CreatedBy = data.CreatedBy.toString();
        Glopl_IDUserCreate = data.IDUserCreate;
        NameFunction = "Update";
        localStorage.setItem(GetParameterByName('App') + "TypePage", "0");
    }
    //*********************************************************************************************** 
    function Checked_ShowButton() {
        $('#PurchaseID').val(0);
        $('#SearchTrans').val("Search");
        $('#BeneficiaryName').val("");
        $('#Txt_RemainAmount').val(0);
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) != 6 && Number($('option:selected', $("#Financial_Type")).attr('data-Search')) != 0 && Number($('option:selected', $("#Financial_Type")).attr('data-Search')) != 7) {
            $('._SearchTrans').removeClass("display_none");
            $('#BeneficiaryName').attr("disabled", "disabled");
        }
        else {
            $('._SearchTrans').addClass("display_none");
            $('#BeneficiaryName').removeAttr("disabled");
        }
        $('#Txt_CardPrc').val($('option:selected', $("#Card_Type")).attr('data-prc'));
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 5) {
            $('._Salary').removeClass("display_none");
            $('#Txt_Amount').attr("disabled", "disabled");
        }
        else {
            $('._Salary').addClass("display_none");
            $('#Txt_Amount').removeAttr("disabled");
            $('#LoanPayAmount').val('0');
            $('#CustodyPayAmount').val('0');
            let SumCus_Lon = Number($('#CustodyPayAmount').val()) + Number($('#LoanPayAmount').val());
            $('#Txt_NetAmount').val((((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())) - SumCus_Lon).toFixed(2));
        }
        debugger;
        let Tyep = $('#Financial_Type option:selected').text().trim();
        SearchTrans.value = Res.Lang == "En" ? ('Search' + ' ' + Tyep) : ('بحث' + ' ' + Tyep);
    }
    function Card_Type_onchange() {
        //$('#Txt_CardPrc').val($('option:selected', $("#Card_Type")).attr('data-prc'));
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 5) {
            $('#Txt_Amount').attr("disabled", "disabled");
            $('._Salary').removeClass("display_none");
            GetSalaryDetails(Number($('#PurchaseID').val()), "null");
        }
        else {
            $('#Txt_Amount').removeAttr("disabled");
            $('._Salary').addClass("display_none");
            $('#LoanPayAmount').val('0');
            $('#CustodyPayAmount').val('0');
            let SumCus_Lon = Number($('#CustodyPayAmount').val()) + Number($('#LoanPayAmount').val());
            $('#Txt_NetAmount').val((((Number($('#Txt_CardPrc').val()) * Number($('#Txt_Amount').val()) / 100) + Number($('#Txt_Amount').val())) - SumCus_Lon).toFixed(2));
        }
    }
    function Txt_Amount_onchange() {
        Change_Amount();
        Card_Type_onchange();
    }
    function BtnSearchTrans() {
        debugger;
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 1) { // سداد فاتورة عميل
            //sys.FindKeySpeed("Invoices", " CompCode = " + CompCode + "  and Status = 1 and IsCash = false and RemainAmount != 0 and  TrType =  0 ", 'SearchForm', () => {
            sys.FindKeyPagination("Invoices", "InvoiceNo", " CompCode = " + CompCode + "  and Status = 1  and  TrType =  0 and IsCash = 0  and RemainAmount <> 0 ", () => {
                let SelectedItem = SelectDataSearch.DataRow;
                //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
                debugger;
                $('#PurchaseID').val(SelectedItem.SaleID);
                $('#SearchTrans').val(SelectedItem.TrNo);
                $('#BeneficiaryName').val(SelectedItem.CustomerName);
                $('#Txt_RemainAmount').val(SelectedItem.RemainAmount);
                Txt_Amount_onchange();
            });
        }
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 2) { // سداد فاتورة مورد
            //sys.FindKeySpeed("Pur", " CompCode = " + CompCode + "  and Status = 1  and IsCash = false and  TrType =  0  and RemainAmount > 0", 'SearchForm', () => {
            sys.FindKeyPagination("Pur", "Pur", " CompCode = " + CompCode + "  and Status = 1  and IsCash = 0 and  TrType =  0 and RemainAmount > 0 ", () => {
                let SelectedItem = SelectDataSearch.DataRow;
                //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
                $('#PurchaseID').val(SelectedItem.PurchaseID);
                $('#SearchTrans').val(SelectedItem.TrNo);
                $('#BeneficiaryName').val(SelectedItem.SupplierName);
                $('#Txt_RemainAmount').val(SelectedItem.RemainAmount);
                Txt_Amount_onchange();
            });
        }
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 3) { // قبض من عميل
            //sys.FindKeySpeed("Customer", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', function () {
            sys.FindKeyPagination("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
                let SelectedItem = SelectDataSearch.DataRow;
                //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
                debugger;
                $('#PurchaseID').val(SelectedItem.CustomerId);
                $('#SearchTrans').val(SelectedItem.CustomerId);
                $('#BeneficiaryName').val(SelectedItem.NAMEA);
                $('#Txt_RemainAmount').val(-1);
                Txt_Amount_onchange();
            });
        }
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 4) { // صرف لمورد
            //sys.FindKeySpeed("Supplier", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', function () {
            sys.FindKeyPagination("Supplier", "btnSupplier", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
                let SelectedItem = SelectDataSearch.DataRow;
                //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
                $('#PurchaseID').val(SelectedItem.SupplierID);
                $('#SearchTrans').val(SelectedItem.SupplierID);
                $('#BeneficiaryName').val(SelectedItem.SupplierName);
                $('#Txt_RemainAmount').val(-1);
                Txt_Amount_onchange();
            });
        }
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 5 || Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 8 || Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 9
            || Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 10 || Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 11) { //   لموظف
            //sys.FindKeySpeed("Employees", " CompCode = " + CompCode + "  and Status = 1  ", 'SearchForm', function () {
            sys.FindKeyPagination("Employees", "BtnEmployees", " CompCode = " + CompCode + "  and Status = 1    ", () => {
                let SelectedItem = SelectDataSearch.DataRow;
                //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
                $('#PurchaseID').val(SelectedItem.EmpID);
                $('#SearchTrans').val(SelectedItem.EmpID);
                $('#BeneficiaryName').val(SelectedItem.Emp_Name);
                $('#Txt_RemainAmount').val(-1);
                debugger;
                if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 5) {
                    $('#Txt_Amount').attr("disabled", "disabled");
                    GetSalaryDetails(Number($('#PurchaseID').val()), "null");
                }
                else {
                    $('#Txt_Amount').removeAttr("disabled");
                }
                //Txt_Amount_onchange();
            });
        }
    }
    function GetSalaryDetails(EmpID, TransactionID) {
        debugger;
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) == 5) {
            debugger;
            $('._Salary').removeClass("display_none");
            let Getloan = new Array();
            Getloan = GetDataFromProc("IProc_Z_GetSalaryDetailsEmployee  " + CompCode + " ,  " + EmpID + "  , " + TransactionID + "   ", "IProc_Z_GetSalaryDetailsEmployee");
            if (Getloan.length > 0) {
                $('.Remain').removeClass("display_none");
                $('._Salary').removeClass("display_none");
                Salary_Grid.DataSource = Getloan;
                Salary_Grid.Bind();
            }
            else {
                $('._Salary').addClass("display_none");
                $('.Remain').addClass("display_none");
            }
        }
    }
    //*********************************************************************************************** 
    function Validtion() {
        if (!SysSession.CurrentPrivileges.CREATE) {
            ShowMessage(" Not Privilege Create 😒", " لا يوجد صلاحية الانشاء 😒");
            return false;
        }
        if ($('#RefNo').val().trim() == '') {
            Errorinput($('#RefNo'), "Please Enter RefNo 🤨", "برجاء ادخال المرجع 🤨");
            return false;
        }
        if (!$('._SearchTrans').is(":hidden")) {
            if (Number($('#PurchaseID').val()) == 0) {
                Errorinput($('#SearchTrans'), "Please Select  Beneficiary 🤨", "برجاء اختيار المستفيد 🤨");
                return false;
            }
        }
        if ($('#Txt_TrData').val().trim() == '') {
            Errorinput($('#Txt_TrData'), "Please Enter date 🤨", "برجاء ادخال تاريخ 🤨");
            return false;
        }
        if ($('#BeneficiaryName').val().trim() == "") {
            Errorinput($('#BeneficiaryName'), "Please Enter Beneficiary Name 🤨", "برجاء ادخال اسم المستفيد 🤨");
            return false;
        }
        if (Number($('#Txt_Amount').val()) == 0) {
            Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨", "برجاء ادخال المبلغ 🤨");
            return false;
        }
        if (Number($('option:selected', $("#Financial_Type")).attr('data-Search')) != 5 && Number($('#Txt_NetAmount').val()) <= 0) {
            Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨", "برجاء ادخال المبلغ 🤨");
            return false;
        }
        if ($('#Reason').val().trim() == "") {
            Errorinput($('#Reason'), "Please Enter Reason For payment 🤨", "برجاء ادخال سبب الصرف 🤨");
            return;
        }
        if ($('#Txt_Remarks').val().trim() == "") {
            Errorinput($('#Txt_Remarks'), "Please Enter Remarks 🤨", "برجاء ادخال الملاحظات 🤨");
            return;
        }
        return true;
    }
    function Assign() {
        Model = new I_TR_FinancialTransactions();
        Model.TrType = Number(TrType.value);
        Model.TransactionID = GlopID;
        Model.TrNo = Number($('#TrNo').val());
        Model.RefNo = ($('#RefNo').val().trim());
        Model.TransactionDate = DateFormatddmmyyyy($('#Txt_TrData').val());
        Model.TrNo_Ref = Number($('#SearchTrans').val());
        Model.Type = Number($('#Financial_Type').val());
        Model.PurchaseID = Number($('#PurchaseID').val()) == 0 ? null : Number($('#PurchaseID').val());
        Model.BeneficiaryName = ($('#BeneficiaryName').val().trim());
        Model.IsCash = true;
        Model.CashTypeID = Number($('#Card_Type').val());
        Model.ChargePrc = Number($('#Txt_CardPrc').val());
        Model.Amount = Number($('#Txt_Amount').val());
        Model.DueAmount = Number($('#Txt_NetAmount').val());
        Model.Reason = ($('#Reason').val().trim());
        Model.Remarks = ($('#Txt_Remarks').val().trim());
        Model.LoanPayAmount = Number($('#LoanPayAmount').val());
        Model.CustodyPayAmount = Number($('#CustodyPayAmount').val());
        Model.CompCode = CompCode;
        if (NameFunction == "Insert") {
            Model.CreatedAt = GetDateAndTimeSql();
            Model.CreatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
            Model.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
        }
        else {
            Model.CreatedAt = Glopl_CreatedAt;
            Model.CreatedBy = Glopl_CreatedBy;
            Model.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
            Model.UpdatedAt = GetDateAndTimeSql();
            Model.UpdatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
        }
        Model.Status = SysSession.CurrentPrivileges.CUSTOM3 == true ? 1 : 0;
    }
    function Save() {
        if (!Validtion()) {
            return;
        }
        Assign();
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("Receipt", NameFunction),
            data: JSON.stringify({ DataSend: JSON.stringify(Model) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
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
})(Financial || (Financial = {}));
//# sourceMappingURL=Financial.js.map