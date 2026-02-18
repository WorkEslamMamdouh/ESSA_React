// نسخة مُعدّلة من StGridBuilder تدعم التهيئة بأسلوب Properties
class StGridBuilder {
    constructor() {
        this.options = {};
        this.container = null;
        this.filteredData = [];
        this.gridInstance = null;
    }
    get ElementName() {
        return this.options.elementId || "";
    }
    set ElementName(value) {
        this.options.elementId = value;
        this.container = document.getElementById(value);
    }
    set columns(value) {
        this.options.columns = value;
    }
    set DataSource(value) {
        this.options.dataSource = value;
        this.filteredData = [...value];
    }
    set keyField(value) {
        this.options.keyField = value;
    }
    set enableInsert(value) {
        this.options.enableInsert = value;
    }
    set enableEdit(value) {
        this.options.enableEdit = value;
    }
    set enableDelete(value) {
        this.options.enableDelete = value;
    }
    set enableSearch(value) {
        this.options.enableSearch = value;
    }
    set infiniteScroll(value) {
        this.options.infiniteScroll = value;
    }
    set pageSize(value) {
        this.options.pageSize = value;
    }
    set direction(value) {
        this.options.direction = value;
    }
    set onClickInsert(value) {
        this.options.onClickInsert = value;
    }
    set onClickEdit(value) {
        this.options.onClickEdit = value;
    }
    set onClickDelete(value) {
        this.options.onClickDelete = value;
    }
    set onRowDoubleClicked(value) {
        this.options.onRowDoubleClicked = value;
    }
    Bind() {
        if (!this.container || !this.options.columns || !this.options.dataSource) {
            console.error("StGridBuilder: لم يتم تهيئة البيانات بالشكل الصحيح.");
            return;
        }
        if (this.options.enableSearch)
            this.createSearchBox();
        this.renderGrid();
    }
    createSearchBox() {
        const wrapper = document.createElement("div");
        wrapper.style.marginBottom = "10px";
        this.searchBox = document.createElement("input");
        this.searchBox.type = "text";
        this.searchBox.placeholder = "🔎 بحث...";
        this.searchBox.style.padding = "6px";
        this.searchBox.style.width = "250px";
        this.searchBox.addEventListener("input", () => {
            this.applySearchFilter();
            this.refresh();
        });
        wrapper.appendChild(this.searchBox);
        this.container.appendChild(wrapper);
    }
    applySearchFilter() {
        var _a;
        if (!this.options.enableSearch || !((_a = this.searchBox) === null || _a === void 0 ? void 0 : _a.value)) {
            this.filteredData = [...this.options.dataSource];
        }
        else {
            const keyword = this.searchBox.value.toLowerCase();
            this.filteredData = this.options.dataSource.filter((row) => {
                const values = [];
                for (const key in row) {
                    if (row.hasOwnProperty(key))
                        values.push(row[key]);
                }
                return values.some(val => val !== null && val !== undefined && val.toString().toLowerCase().includes(keyword));
            });
        }
    }
    renderGrid() {
        if (this.gridInstance)
            this.container.removeChild(this.gridInstance);
        const grid = document.createElement("div");
        this.gridInstance = grid;
        this.container.appendChild(grid);
        const jsGridFields = this.options.columns.map(column => {
            const field = {
                name: column.name,
                title: column.title || column.name,
                type: column.type || "text",
                width: column.width,
                visible: column.visible !== false,
                align: column.align || (this.options.direction === 'rtl' ? 'right' : 'left'),
                editing: column.editing !== false,
                inserting: column.inserting !== false
            };
            const attachEvents = (element, item) => {
                if (column.events) {
                    for (const eventName in column.events) {
                        element.addEventListener(eventName, (event) => {
                            column.events[eventName](event, item, column);
                        });
                    }
                }
                return element;
            };
            if (column.itemTemplate || column.cellRenderer) {
                field.itemTemplate = (value, item) => {
                    let element;
                    if (column.cellRenderer) {
                        element = column.cellRenderer(value, item, column);
                    }
                    else {
                        element = document.createElement("div");
                        const result = column.itemTemplate(value, item);
                        if (typeof result === 'string')
                            element.innerHTML = result;
                        else
                            element.appendChild(result);
                    }
                    return attachEvents(element, item);
                };
            }
            if (this.options.enableEdit && column.editTemplate) {
                field.editTemplate = (value, item) => {
                    const result = column.editTemplate(value, item);
                    return typeof result === 'string'
                        ? Object.assign(document.createElement("div"), { innerHTML: result })
                        : attachEvents(result, item);
                };
            }
            if (this.options.enableInsert && column.insertTemplate) {
                field.insertTemplate = () => {
                    const result = column.insertTemplate();
                    return typeof result === 'string'
                        ? Object.assign(document.createElement("div"), { innerHTML: result })
                        : attachEvents(result, {});
                };
            }
            return field;
        });
        if (this.options.enableEdit || this.options.enableDelete) {
            jsGridFields.push({
                type: "control",
                editButton: this.options.enableEdit,
                deleteButton: this.options.enableDelete,
                clearFilterButton: false
            });
        }
        $(grid).jsGrid({
            width: "100%",
            height: this.options.infiniteScroll ? "600px" : "auto",
            inserting: this.options.enableInsert,
            editing: this.options.enableEdit,
            sorting: true,
            paging: !this.options.infiniteScroll,
            pageSize: this.options.pageSize || 20,
            autoload: true,
            deleteConfirm: "هل أنت متأكد؟",
            data: this.filteredData,
            direction: this.options.direction,
            controller: {
                loadData: () => this.filteredData,
                insertItem: (item) => {
                    var _a, _b;
                    item[this.options.keyField || "id"] = Date.now();
                    this.options.dataSource.unshift(item);
                    this.applySearchFilter();
                    (_b = (_a = this.options).onClickInsert) === null || _b === void 0 ? void 0 : _b.call(_a, item);
                    return item;
                },
                updateItem: (item) => {
                    var _a, _b;
                    const index = this.findItemIndex(item);
                    if (index > -1)
                        this.options.dataSource[index] = item;
                    this.applySearchFilter();
                    (_b = (_a = this.options).onClickEdit) === null || _b === void 0 ? void 0 : _b.call(_a, item);
                    return item;
                },
                deleteItem: (item) => {
                    var _a, _b;
                    const index = this.findItemIndex(item);
                    if (index > -1)
                        this.options.dataSource.splice(index, 1);
                    this.applySearchFilter();
                    (_b = (_a = this.options).onClickDelete) === null || _b === void 0 ? void 0 : _b.call(_a, item);
                    return item;
                }
            },
            fields: jsGridFields,
            rowClick: (args) => {
                if (args.event.detail === 2) {
                    setTimeout(() => {
                        var _a, _b;
                        (_b = (_a = this.options).onRowDoubleClicked) === null || _b === void 0 ? void 0 : _b.call(_a, args.item);
                    }, 50);
                }
            }
        });
        if (this.options.infiniteScroll)
            this.attachInfiniteScroll();
    }
    findItemIndex(item) {
        const keyField = this.options.keyField || "id";
        return this.options.dataSource.findIndex(obj => obj[keyField] === item[keyField]);
    }
    attachInfiniteScroll() {
        const gridBody = this.container.querySelector(".jsgrid-grid-body");
        if (!gridBody)
            return;
        gridBody.addEventListener("scroll", () => {
            if (gridBody.scrollTop + gridBody.clientHeight >= gridBody.scrollHeight - 5) {
                const currentLength = this.filteredData.length;
                const nextChunk = this.options.dataSource.slice(currentLength, currentLength + (this.options.pageSize || 20));
                if (nextChunk.length > 0) {
                    this.filteredData = [...this.filteredData, ...nextChunk];
                    $(this.gridInstance).jsGrid("option", "data", this.filteredData);
                }
            }
        });
    }
    refresh() {
        this.applySearchFilter();
        this.renderGrid();
    }
}
//# sourceMappingURL=StGrid.js.map