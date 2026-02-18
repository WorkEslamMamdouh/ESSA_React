class SystemTools {
    constructor() {
        this.orgCondition = "";
        this.SysSession = GetSystemSession();
    }

    public orgCondition: string;
    public SysSession: SystemSession;

    public apiUrl(controller: string, action: string) {


        //var apiUrl = $("#GetAPIUrl").val() + controller + "/" + action;
        var apiUrl = location.origin + "/" + controller + "/" + action
        return (apiUrl);
    }

    public getJsonData(model: any, type: string = ""): any {

        switch (type) {

            case "Insert":
                model.CreatedAt = DateTimeFormat(GetCurrentDate().toString());
                model.CreatedBy = this.SysSession.CurrentEnvironment.UserCode;
                break;
            case "Update":
                model.UpdatedAt = DateTimeFormat(GetCurrentDate().toString());
                model.UpdatedBy = this.SysSession.CurrentEnvironment.UserCode;
                break;
            default:
                break;
        }

        var res = JSON.stringify(model)
        return res;
    }

    public GetResourceByName<T>(callbackfn: (value: T, index: number, array: T[]) => any): string {

        let func: string = callbackfn.toString().split(".")[1].split(";")[0];
        let result = Ajax.Call<string>({
            url: Url.Action("GetResourceByName", "ClientTools"),
            data: { key: func }

        });
        return result;
    }



    public FindKey(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
        debugger
        var Privileg = GetPrivilegesByModuleCode(GetModuleCode());

        if (!Privileg.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }

        this.orgCondition = Condition;

        let SystemCode = 'I' //this.SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = 'I'// this.SysSession.CurrentEnvironment.SubSystemCode;
        let ScreenLanguage = this.SysSession.CurrentEnvironment.ScreenLanguage;
        Ajax.CallAsync({
            url: this.apiUrl("SystemTools", "FindKey"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName,
                SystemCode: SystemCode,
                SubSystemCode: SubSystemCode,
                ScreenLanguage: ScreenLanguage
            },
            async: true,
            success: (resp) => {

                var response = resp;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }


                let columns = response.Columns as Array<datatableColumn>;
                let result = JSON.parse(response.DataResult);

                let settings = response.Settings as G_SearchForm;
                let TableName = response.TableName as string;
                let Condition = response.Condition as string;

                SearchGrid.SearchDataGrid = new DataTable();
                SearchGrid.SearchDataGrid.Columns = columns;

                SearchGrid.SearchDataGrid.dataScr = result;
                SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
                SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
                SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

                let boxWidth: string = settings.Width <= 100 ? "90%" : settings.Width.toString() + "px";
                let boxHeight: string = settings.Height <= 100 ? "70%" : settings.Height.toString() + "px";
                let boxLeft: string = settings.Left <= 50 ? "5%" : settings.Left.toString() + "px";
                let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";



                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);


                SearchGrid.SearchDataGrid.Bind();

                SearchGrid.SearchDataGrid.OnDoubleClick = () => {
                    var Div_SearchBox = document.getElementById("Div_SearchBox");
                    Div_SearchBox.style.display = "none";
                    $("#SearchBox").addClass("display_none")


                    OnSearchSelected();
                };

                try {

                    if (this.SysSession.CurrentEnvironment.ScreenLanguage == "Ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (this.SysSession.CurrentEnvironment.ScreenLanguage == "En") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                } catch (e) {
                    console.log('error in language...');
                }

                $(".ui-igedit-input").keyup((e) => {

                });

                //$("#SearchBox").modal("show");                
                //$("#SearchBox").addClass("show")
                //$("#SearchBox").removeClass("modal")
                //$("#SearchBox").addClass("modal-backdrop")

                var modal = document.getElementById("Div_SearchBox");
                modal.style.display = "block";
                $("#SearchBox").removeClass("display_none")

                $("#SearchDataTable").css("width", "97%");
                $("#SearchDataTable").css("height", "100%");

                $("#btnCloseSearch").on('click', function () {
                    var Div_SearchBox = document.getElementById("Div_SearchBox");
                    Div_SearchBox.style.display = "none";
                    $("#SearchBox").addClass("display_none")
                });


            }
        });

        //$("#SearchDataTable_filter label input").addClass('display_none'); 
        $("#SearchDataTable_filter label input").focus();
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 400);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 800);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 1000);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 1500);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 2000);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 2500);



        //$("#SearchBox .table-serach-container #tableDiv #SearchDataTable_wrapper #SearchDataTable_filter label input").focus();

    }



    public FindKeySpeed(SearchFormCode: string, Condition: string, NameFolder: string, OnSearchSelected: () => void) {

        var Privileg = GetPrivilegesByModuleCode(GetModuleCode());
        //alert(GetModuleCode())
        //alert(Privileg.VIEW)
        if (!Privileg.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }



        this.orgCondition = Condition;

        let SystemCode = 'I' //this.SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = 'I'// this.SysSession.CurrentEnvironment.SubSystemCode;
        let ScreenLanguage = this.SysSession.CurrentEnvironment.ScreenLanguage;
        Ajax.CallAsync({
            url: this.apiUrl("SystemTools", "FindKeySpeed"),
            data: {
                SearchFormCode: SearchFormCode,
                Condition: Condition,
                NameFolder: NameFolder
            },
            async: true,
            success: (resp) => {


                var response = resp;
                console.log(response);
                console.log(response.DataResult);

                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }
                Show_Loder();


                let columns = response.Columns as Array<datatableColumn>;
                let result = response.DataResult;

                if (SearchFormCode == "Customer") {
                    if (this.SysSession.CurrentEnvironment.I_Control.Is_CarCenter) {

                        for (var i = 0; i < columns.length; i++) {
                            //alert(columns[i].key + " ---> " + columns[i].hidden) 
                            if (columns[i].key == "CarBrand" || columns[i].key == "CarNo" || columns[i].key == "DestructionKm") {
                                columns[i].hidden = false;
                            }
                            if (columns[i].key == "ISPersonal" || columns[i].key == "VatNo") {
                                columns[i].hidden = true;
                            }
                        }
                    }
                }


                let settings = response.Settings as G_SearchForm;
                let TableName = response.TableName as string;
                let Condition = response.Condition as string;

                SearchGrid.SearchDataGrid = new DataTable();
                SearchGrid.SearchDataGrid.Columns = columns;

                SearchGrid.SearchDataGrid.dataScr = result;
                SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
                SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
                SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

                let boxWidth: string = settings.Width <= 100 ? "90%" : settings.Width.toString() + "px";
                let boxHeight: string = settings.Height <= 100 ? "70%" : settings.Height.toString() + "px";
                let boxLeft: string = settings.Left <= 50 ? "5%" : settings.Left.toString() + "px";
                let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";



                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);


                SearchGrid.SearchDataGrid.Bind();

                SearchGrid.SearchDataGrid.OnDoubleClick = () => {

                    console.log(SearchGrid.SearchDataGrid.SelectedKey);
                    //$("#SearchBox").removeClass("show")
                    //$("#SearchBox").removeClass("modal-backdrop")
                    //$("#SearchBox").modal("hide");//.css("display", "none");
                    //$("#SearchBox").addClass("modal");

                    //$("#SearchBox").removeClass("show")
                    //$("#SearchBox").removeClass("modal-backdrop")
                    //$("#SearchBox").modal("hide");//.css("display", "none");
                    //$("#SearchBox").addClass("modal");

                    var Div_SearchBox = document.getElementById("Div_SearchBox");
                    Div_SearchBox.style.display = "none";
                    $("#SearchBox").addClass("display_none")


                    OnSearchSelected();
                    Close_Loder();
                };

                try {

                    if (this.SysSession.CurrentEnvironment.ScreenLanguage == "Ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (this.SysSession.CurrentEnvironment.ScreenLanguage == "En") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                } catch (e) {
                    console.log('error in language...');
                }

                $(".ui-igedit-input").keyup((e) => {

                });

                //$("#SearchBox").modal("show");                
                //$("#SearchBox").addClass("show")
                //$("#SearchBox").removeClass("modal")
                //$("#SearchBox").addClass("modal-backdrop")

                var modal = document.getElementById("Div_SearchBox");
                modal.style.display = "block";
                $("#SearchBox").removeClass("display_none")

                $("#SearchDataTable").css("width", "97%");
                $("#SearchDataTable").css("height", "100%");

                $("#btnCloseSearch").on('click', function () {
                    var Div_SearchBox = document.getElementById("Div_SearchBox");
                    Div_SearchBox.style.display = "none";
                    $("#SearchBox").addClass("display_none")
                });
                Close_Loder();

            }
        });

        //$("#SearchDataTable_filter label input").addClass('display_none'); 
        $("#SearchDataTable_filter label input").focus();
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 400);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 800);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 1000);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 1500);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 2000);
        setTimeout(function () { $("#SearchDataTable_filter label input").focus(); }, 2500);




        //$("#SearchBox .table-serach-container #tableDiv #SearchDataTable_wrapper #SearchDataTable_filter label input").focus();

    }




    public FindKeyPagination(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {

        var Privileg = GetPrivilegesByModuleCode(GetModuleCode());

        if (!Privileg.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒")
            return
        }

        let ConditionProc = Condition.replace(/'/g, "''");

        let SystemCode = 'I' //this.SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = 'I'// this.SysSession.CurrentEnvironment.SubSystemCode;
        let ScreenLanguage = this.SysSession.CurrentEnvironment.ScreenLanguage;
        Ajax.CallAsync({
            url: this.apiUrl("SystemTools", "FindKeyPagination"),
            data: {
                moduleCode: moduleCode,
                Condition: ConditionProc,
                controlName: _SearchControlName,
                SystemCode: SystemCode,
                SubSystemCode: SubSystemCode,
                ScreenLanguage: ScreenLanguage
            },
            async: true,
            success: (resp) => {

                var response = resp;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }

                debugger

                let columns = response.Columns as Array<datatableColumn>;


                var JS_Columns = [];
                for (var i = 1; i < columns.length; i++) {
                    var DefGrid = {};
                    DefGrid["title"] = columns[i].headerText;
                    DefGrid["name"] = columns[i].key;

                    DefGrid["type"] = columns[i].dataType;
                    DefGrid["width"] = "100px";

                    if (moduleCode == "Customer") {

                        if (this.SysSession.CurrentEnvironment.I_Control.Is_CarCenter) {

                            //alert(columns[i].key + " ---> " + columns[i].hidden) 
                            //alert(columns[i].key)
                            if (columns[i].key == "CarBrand" || columns[i].key == "CarNo" || columns[i].key == "DestructionKm") {
                                DefGrid["visible"] = true;
                            }
                            else if (columns[i].key == "ISPersonal" || columns[i].key == "VatNo") {
                                DefGrid["visible"] = false;
                            }
                            else {
                                DefGrid["visible"] = columns[i].hidden == true ? false : true;
                            }
                        }
                        else {

                            if (!this.SysSession.CurrentEnvironment.I_Control.Is_CarCenter) { 
                                if (columns[i].key == "CarBrand" || columns[i].key == "CarNo" || columns[i].key == "DestructionKm") {
                                    DefGrid["visible"] = false;
                                }
                            }
                            else {
                                DefGrid["visible"] = columns[i].hidden == true ? false : true;
                            }
                        }
                    }
                    else {
                         
 
                            DefGrid["visible"] = columns[i].hidden == true ? false : true; 
                    }
                    JS_Columns.push(DefGrid);
                }





                debugger
                let result = JSON.parse(response.DataResult);

                let _PaginationResult = response.PaginationResult as PaginationResult;
                let settings = response.Settings[0] //as G_SearchForm;
                let NameTable = response.TableName as string;
                let Condition = response.Condition as string;

                let _Grid_Pagination: JsGrid = new JsGrid();
                _Grid_Pagination.ElementName = "_Grid_Pagination";
                _Grid_Pagination.PrimaryKey = settings.ReturnDataPropertyName;
                _Grid_Pagination.Paging = true;
                _Grid_Pagination.PageSize = settings.PageSize;
                _Grid_Pagination.Sorting = true;
                _Grid_Pagination.Editing = false;
                _Grid_Pagination.Inserting = false;
                _Grid_Pagination.SelectedIndex = 1;
                _Grid_Pagination.Columns = JS_Columns

                _Grid_Pagination.OnRowDoubleClicked = () => {
                    debugger
                    try {

                        var modalSearchPagination = document.getElementById("Model_SearchBox_Pagination");
                        modalSearchPagination.style.display = "none";
                        $("#NewSearch_Box_Pagination").addClass("display_none")

                        SelectDataSearch.Id = Number(_Grid_Pagination.SelectedItem[_Grid_Pagination.PrimaryKey])
                        SelectDataSearch.DataRow = _Grid_Pagination.SelectedItem

                        OnSearchSelected();


                        SelectDataSearch.Id = 0
                        SelectDataSearch.DataRow = null

                    } catch (e) {
                        alert(100)
                    }

                };

                _Grid_Pagination.Bind();


                let _DataTablePaginationResult: DataTablePaginationResult = new DataTablePaginationResult();
                _DataTablePaginationResult.DataTable = result;

                let TotalPages = 1
                SelectPageNumber.SearchPageNumber = 1;

                if (_PaginationResult != null) {

                    TotalPages = _PaginationResult[0].TotalPages
                }


                let idGrid = _Grid_Pagination.ElementName
                $("#" + idGrid + "").jsGrid("option", "pageIndex", 1);



                $("#Div_Search_Grid_" + idGrid).remove();


                let _Search = `

                                    <form id="Div_Search_Grid_${idGrid}" action="https://forms.nicepagesrv.com/v2/form/process" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" style="margin-top: -35px;" source="email" name="form">
                                        <div class="u-form-email u-form-group u-form-partition-factor-9">
                                        </div>

                                        <div class="u-form-group u-form-name u-form-partition-factor-6" style="width: 218px;">
                                            <label for="" class="u-label u-text-grey-40">Search</label>
                                            <input type="text" placeholder="Search" id="${idGrid}_SearchGrid" name="date" class="u-input u-input-rectangle"  >
                                        </div>
             


                                        <div class="u-form-group u-form-name u-form-partition-factor-6" style="width: 162px;"> 
                                            <a id="btnSearchGrid_${idGrid}"   class="Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle Grid-search_Pages" style="margin-bottom: -3px;">🔍</a>

                                        </div> 
                                    </form> 
                             `

                $('#' + idGrid + '').before(_Search);


                $('#btnSearchGrid_' + idGrid).click(function (e) {


                    DisplayDirectPagination(_Grid_Pagination, NameTable, Condition, 1, settings.PageSize, settings.ReturnDataPropertyName, true)

                });



                $('#' + idGrid + '_SearchGrid').on('change', function () {

                    DisplayDirectPagination(_Grid_Pagination, NameTable, Condition, 1, settings.PageSize, settings.ReturnDataPropertyName, true)
                });



                Event_key('Enter', `${idGrid}_SearchGrid`, 'btnSearchGrid_' + idGrid);



                let SearchValue = $("#" + idGrid + "_SearchGrid").val().trim();


                _Grid_Pagination.DataSource = result;
                _Grid_Pagination.Bind();

                BiuldPagination(idGrid, TotalPages, 1, true, () => {
                    let PageNum = 1;

                    PageNum = SelectPageNumber.SearchPageNumber
                    debugger

                    let _ResData = GetDataFromPagination(NameTable, Condition, PageNum, settings.PageSize, settings.ReturnDataPropertyName, SearchValue, false)


                    let idGrid = _Grid_Pagination.ElementName
                    $("#" + idGrid + "").jsGrid("option", "pageIndex", 1);


                    _Grid_Pagination.PageSize = settings.PageSize
                    _Grid_Pagination.DataSource = _ResData.DataTable;
                    _Grid_Pagination.Bind();

                });



                //DisplayGridByPagination(_Grid_Pagination, settings.DataSourceName, response.Condition, 1, settings.PageSize, settings.ReturnDataPropertyName, true)


                //let boxWidth: string = settings.Width <= 100 ? "90%" : settings.Width.toString() + "px";
                //let boxHeight: string = settings.Height <= 100 ? "70%" : settings.Height.toString() + "px";
                //let boxLeft: string = settings.Left <= 50 ? "5%" : settings.Left.toString() + "px";
                //let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";



                $("#NewSearch_Box_Pagination").css("width", "90%");
                $("#NewSearch_Box_Pagination").css("height", "70%");
                $("#NewSearch_Box_Pagination").css("left", "5%");
                $("#NewSearch_Box_Pagination").css("top", "10%");



                var modal = document.getElementById("Model_SearchBox_Pagination");
                modal.style.display = "block";
                $("#NewSearch_Box_Pagination").removeClass("display_none")

                $("#" + idGrid + "").attr("style", "position: relative; height: auto; width: 1297.69px; padding: 11px 13px;");

                $("#btnClose_SearchPagination").on('click', function () {
                    var modalSearchPagination = document.getElementById("Model_SearchBox_Pagination");
                    modalSearchPagination.style.display = "none";
                    $("#NewSearch_Box_Pagination").addClass("display_none")
                });



                setTimeout(function () { $("#_Grid_Pagination_SearchGrid").focus(); }, 500);
                setTimeout(function () { $("#_Grid_Pagination_SearchGrid").focus(); }, 1000);
                setTimeout(function () { $("#_Grid_Pagination_SearchGrid").focus(); }, 2500);

            }
        });


    }








    //old code
    //public FindNotification(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
    //    this.orgCondition = Condition;

    //    Ajax.CallAsync({
    //        url: Url.Action("Find", "ClientTools"),
    //        data: {
    //            moduleCode: moduleCode,
    //            Condition: Condition,
    //            controlName: _SearchControlName//$("#SearchControlName").val()
    //        },
    //        async: true,
    //        success: (resp) => {
    //            var response = resp.result;
    //            if (response == null) {
    //                MessageBox.Show("Search not available, Please call your app administrator", "Search");
    //                return;
    //            }

    //            let columns = response.Columns as Array<datatableColumn>;
    //            let result = JSON.parse(response.DataResult);

    //            let settings = response.Settings as G_SearchForm;
    //            let TableName = response.TableName as string;
    //            let Condition = response.Condition as string;

    //            SearchGrid.SearchDataGrid = new DataTable();
    //            SearchGrid.SearchDataGrid.Columns = columns;

    //            SearchGrid.SearchDataGrid.dataScr = result;
    //            SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
    //            SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
    //            SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

    //            let boxWidth: string = settings.Width <= 100 ? "70%" : settings.Width.toString() + "px";
    //            let boxHeight: string = settings.Height <= 100 ? "50%" : settings.Height.toString() + "px";
    //            let boxLeft: string = settings.Left <= 50 ? "14%" : settings.Left.toString() + "px";
    //            let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";

    //            $("#SearchBox").css("width", boxWidth);
    //            $("#SearchBox").css("height", boxHeight);
    //            $("#SearchBox").css("left", boxLeft);
    //            $("#SearchBox").css("top", boxTop);

    //            SearchGrid.SearchDataGrid.Bind();



    //            try {
    //                if (SysSession.CurrentEnvironment.ScreenLanguage == "Ar") {
    //                    document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
    //                }
    //                else if (SysSession.CurrentEnvironment.ScreenLanguage == "En") {
    //                    document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
    //                }
    //            } catch (e) {
    //                console.log('error in language...');
    //            }

    //            $(".ui-igedit-input").keyup((e) => {

    //            });

    //            $("#SearchBox").modal("show");//.css("display", "");//
    //            $("#SearchDataTable").css("width", "100%");
    //            $("#SearchDataTable").css("height", "100%");
    //        }
    //    });
    //}
    //new code//
    public FindNotification(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
        this.orgCondition = Condition;

        Ajax.CallAsync({
            url: this.apiUrl("SystemTools", "Find"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName
            },
            async: true,
            success: (resp) => {
                var response = resp.result;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }

                let columns = response.Columns as Array<datatableColumn>;
                let result = JSON.parse(response.DataResult);

                let settings = response.Settings as G_SearchForm;
                let TableName = response.TableName as string;
                let Condition = response.Condition as string;

                SearchGrid.SearchDataGrid = new DataTable();
                SearchGrid.SearchDataGrid.Columns = columns;

                SearchGrid.SearchDataGrid.dataScr = result;
                SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
                SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
                SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

                let boxWidth: string = settings.Width <= 100 ? "70%" : settings.Width.toString() + "px";
                let boxHeight: string = settings.Height <= 100 ? "50%" : settings.Height.toString() + "px";
                let boxLeft: string = settings.Left <= 50 ? "14%" : settings.Left.toString() + "px";
                let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";

                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);

                SearchGrid.SearchDataGrid.Bind();



                try {
                    if (this.SysSession.CurrentEnvironment.ScreenLanguage == "Ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (this.SysSession.CurrentEnvironment.ScreenLanguage == "En") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                } catch (e) {
                    console.log('error in language...');
                }

                $(".ui-igedit-input").keyup((e) => {

                });

                $("#SearchBox").modal("show");//.css("display", "");//
                $("#SearchDataTable").css("width", "100%");
                $("#SearchDataTable").css("height", "100%");
            }
        });
    }
    //***********************************************//
    private GenerateFiltersKey(moduleCode: string, sh: string, columns: Array<datatableColumn>, dataSource: Array<any>, onSuccess: (dd) => void) {
        let SearchFilters = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilters");
        let sqlConditions: Array<string> = new Array<string>();
        SearchFilters.innerHTML = "";

        let SearchFilterTypes = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var column of columns) {
            if (column.hidden == true)
                continue;
            let txt: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("input");
            if (column.dataType == "number")
                txt.type = "number";
            else if (column.dataType == "date")
                txt.type = "date";
            else
                txt.type = "text";
            txt.placeholder = column.headerText;
            txt.className = "form-control";
            txt.tabIndex = columns.indexOf(column);
            txt.id = "Filter_" + column.key;
            sqlConditions.push("");
            txt.onkeyup = (e) => {
                //if (e.key != Keys.Enter)
                //    return;
                let currentInput = (e.currentTarget as HTMLInputElement) as HTMLInputElement;
                let colIndex = currentInput.tabIndex;
                let columnKey: string = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";



                let filter: string = "";
                let fltr: string = "";
                fltr = "";
                let cond: string = "";
                for (cond of sqlConditions) {
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                //fltr += "0 = 0";

                if (this.orgCondition != "" && fltr != "") {
                    filter = fltr + this.orgCondition  // + " and " + fltr;
                }
                else
                    if (this.orgCondition == "")
                        filter = fltr + "0 = 0";
                    else
                        filter = this.orgCondition;

                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: sh//$("#SearchControlName").val()
                    },
                    success: (d) => {
                        onSuccess(d);
                    }
                })
            };


            let td: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);

            let tdType: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    }

    private GenerateFilters(moduleCode: string, columns: Array<datatableColumn>, dataSource: Array<any>, onSuccess: (dd) => void) {
        let SearchFilters = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilters");
        let sqlConditions: Array<string> = new Array<string>();
        SearchFilters.innerHTML = "";

        let SearchFilterTypes = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var column of columns) {
            if (column.hidden == true)
                continue;
            let txt: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("input");
            if (column.dataType == "number")
                txt.type = "number";
            else if (column.dataType == "date")
                txt.type = "date";
            else
                txt.type = "text";
            txt.placeholder = column.headerText;
            txt.className = "form-control";
            txt.tabIndex = columns.indexOf(column);
            txt.id = "Filter_" + column.key;
            sqlConditions.push("");
            txt.onkeyup = (e) => {
                //if (e.key != Keys.Enter)
                //    return;
                let currentInput = (e.currentTarget as HTMLInputElement) as HTMLInputElement;
                let colIndex = currentInput.tabIndex;
                let columnKey: string = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";



                let filter: string = "";
                let fltr: string = "";
                fltr = "";
                let cond: string = "";
                for (cond of sqlConditions) {
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                //fltr += "0 = 0";

                if (this.orgCondition != "" && fltr != "") {
                    filter = fltr + this.orgCondition  // + " and " + fltr;
                }
                else
                    if (this.orgCondition == "")
                        filter = fltr + "0 = 0";
                    else
                        filter = this.orgCondition;

                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: $("#SearchControlName").val()
                    },
                    success: (d) => {
                        onSuccess(d);
                    }
                })
            };


            let td: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);

            let tdType: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    }

    private GenerateFilterTypes(column: datatableColumn): HTMLSelectElement {
        let source: Array<SelectItem> = new Array<SelectItem>();
        if (column.dataType == "number") {
            source.push({ Text: "Equal", Value: "= {0}" },
                { Text: "Not Equal", Value: "<> {0}" },
                { Text: "Larger Than", Value: "> {0}" },
                { Text: "Larger Than Or Equal", Value: ">= {0}" },
                { Text: "Less Than", Value: "<{0}" },
                { Text: "Less Than Or Equal", Value: "< {0}" });
        }
        else {
            source.push(
                { Text: "Contains", Value: " Like '%{0}%'" },
                { Text: "Equal", Value: "= '{0}'" },
                { Text: "Starts With", Value: " Like '{0}%'" },
                { Text: "Ends With", Value: " Like '%{0}'" });
        }

        let cmbo: HTMLSelectElement = DocumentActions.CreateElement<HTMLSelectElement>("select");
        cmbo.className = "form-control";
        cmbo.id = "FType_" + column.key;
        DocumentActions.FillCombo(source, cmbo, "Value", "Text");
        return cmbo;
    }

    private convertFilterToCondition(cond: string, filter: string) {
        if (cond.toLowerCase() == "contains")
            return " Like '%" + filter + "%'";
        else if (cond.toLowerCase() == "endsWith")
            return " Like '%" + filter + "'";
        if (cond.toLowerCase() == "startswith")
            return " Like '" + filter + "%'";
    }


    public ImgPopup(CompCode: string, Branch: string, moduleCode: string, TrNo: string) {
        let opt: JQueryAjaxSettings = {
            url: Url.Action("ImagePopup", "GeneralReports"),
            success: (d) => {

                let result = d as string;


                $("#btnImgBody").html(result);
                $("#exampleModal2").modal("show");
                $('#exampleModal2').modal({
                    refresh: true
                });

                $("#btnCompCode").val(CompCode);
                $("#btnBranch").val(Branch);
                $("#btnmoduleCode").val(moduleCode);
                $("#btnTrNo").val(TrNo);

                //systemEnv.ScreenLanguage = sessionStorage.getItem(GetParameterByName('App') + "temp_lang");
                //var val = $("#rpTitle").text();
                //$("#TitleSpan").html(val);
            }
        };
        Ajax.CallAsync(opt);


    }
}

class SelectItem {
    constructor() {
        this.Value = null;
        this.Text = null;
    }
    public Value: string;
    public Text: string;
}

//class SessionManager {
//    public Me: G_USERS;
//    public PageIndex: number;
//    public ModelCount: number;
//    public SessionRecord: SessionRecord;
//}


