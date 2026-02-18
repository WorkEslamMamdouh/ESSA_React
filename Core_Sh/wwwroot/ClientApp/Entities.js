class CustomClass {
    constructor() {
        this.TaxStatusDes = "";
        this.TrTypeDes = "";
    }
}
class BaseResponse {
}
class EntityContext {
}
class ResponseResult {
}
class AllPages {
}
class OpenPages {
}
class IProc_GetAllSalaryPeriod {
    constructor() {
        this.RowNumber = null;
        this.DateClosed = '';
        this.CreatedBy = '';
        this.Remarks = '';
        this.IDPeriod = null;
        this.Balances = 0;
        this.StatusFlag = '';
    }
}
class Table {
    constructor() {
        this.NameTable = "";
        this.Condition = "";
        this.IsProc = false;
        this.IsExec = false;
        this.IsPage = false;
        this.PageNumber = 0;
        this.PageSize = 0;
        this.OrderByID = "";
        this.SearchValue = "";
    }
}
class RepParamter {
    constructor() {
        this.Parameter = "";
        this.Value = "";
    }
}
class Table_Result {
    constructor() {
        this.Table_Res = new Array();
    }
}
class IProc_Rpt_LogUser {
    constructor() {
        this.UserID = '';
        this.USER_NAME = '';
        this.JobTitle = '';
        this.USER_TYPE = 0;
        this.TrType = '';
        this.Mode = '';
        this.Remarks = '';
        this.Date = '';
        this.IsSuccess = false;
        this.ID_Device = '';
        this.DeviceType = '';
        this.NameBrowser = '';
        this.StatusFlag = '';
    }
}
class Result_Execute {
    constructor() {
        this.Result = 0;
    }
}
class V_Proc_GetVatPurchase {
    constructor() {
        this.Describtion = '';
        this.PurTotal = 0;
        this.ReturnPur = 0;
        this.VatAmount = 0;
        this.StatusFlag = '';
    }
}
class V_Proc_GetVatSales {
    constructor() {
        this.Describtion = '';
        this.SalesTotal = 0;
        this.ReturnSales = 0;
        this.VatAmount = 0;
        this.StatusFlag = '';
    }
}
class MasterDetails {
    constructor() {
        this.Master = null;
        this.Details = new Array();
    }
}
class ReportParameters {
}
class ProfitInvoice {
    constructor() {
        this.Profit = 0;
    }
}
class Get_Balance {
    constructor() {
        this.Balance = 0;
    }
}
class IProc_Rpt_CashBox {
    constructor() {
        this.TypeVoucher = 0;
        this.BeneficiaryName = '';
        this.TrNo = 0;
        this.DescAr = '';
        this.Description = '';
        this.Debit = 0;
        this.Credit = 0;
        this.Remarks = '';
        this.TransactionDate = '';
        this.StatusFlag = '';
    }
}
class IProc_Z_GetLoanEmployee {
    constructor() {
        this.NetLoan = 0;
    }
}
class GetPrivilage_Pages {
    constructor() {
        this.AllPages = "";
        this.UserPrivilege = new Array();
    }
}
class TransTable {
    constructor() {
        this.TableName = "";
        this.Model = null;
        this.ModelList = null;
        this.TypeTrans = "";
        this.ConditionSelectReturn = "";
    }
}
class DataTablePaginationResult {
    constructor() {
        this.PaginationResult = null;
        this.DataTable = [];
    }
}
class PaginationResult {
    constructor() {
        this.TotalPages = 0;
    }
}
class Result_Two_object {
    constructor() {
        this.ResultTable = null;
        this.ResultQuery = null;
    }
}
class A_CalculationTotalJournal extends CustomClass {
    constructor() {
        super();
        this.TotalDebit = 0;
        this.TotalCredit = 0;
        this.NetDifference = 0;
        this.Serial_Det = 0;
        this.StatusFlag = '';
    }
}
class _IQ_DisplayAllItemsUnites {
    constructor() {
        this.ItemID = 0;
        this.Ser = 0;
        this.CompCode = 0;
        this.ItemCode = '';
        this.ItemName = '';
        this.ItemFamilyID = 0;
        this.CostPrice = 0;
        this.UnitPrice = 0;
        this.Quantity = 0;
        this.OneHandQuantity = 0;
        this.QtyOpenBalances = 0;
        this.Rate = 0;
        this.QuantityMinimum = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.CatID = 0;
        this.TypeUsing = 0;
        this.QRCode = '';
        this.backgroundColor = '';
        this.Image = '';
        this.FontColor = '';
        this.IsService = false;
        this.ISActive = false;
        this.ItemUnitID = 0;
        this.UnitID = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.VatTypeID = 0;
        this.RetQty = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
        this.StatusFlag = '';
    }
}
class G_GetEmpBalance_Profile {
    constructor() {
        this.Ser = 0;
        this.EmpID = 0;
        this.DescAcc = '';
        this.Acc_Code = '';
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.Balance = 0;
        this.StatusFlag = '';
    }
}
class IProc_Z_A_AccountStatment_Employees extends CustomClass {
    constructor() {
        super();
        this.Comp_Code = 0;
        this.TrType = 0;
        this.TrDate = '';
        this.Remarks = '';
        this.VOUCHER_CODE = 0;
        this.ACC_CODE = '';
        this.ACC_DESCA = '';
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.Balance = 0;
        this.StatusFlag = '';
    }
}
class IProc_Z_A_AccountStatment extends CustomClass {
    constructor() {
        super();
        this.Comp_Code = 0;
        this.TrType = 0;
        this.TrDate = '';
        this.Remarks = '';
        this.VOUCHER_CODE = 0;
        this.ACC_CODE = '';
        this.ACC_DESCA = '';
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.Balance = 0;
        this.StatusFlag = '';
    }
}
class IProc_Z_A_AccountStatment_CachBox extends CustomClass {
    constructor() {
        super();
        this.CashTypeID = 0;
        this.Trans_Type = '';
        this.Trans_Link_Desc = '';
        this.Trans_ID = 0;
        this.Trans_No = 0;
        this.Comp_Code = 0;
        this.TrType = 0;
        this.TrDate = '';
        this.Remarks = '';
        this.VOUCHER_CODE = 0;
        this.ACC_CODE = '';
        this.ACC_DESCA = '';
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.Balance = 0;
        this.IDUser = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class IProc_Z_A_AccountStatment_CachBox_Sum extends CustomClass {
    constructor() {
        super();
        this.CashTypeID = 0;
        this.CashAccCode = '';
        this.ACC_DESCA = '';
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.Balance = 0;
        this.Trans_Type = '';
        this.Trans_Link_Desc = '';
        this.Trans_ID = 0;
        this.Trans_No = 0;
        this.Comp_Code = 0;
        this.TrType = 0;
        this.TrDate = '';
        this.Remarks = '';
        this.VOUCHER_CODE = 0;
        this.IDUser = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class SendDataExcel {
    constructor() {
        this.E_I_LogUploadExcel = new E_I_LogUploadExcel();
        this.DataTemp = new Array();
        this.IsPostDirectJournal = true;
        this.FamilyZoneID = 0;
        this.ZoneId = 0;
        this.SupervisorID = 0;
    }
}
class IProc_Z_GetSalaryDetailsEmployee extends CustomClass {
    constructor() {
        super();
        this.Ser = 0;
        this.DescA = '';
        this.Balance = 0;
        this.Amount = 0;
        this.StatusFlag = '';
    }
}
class G_CheckQtyInInvoice extends CustomClass {
    constructor() {
        super();
        this.Message_ItemIssueAr = '';
        this.Message_ItemIssueEn = '';
    }
}
//# sourceMappingURL=Entities.js.map