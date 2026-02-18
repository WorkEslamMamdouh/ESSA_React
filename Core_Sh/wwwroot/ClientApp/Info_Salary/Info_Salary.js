$(document).ready(function () {
    Info_Salary.InitalizeComponent();
});
var Info_Salary;
(function (Info_Salary) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid_Info = new JsGrid();
    var _SalaryList = new Array();
    var _ModelProfile = new GQ_USERS();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var PeriodSalary;
    function InitalizeComponent() {
         ;
        _ModelProfile = GetModelGlopelDataProfile();
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        PeriodSalary = Number(localStorage.getItem(GetParameterByName('App') + "PeriodSalary"));
        GetAllPeriodSalaryByUser();
        DownloadFileExcel();
        Close_Loder();
    }
    Info_Salary.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitializeEvents() {
    }
    function InitializeGrid() {
        _Grid_Info.ElementName = "_Grid_Info";
        //_Grid_Info.OnRowDoubleClicked = GridDoubleClick;
        _Grid_Info.PrimaryKey = "IDTrans";
        _Grid_Info.Paging = true;
        _Grid_Info.PageSize = 100;
        _Grid_Info.Sorting = true;
        _Grid_Info.InsertionMode = JsGridInsertionMode.Binding;
        _Grid_Info.Editing = false;
        _Grid_Info.Inserting = false;
        _Grid_Info.SelectedIndex = 1;
        _Grid_Info.OnItemEditing = function () { };
        _Grid_Info.Columns = [
            {
                title: "Ser", css: "ColumPadding", name: "Ser", width: "50px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = item.IDTrans.toString();
                    return txt;
                }
            },
            {
                title: "Date", css: "ColumPadding", name: "TrDate", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TrDate);
                    return txt;
                }
            },
            {
                title: "Remark", css: "ColumPadding", name: "Remark", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = item.Remark;
                    return txt;
                }
            },
            {
                title: "Amount", css: "ColumPadding", name: "Amount", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.Symbols == "Due") {
                        txt.style.color = "Green";
                    }
                    txt.innerHTML = Digits(item.Amount, 1);
                    return txt;
                }
            },
        ];
        _Grid_Info.Bind();
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
            ConvertModelToFileExcel('ListVoucher', _Grid_Info.DataSource, keyMapping);
        });
    }
    function GetAllPeriodSalaryByUser() {
         ;
        CleaningList_Table();
        $("#_Grid_Info").jsGrid("option", "pageIndex", 1);
        var Qurey = "ES_GetAllInformationBalByUser " + CompCode + "," + _ModelProfile.ID + "," + PeriodSalary + "";
        var DataRes = GetDataFromProc(Qurey, "ES_GetAllInformationBalByUser");
        var _SalaryList = DataRes;
        //**************************************************************************************************************
         ;
        _SalaryList = _SalaryList.sort(dynamicSortNew("CountUSERID"));
        $('#btnDelete_FilterSal').removeClass('display_none');
        for (var i = 0; i < _SalaryList.length; i++) {
            _SalaryList[i].IDTrans = i + 1;
             ;
            if ((i + 1) == _SalaryList.length) {
                _SalaryList[i].Symbols = "Due";
            }
        }
        _Grid_Info.DataSource = _SalaryList;
        _Grid_Info.Bind();
    }
})(Info_Salary || (Info_Salary = {}));
//# sourceMappingURL=Info_Salary.js.map