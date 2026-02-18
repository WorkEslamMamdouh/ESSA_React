class IgGrid {
    constructor() {
        this.Features = new Array();
        this.DataSource = new Array();
        this.Columns = new Array();
        this.AutoGenerateColumns = false;
        this.EnableSorting = false;
        this.EnableFiltring = false;
        this.EnablePaging = false;
        this.PageSize = 50;
        this.Initalized = false;
    }
    InitalizeEvents(e) {
        let row = $("#" + this.ElementName).igGrid("selectedRow");
        let currentIndex = row.index;
        let index = 0;
        if (this.EnablePaging == true) {
            let currentPageIndex = $("#" + this.ElementName).igGridPaging('option', 'currentPageIndex');
            let prevPagesCount = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.DataSource[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    }
    Initalize() {
        $("#" + this.ElementName).off("click");
        $("#" + this.ElementName).off("dblclick");
        this.Features.push({ name: 'Selection', mode: 'row', multipleSelection: false, activation: true });
        if (this.EnablePaging == true)
            this.Features.push({ name: "Paging", pageSize: this.PageSize });
        if (this.EnableFiltring == true) {
            this.Features.push({
                name: 'Filtering',
                dataFiltering: (evt, ui) => {
                    if (this.OnFiltering != null)
                        this.OnFiltering(evt, ui);
                }
            });
        }
        if (this.EnableSorting == true) {
            this.Features.push({ name: "Sorting" });
        }
        $("#" + this.ElementName).on("click", "tr", (e) => {
            this.InitalizeEvents(e);
            if (this.OnRowSlected != null)
                this.OnRowSlected();
        });
        $("#" + this.ElementName).on("dblclick", "tr", (e) => {
            this.InitalizeEvents(e);
            if (this.OnDoubleClick != null)
                this.OnDoubleClick();
        });
        this.Initalized = true;
    }
    Dispose() {
        $("#" + this.ElementName).off();
    }
    Bind() {
        if (this.Initalized == false)
            this.Initalize();
        let fets = new Array();
        fets = this.Features;
        $("#" + this.ElementName).igGrid({
            primaryKey: this.PrimaryKey,
            columns: this.Columns,
            autoGenerateColumns: this.AutoGenerateColumns,
            dataSource: this.DataSource,
            features: fets
        });
    }
}
//# sourceMappingURL=IgGrid.js.map