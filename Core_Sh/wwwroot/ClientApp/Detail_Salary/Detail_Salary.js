$(document).ready(function () {
    Detail_Salary.InitalizeComponent();
});
var Detail_Salary;
(function (Detail_Salary) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _GridSal = new JsGrid();
    var _SalaryList = new Array();
    var _Salarynone = new Array();
    var db_Month;
    var txtSearchSal;
    var Filter_ViewSal;
    var btnDelete_FilterSal;
    var _ModelProfile = new GQ_USERS();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    function InitalizeComponent() {
         ;
        _ModelProfile = GetModelGlopelDataProfile();
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        //$('#Txt_From_DateSal').val(DateStartMonth())
        //$('#Txt_To_DateSal').val(GetDate())
        var today = new Date();
        var mm = (today.getMonth() + 1).toString();
        if (Number(mm) < 10) {
            mm = ('0' + mm);
        }
        db_Month.value = mm;
        db_Month_onchange();
        DownloadFileExcel();
        Close_Loder();
    }
    Detail_Salary.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        db_Month = document.getElementById('db_Month');
        txtSearchSal = document.getElementById('txtSearchSal');
        Filter_ViewSal = document.getElementById('Filter_ViewSal');
        btnDelete_FilterSal = document.getElementById('btnDelete_FilterSal');
    }
    function InitializeEvents() {
        Filter_ViewSal.onclick = GetAllPeriodSalaryByUser;
        txtSearchSal.onkeyup = _SearchBox_Change;
        btnDelete_FilterSal.onclick = Clear;
        db_Month.onchange = db_Month_onchange;
    }
    function db_Month_onchange() {
        $('#Txt_From_DateSal').val(DateStartSetMonth(db_Month.value));
        $('#Txt_To_DateSal').val(GetLastDayOfMonth(db_Month.value));
        GetAllPeriodSalaryByUser();
    }
    function InitializeGrid() {
        _GridSal.ElementName = "_GridSal";
        //_GridSal.OnRowDoubleClicked = GridDoubleClick;
        _GridSal.PrimaryKey = "IDTrans";
        _GridSal.Paging = true;
        _GridSal.PageSize = 100;
        _GridSal.Sorting = true;
        _GridSal.InsertionMode = JsGridInsertionMode.Binding;
        _GridSal.Editing = false;
        _GridSal.Inserting = false;
        _GridSal.SelectedIndex = 1;
        _GridSal.OnItemEditing = function () { };
        _GridSal.Columns = [
            { title: "IDTrans", name: "IDTrans", type: "text", width: "100px", visible: false },
            { title: "RowNumber", name: "RowNumber", type: "Number", width: "100px" },
            //{ title: "NumPeriod", name: "CountUSERID", type: "Number", width: "100px" },
            //{
            //    title: "TrDate", css: "ColumPadding", name: "TrDate", width: "120px",
            //    itemTemplate: (s: string, item: IQ_GetSlsInvoiceStatisticVer2): HTMLLabelElement => {
            //        let txt: HTMLLabelElement = document.createElement("label");
            //        txt.innerHTML = DateFormat(item.TrDate);
            //        return txt;
            //    }
            //},
            //{ title: "NameUser", name: "Name_User", type: "text", width: "150px" },
            {
                title: "Salary", css: "Salary", name: "Salary", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.Salary <= 0) {
                        txt.style.color = "Red";
                    }
                    else {
                        txt.style.color = "Green";
                    }
                    txt.innerHTML = Digits(item.Salary, 1);
                    return txt;
                }
            },
            {
                title: "Detail", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Detail");
                    txt.style.backgroundColor = "chocolate";
                    txt.id = "butView" + item.IDTrans;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    //if (item.Salary <= 0) {
                    //    txt.disabled = true;
                    //}
                    txt.onclick = function (e) {
                        ViewDetailSalary(item.CountUSERID);
                    };
                    return txt;
                }
            },
        ];
        _GridSal.Bind();
    }
    function DownloadFileExcel() {
        GnrGridDownloadExcel(function () {
            var keyMapping = {
                TrNo: 'TrNo',
                CreatedBy: 'Created By',
                TrDate: 'TrDate',
                VoucherNo: 'Journal No',
                IsCash: 'IsCash',
                From_ACC_DESCA: 'From Account',
                ACC_DESCA: 'To Account',
                Remark: 'Remark',
                Amount: 'Amount',
            };
            ConvertModelToFileExcel('ListVoucher', _GridSal.DataSource, keyMapping);
        });
    }
    function _SearchBox_Change() {
        $("#_GridSal").jsGrid("option", "pageIndex", 1);
        if (txtSearchSal.value != "") {
             ;
            var search_1 = txtSearchSal.value.toLowerCase();
            var SearchDetails = _SalaryList.filter(function (x) { return x.Salary.toString().search(search_1) >= 0; });
            _GridSal.DataSource = SearchDetails;
            _GridSal.Bind();
        }
        else {
            _GridSal.DataSource = _SalaryList;
            _GridSal.Bind();
        }
    }
    function GetAllPeriodSalaryByUser() {
         ;
        CleaningList_Table();
        $("#_GridSal").jsGrid("option", "pageIndex", 1);
        var From_Date = DateFormat($('#Txt_From_DateSal').val());
        var To_Date = DateFormat($('#Txt_To_DateSal').val());
        var Qurey = "IProc_GetAllPeriodSalaryByUser " + CompCode + "," + _ModelProfile.ID + ",N'" + From_Date + "',N'" + To_Date + "'";
        var DataRes = GetDataFromProc(Qurey, "IProc_GetAllPeriodSalaryByUser");
        var _SalaryList = DataRes;
        //**************************************************************************************************************
         ;
        _SalaryList = _SalaryList.sort(dynamicSort("CountUSERID"));
        $('#btnDelete_FilterSal').removeClass('display_none');
        var TotalSalary = SumValue(_SalaryList, "Salary", 1);
        $('#Txt_TotalSalary').val(TotalSalary);
        _GridSal.DataSource = _SalaryList;
        _GridSal.Bind();
    }
    function Clear() {
        $('#Txt_From_DateSal').val(DateStartMonth());
        $('#Txt_To_DateSal').val(GetDate());
        $('#btnDelete_FilterSal').addClass('display_none');
        CleaningList_Table();
        _GridSal.DataSource = _Salarynone;
        _GridSal.Bind();
    }
    function ViewDetailSalary(PeriodSalary) {
        localStorage.setItem(GetParameterByName('App') + "PeriodSalary", PeriodSalary.toString());
        OpenPagePartial("Info_Salary", "( Info Salary )", function () { Display_Refrsh(); });
        //var RepParam: Array<RepParamter>;
        //RepParam =
        //    [
        //        { Parameter: 'comp', Value: "" + CompCode + "" },
        //        { Parameter: 'ID', Value: "" + _ModelProfile.ID + "" },
        //        { Parameter: 'PeriodSalary', Value: "" + PeriodSalary + "" },
        //    ]
        //Print_Report("Detail_Salary", "ES_GetAllInformationBalByUser", RepParam);
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
    }
})(Detail_Salary || (Detail_Salary = {}));
//# sourceMappingURL=Detail_Salary.js.map