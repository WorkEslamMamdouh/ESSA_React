var normalizePromise = function (promise) {
    var d = $.Deferred();
    if (promise && promise.then) {
        promise.then(function () {
            d.resolve.apply(d, arguments);
        }, function () {
            d.reject.apply(d, arguments);
        });
    }
    else {
        d.resolve(promise);
    }
    return d.promise();
};
class JsGrid {
    constructor() {
        this.SysSession = GetSystemSession();
        this.autosearch = true;
        this.ConfirmDeleteing = false;
        this.PageSize = 50;
        this.SwitchingLanguageEnabled = true;
        this.SORT_ORDER_ASC = "asc";
        this.Width = "100%";
        this.Height = "auto";
        this.Heading = true;
        this.InsertionMode = JsGridInsertionMode.Internal;
        this.CancelInserting = false;
        this.IsCanceled = false;
    }
    CancelItemDeleteing() {
    }
    cancelItemDeleting(arg) {
        arg.cancel = true;
    }
    SwitchInsertingRow() {
        let value = $('#' + this.ElementName).jsGrid('option', 'inserting');
        $('#' + this.ElementName).jsGrid('option', 'inserting', !value);
    }
    SwitchEditing() {
        let value = $('#' + this.ElementName).jsGrid('option', 'editing');
        $('#' + this.ElementName).jsGrid('option', 'editing', !value);
    }
    GenerateColumns(objType) {
        //let row = this.DataSource[0];
        this.Columns = new Array();
        let fields = Object.getOwnPropertyNames(objType);
        for (var field of fields) {
            let col = {
                name: field,
                nameDesc: field,
                title: field,
                type: "label"
            };
            this.Columns.push(col);
        }
    }
    SwitchColumnsLanguage() {
        //for (var col of this.Columns) {
        //    col.title = Language.GetValueByKey(col.name);
        //}
    }
    Bind() {
        $(".jsgrid-grid-body").css("max-height", this.Height);
        $(".jsgrid-grid-body").css("height", this.Height);
        if (this.SwitchingLanguageEnabled == true) {
            this.SwitchColumnsLanguage();
        }
        $("#" + this.ElementName).jsGrid({
            width: this.Width,
            height: this.Height,
            heading: this.Heading,
            inserting: this.Inserting,
            editing: this.Editing,
            sorting: this.Sorting,
            paging: this.Paging,
            filtering: this.Filtering,
            autoLoad: true,
            selecting: true,
            pageSize: this.PageSize,
            data: this.DataSource,
            confirmDeleting: true, //this.ConfirmDeleteing,
            deleteConfirm: this.SysSession.CurrentEnvironment.ScreenLanguage == "ar" ? "هل متأكد من الحذف" : "Are you sure ?",
            fields: this.Columns,
            //controller: {
            //    data : this.DataSource,
            //    loadData: function () {
            //        return data;
            //    }
            //},
            //rowClick: function (args) {
            //    if (this.editing) {
            //        this.editItem($(args.event.target).closest("tr"));
            //    }
            //},
            getFilter: function () {
                var result = {};
                this._eachField(function (field) {
                    if (field.filtering) {
                        this._setItemFieldValue(result, field, field.filterValue());
                    }
                });
                return result;
            },
            filterTemplate: function () {
                if (!this.filtering)
                    return "";
                var grid = this._grid, $result = this.filterControl = this._createTextBox();
                if (this.autosearch) {
                    $result.on("keypress", function (e) {
                        if (e.which === 13) {
                            grid.search();
                            e.preventDefault();
                        }
                    });
                }
                return $result;
            },
            loadData: function (filter) {
                filter = filter || (this.filtering ? this.getFilter() : {});
                $.extend(filter, this._loadStrategy.loadParams(), this._sortingParams());
                var args = this._callEventHandler(this.onDataLoading, {
                    filter: filter
                });
                return this._controllerCall("loadData", filter, args.cancel, function (loadedData) {
                    if (!loadedData)
                        return;
                    this._loadStrategy.finishLoad(loadedData);
                    this._callEventHandler(this.onDataLoaded, {
                        data: loadedData
                    });
                });
            },
            _controllerCall: function (method, param, isCanceled, doneCallback) {
                if (isCanceled)
                    return $.Deferred().reject().promise();
                this._showLoading();
                var controller = this._controller;
                if (!controller || !controller[method]) {
                    throw Error("controller has no method '" + method + "'");
                }
                return normalizePromise(controller[method](param))
                    .done($.proxy(doneCallback, this))
                    .fail($.proxy(this._errorHandler, this))
                    .always($.proxy(this._hideLoading, this));
            },
            _setSortingParams: function (field, order) {
                field = this._normalizeField(field);
                order = order || ((this._sortField === field) ? this._reversedSortOrder(this._sortOrder) : "asc");
                this._sortField = field;
                this._sortOrder = order;
            },
            sort: function (field, order) {
                if ($.isPlainObject(field)) {
                    order = field.order;
                    field = field.field;
                }
                this._clearSortingCss();
                this._setSortingParams(field, order);
                this._setSortingCss();
                return this._loadStrategy.sort();
            },
            _sortData: function () {
                var sortFactor = this._sortFactor(), sortField = this._sortField;
                if (sortField) {
                    this.data.sort(function (item1, item2) {
                        return sortFactor * sortField.sortingFunc(item1[sortField.name], item2[sortField.name]);
                    });
                }
            },
            _sortingParams: function () {
                if (this.sorting && this._sortField) {
                    return {
                        sortField: this._sortField.name,
                        sortOrder: this._sortOrder
                    };
                }
                return {};
            },
            search: function (filter) {
                this._resetSorting();
                this._resetPager();
                return this.loadData(filter);
            },
            _resetSorting: function () {
                this._sortField = null;
                this._sortOrder = "asc";
                this._clearSortingCss();
            },
            _resetPager: function () {
                this._firstDisplayingPage = 1;
                this._setPage(1);
            },
            //filterTemplate: function () {
            //     
            //    if (!this.filtering)
            //        return "";
            //    var grid = this._grid,
            //        $result = this.filterControl = this._createTextBox();
            //    if (this.autosearch) {
            //        $result.on("keypress", function (e) {
            //            if (e.which === 13) {
            //                grid.search();
            //                e.preventDefault();
            //            }
            //        });
            //    }
            //    return $result;
            //},
            //rowClick: (e) => {
            //     
            //    let row = e.event.currentTarget as HTMLTableRowElement;
            //    $(".jsgrid-row").removeClass("SelectedRowF");
            //    $(".jsgrid-alt-row").removeClass("SelectedRowF");
            //    row.className += " SelectedRowF";
            //    this.SelectedIndex = this.DataSource.indexOf(e.item);// e.itemIndex;
            //    this.SelectedItem = e.item;
            //    if (this.OnRowSelected != null)
            //        this.OnRowSelected();
            //    this.OnItemEditing(e);
            //},
            rowClick: (e) => {
                debugger;
                let row = e.event.currentTarget;
                $(".jsgrid-row").removeClass("SelectedRowF");
                $(".jsgrid-alt-row").removeClass("SelectedRowF");
                row.className += " SelectedRowF";
                this.SelectedIndex = this.DataSource.indexOf(e.item); // e.itemIndex;
                this.SelectedItem = e.item;
                if (this.OnRowSelected != null)
                    this.OnRowSelected();
                //  this.OnItemEditing(e);
            },
            filterValue: function () {
                return this.filterControl.val();
            },
            onDataLoaded: () => {
                if (this.OnDataLoaded != null)
                    this.OnDataLoaded();
            },
            onRefreshed: () => {
                if (this.OnRefreshed != null)
                    this.OnRefreshed();
            },
            rowDoubleClick: (e) => {
                debugger;
                var _this = this;
                var e_item = e.item;
                var _this_PrimaryKey = this.PrimaryKey;
                var e_item_PrimaryKey = e_item[_this_PrimaryKey];
                //***************************************TrNo*******************************
                var _this_PrimaryTrNo = "";
                var e_item_PrimaryTrNo = "";
                try {
                    _this_PrimaryTrNo = this.Columns[1].name;
                    e_item_PrimaryTrNo = e_item[_this_PrimaryTrNo];
                }
                catch (e) {
                    _this_PrimaryTrNo = "";
                    e_item_PrimaryTrNo = "";
                }
                //**********************************************************************
                if (this.OnRowDoubleClicked != null) {
                    this.OnRowDoubleClicked();
                }
            },
            onRefreshing: (arg) => {
            },
            onItemInserting: (arg) => {
                if (this.OnItemInserting != null) {
                    if (this.InsertionMode == JsGridInsertionMode.Binding)
                        arg.cancel = true;
                    let e = new JsGridInsertEventArgs();
                    e.Item = arg.item;
                    this.OnItemInserting(e);
                }
            },
            onItemInserted: (arg) => {
                //$("#" + this.ElementName).jsGrid('option', 'inserting', false);
                //$("#" + this.ElementName).jsGrid("refresh");
                if (this.OnItemInserted != null)
                    this.OnItemInserted();
            },
            onItemUpdating: (arg) => {
                if (this.OnItemUpdating != null) {
                    let e = new JsGridUpdateEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.PreviousItem = arg.previousItem;
                    e.Row = arg.row;
                    this.OnItemUpdating(e);
                }
            },
            onItemEditing: (arg) => {
                if (this.OnItemEditing != null) {
                    let e = new JsGridEditEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.Row = arg.row;
                    this.OnItemEditing(e);
                }
            },
            onItemDeleting: (arg) => {
                if (this.OnItemDeleting != null) {
                    let e = new JsGridDeleteEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.Row = arg.row;
                    //MessageBox.Ask("هل أنت متأكد", "حذف",
                    //    () => {
                    //        this.OnItemDeleting(e);
                    //    },
                    //    () => {
                    //        arg.Cancel = true;
                    //    });
                    this.OnItemDeleting(e);
                }
                //else
                //    arg.cancel = true;
            },
            onItemDeleted: (arg) => {
            }
        });
    }
    //public paginationGoToPage(i: any) {
    //    //$("#" + this.ElementName).jsGrid._firstDisplayingPage = i;
    //    ////$("#" + this.ElementName)._setPage(i); 
    //    //$("#" + this.ElementName).jsGrid._setPage(i);
    //    //$("#" + this.ElementName).api.paginationGoToNextPage();
    //    var grid = $("#" + this.ElementName);
    //    pages.push(grid._createPagerPageNavButton(grid.pageNavigatorNextText, grid.showNextPages));
    //}
    InsertItem(sender, e) {
        if (e.Canel == true)
            return;
        $("#" + this.ElementName).jsGrid("insertItem", JSON.stringify(sender)).done(() => {
        });
    }
    AddFunctions(...Functions) {
        this._functions = Functions;
    }
    Refresh() {
        $("#" + this.ElementName).jsGrid("refresh");
    }
}
class JsGridInsertEventArgs {
}
class JsGridDeleteEventArgs {
    constructor() {
        this.Cancel = false;
    }
}
class JsGridUpdateEventArgs {
}
class JsGridEditEventArgs {
}
var JsGridInsertionMode;
(function (JsGridInsertionMode) {
    JsGridInsertionMode[JsGridInsertionMode["Internal"] = 0] = "Internal";
    JsGridInsertionMode[JsGridInsertionMode["Binding"] = 1] = "Binding";
})(JsGridInsertionMode || (JsGridInsertionMode = {}));
//# sourceMappingURL=JsGrid.js.map