// نسخة مُعدّلة من StGridBuilder تدعم التهيئة بأسلوب Properties

interface StGridColumn {
    name: string;
    title?: string;
    type?: string;
    width?: number;
    visible?: boolean;
    align?: 'left' | 'right' | 'center';
    editing?: boolean;
    inserting?: boolean;
    decimal?: boolean; // ✅ جديد: لتحديد إذا الرقم يقبل كسر أو لا
    Digits?: boolean; // ✅ أضف هذا السطر
    itemTemplate?: (value: any, item: any) => string | HTMLElement;
    editTemplate?: (value: any, item: any) => string | HTMLElement;
    insertTemplate?: () => string | HTMLElement;
    cellRenderer?: (value: any, item: any, column: StGridColumn) => HTMLElement;
    events?: {
        [eventName: string]: (event: Event, item: any, column: StGridColumn) => void;
    };
    editValue?: (el: HTMLElement) => any;     // ✅ جديد
    insertValue?: (el: HTMLElement) => any;   // ✅ جديد
}


interface StGridOptions {
    elementId?: string;
    columns?: StGridColumn[];
    dataSource?: any[];
    keyField?: string;
    enableInsert?: boolean;
    enableCopy?: boolean; // جديد 
    enableEdit?: boolean;
    enableDelete?: boolean;
    enableSearch?: boolean;
    infiniteScroll?: boolean;
    pageSize?: number;
    direction?: 'rtl' | 'ltr';
    onClickInsert?: (item: any) => boolean;
    onClickCopy?: (item: any) => boolean; 
    onClickEdit?: (item: any) => boolean;
    onClickDelete?: (item: any) => void;
    onRowDoubleClicked?: (item: any) => void;
    onFetchPage?: (pageNumber: number) => Promise<any[]>; // استدعاء خارجي لجلب صفحة جديدة من البيانات 
}
 

class StGridBuilder {
    private options: Partial<StGridOptions> = {};
    private container: HTMLElement | null = null;
    private searchBox!: HTMLInputElement;
    private filteredData: any[] = [];
    private gridInstance: HTMLElement | null = null;
    private currentPage: number = 1;
    private isFetching: boolean = false;


    public get ElementName() {
        return this.options.elementId || "";
    }
    public set ElementName(value: string) {
        this.options.elementId = value;
        this.container = document.getElementById(value)!;
    }

    public set columns(value: StGridColumn[]) {
        this.options.columns = value;
    }

    public set DataSource(value: any[]) {
        this.options.dataSource = value;
        this.filteredData = [...value];
    }

    public set keyField(value: string) {
        this.options.keyField = value;
    }

    public set enableInsert(value: boolean) {
        this.options.enableInsert = value;
    }
    public set enableCopy(value: boolean) {
        this.options.enableCopy = value;
    }

    public set enableEdit(value: boolean) {
        this.options.enableEdit = value;
    }
    public set enableDelete(value: boolean) {
        this.options.enableDelete = value;
    }
    public set enableSearch(value: boolean) {
        this.options.enableSearch = value;
    }
    public set infiniteScroll(value: boolean) {
        this.options.infiniteScroll = value;
    }
    public set pageSize(value: number) {
        this.options.pageSize = value;
    }
    public set direction(value: 'rtl' | 'ltr') {
        this.options.direction = value;
    }

    public set onClickInsert(value: (item: any) => boolean) {
        this.options.onClickInsert = value;
    }
    public set onClickCopy(value: (item: any) => boolean) {
        this.options.onClickCopy = value;
    }

    public set onClickEdit(value: (item: any) => boolean) {
        this.options.onClickEdit = value;
    }
    public set onClickDelete(value: (item: any) => void) {
        this.options.onClickDelete = value;
    }
    public set onRowDoubleClicked(value: (item: any) => void) {
        this.options.onRowDoubleClicked = value;
    }

    public set onFetchPage(value: (pageNumber: number) => Promise<any[]>) {
        this.options.onFetchPage = value;
    }


    public async Bind() {
        if (!this.container || !this.options.columns) {
           // console.error("StGridBuilder: لم يتم تهيئة الأعمدة أو العنصر بشكل صحيح.");
            return;
        }

        // ✅ تحميل أول صفحة إذا كان Infinite Scroll مفعّل
        if (this.options.infiniteScroll && this.options.onFetchPage) {
            this.currentPage = 1;
            const initialData = await this.options.onFetchPage(this.currentPage);
            this.options.dataSource = initialData;
            this.filteredData = [...initialData];
        }

        if (this.options.enableSearch) this.createSearchBox();
        this.renderGrid();
    }


    private createSearchBox() {

        $('.Search_Grid_Pagn').remove();

        const wrapper = document.createElement("div");
        wrapper.style.marginBottom = "10px";
        wrapper.classList.add("Search_Grid_Pagn")
        
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
        this.container!.appendChild(wrapper);
    }

    private applySearchFilter() {
        if (!this.options.enableSearch || !this.searchBox?.value) {
            this.filteredData = [...this.options.dataSource!];
        } else {
            const keyword = this.searchBox.value.toLowerCase();
            this.filteredData = this.options.dataSource!.filter((row: any) => {
                const values: any[] = [];
                for (const key in row) {
                    if (row.hasOwnProperty(key)) values.push(row[key]);
                }
                return values.some(val =>
                    val !== null && val !== undefined && val.toString().toLowerCase().includes(keyword)
                );
            });
        }
    }

    private renderGrid() {
        if (this.gridInstance) this.container!.removeChild(this.gridInstance);

        const grid = document.createElement("div");
        this.gridInstance = grid;
        this.container!.appendChild(grid);

        const jsGridFields = this.options.columns!.map(column => {
            const field: any = {
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

                field.itemTemplate = (value: any) => {
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






            const attachEvents = (element: HTMLElement, item: any) => {
                if (column.events) {
                    for (const eventName in column.events) {
                        element.addEventListener(eventName, (event) => {
                            column.events![eventName](event, item, column);
                        });
                    }
                }
                return element;
            };

            if (column.itemTemplate || column.cellRenderer) {
                field.itemTemplate = (value: any, item: any) => {
                    let element: HTMLElement;

                    if (column.cellRenderer) {
                        element = column.cellRenderer(value, item, column);
                    } else {
                        element = document.createElement("div");
                        const result = column.itemTemplate!(value, item);
                        if (typeof result === 'string') element.innerHTML = result;
                        else element.appendChild(result);
                    }

                    return attachEvents(element, item);
                };
            }

            // ✅ دعم تنسيق input/edit تلقائيًا للأرقام (type === "number")
            if (field.type === "number" && !column.editTemplate) {
                let editInput: HTMLInputElement;
                const isDecimal = column.decimal !== false;
                field.editTemplate = (value: any) => {
                    editInput = document.createElement("input");
                    editInput.type = "number";
                    editInput.step = isDecimal ? "0.01" : "1"; // ✨
                    editInput.value = value != null ? parseFloat(value).toString() : "";
                    return editInput;
                };
                field.editValue = () =>
                    isDecimal ? parseFloat(editInput.value) : parseInt(editInput.value);

            }

            if (field.type === "number" && !column.insertTemplate) {
                let insertInput: HTMLInputElement;
                const isDecimal = column.decimal !== false;
                field.insertTemplate = () => {
                    insertInput = document.createElement("input");
                    insertInput.type = "number";
                    insertInput.step = isDecimal ? "0.01" : "1"; // ✨
                    return insertInput;
                };
                field.insertValue = () =>
                    isDecimal ? parseFloat(insertInput.value) : parseInt(insertInput.value);

            }

            // ✅ لو تم تفعيل التعديل وتم تعريف قالب مخصص له
            if (this.options.enableEdit && column.editTemplate) {
                field.editTemplate = (value: any, item: any) => {
                    const result = column.editTemplate!(value, item);
                    return typeof result === 'string'
                        ? Object.assign(document.createElement("div"), { innerHTML: result })
                        : attachEvents(result, item);
                };
            }

            // ✅ لو تم تفعيل الإدخال وتم تعريف قالب مخصص له
            if (this.options.enableInsert && column.insertTemplate) {
                field.insertTemplate = () => {
                    const result = column.insertTemplate!();
                    return typeof result === 'string'
                        ? Object.assign(document.createElement("div"), { innerHTML: result })
                        : attachEvents(result, {});
                };
            }

            // ✅ دعم دوال editValue و insertValue
            if (column.editValue) field.editValue = column.editValue;
            if (column.insertValue) field.insertValue = column.insertValue;


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
                itemTemplate: (_value: any, item: any) => {
                    const createStyledButton = (
                        icon: string,
                        title: string,
                        onClick: () => void,
                        backgroundColor: string,
                        hoverColor: string
                    ): HTMLButtonElement => {
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
                        container.appendChild(
                            createStyledButton("✏️", "تعديل", () => {
                                const grid = $(this.gridInstance!) as any;
                                grid.jsGrid("editItem", item);
                            }, "#28a745", "#1e7e34")
                        );
                    }

                    if (this.options.enableDelete) {
                        container.appendChild(
                            createStyledButton("🗑️", "حذف", () => {
                                const grid = $(this.gridInstance!) as any;
                                grid.jsGrid("deleteItem", item);
                            }, "#dc3545", "#a71d2a")
                        );
                    }

                    if (this.options.enableCopy && this.options.onClickCopy) {
                        container.appendChild(
                            createStyledButton("📋", "نسخ", () => {
                                this.options.onClickCopy!(item);
                            }, "#007bff", "#0056b3") 
                        );
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

                insertItem: (item: any) => {
                    const result = this.options.onClickInsert?.(item);
                    if (result === false) {

                        const deferred = $.Deferred();
                        deferred.reject(); // يمنع الخروج من وضع الإدخال
                        return deferred.promise();
                         
                    }

                    item[this.options.keyField || "id"] = Date.now();
                    this.options.dataSource!.unshift(item);
                    this.applySearchFilter();
                    return item;
                },

                updateItem: (item: any) => {
                    const result = this.options.onClickEdit?.(item); 
                    if (result === false) {

                        const deferred = $.Deferred();
                        deferred.reject(); // يمنع الخروج من وضع التعديل
                        return deferred.promise();
                    }
                     
                    const index = this.findItemIndex(item);
                    if (index > -1) this.options.dataSource![index] = item;
                    this.applySearchFilter();
                    return item;
                },


                deleteItem: (item: any) => {
                  
                    const index = this.findItemIndex(item);
                    if (index > -1) this.options.dataSource!.splice(index, 1);
                    this.applySearchFilter();
                    this.options.onClickDelete?.(item);
                    return item;
                }
                ,
                 copyItem: (item: any) => {
                    const result = this.options.onClickInsert?.(item);
                    if (result === false) {

                        const deferred = $.Deferred();
                        deferred.reject(); // يمنع الخروج من وضع الإدخال
                        return deferred.promise();

                    }

                    item[this.options.keyField || "id"] = Date.now();
                    this.options.dataSource!.unshift(item);
                    this.applySearchFilter();
                    return item;
                },
            }
,

            fields: jsGridFields,

            rowClick: (args: any) => {
                if ((args.event as any).detail === 2) {
                    setTimeout(() => {
                        this.options.onRowDoubleClicked?.(args.item);
                    }, 50);
                }
            }
        });

        if (this.options.infiniteScroll) this.attachInfiniteScroll();
    }

    private findItemIndex(item: any): number {
        const keyField = this.options.keyField || "id";
        return this.options.dataSource!.findIndex(obj => obj[keyField] === item[keyField]);
    }

    private attachInfiniteScroll() {
        const gridBody = this.container!.querySelector(".jsgrid-grid-body") as HTMLElement;
        if (!gridBody) return;

        gridBody.addEventListener("scroll", async () => {
            if (gridBody.scrollTop + gridBody.clientHeight >= gridBody.scrollHeight - 5) {
                if (this.isFetching) return; // منع التكرار

                this.isFetching = true;
                this.currentPage++;

                if (this.options.onFetchPage) {
                    const newData = await this.options.onFetchPage(this.currentPage);
                    if (Array.isArray(newData) && newData.length > 0) {
                        this.options.dataSource!.push(...newData);
                        this.filteredData.push(...newData);
                        $(this.gridInstance!).jsGrid("option", "data", this.filteredData);
                    }
                }

                this.isFetching = false;
            }
        });
    }


    public refresh() {
        this.applySearchFilter();
        this.renderGrid();
    }
}