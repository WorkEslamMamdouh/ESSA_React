class AjaxCaller {
    get _url() {
        if (this.Url == null)
            return Url.Action(this.ActionName, this.ControllerName);
        else
            return this.Url;
    }
    CallAsync(OnSuccess) {
        Ajax.CallAsync({
            url: this._url,
            data: this.Data,
            success: (d) => {
                let result = d.result;
                if (OnSuccess != null)
                    OnSuccess(result);
            }
        });
    }
    Call() {
        let result = Ajax.Call({
            url: this._url,
            data: this.Data
        });
        return result;
    }
    Execute(actionName, entity, callBack) {
        Ajax.CallAsync({
            url: Url.Action(actionName, this.ControllerName),
            data: entity,
            success: (d) => {
                let result = d.result;
                if (result.ResponseState == true) {
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else {
                    setTimeout(function () { MessageBox.Show(result.ResponseMessage, actionName); }, 300);
                }
                if (callBack != null)
                    callBack(result);
            }
        });
    }
    Insert(entity, callBack) {
        this.Execute("Insert", entity, callBack);
    }
    Update(entity, callBack) {
        this.Execute("Update", entity, callBack);
    }
    Delete(entity, callBack) {
        this.Execute("Delete", entity, callBack);
    }
    GetByID(id) {
        let result = Ajax.Call({
            url: Url.Action("GetByID", this.ControllerName),
            data: { id: id }
        });
        return result;
    }
}
//# sourceMappingURL=AjaxCaller.js.map