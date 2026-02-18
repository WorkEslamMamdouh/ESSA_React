$(document).ready(() => {
    CloseDay.InitalizeComponent();
});
var CloseDay;
(function (CloseDay) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid = new JsGrid();
    var _Datanone = new Array();
    var Close_DayNew;
    var Filter_View;
    var btnDelete_Filter;
    var Res = GetGlopelResources();
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#Txt_FromTrData').val(DateStartYear());
        $('#Txt_TOTrData').val(GetDate());
        $("#DayTrData").val(GetDate());
        InitializeGrid();
        GetData();
        Close_Loder();
    }
    CloseDay.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Close_DayNew = document.getElementById('Close_DayNew');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        Close_DayNew.onclick = Close_DayNew_onclick;
        Filter_View.onclick = () => { GetData(); };
        btnDelete_Filter.onclick = Clear;
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "DayShiftID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "DayShiftID", name: "DayShiftID", visible: false, width: "100px" },
            { title: Res.Lang == "Ar" ? "الرقم " : "No", name: "LastCount", type: "text", width: "100px" },
            {
                title: Res.Lang == "Ar" ? "التاريخ " : "Date", css: "TrDate", name: "IsCash", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TrDate);
                    return txt;
                }
            },
            { title: Res.Lang == "Ar" ? "اليوم " : "Day", name: "DescA", type: "text", width: "100px" },
            { title: Res.Lang == "Ar" ? "الملاحظات " : "Remark", name: "Remark", type: "text", width: "100px" },
            {
                title: Res.Lang == "En" ? "Print" : "طباعه", width: "100px",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Print ");
                    txt.id = "butView" + item.DayShiftID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#c78816";
                    txt.disabled = item.Status == 1 ? false : true;
                    txt.onclick = (e) => {
                        PrintInv(item);
                    };
                    return txt;
                }
            },
            //{
            //    title: Res.Lang == "En" ? "Delete" : "حذف", width: "100px",
            //    itemTemplate: (s: string, item: G_I_DayShift): HTMLInputElement => {
            //        let txt: HTMLInputElement = document.createElement("input");
            //        txt.type = "button";
            //        txt.value = (Res.Lang == "En" ? "Delete" : "حذف ");
            //        txt.id = "butView" + item.DayShiftID;
            //        txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
            //        txt.style.backgroundColor = "#860000";
            //        txt.disabled = item.Status == 1 ? true : false;
            //        if (!SysSession.CurrentPrivileges.DELETE) {
            //            txt.disabled = true
            //        }
            //        txt.onclick = (e) => {
            //            SqlExecuteQuery("update [dbo].[G_I_DayShift] set CompCode = (CompCode * -1 )  where DayShiftID = " + item.DayShiftID)
            //            GetData(false, 0, 0, true);
            //        };
            //        return txt;
            //    }
            //},
        ];
        _Grid.Bind();
    }
    function GetData(IsChangeActive = false, ID = 0, Status = 0, ISDirect = false) {
        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒");
            return;
        }
        CleaningList_Table();
        let Con = "";
        Con = Con + "  and CAST(TrDate AS DATE) >= '" + $('#Txt_FromTrData').val() + "' and   CAST(TrDate AS DATE) <= '" + $('#Txt_TOTrData').val() + "'";
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'G_I_DayShift', "   CompCode =" + CompCode + " " + Con, SelectPageNumber.PageNumber, 5, "DayShiftID");
        }
        else {
            DisplayGridByPagination(_Grid, 'G_I_DayShift', "   CompCode =" + CompCode + " " + Con, 1, 5, "DayShiftID");
        }
    }
    function PrintInv(item) {
        var RepParam;
        RepParam =
            [
                { Parameter: 'comp', Value: "" + CompCode + "" },
                { Parameter: 'CashTypeID', Value: "null" },
                { Parameter: 'FromDate', Value: "2000-01-01" },
                { Parameter: 'ToDate', Value: "2079-06-06" },
                { Parameter: 'IDUser', Value: "null" },
                { Parameter: 'IDExcel', Value: "" + item.LastCount + "" },
                { Parameter: 'IncludeOpenBal', Value: "1" },
            ];
        if (Res.Lang == "Ar") {
            Print_Report("Rpt_CashBox_AccAr", "IProc_Z_A_AccountStatment_CachBox", RepParam);
        }
        else {
            Print_Report("Rpt_CashBox_AccEn", "IProc_Z_A_AccountStatment_CachBox", RepParam);
        }
    }
    function Clear() {
        $('#Txt_FromTrData').val(GetDate());
        $('#Txt_TOTrData').val(GetDate());
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Datanone;
        _Grid.Bind();
    }
    function Close_DayNew_onclick() {
        if ($("#Day").val().trim() == '') {
            Errorinput($('#Day'), "Please Enter Day 🤨", "برجاء ادخال اليوم 🤨");
            return;
        }
        if ($("#Remark").val().trim() == '') {
            Errorinput($('#Remark'), "Please Enter Remark 🤨", "برجاء ادخال الملاحظات 🤨");
            return;
        }
        debugger;
        let Query = `

        INSERT INTO [dbo].[G_I_DayShift]
                   ([CompCode],[DescA],[DescE],TrDate,[LastCount],[Status],[Remark],[CreatedAt],[CreatedBy])
                    
                         VALUES
                               ( ${CompCode} ,N'${$("#Day").val().trim()}',N'${$("#Day").val().trim()}','${$("#DayTrData").val()}',(select (isNULL(COUNT(DayShiftID) , 0 ) + 1) from [G_I_DayShift] where [CompCode] = ${CompCode} ),1,'${$("#Remark").val().trim()}','${GetDateAndTimeSql()}','${SysSession.CurrentEnvironment.GQ_USERS.USER_NAME}' )
                     `;
        SqlExecuteQuery(Query);
        GetData();
        $("#Day").val('');
        $("#Remark").val('');
        $("#DayTrData").val(GetDate());
    }
})(CloseDay || (CloseDay = {}));
//# sourceMappingURL=CloseDay.js.map