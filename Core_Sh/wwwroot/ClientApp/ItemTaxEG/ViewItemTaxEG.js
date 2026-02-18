$(document).ready(() => {
    ViewItemTaxEG.InitalizeComponent();
});
var ViewItemTaxEG;
(function (ViewItemTaxEG) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var _Grid = new JsGrid();
    var Res = GetGlopelResources();
    var _Datanone = new Array();
    var Filter_View;
    var btnDelete_Filter;
    var flagItem = SysSession.CurrentEnvironment.I_Control.ISWork_Type_Items;
    var ExcelCon = "";
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        SearchID();
        Close_Loder();
    }
    ViewItemTaxEG.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        Filter_View.onclick = () => { GetData(); };
        btnDelete_Filter.onclick = Clear;
    }
    function SearchID() {
        SearchIDGnr(() => {
            ViewUser(ModelSearch.ModelMaster);
        });
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        _Grid.PrimaryKey = "ItemTaxID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "ItemTaxID", name: "ItemTaxID", visible: false, width: "100px" },
            { title: Res.Lang == "En" ? "itemCode" : "رمز الصنف", name: "itemCode", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "CodeType" : "نوع الصنف", name: "CodeType", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "codeName" : "اسم الصنف", name: "codeName", type: "text", width: "100px" },
            { title: Res.Lang == "En" ? "codeNameAr" : "اسم الصنف", name: "codeNameAr", type: "text", width: "100px" },
            {
                title: Res.Lang == "En" ? "Edit" : "تعديل",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = (Res.Lang == "En" ? "Edit" : "تعديل" + " ⚙️");
                    txt.id = "butView" + item.ItemTaxID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    if (!SysSession.CurrentPrivileges.EDIT) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
            {
                visible: (SysSession.CurrentEnvironment.I_Control.IsArchive == true ? true : false), title: Res.Lang == "Ar" ? "ارشفه" : "Archive",
                itemTemplate: (s, item) => {
                    let txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = "📩";
                    txt.id = "butArchive" + item.ItemTaxID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.style.backgroundColor = "#16c76d";
                    txt.style.borderRadius = "50%";
                    txt.style.width = "50px";
                    if (!SysSession.CurrentPrivileges.IsArchive) {
                        txt.disabled = true;
                    }
                    txt.onclick = (e) => {
                        ShowArchive(SysSession.CurrentEnvironment.GQ_USERS.ID.toString(), SysSession.CurrentEnvironment.CompCode.toString(), GetModelCodeFromUrl(), item.ItemTaxID.toString(), txt.id);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function GetData(IsChangeActive = false, ID = 0, Status = false, ISDirect = false) {
        if (!SysSession.CurrentPrivileges.VIEW) {
            ShowMessage(" Not Privilege View 😒", " لا يوجد صلاحية العرض 😒");
            return;
        }
        CleaningList_Table();
        let Con = "";
        ExcelCon = "COMP_CODE = " + CompCode + Con;
        if (ISDirect) {
            DisplayDirectPagination(_Grid, 'D_I_ItemTaxEG', "COMP_CODE = " + CompCode + Con, SelectPageNumber.PageNumber, 5, "ItemTaxID");
        }
        else {
            DisplayGridByPagination(_Grid, 'D_I_ItemTaxEG', " COMP_CODE = " + CompCode + Con, 1, 5, "ItemTaxID");
        }
        $('#btnDelete_Filter').removeClass('display_none');
        if (IsChangeActive && ID > 0) {
            let chack = _Grid.DataSource.filter(x => x.ItemTaxID == ID);
            if (chack.length > 0) {
                if (chack[0].ISActive == Status) {
                    ShowMessage("Done Change 😍👌" + (Status == false ? " Not Active " : " Active "), "تم التغيير 😍👌" + (Status == false ? " عدم الموافقة " : " الموافقة "));
                }
                else {
                    ShowMessage("No Changes 😒", "لا تغييرات 😒");
                }
            }
        }
    }
    function ViewUser(item) {
        $("#Open").focus();
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item);
        OpenPagePartial("ItemTaxEG", "Edit ItemTaxEG 👤", () => { Display_Refrsh(); });
    }
    function Clear() {
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Datanone;
        _Grid.Bind();
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
        GetData(false, 0, false, true);
    }
})(ViewItemTaxEG || (ViewItemTaxEG = {}));
//# sourceMappingURL=ViewItemTaxEG.js.map