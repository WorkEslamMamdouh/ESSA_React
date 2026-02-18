$(document).ready(function () {
    FamilyZones.InitalizeComponent();
});
var FamilyZones;
(function (FamilyZones) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Zones = new Array();
    var _ZonesObj = new FamilyZone();
    var _ZonesModel = new Array();
    var CountGrid = 0;
    var Submit_Update_Profile;
    var btnAdd;
    var Submit_Backdown_Profile;
    function InitalizeComponent() {
         ;
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        InitalizeControls();
        InitializeEvents();
        Display_Data();
        Close_Loder();
    }
    FamilyZones.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile");
        btnAdd = document.getElementById("btnAdd");
        Submit_Backdown_Profile = document.getElementById("Submit_Backdown_Profile");
    }
    function InitializeEvents() {
        btnAdd.onclick = AddRow;
        Submit_Update_Profile.onclick = SubmitUpdate;
        Submit_Backdown_Profile.onclick = Display_Data;
    }
    function AddRow() {
        BuildGrid(CountGrid);
        $("#txtStatusFlag".concat(CountGrid)).val('i');
        CountGrid++;
    }
    function Display_Data() {
         ;
        var Table;
        Table =
            [
                { NameTable: 'FamilyZone', Condition: " CompCode = " + SysSession.CurrentEnvironment.CompCode },
            ];
        DataResult(Table);
        //**************************************************************************************************************
         ;
        _Zones = GetDataTable('FamilyZone');
        $('#Zone_Grid').html("");
        CountGrid = 0;
         ;
        for (var i = 0; i < _Zones.length; i++) {
            BuildGrid(i);
            $("#Txt_ZoneID".concat(i)).val(_Zones[i].FamilyZoneID);
            $("#Txt_DescA".concat(i)).val(_Zones[i].DescA);
            $("#chk_Active".concat(i)).prop('checked', _Zones[i].Active);
            $("#Txt_Remarks".concat(i)).val(_Zones[i].Remarks);
            $("#txtStatusFlag".concat(i)).val('');
            CountGrid++;
        }
    }
    function SubmitUpdate() {
        for (var i = 0; i < CountGrid; i++) {
            if ($('#Txt_DescA' + i).val().trim() == "") {
                Errorinput($('#Txt_DescA' + i), "Please a Enter Zone Describition 🤨", "برجاء ادخال وصف المنطقة 🤨");
                return;
            }
        }
        Assign();
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("SalesMan", "UpdateFamilyZones"),
            data: JSON.stringify({ DataSend: JSON.stringify(_ZonesModel) }),
            //data: {
            //	DataSend: JSON.stringify(_ZonesModel)
            //},
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    Display_Data();
                    Close_Loder();
                    ShowMessage("Done 🤞😉", "تم الحفظ  🤞😉");
                }
                else {
                }
            }
        });
    }
    function BuildGrid(cnt) {
        var html = '<tr id="Row' + cnt + '" style="height: 51px; ">' +
            '<input id="Txt_ZoneID' + cnt + '" type="hidden" class="form-control" disabled /> ' +
            '<input id="txtStatusFlag' + cnt + '" type="hidden" class="form-control" disabled /> ' +
            '<td class="u-table-cell" > ' +
            '<input type="text" id="Txt_DescA' + cnt + '" maxlength="200" class="Clear_Header  u-input u-input-rectangle">' +
            '</td>' +
            '<td class="u-table-cell" > ' +
            '<input type="checkbox" id="chk_Active' + cnt + '" class="checkbox">' +
            '</td>' +
            '<td class="u-table-cell display_none" > ' +
            '<input type="text" id="Txt_Remarks' + cnt + '" maxlength="500" class="Clear_Header  u-input u-input-rectangle">' +
            '</td>' +
            '</tr>';
        $('#Zone_Grid').append(html);
        $("#Txt_DescA".concat(cnt)).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#Txt_Remarks".concat(cnt)).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#chk_Active".concat(cnt)).on('click', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#btn_minus".concat(cnt)).on('click', function () {
            DeleteRow(cnt);
        });
    }
    function DeleteRow(RecNo) {
        $("#txtStatusFlag" + RecNo).val() == 'i' ? $("#txtStatusFlag" + RecNo).val('m') : $("#txtStatusFlag" + RecNo).val('d');
        $("#Row" + RecNo).attr("hidden", "true");
    }
    function Assign() {
         ;
        _ZonesModel = new Array();
        for (var i = 0; i < CountGrid; i++) {
            if ($("#txtStatusFlag".concat(i)).val() != 'm' && $("#txtStatusFlag".concat(i)).val() != '') {
                _ZonesObj = new FamilyZone();
                _ZonesObj.FamilyZoneID = Number($("#Txt_ZoneID".concat(i)).val());
                _ZonesObj.ZoneCode = "";
                _ZonesObj.DescA = $("#Txt_DescA".concat(i)).val();
                _ZonesObj.Active = $("#chk_Active".concat(i)).is(":checked");
                _ZonesObj.Remarks = $("#Txt_Remarks".concat(i)).val();
                _ZonesObj.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
                _ZonesObj.StatusFlag = $("#txtStatusFlag".concat(i)).val();
                _ZonesModel.push(_ZonesObj);
            }
        }
        _ZonesModel[0].UserCode = SysSession.CurrentEnvironment.UserCode;
        _ZonesModel[0].Comp_Code = SysSession.CurrentEnvironment.CompCode;
        _ZonesModel[0].Branch_Code = SysSession.CurrentEnvironment.BranchCode;
    }
})(FamilyZones || (FamilyZones = {}));
//# sourceMappingURL=FamilyZones.js.map