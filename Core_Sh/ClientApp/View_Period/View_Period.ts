
$(document).ready(() => {
    View_Period.InitalizeComponent();

});

namespace View_Period {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _GridSal: JsGrid = new JsGrid();

    var _SalaryList: Array<IProc_GetAllSalaryPeriod> = new Array<IProc_GetAllSalaryPeriod>();
    var _Salarynone: Array<IProc_GetAllSalaryPeriod> = new Array<IProc_GetAllSalaryPeriod>();

    var db_Month: HTMLSelectElement;
    var txtSearchSal: HTMLInputElement;
    var Filter_ViewSal: HTMLButtonElement;
    var btnDelete_FilterSal: HTMLButtonElement;
    var butCloseDay: HTMLButtonElement;
    var Res: SystemResources = GetGlopelResources();

    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);

    var Frist = 0;
    var LastPeriod = 0;
    export function InitalizeComponent() {
         

        InitalizeControls();
        InitializeEvents();
        InitializeGrid();

        //$('#Txt_From_DateSal').val(DateStartMonth())
        //$('#Txt_To_DateSal').val(GetDate())
        var today: Date = new Date();
        var mm: string = (today.getMonth() + 1).toString();
        if (Number(mm) < 10) {
            mm = ('0' + mm);
        }
        db_Month.value = mm

        Frist = 0;
        db_Month_onchange();

        Close_Loder();
    }
    function InitalizeControls() {
        db_Month = document.getElementById('db_Month') as HTMLSelectElement;
        txtSearchSal = document.getElementById('txtSearchSal') as HTMLInputElement;
        Filter_ViewSal = document.getElementById('Filter_ViewSal') as HTMLButtonElement;
        btnDelete_FilterSal = document.getElementById('btnDelete_FilterSal') as HTMLButtonElement;
        butCloseDay = document.getElementById('butCloseDay') as HTMLButtonElement;
    }
    function InitializeEvents() {

        Filter_ViewSal.onclick = GetAllPeriodSalaryByUser;
        txtSearchSal.onkeyup = _SearchBox_Change;
        btnDelete_FilterSal.onclick = Clear;
        db_Month.onchange = () => { Frist = 0; db_Month_onchange() }
        butCloseDay.onclick = butCloseDay_onclick;
    }
    function butCloseDay_onclick() {

        let Remarks = $('#Remarks').val().trim();
        if (Remarks == '') {
            ShowMessage('Must Enter Remarks 😁', 'يجب إدخال الملاحظات 😁')
            Errorinput($('#Remarks'))
            return
        }

        var today: Date = new Date();
        var mm: string = (today.getMonth() + 1).toString();
        if (Number(mm) < 10) {
            mm = ('0' + mm);
        }
        db_Month.value = mm
        db_Month_onchange();

        SqlExecuteQuery("G_CloseDay " + CompCode + " , N'" + SysSession.CurrentEnvironment.GQ_USERS.USER_NAME + "' , N'" + Remarks + "' ");

        Frist = 1;
        db_Month_onchange();
    }
    function db_Month_onchange() {


        $('#Txt_From_DateSal').val(DateStartSetMonth(db_Month.value))
        $('#Txt_To_DateSal').val(GetLastDayOfMonth(db_Month.value))

        GetAllPeriodSalaryByUser();


    }
    function InitializeGrid() {

        _GridSal.ElementName = "_GridSal";
        _GridSal.PrimaryKey = "IDPeriod";
        _GridSal.Paging = true;
        _GridSal.PageSize = 100;
        _GridSal.Sorting = true;
        _GridSal.InsertionMode = JsGridInsertionMode.Binding;
        _GridSal.Editing = false;
        _GridSal.Inserting = false;
        _GridSal.SelectedIndex = 1;
        _GridSal.OnItemEditing = () => { };
        _GridSal.Columns = [
            { title: "IDPeriod", name: "IDPeriod", type: "text", width: "100px", visible: false },
            { title: "NumberPeriod", name: "RowNumber", type: "Number", width: "100px" },
            { title: "DateClosed", name: "DateClosed", type: "Text", width: "100px" },
            { title: "CreatedBy", name: "CreatedBy", type: "Text", width: "100px" },
            { title: "Remarks", name: "Remarks", type: "Text", width: "100px" },
            { title: "Balances", name: "Balances", type: "Number", width: "100px" },
            {
                title: "Detail", width: "100px",
                itemTemplate: (s: string, item: IProc_GetAllSalaryPeriod): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = 'Detail';
                    txt.style.backgroundColor = "chocolate";
                    txt.id = "butView" + item.IDPeriod;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

                    txt.onclick = (e) => {
                        ViewDetailSalary(item.IDPeriod);
                    };

                    return txt;
                }
            },

        ];
        _GridSal.Bind();
    }

    function _SearchBox_Change() {
        $("#_GridSal").jsGrid("option", "pageIndex", 1);

        if (txtSearchSal.value != "") {
             
            let search: string = txtSearchSal.value.toLowerCase();
            let SearchDetails = _SalaryList.filter(x => x.RowNumber.toString().search(search) >= 0);

            _GridSal.DataSource = SearchDetails;
            _GridSal.Bind();
        } else {
            _GridSal.DataSource = _SalaryList;
            _GridSal.Bind();
        }
    }


    function GetAllPeriodSalaryByUser() {
         




        CleaningList_Table();

        $("#_GridSal").jsGrid("option", "pageIndex", 1);


        let From_Date = DateFormat($('#Txt_From_DateSal').val());
        let To_Date = DateFormat($('#Txt_To_DateSal').val());



        let Qurey = "IProc_GetAllSalaryPeriod " + CompCode + ",N'" + From_Date + "',N'" + To_Date + "'";
        let DataRes = GetDataFromProc(Qurey, "IProc_GetAllSalaryPeriod")

        let _SalaryList = DataRes as Array<IProc_GetAllSalaryPeriod>;


        //**************************************************************************************************************
         
        _SalaryList = _SalaryList.sort(dynamicSortNew("RowNumber"));
        $('#btnDelete_FilterSal').removeClass('display_none');



         
        if (Frist == 1) {

             
            if (_SalaryList.length > 0) {
                if (_SalaryList[0].IDPeriod != LastPeriod) {

                    ShowMessage('Done Close👌 ', "تم الغلاق")
                    $('#Remarks').val('')
                }
                else {
                    ShowMessage('There is no data to close it ❌', "لا توجد بيانات لإغلاقه ❌")
                    $('#Remarks').val('')
                }
            }
            else {
                ShowMessage('There is no data to close it ❌', "لا توجد بيانات لإغلاقه ❌")
                $('#Remarks').val('') 
            }
            

        }

        if (_SalaryList.length > 0) {
            LastPeriod = _SalaryList[0].IDPeriod
        }
        else {
            LastPeriod = 0
        }

         
        let TotalSalary = SumValue(_SalaryList, "Balances", 1)
         

        $('#TotalBalances').val(TotalSalary);

        _GridSal.DataSource = _SalaryList;
        _GridSal.Bind();

    }
    function Clear() {


        $('#Txt_From_DateSal').val(DateStartMonth())
        $('#Txt_To_DateSal').val(GetDate())

        $('#btnDelete_FilterSal').addClass('display_none');
        CleaningList_Table();
        _GridSal.DataSource = _Salarynone;
        _GridSal.Bind();

    }

    function ViewDetailSalary(PeriodSalary: number) {

        localStorage.setItem(GetParameterByName('App') + "PeriodSalary", PeriodSalary.toString())

        //OpenPagePartial("Info_Salary", Res.Detail_Salary, () => { Display_Refrsh() });




        var RepParam: Array<RepParamter>;
        RepParam =
            [
            { Parameter: 'comp', Value: "" + CompCode + "" },
            { Parameter: 'PeriodSalary', Value: "" + PeriodSalary + "" }, 
            ]

        Print_Report("Detail_Salary", "IProc_GetAllBalancesAmountDetails", RepParam);

    }


    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }
    }
}
