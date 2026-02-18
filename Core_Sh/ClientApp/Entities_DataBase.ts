 class A_ACCOUNT extends CustomClass { 
constructor() {
super();
        this.COMP_CODE= 0;
        this.ACC_CODE= '';
        this.ACC_DESCA= '';
        this.ACC_DESCL= '';
        this.ACC_GROUP= 0;
        this.ACC_TYPE= 0;
        this.ACC_LEVEL= 0;
        this.ACC_ACTIVE= false;
        this.PARENT_ACC= '';
        this.DETAIL= false;
        this.CREATED_BY= '';
        this.CREATED_AT= '';
        this.UPDATED_BY= '';
        this.LAST_UPDATE= '';
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public COMP_CODE: number ;
        public ACC_CODE: string ;
        public ACC_DESCA: string ;
        public ACC_DESCL: string ;
        public ACC_GROUP: number ;
        public ACC_TYPE: number ;
        public ACC_LEVEL: number ;
        public ACC_ACTIVE: boolean ;
        public PARENT_ACC: string ;
        public DETAIL: boolean ;
        public CREATED_BY: string ;
        public CREATED_AT: string ;
        public UPDATED_BY: string ;
        public LAST_UPDATE: string ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class A_ACCOUNT_YEAR extends CustomClass { 
constructor() {
super();
        this.COMP_CODE= 0;
        this.ACC_CODE= '';
        this.FIN_YEAR= 0;
        this.ACC_LIMIT= 0;
        this.REMARKS= '';
        this.StatusFlag = '';
 }
        public COMP_CODE: number ;
        public ACC_CODE: string ;
        public FIN_YEAR: number ;
        public ACC_LIMIT: number ;
        public REMARKS: string ;
        public StatusFlag: string;


 }

 class A_JOURNAL_DETAIL extends CustomClass { 
constructor() {
super();
        this.VoucherDetailID= 0;
        this.VoucherID= 0;
        this.COMP_CODE= 0;
        this.VOUCHER_CODE= 0;
        this.ACC_CODE= '';
        this.DEBIT= 0;
        this.CREDIT= 0;
        this.Remarks= '';
        this.CC_CODE= '';
        this.Trans_Type= '';
        this.Trans_ID= 0;
        this.TrDate= '';
        this.Trans_No= 0;
        this.IDUser= 0;
        this.IDExcel= 0;
        this.NumDayShift= 0;
        this.StatusFlag = '';
 }
        public VoucherDetailID: number ;
        public VoucherID: number ;
        public COMP_CODE: number ;
        public VOUCHER_CODE: number ;
        public ACC_CODE: string ;
        public DEBIT: number ;
        public CREDIT: number ;
        public Remarks: string ;
        public CC_CODE: string ;
        public Trans_Type: string ;
        public Trans_ID: number ;
        public TrDate: string ;
        public Trans_No: number ;
        public IDUser: number ;
        public IDExcel: number ;
        public NumDayShift: number ;
        public StatusFlag: string;


 }

 class A_JOURNAL_HEADER extends CustomClass { 
constructor() {
super();
        this.VoucherID= 0;
        this.COMP_CODE= 0;
        this.VOUCHER_CODE= 0;
        this.VOUCHER_DATE= '';
        this.VOUCHER_DESC= '';
        this.VOUCHER_STATUS= 0;
        this.TYPE_CODE= 0;
        this.REF_CODE= '';
        this.CREATED_BY= '';
        this.CREATED_AT= '';
        this.UPDATED_BY= '';
        this.UPDATED_AT= '';
        this.Trans_Type= '';
        this.Trans_ID= 0;
        this.Trans_No= 0;
        this.IDUser= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public VoucherID: number ;
        public COMP_CODE: number ;
        public VOUCHER_CODE: number ;
        public VOUCHER_DATE: string ;
        public VOUCHER_DESC: string ;
        public VOUCHER_STATUS: number ;
        public TYPE_CODE: number ;
        public REF_CODE: string ;
        public CREATED_BY: string ;
        public CREATED_AT: string ;
        public UPDATED_BY: string ;
        public UPDATED_AT: string ;
        public Trans_Type: string ;
        public Trans_ID: number ;
        public Trans_No: number ;
        public IDUser: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class A_TR_ReceiptNote extends CustomClass { 
constructor() {
super();
        this.TransactionID= 0;
        this.TrNo= 0;
        this.RefNo= '';
        this.TransactionDate= '';
        this.CompCode= 0;
        this.TrType= 0;
        this.IsCash= false;
        this.Type= 0;
        this.CashTypeID= 0;
        this.Reason= '';
        this.BeneficiaryName= '';
        this.Amount= 0;
        this.DueAmount= 0;
        this.Status= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.IDPeriod= '';
        this.From_ACC_CODE= '';
        this.To_ACC_CODE= '';
        this.From_Acc_IsCredit= false;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public TransactionID: number ;
        public TrNo: number ;
        public RefNo: string ;
        public TransactionDate: string ;
        public CompCode: number ;
        public TrType: number ;
        public IsCash: boolean ;
        public Type: number ;
        public CashTypeID: number ;
        public Reason: string ;
        public BeneficiaryName: string ;
        public Amount: number ;
        public DueAmount: number ;
        public Status: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public IDPeriod: string ;
        public From_ACC_CODE: string ;
        public To_ACC_CODE: string ;
        public From_Acc_IsCredit: boolean ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class AQ_A_Account extends CustomClass { 
constructor() {
super();
        this.Comp_Code= 0;
        this.ACC_CODE= '';
        this.ACC_DESCA= '';
        this.ACC_DESCL= '';
        this.Total_DEBIT= 0;
        this.Total_CREDIT= 0;
        this.Total_Balance= 0;
        this.PARENT_ACC= '';
        this.ACC_LEVEL= 0;
        this.DETAIL= false;
        this.ACC_ACTIVE= false;
        this.ACC_TYPE= 0;
        this.ACC_GROUP= 0;
        this.CREATED_BY= '';
        this.CREATED_AT= '';
        this.UPDATED_BY= '';
        this.LAST_UPDATE= '';
        this.FIN_YEAR= 0;
        this.ACC_LIMIT= 0;
        this.REMARKS= '';
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public Comp_Code: number ;
        public ACC_CODE: string ;
        public ACC_DESCA: string ;
        public ACC_DESCL: string ;
        public Total_DEBIT: number ;
        public Total_CREDIT: number ;
        public Total_Balance: number ;
        public PARENT_ACC: string ;
        public ACC_LEVEL: number ;
        public DETAIL: boolean ;
        public ACC_ACTIVE: boolean ;
        public ACC_TYPE: number ;
        public ACC_GROUP: number ;
        public CREATED_BY: string ;
        public CREATED_AT: string ;
        public UPDATED_BY: string ;
        public LAST_UPDATE: string ;
        public FIN_YEAR: number ;
        public ACC_LIMIT: number ;
        public REMARKS: string ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class AQ_JOURNAL_DETAIL extends CustomClass { 
constructor() {
super();
        this.VoucherDetailID= 0;
        this.VoucherID= 0;
        this.COMP_CODE= 0;
        this.VOUCHER_CODE= 0;
        this.Serial= null;
        this.ACC_CODE= '';
        this.ACC_DESCA= '';
        this.ACC_DESCL= '';
        this.DEBIT= 0;
        this.CREDIT= 0;
        this.Remarks= '';
        this.CC_CODE= '';
        this.Trans_Type= '';
        this.Trans_ID= 0;
        this.TrDate= '';
        this.Trans_No= 0;
        this.IDUser= 0;
        this.IDExcel= 0;
        this.NumDayShift= 0;
        this.KeyTrans= '';
        this.StatusFlag = '';
 }
        public VoucherDetailID: number ;
        public VoucherID: number ;
        public COMP_CODE: number ;
        public VOUCHER_CODE: number ;
        public Serial: any ;
        public ACC_CODE: string ;
        public ACC_DESCA: string ;
        public ACC_DESCL: string ;
        public DEBIT: number ;
        public CREDIT: number ;
        public Remarks: string ;
        public CC_CODE: string ;
        public Trans_Type: string ;
        public Trans_ID: number ;
        public TrDate: string ;
        public Trans_No: number ;
        public IDUser: number ;
        public IDExcel: number ;
        public NumDayShift: number ;
        public KeyTrans: string ;
        public StatusFlag: string;


 }

 class AQ_JOURNAL_HEADER extends CustomClass { 
constructor() {
super();
        this.VoucherID= 0;
        this.COMP_CODE= 0;
        this.VOUCHER_CODE= 0;
        this.VOUCHER_DATE= '';
        this.VOUCHER_DESC= '';
        this.VOUCHER_STATUS= 0;
        this.TYPE_CODE= 0;
        this.REF_CODE= '';
        this.CREATED_BY= '';
        this.CREATED_AT= '';
        this.UPDATED_BY= '';
        this.UPDATED_AT= '';
        this.Trans_Type= '';
        this.TotalDebit= 0;
        this.TotalCredit= 0;
        this.NetDifference= 0;
        this.Trans_ID= 0;
        this.Trans_No= 0;
        this.IDUser= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public VoucherID: number ;
        public COMP_CODE: number ;
        public VOUCHER_CODE: number ;
        public VOUCHER_DATE: string ;
        public VOUCHER_DESC: string ;
        public VOUCHER_STATUS: number ;
        public TYPE_CODE: number ;
        public REF_CODE: string ;
        public CREATED_BY: string ;
        public CREATED_AT: string ;
        public UPDATED_BY: string ;
        public UPDATED_AT: string ;
        public Trans_Type: string ;
        public TotalDebit: number ;
        public TotalCredit: number ;
        public NetDifference: number ;
        public Trans_ID: number ;
        public Trans_No: number ;
        public IDUser: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class CheckTransactionsUnPosted extends CustomClass { 
constructor() {
super();
        this.Description= '';
        this.KeyTrans= '';
        this.COMP_CODE= 0;
        this.FinYear= 0;
        this.TransID= 0;
        this.TrNo= 0;
        this.TrDate= '';
        this.Amount= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.StatusFlag = '';
 }
        public Description: string ;
        public KeyTrans: string ;
        public COMP_CODE: number ;
        public FinYear: number ;
        public TransID: number ;
        public TrNo: number ;
        public TrDate: string ;
        public Amount: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public StatusFlag: string;


 }

 class D_A_CashTypes extends CustomClass { 
constructor() {
super();
        this.CashTypeID= 0;
        this.Ser= 0;
        this.Description= '';
        this.CompCode= 0;
        this.ChargePrc= 0;
        this.CashAccCode= '';
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public CashTypeID: number ;
        public Ser: number ;
        public Description: string ;
        public CompCode: number ;
        public ChargePrc: number ;
        public CashAccCode: string ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

 class D_A_FinancialType extends CustomClass { 
constructor() {
super();
        this.FinancialTypeID= 0;
        this.CompCode= 0;
        this.TrType= 0;
        this.DescAr= '';
        this.DescEn= '';
        this.IsActive= false;
        this.SearchTypes= 0;
        this.StatusFlag = '';
 }
        public FinancialTypeID: number ;
        public CompCode: number ;
        public TrType: number ;
        public DescAr: string ;
        public DescEn: string ;
        public IsActive: boolean ;
        public SearchTypes: number ;
        public StatusFlag: string;


 }

 class D_A_Suppliers extends CustomClass { 
constructor() {
super();
        this.SupplierID= 0;
        this.SuppliersCode= '';
        this.CompCode= 0;
        this.SupplierName= '';
        this.AccountNo= '';
        this.IsCash= false;
        this.Mobile= '';
        this.Debit= 0;
        this.Credit= 0;
        this.Balance= 0;
        this.PreviousDebit= 0;
        this.PreviousCredit= 0;
        this.OpenBalanceAt= '';
        this.Info= '';
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.ISActive= false;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public SupplierID: number ;
        public SuppliersCode: string ;
        public CompCode: number ;
        public SupplierName: string ;
        public AccountNo: string ;
        public IsCash: boolean ;
        public Mobile: string ;
        public Debit: number ;
        public Credit: number ;
        public Balance: number ;
        public PreviousDebit: number ;
        public PreviousCredit: number ;
        public OpenBalanceAt: string ;
        public Info: string ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public ISActive: boolean ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class D_A_VatType extends CustomClass { 
constructor() {
super();
        this.VatTypeID= 0;
        this.CompCode= 0;
        this.Describtion= '';
        this.Type= 0;
        this.VatPrc= 0;
        this.LineOrder= 0;
        this.VatNatureCode= '';
        this.VatNatureDescA= '';
        this.VatNatureDescE= '';
        this.VatTypeEG= '';
        this.VatSubTypeEG= '';
        this.StatusFlag = '';
 }
        public VatTypeID: number ;
        public CompCode: number ;
        public Describtion: string ;
        public Type: number ;
        public VatPrc: number ;
        public LineOrder: number ;
        public VatNatureCode: string ;
        public VatNatureDescA: string ;
        public VatNatureDescE: string ;
        public VatTypeEG: string ;
        public VatSubTypeEG: string ;
        public StatusFlag: string;


 }

 class D_Customer extends CustomClass { 
constructor() {
super();
        this.CustomerId= 0;
        this.CustomerCODE= '';
        this.NAMEA= '';
        this.NAMEE= '';
        this.EMAIL= '';
        this.REMARKS= '';
        this.MOBILE= '';
        this.MOBILE2= '';
        this.AccountNo= '';
        this.CompCode= 0;
        this.CREATED_BY= '';
        this.CREATED_AT= '';
        this.UPDATED_AT= '';
        this.UPDATED_BY= '';
        this.VATType= 0;
        this.VatNo= '';
        this.Isactive= false;
        this.CreditLimit= 0;
        this.CreditPeriod= 0;
        this.Debit= 0;
        this.Credit= 0;
        this.PreviousDebit= 0;
        this.PreviousCredit= 0;
        this.Openbalance= 0;
        this.PaymentType= 0;
        this.IsCreditCustomer= false;
        this.Address_postal= '';
        this.Address_Province= '';
        this.GroupVatNo= '';
        this.Address_Street= '';
        this.Address_Str_Additional= '';
        this.Address_BuildingNo= '';
        this.Address_Build_Additional= '';
        this.Address_City= '';
        this.Address_District= '';
        this.Address_Floor= '';
        this.Address_Room= '';
        this.Address_LandMarks= '';
        this.SalesInvoiceNature= 0;
        this.ISPersonal= false;
        this.OpenbalanceAt= '';
        this.CarBrand= '';
        this.CarNo= '';
        this.DestructionKm= '';
        this.DrivingNum= '';
        this.NationalityID= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public CustomerId: number ;
        public CustomerCODE: string ;
        public NAMEA: string ;
        public NAMEE: string ;
        public EMAIL: string ;
        public REMARKS: string ;
        public MOBILE: string ;
        public MOBILE2: string ;
        public AccountNo: string ;
        public CompCode: number ;
        public CREATED_BY: string ;
        public CREATED_AT: string ;
        public UPDATED_AT: string ;
        public UPDATED_BY: string ;
        public VATType: number ;
        public VatNo: string ;
        public Isactive: boolean ;
        public CreditLimit: number ;
        public CreditPeriod: number ;
        public Debit: number ;
        public Credit: number ;
        public PreviousDebit: number ;
        public PreviousCredit: number ;
        public Openbalance: number ;
        public PaymentType: number ;
        public IsCreditCustomer: boolean ;
        public Address_postal: string ;
        public Address_Province: string ;
        public GroupVatNo: string ;
        public Address_Street: string ;
        public Address_Str_Additional: string ;
        public Address_BuildingNo: string ;
        public Address_Build_Additional: string ;
        public Address_City: string ;
        public Address_District: string ;
        public Address_Floor: string ;
        public Address_Room: string ;
        public Address_LandMarks: string ;
        public SalesInvoiceNature: number ;
        public ISPersonal: boolean ;
        public OpenbalanceAt: string ;
        public CarBrand: string ;
        public CarNo: string ;
        public DestructionKm: string ;
        public DrivingNum: string ;
        public NationalityID: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class D_G_Currency extends CustomClass { 
constructor() {
super();
        this.CurrencyID= 0;
        this.CurrencyCode= '';
        this.DescA= '';
        this.DescL= '';
        this.Remarks= '';
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public CurrencyID: number ;
        public CurrencyCode: string ;
        public DescA: string ;
        public DescL: string ;
        public Remarks: string ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

 class D_G_FamilyZone extends CustomClass { 
constructor() {
super();
        this.FamilyZoneID= 0;
        this.CompCode= 0;
        this.ZoneCode= '';
        this.DescA= '';
        this.Active= false;
        this.Remarks= '';
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public FamilyZoneID: number ;
        public CompCode: number ;
        public ZoneCode: string ;
        public DescA: string ;
        public Active: boolean ;
        public Remarks: string ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class D_G_Nationality extends CustomClass { 
constructor() {
super();
        this.NationalityID= 0;
        this.NationalityCode= '';
        this.DescA= '';
        this.DescL= '';
        this.Remarks= '';
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public NationalityID: number ;
        public NationalityCode: string ;
        public DescA: string ;
        public DescL: string ;
        public Remarks: string ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

 class D_G_Store extends CustomClass { 
constructor() {
super();
        this.StoreID= 0;
        this.CompCode= 0;
        this.DescA= '';
        this.DescE= '';
        this.Remark= '';
        this.location= '';
        this.CreatedBy= '';
        this.CreatedAt= '';
        this.UpdatedBy= '';
        this.UpdatedAt= '';
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public StoreID: number ;
        public CompCode: number ;
        public DescA: string ;
        public DescE: string ;
        public Remark: string ;
        public location: string ;
        public CreatedBy: string ;
        public CreatedAt: string ;
        public UpdatedBy: string ;
        public UpdatedAt: string ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

 class D_G_TaxAddDed extends CustomClass { 
constructor() {
super();
        this.TaxID= 0;
        this.TaxCode= '';
        this.TaxDescA= '';
        this.TaxDescE= '';
        this.TaxPrc= 0;
        this.TaxType= '';
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public TaxID: number ;
        public TaxCode: string ;
        public TaxDescA: string ;
        public TaxDescE: string ;
        public TaxPrc: number ;
        public TaxType: string ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

 class D_G_Zones extends CustomClass { 
constructor() {
super();
        this.ZoneID= 0;
        this.FamilyZoneID= 0;
        this.CompCode= 0;
        this.ZoneCode= '';
        this.DescA= '';
        this.Active= false;
        this.Remarks= '';
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public ZoneID: number ;
        public FamilyZoneID: number ;
        public CompCode: number ;
        public ZoneCode: string ;
        public DescA: string ;
        public Active: boolean ;
        public Remarks: string ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class D_I_Category extends CustomClass { 
constructor() {
super();
        this.CatID= 0;
        this.Ser= 0;
        this.CompCode= 0;
        this.CatCode= '';
        this.DescA= '';
        this.DescE= '';
        this.Remarks= '';
        this.Type_Show= 0;
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.backgroundColor= '';
        this.FontColor= '';
        this.StatusFlag = '';
 }
        public CatID: number ;
        public Ser: number ;
        public CompCode: number ;
        public CatCode: string ;
        public DescA: string ;
        public DescE: string ;
        public Remarks: string ;
        public Type_Show: number ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public backgroundColor: string ;
        public FontColor: string ;
        public StatusFlag: string;


 }

 class D_I_ItemFamily extends CustomClass { 
constructor() {
super();
        this.ItemFamilyID= 0;
        this.Ser= 0;
        this.FamilyCode= '';
        this.CompCode= 0;
        this.DescA= '';
        this.DescE= '';
        this.CatID= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.backgroundColor= '';
        this.FontColor= '';
        this.StatusFlag = '';
 }
        public ItemFamilyID: number ;
        public Ser: number ;
        public FamilyCode: string ;
        public CompCode: number ;
        public DescA: string ;
        public DescE: string ;
        public CatID: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public backgroundColor: string ;
        public FontColor: string ;
        public StatusFlag: string;


 }

 class D_I_Items extends CustomClass { 
constructor() {
super();
        this.ItemID= 0;
        this.Ser= 0;
        this.CompCode= 0;
        this.IsService= false;
        this.ItemCode= '';
        this.ItemName= '';
        this.ItemFamilyID= 0;
        this.CostPrice= 0;
        this.UnitPrice= 0;
        this.Quantity= 0;
        this.OneHandQuantity= 0;
        this.QuantityMinimum= 0;
        this.QtyOpenBalances= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.ISActive= false;
        this.backgroundColor= '';
        this.FontColor= '';
        this.Image= '';
        this.ItemTaxID= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public ItemID: number ;
        public Ser: number ;
        public CompCode: number ;
        public IsService: boolean ;
        public ItemCode: string ;
        public ItemName: string ;
        public ItemFamilyID: number ;
        public CostPrice: number ;
        public UnitPrice: number ;
        public Quantity: number ;
        public OneHandQuantity: number ;
        public QuantityMinimum: number ;
        public QtyOpenBalances: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public ISActive: boolean ;
        public backgroundColor: string ;
        public FontColor: string ;
        public Image: string ;
        public ItemTaxID: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class D_I_Items_Temp extends CustomClass { 
constructor() {
super();
        this.ItemID= 0;
        this.Ser= 0;
        this.CompCode= 0;
        this.IsService= false;
        this.ItemCode= '';
        this.ItemName= '';
        this.ItemFamilyID= 0;
        this.CostPrice= 0;
        this.UnitPrice= 0;
        this.Quantity= 0;
        this.OneHandQuantity= 0;
        this.QuantityMinimum= 0;
        this.QtyOpenBalances= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.ISActive= false;
        this.backgroundColor= '';
        this.FontColor= '';
        this.ItemTaxID= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public ItemID: number ;
        public Ser: number ;
        public CompCode: number ;
        public IsService: boolean ;
        public ItemCode: string ;
        public ItemName: string ;
        public ItemFamilyID: number ;
        public CostPrice: number ;
        public UnitPrice: number ;
        public Quantity: number ;
        public OneHandQuantity: number ;
        public QuantityMinimum: number ;
        public QtyOpenBalances: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public ISActive: boolean ;
        public backgroundColor: string ;
        public FontColor: string ;
        public ItemTaxID: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class D_I_ItemTaxEG extends CustomClass { 
constructor() {
super();
        this.ItemTaxID= 0;
        this.CatID= 0;
        this.COMP_CODE= 0;
        this.Status= 0;
        this.codeType= '';
        this.parentCode= '';
        this.itemCode= '';
        this.codeName= '';
        this.codeNameAr= '';
        this.activeFrom= '';
        this.activeTo= '';
        this.description= '';
        this.Remarks= '';
        this.UploadDate= '';
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public ItemTaxID: number ;
        public CatID: number ;
        public COMP_CODE: number ;
        public Status: number ;
        public codeType: string ;
        public parentCode: string ;
        public itemCode: string ;
        public codeName: string ;
        public codeNameAr: string ;
        public activeFrom: string ;
        public activeTo: string ;
        public description: string ;
        public Remarks: string ;
        public UploadDate: string ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class D_I_ItemUnits extends CustomClass { 
constructor() {
super();
        this.ItemUnitID= 0;
        this.Ser= 0;
        this.QRCode= '';
        this.ItemID= 0;
        this.UnitID= 0;
        this.TypeUsing= 0;
        this.Remarks= '';
        this.ISActive= false;
        this.StatusFlag = '';
 }
        public ItemUnitID: number ;
        public Ser: number ;
        public QRCode: string ;
        public ItemID: number ;
        public UnitID: number ;
        public TypeUsing: number ;
        public Remarks: string ;
        public ISActive: boolean ;
        public StatusFlag: string;


 }

 class D_I_Tables extends CustomClass { 
constructor() {
super();
        this.TableID= 0;
        this.TableNumber= 0;
        this.CompCode= 0;
        this.ISActive= false;
        this.StatusFlag = '';
 }
        public TableID: number ;
        public TableNumber: number ;
        public CompCode: number ;
        public ISActive: boolean ;
        public StatusFlag: string;


 }

 class D_I_Units extends CustomClass { 
constructor() {
super();
        this.UnitID= 0;
        this.UnitCode= '';
        this.DescA= '';
        this.DescE= '';
        this.Rate= 0;
        this.CompCode= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.StatusFlag = '';
 }
        public UnitID: number ;
        public UnitCode: string ;
        public DescA: string ;
        public DescE: string ;
        public Rate: number ;
        public CompCode: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public StatusFlag: string;


 }

 class DQ_A_Supplier extends CustomClass { 
constructor() {
super();
        this.SupplierID= 0;
        this.SuppliersCode= '';
        this.CompCode= 0;
        this.SupplierName= '';
        this.AccountNo= '';
        this.IsCash= false;
        this.Mobile= '';
        this.Debit= 0;
        this.Credit= 0;
        this.Balance= 0;
        this.PreviousDebit= 0;
        this.PreviousCredit= 0;
        this.OpenBalanceAt= '';
        this.Info= '';
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.UpdatedAt= '';
        this.CreatedBy= '';
        this.UpdatedBy= '';
        this.ISActive= false;
        this.NetBalance= 0;
        this.StatusFlag = '';
 }
        public SupplierID: number ;
        public SuppliersCode: string ;
        public CompCode: number ;
        public SupplierName: string ;
        public AccountNo: string ;
        public IsCash: boolean ;
        public Mobile: string ;
        public Debit: number ;
        public Credit: number ;
        public Balance: number ;
        public PreviousDebit: number ;
        public PreviousCredit: number ;
        public OpenBalanceAt: string ;
        public Info: string ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public UpdatedAt: string ;
        public CreatedBy: string ;
        public UpdatedBy: string ;
        public ISActive: boolean ;
        public NetBalance: number ;
        public StatusFlag: string;


 }

 class E_D_G_CreateTempExcel extends CustomClass { 
constructor() {
super();
        this.IDTempExcel= 0;
        this.CompCode= 0;
        this.IDTypeTemp= 0;
        this.Serial= 0;
        this.NameTitle= '';
        this.Remark= '';
        this.IDLnkExcel= 0;
        this.IDFeildExcel= 0;
        this.CustomFeild= '';
        this.StatusFlag = '';
 }
        public IDTempExcel: number ;
        public CompCode: number ;
        public IDTypeTemp: number ;
        public Serial: number ;
        public NameTitle: string ;
        public Remark: string ;
        public IDLnkExcel: number ;
        public IDFeildExcel: number ;
        public CustomFeild: string ;
        public StatusFlag: string;


 }

 class E_D_G_TypeTempExcel extends CustomClass { 
constructor() {
super();
        this.IDTypeTemp= 0;
        this.CompCode= 0;
        this.DescA= '';
        this.DescE= '';
        this.Remark= '';
        this.IDLnkExcel= 0;
        this.IsActive= false;
        this.ProssType= 0;
        this.StatusFlag = '';
 }
        public IDTypeTemp: number ;
        public CompCode: number ;
        public DescA: string ;
        public DescE: string ;
        public Remark: string ;
        public IDLnkExcel: number ;
        public IsActive: boolean ;
        public ProssType: number ;
        public StatusFlag: string;


 }

 class E_G_Link_BuildFeildExcelTable extends CustomClass { 
constructor() {
super();
        this.IDFeildExcel= 0;
        this.IDLnkExcel= 0;
        this.Serial= 0;
        this.ColumnKey= '';
        this.DescA= '';
        this.DescE= '';
        this.NameFelid= '';
        this.TypeFelid= '';
        this.DefaultValueFelid= '';
        this.IsInsertNewRowValue= false;
        this.IsInsertTable= false;
        this.IsShow= false;
        this.IsOutFelidTable= false;
        this.NameFelidForeignKeyInTable_Lnk_1= '';
        this.NameFelidForeignKeyInTable_Lnk_2= '';
        this.NameOutTableGetData= '';
        this.NamePrimaryKeyOutTable_1= '';
        this.NamePrimaryKeyOutTable_2= '';
        this.NameFelidSelectValue= '';
        this.LinkCodeGroupUsing= 0;
        this.IsLinkFelidinTable= false;
        this.LinkCodeGroupUsing_Parent= 0;
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public IDFeildExcel: number ;
        public IDLnkExcel: number ;
        public Serial: number ;
        public ColumnKey: string ;
        public DescA: string ;
        public DescE: string ;
        public NameFelid: string ;
        public TypeFelid: string ;
        public DefaultValueFelid: string ;
        public IsInsertNewRowValue: boolean ;
        public IsInsertTable: boolean ;
        public IsShow: boolean ;
        public IsOutFelidTable: boolean ;
        public NameFelidForeignKeyInTable_Lnk_1: string ;
        public NameFelidForeignKeyInTable_Lnk_2: string ;
        public NameOutTableGetData: string ;
        public NamePrimaryKeyOutTable_1: string ;
        public NamePrimaryKeyOutTable_2: string ;
        public NameFelidSelectValue: string ;
        public LinkCodeGroupUsing: number ;
        public IsLinkFelidinTable: boolean ;
        public LinkCodeGroupUsing_Parent: number ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

 class E_G_Link_CreateExcelByTable extends CustomClass { 
constructor() {
super();
        this.IDLnkExcel= 0;
        this.CompCode= 0;
        this.Ser= 0;
        this.KeyTrans= '';
        this.IsWorkInsertAllFelidsInRow= 0;
        this.NameA= '';
        this.NameE= '';
        this.NameTable= '';
        this.NameRunProc= '';
        this.NameFelidID= '';
        this.NameFelidTrNo= '';
        this.NameFelidExcelID= '';
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public IDLnkExcel: number ;
        public CompCode: number ;
        public Ser: number ;
        public KeyTrans: string ;
        public IsWorkInsertAllFelidsInRow: number ;
        public NameA: string ;
        public NameE: string ;
        public NameTable: string ;
        public NameRunProc: string ;
        public NameFelidID: string ;
        public NameFelidTrNo: string ;
        public NameFelidExcelID: string ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

 class E_I_ContainerDataExcel extends CustomClass { 
constructor() {
super();
        this.IDContExcel= 0;
        this.NumLoop_Batch= 0;
        this.CreateByUserID= 0;
        this.IDExcel= 0;
        this.IDTypeTemp= 0;
        this.RowNumber= 0;
        this.NameTitle= '';
        this.IDTempExcel= 0;
        this.IDFeildExcel= 0;
        this.ValueFelid= '';
        this.Status= 0;
        this.ErrorMessage= '';
        this.QueryRow= '';
        this.StatusFlag = '';
 }
        public IDContExcel: number ;
        public NumLoop_Batch: number ;
        public CreateByUserID: number ;
        public IDExcel: number ;
        public IDTypeTemp: number ;
        public RowNumber: number ;
        public NameTitle: string ;
        public IDTempExcel: number ;
        public IDFeildExcel: number ;
        public ValueFelid: string ;
        public Status: number ;
        public ErrorMessage: string ;
        public QueryRow: string ;
        public StatusFlag: string;


 }

 class E_I_LogUploadExcel extends CustomClass { 
constructor() {
super();
        this.IDExcel= 0;
        this.CompCode= 0;
        this.IDLnkExcel= 0;
        this.IDTypeTemp= 0;
        this.From_ACC_CODE= '';
        this.NameExcel= '';
        this.TrDate= '';
        this.TrType= 0;
        this.Status= 0;
        this.Remark= '';
        this.KeyTrans= '';
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.DescError= '';
        this.IsPostDirectJournal= false;
        this.LastCountLoop= 0;
        this.ErrorMessage= '';
        this.CreateByUserID= 0;
        this.StatusFlag = '';
 }
        public IDExcel: number ;
        public CompCode: number ;
        public IDLnkExcel: number ;
        public IDTypeTemp: number ;
        public From_ACC_CODE: string ;
        public NameExcel: string ;
        public TrDate: string ;
        public TrType: number ;
        public Status: number ;
        public Remark: string ;
        public KeyTrans: string ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public DescError: string ;
        public IsPostDirectJournal: boolean ;
        public LastCountLoop: number ;
        public ErrorMessage: string ;
        public CreateByUserID: number ;
        public StatusFlag: string;


 }

 class EQ_I_ContainerDataExcel extends CustomClass { 
constructor() {
super();
        this.IDExcel= 0;
        this.KeyTrans= '';
        this.NameFelid= '';
        this.CompCode= 0;
        this.Serial= 0;
        this.NameTitle= '';
        this.ValueFelid= '';
        this.DefaultValueFelid= '';
        this.IsShow= false;
        this.NameTable= '';
        this.NameRunProc= '';
        this.NameFelidID= '';
        this.NameFelidTrNo= '';
        this.NameFelidExcelID= '';
        this.CreateByUserID= 0;
        this.TypeDescA= '';
        this.TypeDescE= '';
        this.CreateExNameA= '';
        this.CreateExNameE= '';
        this.IDLnkExcel= 0;
        this.IDTypeTemp= 0;
        this.IDFeildExcel= 0;
        this.FelidDescA= '';
        this.FelidDescE= '';
        this.NameFelidForeignkeyID1= '';
        this.NameTableOut1= '';
        this.NameFelidOutID1= '';
        this.NameSelectFelidOut1= '';
        this.NameFelidForeignkeyID2= '';
        this.NameTableOut2= '';
        this.NameFelidOutID2= '';
        this.NameSelectFelidOut2= '';
        this.NameFelidForeignkeyID3= '';
        this.NameTableOut3= '';
        this.NameFelidOutID3= '';
        this.NameSelectFelidOut3= '';
        this.StatusFlag = '';
 }
        public IDExcel: number ;
        public KeyTrans: string ;
        public NameFelid: string ;
        public CompCode: number ;
        public Serial: number ;
        public NameTitle: string ;
        public ValueFelid: string ;
        public DefaultValueFelid: string ;
        public IsShow: boolean ;
        public NameTable: string ;
        public NameRunProc: string ;
        public NameFelidID: string ;
        public NameFelidTrNo: string ;
        public NameFelidExcelID: string ;
        public CreateByUserID: number ;
        public TypeDescA: string ;
        public TypeDescE: string ;
        public CreateExNameA: string ;
        public CreateExNameE: string ;
        public IDLnkExcel: number ;
        public IDTypeTemp: number ;
        public IDFeildExcel: number ;
        public FelidDescA: string ;
        public FelidDescE: string ;
        public NameFelidForeignkeyID1: string ;
        public NameTableOut1: string ;
        public NameFelidOutID1: string ;
        public NameSelectFelidOut1: string ;
        public NameFelidForeignkeyID2: string ;
        public NameTableOut2: string ;
        public NameFelidOutID2: string ;
        public NameSelectFelidOut2: string ;
        public NameFelidForeignkeyID3: string ;
        public NameTableOut3: string ;
        public NameFelidOutID3: string ;
        public NameSelectFelidOut3: string ;
        public StatusFlag: string;


 }

 class G_BRANCH extends CustomClass { 
constructor() {
super();
        this.COMP_CODE= 0;
        this.BRA_CODE= 0;
        this.BRA_DESC= '';
        this.BRA_TYPE= 0;
        this.BRA_DESCL= '';
        this.BRA_SHORTA= '';
        this.BRA_SHORTL= '';
        this.REGION_CODE= '';
        this.City= '';
        this.Address= '';
        this.Tel= '';
        this.Fax= '';
        this.Email= '';
        this.WebSite= '';
        this.BranchManager= '';
        this.HRResponsible= '';
        this.FinanceResponsible= '';
        this.SalesManager= '';
        this.CUSTOM1= '';
        this.CUSTOM2= '';
        this.CUSTOM3= '';
        this.CUSTOM4= '';
        this.CUSTOM5= '';
        this.CUSTOMFLAG1= false;
        this.CUSTOMFLAG2= false;
        this.CUSTOMNUM1= 0;
        this.CUSTOMNUM2= 0;
        this.CUSTOMDATE= '';
        this.BRA_DESCE= '';
        this.GroupVatNo= '';
        this.VndIDTypeCode= 0;
        this.IDNo= '';
        this.Address_Street= '';
        this.Address_Str_Additional= '';
        this.Address_BuildingNo= '';
        this.Address_Build_Additional= '';
        this.Address_City= '';
        this.Address_Postal= '';
        this.Address_Province= '';
        this.Address_District= '';
        this.NationalityID= 0;
        this.Currencyid= 0;
        this.RetailInvoiceAllowed= 0;
        this.RetailInvoiceTransCode= 0;
        this.RetailInvoicePayment= 0;
        this.WholeInvoiceTransCode= 0;
        this.WholeInvoiceAllowed= 0;
        this.WholeInvoicePayment= 0;
        this.AutoupdateSalesPrice= false;
        this.SalePriceAddPerc= 0;
        this.SalePriceMinAddPerc= 0;
        this.ExceedMinPricePassword= '';
        this.RetailInvoicePaymentDef= 0;
        this.OperationInvoicePaymentDef= 0;
        this.StatusFlag = '';
 }
        public COMP_CODE: number ;
        public BRA_CODE: number ;
        public BRA_DESC: string ;
        public BRA_TYPE: number ;
        public BRA_DESCL: string ;
        public BRA_SHORTA: string ;
        public BRA_SHORTL: string ;
        public REGION_CODE: string ;
        public City: string ;
        public Address: string ;
        public Tel: string ;
        public Fax: string ;
        public Email: string ;
        public WebSite: string ;
        public BranchManager: string ;
        public HRResponsible: string ;
        public FinanceResponsible: string ;
        public SalesManager: string ;
        public CUSTOM1: string ;
        public CUSTOM2: string ;
        public CUSTOM3: string ;
        public CUSTOM4: string ;
        public CUSTOM5: string ;
        public CUSTOMFLAG1: boolean ;
        public CUSTOMFLAG2: boolean ;
        public CUSTOMNUM1: number ;
        public CUSTOMNUM2: number ;
        public CUSTOMDATE: string ;
        public BRA_DESCE: string ;
        public GroupVatNo: string ;
        public VndIDTypeCode: number ;
        public IDNo: string ;
        public Address_Street: string ;
        public Address_Str_Additional: string ;
        public Address_BuildingNo: string ;
        public Address_Build_Additional: string ;
        public Address_City: string ;
        public Address_Postal: string ;
        public Address_Province: string ;
        public Address_District: string ;
        public NationalityID: number ;
        public Currencyid: number ;
        public RetailInvoiceAllowed: number ;
        public RetailInvoiceTransCode: number ;
        public RetailInvoicePayment: number ;
        public WholeInvoiceTransCode: number ;
        public WholeInvoiceAllowed: number ;
        public WholeInvoicePayment: number ;
        public AutoupdateSalesPrice: boolean ;
        public SalePriceAddPerc: number ;
        public SalePriceMinAddPerc: number ;
        public ExceedMinPricePassword: string ;
        public RetailInvoicePaymentDef: number ;
        public OperationInvoicePaymentDef: number ;
        public StatusFlag: string;


 }

 class G_Codes extends CustomClass { 
constructor() {
super();
        this.ID= 0;
        this.CodeType= '';
        this.CodeValue= 0;
        this.DescA= '';
        this.DescE= '';
        this.SubCode= '';
        this.Remarks= '';
        this.StdCode= '';
        this.StatusFlag = '';
 }
        public ID: number ;
        public CodeType: string ;
        public CodeValue: number ;
        public DescA: string ;
        public DescE: string ;
        public SubCode: string ;
        public Remarks: string ;
        public StdCode: string ;
        public StatusFlag: string;


 }

 class G_COMPANY extends CustomClass { 
constructor() {
super();
        this.COMP_CODE= 0;
        this.NameA= '';
        this.NameE= '';
        this.Systems= '';
        this.MOI_ID= '';
        this.CRT_NO= '';
        this.City= '';
        this.Address= '';
        this.Tel= '';
        this.Fax= '';
        this.Email= '';
        this.WebSite= '';
        this.GMName= '';
        this.HRResponsible= '';
        this.FinanceResponsible= '';
        this.SalesManager= '';
        this.CUSTOM1= '';
        this.CUSTOM2= '';
        this.CUSTOM3= '';
        this.CUSTOM4= '';
        this.CUSTOM5= '';
        this.CUSTOMFLAG1= false;
        this.CUSTOMFLAG2= false;
        this.CUSTOMNUM1= 0;
        this.CUSTOMNUM2= 0;
        this.CUSTOMDATE= '';
        this.IsActive= false;
        this.IsReadOnly= false;
        this.LogoIcon= '';
        this.BkImage1= '';
        this.BkImage2= '';
        this.IBAN_NO= '';
        this.BanckAccNo= '';
        this.BanckAccName= '';
        this.GroupVatNo= '';
        this.VATNO= '';
        this.VndIDTypeCode= 0;
        this.IDNo= '';
        this.Address_Street= '';
        this.Address_Str_Additional= '';
        this.Address_BuildingNo= '';
        this.Address_Build_Additional= '';
        this.Address_City= '';
        this.Address_Postal= '';
        this.Address_Province= '';
        this.Address_District= '';
        this.Address_Floor= '';
        this.Address_Room= '';
        this.Address_LandMarks= '';
        this.NationalityID= 0;
        this.Currencyid= 0;
        this.TaxBusinessType= '';
        this.TaxActivityCode= null;
        this.TaxUserCode= null;
        this.TaxUserverification= null;
        this.TaxToken= null;
        this.StatusFlag = '';
 }
        public COMP_CODE: number ;
        public NameA: string ;
        public NameE: string ;
        public Systems: string ;
        public MOI_ID: string ;
        public CRT_NO: string ;
        public City: string ;
        public Address: string ;
        public Tel: string ;
        public Fax: string ;
        public Email: string ;
        public WebSite: string ;
        public GMName: string ;
        public HRResponsible: string ;
        public FinanceResponsible: string ;
        public SalesManager: string ;
        public CUSTOM1: string ;
        public CUSTOM2: string ;
        public CUSTOM3: string ;
        public CUSTOM4: string ;
        public CUSTOM5: string ;
        public CUSTOMFLAG1: boolean ;
        public CUSTOMFLAG2: boolean ;
        public CUSTOMNUM1: number ;
        public CUSTOMNUM2: number ;
        public CUSTOMDATE: string ;
        public IsActive: boolean ;
        public IsReadOnly: boolean ;
        public LogoIcon: string ;
        public BkImage1: string ;
        public BkImage2: string ;
        public IBAN_NO: string ;
        public BanckAccNo: string ;
        public BanckAccName: string ;
        public GroupVatNo: string ;
        public VATNO: string ;
        public VndIDTypeCode: number ;
        public IDNo: string ;
        public Address_Street: string ;
        public Address_Str_Additional: string ;
        public Address_BuildingNo: string ;
        public Address_Build_Additional: string ;
        public Address_City: string ;
        public Address_Postal: string ;
        public Address_Province: string ;
        public Address_District: string ;
        public Address_Floor: string ;
        public Address_Room: string ;
        public Address_LandMarks: string ;
        public NationalityID: number ;
        public Currencyid: number ;
        public TaxBusinessType: string ;
        public TaxActivityCode: any ;
        public TaxUserCode: any ;
        public TaxUserverification: any ;
        public TaxToken: any ;
        public StatusFlag: string;


 }

 class G_CONTROL extends CustomClass { 
constructor() {
super();
        this.COMP_CODE= 0;
        this.FIN_YEAR= 0;
        this.FirstDate= '';
        this.LastDate= '';
        this.Status= 0;
        this.IsOpen= false;
        this.StatusFlag = '';
 }
        public COMP_CODE: number ;
        public FIN_YEAR: number ;
        public FirstDate: string ;
        public LastDate: string ;
        public Status: number ;
        public IsOpen: boolean ;
        public StatusFlag: string;


 }

 class G_Data_Redis extends CustomClass { 
constructor() {
super();
        this.Id= 0;
        this.NameTable= '';
        this.TrType= 0;
        this.ISActive= false;
        this.KeyTrigger= '';
        this.Status= 0;
        this.NameFolder= '';
        this.IDServerDevice= '';
        this.StatusFlag = '';
 }
        public Id: number ;
        public NameTable: string ;
        public TrType: number ;
        public ISActive: boolean ;
        public KeyTrigger: string ;
        public Status: number ;
        public NameFolder: string ;
        public IDServerDevice: string ;
        public StatusFlag: string;


 }

 class G_DefTempExcel extends CustomClass { 
constructor() {
super();
        this.ID= 0;
        this.CompCode= 0;
        this.Serial= 0;
        this.IDTypeTemp= 0;
        this.NameTitle= '';
        this.Remark= '';
        this.TrType= '';
        this.IDType= 0;
        this.StatusFlag = '';
 }
        public ID: number ;
        public CompCode: number ;
        public Serial: number ;
        public IDTypeTemp: number ;
        public NameTitle: string ;
        public Remark: string ;
        public TrType: string ;
        public IDType: number ;
        public StatusFlag: string;


 }

 class G_Employees extends CustomClass { 
constructor() {
super();
        this.EmpID= 0;
        this.User_Login= '';
        this.Password_Login= '';
        this.EmpCode= '';
        this.CompCode= 0;
        this.Emp_Name= '';
        this.EmpType= 0;
        this.EmpRole= 0;
        this.IsUser= false;
        this.Status= 0;
        this.Address= '';
        this.Mobile= '';
        this.Mobile2= '';
        this.Email= '';
        this.ManagedBy= '';
        this.LoginUrl= false;
        this.Remarks= '';
        this.ManagerID= 0;
        this.SupervisorID= 0;
        this.FamilyZoneID= 0;
        this.ZoneID= 0;
        this.Job_Title= '';
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.Profile_Img= '';
        this.FrontID_Img= '';
        this.BackID_Img= '';
        this.Gender= 0;
        this.IDNO= '';
        this.FrontDrivLicense_Img= '';
        this.BackDrivLicense_Img= '';
        this.FrontVicLicense_Img= '';
        this.BackVicLicense_Img= '';
        this.AccTransferNo= '';
        this.AccNameTransfer= '';
        this.ACC_CODE= '';
        this.Custody_Code= '';
        this.Loan_Code= '';
        this.PayLoan_Cust_Code= '';
        this.CustodyAmount= 0;
        this.LoanAmount= 0;
        this.SalaryAmount= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public EmpID: number ;
        public User_Login: string ;
        public Password_Login: string ;
        public EmpCode: string ;
        public CompCode: number ;
        public Emp_Name: string ;
        public EmpType: number ;
        public EmpRole: number ;
        public IsUser: boolean ;
        public Status: number ;
        public Address: string ;
        public Mobile: string ;
        public Mobile2: string ;
        public Email: string ;
        public ManagedBy: string ;
        public LoginUrl: boolean ;
        public Remarks: string ;
        public ManagerID: number ;
        public SupervisorID: number ;
        public FamilyZoneID: number ;
        public ZoneID: number ;
        public Job_Title: string ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public Profile_Img: string ;
        public FrontID_Img: string ;
        public BackID_Img: string ;
        public Gender: number ;
        public IDNO: string ;
        public FrontDrivLicense_Img: string ;
        public BackDrivLicense_Img: string ;
        public FrontVicLicense_Img: string ;
        public BackVicLicense_Img: string ;
        public AccTransferNo: string ;
        public AccNameTransfer: string ;
        public ACC_CODE: string ;
        public Custody_Code: string ;
        public Loan_Code: string ;
        public PayLoan_Cust_Code: string ;
        public CustodyAmount: number ;
        public LoanAmount: number ;
        public SalaryAmount: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class G_I_DayShift extends CustomClass { 
constructor() {
super();
        this.DayShiftID= 0;
        this.TrDate= '';
        this.DescA= '';
        this.DescE= '';
        this.Status= 0;
        this.Remark= '';
        this.CreatedBy= '';
        this.CreatedAt= '';
        this.CompCode= 0;
        this.LastCount= 0;
        this.StatusFlag = '';
 }
        public DayShiftID: number ;
        public TrDate: string ;
        public DescA: string ;
        public DescE: string ;
        public Status: number ;
        public Remark: string ;
        public CreatedBy: string ;
        public CreatedAt: string ;
        public CompCode: number ;
        public LastCount: number ;
        public StatusFlag: string;


 }

 class G_Log_Device extends CustomClass { 
constructor() {
super();
        this.ID_Device= '';
        this.DeviceType= '';
        this.NameBrowser= '';
        this.USERID= null;
        this.CompCode= 0;
        this.BranchCode= 0;
        this.FIN_YEAR= 0;
        this.USER_CODE= '';
        this.Password= '';
        this.ISActive= false;
        this.Last_Page= '';
        this.Last_Page1= '';
        this.Last_Page2= '';
        this.Last_Page3= '';
        this.IsNotAuto= false;
        this.StatusFlag = '';
 }
        public ID_Device: string ;
        public DeviceType: string ;
        public NameBrowser: string ;
        public USERID: any ;
        public CompCode: number ;
        public BranchCode: number ;
        public FIN_YEAR: number ;
        public USER_CODE: string ;
        public Password: string ;
        public ISActive: boolean ;
        public Last_Page: string ;
        public Last_Page1: string ;
        public Last_Page2: string ;
        public Last_Page3: string ;
        public IsNotAuto: boolean ;
        public StatusFlag: string;


 }

 class G_Log_User extends CustomClass { 
constructor() {
super();
        this.LogID= 0;
        this.CompCode= 0;
        this.UserID= '';
        this.TransID= 0;
        this.TrType= '';
        this.Mode= '';
        this.Remarks= '';
        this.Date= '';
        this.IsSuccess= false;
        this.ID_Device= '';
        this.DeviceType= '';
        this.NameBrowser= '';
        this.CodeRun= '';
        this.StatusFlag = '';
 }
        public LogID: number ;
        public CompCode: number ;
        public UserID: string ;
        public TransID: number ;
        public TrType: string ;
        public Mode: string ;
        public Remarks: string ;
        public Date: string ;
        public IsSuccess: boolean ;
        public ID_Device: string ;
        public DeviceType: string ;
        public NameBrowser: string ;
        public CodeRun: string ;
        public StatusFlag: string;


 }

 class G_MODULES extends CustomClass { 
constructor() {
super();
        this.MODULE_CODE= '';
        this.MODULE_MENU= '';
        this.MODULE_DESCE= '';
        this.MODULE_DESCA= '';
        this.Url_Image= '';
        this.MODULE_TYPE= null;
        this.MODULE_SORT= 0;
        this.IS_Show= 0;
        this.CREATE= false;
        this.EDIT= false;
        this.DELETE= false;
        this.PRINT= false;
        this.VIEW= false;
        this.CUSTOM1= false;
        this.CUSTOM2= false;
        this.CUSTOM3= false;
        this.CUSTOM1_DESC= '';
        this.CUSTOM2_DESC= '';
        this.CUSTOM3_DESC= '';
        this.CUSTOM4= false;
        this.CUSTOM5= false;
        this.CUSTOM6= false;
        this.CUSTOM4_DESC= '';
        this.CUSTOM5_DESC= '';
        this.CUSTOM6_DESC= '';
        this.CUSTOM7= false;
        this.CUSTOM8= false;
        this.CUSTOM9= false;
        this.CUSTOM7_DESC= '';
        this.CUSTOM8_DESC= '';
        this.CUSTOM9_DESC= '';
        this.AVAILABLE= false;
        this.Images_Enabled= false;
        this.StatusFlag = '';
 }
        public MODULE_CODE: string ;
        public MODULE_MENU: string ;
        public MODULE_DESCE: string ;
        public MODULE_DESCA: string ;
        public Url_Image: string ;
        public MODULE_TYPE: any ;
        public MODULE_SORT: number ;
        public IS_Show: number ;
        public CREATE: boolean ;
        public EDIT: boolean ;
        public DELETE: boolean ;
        public PRINT: boolean ;
        public VIEW: boolean ;
        public CUSTOM1: boolean ;
        public CUSTOM2: boolean ;
        public CUSTOM3: boolean ;
        public CUSTOM1_DESC: string ;
        public CUSTOM2_DESC: string ;
        public CUSTOM3_DESC: string ;
        public CUSTOM4: boolean ;
        public CUSTOM5: boolean ;
        public CUSTOM6: boolean ;
        public CUSTOM4_DESC: string ;
        public CUSTOM5_DESC: string ;
        public CUSTOM6_DESC: string ;
        public CUSTOM7: boolean ;
        public CUSTOM8: boolean ;
        public CUSTOM9: boolean ;
        public CUSTOM7_DESC: string ;
        public CUSTOM8_DESC: string ;
        public CUSTOM9_DESC: string ;
        public AVAILABLE: boolean ;
        public Images_Enabled: boolean ;
        public StatusFlag: string;


 }

 class G_Resources extends CustomClass { 
constructor() {
super();
        this.IDRes= 0;
        this.KeyRes= '';
        this.NameResEn= '';
        this.NameResAr= '';
        this.Custom= '';
        this.StatusFlag = '';
 }
        public IDRes: number ;
        public KeyRes: string ;
        public NameResEn: string ;
        public NameResAr: string ;
        public Custom: string ;
        public StatusFlag: string;


 }

 class G_Role extends CustomClass { 
constructor() {
super();
        this.RoleId= 0;
        this.DescA= '';
        this.DescE= '';
        this.Remarks= '';
        this.IsAvailable= false;
        this.CompCode= 0;
        this.IsShowable= false;
        this.RoleType= 0;
        this.StatusFlag = '';
 }
        public RoleId: number ;
        public DescA: string ;
        public DescE: string ;
        public Remarks: string ;
        public IsAvailable: boolean ;
        public CompCode: number ;
        public IsShowable: boolean ;
        public RoleType: number ;
        public StatusFlag: string;


 }

 class G_RoleModule extends CustomClass { 
constructor() {
super();
        this.RoleId= 0;
        this.MODULE_CODE= '';
        this.MODULE_MENU= '';
        this.MODULE_DESCE= '';
        this.MODULE_DESCA= '';
        this.Url_Image= '';
        this.MODULE_TYPE= null;
        this.MODULE_SORT= 0;
        this.IS_Show= 0;
        this.EXECUTE= false;
        this.CREATE= false;
        this.EDIT= false;
        this.DELETE= false;
        this.PRINT= false;
        this.VIEW= false;
        this.CUSTOM1= false;
        this.CUSTOM2= false;
        this.CUSTOM3= false;
        this.CUSTOM4= false;
        this.CUSTOM5= false;
        this.CUSTOM6= false;
        this.CUSTOM7= false;
        this.CUSTOM8= false;
        this.CUSTOM9= false;
        this.ViewImages= false;
        this.EditImages= false;
        this.Prc_Preference= 0;
        this.StatusFlag = '';
 }
        public RoleId: number ;
        public MODULE_CODE: string ;
        public MODULE_MENU: string ;
        public MODULE_DESCE: string ;
        public MODULE_DESCA: string ;
        public Url_Image: string ;
        public MODULE_TYPE: any ;
        public MODULE_SORT: number ;
        public IS_Show: number ;
        public EXECUTE: boolean ;
        public CREATE: boolean ;
        public EDIT: boolean ;
        public DELETE: boolean ;
        public PRINT: boolean ;
        public VIEW: boolean ;
        public CUSTOM1: boolean ;
        public CUSTOM2: boolean ;
        public CUSTOM3: boolean ;
        public CUSTOM4: boolean ;
        public CUSTOM5: boolean ;
        public CUSTOM6: boolean ;
        public CUSTOM7: boolean ;
        public CUSTOM8: boolean ;
        public CUSTOM9: boolean ;
        public ViewImages: boolean ;
        public EditImages: boolean ;
        public Prc_Preference: number ;
        public StatusFlag: string;


 }

 class G_RoleUsers extends CustomClass { 
constructor() {
super();
        this.IDUser= 0;
        this.RoleId= 0;
        this.CompCode= 0;
        this.ISActive= false;
        this.StatusFlag = '';
 }
        public IDUser: number ;
        public RoleId: number ;
        public CompCode: number ;
        public ISActive: boolean ;
        public StatusFlag: string;


 }

 class G_Run_Trigger extends CustomClass { 
constructor() {
super();
        this.Id= 0;
        this.ComCode= 0;
        this.FinYear= 0;
        this.Status_Trigger= 0;
        this.Date= '';
        this.TrType= '';
        this.Remark= '';
        this.StatusFlag = '';
 }
        public Id: number ;
        public ComCode: number ;
        public FinYear: number ;
        public Status_Trigger: number ;
        public Date: string ;
        public TrType: string ;
        public Remark: string ;
        public StatusFlag: string;


 }

 class G_Run_Trigger_Waiting extends CustomClass { 
constructor() {
super();
        this.Id= 0;
        this.Status_Trigger= 0;
        this.Remark= '';
        this.StatusFlag = '';
 }
        public Id: number ;
        public Status_Trigger: number ;
        public Remark: string ;
        public StatusFlag: string;


 }

 class G_SearchForm extends CustomClass { 
constructor() {
super();
        this.SearchFormCode= '';
        this.ReturnDataPropertyName= '';
        this.Description= '';
        this.SerachFormTitle= '';
        this.IsFullScreen= false;
        this.Left= 0;
        this.Top= 0;
        this.Height= 0;
        this.Width= 0;
        this.PageSize= 0;
        this.DataSourceName= '';
        this.SearchInterval= 0;
        this.SerachFormTitleA= '';
        this.ISActive= false;
        this.KeyTrigger= '';
        this.Status= 0;
        this.StatusFlag = '';
 }
        public SearchFormCode: string ;
        public ReturnDataPropertyName: string ;
        public Description: string ;
        public SerachFormTitle: string ;
        public IsFullScreen: boolean ;
        public Left: number ;
        public Top: number ;
        public Height: number ;
        public Width: number ;
        public PageSize: number ;
        public DataSourceName: string ;
        public SearchInterval: number ;
        public SerachFormTitleA: string ;
        public ISActive: boolean ;
        public KeyTrigger: string ;
        public Status: number ;
        public StatusFlag: string;


 }

 class G_SearchFormModule extends CustomClass { 
constructor() {
super();
        this.SystemCode= '';
        this.SubSystemCode= '';
        this.ModuleCode= '';
        this.ControlCode= '';
        this.SearchFormCode= '';
        this.StatusFlag = '';
 }
        public SystemCode: string ;
        public SubSystemCode: string ;
        public ModuleCode: string ;
        public ControlCode: string ;
        public SearchFormCode: string ;
        public StatusFlag: string;


 }

 class G_SearchFormSetting extends CustomClass { 
constructor() {
super();
        this.SearchFormSettingID= 0;
        this.SearchFormCode= '';
        this.FieldSequence= 0;
        this.DataMember= '';
        this.AlternateDataMember= '';
        this.FieldTitle= '';
        this.IsReadOnly= false;
        this.Datatype= 0;
        this.FieldWidth= 0;
        this.UseSelectionOperator= false;
        this.Language= 0;
        this.FieldTitleA= '';
        this.StatusFlag = '';
 }
        public SearchFormSettingID: number ;
        public SearchFormCode: string ;
        public FieldSequence: number ;
        public DataMember: string ;
        public AlternateDataMember: string ;
        public FieldTitle: string ;
        public IsReadOnly: boolean ;
        public Datatype: number ;
        public FieldWidth: number ;
        public UseSelectionOperator: boolean ;
        public Language: number ;
        public FieldTitleA: string ;
        public StatusFlag: string;


 }

 class G_Settings_Device extends CustomClass { 
constructor() {
super();
        this.ID= 0;
        this.ID_Device= '';
        this.Language= '';
        this.DeviceType= '';
        this.NameBrowser= '';
        this.LastDateUpdate= '';
        this.StatusFlag = '';
 }
        public ID: number ;
        public ID_Device: string ;
        public Language: string ;
        public DeviceType: string ;
        public NameBrowser: string ;
        public LastDateUpdate: string ;
        public StatusFlag: string;


 }

 class G_Tr_Archive extends CustomClass { 
constructor() {
super();
        this.ArchiveID= 0;
        this.RefNo= '';
        this.CompCode= 0;
        this.FinYear= 0;
        this.MODULE_CODE= '';
        this.TransID= 0;
        this.UUID= '';
        this.NameFile= '';
        this.TypeFile= '';
        this.Remarks= '';
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.IDUserCreate= 0;
        this.Status= 0;
        this.StatusFlag = '';
 }
        public ArchiveID: number ;
        public RefNo: string ;
        public CompCode: number ;
        public FinYear: number ;
        public MODULE_CODE: string ;
        public TransID: number ;
        public UUID: string ;
        public NameFile: string ;
        public TypeFile: string ;
        public Remarks: string ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public IDUserCreate: number ;
        public Status: number ;
        public StatusFlag: string;


 }

 class G_TransCounter extends CustomClass { 
constructor() {
super();
        this.CompCode= 0;
        this.BranchCode= 0;
        this.FinYear= 0;
        this.TransType= '';
        this.PeriodCode= 0;
        this.LastSerial= 0;
        this.StatusFlag = '';
 }
        public CompCode: number ;
        public BranchCode: number ;
        public FinYear: number ;
        public TransType: string ;
        public PeriodCode: number ;
        public LastSerial: number ;
        public StatusFlag: string;


 }

 class G_TransCounterSetting extends CustomClass { 
constructor() {
super();
        this.CompCode= 0;
        this.TransType= '';
        this.YearStartValueType= 0;
        this.ISBranchCounter= false;
        this.YearStartFixedValue= 0;
        this.Remarks= '';
        this.StatusFlag = '';
 }
        public CompCode: number ;
        public TransType: string ;
        public YearStartValueType: number ;
        public ISBranchCounter: boolean ;
        public YearStartFixedValue: number ;
        public Remarks: string ;
        public StatusFlag: string;


 }

 class G_TypeEmployees extends CustomClass { 
constructor() {
super();
        this.IDTypeEmp= 0;
        this.CompCode= 0;
        this.EmpType= 0;
        this.DescA= '';
        this.DescE= '';
        this.Remark= '';
        this.ISActive= false;
        this.StatusFlag = '';
 }
        public IDTypeEmp: number ;
        public CompCode: number ;
        public EmpType: number ;
        public DescA: string ;
        public DescE: string ;
        public Remark: string ;
        public ISActive: boolean ;
        public StatusFlag: string;


 }

 class G_TypeTempExcel extends CustomClass { 
constructor() {
super();
        this.IDTypeTemp= 0;
        this.CompCode= 0;
        this.DescA= '';
        this.Remark= '';
        this.StatusFlag = '';
 }
        public IDTypeTemp: number ;
        public CompCode: number ;
        public DescA: string ;
        public Remark: string ;
        public StatusFlag: string;


 }

 class G_USERS extends CustomClass { 
constructor() {
super();
        this.ID= 0;
        this.USER_CODE= '';
        this.USER_PASSWORD= '';
        this.USER_PASSWORD2= '';
        this.USER_ACTIVE= false;
        this.USER_NAME= '';
        this.Status= 0;
        this.Email= '';
        this.DepartmentName= '';
        this.JobTitle= '';
        this.RoleIds= '';
        this.USER_TYPE= 0;
        this.CHANGE_PASS_DATE= '';
        this.LastLogin= '';
        this.FirstLogin= '';
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.Profile_Img= '';
        this.Tokenid= '';
        this.IDExcel= 0;
        this.EmpID= null;
        this.IsAutoLogin= false;
        this.StatusFlag = '';
 }
        public ID: number ;
        public USER_CODE: string ;
        public USER_PASSWORD: string ;
        public USER_PASSWORD2: string ;
        public USER_ACTIVE: boolean ;
        public USER_NAME: string ;
        public Status: number ;
        public Email: string ;
        public DepartmentName: string ;
        public JobTitle: string ;
        public RoleIds: string ;
        public USER_TYPE: number ;
        public CHANGE_PASS_DATE: string ;
        public LastLogin: string ;
        public FirstLogin: string ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public Profile_Img: string ;
        public Tokenid: string ;
        public IDExcel: number ;
        public EmpID: any ;
        public IsAutoLogin: boolean ;
        public StatusFlag: string;


 }

 class GQ_USERS extends CustomClass { 
constructor() {
super();
        this.ID= 0;
        this.EmpID= null;
        this.EmpCode= '';
        this.USER_CODE= '';
        this.USER_PASSWORD= '';
        this.USER_NAME= '';
        this.USER_ACTIVE= false;
        this.Email= '';
        this.JobTitle= '';
        this.USER_TYPE= 0;
        this.Tokenid= '';
        this.Profile_Img= '';
        this.UpdatedBy= '';
        this.UpdatedAt= '';
        this.CreatedBy= '';
        this.CreatedAt= '';
        this.FirstLogin= '';
        this.LastLogin= '';
        this.CHANGE_PASS_DATE= '';
        this.DepartmentName= '';
        this.USER_PASSWORD2= '';
        this.Status= 0;
        this.DescZone= '';
        this.DescFamilyZone= '';
        this.RoleIds= '';
        this.StatusFlag = '';
 }
        public ID: number ;
        public EmpID: any ;
        public EmpCode: string ;
        public USER_CODE: string ;
        public USER_PASSWORD: string ;
        public USER_NAME: string ;
        public USER_ACTIVE: boolean ;
        public Email: string ;
        public JobTitle: string ;
        public USER_TYPE: number ;
        public Tokenid: string ;
        public Profile_Img: string ;
        public UpdatedBy: string ;
        public UpdatedAt: string ;
        public CreatedBy: string ;
        public CreatedAt: string ;
        public FirstLogin: string ;
        public LastLogin: string ;
        public CHANGE_PASS_DATE: string ;
        public DepartmentName: string ;
        public USER_PASSWORD2: string ;
        public Status: number ;
        public DescZone: string ;
        public DescFamilyZone: string ;
        public RoleIds: string ;
        public StatusFlag: string;


 }

 class I_Control extends CustomClass { 
constructor() {
super();
        this.CompCode= 0;
        this.Comp_ACC_CODE= '';
        this.ACC_CODE_Create_User= '';
        this.StartAccCode_User= '';
        this.DefSlsVatType= 0;
        this.DefPurVatType= 0;
        this.IsVat= false;
        this.MobileLength= 0;
        this.IDLength= 0;
        this.SendSMS= false;
        this.SendPublicSMS= false;
        this.NotePeriodinSec= 0;
        this.DashBoardPeriodinSec= 0;
        this.MaxYearlyMSGs= 0;
        this.UsedMSGs= 0;
        this.UserTimeZoneUTCDiff= 0;
        this.ServerTimeZoneUTCDiff= 0;
        this.SaudiNationID= 0;
        this.WebCustomerWebsite= false;
        this.MembeshiptStartDate= '';
        this.MembeshipEndDate= '';
        this.MembershipAllanceDays= 0;
        this.MembershipreadOnlyDays= 0;
        this.IsFreePurchaseReturn= false;
        this.IsFreeSalesReturn= false;
        this.ExceedMinPricePassword= '';
        this.CurNameA= '';
        this.CurNameE= '';
        this.CurSmallNameA= '';
        this.CurSmallNameE= '';
        this.IsLocalBranchCustomer= false;
        this.SysTimeOut= 0;
        this.NationalityID= 0;
        this.Currencyid= 0;
        this.DocPDFFolder= '';
        this.TemplateExcelFolder= '';
        this.Start_Loan_Custody= '';
        this.ACC_CODE_Custody= '';
        this.ACC_CODE_Loan= '';
        this.EGTax_ClientIDProd= '';
        this.EGTax_SecretIDProd= '';
        this.TaxLinkedEG= false;
        this.TaxLinked= false;
        this.TaxUnitID= 0;
        this.IS_POS= false;
        this.Is_Restaurant= false;
        this.ISWork_Type_Items= 0;
        this.Is_ShowPrice= false;
        this.Is_JobOrder= false;
        this.Is_CarCenter= false;
        this.TechRepType= 0;
        this.Quickly_INV= 0;
        this.AutoCode= false;
        this.previousUUID= '';
        this.IsArchive= false;
        this.StatusFlag = '';
 }
        public CompCode: number ;
        public Comp_ACC_CODE: string ;
        public ACC_CODE_Create_User: string ;
        public StartAccCode_User: string ;
        public DefSlsVatType: number ;
        public DefPurVatType: number ;
        public IsVat: boolean ;
        public MobileLength: number ;
        public IDLength: number ;
        public SendSMS: boolean ;
        public SendPublicSMS: boolean ;
        public NotePeriodinSec: number ;
        public DashBoardPeriodinSec: number ;
        public MaxYearlyMSGs: number ;
        public UsedMSGs: number ;
        public UserTimeZoneUTCDiff: number ;
        public ServerTimeZoneUTCDiff: number ;
        public SaudiNationID: number ;
        public WebCustomerWebsite: boolean ;
        public MembeshiptStartDate: string ;
        public MembeshipEndDate: string ;
        public MembershipAllanceDays: number ;
        public MembershipreadOnlyDays: number ;
        public IsFreePurchaseReturn: boolean ;
        public IsFreeSalesReturn: boolean ;
        public ExceedMinPricePassword: string ;
        public CurNameA: string ;
        public CurNameE: string ;
        public CurSmallNameA: string ;
        public CurSmallNameE: string ;
        public IsLocalBranchCustomer: boolean ;
        public SysTimeOut: number ;
        public NationalityID: number ;
        public Currencyid: number ;
        public DocPDFFolder: string ;
        public TemplateExcelFolder: string ;
        public Start_Loan_Custody: string ;
        public ACC_CODE_Custody: string ;
        public ACC_CODE_Loan: string ;
        public EGTax_ClientIDProd: string ;
        public EGTax_SecretIDProd: string ;
        public TaxLinkedEG: boolean ;
        public TaxLinked: boolean ;
        public TaxUnitID: number ;
        public IS_POS: boolean ;
        public Is_Restaurant: boolean ;
        public ISWork_Type_Items: number ;
        public Is_ShowPrice: boolean ;
        public Is_JobOrder: boolean ;
        public Is_CarCenter: boolean ;
        public TechRepType: number ;
        public Quickly_INV: number ;
        public AutoCode: boolean ;
        public previousUUID: string ;
        public IsArchive: boolean ;
        public StatusFlag: string;


 }

 class I_TR_ExternalLabor extends CustomClass { 
constructor() {
super();
        this.TransactionID= 0;
        this.TrNo= 0;
        this.RefNo= '';
        this.TransactionDate= '';
        this.CompCode= 0;
        this.TrType= 0;
        this.IsCash= false;
        this.Type= 0;
        this.CashTypeID= 0;
        this.Reason= '';
        this.BeneficiaryName= '';
        this.Amount= 0;
        this.DueAmount= 0;
        this.Status= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.InvoiceID= 0;
        this.InvoiceNo= '';
        this.IDPeriod= '';
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public TransactionID: number ;
        public TrNo: number ;
        public RefNo: string ;
        public TransactionDate: string ;
        public CompCode: number ;
        public TrType: number ;
        public IsCash: boolean ;
        public Type: number ;
        public CashTypeID: number ;
        public Reason: string ;
        public BeneficiaryName: string ;
        public Amount: number ;
        public DueAmount: number ;
        public Status: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public InvoiceID: number ;
        public InvoiceNo: string ;
        public IDPeriod: string ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class I_TR_FinancialTransactions extends CustomClass { 
constructor() {
super();
        this.TransactionID= 0;
        this.TrNo= 0;
        this.RefNo= '';
        this.TransactionDate= '';
        this.CompCode= 0;
        this.TrType= 0;
        this.IsCash= false;
        this.Type= 0;
        this.CashTypeID= 0;
        this.Reason= '';
        this.BeneficiaryName= '';
        this.Amount= 0;
        this.ChargePrc= 0;
        this.DueAmount= 0;
        this.LoanPayAmount= 0;
        this.CustodyPayAmount= 0;
        this.Status= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.PurchaseID= 0;
        this.TrNo_Ref= 0;
        this.IDPeriod= '';
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public TransactionID: number ;
        public TrNo: number ;
        public RefNo: string ;
        public TransactionDate: string ;
        public CompCode: number ;
        public TrType: number ;
        public IsCash: boolean ;
        public Type: number ;
        public CashTypeID: number ;
        public Reason: string ;
        public BeneficiaryName: string ;
        public Amount: number ;
        public ChargePrc: number ;
        public DueAmount: number ;
        public LoanPayAmount: number ;
        public CustodyPayAmount: number ;
        public Status: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public PurchaseID: number ;
        public TrNo_Ref: number ;
        public IDPeriod: string ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class I_TR_PurchaseDetails extends CustomClass { 
constructor() {
super();
        this.PurchaseDetailID= 0;
        this.PurchaseID= 0;
        this.ItemUnitID= 0;
        this.ItemID= 0;
        this.VatTypeID= 0;
        this.Rate= 0;
        this.CostPrice= 0;
        this.OneHandQuantity= 0;
        this.Quantity= 0;
        this.RetQty= 0;
        this.UnitPrice= 0;
        this.DiscountPrc= 0;
        this.DiscountAmount= 0;
        this.NetUnitPrice= 0;
        this.ItemTotal= 0;
        this.VatPrc= 0;
        this.VatAmount= 0;
        this.NetAfterVat= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public PurchaseDetailID: number ;
        public PurchaseID: number ;
        public ItemUnitID: number ;
        public ItemID: number ;
        public VatTypeID: number ;
        public Rate: number ;
        public CostPrice: number ;
        public OneHandQuantity: number ;
        public Quantity: number ;
        public RetQty: number ;
        public UnitPrice: number ;
        public DiscountPrc: number ;
        public DiscountAmount: number ;
        public NetUnitPrice: number ;
        public ItemTotal: number ;
        public VatPrc: number ;
        public VatAmount: number ;
        public NetAfterVat: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class I_TR_Purchases extends CustomClass { 
constructor() {
super();
        this.PurchaseID= 0;
        this.TrNo= 0;
        this.TrType= 0;
        this.GlobalNo= 0;
        this.DoNo= '';
        this.RefID= 0;
        this.ReNo= '';
        this.IsCash= false;
        this.CashType= 0;
        this.PurDate= '';
        this.CompCode= 0;
        this.TrTime= '';
        this.Status= 0;
        this.SupplierName= '';
        this.Mobile= '';
        this.ItemsTotal= 0;
        this.Discount= 0;
        this.TotalAmount= 0;
        this.VatTypeID= 0;
        this.VatAmount= 0;
        this.ChargePrc= 0;
        this.NetAmount= 0;
        this.DueAmount= 0;
        this.RemainAmount= 0;
        this.PaymentAmount= 0;
        this.IsService= false;
        this.SupplierID= 0;
        this.Remarks= '';
        this.VoucherNo= 0;
        this.IsPosted= false;
        this.QRCode= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.InvoiceTransCode= 0;
        this.DocUUID= '';
        this.IDPeriod= '';
        this.PaymentTerms= '';
        this.PaymentType= '';
        this.PurOrderID= 0;
        this.PurOrderNo= '';
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public PurchaseID: number ;
        public TrNo: number ;
        public TrType: number ;
        public GlobalNo: number ;
        public DoNo: string ;
        public RefID: number ;
        public ReNo: string ;
        public IsCash: boolean ;
        public CashType: number ;
        public PurDate: string ;
        public CompCode: number ;
        public TrTime: string ;
        public Status: number ;
        public SupplierName: string ;
        public Mobile: string ;
        public ItemsTotal: number ;
        public Discount: number ;
        public TotalAmount: number ;
        public VatTypeID: number ;
        public VatAmount: number ;
        public ChargePrc: number ;
        public NetAmount: number ;
        public DueAmount: number ;
        public RemainAmount: number ;
        public PaymentAmount: number ;
        public IsService: boolean ;
        public SupplierID: number ;
        public Remarks: string ;
        public VoucherNo: number ;
        public IsPosted: boolean ;
        public QRCode: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public InvoiceTransCode: number ;
        public DocUUID: string ;
        public IDPeriod: string ;
        public PaymentTerms: string ;
        public PaymentType: string ;
        public PurOrderID: number ;
        public PurOrderNo: string ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class I_TR_SaleDetails extends CustomClass { 
constructor() {
super();
        this.SaleDetailID= 0;
        this.SaleID= 0;
        this.ItemUnitID= 0;
        this.ItemID= 0;
        this.NameItem= '';
        this.VatTypeID= 0;
        this.Rate= 0;
        this.CostPrice= 0;
        this.OneHandQuantity= 0;
        this.Quantity= 0;
        this.RetQty= 0;
        this.UnitPrice= 0;
        this.DiscountPrc= 0;
        this.DiscountAmount= 0;
        this.NetUnitPrice= 0;
        this.ItemTotal= 0;
        this.VatPrc= 0;
        this.VatAmount= 0;
        this.NetAfterVat= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public SaleDetailID: number ;
        public SaleID: number ;
        public ItemUnitID: number ;
        public ItemID: number ;
        public NameItem: string ;
        public VatTypeID: number ;
        public Rate: number ;
        public CostPrice: number ;
        public OneHandQuantity: number ;
        public Quantity: number ;
        public RetQty: number ;
        public UnitPrice: number ;
        public DiscountPrc: number ;
        public DiscountAmount: number ;
        public NetUnitPrice: number ;
        public ItemTotal: number ;
        public VatPrc: number ;
        public VatAmount: number ;
        public NetAfterVat: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class I_TR_Sales extends CustomClass { 
constructor() {
super();
        this.SaleID= 0;
        this.TrNo= 0;
        this.TrType= 0;
        this.InvType= 0;
        this.GlobalNo= 0;
        this.DoNo= '';
        this.RefID= 0;
        this.ReNo= '';
        this.IsCash= false;
        this.CashType= 0;
        this.SaleDate= '';
        this.CompCode= 0;
        this.TrTime= '';
        this.Status= 0;
        this.CustomerName= '';
        this.Mobile= '';
        this.SalesManID= 0;
        this.SalesManName= '';
        this.SalesManMobile= '';
        this.AttatchName= '';
        this.ItemsTotal= 0;
        this.Discount= 0;
        this.TotalAmount= 0;
        this.VatTypeID= 0;
        this.VatAmount= 0;
        this.ChargePrc= 0;
        this.ExternalAmount= 0;
        this.NetAmount= 0;
        this.DueAmount= 0;
        this.RemainAmount= 0;
        this.PaymentAmount= 0;
        this.CurrenyID= 0;
        this.TaxID= 0;
        this.TaxPrc= 0;
        this.DedTaxAmount= 0;
        this.Rate_Currency= 0;
        this.IsService= false;
        this.CustomerID= 0;
        this.Remarks= '';
        this.VoucherNo= 0;
        this.IsPosted= false;
        this.QRCode= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.InvoiceTransCode= 0;
        this.TaxStatus= 0;
        this.DocUUID= '';
        this.PrevInvoiceHash= '';
        this.IDPeriod= '';
        this.PaymentTerms= '';
        this.PaymentType= '';
        this.ExpiryTime= '';
        this.DeliveryTime= '';
        this.TaxErrorCode= 0;
        this.ShowPriceID= 0;
        this.ShowPriceNo= '';
        this.JobOrderID= 0;
        this.JobOrderNo= '';
        this.Warrantyperiod= '';
        this.CarBrand= '';
        this.CarNo= '';
        this.ChassisNo= '';
        this.DestructionKm= '';
        this.EngineerName= '';
        this.IDExcel= 0;
        this.purchaseorderDesc= '';
        this.purchaseorderCode= '';
        this.StatusFlag = '';
 }
        public SaleID: number ;
        public TrNo: number ;
        public TrType: number ;
        public InvType: number ;
        public GlobalNo: number ;
        public DoNo: string ;
        public RefID: number ;
        public ReNo: string ;
        public IsCash: boolean ;
        public CashType: number ;
        public SaleDate: string ;
        public CompCode: number ;
        public TrTime: string ;
        public Status: number ;
        public CustomerName: string ;
        public Mobile: string ;
        public SalesManID: number ;
        public SalesManName: string ;
        public SalesManMobile: string ;
        public AttatchName: string ;
        public ItemsTotal: number ;
        public Discount: number ;
        public TotalAmount: number ;
        public VatTypeID: number ;
        public VatAmount: number ;
        public ChargePrc: number ;
        public ExternalAmount: number ;
        public NetAmount: number ;
        public DueAmount: number ;
        public RemainAmount: number ;
        public PaymentAmount: number ;
        public CurrenyID: number ;
        public TaxID: number ;
        public TaxPrc: number ;
        public DedTaxAmount: number ;
        public Rate_Currency: number ;
        public IsService: boolean ;
        public CustomerID: number ;
        public Remarks: string ;
        public VoucherNo: number ;
        public IsPosted: boolean ;
        public QRCode: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public InvoiceTransCode: number ;
        public TaxStatus: number ;
        public DocUUID: string ;
        public PrevInvoiceHash: string ;
        public IDPeriod: string ;
        public PaymentTerms: string ;
        public PaymentType: string ;
        public ExpiryTime: string ;
        public DeliveryTime: string ;
        public TaxErrorCode: number ;
        public ShowPriceID: number ;
        public ShowPriceNo: string ;
        public JobOrderID: number ;
        public JobOrderNo: string ;
        public Warrantyperiod: string ;
        public CarBrand: string ;
        public CarNo: string ;
        public ChassisNo: string ;
        public DestructionKm: string ;
        public EngineerName: string ;
        public IDExcel: number ;
        public purchaseorderDesc: string ;
        public purchaseorderCode: string ;
        public StatusFlag: string;


 }

 class I_TR_TableReservations extends CustomClass { 
constructor() {
super();
        this.ReservationID= 0;
        this.TableID= 0;
        this.ReservationDate= '';
        this.ReservationTime= '';
        this.CustomerName= '';
        this.NumberOfPeople= 0;
        this.Status= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.CompCode= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public ReservationID: number ;
        public TableID: number ;
        public ReservationDate: string ;
        public ReservationTime: string ;
        public CustomerName: string ;
        public NumberOfPeople: number ;
        public Status: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public CompCode: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class IQ_DisplayAllItemsActive extends CustomClass { 
constructor() {
super();
        this.ItemID= 0;
        this.Ser= 0;
        this.CompCode= 0;
        this.ItemCode= '';
        this.ItemName= '';
        this.ItemFamilyID= 0;
        this.CostPrice= 0;
        this.UnitPrice= 0;
        this.Quantity= 0;
        this.OneHandQuantity= 0;
        this.QuantityMinimum= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.CatID= 0;
        this.TypeUsing= 0;
        this.backgroundColor= '';
        this.FontColor= '';
        this.IsService= false;
        this.ISActive= false;
        this.QtyOpenBalances= 0;
        this.Image= '';
        this.StatusFlag = '';
 }
        public ItemID: number ;
        public Ser: number ;
        public CompCode: number ;
        public ItemCode: string ;
        public ItemName: string ;
        public ItemFamilyID: number ;
        public CostPrice: number ;
        public UnitPrice: number ;
        public Quantity: number ;
        public OneHandQuantity: number ;
        public QuantityMinimum: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public CatID: number ;
        public TypeUsing: number ;
        public backgroundColor: string ;
        public FontColor: string ;
        public IsService: boolean ;
        public ISActive: boolean ;
        public QtyOpenBalances: number ;
        public Image: string ;
        public StatusFlag: string;


 }

 class IQ_DisplayAllItemsUnites extends CustomClass { 
constructor() {
super();
        this.ItemID= 0;
        this.Ser= 0;
        this.CompCode= 0;
        this.ItemCode= '';
        this.ItemName= '';
        this.ItemFamilyID= 0;
        this.CostPrice= 0;
        this.UnitPrice= 0;
        this.Quantity= 0;
        this.OneHandQuantity= 0;
        this.QtyOpenBalances= 0;
        this.Rate= 0;
        this.QuantityMinimum= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.CatID= 0;
        this.TypeUsing= 0;
        this.QRCode= '';
        this.backgroundColor= '';
        this.FontColor= '';
        this.IsService= false;
        this.ISActive= false;
        this.ItemUnitID= 0;
        this.UnitID= 0;
        this.Image= '';
        this.StatusFlag = '';
 }
        public ItemID: number ;
        public Ser: number ;
        public CompCode: number ;
        public ItemCode: string ;
        public ItemName: string ;
        public ItemFamilyID: number ;
        public CostPrice: number ;
        public UnitPrice: number ;
        public Quantity: number ;
        public OneHandQuantity: number ;
        public QtyOpenBalances: number ;
        public Rate: number ;
        public QuantityMinimum: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public CatID: number ;
        public TypeUsing: number ;
        public QRCode: string ;
        public backgroundColor: string ;
        public FontColor: string ;
        public IsService: boolean ;
        public ISActive: boolean ;
        public ItemUnitID: number ;
        public UnitID: number ;
        public Image: string ;
        public StatusFlag: string;


 }

 class IQ_EGTaxInvHeader extends CustomClass { 
constructor() {
super();
        this.sub_Bra_code= 0;
        this.sub_Bra_Name= '';
        this.Sub_Country= '';
        this.sub_governate= '';
        this.Sub_City= '';
        this.Sub_Street= '';
        this.sub_BuildingNo= '';
        this.sub_PostalCode= '';
        this.sub_Floor= '';
        this.sub__Room= '';
        this.sub_LandMarks= '';
        this.sub_AdditionalInfo= '';
        this.sub_Type= '';
        this.sub_VatNo= '';
        this.sub_Name= '';
        this.Cus_Country= '';
        this.Cus_governate= '';
        this.Cus_City= '';
        this.Cus_Street= '';
        this.Cus_BuildingNo= '';
        this.Cus_PostalCode= '';
        this.Cus_Floor= '';
        this.Cus__Room= '';
        this.Cus_LandMarks= '';
        this.Cus_AdditionalInfo= '';
        this.Cus_VatNo= '';
        this.Cus_Name= '';
        this.Cus_Type= '';
        this.Sub_ActivityCode= null;
        this.AllowAfterVat= 0;
        this.DiscountAmount= 0;
        this.PurchaseorderNo= '';
        this.purchaseorderDesc= '';
        this.SalesOrderRef= 0;
        this.SalesORderDesc= '';
        this.perofrmainvoiceno= '';
        this.ItemDiscountTotal= 0;
        this.ItemTotal= 0;
        this.hd_NetAmount= 0;
        this.hd_TaxTotal= 0;
        this.hd_TotalAmount= 0;
        this.RoundingAmount= 0;
        this.InvoiceID= 0;
        this.TrNo= 0;
        this.inv_Type= '';
        this.TrDate= '';
        this.TrTime= '';
        this.TaxUploadDate= '';
        this.DocUUID= '';
        this.BranchCode= 0;
        this.CompCode= 0;
        this.Status= 0;
        this.VatAmount= 0;
        this.TaxType= 0;
        this.TaxCode= '';
        this.TaxPrc= 0;
        this.DedTaxAmount= 0;
        this.DedTaxType= '';
        this.CurrencyRate= 0;
        this.CurrencyCode= '';
        this.StatusFlag = '';
 }
        public sub_Bra_code: number ;
        public sub_Bra_Name: string ;
        public Sub_Country: string ;
        public sub_governate: string ;
        public Sub_City: string ;
        public Sub_Street: string ;
        public sub_BuildingNo: string ;
        public sub_PostalCode: string ;
        public sub_Floor: string ;
        public sub__Room: string ;
        public sub_LandMarks: string ;
        public sub_AdditionalInfo: string ;
        public sub_Type: string ;
        public sub_VatNo: string ;
        public sub_Name: string ;
        public Cus_Country: string ;
        public Cus_governate: string ;
        public Cus_City: string ;
        public Cus_Street: string ;
        public Cus_BuildingNo: string ;
        public Cus_PostalCode: string ;
        public Cus_Floor: string ;
        public Cus__Room: string ;
        public Cus_LandMarks: string ;
        public Cus_AdditionalInfo: string ;
        public Cus_VatNo: string ;
        public Cus_Name: string ;
        public Cus_Type: string ;
        public Sub_ActivityCode: any ;
        public AllowAfterVat: number ;
        public DiscountAmount: number ;
        public PurchaseorderNo: string ;
        public purchaseorderDesc: string ;
        public SalesOrderRef: number ;
        public SalesORderDesc: string ;
        public perofrmainvoiceno: string ;
        public ItemDiscountTotal: number ;
        public ItemTotal: number ;
        public hd_NetAmount: number ;
        public hd_TaxTotal: number ;
        public hd_TotalAmount: number ;
        public RoundingAmount: number ;
        public InvoiceID: number ;
        public TrNo: number ;
        public inv_Type: string ;
        public TrDate: string ;
        public TrTime: string ;
        public TaxUploadDate: string ;
        public DocUUID: string ;
        public BranchCode: number ;
        public CompCode: number ;
        public Status: number ;
        public VatAmount: number ;
        public TaxType: number ;
        public TaxCode: string ;
        public TaxPrc: number ;
        public DedTaxAmount: number ;
        public DedTaxType: string ;
        public CurrencyRate: number ;
        public CurrencyCode: string ;
        public StatusFlag: string;


 }

 class IQ_EGTaxInvItems extends CustomClass { 
constructor() {
super();
        this.DescA= '';
        this.RefItemCode= '';
        this.ItemCode= '';
        this.UomCode= '';
        this.Quantity= 0;
        this.OldItemCode= '';
        this.ItemTotal= 0;
        this.Total= 0;
        this.SalesTotal= 0;
        this.diff= 0;
        this.TaxableFees= 0;
        this.NetTotal= 0;
        this.Unitprice= 0;
        this.CurrencyCode= '';
        this.DiscountPrc= 0;
        this.Discount= 0;
        this.TaxType= '';
        this.TaxSubType= '';
        this.VatPrc= 0;
        this.VatAmount= 0;
        this.InvoiceItemID= 0;
        this.InvoiceID= 0;
        this.Serial= 0;
        this.TaxCode= '';
        this.TaxPrc= 0;
        this.ItemDedTax= 0;
        this.DedTaxType= '';
        this.StatusFlag = '';
 }
        public DescA: string ;
        public RefItemCode: string ;
        public ItemCode: string ;
        public UomCode: string ;
        public Quantity: number ;
        public OldItemCode: string ;
        public ItemTotal: number ;
        public Total: number ;
        public SalesTotal: number ;
        public diff: number ;
        public TaxableFees: number ;
        public NetTotal: number ;
        public Unitprice: number ;
        public CurrencyCode: string ;
        public DiscountPrc: number ;
        public Discount: number ;
        public TaxType: string ;
        public TaxSubType: string ;
        public VatPrc: number ;
        public VatAmount: number ;
        public InvoiceItemID: number ;
        public InvoiceID: number ;
        public Serial: number ;
        public TaxCode: string ;
        public TaxPrc: number ;
        public ItemDedTax: number ;
        public DedTaxType: string ;
        public StatusFlag: string;


 }

 class IQ_EGTaxReceiptHeader extends CustomClass { 
constructor() {
super();
        this.SellerBranchCode= 0;
        this.orderdeliveryMode= '';
        this.sub_Bra_Name= '';
        this.SellerCountry= '';
        this.SellerGovernate= '';
        this.SellerRegionCity= '';
        this.SellerStreet= '';
        this.SellerBuildingNumber= '';
        this.SellerPostalCode= '';
        this.SellerFloor= '';
        this.SellerRoom= '';
        this.SellerLandmark= '';
        this.SellerAdditionalInformation= '';
        this.sub_Type= '';
        this.SellerRin= '';
        this.SellerCompanyTradeName= '';
        this.BuyerId= '';
        this.BuyerName= '';
        this.BuyerMobileNumber= '';
        this.paymentMethod= '';
        this.BuyerPaymentNumber= '';
        this.BuyerType= '';
        this.activityCode= null;
        this.AllowAfterVat= 0;
        this.DiscountAmount= 0;
        this.PurchaseorderNo= '';
        this.purchaseorderDesc= '';
        this.SalesOrderRef= 0;
        this.SalesORderDesc= '';
        this.perofrmainvoiceno= '';
        this.ItemDiscountTotal= 0;
        this.ItemTotal= 0;
        this.hd_NetAmount= 0;
        this.hd_TaxTotal= 0;
        this.hd_TotalAmount= 0;
        this.RoundingAmount= 0;
        this.InvoiceID= 0;
        this.ReceiptNumber= 0;
        this.inv_Type= '';
        this.TrDate= '';
        this.TrTime= '';
        this.TaxUploadDate= '';
        this.DocUUID= '';
        this.BranchCode= 0;
        this.CompCode= 0;
        this.Status= 0;
        this.VatAmount= 0;
        this.typeVersion= 0;
        this.receiptType= '';
        this.feesAmount= 0;
        this.TaxCode= '';
        this.TaxPrc= 0;
        this.DedTaxAmount= 0;
        this.DedTaxType= '';
        this.CurrencyRate= 0;
        this.currency= '';
        this.uuid= '';
        this.previousUUID= '';
        this.StatusFlag = '';
 }
        public SellerBranchCode: number ;
        public orderdeliveryMode: string ;
        public sub_Bra_Name: string ;
        public SellerCountry: string ;
        public SellerGovernate: string ;
        public SellerRegionCity: string ;
        public SellerStreet: string ;
        public SellerBuildingNumber: string ;
        public SellerPostalCode: string ;
        public SellerFloor: string ;
        public SellerRoom: string ;
        public SellerLandmark: string ;
        public SellerAdditionalInformation: string ;
        public sub_Type: string ;
        public SellerRin: string ;
        public SellerCompanyTradeName: string ;
        public BuyerId: string ;
        public BuyerName: string ;
        public BuyerMobileNumber: string ;
        public paymentMethod: string ;
        public BuyerPaymentNumber: string ;
        public BuyerType: string ;
        public activityCode: any ;
        public AllowAfterVat: number ;
        public DiscountAmount: number ;
        public PurchaseorderNo: string ;
        public purchaseorderDesc: string ;
        public SalesOrderRef: number ;
        public SalesORderDesc: string ;
        public perofrmainvoiceno: string ;
        public ItemDiscountTotal: number ;
        public ItemTotal: number ;
        public hd_NetAmount: number ;
        public hd_TaxTotal: number ;
        public hd_TotalAmount: number ;
        public RoundingAmount: number ;
        public InvoiceID: number ;
        public ReceiptNumber: number ;
        public inv_Type: string ;
        public TrDate: string ;
        public TrTime: string ;
        public TaxUploadDate: string ;
        public DocUUID: string ;
        public BranchCode: number ;
        public CompCode: number ;
        public Status: number ;
        public VatAmount: number ;
        public typeVersion: number ;
        public receiptType: string ;
        public feesAmount: number ;
        public TaxCode: string ;
        public TaxPrc: number ;
        public DedTaxAmount: number ;
        public DedTaxType: string ;
        public CurrencyRate: number ;
        public currency: string ;
        public uuid: string ;
        public previousUUID: string ;
        public StatusFlag: string;


 }

 class IQ_G_Employees extends CustomClass { 
constructor() {
super();
        this.EmpID= 0;
        this.EmpType= 0;
        this.EmpCode= '';
        this.CompCode= 0;
        this.Emp_Name= '';
        this.Status= 0;
        this.Address= '';
        this.Mobile= '';
        this.Mobile2= '';
        this.Email= '';
        this.ManagedBy= '';
        this.LoginUrl= false;
        this.Remarks= '';
        this.ManagerID= 0;
        this.SupervisorID= 0;
        this.FamilyZoneID= 0;
        this.ZoneID= 0;
        this.Job_Title= '';
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.Profile_Img= '';
        this.FrontID_Img= '';
        this.BackID_Img= '';
        this.Gender= 0;
        this.IDNO= '';
        this.FrontDrivLicense_Img= '';
        this.BackDrivLicense_Img= '';
        this.FrontVicLicense_Img= '';
        this.BackVicLicense_Img= '';
        this.AccTransferNo= '';
        this.AccNameTransfer= '';
        this.Custody_Code= '';
        this.Loan_Code= '';
        this.CustodyAmount= 0;
        this.LoanAmount= 0;
        this.SalaryAmount= 0;
        this.IDExcel= 0;
        this.NameFamliyZone= '';
        this.NameZone= '';
        this.USER_CODE= '';
        this.ID= 0;
        this.USER_PASSWORD= '';
        this.DescEmpType= '';
        this.IsUser= false;
        this.EmpRole= 0;
        this.PayLoan_Cust_Code= '';
        this.ACC_CODE= '';
        this.Password_Login= '';
        this.User_Login= '';
        this.StatusFlag = '';
 }
        public EmpID: number ;
        public EmpType: number ;
        public EmpCode: string ;
        public CompCode: number ;
        public Emp_Name: string ;
        public Status: number ;
        public Address: string ;
        public Mobile: string ;
        public Mobile2: string ;
        public Email: string ;
        public ManagedBy: string ;
        public LoginUrl: boolean ;
        public Remarks: string ;
        public ManagerID: number ;
        public SupervisorID: number ;
        public FamilyZoneID: number ;
        public ZoneID: number ;
        public Job_Title: string ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public Profile_Img: string ;
        public FrontID_Img: string ;
        public BackID_Img: string ;
        public Gender: number ;
        public IDNO: string ;
        public FrontDrivLicense_Img: string ;
        public BackDrivLicense_Img: string ;
        public FrontVicLicense_Img: string ;
        public BackVicLicense_Img: string ;
        public AccTransferNo: string ;
        public AccNameTransfer: string ;
        public Custody_Code: string ;
        public Loan_Code: string ;
        public CustodyAmount: number ;
        public LoanAmount: number ;
        public SalaryAmount: number ;
        public IDExcel: number ;
        public NameFamliyZone: string ;
        public NameZone: string ;
        public USER_CODE: string ;
        public ID: number ;
        public USER_PASSWORD: string ;
        public DescEmpType: string ;
        public IsUser: boolean ;
        public EmpRole: number ;
        public PayLoan_Cust_Code: string ;
        public ACC_CODE: string ;
        public Password_Login: string ;
        public User_Login: string ;
        public StatusFlag: string;


 }

 class IQ_G_Log_Device extends CustomClass { 
constructor() {
super();
        this.ID= 0;
        this.ID_Device= '';
        this.Language= '';
        this.DeviceType= '';
        this.NameBrowser= '';
        this.LastDateUpdate= '';
        this.USERID= null;
        this.CompCode= 0;
        this.BranchCode= 0;
        this.FIN_YEAR= 0;
        this.USER_CODE= '';
        this.Password= '';
        this.ISActive= false;
        this.Last_Page= '';
        this.Last_Page1= '';
        this.Last_Page2= '';
        this.Last_Page3= '';
        this.IsNotAuto= false;
        this.StatusFlag = '';
 }
        public ID: number ;
        public ID_Device: string ;
        public Language: string ;
        public DeviceType: string ;
        public NameBrowser: string ;
        public LastDateUpdate: string ;
        public USERID: any ;
        public CompCode: number ;
        public BranchCode: number ;
        public FIN_YEAR: number ;
        public USER_CODE: string ;
        public Password: string ;
        public ISActive: boolean ;
        public Last_Page: string ;
        public Last_Page1: string ;
        public Last_Page2: string ;
        public Last_Page3: string ;
        public IsNotAuto: boolean ;
        public StatusFlag: string;


 }

 class IQ_G_RoleModule extends CustomClass { 
constructor() {
super();
        this.CompCode= 0;
        this.StatusCompany= 0;
        this.FIN_YEAR= 0;
        this.RoleId= 0;
        this.MODULE_CODE= '';
        this.MODULE_MENU= '';
        this.MODULE_DESCE= '';
        this.MODULE_DESCA= '';
        this.Url_Image= '';
        this.MODULE_TYPE= null;
        this.MODULE_SORT= 0;
        this.IS_Show= 0;
        this.EXECUTE= false;
        this.CREATE= false;
        this.EDIT= false;
        this.DELETE= false;
        this.PRINT= false;
        this.VIEW= false;
        this.CUSTOM1= false;
        this.CUSTOM2= false;
        this.CUSTOM3= false;
        this.CUSTOM4= false;
        this.CUSTOM5= false;
        this.CUSTOM6= false;
        this.CUSTOM7= false;
        this.CUSTOM8= false;
        this.CUSTOM9= false;
        this.IsArchive= false;
        this.Prc_Preference= 0;
        this.StatusFlag = '';
 }
        public CompCode: number ;
        public StatusCompany: number ;
        public FIN_YEAR: number ;
        public RoleId: number ;
        public MODULE_CODE: string ;
        public MODULE_MENU: string ;
        public MODULE_DESCE: string ;
        public MODULE_DESCA: string ;
        public Url_Image: string ;
        public MODULE_TYPE: any ;
        public MODULE_SORT: number ;
        public IS_Show: number ;
        public EXECUTE: boolean ;
        public CREATE: boolean ;
        public EDIT: boolean ;
        public DELETE: boolean ;
        public PRINT: boolean ;
        public VIEW: boolean ;
        public CUSTOM1: boolean ;
        public CUSTOM2: boolean ;
        public CUSTOM3: boolean ;
        public CUSTOM4: boolean ;
        public CUSTOM5: boolean ;
        public CUSTOM6: boolean ;
        public CUSTOM7: boolean ;
        public CUSTOM8: boolean ;
        public CUSTOM9: boolean ;
        public IsArchive: boolean ;
        public Prc_Preference: number ;
        public StatusFlag: string;


 }

 class IQ_G_RoleUsersAllDataComp extends CustomClass { 
constructor() {
super();
        this.IDUser= 0;
        this.RoleId= 0;
        this.RoleIds= '';
        this.RoleDescA= '';
        this.RoleDescE= '';
        this.NameUser= '';
        this.CompCode= 0;
        this.CompNameA= '';
        this.CompNameE= '';
        this.EmpID= null;
        this.EmpCode= '';
        this.USER_CODE= '';
        this.USER_PASSWORD= '';
        this.Email= '';
        this.USER_PASSWORD2= '';
        this.USER_ACTIVE= false;
        this.Status= 0;
        this.DepartmentName= '';
        this.JobTitle= '';
        this.USER_TYPE= 0;
        this.CHANGE_PASS_DATE= '';
        this.LastLogin= '';
        this.FirstLogin= '';
        this.CreatedAt= '';
        this.UpdatedAt= '';
        this.CreatedBy= '';
        this.UpdatedBy= '';
        this.Profile_Img= '';
        this.Tokenid= '';
        this.IDExcel= 0;
        this.IsAutoLogin= false;
        this.StatusFlag = '';
 }
        public IDUser: number ;
        public RoleId: number ;
        public RoleIds: string ;
        public RoleDescA: string ;
        public RoleDescE: string ;
        public NameUser: string ;
        public CompCode: number ;
        public CompNameA: string ;
        public CompNameE: string ;
        public EmpID: any ;
        public EmpCode: string ;
        public USER_CODE: string ;
        public USER_PASSWORD: string ;
        public Email: string ;
        public USER_PASSWORD2: string ;
        public USER_ACTIVE: boolean ;
        public Status: number ;
        public DepartmentName: string ;
        public JobTitle: string ;
        public USER_TYPE: number ;
        public CHANGE_PASS_DATE: string ;
        public LastLogin: string ;
        public FirstLogin: string ;
        public CreatedAt: string ;
        public UpdatedAt: string ;
        public CreatedBy: string ;
        public UpdatedBy: string ;
        public Profile_Img: string ;
        public Tokenid: string ;
        public IDExcel: number ;
        public IsAutoLogin: boolean ;
        public StatusFlag: string;


 }

 class IQ_G_RoleUsersComp extends CustomClass { 
constructor() {
super();
        this.IDUser= 0;
        this.RoleId= 0;
        this.RoleIds= '';
        this.RoleDescA= '';
        this.RoleDescE= '';
        this.CompNameA= '';
        this.CompNameE= '';
        this.EmpID= null;
        this.USER_CODE= '';
        this.USER_PASSWORD= '';
        this.Email= '';
        this.IsAutoLogin= false;
        this.NameUser= '';
        this.CompCode= 0;
        this.EmpCode= '';
        this.StatusFlag = '';
 }
        public IDUser: number ;
        public RoleId: number ;
        public RoleIds: string ;
        public RoleDescA: string ;
        public RoleDescE: string ;
        public CompNameA: string ;
        public CompNameE: string ;
        public EmpID: any ;
        public USER_CODE: string ;
        public USER_PASSWORD: string ;
        public Email: string ;
        public IsAutoLogin: boolean ;
        public NameUser: string ;
        public CompCode: number ;
        public EmpCode: string ;
        public StatusFlag: string;


 }

 class IQ_G_TypeEmployeesByUsing extends CustomClass { 
constructor() {
super();
        this.CompCode= 0;
        this.DescA= '';
        this.DescE= '';
        this.EmpType= 0;
        this.IDTypeEmp= 0;
        this.ISActive= false;
        this.Remark= '';
        this.EmpID= 0;
        this.StatusFlag = '';
 }
        public CompCode: number ;
        public DescA: string ;
        public DescE: string ;
        public EmpType: number ;
        public IDTypeEmp: number ;
        public ISActive: boolean ;
        public Remark: string ;
        public EmpID: number ;
        public StatusFlag: string;


 }

 class IQ_GetItemInfo extends CustomClass { 
constructor() {
super();
        this.ItemID= 0;
        this.CompCode= 0;
        this.ItemCode= '';
        this.ItemName= '';
        this.ItemUnitID= 0;
        this.UnitID= 0;
        this.UnitCode= '';
        this.UnitDescA= '';
        this.ItemFamilyID= 0;
        this.FamilyCode= '';
        this.FamilyDescA= '';
        this.CatID= 0;
        this.CatCode= '';
        this.CatDescA= '';
        this.ISActive= false;
        this.Remarks= '';
        this.TypeUsing= 0;
        this.Rate= 0;
        this.UnitPrice= 0;
        this.Quantity= 0;
        this.OneHandQuantity= 0;
        this.CostPrice= 0;
        this.QRCode= '';
        this.backgroundColor= '';
        this.FontColor= '';
        this.IsService= false;
        this.ItemTaxID= 0;
        this.Image= '';
        this.StatusFlag = '';
 }
        public ItemID: number ;
        public CompCode: number ;
        public ItemCode: string ;
        public ItemName: string ;
        public ItemUnitID: number ;
        public UnitID: number ;
        public UnitCode: string ;
        public UnitDescA: string ;
        public ItemFamilyID: number ;
        public FamilyCode: string ;
        public FamilyDescA: string ;
        public CatID: number ;
        public CatCode: string ;
        public CatDescA: string ;
        public ISActive: boolean ;
        public Remarks: string ;
        public TypeUsing: number ;
        public Rate: number ;
        public UnitPrice: number ;
        public Quantity: number ;
        public OneHandQuantity: number ;
        public CostPrice: number ;
        public QRCode: string ;
        public backgroundColor: string ;
        public FontColor: string ;
        public IsService: boolean ;
        public ItemTaxID: number ;
        public Image: string ;
        public StatusFlag: string;


 }

 class IQ_I_Control extends CustomClass { 
constructor() {
super();
        this.CompCode= 0;
        this.Comp_ACC_CODE= '';
        this.ACC_CODE_Create_User= '';
        this.StartAccCode_User= '';
        this.DefSlsVatType= 0;
        this.DefPurVatType= 0;
        this.IsVat= false;
        this.MobileLength= 0;
        this.IDLength= 0;
        this.SendSMS= false;
        this.SendPublicSMS= false;
        this.NotePeriodinSec= 0;
        this.DashBoardPeriodinSec= 0;
        this.MaxYearlyMSGs= 0;
        this.UsedMSGs= 0;
        this.UserTimeZoneUTCDiff= 0;
        this.ServerTimeZoneUTCDiff= 0;
        this.SaudiNationID= 0;
        this.WebCustomerWebsite= false;
        this.MembeshiptStartDate= '';
        this.MembeshipEndDate= '';
        this.MembershipAllanceDays= 0;
        this.MembershipreadOnlyDays= 0;
        this.IsFreePurchaseReturn= false;
        this.IsFreeSalesReturn= false;
        this.ExceedMinPricePassword= '';
        this.CurNameA= '';
        this.CurNameE= '';
        this.CurSmallNameA= '';
        this.CurSmallNameE= '';
        this.IsLocalBranchCustomer= false;
        this.SysTimeOut= 0;
        this.NationalityID= 0;
        this.Currencyid= 0;
        this.DocPDFFolder= '';
        this.TemplateExcelFolder= '';
        this.Start_Loan_Custody= '';
        this.ACC_CODE_Custody= '';
        this.ACC_CODE_Loan= '';
        this.EGTax_ClientIDProd= '';
        this.EGTax_SecretIDProd= '';
        this.TaxLinkedEG= false;
        this.TaxLinked= false;
        this.TaxUnitID= 0;
        this.IS_POS= false;
        this.Is_Restaurant= false;
        this.ISWork_Type_Items= 0;
        this.Is_ShowPrice= false;
        this.Is_JobOrder= false;
        this.Is_CarCenter= false;
        this.TechRepType= 0;
        this.Quickly_INV= 0;
        this.AutoCode= false;
        this.previousUUID= '';
        this.StatusRemark= '';
        this.StatusOpen= 0;
        this.IsArchive= false;
        this.StatusFlag = '';
 }
        public CompCode: number ;
        public Comp_ACC_CODE: string ;
        public ACC_CODE_Create_User: string ;
        public StartAccCode_User: string ;
        public DefSlsVatType: number ;
        public DefPurVatType: number ;
        public IsVat: boolean ;
        public MobileLength: number ;
        public IDLength: number ;
        public SendSMS: boolean ;
        public SendPublicSMS: boolean ;
        public NotePeriodinSec: number ;
        public DashBoardPeriodinSec: number ;
        public MaxYearlyMSGs: number ;
        public UsedMSGs: number ;
        public UserTimeZoneUTCDiff: number ;
        public ServerTimeZoneUTCDiff: number ;
        public SaudiNationID: number ;
        public WebCustomerWebsite: boolean ;
        public MembeshiptStartDate: string ;
        public MembeshipEndDate: string ;
        public MembershipAllanceDays: number ;
        public MembershipreadOnlyDays: number ;
        public IsFreePurchaseReturn: boolean ;
        public IsFreeSalesReturn: boolean ;
        public ExceedMinPricePassword: string ;
        public CurNameA: string ;
        public CurNameE: string ;
        public CurSmallNameA: string ;
        public CurSmallNameE: string ;
        public IsLocalBranchCustomer: boolean ;
        public SysTimeOut: number ;
        public NationalityID: number ;
        public Currencyid: number ;
        public DocPDFFolder: string ;
        public TemplateExcelFolder: string ;
        public Start_Loan_Custody: string ;
        public ACC_CODE_Custody: string ;
        public ACC_CODE_Loan: string ;
        public EGTax_ClientIDProd: string ;
        public EGTax_SecretIDProd: string ;
        public TaxLinkedEG: boolean ;
        public TaxLinked: boolean ;
        public TaxUnitID: number ;
        public IS_POS: boolean ;
        public Is_Restaurant: boolean ;
        public ISWork_Type_Items: number ;
        public Is_ShowPrice: boolean ;
        public Is_JobOrder: boolean ;
        public Is_CarCenter: boolean ;
        public TechRepType: number ;
        public Quickly_INV: number ;
        public AutoCode: boolean ;
        public previousUUID: string ;
        public StatusRemark: string ;
        public StatusOpen: number ;
        public IsArchive: boolean ;
        public StatusFlag: string;


 }

 class IQ_ItemQtyHanging extends CustomClass { 
constructor() {
super();
        this.ItemID= 0;
        this.TransID= 0;
        this.HangingQty= 0;
        this.compcode= 0;
        this.TrType= 0;
        this.TrNo= 0;
        this.SaleDate= '';
        this.Type= '';
        this.StatusFlag = '';
 }
        public ItemID: number ;
        public TransID: number ;
        public HangingQty: number ;
        public compcode: number ;
        public TrType: number ;
        public TrNo: number ;
        public SaleDate: string ;
        public Type: string ;
        public StatusFlag: string;


 }

 class IQ_ItemUnites extends CustomClass { 
constructor() {
super();
        this.ItemUnitID= 0;
        this.ItemID= 0;
        this.UnitID= 0;
        this.Remarks= '';
        this.DescA= '';
        this.UnitCode= '';
        this.Rate= 0;
        this.Quantity= 0;
        this.UnitPrice= 0;
        this.CostPrice= 0;
        this.CompCode= 0;
        this.ISActive= false;
        this.QRCode= '';
        this.backgroundColor= '';
        this.FontColor= '';
        this.TypeUsing= 0;
        this.IsService= false;
        this.Image= '';
        this.StatusFlag = '';
 }
        public ItemUnitID: number ;
        public ItemID: number ;
        public UnitID: number ;
        public Remarks: string ;
        public DescA: string ;
        public UnitCode: string ;
        public Rate: number ;
        public Quantity: number ;
        public UnitPrice: number ;
        public CostPrice: number ;
        public CompCode: number ;
        public ISActive: boolean ;
        public QRCode: string ;
        public backgroundColor: string ;
        public FontColor: string ;
        public TypeUsing: number ;
        public IsService: boolean ;
        public Image: string ;
        public StatusFlag: string;


 }

 class IQ_KSATaxInvHeader extends CustomClass { 
constructor() {
super();
        this.CompCode= 0;
        this.InvoiceID= 0;
        this.TrNo= 0;
        this.TrDate= '';
        this.TrTime= '';
        this.invoiceStatus= 0;
        this.InvoiceTypeCode= 0;
        this.InvoiceTransCode= 0;
        this.TaxStatus= 0;
        this.DocUUID= '';
        this.DocNo= '';
        this.GlobalInvoiceCounter= 0;
        this.PrevInvoiceHash= '';
        this.RefNO= '';
        this.InstructionNote= '';
        this.QRCode= '';
        this.SalesOrderRef= '';
        this.SalesOrderDescr= '';
        this.DeliverydateFrom= '';
        this.DeliverydateTo= '';
        this.PaymentMeanCode= 0;
        this.purchaseorderDesc= '';
        this.perofrmainvoiceno= '';
        this.Cus_Name= '';
        this.Cus_VatNo= '';
        this.Cus_BuildingNumber= '';
        this.Cus_CityName= '';
        this.Cus_PostalZone= '';
        this.Cus_StreetName= '';
        this.Cus_governate= '';
        this.Address_District= '';
        this.Address_Build_Additional= '';
        this.Address_Str_Additional= '';
        this.ISPersonal= false;
        this.AdvDedAmount= 0;
        this.AdvDedVat= 0;
        this.AdvDedVatPrc= 0;
        this.AdvDedVatNat= '';
        this.AdvDedReason= '';
        this.AdvDedReasonCode= '';
        this.HDDiscAmount= 0;
        this.HDDiscVat= 0;
        this.HDDiscVatPrc= 0;
        this.HDDiscVatNat= '';
        this.HDDiscReason= '';
        this.HDDiscReasonCode= '';
        this.AllowAmount= 0;
        this.AllowVat= 0;
        this.AllowVatPrc= 0;
        this.AllowVatNat= '';
        this.AllowReason= '';
        this.AllowReasonCode= '';
        this.hd_NetAmount= 0;
        this.Hd_TaxableAmount= 0;
        this.Hd_NetWithTax= 0;
        this.Hd_NetAdditions= 0;
        this.Hd_NetDeduction= 0;
        this.Hd_PaidAmount= 0;
        this.Hd_DueAmount= 0;
        this.Hd_NetTax= 0;
        this.hd_netTaxCaluated= 0;
        this.HD_Round= 0;
        this.StatusFlag = '';
 }
        public CompCode: number ;
        public InvoiceID: number ;
        public TrNo: number ;
        public TrDate: string ;
        public TrTime: string ;
        public invoiceStatus: number ;
        public InvoiceTypeCode: number ;
        public InvoiceTransCode: number ;
        public TaxStatus: number ;
        public DocUUID: string ;
        public DocNo: string ;
        public GlobalInvoiceCounter: number ;
        public PrevInvoiceHash: string ;
        public RefNO: string ;
        public InstructionNote: string ;
        public QRCode: string ;
        public SalesOrderRef: string ;
        public SalesOrderDescr: string ;
        public DeliverydateFrom: string ;
        public DeliverydateTo: string ;
        public PaymentMeanCode: number ;
        public purchaseorderDesc: string ;
        public perofrmainvoiceno: string ;
        public Cus_Name: string ;
        public Cus_VatNo: string ;
        public Cus_BuildingNumber: string ;
        public Cus_CityName: string ;
        public Cus_PostalZone: string ;
        public Cus_StreetName: string ;
        public Cus_governate: string ;
        public Address_District: string ;
        public Address_Build_Additional: string ;
        public Address_Str_Additional: string ;
        public ISPersonal: boolean ;
        public AdvDedAmount: number ;
        public AdvDedVat: number ;
        public AdvDedVatPrc: number ;
        public AdvDedVatNat: string ;
        public AdvDedReason: string ;
        public AdvDedReasonCode: string ;
        public HDDiscAmount: number ;
        public HDDiscVat: number ;
        public HDDiscVatPrc: number ;
        public HDDiscVatNat: string ;
        public HDDiscReason: string ;
        public HDDiscReasonCode: string ;
        public AllowAmount: number ;
        public AllowVat: number ;
        public AllowVatPrc: number ;
        public AllowVatNat: string ;
        public AllowReason: string ;
        public AllowReasonCode: string ;
        public hd_NetAmount: number ;
        public Hd_TaxableAmount: number ;
        public Hd_NetWithTax: number ;
        public Hd_NetAdditions: number ;
        public Hd_NetDeduction: number ;
        public Hd_PaidAmount: number ;
        public Hd_DueAmount: number ;
        public Hd_NetTax: number ;
        public hd_netTaxCaluated: number ;
        public HD_Round: number ;
        public StatusFlag: string;


 }

 class IQ_KSATaxInvItems extends CustomClass { 
constructor() {
super();
        this.TaxInvoiceID= 0;
        this.TaxInvoiceDetailID= 0;
        this.TaxItemSerial= null;
        this.TaxItemCode= 0;
        this.TaxItemDescr= '';
        this.TaxItemUnit= '';
        this.TaxItemQty= 0;
        this.TaxItemTotal= 0;
        this.TaxItemUnitPrice= 0;
        this.TaxItemNetTotal= 0;
        this.TaxItemDiscPrc= 0;
        this.TaxItemDiscAmt= 0;
        this.TaxItemVatPrc= 0;
        this.TaxItemVatAmt= 0;
        this.VatNatureCode= '';
        this.StatusFlag = '';
 }
        public TaxInvoiceID: number ;
        public TaxInvoiceDetailID: number ;
        public TaxItemSerial: any ;
        public TaxItemCode: number ;
        public TaxItemDescr: string ;
        public TaxItemUnit: string ;
        public TaxItemQty: number ;
        public TaxItemTotal: number ;
        public TaxItemUnitPrice: number ;
        public TaxItemNetTotal: number ;
        public TaxItemDiscPrc: number ;
        public TaxItemDiscAmt: number ;
        public TaxItemVatPrc: number ;
        public TaxItemVatAmt: number ;
        public VatNatureCode: string ;
        public StatusFlag: string;


 }

 class IQ_TR_FinancialTransactions extends CustomClass { 
constructor() {
super();
        this.TransactionID= 0;
        this.TrNo= 0;
        this.RefNo= '';
        this.TransactionDate= '';
        this.CompCode= 0;
        this.TrType= 0;
        this.IsCash= false;
        this.Type= 0;
        this.CashTypeID= 0;
        this.Prc_CashType= 0;
        this.Reason= '';
        this.BeneficiaryName= '';
        this.Amount= 0;
        this.DueAmount= 0;
        this.Status= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.PurchaseID= 0;
        this.TrNo_Ref= 0;
        this.IDPeriod= '';
        this.DescAr= '';
        this.DescEn= '';
        this.FinType= 0;
        this.IDExcel= 0;
        this.LoanPayAmount= 0;
        this.CustodyPayAmount= 0;
        this.ChargePrc= 0;
        this.StatusFlag = '';
 }
        public TransactionID: number ;
        public TrNo: number ;
        public RefNo: string ;
        public TransactionDate: string ;
        public CompCode: number ;
        public TrType: number ;
        public IsCash: boolean ;
        public Type: number ;
        public CashTypeID: number ;
        public Prc_CashType: number ;
        public Reason: string ;
        public BeneficiaryName: string ;
        public Amount: number ;
        public DueAmount: number ;
        public Status: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public PurchaseID: number ;
        public TrNo_Ref: number ;
        public IDPeriod: string ;
        public DescAr: string ;
        public DescEn: string ;
        public FinType: number ;
        public IDExcel: number ;
        public LoanPayAmount: number ;
        public CustodyPayAmount: number ;
        public ChargePrc: number ;
        public StatusFlag: string;


 }

 class IQ_TR_FinancialTransactionsPateners extends CustomClass { 
constructor() {
super();
        this.TransactionID= 0;
        this.TrNo= 0;
        this.RefNo= '';
        this.TransactionDate= '';
        this.CompCode= 0;
        this.TrType= 0;
        this.IsCash= false;
        this.Type= 0;
        this.CashTypeID= 0;
        this.Prc_CashType= 0;
        this.Reason= '';
        this.BeneficiaryName= '';
        this.Amount= 0;
        this.DueAmount= 0;
        this.Status= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.PurchaseID= 0;
        this.TrNo_Ref= 0;
        this.IDPeriod= '';
        this.DescAr= '';
        this.DescEn= '';
        this.FinType= 0;
        this.IDExcel= 0;
        this.LoanPayAmount= 0;
        this.CustodyPayAmount= 0;
        this.StatusFlag = '';
 }
        public TransactionID: number ;
        public TrNo: number ;
        public RefNo: string ;
        public TransactionDate: string ;
        public CompCode: number ;
        public TrType: number ;
        public IsCash: boolean ;
        public Type: number ;
        public CashTypeID: number ;
        public Prc_CashType: number ;
        public Reason: string ;
        public BeneficiaryName: string ;
        public Amount: number ;
        public DueAmount: number ;
        public Status: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public PurchaseID: number ;
        public TrNo_Ref: number ;
        public IDPeriod: string ;
        public DescAr: string ;
        public DescEn: string ;
        public FinType: number ;
        public IDExcel: number ;
        public LoanPayAmount: number ;
        public CustodyPayAmount: number ;
        public StatusFlag: string;


 }

 class IQ_TR_Link_FinancialTransactions_Inv extends CustomClass { 
constructor() {
super();
        this.TransactionID= 0;
        this.TrNo= 0;
        this.RefNo= '';
        this.TransactionDate= '';
        this.CompCode= 0;
        this.TrType= 0;
        this.IsCash= false;
        this.Type= 0;
        this.CashTypeID= 0;
        this.Prc_CashType= 0;
        this.Reason= '';
        this.BeneficiaryName= '';
        this.Amount= 0;
        this.DueAmount= 0;
        this.Status= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.TrNo_Ref= 0;
        this.IDPeriod= '';
        this.DescAr= '';
        this.DescEn= '';
        this.FinType= 0;
        this.IDExcel= 0;
        this.LoanPayAmount= 0;
        this.CustodyPayAmount= 0;
        this.CustomerID= 0;
        this.StatusFlag = '';
 }
        public TransactionID: number ;
        public TrNo: number ;
        public RefNo: string ;
        public TransactionDate: string ;
        public CompCode: number ;
        public TrType: number ;
        public IsCash: boolean ;
        public Type: number ;
        public CashTypeID: number ;
        public Prc_CashType: number ;
        public Reason: string ;
        public BeneficiaryName: string ;
        public Amount: number ;
        public DueAmount: number ;
        public Status: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public TrNo_Ref: number ;
        public IDPeriod: string ;
        public DescAr: string ;
        public DescEn: string ;
        public FinType: number ;
        public IDExcel: number ;
        public LoanPayAmount: number ;
        public CustodyPayAmount: number ;
        public CustomerID: number ;
        public StatusFlag: string;


 }

 class IQ_TR_Link_FinancialTransactions_Pur extends CustomClass { 
constructor() {
super();
        this.TransactionID= 0;
        this.TrNo= 0;
        this.RefNo= '';
        this.TransactionDate= '';
        this.CompCode= 0;
        this.TrType= 0;
        this.IsCash= false;
        this.Type= 0;
        this.CashTypeID= 0;
        this.Prc_CashType= 0;
        this.Reason= '';
        this.BeneficiaryName= '';
        this.Amount= 0;
        this.DueAmount= 0;
        this.Status= 0;
        this.Remarks= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.TrNo_Ref= 0;
        this.IDPeriod= '';
        this.DescAr= '';
        this.DescEn= '';
        this.FinType= 0;
        this.IDExcel= 0;
        this.LoanPayAmount= 0;
        this.CustodyPayAmount= 0;
        this.PurchaseID= 0;
        this.SupplierID= 0;
        this.StatusFlag = '';
 }
        public TransactionID: number ;
        public TrNo: number ;
        public RefNo: string ;
        public TransactionDate: string ;
        public CompCode: number ;
        public TrType: number ;
        public IsCash: boolean ;
        public Type: number ;
        public CashTypeID: number ;
        public Prc_CashType: number ;
        public Reason: string ;
        public BeneficiaryName: string ;
        public Amount: number ;
        public DueAmount: number ;
        public Status: number ;
        public Remarks: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public TrNo_Ref: number ;
        public IDPeriod: string ;
        public DescAr: string ;
        public DescEn: string ;
        public FinType: number ;
        public IDExcel: number ;
        public LoanPayAmount: number ;
        public CustodyPayAmount: number ;
        public PurchaseID: number ;
        public SupplierID: number ;
        public StatusFlag: string;


 }

 class IQ_TR_PurchaseDetails extends CustomClass { 
constructor() {
super();
        this.PurchaseDetailID= 0;
        this.PurchaseID= 0;
        this.ItemID= 0;
        this.ItemUnitID= 0;
        this.Rate= 0;
        this.VatPrc= 0;
        this.DiscountPrc= 0;
        this.RemainRetQty= 0;
        this.UnitPrice= 0;
        this.VatAmount= 0;
        this.CostPrice= 0;
        this.OneHandQuantity= 0;
        this.Ser= 0;
        this.IsService= false;
        this.ItemCode= '';
        this.ItemName= '';
        this.ItemFamilyID= 0;
        this.VatTypeID= 0;
        this.DiscountAmount= 0;
        this.NetUnitPrice= 0;
        this.ItemTotal= 0;
        this.NetAfterVat= 0;
        this.CatID= 0;
        this.RetQty= 0;
        this.Quantity= 0;
        this.StatusFlag = '';
 }
        public PurchaseDetailID: number ;
        public PurchaseID: number ;
        public ItemID: number ;
        public ItemUnitID: number ;
        public Rate: number ;
        public VatPrc: number ;
        public DiscountPrc: number ;
        public RemainRetQty: number ;
        public UnitPrice: number ;
        public VatAmount: number ;
        public CostPrice: number ;
        public OneHandQuantity: number ;
        public Ser: number ;
        public IsService: boolean ;
        public ItemCode: string ;
        public ItemName: string ;
        public ItemFamilyID: number ;
        public VatTypeID: number ;
        public DiscountAmount: number ;
        public NetUnitPrice: number ;
        public ItemTotal: number ;
        public NetAfterVat: number ;
        public CatID: number ;
        public RetQty: number ;
        public Quantity: number ;
        public StatusFlag: string;


 }

 class IQ_TR_Purchases extends CustomClass { 
constructor() {
super();
        this.PurchaseID= 0;
        this.TrNo= 0;
        this.TrType= 0;
        this.DoNo= '';
        this.ReNo= '';
        this.IsCash= false;
        this.CashType= 0;
        this.CompCode= 0;
        this.TrTime= '';
        this.Status= 0;
        this.SupplierName= '';
        this.Mobile= '';
        this.ItemsTotal= 0;
        this.Discount= 0;
        this.TotalAmount= 0;
        this.VatTypeID= 0;
        this.VatAmount= 0;
        this.ChargePrc= 0;
        this.NetAmount= 0;
        this.RemainAmount= 0;
        this.PaymentAmount= 0;
        this.IsService= false;
        this.SupplierID= 0;
        this.Remarks= '';
        this.VoucherNo= 0;
        this.IsPosted= false;
        this.QRCode= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.InvoiceTransCode= 0;
        this.DocUUID= '';
        this.IDPeriod= '';
        this.DescPayType= '';
        this.RefID= 0;
        this.GlobalNo= 0;
        this.PurOrderID= 0;
        this.PurOrderNo= '';
        this.PurDate= '';
        this.IDExcel= 0;
        this.PaymentType= '';
        this.PaymentTerms= '';
        this.DueAmount= 0;
        this.StatusFlag = '';
 }
        public PurchaseID: number ;
        public TrNo: number ;
        public TrType: number ;
        public DoNo: string ;
        public ReNo: string ;
        public IsCash: boolean ;
        public CashType: number ;
        public CompCode: number ;
        public TrTime: string ;
        public Status: number ;
        public SupplierName: string ;
        public Mobile: string ;
        public ItemsTotal: number ;
        public Discount: number ;
        public TotalAmount: number ;
        public VatTypeID: number ;
        public VatAmount: number ;
        public ChargePrc: number ;
        public NetAmount: number ;
        public RemainAmount: number ;
        public PaymentAmount: number ;
        public IsService: boolean ;
        public SupplierID: number ;
        public Remarks: string ;
        public VoucherNo: number ;
        public IsPosted: boolean ;
        public QRCode: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public InvoiceTransCode: number ;
        public DocUUID: string ;
        public IDPeriod: string ;
        public DescPayType: string ;
        public RefID: number ;
        public GlobalNo: number ;
        public PurOrderID: number ;
        public PurOrderNo: string ;
        public PurDate: string ;
        public IDExcel: number ;
        public PaymentType: string ;
        public PaymentTerms: string ;
        public DueAmount: number ;
        public StatusFlag: string;


 }

 class IQ_TR_SaleDetails extends CustomClass { 
constructor() {
super();
        this.SaleDetailID= 0;
        this.SaleID= 0;
        this.ItemID= 0;
        this.ItemUnitID= 0;
        this.Rate= 0;
        this.VatPrc= 0;
        this.DiscountPrc= 0;
        this.RemainRetQty= 0;
        this.UnitPrice= 0;
        this.VatAmount= 0;
        this.CostPrice= 0;
        this.OneHandQuantity= 0;
        this.Ser= 0;
        this.IsService= false;
        this.ItemCode= '';
        this.ItemName= '';
        this.ItemFamilyID= 0;
        this.VatTypeID= 0;
        this.DiscountAmount= 0;
        this.NetUnitPrice= 0;
        this.ItemTotal= 0;
        this.NetAfterVat= 0;
        this.CatID= 0;
        this.Quantity= 0;
        this.RetQty= 0;
        this.NameItem= '';
        this.StatusFlag = '';
 }
        public SaleDetailID: number ;
        public SaleID: number ;
        public ItemID: number ;
        public ItemUnitID: number ;
        public Rate: number ;
        public VatPrc: number ;
        public DiscountPrc: number ;
        public RemainRetQty: number ;
        public UnitPrice: number ;
        public VatAmount: number ;
        public CostPrice: number ;
        public OneHandQuantity: number ;
        public Ser: number ;
        public IsService: boolean ;
        public ItemCode: string ;
        public ItemName: string ;
        public ItemFamilyID: number ;
        public VatTypeID: number ;
        public DiscountAmount: number ;
        public NetUnitPrice: number ;
        public ItemTotal: number ;
        public NetAfterVat: number ;
        public CatID: number ;
        public Quantity: number ;
        public RetQty: number ;
        public NameItem: string ;
        public StatusFlag: string;


 }

 class IQ_TR_Sales extends CustomClass { 
constructor() {
super();
        this.SaleID= 0;
        this.TrNo= 0;
        this.TrType= 0;
        this.DoNo= '';
        this.ReNo= '';
        this.IsCash= false;
        this.CashType= 0;
        this.SaleDate= '';
        this.CompCode= 0;
        this.TrTime= '';
        this.Status= 0;
        this.CustomerName= '';
        this.Mobile= '';
        this.ItemsTotal= 0;
        this.Discount= 0;
        this.TotalAmount= 0;
        this.VatTypeID= 0;
        this.VatAmount= 0;
        this.ChargePrc= 0;
        this.NetAmount= 0;
        this.RemainAmount= 0;
        this.PaymentAmount= 0;
        this.IsService= false;
        this.CustomerID= 0;
        this.Remarks= '';
        this.VoucherNo= 0;
        this.IsPosted= false;
        this.QRCode= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.InvoiceTransCode= 0;
        this.TaxStatus= 0;
        this.DocUUID= '';
        this.PrevInvoiceHash= '';
        this.IDPeriod= '';
        this.DescPayType= '';
        this.RefID= 0;
        this.GlobalNo= 0;
        this.ShowPriceID= 0;
        this.ShowPriceNo= '';
        this.JobOrderNo= '';
        this.JobOrderID= 0;
        this.DeliveryTime= '';
        this.ExpiryTime= '';
        this.PaymentType= '';
        this.PaymentTerms= '';
        this.AttatchName= '';
        this.SalesManMobile= '';
        this.SalesManName= '';
        this.SalesManID= 0;
        this.Warrantyperiod= '';
        this.CarBrand= '';
        this.CarNo= '';
        this.DestructionKm= '';
        this.EngineerName= '';
        this.DueAmount= 0;
        this.ExternalAmount= 0;
        this.JobRefNO= '';
        this.TaxErrorCode= 0;
        this.IDExcel= 0;
        this.DedTaxAmount= 0;
        this.TaxID= 0;
        this.CurrenyID= 0;
        this.TaxPrc= 0;
        this.Rate_Currency= 0;
        this.InvType= 0;
        this.purchaseorderDesc= '';
        this.purchaseorderCode= '';
        this.ChassisNo= '';
        this.StatusFlag = '';
 }
        public SaleID: number ;
        public TrNo: number ;
        public TrType: number ;
        public DoNo: string ;
        public ReNo: string ;
        public IsCash: boolean ;
        public CashType: number ;
        public SaleDate: string ;
        public CompCode: number ;
        public TrTime: string ;
        public Status: number ;
        public CustomerName: string ;
        public Mobile: string ;
        public ItemsTotal: number ;
        public Discount: number ;
        public TotalAmount: number ;
        public VatTypeID: number ;
        public VatAmount: number ;
        public ChargePrc: number ;
        public NetAmount: number ;
        public RemainAmount: number ;
        public PaymentAmount: number ;
        public IsService: boolean ;
        public CustomerID: number ;
        public Remarks: string ;
        public VoucherNo: number ;
        public IsPosted: boolean ;
        public QRCode: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public InvoiceTransCode: number ;
        public TaxStatus: number ;
        public DocUUID: string ;
        public PrevInvoiceHash: string ;
        public IDPeriod: string ;
        public DescPayType: string ;
        public RefID: number ;
        public GlobalNo: number ;
        public ShowPriceID: number ;
        public ShowPriceNo: string ;
        public JobOrderNo: string ;
        public JobOrderID: number ;
        public DeliveryTime: string ;
        public ExpiryTime: string ;
        public PaymentType: string ;
        public PaymentTerms: string ;
        public AttatchName: string ;
        public SalesManMobile: string ;
        public SalesManName: string ;
        public SalesManID: number ;
        public Warrantyperiod: string ;
        public CarBrand: string ;
        public CarNo: string ;
        public DestructionKm: string ;
        public EngineerName: string ;
        public DueAmount: number ;
        public ExternalAmount: number ;
        public JobRefNO: string ;
        public TaxErrorCode: number ;
        public IDExcel: number ;
        public DedTaxAmount: number ;
        public TaxID: number ;
        public CurrenyID: number ;
        public TaxPrc: number ;
        public Rate_Currency: number ;
        public InvType: number ;
        public purchaseorderDesc: string ;
        public purchaseorderCode: string ;
        public ChassisNo: string ;
        public StatusFlag: string;


 }

 class IQ_View_JobOrder extends CustomClass { 
constructor() {
super();
        this.SaleID= 0;
        this.TrNo= 0;
        this.TrType= 0;
        this.GlobalNo= 0;
        this.DoNo= '';
        this.RefID= 0;
        this.ReNo= '';
        this.IsCash= false;
        this.CashType= 0;
        this.SaleDate= '';
        this.CompCode= 0;
        this.TrTime= '';
        this.Status= 0;
        this.CustomerName= '';
        this.Mobile= '';
        this.SalesManID= 0;
        this.SalesManName= '';
        this.SalesManMobile= '';
        this.AttatchName= '';
        this.ItemsTotal= 0;
        this.Discount= 0;
        this.TotalAmount= 0;
        this.VatTypeID= 0;
        this.VatAmount= 0;
        this.ChargePrc= 0;
        this.NetAmount= 0;
        this.DueAmount= 0;
        this.RemainAmount= 0;
        this.PaymentAmount= 0;
        this.IsService= false;
        this.CustomerID= 0;
        this.Remarks= '';
        this.VoucherNo= 0;
        this.IsPosted= false;
        this.QRCode= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.InvoiceTransCode= 0;
        this.TaxStatus= 0;
        this.DocUUID= '';
        this.PrevInvoiceHash= '';
        this.IDPeriod= '';
        this.PaymentTerms= '';
        this.PaymentType= '';
        this.ExpiryTime= '';
        this.DeliveryTime= '';
        this.TaxErrorCode= 0;
        this.ShowPriceID= 0;
        this.ShowPriceNo= '';
        this.JobOrderID= 0;
        this.JobOrderNo= '';
        this.Warrantyperiod= '';
        this.CarBrand= '';
        this.CarNo= '';
        this.DestructionKm= '';
        this.EngineerName= '';
        this.ChassisNo= '';
        this.StatusFlag = '';
 }
        public SaleID: number ;
        public TrNo: number ;
        public TrType: number ;
        public GlobalNo: number ;
        public DoNo: string ;
        public RefID: number ;
        public ReNo: string ;
        public IsCash: boolean ;
        public CashType: number ;
        public SaleDate: string ;
        public CompCode: number ;
        public TrTime: string ;
        public Status: number ;
        public CustomerName: string ;
        public Mobile: string ;
        public SalesManID: number ;
        public SalesManName: string ;
        public SalesManMobile: string ;
        public AttatchName: string ;
        public ItemsTotal: number ;
        public Discount: number ;
        public TotalAmount: number ;
        public VatTypeID: number ;
        public VatAmount: number ;
        public ChargePrc: number ;
        public NetAmount: number ;
        public DueAmount: number ;
        public RemainAmount: number ;
        public PaymentAmount: number ;
        public IsService: boolean ;
        public CustomerID: number ;
        public Remarks: string ;
        public VoucherNo: number ;
        public IsPosted: boolean ;
        public QRCode: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public InvoiceTransCode: number ;
        public TaxStatus: number ;
        public DocUUID: string ;
        public PrevInvoiceHash: string ;
        public IDPeriod: string ;
        public PaymentTerms: string ;
        public PaymentType: string ;
        public ExpiryTime: string ;
        public DeliveryTime: string ;
        public TaxErrorCode: number ;
        public ShowPriceID: number ;
        public ShowPriceNo: string ;
        public JobOrderID: number ;
        public JobOrderNo: string ;
        public Warrantyperiod: string ;
        public CarBrand: string ;
        public CarNo: string ;
        public DestructionKm: string ;
        public EngineerName: string ;
        public ChassisNo: string ;
        public StatusFlag: string;


 }

 class IQ_View_User_Log extends CustomClass { 
constructor() {
super();
        this.LogID= 0;
        this.UserID= '';
        this.NameUser= '';
        this.RoleDescA= '';
        this.RoleIds= '';
        this.TrType= '';
        this.Mode= '';
        this.Remarks= '';
        this.Date= '';
        this.IsSuccess= false;
        this.ID_Device= '';
        this.DeviceType= '';
        this.NameBrowser= '';
        this.TransID= 0;
        this.CompCode= 0;
        this.CodeRun= '';
        this.StatusFlag = '';
 }
        public LogID: number ;
        public UserID: string ;
        public NameUser: string ;
        public RoleDescA: string ;
        public RoleIds: string ;
        public TrType: string ;
        public Mode: string ;
        public Remarks: string ;
        public Date: string ;
        public IsSuccess: boolean ;
        public ID_Device: string ;
        public DeviceType: string ;
        public NameBrowser: string ;
        public TransID: number ;
        public CompCode: number ;
        public CodeRun: string ;
        public StatusFlag: string;


 }

 class IQ_ViewItems extends CustomClass { 
constructor() {
super();
        this.ItemID= 0;
        this.CompCode= 0;
        this.ItemCode= '';
        this.ItemName= '';
        this.ItemFamilyID= 0;
        this.FamilyCode= '';
        this.FamilyDescA= '';
        this.CatID= 0;
        this.CatCode= '';
        this.CatDescA= '';
        this.ISActive= false;
        this.Remarks= '';
        this.CostPrice= 0;
        this.UnitPrice= 0;
        this.OneHandQuantity= 0;
        this.backgroundColor= '';
        this.FontColor= '';
        this.IsService= false;
        this.QtyOpenBalances= 0;
        this.Quantity= 0;
        this.HangingQty= 0;
        this.NetQty= 0;
        this.ItemTaxID= 0;
        this.ItemCode_EG= '';
        this.NameA_EG= '';
        this.NameE_EG= '';
        this.Image= '';
        this.StatusFlag = '';
 }
        public ItemID: number ;
        public CompCode: number ;
        public ItemCode: string ;
        public ItemName: string ;
        public ItemFamilyID: number ;
        public FamilyCode: string ;
        public FamilyDescA: string ;
        public CatID: number ;
        public CatCode: string ;
        public CatDescA: string ;
        public ISActive: boolean ;
        public Remarks: string ;
        public CostPrice: number ;
        public UnitPrice: number ;
        public OneHandQuantity: number ;
        public backgroundColor: string ;
        public FontColor: string ;
        public IsService: boolean ;
        public QtyOpenBalances: number ;
        public Quantity: number ;
        public HangingQty: number ;
        public NetQty: number ;
        public ItemTaxID: number ;
        public ItemCode_EG: string ;
        public NameA_EG: string ;
        public NameE_EG: string ;
        public Image: string ;
        public StatusFlag: string;


 }

 class PurchaseMasterDetail extends CustomClass { 
constructor() {
super();
        this.PurchaseID= 0;
        this.TrNo= 0;
        this.TrType= 0;
        this.DoNo= '';
        this.ReNo= '';
        this.IsCash= false;
        this.CashType= 0;
        this.CompCode= 0;
        this.TrTime= '';
        this.Status= 0;
        this.SupplierName= '';
        this.Mobile= '';
        this.ItemsTotal= 0;
        this.Discount= 0;
        this.TotalAmount= 0;
        this.VatTypeID= 0;
        this.VatAmount= 0;
        this.ChargePrc= 0;
        this.NetAmount= 0;
        this.RemainAmount= 0;
        this.PaymentAmount= 0;
        this.IsService= false;
        this.SupplierID= 0;
        this.Remarks= '';
        this.VoucherNo= 0;
        this.IsPosted= false;
        this.QRCode= '';
        this.IDUserCreate= 0;
        this.CreatedAt= '';
        this.CreatedBy= '';
        this.UpdatedAt= '';
        this.UpdatedBy= '';
        this.InvoiceTransCode= 0;
        this.DocUUID= '';
        this.IDPeriod= '';
        this.DescPayType= '';
        this.RefID= 0;
        this.GlobalNo= 0;
        this.PurOrderID= 0;
        this.PurOrderNo= '';
        this.PurDate= '';
        this.IDExcel= 0;
        this.PaymentType= '';
        this.PaymentTerms= '';
        this.DueAmount= 0;
        this.ItemIDs= '';
        this.StatusFlag = '';
 }
        public PurchaseID: number ;
        public TrNo: number ;
        public TrType: number ;
        public DoNo: string ;
        public ReNo: string ;
        public IsCash: boolean ;
        public CashType: number ;
        public CompCode: number ;
        public TrTime: string ;
        public Status: number ;
        public SupplierName: string ;
        public Mobile: string ;
        public ItemsTotal: number ;
        public Discount: number ;
        public TotalAmount: number ;
        public VatTypeID: number ;
        public VatAmount: number ;
        public ChargePrc: number ;
        public NetAmount: number ;
        public RemainAmount: number ;
        public PaymentAmount: number ;
        public IsService: boolean ;
        public SupplierID: number ;
        public Remarks: string ;
        public VoucherNo: number ;
        public IsPosted: boolean ;
        public QRCode: string ;
        public IDUserCreate: number ;
        public CreatedAt: string ;
        public CreatedBy: string ;
        public UpdatedAt: string ;
        public UpdatedBy: string ;
        public InvoiceTransCode: number ;
        public DocUUID: string ;
        public IDPeriod: string ;
        public DescPayType: string ;
        public RefID: number ;
        public GlobalNo: number ;
        public PurOrderID: number ;
        public PurOrderNo: string ;
        public PurDate: string ;
        public IDExcel: number ;
        public PaymentType: string ;
        public PaymentTerms: string ;
        public DueAmount: number ;
        public ItemIDs: string ;
        public StatusFlag: string;


 }

 class sysdiagrams extends CustomClass { 
constructor() {
super();
        this.name= '';
        this.principal_id= 0;
        this.diagram_id= 0;
        this.version= 0;
        this.definition= null;
        this.StatusFlag = '';
 }
        public name: string ;
        public principal_id: number ;
        public diagram_id: number ;
        public version: number ;
        public definition: any ;
        public StatusFlag: string;


 }

 class TempCustomer extends CustomClass { 
constructor() {
super();
        this.CustomerId= 0;
        this.CustomerCODE= '';
        this.NAMEA= '';
        this.NAMEE= '';
        this.EMAIL= '';
        this.REMARKS= '';
        this.MOBILE= '';
        this.MOBILE2= '';
        this.AccountNo= '';
        this.CompCode= 0;
        this.CREATED_BY= '';
        this.CREATED_AT= '';
        this.UPDATED_AT= '';
        this.UPDATED_BY= '';
        this.VATType= 0;
        this.VatNo= '';
        this.Isactive= false;
        this.CreditLimit= 0;
        this.CreditPeriod= 0;
        this.Debit= 0;
        this.Credit= 0;
        this.PreviousDebit= 0;
        this.PreviousCredit= 0;
        this.Openbalance= 0;
        this.PaymentType= 0;
        this.IsCreditCustomer= false;
        this.Address_postal= '';
        this.Address_Province= '';
        this.GroupVatNo= '';
        this.Address_Street= '';
        this.Address_Str_Additional= '';
        this.Address_BuildingNo= '';
        this.Address_Build_Additional= '';
        this.Address_City= '';
        this.Address_District= '';
        this.Address_Floor= '';
        this.Address_Room= '';
        this.Address_LandMarks= '';
        this.SalesInvoiceNature= 0;
        this.ISPersonal= false;
        this.OpenbalanceAt= '';
        this.CarBrand= '';
        this.CarNo= '';
        this.DestructionKm= '';
        this.DrivingNum= '';
        this.NationalityID= 0;
        this.IDExcel= 0;
        this.StatusFlag = '';
 }
        public CustomerId: number ;
        public CustomerCODE: string ;
        public NAMEA: string ;
        public NAMEE: string ;
        public EMAIL: string ;
        public REMARKS: string ;
        public MOBILE: string ;
        public MOBILE2: string ;
        public AccountNo: string ;
        public CompCode: number ;
        public CREATED_BY: string ;
        public CREATED_AT: string ;
        public UPDATED_AT: string ;
        public UPDATED_BY: string ;
        public VATType: number ;
        public VatNo: string ;
        public Isactive: boolean ;
        public CreditLimit: number ;
        public CreditPeriod: number ;
        public Debit: number ;
        public Credit: number ;
        public PreviousDebit: number ;
        public PreviousCredit: number ;
        public Openbalance: number ;
        public PaymentType: number ;
        public IsCreditCustomer: boolean ;
        public Address_postal: string ;
        public Address_Province: string ;
        public GroupVatNo: string ;
        public Address_Street: string ;
        public Address_Str_Additional: string ;
        public Address_BuildingNo: string ;
        public Address_Build_Additional: string ;
        public Address_City: string ;
        public Address_District: string ;
        public Address_Floor: string ;
        public Address_Room: string ;
        public Address_LandMarks: string ;
        public SalesInvoiceNature: number ;
        public ISPersonal: boolean ;
        public OpenbalanceAt: string ;
        public CarBrand: string ;
        public CarNo: string ;
        public DestructionKm: string ;
        public DrivingNum: string ;
        public NationalityID: number ;
        public IDExcel: number ;
        public StatusFlag: string;


 }

 class VAT_PERIOD extends CustomClass { 
constructor() {
super();
        this.COMP_CODE= 0;
        this.VAT_YEAR= 0;
        this.PERIOD_CODE= 0;
        this.FROM_DATE= '';
        this.TO_DATE= '';
        this.STATUS= 0;
        this.StatusFlag = '';
 }
        public COMP_CODE: number ;
        public VAT_YEAR: number ;
        public PERIOD_CODE: number ;
        public FROM_DATE: string ;
        public TO_DATE: string ;
        public STATUS: number ;
        public StatusFlag: string;


 }

 class Z_G_Lnk_Build_DetailJournal extends CustomClass { 
constructor() {
super();
        this.ID_Build= 0;
        this.CompCode= 0;
        this.KeyTrans= '';
        this.DescA_FelidLnk= '';
        this.IsOutFelidTable= false;
        this.NameFelidForeignKeyInTable_Lnk= '';
        this.NameOutTableGetData= '';
        this.NamePrimaryKeyOutTable= '';
        this.NameFelidAcc= '';
        this.NameFelidAmount_InTableLnk= '';
        this.IsCredit= false;
        this.NameFelidRemarks= '';
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public ID_Build: number ;
        public CompCode: number ;
        public KeyTrans: string ;
        public DescA_FelidLnk: string ;
        public IsOutFelidTable: boolean ;
        public NameFelidForeignKeyInTable_Lnk: string ;
        public NameOutTableGetData: string ;
        public NamePrimaryKeyOutTable: string ;
        public NameFelidAcc: string ;
        public NameFelidAmount_InTableLnk: string ;
        public IsCredit: boolean ;
        public NameFelidRemarks: string ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

 class Z_G_Lnk_Create_DirectJournal extends CustomClass { 
constructor() {
super();
        this.ID_Lnk= 0;
        this.CompCode= 0;
        this.SerRun= 0;
        this.TransType= '';
        this.KeyTrans= '';
        this.DescA_FelidLnk= '';
        this.NameTableMaster= '';
        this.NameFelidMasterID= '';
        this.NameFelidMasterTrNo= '';
        this.NameFelidCondtionDate= '';
        this.NameFelidCondtionCustom= '';
        this.NameFelidMasterUserID= '';
        this.NameFelidMasterIDExcel= '';
        this.IsAutoDayShift= false;
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public ID_Lnk: number ;
        public CompCode: number ;
        public SerRun: number ;
        public TransType: string ;
        public KeyTrans: string ;
        public DescA_FelidLnk: string ;
        public NameTableMaster: string ;
        public NameFelidMasterID: string ;
        public NameFelidMasterTrNo: string ;
        public NameFelidCondtionDate: string ;
        public NameFelidCondtionCustom: string ;
        public NameFelidMasterUserID: string ;
        public NameFelidMasterIDExcel: string ;
        public IsAutoDayShift: boolean ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

 class Z_G_Lnk_CreateAccount extends CustomClass { 
constructor() {
super();
        this.ID_Lnk= 0;
        this.CompCode= 0;
        this.KeyTrans= '';
        this.DescTrans= '';
        this.StartNameAcc= '';
        this.Father_Acc_Code= '';
        this.Acc_Code= '';
        this.AccPrefix= '';
        this.LastNumber= '';
        this.NameTableMaster= '';
        this.NameFelidMasterID= '';
        this.NameFelidTableCompCode= '';
        this.NameFelidTableNameA= '';
        this.NameFelidTableNameE= '';
        this.NameFelidAcc_Code= '';
        this.NameFelidExpr= '';
        this.IsUpdateCode= false;
        this.NameFelidCode= '';
        this.IsActive= false;
        this.StatusFlag = '';
 }
        public ID_Lnk: number ;
        public CompCode: number ;
        public KeyTrans: string ;
        public DescTrans: string ;
        public StartNameAcc: string ;
        public Father_Acc_Code: string ;
        public Acc_Code: string ;
        public AccPrefix: string ;
        public LastNumber: string ;
        public NameTableMaster: string ;
        public NameFelidMasterID: string ;
        public NameFelidTableCompCode: string ;
        public NameFelidTableNameA: string ;
        public NameFelidTableNameE: string ;
        public NameFelidAcc_Code: string ;
        public NameFelidExpr: string ;
        public IsUpdateCode: boolean ;
        public NameFelidCode: string ;
        public IsActive: boolean ;
        public StatusFlag: string;


 }

