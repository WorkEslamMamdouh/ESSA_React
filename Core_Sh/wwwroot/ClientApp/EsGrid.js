//----------------------------------------------------------------ESGrid--------------------------------------
//class I_D_UOM {
//    constructor() {
//        this.UomID = 0;
//        this.UomCode = "";
//        this.DescA = "";
//        this.DescE = "";
//        this.CompCode = 0;
//        this.Remarks = "";
//        this.CreatedAt = "";
//        this.CreatedBy = "";
//        this.UpdatedAt = "";
//        this.UpdatedBy = "";
//        this.StatusFlag = "";
//    }
//    public UomID: number;
//    public UomCode: string;
//    public DescA: string;
//    public DescE: string;
//    public CompCode: number;
//    public Remarks: string;
//    public CreatedAt: string;
//    public CreatedBy: string;
//    public UpdatedAt: string;
//    public UpdatedBy: string;
//    public StatusFlag: string;
//}
class ESGrid {
    constructor() {
        this.ESG = new ESG();
        this.Column = new Array();
    }
}
class ESG {
    constructor() {
        this.PrimaryKey = "";
        this.NameTable = "";
        this.Save = true;
        this.Back = true;
        this.DeleteRow = true;
        this.CopyRow = true;
        this.Add = true;
        this.Edit = true;
        this.ModeInsert = false;
        this.ModeUpdate = false;
        this.SelectedKey;
        this.LastCounter = 0;
        this.LastCounterAdd = 0;
        this.RowCnt = 0;
        this.Cnt = 0;
        this.Right = true;
        this.object = new Object();
        this.TotalModel = new Object();
        this.Model = new Array();
        this.OnfunctionSave;
        this.OnfunctionTotal;
        this.OnRowDoubleClicked;
        this.OnRowRunFunction = null;
    }
}
class Column {
    constructor() {
        this.StyleElment = "";
        this.style = "width: 100%";
        this.title = "";
        this.ID = "";
        this.Name = "";
        this.class = "";
        this.RowClass = "";
        this.value = "0";
        this.Type = "text";
        this.visible = true;
        this.Edit = true;
        this.Validation = new Valid_Con;
        this.ColumnType = new ControlEvents;
    }
}
class Valid_Con {
    constructor() {
        this.valid = false;
        this.SetConation = '';
        this.Mess = '';
    }
}
class ControlEvents {
    constructor() {
        this.NameType = '';
        this.Value = '';
        this.textField = '';
        this.NameDefult = '';
        this.onclick;
        this.onkeyup;
        this.onchange;
        this.dataSource;
    }
}
var Valid = {
    Set: function (valid, Mess, SetConation) {
        var Valid_Co = new Valid_Con();
        Valid_Co.valid = valid;
        Valid_Co.SetConation = SetConation;
        Valid_Co.Mess = Mess;
        return Valid_Co;
    },
};
var ControlType;
(function (ControlType) {
    String.prototype.Get_ID = function (Grid) {
        let NameFild = this;
        let value = '' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '';
        return (value);
    };
    String.prototype.Get_Val = function (Grid) {
        let NameFild = this;
        let value = $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val();
        return (value);
    };
    String.prototype.Set_Val = function (value, Grid) {
        let NameFild = this;
        if (value == "true" || value == "false") {
            $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').prop("checked", value);
        }
        else {
            //alert(value)
            $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val(value);
        }
        return (value);
    };
    String.prototype.Set_Val_From_localStor = function (Key, Grid) {
        let NameFild = this;
        let value = localStorage.getItem(Key);
        if (value == "true" || value == "false") {
            $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').prop("checked", value);
        }
        else {
            $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val(value);
        }
        return (value);
    };
    String.prototype.Add_Attr = function (NameAttr, value, Grid) {
        let NameFild = this;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').attr(NameAttr, value);
        return (value);
    };
    String.prototype.RemoveAttr = function (value, Grid) {
        let NameFild = this;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').removeAttr(value);
        return (value);
    };
    String.prototype.Add_Class = function (value, Grid) {
        let NameFild = this;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').addClass(value);
        return (value);
    };
    String.prototype.RemoveClass = function (value, Grid) {
        let NameFild = this;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').removeClass(value);
        return (value);
    };
    String.prototype.Get_Num = function (Grid) {
        let NameFild = this;
        let value = $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val();
        return (Number(value));
    };
    String.prototype.Get_Cheak = function (Grid) {
        let NameFild = this;
        let value = $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').is(":checked");
        return (value);
    };
    String.prototype.html = function (value, Grid) {
        let NameFild = this;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').html(value);
        return (value);
    };
    String.prototype.append = function (value, Grid) {
        let NameFild = this;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').append(value);
        return (value);
    };
    String.prototype.Get_IDInRow = function (Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        let value = '' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '';
        return (value);
    };
    String.prototype.Get_ValInRow = function (Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        let value = $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').val();
        return (value);
    };
    String.prototype.Set_ValInRow = function (value, Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        if (value == true || value == false) {
            $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').prop("checked", value);
        }
        else {
            $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').val(value);
        }
        return (value);
    };
    String.prototype.Get_NumInRow = function (Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        let value = $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').val();
        return (Number(value));
    };
    String.prototype.Get_CheakInRow = function (Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        let value = $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').is(":checked");
        return (value);
    };
    String.prototype.htmlInRow = function (value, Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').html(value);
        return (value);
    };
    String.prototype.appendInRow = function (value, Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').append(value);
        return (value);
    };
    String.prototype.Add_AttrInRow = function (NameAttr, value, Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').attr(NameAttr, value);
        return (value);
    };
    String.prototype.RemoveAttrInRow = function (value, Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').removeAttr(value);
        return (value);
    };
    String.prototype.Add_ClassInRow = function (value, Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').addClass(value);
        return (value);
    };
    String.prototype.RemoveClassInRow = function (value, Grid) {
        let NameFild = this;
        let RowCnt = localStorage.getItem('RowCnt');
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').removeClass(value);
        return (value);
    };
    //*************************************New***************************************
    String.prototype.G_F_ID = function (Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        let value = '' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '';
        return (value);
    };
    String.prototype.G_F_Cheak = function (Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        let value = $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').is(":checked");
        return (value);
    };
    String.prototype.Get_StatusFlag = function (Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.UnCnt;
        let value = $('#' + NameFild + '_' + Grid.ESG.NameTable + '_' + RowCnt + '').val();
        return (value);
    };
    String.prototype.G_F_Val = function (Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        let value = $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').val();
        return (value);
    };
    String.prototype.S_F_Val = function (value, Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        if (value == true || value == false) {
            $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').prop("checked", value);
        }
        else {
            $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').val(value);
        }
        return (value);
    };
    String.prototype.G_F_Num = function (Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        let value = $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').val();
        return (Number(value));
    };
    String.prototype.F_Html = function (value, Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').html(value);
        return (value);
    };
    String.prototype.F_Change = function (Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').change();
        return ("");
    };
    String.prototype.F_append = function (value, Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').append(value);
        return (value);
    };
    String.prototype.Add_F_Attr = function (NameAttr, value, Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').attr(NameAttr, value);
        return (value);
    };
    String.prototype.F_RemoveAttr = function (value, Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').removeAttr(value);
        return (value);
    };
    String.prototype.Add_F_Class = function (value, Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').addClass(value);
        return (value);
    };
    String.prototype.F_RemoveClass = function (value, Grid) {
        let NameFild = this;
        let RowCnt = Grid.ESG.RowCnt;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + RowCnt + '').removeClass(value);
        return (value);
    };
    var ControlEvent = new ControlEvents();
    function Input(onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'Input';
        return ControlEvent;
    }
    ControlType.Input = Input;
    function checkbox(onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'checkbox';
        return ControlEvent;
    }
    ControlType.checkbox = checkbox;
    function Button(onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'Button';
        return ControlEvent;
    }
    ControlType.Button = Button;
    function Dropdown(dataSourc, Value, textField, NameDefult, onchange, onkeyup, onclick) {
        console.log("ok");
        console.log(dataSourc);
        console.log("ok");
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = dataSourc;
        ControlEvent.NameType = 'Dropdown';
        ControlEvent.textField = textField;
        ControlEvent.Value = Value;
        ControlEvent.NameDefult = NameDefult;
        return ControlEvent;
    }
    ControlType.Dropdown = Dropdown;
})(ControlType || (ControlType = {}));
var flagNotClick = false;
var flagBack = false;
var FlagValid = true;
let classs = $('<style> .display_hidden {display:none !important; }  .Text_right {text-align: right; }  .Text_left {text-align: left; } .Search_grid { background-position: 10px 10px;background-repeat: no-repeat;width: 100%;font-size: 16px;padding: 12px 20px 12px 40px;border: 1px solid #ddd;margin-bottom: 12px;} </style>');
$('head:first').append(classs);
function BindGridControl(Grid) {
    var Res = GetGlopelResources();
    let NameTable = Grid.ESG.NameTable;
    let style_Text = '';
    if (Res.Lang == "Ar") {
        $("#" + NameTable).attr('style', 'direction: rtl;');
        style_Text = 'Text_right';
    }
    else {
        $("#" + NameTable).attr('style', 'direction: ltr;');
        style_Text = 'Text_left';
    }
    //if (Grid.ESG.Right == true) {
    //    $("#" + NameTable).attr('style', 'direction: rtl;');
    //    style_Text = 'Text_right';
    //}
    //else {
    //    $("#" + NameTable).attr('style', 'direction: ltr;');
    //    style_Text = 'Text_left';
    //}
    $("#" + NameTable).html("");
    let table; // بناء هيكل الجدوا
    table = '' +
        '<div class="sparkline8-graph" style="border-radius: 50px;">' +
        '<div class="datatable-dashv1-list custom-datatable-overright" style="overflow: overlay;">' +
        '<div class="button-ap-list responsive-btn">' +
        '<button id="btnEdit_' + NameTable + '" type="button" class="btn btn-custon-four btn-success"><i class="fa fa-save"></i>&nbsp; ' + Res.Edit + '</button>' +
        '<button id="btnsave_' + NameTable + '" type="button" class="btn btn-custon-four btn-success"><i class="fa fa-save"></i>&nbsp; ' + Res.Save + '</button>' +
        '<button id="btnClean_' + NameTable + '" type="button" class="btn btn-custon-four btn-danger" style="background-color: sandybrown;"><i class="fa fa-refresh"></i>  ' + Res.BackUpdate + '</button>' +
        '</div>' +
        '<br />' +
        '<div class=" btn-group project-list-action" style="top:-14px;">' +
        '<button id="btnAdd_' + NameTable + '" type="button" class="btn btn-custon-four btn-info" style="width: 300px;"  >⏬   ' + Res.Add + ' </button>' +
        '</div>' +
        '<br />' +
        '<br />' +
        '<div class=" btn-group project-list-action">' +
        '</div>' +
        '<div class=" btn-group project-list-action" style="width: 20%;">' +
        '</div>' +
        '<div id="DivMassage_' + NameTable + '"  class=" btn-group project-list-action" style="width: 55%;background-color: brown;color: white;font-weight: bold;text-align: center;border-radius: 50px;">' +
        '<h3 id="TextMassage_' + NameTable + '">Message</h3> ' +
        '</div>' +
        '<br />' +
        '<br />' +
        '<div class=" btn-group project-list-action" style="margin-top: -7%;">' +
        '<input type="text" id="Search_' + NameTable + '"  class="Search_grid" placeholder="Search for names.." title="Type in a name">' +
        '</div>' +
        '<table id="table_' + NameTable + '" data-toggle="table"   data-page-number="2" data-page-size="5"   data-pagination="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="false" data-click-to-select="true" data-toolbar="#toolbar">' +
        '<thead id="thead_' + NameTable + '">' +
        '<tr id="tr_' + NameTable + '">' +
        '<th class="' + NameTable + '_Delete" data-field=""></th>' +
        '<th class="' + NameTable + '_Copy" data-field=""></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="tbody_' + NameTable + '">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';
    $("#" + NameTable).append(table);
    $('#DivMassage_' + NameTable).addClass('display_hidden');
    $('#btnAdd_' + NameTable).click(function (e) {
        $('#btnAdd_' + NameTable).attr('disabled', 'disabled');
        BuildGridControl(true, Grid);
        Grid.ESG.LastCounterAdd = Grid.ESG.LastCounter;
        setTimeout(function () {
            $('#btnAdd_' + NameTable).removeAttr('disabled');
            if (Grid.ESG.OnAddNewRowRunFunction() == null) {
            }
            else {
                try {
                    Grid.ESG.OnAddNewRowRunFunction();
                }
                catch (e) {
                }
            }
        }, 300);
        EditRowDisplayRunFunction(Grid);
    });
    if (flagBack == false) {
        $('#btnClean_' + NameTable).click(function (e) {
            CleanGridControl(null, Grid);
        });
    }
    $('#btnsave_' + NameTable).click(function (e) {
        if (!ValidationGrid(Grid, Grid.ESG.object))
            return;
        AssignGridControl(Grid, Grid.ESG.object);
    });
    $('#btnEdit_' + NameTable).click(function (e) {
        EditGridControl(Grid);
    });
    $('#Search_' + NameTable).keyup(function (e) {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("Search_" + NameTable);
        filter = input.value.toUpperCase();
        table = document.getElementById("table_" + NameTable);
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            let tds = tr[i].getElementsByTagName("td");
            for (var u = 0; u < tds.length; u++) {
                td = tr[i].getElementsByTagName("td")[u];
                if (td) {
                    try {
                        td = document.getElementById(td.children[0].id);
                        txtValue = td.value;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            //alert(txtValue)
                            tr[i].style.display = "";
                            break;
                        }
                        else {
                            tr[i].style.display = "none";
                        }
                    }
                    catch (e) {
                    }
                }
            }
        }
    });
    for (let i = 0; i < Grid.Column.length; i++) {
        let visible = "";
        if (Grid.Column[i].visible == false) {
            visible = 'hidden';
        }
        let thead; //بناء عناوين الجدول
        thead = '<th data-field="number" class=" ' + style_Text + '  ' + NameTable + '_' + i + '"   ' + visible + ' id="th_' + i + NameTable + '"  data-editable="false">' + Grid.Column[i].title + '___________</th>';
        $("#tr_" + NameTable).append(thead);
    }
    //------------------------------------------------------------تنظيم الجريد
    //Resizable(NameTable);
    //----------------------------------------------------------------------------------
    $('.' + NameTable + '_Delete').attr('style', 'width: 4% !important;');
    $('.' + NameTable + '_Copy').attr('style', 'width: 4% !important;');
    //---------------------------------------------------------------------------------اضافة هيكل body 
    for (let u = 0; u < Grid.Column.length; u++) {
        //--------------------------------------------اضافة style -----------------------------------
        if (Grid.Column[u].style.trim() != '') {
            Grid.Column[u].style = 'width: 15%';
        }
        ;
        if (Grid.Column[u].visible == false) {
            Grid.Column[u].style = ' display:none;';
        }
        ;
        let title = $('.' + NameTable + '_' + u + '');
        title.attr('style', '' + Grid.Column[u].style + '  !important;  ');
        let _Delete = $('.' + NameTable + '_Delete');
        _Delete.attr('style', 'display:none !important;');
        let _Copy = $('.' + NameTable + '_Copy');
        _Copy.attr('style', 'display:none !important;');
        $('#btnClean_' + NameTable).attr('style', 'display:none !important;');
        $('#btnAdd_' + NameTable).attr('style', 'display:none !important;');
        $('#btnsave_' + NameTable).attr('style', 'display:none !important;');
        $('#btnEdit_' + NameTable).attr('style', 'display:none !important;');
        if (Grid.ESG.DeleteRow == false) {
            let _Delete = $('.' + NameTable + '_Delete');
            _Delete.addClass('display_hidden');
        }
        ;
        if (Grid.ESG.CopyRow == false) {
            let _Copy = $('.' + NameTable + '_Copy');
            _Copy.addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Back == false) {
            $('#btnClean_' + NameTable).addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Add == false) {
            $('#btnAdd_' + NameTable).addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Save == false) {
            $('#btnsave_' + NameTable).addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Edit == false) {
            $('#btnEdit_' + NameTable).addClass('display_hidden');
        }
        else {
            $('#btnEdit_' + NameTable).attr('style', '');
        }
        //------------------------------------------------------------------------------------------
    }
    if (Grid.ESG.ModeInsert == true && Grid.ESG.ModeUpdate == false) {
        $('#btnEdit_' + NameTable).click();
        $('#btnAdd_' + NameTable).click();
    }
    $('.fixed-table-body').attr('style', 'height: 460px; overflow: scroll;');
}
function SaveGridControl(Grid) {
    $('#btnsave_' + Grid.ESG.NameTable).click();
}
function ClearGridControl(Grid) {
    $('#btnClean_' + Grid.ESG.NameTable).click();
}
function DisplayDataGridControl(List, Grid) {
    Grid.ESG.LastCounter = 0;
    Grid.ESG.LastCounterAdd = 0;
    flagBack = true;
    BindGridControl(Grid);
    let NameTable = Grid.ESG.NameTable;
    $('#btnClean_' + NameTable).click(function (e) {
        CleanGridControl(List, Grid);
    });
    if (List != null) {
        for (let i = 0; i < List.length; i++) {
            List[i].Ser = i + 1;
            BuildGridControl(false, Grid);
            DisplayData(List[i], Grid);
        }
        RowDisplayRunFunction(List, Grid);
    }
    flagBack = false;
    ComputeTotalGridControl(Grid, Grid.ESG.object);
    if (Grid.ESG.ModeUpdate == true) {
        $('#btnEdit_' + NameTable).click();
    }
    //let x =`   <link href="https://unpkg.com/bootstrap-table@1.20.2/dist/bootstrap-table.min.css" rel="stylesheet">
    //<script src="https://unpkg.com/bootstrap-table@1.20.2/dist/bootstrap-table.min.js"></script>`
    //$('#main-menu').append(x);
}
function RowDisplayRunFunction(List, Grid) {
    for (let u = 0; u < List.length; u++) { // Run function Row
        try {
            ////Console.log(List)
            //alert(List[u].Ser)
            localStorage.setItem('RowCnt', (Number(List[u].Ser) - 1).toString());
            Grid.ESG.Cnt = (Number(List[u].Ser) - 1);
            if (Grid.ESG.OnRowRunFunction() == null) {
            }
            else {
                Grid.ESG.OnRowRunFunction();
            }
        }
        catch (e) {
        }
    }
}
function EditRowDisplayRunFunction(Grid) {
    for (let u = 0; u < Grid.ESG.LastCounter; u++) { // Run function Row
        try {
            localStorage.setItem('RowCnt', u.toString());
            if (Grid.ESG.OnEditGridRunFunction() == null) {
            }
            else {
                Grid.ESG.OnEditGridRunFunction();
            }
        }
        catch (e) {
        }
    }
}
function DisplayData(List, Grid) {
    let NameTable = Grid.ESG.NameTable;
    let cnt = Grid.ESG.LastCounter - 1;
    let _Delete = $('.' + NameTable + '_Delete');
    _Delete.attr('style', 'display:none !important;');
    let btn_minus = $('#td_btn_minus_' + NameTable + cnt);
    btn_minus.attr('style', 'display:none !important;');
    let _Copy = $('.' + NameTable + '_Copy');
    _Copy.attr('style', 'display:none !important;');
    let btn_Copy = $('#td_btn_Copy_' + NameTable + cnt);
    btn_Copy.attr('style', 'display:none !important;');
    for (let u = 0; u < Grid.Column.length; u++) { // display Data
        try {
            //var values: Array<any> = Object["values"](List);
            if (Grid.Column[u].ColumnType.NameType == 'Input') {
                //$('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val(values[u]);
                if (Grid.Column[u].Type == 'date' || Grid.Column[u].Type == 'Date') {
                    let date = DateFormat(List['' + Grid.Column[u].Name + '']);
                    $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val(date);
                }
                else {
                    $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val(List['' + Grid.Column[u].Name + '']);
                }
            }
            if (Grid.Column[u].ColumnType.NameType == 'Dropdown') {
                //$('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val(values[u]);
                $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val(List['' + Grid.Column[u].Name + '']);
            }
            if (Grid.Column[u].ColumnType.NameType == 'Button') {
                //$('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val(values[u]);
                $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').html(List['' + Grid.Column[u].Name + '']);
            }
            if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
                let value = List['' + Grid.Column[u].Name + ''];
                //if (values[u] == 1 || values[u] == true) {
                if (value == 1 || value == true) {
                    $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').prop('checked', true);
                }
                else {
                    $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').prop('checked', false);
                }
            }
            //if (Grid.Column[u].ColumnType.onchange != null) {
            //    Grid.Column[u].ColumnType.onchange(); 
            //}
        }
        catch (e) {
        }
    }
}
function BuildGridControl(flagDisplay, Grid) {
    let NameTable = Grid.ESG.NameTable;
    let cnt = Grid.ESG.LastCounter;
    if (Grid.ESG.LastCounter == 0) {
        $('#tbody_' + NameTable + '').html('');
    }
    let classDisplay = flagDisplay == false ? "" : "animated zoomIn";
    let tbody = '<tr id= "No_Row_' + NameTable + cnt + '" class="' + classDisplay + '">' +
        '<td id="td_btn_RunTotal_' + NameTable + cnt + '" class=" display_none td_btn_RunTotal_' + NameTable + '" ><button id="btn_RunTotal_' + NameTable + cnt + '" type="button" class="btn btn-custon-four btn-danger" style="background-color: cornflowerblue;font-weight: bold;font-size: 22PX;width: 34px;padding: unset;"><i class="fa fa-copy"></i></button></td>' +
        '<td id="td_btn_Copy_' + NameTable + cnt + '" class="td_btn_Copy_' + NameTable + '" ><button id="btn_Copy_' + NameTable + cnt + '" type="button" class="btn btn-custon-four btn-danger" style="background-color: cornflowerblue;font-weight: bold;font-size: 22PX;width: 34px;padding: unset;"><i class="fa fa-copy"></i></button></td>' +
        '<td id="td_btn_minus_' + NameTable + cnt + '" class="td_btn_minus_' + NameTable + '" ><button id="btn_minus_' + NameTable + cnt + '" type="button" class="btn btn-custon-four btn-danger" style="font-weight: bold;font-size: 22PX;width: 34px;padding: unset;"><i class="fa fa-minus-circle" ></i></button></td>' +
        '<td id="td_StatusFlag_' + NameTable + '' + cnt + '" style="display:none !important;" ><input  disabled="disabled" id="StatusFlag_' + NameTable + '_' + cnt + '" value="" type="hidden" class="form-control _SetFlag" placeholder="flag" /></td>' +
        '<td id="td_Ser_' + NameTable + '' + cnt + '" style="display:none !important;" ><input  disabled="disabled" id="Ser_' + NameTable + '_' + cnt + '" value="' + cnt + '" type="hidden" class="form-control " placeholder="flag" /></td>' +
        '<td id="Ser_' + NameTable + '' + cnt + '" style="display:none !important;" >' + cnt + '</td>';
    //'<td id="up_' + NameTable + '' + cnt + '"   > <a class="up" href="#">⇑</a></td>'+
    //'<td id="down_' + NameTable + '' + cnt + '"   ><a class="down" href="#">⇓</a></td>';
    '</tr>';
    $('#tbody_' + NameTable + '').append(tbody);
    //$('.up,.down').click(function () {
    //    var row = $(this).parents('tr:first');
    //    if ($(this).is('.up')) { 
    //        row.prev().prev().before(row)
    //    } else {
    //        row.next().next().after(row)
    //    }
    //});
    //var $tbody = $('#tbody_' + NameTable + '');
    //var selected = null;
    //$tbody.children().on("click", function () {
    //    if (selected == null)
    //        selected = this;
    //    else {
    //        $(selected).insertAfter(this);
    //        selected = null;
    //    }
    //});
    if (Grid.ESG.DeleteRow == false) {
        let btn_minus = $('#td_btn_minus_' + NameTable + cnt);
        btn_minus.attr('style', 'display:none !important;');
    }
    ;
    if (Grid.ESG.CopyRow == false) {
        let btn_Copy = $('#td_btn_Copy_' + NameTable + cnt);
        btn_Copy.attr('style', 'display:none !important;');
    }
    ;
    $('#btn_minus_' + NameTable + cnt).click(function (e) {
        flagNotClick = true;
        DeleteRow(Grid, 'No_Row_' + NameTable + cnt, cnt, NameTable);
    });
    $('#btn_RunTotal_' + NameTable + cnt).click(function (e) {
        Grid.ESG.OnfunctionTotal();
    });
    $('#btn_Copy_' + NameTable + cnt).click(function (e) {
        flagNotClick = true;
        CopyRow(Grid, cnt);
    });
    for (let u = 0; u < Grid.Column.length; u++) {
        let td = '';
        let classEdit = (Grid.Column[u].RowClass == undefined ? '' : Grid.Column[u].RowClass) + cnt + ' ' + (Grid.Column[u].class == undefined ? '' : Grid.Column[u].class) + '';
        if (Grid.Column[u].Edit == true) {
            classEdit = classEdit + '  ' + 'Edit_' + NameTable;
        }
        ;
        let StyleElment = '';
        if (Grid.Column[u].StyleElment != '' && Grid.Column[u].StyleElment != undefined) {
            StyleElment = Grid.Column[u].StyleElment + ';';
        }
        if (Grid.Column[u].ColumnType.NameType == 'Input') {
            if (Grid.Column[u].Type == 'text') {
                td = '<td id="td_' + NameTable + '_' + Grid.Column[u].ID + cnt + '" ><textarea  disabled="disabled" id="' + NameTable + '_' + Grid.Column[u].ID + cnt + '" value="' + (Grid.Column[u].value == "cnt" ? cnt + 1 : Grid.Column[u].value) + '" type="' + Grid.Column[u].Type + '" class="form-control ' + classEdit + '" placeholder="' + Grid.Column[u].value + '" style="' + StyleElment + 'height: 37px;">' + Grid.Column[u].value + '</textarea></td>';
            }
            else {
                td = '<td id="td_' + NameTable + '_' + Grid.Column[u].ID + cnt + '" ><input  disabled="disabled" id="' + NameTable + '_' + Grid.Column[u].ID + cnt + '" value="' + (Grid.Column[u].value == "cnt" ? cnt + 1 : Grid.Column[u].value) + '" type="' + Grid.Column[u].Type + '" class="form-control ' + classEdit + '" placeholder="' + Grid.Column[u].value + '" style="' + StyleElment + '" /></td>';
            }
            $('#No_Row_' + NameTable + cnt + '').append(td);
            if (Grid.Column[u].Type == 'date') {
                let d = GetDate();
                $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val("" + d + "");
            }
        }
        if (Grid.Column[u].ColumnType.NameType == 'Dropdown') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].ID + cnt + '" ><select disabled="disabled"  id="' + NameTable + '_' + Grid.Column[u].ID + cnt + '" class="form-control ' + classEdit + '" style="' + StyleElment + '">  </select></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
            let ddlFilter = document.getElementById('' + NameTable + '_' + Grid.Column[u].ID + cnt + '');
            if (Grid.Column[u].ColumnType.NameDefult == null || Grid.Column[u].ColumnType.NameDefult == '') {
                FillDropDownGrid(Grid.Column[u].ColumnType.dataSource, ddlFilter, Grid.Column[u].ColumnType.Value, Grid.Column[u].ColumnType.textField, null);
            }
            else {
                FillDropDownGrid(Grid.Column[u].ColumnType.dataSource, ddlFilter, Grid.Column[u].ColumnType.Value, Grid.Column[u].ColumnType.textField, Grid.Column[u].ColumnType.NameDefult);
            }
            //DocumentActions.FillCombowithdefult(Grid.Column[u].ColumnType.dataSource, ddlFilter, Grid.Column[u].Name, Grid.Column[u].ColumnType.textField, "Select");
        }
        if (Grid.Column[u].ColumnType.NameType == 'Button') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].ID + cnt + '"  text-align: center;" ><button id="' + NameTable + '_' + Grid.Column[u].ID + cnt + '" disabled="disabled" style="' + StyleElment + '" type="' + Grid.Column[u].Type + '" class="btn btn-custon-four btn-success ' + classEdit + '"> ' + Grid.Column[u].value + ' </button></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
        }
        if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].ID + cnt + '" ><input  disabled="disabled" id="' + NameTable + '_' + Grid.Column[u].ID + cnt + '" value="' + Grid.Column[u].value + '" style="' + StyleElment + '" type="checkbox"   class="form-control ' + classEdit + '" placeholder="' + Grid.Column[u].value + '" /></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
            if (Grid.Column[u].value == "true" || Grid.Column[u].value == "1") {
                $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').prop('checked', true);
            }
        }
        $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').focus(function () {
            Grid.ESG.RowCnt = Number($("#Ser_" + NameTable + '_' + cnt).val());
            ComputeTotalGridControl(Grid, Grid.ESG.object);
        });
        $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').click(function () {
            if ($("#StatusFlag_" + NameTable + '_' + cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");
            if (Grid.Column[u].ColumnType.onclick != null) {
                Grid.Column[u].ColumnType.onclick();
            }
            ComputeTotalGridControl(Grid, Grid.ESG.object);
        });
        $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').on('keyup', function (e) {
            if ($("#StatusFlag_" + NameTable + '_' + cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");
            if (Grid.Column[u].ColumnType.onkeyup != null) {
                Grid.Column[u].ColumnType.onkeyup();
            }
            ComputeTotalGridControl(Grid, Grid.ESG.object);
        });
        $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').on('change', function (e) {
            if ($("#StatusFlag_" + NameTable + '_' + cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");
            if (Grid.Column[u].ColumnType.onchange != null) {
                Grid.Column[u].ColumnType.onchange();
            }
            ComputeTotalGridControl(Grid, Grid.ESG.object);
        });
        //--------------------------------------------اضافة style -----------------------------------
        if (Grid.ESG.LastCounter == 0) {
            if (Grid.Column[u].style.trim() != '') {
                Grid.Column[u].style = 'width: 15%';
            }
            ;
            if (Grid.Column[u].visible == false) {
                Grid.Column[u].style = ' display:none;';
            }
            ;
            let title = $('.' + NameTable + '_' + u + '');
            title.attr('style', '' + Grid.Column[u].style + '  !important;');
            let DeleteRow = $('.' + NameTable + '_Delete');
            DeleteRow.attr('style', 'width: 3% !important;');
            let copyRow = $('.' + NameTable + '_Copy');
            copyRow.attr('style', 'width: 3% !important;');
        }
        if (Grid.ESG.DeleteRow == false) {
            let title = $('.' + NameTable + '_Delete');
            title.attr('style', 'display:none !important;');
        }
        ;
        if (Grid.ESG.DeleteRow == false) {
            let title = $('.' + NameTable + '_Copy');
            title.attr('style', 'display:none !important;');
        }
        ;
        if (Grid.Column[u].visible == false) {
            Grid.Column[u].style = ' display:none;';
            let Column_td = $('#td_' + NameTable + '_' + Grid.Column[u].ID + cnt);
            Column_td.attr('style', '' + Grid.Column[u].style + '  !important;');
        }
        ;
        //------------------------------------------------------------------------------------------
    }
    $('#No_Row_' + NameTable + cnt + '').dblclick(function () {
        if (flagNotClick != true) {
            Grid.ESG.SelectedKey = $('#' + NameTable + '_' + Grid.ESG.PrimaryKey + cnt + '').val();
            Grid.ESG.OnRowDoubleClicked();
        }
        flagNotClick = false;
    });
    if ($('#btnsave_' + NameTable).attr('style').trim() == '') {
        $('.Edit_' + NameTable).removeAttr('disabled');
    }
    ;
    $('#No_Row_' + NameTable + (Grid.ESG.LastCounterAdd - 1) + '').before($('#No_Row_' + NameTable + (cnt) + ''));
    $('#btn_minus_' + NameTable + (cnt) + '').focus();
    if (flagDisplay == true) {
        $("#StatusFlag_" + NameTable + '_' + cnt).val('i');
    }
    Grid.ESG.LastCounter++;
    Grid.ESG.LastCounterAdd++;
}
function DeleteRow(Grid, ID, cnt, NameTable) {
    //WorningMessage("Do you want to delete?", "Do you want to delete?", "warning", "warning", () => {
    $("#" + ID + "").attr("hidden", "true");
    $("#StatusFlag_" + NameTable + '_' + cnt).val() == 'i' ? $("#StatusFlag_" + NameTable + '_' + cnt).val('m') : $("#StatusFlag_" + NameTable + '_' + cnt).val('d');
    //setTimeout(function () {
    //    Grid.ESG.OnfunctionTotal();
    //    EditRowDisplayRunFunction(Grid);     
    //}, 500);
    ComputeTotalGridControl(Grid, Grid.ESG.object);
    //});
}
function CleanGridControl(List, Grid) {
    let NameTable = Grid.ESG.NameTable;
    $('#table_' + NameTable).html('');
    $('#btnEdit_' + NameTable).attr('style', '');
    $('#btnsave_' + NameTable).attr('style', 'display:none !important;');
    $('.' + NameTable + '_Delete').attr('style', 'display:none !important;');
    $('#btnClean_' + NameTable).attr('style', 'display:none !important;');
    $('#btnAdd_' + NameTable).attr('style', 'display:none !important;');
    Grid.ESG.LastCounter = 0;
    Grid.ESG.LastCounterAdd = 0;
    DisplayDataGridControl(List, Grid);
    //$('[data-toggle="table"]').bootstrapTable();
}
function AssignGridControl(Grid, Newobject) {
    var obj = Grid.ESG.object;
    let NameTable = Grid.ESG.NameTable;
    let LastCountGrid = Grid.ESG.LastCounter;
    var DetailsModel = new Array();
    let Model = JSON.parse(JSON.stringify(obj));
    for (var i = 0; i < LastCountGrid; i++) {
        let cnt = i;
        let StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();
        Model = JSON.parse(JSON.stringify(obj));
        if (StatusFlag == "i") {
            GActions.AssignToModel(Grid.Column, Model, NameTable, cnt, StatusFlag);
            Model.StatusFlag = StatusFlag;
            DetailsModel.push(Model);
        }
        if (StatusFlag == "u") {
            GActions.AssignToModel(Grid.Column, Model, NameTable, cnt, StatusFlag);
            Model.StatusFlag = StatusFlag;
            DetailsModel.push(Model);
        }
        if (StatusFlag == "d") {
            GActions.AssignToModel(Grid.Column, Model, NameTable, cnt, StatusFlag);
            Model.StatusFlag = StatusFlag;
            DetailsModel.push(Model);
        }
    }
    Grid.ESG.Model = DetailsModel;
    Grid.ESG.OnfunctionSave();
    LogUser(" تم تعديل علي البيانات ", TypeLog.Update);
    return DetailsModel;
}
function ErrorinputGrid(input, NameTable, MessAr) {
    ShowMessage(MessAr, MessAr);
    if (input.selector != null) {
        $('' + input.selector + '').addClass('text_Mandatory');
        $('' + input.selector + '').focus();
        setTimeout(function () {
            $('' + input.selector + '').removeClass('text_Mandatory');
        }, 5000);
    }
    else {
        input.classList.add('text_Mandatory');
        input.focus();
        setTimeout(function () {
            input.classList.remove('text_Mandatory');
        }, 5000);
    }
    //$('#DivMassage_' + NameTable).removeClass('display_hidden');
    //$('#TextMassage_' + NameTable).html(Mess);
    //if (input.selector != null) {
    //    $('' + input.selector + '').addClass('text_Mandatory');
    //    $('' + input.selector + '').focus();
    //    setTimeout(function () {
    //        $('' + input.selector + '').removeClass('text_Mandatory');
    //        $('#DivMassage_' + NameTable).addClass('display_hidden');
    //    }, 5000);
    //}
    //else {
    //    input.classList.add('text_Mandatory');
    //    input.focus();
    //    setTimeout(function () {
    //        input.classList.remove('text_Mandatory');
    //        $('#DivMassage_' + NameTable).addClass('display_hidden');
    //    }, 5000);
    //}
}
function SafeEval(Conation, element) {
    try {
        if (Conation.trim() === "")
            return false;
        // دعم الشروط البسيطة فقط، مثال: "element.value == ''"
        // نستبدل "element.value" بالقيمة الفعلية
        const expression = Conation
            .replace(/Number\(element\.value\)/g, Number(element.value).toString())
            .replace(/element\.value/g, JSON.stringify(element.value));
        return Function('"use strict";return (' + expression + ')')(); // safer than eval
    }
    catch (e) {
        console.error("SafeEval Error:", e);
        return false;
    }
}
function ValidationGrid(Grid, Newobject) {
    var obj = Grid.Column;
    let NameTable = Grid.ESG.NameTable;
    let LastCountGrid = Grid.ESG.LastCounter;
    obj = obj.filter(x => x.Validation.valid == true);
    FlagValid = true;
    for (var i = 0; i < LastCountGrid; i++) {
        let cnt = i;
        let StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();
        if (StatusFlag != "d" && StatusFlag != "m") {
            for (var u = 0; u < obj.length; u++) {
                let Model = JSON.parse(JSON.stringify(obj[u]));
                let element = document.getElementById('' + NameTable + '_' + Model.ID + cnt);
                if (element != null) {
                    let Conation = Model.Validation.SetConation;
                    if (Conation == null || Conation == undefined) {
                        Conation = '';
                    }
                    let Mess = Model.Validation.Mess == undefined ? 'يجب ادخال قيمة في ( ' + Model.title + ' )' : Model.Validation.Mess;
                    Conation = CrealConation(Conation, NameTable, cnt);
                    if (Model.ColumnType.NameType == 'Input') {
                        if (SafeEval(Conation, element)) {
                            ErrorinputGrid(element, NameTable, Mess);
                            FlagValid = false;
                            break;
                        }
                        else {
                            if (Conation.trim() == "" && Number(element.value) == 0) {
                                ErrorinputGrid(element, NameTable, Mess);
                                FlagValid = false;
                                break;
                            }
                        }
                    }
                    if (Model.ColumnType.NameType == 'Dropdown') {
                        let Con = SafeEval(Conation, element);
                        if (Con) {
                            ErrorinputGrid(element, NameTable, Mess);
                            FlagValid = false;
                            break;
                        }
                        else {
                            if (Conation.trim() == "" && (element.value == 'null' || element.value == null || element.value.trim() == '')) {
                                ErrorinputGrid(element, NameTable, 'يجب ادخال قيمة في ( ' + Model.title + ' )');
                                FlagValid = false;
                                break;
                            }
                        }
                    }
                }
            }
            if (FlagValid == false) {
                break;
            }
        }
    }
    return FlagValid;
}
function CrealConation(Conation, NameTable, cnt) {
    // Given string
    var inputString = Conation;
    // Regular expression pattern to match "#...#"
    var pattern = /#([^#]+)#/g;
    // Array to store matches
    var matches = [];
    var match;
    // Loop through all matches and extract the strings between "#"
    while ((match = pattern.exec(inputString)) !== null) {
        matches.push(match[0]);
    }
    for (var i = 0; i < matches.length; i++) {
        let ID = matches[i];
        ID = ID.replace(/#/g, '');
        let element = document.getElementById('' + NameTable + '_' + ID + cnt);
        try {
            if ($('#' + NameTable + '_' + ID + cnt).attr('type') == 'checkbox') {
                Conation = Conation.replace(matches[i], "" + element.checked + "");
            }
            else {
                Conation = Conation.replace(matches[i], element.value);
            }
        }
        catch (e) {
            Conation = Conation.replace(matches[i], element.value);
        }
    }
    if (Conation != undefined) {
        ////Console.log(Conation)
        ////Console.log(eval(Conation))
    }
    return Conation;
    //************************************************
}
function ComputeTotalGridControl(Grid, Newobject) {
    var obj = Grid.ESG.object;
    let NameTable = Grid.ESG.NameTable;
    let LastCountGrid = Grid.ESG.LastCounter;
    let _obj = JSON.parse(JSON.stringify(obj));
    var _keys = Object.keys(_obj).filter(this_fruit => _obj[this_fruit] !== "" && _obj[this_fruit] !== true && _obj[this_fruit] !== false);
    var Model = {};
    _keys.forEach(key => Model[key] = _obj[key]);
    Model["Ser"] = 0;
    for (var i = 0; i < LastCountGrid; i++) {
        let cnt = i;
        let StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();
        if (StatusFlag != "d" && StatusFlag != "m") {
            GActions.ComputeTotalToModel(Grid.Column, Model, NameTable, cnt, StatusFlag);
        }
        Model["Ser"] += 1;
    }
    Grid.ESG.TotalModel = Model;
    try {
        Grid.ESG.OnfunctionTotal();
    }
    catch (e) {
    }
    return Grid.ESG.TotalModel;
}
function EditGridControl(Grid) {
    let NameTable = Grid.ESG.NameTable;
    $('.Edit_' + NameTable).removeAttr('disabled');
    $('#btnsave_' + NameTable).attr('style', '');
    if (Grid.ESG.DeleteRow == true) {
        let btn_minus = $('.td_btn_minus_' + NameTable + '');
        btn_minus.attr('style', ' ');
        let nam = NameTable + '_Delete';
        let title = $('.' + nam + '');
        title.attr('style', ' ');
    }
    ;
    if (Grid.ESG.CopyRow == true) {
        let btn_Copy = $('.td_btn_Copy_' + NameTable + '');
        btn_Copy.attr('style', ' ');
        let name = NameTable + '_Copy';
        let titlee = $('.' + name + '');
        titlee.attr('style', ' ');
    }
    ;
    $('#btnClean_' + NameTable).attr('style', '');
    $('#btnAdd_' + NameTable).attr('style', '');
    $('#btnEdit_' + NameTable).attr('style', 'display:none !important;');
    EditRowDisplayRunFunction(Grid);
    try {
        Resizable(NameTable);
    }
    catch (e) {
    }
}
function CopyRow(Grid, index) {
    var obj = Grid.ESG.object;
    let NameTable = Grid.ESG.NameTable;
    let LastCountGrid = Grid.ESG.LastCounter;
    let RowCopy = 0;
    for (var i = 0; i < LastCountGrid; i++) {
        var CopyModel = JSON.parse(JSON.stringify(obj));
        let cnt = i;
        let StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();
        if (cnt == index) {
            GActions.AssignToModel(Grid.Column, CopyModel, NameTable, cnt, StatusFlag);
            CopyModel.Ser = LastCountGrid;
            CopyModel.StatusFlag = 'i';
            BuildGridControl(true, Grid);
            BuildCopy(Grid.Column, Grid, CopyModel, LastCountGrid);
            RowCopy = LastCountGrid;
            //$("#StatusFlag_" + NameTable + '_' + cnt).val('i');
            //Grid.ESG.LastCounter++; 
            Grid.ESG.LastCounterAdd = Grid.ESG.LastCounterAdd - 1;
            break;
        }
    }
    ////Console.log(CopyModel)
    ComputeTotalGridControl(Grid, Grid.ESG.object);
    let ListCopyModel = new Array();
    ListCopyModel.push(CopyModel);
    RowDisplayRunFunction(ListCopyModel, Grid);
    EditRowDisplayRunFunction(Grid);
    $('#No_Row_' + NameTable + index + '').after($('#No_Row_' + NameTable + RowCopy + ''));
}
function BuildCopy(_Column, Grid, List, cnt) {
    let NameTable = Grid.ESG.NameTable;
    let properties = Object.getOwnPropertyNames(List);
    for (var property of properties) {
        let col = _Column.filter(x => x.Name == property);
        if (col.length > 0) {
            //alert(col[0].ID) 
            let element = document.getElementById('' + NameTable + '_' + col[0].ID + cnt);
            if (element != null) {
                //alert(element.type)
                if (element.type == "checkbox")
                    if (List[property] == 1 || List[property] == true) {
                        element.checked = true;
                    }
                    else {
                        element.checked = false;
                    }
                else if (element.type == "button") {
                    element.innerHTML = List[property];
                }
                else
                    element.value = List[property];
            }
        }
    }
    //for (let u = 0; u < List.length; u++) {
    //    
    //    try {
    //        //var values: Array<any> = Object["values"](List);
    //        //if (Grid.Column[u].ColumnType.NameType == 'Input') {
    //        //    $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val(values[u]);
    //        //}
    //        //if (Grid.Column[u].ColumnType.NameType == 'Dropdown') {
    //        //    $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val(values[u]);
    //        //}
    //        //if (Grid.Column[u].ColumnType.NameType == 'Button') {
    //        //    $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').val(values[u]);
    //        //}
    //        //if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
    //        //    if (values[u] == 1 || values[u] == true) {
    //        //        $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').prop('checked', true)
    //        //    }
    //        //    else {
    //        //        $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').prop('checked', false)
    //        //        $('#' + NameTable + '_' + Grid.Column[u].ID + cnt + '').prop('checked', true)
    //        //    }
    //        //}
    //    } catch (e) {
    //    }
    //}
}
var GActions = {
    AssignToModel: (_Column, Model, NameTable, cnt, StatusFlag) => {
        let properties = Object.getOwnPropertyNames(Model);
        for (var property of properties) {
            let col = _Column.filter(x => x.Name == property);
            if (col.length > 0) {
                //alert(col[0].ID) 
                let element = document.getElementById('' + NameTable + '_' + col[0].ID + cnt);
                if (element != null) {
                    if (element.type == "checkbox")
                        Model[property] = element.checked;
                    else if (element.type == "button") {
                        Model[property] = element.innerHTML;
                    }
                    else
                        Model[property] = element.value;
                }
            }
        }
        ////Console.log(Model)
        return Model;
    },
    ComputeTotalToModel: (_Column, Model, NameTable, cnt, StatusFlag) => {
        let properties = Object.getOwnPropertyNames(Model);
        for (var property of properties) {
            let col = _Column.filter(x => x.Name == property);
            if (col.length > 0) {
                let element = document.getElementById('' + NameTable + '_' + col[0].ID + cnt);
                if (element != null) {
                    if (element.type != "checkbox") {
                        if (element.type != "button") {
                            try {
                                Model[property] += Number(element.value);
                            }
                            catch (e) {
                            }
                        }
                        else {
                            Model[property] += Number(element.innerHTML);
                        }
                    }
                }
            }
        }
        return Model;
    },
};
function pageSize() {
    $('#table_Grad1').bootstrapTable({
        cache: false,
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 5, //specify 5 here
        pageList: [5, 10, 25, 50, 100, 200] //list can be specified here
    });
}
function Resizable(NameTable) {
    $('.' + NameTable + '_Delete').attr('style', 'width: 1% !important;');
    $('.' + NameTable + '_Copy').attr('style', 'width: 1% !important;');
    $('[data-toggle="table"]').bootstrapTable();
}
//# sourceMappingURL=EsGrid.js.map