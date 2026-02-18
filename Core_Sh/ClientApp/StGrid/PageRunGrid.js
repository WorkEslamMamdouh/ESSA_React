$(document).ready(() => {
    PageRunGrid.InitalizeComponent();
});
var PageRunGrid;
(function (PageRunGrid) {
    var SysSession = GetSystemSession(Modules.SlsTrSalesManager);
    var data = [
        { id: 1, name: "أحمد", age: 30, department: "تطوير" },
        { id: 2, name: "محمد", age: 25, department: "تصميم" },
        { id: 3, name: "علي", age: 35, department: "تسويق" }
    ];
    function InitalizeComponent() {
        var Grid = new StGridBuilder();
        Grid.ElementName = "StGrid";
        Grid.keyField = "id";
        Grid.enableInsert = true;
        Grid.enableEdit = true;
        Grid.enableDelete = true;
        Grid.enableSearch = true;
        Grid.infiniteScroll = true;
        Grid.pageSize = 10;
        Grid.direction = "rtl";
        Grid.onClickInsert = (item) => console.log("تم الإدراج:", item);
        Grid.onClickEdit = (item) => console.log("تم التعديل:", item);
        Grid.onClickDelete = (item) => console.log("تم الحذف:", item);
        Grid.onRowDoubleClicked = (item) => alert("نقر مزدوج:" + item.id);
        Grid.columns = [
            { name: "name", title: "الاسم", width: 100 },
            { name: "age", title: "العمر", width: 80 },
            { name: "department", title: "القسم", width: 100 },
            {
                title: "Test", name: "TrDate", width: 100,
                editing: false,
                inserting: false,
                itemTemplate: (value, item) => {
                    let txt = document.createElement("label");
                    txt.innerHTML = item.department;
                    return txt;
                },
                editTemplate: (value, item) => {
                    let Btn = document.createElement("button");
                    Btn.textContent = item.department;
                    Btn.className = "btn btn-warning btn-sm";
                    Btn.onclick = () => { alert("تعديل - " + item.id); };
                    return Btn;
                },
                insertTemplate: () => {
                    let Btn = document.createElement("button");
                    Btn.textContent = "اضافة الأصناف";
                    Btn.className = "btn btn-success btn-sm";
                    Btn.onclick = () => { alert("إضافة جديدة"); };
                    return Btn;
                }
            },
        ];
        Grid.DataSource = data;
        Grid.Bind();
    }
    PageRunGrid.InitalizeComponent = InitalizeComponent;
})(PageRunGrid || (PageRunGrid = {}));
//# sourceMappingURL=PageRunGrid.js.map