

class CustomClass {

    constructor() {
        this.TaxStatusDes = "";
        this.TrTypeDes = "";
    }
    public TaxStatusDes: string;
    public TrTypeDes: string; 

}

class BaseResponse {
    public IsSuccess: boolean;
    public ErrorMessage: string;
    public StatusCode: Number;
    public Response: any;
}


abstract class EntityContext {
    public RowIndex: number;
}
class ResponseResult {
    public ResponseState: boolean;
    public ResponseMessage: string;
    public ResponseData: any;
}


class AllPages {
    public ModuleCode: string;
    public Page_Html: string;
}

class OpenPages {
    public ModuleCode: string;
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
    public RowNumber: any;
    public DateClosed: string;
    public CreatedBy: string;
    public Remarks: string;
    public IDPeriod: any;
    public Balances: number;
    public StatusFlag: string;


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
    public NameTable: string;
    public Condition: string;
    public IsProc?: boolean;
    public IsExec?: boolean;
    public IsPage?: boolean;
    public PageNumber?: number;
    public PageSize?: number;
    public OrderByID?: string;
    public SearchValue?: string;

}

class RepParamter {
    constructor() {
        this.Parameter = "";
        this.Value = "";
    }
    public Parameter: string;
    public Value: string;
}

class Table_Result {
    constructor() {
        this.Table_Res = new Array<any>();
    }
    public Table_Res: Array<any>;
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
    public UserID: string;
    public USER_NAME: string;
    public JobTitle: string;
    public USER_TYPE: number;
    public TrType: string;
    public Mode: string;
    public Remarks: string;
    public Date: string;
    public IsSuccess: boolean;
    public ID_Device: string;
    public DeviceType: string;
    public NameBrowser: string;
    public StatusFlag: string;


}




class Result_Execute {
    constructor() {
        this.Result = 0;

    }

    public Result: number;

}

class V_Proc_GetVatPurchase {
    constructor() {
        this.Describtion = '';
        this.PurTotal = 0;
        this.ReturnPur = 0;
        this.VatAmount = 0;
        this.StatusFlag = '';
    }
    public Describtion: string;
    public PurTotal: number;
    public ReturnPur: number;
    public VatAmount: number;
    public StatusFlag: string;


}
class V_Proc_GetVatSales {
    constructor() {
        this.Describtion = '';
        this.SalesTotal = 0;
        this.ReturnSales = 0;
        this.VatAmount = 0;
        this.StatusFlag = '';
    }
    public Describtion: string;
    public SalesTotal: number;
    public ReturnSales: number;
    public VatAmount: number;
    public StatusFlag: string;


}




class MasterDetails  {
    constructor() { 
        this.Master = null;
        this.Details = new Array<any>();
    }
    public Master: any;
    public Details: Array<any>;
}



class ReportParameters {

    public DbName: string;
    public Name_function: string;
    public CompCode: string;
    public CompNameA: string;
    public CompNameE: string;
    public BraNameA: string;
    public BraNameE: string;
    public UserCode: string;
    public BranchCode: string;
    public Type_Trans: string;
    public Condation: string;
    public Name_ID: string;
    public NameTable: string;
    public ScreenLanguage: String;
    public SystemCode: String;
    public SubSystemCode: String;
    public Tokenid: String;
    public LoginUser: string;

    public TrTypeSt: string;

    public Send_Pdf: number;
    public TrNo: string;
    public ContactMobile: string;
    public Title_Mess: string;
    public DocUUID: string;
    public TrDate: string;
    public Module: string;

    public FromDt: string;// { get; set; }--
    public ToDt: string;// { get; set; }--
    public stat: number;
    public MemId: number;
    public Shift: number;
    public IncludeInvTR: number;
    public CatId: number;//---
    public ExpID: number;//---
    public SrvId: number;
    public SrvCatId: number;
    public invType: number;

    public fromNum: number;
    public ToNum: number;
    public IsGenerated: number;



    public ShiftId: number;
    public Sex: number;
    public PeriodId: number;
    public User: string;
    public CashType: number;
    public PeriodDays: number;
    public PurchId: number;
    public JobID: number;
    public NatId: number;
    public TRId: number;
    public Empid: number;
    public EmpStat1: number;
    public EmpStat2: number;
    public EmpStat3: number;
    public EmpStat5: number;
    public Typ: number;
    public SimID: number;
    public DisCatID: number;
    public Mail: number;
    public Femail: number;
    public total: number;
    public Type: number;
    public id1: number;
    public id2: number;
    public id3: number;
    public id4: number;
    public ISQR: boolean;
    public id: number;
    public ExpenseStatementID: number;
    public User_Code: string;
    public FromDate: string;
    public ToDate: string
    public BoxId: number;
    public RepType: number;
    public TrType: number;
    public RecType: number;
    public BnfID: string;
    public BnfDesc: string;
    public Status: number;
    public Repdesign: number;
    public AdjDebit: number;
    public AdjId: number;
    public CustomerID: number;
    public VendorId: number;
    public SalesmanID: number;
    public SalesmanDSA1: number;
    public PaymentType: number;
    public CashBoxID: number;
    public Groupid: number;
    public IsCredit: number;
    public BalStatus: number;
    public MobileNo: string;
    public slip: number;
    public VendType: number;
    public check: number;
    public BalType: number;
    public ItemFamId: number;
    public ItemID: number;
    public cc_code: string;
    public GroupCode: string;
    public AccCode: string;
    public exzero: number;
    public IsAuthVchr: number;
    public IsNewVchr: number;
    public Level: number;
    public OpenType: number;
    public PrdType: number;
    public EndType: number;
    public VchrSource: number;
    public VchrType: number;
    public fromacc: string;
    public toacc: string;
    public storeID: number;
    public TfType: number;
    public FromstoreID: number;
    public ToStoreID: number;
    public FromBra: number;
    public ToBra: number;
    public src: number;
    public OperationId: number;
    public ByValue: number;
    public FromSls: number;
    public ToSls: number;
    public ISimport: number;
    public CustomercatID: number;
    public CustomerGrpID: number;
    public checkedprint: boolean;


    public cusCatID: number;
    public cusGroupid: number;
    public cusid: number;
    public SLStype: number;
    public dtccCode: string;
    public TransCode: string;
    public SysCode: string;

    public Vattype: number;
    public VatBraCode: number;
    public vatyear: number;
    public prdcode: number;
    public braCode: number;
    public FromPrd: number;
    public ToPrd: number;
    public FinYear: number;
    public ItemTypeID: number;


    public FromTime: string;
    public ToTime: string;
    public DocPDFFolder: string;
    public BankCode: string;
    public orderby: number;
    public Agtype: number;
    public typedata: number;
    public IssueTypeID: number;
    public OprStatus: number;
    public SalesType: number;
    public _ShowCost: number;
    public Showcost: boolean;
}


class ProfitInvoice {
    constructor() {
        this.Profit = 0;
    }
    public Profit: number;
}
class Get_Balance {
    constructor() {
        this.Balance = 0;
    }
    public Balance: number;
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
    public TypeVoucher: number;
    public BeneficiaryName: string;
    public TrNo: number;
    public DescAr: string;
    public Description: string;
    public Debit: number;
    public Credit: number;
    public Remarks: string;
    public TransactionDate: string;
    public StatusFlag: string;


}

          
class IProc_Z_GetLoanEmployee {
    constructor() {
        this.NetLoan = 0;
       
    }                    
    public NetLoan: number;        


}




class GetPrivilage_Pages  {
    constructor() { 
        this.AllPages = "";
        this.UserPrivilege = new Array<IQ_G_RoleModule>();
    }
    public AllPages: string;
    public UserPrivilege: Array<IQ_G_RoleModule>;
}



class TransTable {
    constructor() {
        this.TableName = "";
        this.Model = null;
        this.ModelList = null;
        this.TypeTrans = "";
        this.ConditionSelectReturn = "";
    }
    public TableName: string;
    public Model?: any;
    public ModelList?: Array<any>;
    public TypeTrans: string;
    public ConditionSelectReturn?: string;

}


class DataTablePaginationResult {
    constructor() {
        this.PaginationResult = null;
        this.DataTable = []; 
    }
    public PaginationResult: PaginationResult;
    public DataTable?: Array<any>;

}


class PaginationResult {
    constructor() {
        this.TotalPages = 0;
    }
    public TotalPages: number;
}


class Result_Two_object {
    constructor() {
        this.ResultTable = null;
        this.ResultQuery = null;
    }
    public ResultTable: any;
    public ResultQuery: any;
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
    public TotalDebit: number;
    public TotalCredit: number;
    public NetDifference: number;
    public Serial_Det: number;
    public StatusFlag: string;


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
    public ItemID: number;
    public Ser: number;
    public CompCode: number;
    public ItemCode: string;
    public ItemName: string;
    public ItemFamilyID: number;
    public CostPrice: number;
    public UnitPrice: number;
    public Quantity: number;
    public OneHandQuantity: number;
    public QtyOpenBalances: number;
    public Rate: number;
    public QuantityMinimum: number;
    public Remarks: string;
    public IDUserCreate: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CatID: number;
    public TypeUsing: number;
    public QRCode: string;
    public backgroundColor: string;
    public Image: string;
    public FontColor: string;
    public IsService: boolean;
    public ISActive: boolean;
    public ItemUnitID: number;
    public UnitID: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public VatTypeID: number;
    public RetQty: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetAfterVat: number;
    public StatusFlag: string;


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
    public Ser: number;
    public EmpID: number;
    public DescAcc: string;
    public Acc_Code: string;
    public DEBIT: number;
    public CREDIT: number;
    public Balance: number;
    public StatusFlag: string;


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
    public Comp_Code: number;
    public TrType: number;
    public TrDate: string;
    public Remarks: string;
    public VOUCHER_CODE: number;
    public ACC_CODE: string;
    public ACC_DESCA: string;
    public DEBIT: number;
    public CREDIT: number;
    public Balance: number;
    public StatusFlag: string;


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
    public Comp_Code: number;
    public TrType: number;
    public TrDate: string;
    public Remarks: string;
    public VOUCHER_CODE: number;
    public ACC_CODE: string;
    public ACC_DESCA: string;
    public DEBIT: number;
    public CREDIT: number;
    public Balance: number;
    public StatusFlag: string;


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
    public CashTypeID: number;
    public Trans_Type: string;
    public Trans_Link_Desc: string;
    public Trans_ID: number;
    public Trans_No: number;
    public Comp_Code: number;
    public TrType: number;
    public TrDate: string;
    public Remarks: string;
    public VOUCHER_CODE: number;
    public ACC_CODE: string;
    public ACC_DESCA: string;
    public DEBIT: number;
    public CREDIT: number;
    public Balance: number;
    public IDUser: number;
    public IDExcel: number;
    public StatusFlag: string;


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
    public CashTypeID: number;
    public CashAccCode: string;
    public ACC_DESCA: string;
    public DEBIT: number;
    public CREDIT: number;
    public Balance: number;
    public Trans_Type: string;
    public Trans_Link_Desc: string;
    public Trans_ID: number;
    public Trans_No: number;
    public Comp_Code: number;
    public TrType: number;
    public TrDate: string;
    public Remarks: string;
    public VOUCHER_CODE: number;
    public IDUser: number;
    public IDExcel: number;
    public StatusFlag: string;


}

class SendDataExcel {
    constructor() {
        this.E_I_LogUploadExcel = new E_I_LogUploadExcel();
        this.DataTemp = new Array<any>();
        this.IsPostDirectJournal = true;
        this.FamilyZoneID = 0;
        this.ZoneId = 0;
        this.SupervisorID = 0;

    }
    public E_I_LogUploadExcel: E_I_LogUploadExcel;
    public DataTemp: Array<any>;
    public IsPostDirectJournal: boolean;
    public FamilyZoneID: number;
    public ZoneId: number;
    public SupervisorID: number;
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
    public Ser: number;
    public DescA: string;
    public Balance: number;
    public Amount: number;
    public StatusFlag: string;


}

class G_CheckQtyInInvoice extends CustomClass {
    constructor() {
        super(); 
        this.Message_ItemIssueAr = '';
        this.Message_ItemIssueEn = '';
    } 
    public Message_ItemIssueAr: string;
    public Message_ItemIssueEn: string;
     
}
