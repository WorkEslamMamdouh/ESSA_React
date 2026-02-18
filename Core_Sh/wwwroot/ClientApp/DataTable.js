class DataTable {
    constructor() {
        this.dataScr = new Array();
        this.Columns = new Array();
        this.column_defs = new Array();
        this.EnableSorting = false;
        this.EnableFiltring = false;
        this.EnablePaging = false;
        this.PageSize = 50;
        this.Initalized = false;
        this.Env = GetSystemEnvironment();
    }
    InitalizeEvents(e) {
        let row = $("#SearchDataTable tbody tr td").DataTable();
        let currentIndex = row.index;
        let index = 0;
        if (this.EnablePaging == true) {
            let currentPageIndex = $("#SearchDataTable").DataTable('option', 'currentPageIndex');
            let prevPagesCount = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.dataScr[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    }
    Initalize() {
    }
    Dispose() {
        $("#" + this.ElementName).off();
    }
    Bind() {
        this.Initalize();
        var selectionCloumn = SearchGrid.SearchDataGrid.PrimaryKey;
        this.Columns = this.Columns.filter(row => row.hidden != true);
        for (var index = 0; index < this.Columns.length; index++) {
            let ss = this.Columns[index].key;
            if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
                for (var itm of this.dataScr) {
                    itm[ss] = DateFormat(itm[ss]);
                }
            }
            var newColumn = {
                "data": this.Columns[index].key,
                "title": this.Columns[index].headerText,
                "visible": !this.Columns[index].hidden,
                "width": this.Columns[index].width,
                "dataType": this.Columns[index].dataType,
            };
            this.column_defs.push(newColumn);
        }
        this.dataScr = this.dataScr.filter(row => row.hidden != true);
        var tableHeaders = "";
        this.column_defs.forEach(col => {
            var _width = "style = 'width: " + col.width + ";max-width: " + col.width + ";min-width: " + col.width + ";'";
            tableHeaders += "<th " + _width + ">" + col.title + "</th>";
        });
        var Res = GetGlopelResources();
        //alert(Res.Lang)
        if (Res.Lang == "Ar") {
            this.language_app =
                {
                    "sProcessing": "جارٍ التحميل...",
                    "sLengthMenu": "أظهر _MENU_ مدخلات",
                    "sZeroRecords": "لم يعثر على أية سجلات",
                    "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
                    "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
                    "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                    "sInfoPostFix": "",
                    "sSearch": "ابحث:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "الأول",
                        "sPrevious": "السابق",
                        "sNext": "التالي",
                        "sLast": "الأخير"
                    }
                };
        }
        else {
            this.language_app = {
                "sProcessing": "Processing",
                "sLengthMenu": "Show _MENU_ Enties",
                "sZeroRecords": "Not Found",
                "sInfo": "Show _START_ To _END_ From _TOTAL_ Enties",
                "sInfoEmpty": "View 0 To 0 From 0 Record",
                "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                "sInfoPostFix": "",
                "sSearch": "Search:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "First",
                    "sPrevious": "Previous",
                    "sNext": "Next",
                    "sLast": "Last"
                }
            };
        }
        $("#tableDiv").empty();
        $("#tableDiv").append('<table id="SearchDataTable" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
        var table = $('#SearchDataTable').DataTable({
            "destroy": true,
            "data": this.dataScr,
            "columns": this.column_defs,
            language: this.language_app
        });
        table.on('click', 'tr', function () {
            //console.log(table.row(this).data());
            //console.log("SelectedKey: " + SearchGrid.SearchDataGrid.PrimaryKey);
            //console.log(SearchGrid.SearchDataGrid.SelectedKey);
            try {
                SearchGrid.SearchDataGrid.SelectedItem = table.row(this).data();
                SearchGrid.SearchDataGrid.SelectedKey = table.row(this).data()[SearchGrid.SearchDataGrid.PrimaryKey];
                SearchGrid.SearchDataGrid.OnDoubleClick();
            }
            catch (e) {
            }
        });
    }
    closeSearch() {
        $('#btnCloseSearch').click(function () {
            this.Initalize();
        });
    }
}
//# sourceMappingURL=DataTable.js.map