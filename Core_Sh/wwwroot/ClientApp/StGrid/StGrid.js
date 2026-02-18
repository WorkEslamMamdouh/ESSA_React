// نسخة مُعدّلة من StGridBuilder تدعم التهيئة بأسلوب Properties
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class StGridBuilder {
    constructor() {
        this.options = {};
        this.container = null;
        this.filteredData = [];
        this.gridInstance = null;
        this.currentPage = 1;
        this.isFetching = false;
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
    set enableCopy(value) {
        this.options.enableCopy = value;
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
    set onClickCopy(value) {
        this.options.onClickCopy = value;
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
    set onFetchPage(value) {
        this.options.onFetchPage = value;
    }
    Bind() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.container || !this.options.columns) {
                // console.error("StGridBuilder: لم يتم تهيئة الأعمدة أو العنصر بشكل صحيح.");
                return;
            }
            // ✅ تحميل أول صفحة إذا كان Infinite Scroll مفعّل
            if (this.options.infiniteScroll && this.options.onFetchPage) {
                this.currentPage = 1;
                const initialData = yield this.options.onFetchPage(this.currentPage);
                this.options.dataSource = initialData;
                this.filteredData = [...initialData];
            }
            if (this.options.enableSearch)
                this.createSearchBox();
            this.renderGrid();
        });
    }
    createSearchBox() {
        $('.Search_Grid_Pagn').remove();
        const wrapper = document.createElement("div");
        wrapper.style.marginBottom = "10px";
        wrapper.classList.add("Search_Grid_Pagn");
        wrapper.innerHTML = "";
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
            // ✅ لو النوع "number" ولم يتم تعريف itemTemplate، نعرض الرقم بـ toFixed(2)
            if (field.type === "number" && !column.itemTemplate && !column.cellRenderer) {
                const isDecimal = column.decimal === true;
                const useDigits = column.Digits === true;
                field.itemTemplate = (value) => {
                    const num = Number(value);
                    if (value == null || value === "" || isNaN(num)) {
                        return "";
                    }
                    const displayValue = isDecimal ? num : Math.round(num);
                    if (useDigits) {
                        return displayValue.toLocaleString('en-US', {
                            minimumFractionDigits: isDecimal ? 2 : 0,
                            maximumFractionDigits: isDecimal ? 2 : 0
                        });
                    }
                    return isDecimal ? num.toFixed(2) : Math.round(num).toString();
                };
            }
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
            // ✅ دعم تنسيق input/edit تلقائيًا للأرقام (type === "number")
            if (field.type === "number" && !column.editTemplate) {
                let editInput;
                const isDecimal = column.decimal !== false;
                field.editTemplate = (value) => {
                    editInput = document.createElement("input");
                    editInput.type = "number";
                    editInput.step = isDecimal ? "0.01" : "1"; // ✨
                    editInput.value = value != null ? parseFloat(value).toString() : "";
                    return editInput;
                };
                field.editValue = () => isDecimal ? parseFloat(editInput.value) : parseInt(editInput.value);
            }
            if (field.type === "number" && !column.insertTemplate) {
                let insertInput;
                const isDecimal = column.decimal !== false;
                field.insertTemplate = () => {
                    insertInput = document.createElement("input");
                    insertInput.type = "number";
                    insertInput.step = isDecimal ? "0.01" : "1"; // ✨
                    return insertInput;
                };
                field.insertValue = () => isDecimal ? parseFloat(insertInput.value) : parseInt(insertInput.value);
            }
            // ✅ لو تم تفعيل التعديل وتم تعريف قالب مخصص له
            if (this.options.enableEdit && column.editTemplate) {
                field.editTemplate = (value, item) => {
                    const result = column.editTemplate(value, item);
                    return typeof result === 'string'
                        ? Object.assign(document.createElement("div"), { innerHTML: result })
                        : attachEvents(result, item);
                };
            }
            // ✅ لو تم تفعيل الإدخال وتم تعريف قالب مخصص له
            if (this.options.enableInsert && column.insertTemplate) {
                field.insertTemplate = () => {
                    const result = column.insertTemplate();
                    return typeof result === 'string'
                        ? Object.assign(document.createElement("div"), { innerHTML: result })
                        : attachEvents(result, {});
                };
            }
            // ✅ دعم دوال editValue و insertValue
            if (column.editValue)
                field.editValue = column.editValue;
            if (column.insertValue)
                field.insertValue = column.insertValue;
            return field;
        });
        if (this.options.enableEdit || this.options.enableDelete || this.options.enableCopy) {
            jsGridFields.push({
                type: "control",
                editButton: false,
                deleteButton: false,
                clearFilterButton: false,
                modeSwitchButton: true,
                width: 100,
                itemTemplate: (_value, item) => {
                    const createStyledButton = (icon, title, onClick, backgroundColor, hoverColor) => {
                        const btn = document.createElement("button");
                        btn.title = title;
                        btn.innerHTML = icon;
                        btn.style.border = "none";
                        btn.style.borderRadius = "50%";
                        btn.style.width = "36px";
                        btn.style.height = "36px";
                        btn.style.fontSize = "16px";
                        btn.style.display = "flex";
                        btn.style.alignItems = "center";
                        btn.style.justifyContent = "center";
                        btn.style.cursor = "pointer";
                        btn.style.transition = "transform 0.2s ease, background-color 0.3s ease";
                        btn.style.backgroundColor = backgroundColor;
                        btn.style.color = "white";
                        btn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.15)";
                        // Hover animation (with JS because no class)
                        btn.addEventListener("mouseenter", () => {
                            btn.style.transform = "scale(1.15)";
                            btn.style.backgroundColor = hoverColor;
                        });
                        btn.addEventListener("mouseleave", () => {
                            btn.style.transform = "scale(1)";
                            btn.style.backgroundColor = backgroundColor;
                        });
                        btn.onclick = (e) => {
                            e.stopPropagation();
                            onClick();
                        };
                        return btn;
                    };
                    const container = document.createElement("div");
                    container.style.display = "flex";
                    container.style.justifyContent = "center";
                    container.style.gap = "6px";
                    if (this.options.enableEdit) {
                        container.appendChild(createStyledButton("✏️", "تعديل", () => {
                            const grid = $(this.gridInstance);
                            grid.jsGrid("editItem", item);
                        }, "#28a745", "#1e7e34"));
                    }
                    if (this.options.enableDelete) {
                        container.appendChild(createStyledButton("🗑️", "حذف", () => {
                            const grid = $(this.gridInstance);
                            grid.jsGrid("deleteItem", item);
                        }, "#dc3545", "#a71d2a"));
                    }
                    if (this.options.enableCopy && this.options.onClickCopy) {
                        container.appendChild(createStyledButton("📋", "نسخ", () => {
                            this.options.onClickCopy(item);
                        }, "#007bff", "#0056b3"));
                    }
                    return container;
                }
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
                    const result = (_b = (_a = this.options).onClickInsert) === null || _b === void 0 ? void 0 : _b.call(_a, item);
                    if (result === false) {
                        const deferred = $.Deferred();
                        deferred.reject(); // يمنع الخروج من وضع الإدخال
                        return deferred.promise();
                    }
                    item[this.options.keyField || "id"] = Date.now();
                    this.options.dataSource.unshift(item);
                    this.applySearchFilter();
                    return item;
                },
                updateItem: (item) => {
                    var _a, _b;
                    const result = (_b = (_a = this.options).onClickEdit) === null || _b === void 0 ? void 0 : _b.call(_a, item);
                    if (result === false) {
                        const deferred = $.Deferred();
                        deferred.reject(); // يمنع الخروج من وضع التعديل
                        return deferred.promise();
                    }
                    const index = this.findItemIndex(item);
                    if (index > -1)
                        this.options.dataSource[index] = item;
                    this.applySearchFilter();
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
                },
                copyItem: (item) => {
                    var _a, _b;
                    const result = (_b = (_a = this.options).onClickInsert) === null || _b === void 0 ? void 0 : _b.call(_a, item);
                    if (result === false) {
                        const deferred = $.Deferred();
                        deferred.reject(); // يمنع الخروج من وضع الإدخال
                        return deferred.promise();
                    }
                    item[this.options.keyField || "id"] = Date.now();
                    this.options.dataSource.unshift(item);
                    this.applySearchFilter();
                    return item;
                },
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
        gridBody.addEventListener("scroll", () => __awaiter(this, void 0, void 0, function* () {
            if (gridBody.scrollTop + gridBody.clientHeight >= gridBody.scrollHeight - 5) {
                if (this.isFetching)
                    return; // منع التكرار
                this.isFetching = true;
                this.currentPage++;
                if (this.options.onFetchPage) {
                    const newData = yield this.options.onFetchPage(this.currentPage);
                    if (Array.isArray(newData) && newData.length > 0) {
                        this.options.dataSource.push(...newData);
                        this.filteredData.push(...newData);
                        $(this.gridInstance).jsGrid("option", "data", this.filteredData);
                    }
                }
                this.isFetching = false;
            }
        }));
    }
    refresh() {
        this.applySearchFilter();
        this.renderGrid();
    }
}
//# sourceMappingURL=StGrid.js.map