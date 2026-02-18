class A_ACCOUNT extends CustomClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.ACC_CODE = '';
        this.ACC_DESCA = '';
        this.ACC_DESCL = '';
        this.ACC_GROUP = 0;
        this.ACC_TYPE = 0;
        this.ACC_LEVEL = 0;
        this.ACC_ACTIVE = false;
        this.PARENT_ACC = '';
        this.DETAIL = false;
        this.CREATED_BY = '';
        this.CREATED_AT = '';
        this.UPDATED_BY = '';
        this.LAST_UPDATE = '';
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class A_ACCOUNT_YEAR extends CustomClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.ACC_CODE = '';
        this.FIN_YEAR = 0;
        this.ACC_LIMIT = 0;
        this.REMARKS = '';
        this.StatusFlag = '';
    }
}
class A_JOURNAL_DETAIL extends CustomClass {
    constructor() {
        super();
        this.VoucherDetailID = 0;
        this.VoucherID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.ACC_CODE = '';
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.Remarks = '';
        this.CC_CODE = '';
        this.Trans_Type = '';
        this.Trans_ID = 0;
        this.TrDate = '';
        this.Trans_No = 0;
        this.IDUser = 0;
        this.IDExcel = 0;
        this.NumDayShift = 0;
        this.StatusFlag = '';
    }
}
class A_JOURNAL_HEADER extends CustomClass {
    constructor() {
        super();
        this.VoucherID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_DATE = '';
        this.VOUCHER_DESC = '';
        this.VOUCHER_STATUS = 0;
        this.TYPE_CODE = 0;
        this.REF_CODE = '';
        this.CREATED_BY = '';
        this.CREATED_AT = '';
        this.UPDATED_BY = '';
        this.UPDATED_AT = '';
        this.Trans_Type = '';
        this.Trans_ID = 0;
        this.Trans_No = 0;
        this.IDUser = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class A_TR_ReceiptNote extends CustomClass {
    constructor() {
        super();
        this.TransactionID = 0;
        this.TrNo = 0;
        this.RefNo = '';
        this.TransactionDate = '';
        this.CompCode = 0;
        this.TrType = 0;
        this.IsCash = false;
        this.Type = 0;
        this.CashTypeID = 0;
        this.Reason = '';
        this.BeneficiaryName = '';
        this.Amount = 0;
        this.DueAmount = 0;
        this.Status = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.IDPeriod = '';
        this.From_ACC_CODE = '';
        this.To_ACC_CODE = '';
        this.From_Acc_IsCredit = false;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class AQ_A_Account extends CustomClass {
    constructor() {
        super();
        this.Comp_Code = 0;
        this.ACC_CODE = '';
        this.ACC_DESCA = '';
        this.ACC_DESCL = '';
        this.Total_DEBIT = 0;
        this.Total_CREDIT = 0;
        this.Total_Balance = 0;
        this.PARENT_ACC = '';
        this.ACC_LEVEL = 0;
        this.DETAIL = false;
        this.ACC_ACTIVE = false;
        this.ACC_TYPE = 0;
        this.ACC_GROUP = 0;
        this.CREATED_BY = '';
        this.CREATED_AT = '';
        this.UPDATED_BY = '';
        this.LAST_UPDATE = '';
        this.FIN_YEAR = 0;
        this.ACC_LIMIT = 0;
        this.REMARKS = '';
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class AQ_JOURNAL_DETAIL extends CustomClass {
    constructor() {
        super();
        this.VoucherDetailID = 0;
        this.VoucherID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.Serial = null;
        this.ACC_CODE = '';
        this.ACC_DESCA = '';
        this.ACC_DESCL = '';
        this.DEBIT = 0;
        this.CREDIT = 0;
        this.Remarks = '';
        this.CC_CODE = '';
        this.Trans_Type = '';
        this.Trans_ID = 0;
        this.TrDate = '';
        this.Trans_No = 0;
        this.IDUser = 0;
        this.IDExcel = 0;
        this.NumDayShift = 0;
        this.KeyTrans = '';
        this.StatusFlag = '';
    }
}
class AQ_JOURNAL_HEADER extends CustomClass {
    constructor() {
        super();
        this.VoucherID = 0;
        this.COMP_CODE = 0;
        this.VOUCHER_CODE = 0;
        this.VOUCHER_DATE = '';
        this.VOUCHER_DESC = '';
        this.VOUCHER_STATUS = 0;
        this.TYPE_CODE = 0;
        this.REF_CODE = '';
        this.CREATED_BY = '';
        this.CREATED_AT = '';
        this.UPDATED_BY = '';
        this.UPDATED_AT = '';
        this.Trans_Type = '';
        this.TotalDebit = 0;
        this.TotalCredit = 0;
        this.NetDifference = 0;
        this.Trans_ID = 0;
        this.Trans_No = 0;
        this.IDUser = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class CheckTransactionsUnPosted extends CustomClass {
    constructor() {
        super();
        this.Description = '';
        this.KeyTrans = '';
        this.COMP_CODE = 0;
        this.FinYear = 0;
        this.TransID = 0;
        this.TrNo = 0;
        this.TrDate = '';
        this.Amount = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.StatusFlag = '';
    }
}
class D_A_CashTypes extends CustomClass {
    constructor() {
        super();
        this.CashTypeID = 0;
        this.Ser = 0;
        this.Description = '';
        this.CompCode = 0;
        this.ChargePrc = 0;
        this.CashAccCode = '';
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
class D_A_FinancialType extends CustomClass {
    constructor() {
        super();
        this.FinancialTypeID = 0;
        this.CompCode = 0;
        this.TrType = 0;
        this.DescAr = '';
        this.DescEn = '';
        this.IsActive = false;
        this.SearchTypes = 0;
        this.StatusFlag = '';
    }
}
class D_A_Suppliers extends CustomClass {
    constructor() {
        super();
        this.SupplierID = 0;
        this.SuppliersCode = '';
        this.CompCode = 0;
        this.SupplierName = '';
        this.AccountNo = '';
        this.IsCash = false;
        this.Mobile = '';
        this.Debit = 0;
        this.Credit = 0;
        this.Balance = 0;
        this.PreviousDebit = 0;
        this.PreviousCredit = 0;
        this.OpenBalanceAt = '';
        this.Info = '';
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.ISActive = false;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class D_A_VatType extends CustomClass {
    constructor() {
        super();
        this.VatTypeID = 0;
        this.CompCode = 0;
        this.Describtion = '';
        this.Type = 0;
        this.VatPrc = 0;
        this.LineOrder = 0;
        this.VatNatureCode = '';
        this.VatNatureDescA = '';
        this.VatNatureDescE = '';
        this.VatTypeEG = '';
        this.VatSubTypeEG = '';
        this.StatusFlag = '';
    }
}
class D_Customer extends CustomClass {
    constructor() {
        super();
        this.CustomerId = 0;
        this.CustomerCODE = '';
        this.NAMEA = '';
        this.NAMEE = '';
        this.EMAIL = '';
        this.REMARKS = '';
        this.MOBILE = '';
        this.MOBILE2 = '';
        this.AccountNo = '';
        this.CompCode = 0;
        this.CREATED_BY = '';
        this.CREATED_AT = '';
        this.UPDATED_AT = '';
        this.UPDATED_BY = '';
        this.VATType = 0;
        this.VatNo = '';
        this.Isactive = false;
        this.CreditLimit = 0;
        this.CreditPeriod = 0;
        this.Debit = 0;
        this.Credit = 0;
        this.PreviousDebit = 0;
        this.PreviousCredit = 0;
        this.Openbalance = 0;
        this.PaymentType = 0;
        this.IsCreditCustomer = false;
        this.Address_postal = '';
        this.Address_Province = '';
        this.GroupVatNo = '';
        this.Address_Street = '';
        this.Address_Str_Additional = '';
        this.Address_BuildingNo = '';
        this.Address_Build_Additional = '';
        this.Address_City = '';
        this.Address_District = '';
        this.Address_Floor = '';
        this.Address_Room = '';
        this.Address_LandMarks = '';
        this.SalesInvoiceNature = 0;
        this.ISPersonal = false;
        this.OpenbalanceAt = '';
        this.CarBrand = '';
        this.CarNo = '';
        this.DestructionKm = '';
        this.DrivingNum = '';
        this.NationalityID = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class D_G_Currency extends CustomClass {
    constructor() {
        super();
        this.CurrencyID = 0;
        this.CurrencyCode = '';
        this.DescA = '';
        this.DescL = '';
        this.Remarks = '';
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
class D_G_FamilyZone extends CustomClass {
    constructor() {
        super();
        this.FamilyZoneID = 0;
        this.CompCode = 0;
        this.ZoneCode = '';
        this.DescA = '';
        this.Active = false;
        this.Remarks = '';
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class D_G_Nationality extends CustomClass {
    constructor() {
        super();
        this.NationalityID = 0;
        this.NationalityCode = '';
        this.DescA = '';
        this.DescL = '';
        this.Remarks = '';
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
class D_G_Store extends CustomClass {
    constructor() {
        super();
        this.StoreID = 0;
        this.CompCode = 0;
        this.DescA = '';
        this.DescE = '';
        this.Remark = '';
        this.location = '';
        this.CreatedBy = '';
        this.CreatedAt = '';
        this.UpdatedBy = '';
        this.UpdatedAt = '';
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
class D_G_TaxAddDed extends CustomClass {
    constructor() {
        super();
        this.TaxID = 0;
        this.TaxCode = '';
        this.TaxDescA = '';
        this.TaxDescE = '';
        this.TaxPrc = 0;
        this.TaxType = '';
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
class D_G_Zones extends CustomClass {
    constructor() {
        super();
        this.ZoneID = 0;
        this.FamilyZoneID = 0;
        this.CompCode = 0;
        this.ZoneCode = '';
        this.DescA = '';
        this.Active = false;
        this.Remarks = '';
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class D_I_Category extends CustomClass {
    constructor() {
        super();
        this.CatID = 0;
        this.Ser = 0;
        this.CompCode = 0;
        this.CatCode = '';
        this.DescA = '';
        this.DescE = '';
        this.Remarks = '';
        this.Type_Show = 0;
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.backgroundColor = '';
        this.FontColor = '';
        this.StatusFlag = '';
    }
}
class D_I_ItemFamily extends CustomClass {
    constructor() {
        super();
        this.ItemFamilyID = 0;
        this.Ser = 0;
        this.FamilyCode = '';
        this.CompCode = 0;
        this.DescA = '';
        this.DescE = '';
        this.CatID = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.backgroundColor = '';
        this.FontColor = '';
        this.StatusFlag = '';
    }
}
class D_I_Items extends CustomClass {
    constructor() {
        super();
        this.ItemID = 0;
        this.Ser = 0;
        this.CompCode = 0;
        this.IsService = false;
        this.ItemCode = '';
        this.ItemName = '';
        this.ItemFamilyID = 0;
        this.CostPrice = 0;
        this.UnitPrice = 0;
        this.Quantity = 0;
        this.OneHandQuantity = 0;
        this.QuantityMinimum = 0;
        this.QtyOpenBalances = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.ISActive = false;
        this.backgroundColor = '';
        this.FontColor = '';
        this.Image = '';
        this.ItemTaxID = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class D_I_Items_Temp extends CustomClass {
    constructor() {
        super();
        this.ItemID = 0;
        this.Ser = 0;
        this.CompCode = 0;
        this.IsService = false;
        this.ItemCode = '';
        this.ItemName = '';
        this.ItemFamilyID = 0;
        this.CostPrice = 0;
        this.UnitPrice = 0;
        this.Quantity = 0;
        this.OneHandQuantity = 0;
        this.QuantityMinimum = 0;
        this.QtyOpenBalances = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.ISActive = false;
        this.backgroundColor = '';
        this.FontColor = '';
        this.ItemTaxID = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class D_I_ItemTaxEG extends CustomClass {
    constructor() {
        super();
        this.ItemTaxID = 0;
        this.CatID = 0;
        this.COMP_CODE = 0;
        this.Status = 0;
        this.codeType = '';
        this.parentCode = '';
        this.itemCode = '';
        this.codeName = '';
        this.codeNameAr = '';
        this.activeFrom = '';
        this.activeTo = '';
        this.description = '';
        this.Remarks = '';
        this.UploadDate = '';
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class D_I_ItemUnits extends CustomClass {
    constructor() {
        super();
        this.ItemUnitID = 0;
        this.Ser = 0;
        this.QRCode = '';
        this.ItemID = 0;
        this.UnitID = 0;
        this.TypeUsing = 0;
        this.Remarks = '';
        this.ISActive = false;
        this.StatusFlag = '';
    }
}
class D_I_Tables extends CustomClass {
    constructor() {
        super();
        this.TableID = 0;
        this.TableNumber = 0;
        this.CompCode = 0;
        this.ISActive = false;
        this.StatusFlag = '';
    }
}
class D_I_Units extends CustomClass {
    constructor() {
        super();
        this.UnitID = 0;
        this.UnitCode = '';
        this.DescA = '';
        this.DescE = '';
        this.Rate = 0;
        this.CompCode = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.StatusFlag = '';
    }
}
class DQ_A_Supplier extends CustomClass {
    constructor() {
        super();
        this.SupplierID = 0;
        this.SuppliersCode = '';
        this.CompCode = 0;
        this.SupplierName = '';
        this.AccountNo = '';
        this.IsCash = false;
        this.Mobile = '';
        this.Debit = 0;
        this.Credit = 0;
        this.Balance = 0;
        this.PreviousDebit = 0;
        this.PreviousCredit = 0;
        this.OpenBalanceAt = '';
        this.Info = '';
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.UpdatedAt = '';
        this.CreatedBy = '';
        this.UpdatedBy = '';
        this.ISActive = false;
        this.NetBalance = 0;
        this.StatusFlag = '';
    }
}
class E_D_G_CreateTempExcel extends CustomClass {
    constructor() {
        super();
        this.IDTempExcel = 0;
        this.CompCode = 0;
        this.IDTypeTemp = 0;
        this.Serial = 0;
        this.NameTitle = '';
        this.Remark = '';
        this.IDLnkExcel = 0;
        this.IDFeildExcel = 0;
        this.CustomFeild = '';
        this.StatusFlag = '';
    }
}
class E_D_G_TypeTempExcel extends CustomClass {
    constructor() {
        super();
        this.IDTypeTemp = 0;
        this.CompCode = 0;
        this.DescA = '';
        this.DescE = '';
        this.Remark = '';
        this.IDLnkExcel = 0;
        this.IsActive = false;
        this.ProssType = 0;
        this.StatusFlag = '';
    }
}
class E_G_Link_BuildFeildExcelTable extends CustomClass {
    constructor() {
        super();
        this.IDFeildExcel = 0;
        this.IDLnkExcel = 0;
        this.Serial = 0;
        this.ColumnKey = '';
        this.DescA = '';
        this.DescE = '';
        this.NameFelid = '';
        this.TypeFelid = '';
        this.DefaultValueFelid = '';
        this.IsInsertNewRowValue = false;
        this.IsInsertTable = false;
        this.IsShow = false;
        this.IsOutFelidTable = false;
        this.NameFelidForeignKeyInTable_Lnk_1 = '';
        this.NameFelidForeignKeyInTable_Lnk_2 = '';
        this.NameOutTableGetData = '';
        this.NamePrimaryKeyOutTable_1 = '';
        this.NamePrimaryKeyOutTable_2 = '';
        this.NameFelidSelectValue = '';
        this.LinkCodeGroupUsing = 0;
        this.IsLinkFelidinTable = false;
        this.LinkCodeGroupUsing_Parent = 0;
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
class E_G_Link_CreateExcelByTable extends CustomClass {
    constructor() {
        super();
        this.IDLnkExcel = 0;
        this.CompCode = 0;
        this.Ser = 0;
        this.KeyTrans = '';
        this.IsWorkInsertAllFelidsInRow = 0;
        this.NameA = '';
        this.NameE = '';
        this.NameTable = '';
        this.NameRunProc = '';
        this.NameFelidID = '';
        this.NameFelidTrNo = '';
        this.NameFelidExcelID = '';
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
class E_I_ContainerDataExcel extends CustomClass {
    constructor() {
        super();
        this.IDContExcel = 0;
        this.NumLoop_Batch = 0;
        this.CreateByUserID = 0;
        this.IDExcel = 0;
        this.IDTypeTemp = 0;
        this.RowNumber = 0;
        this.NameTitle = '';
        this.IDTempExcel = 0;
        this.IDFeildExcel = 0;
        this.ValueFelid = '';
        this.Status = 0;
        this.ErrorMessage = '';
        this.QueryRow = '';
        this.StatusFlag = '';
    }
}
class E_I_LogUploadExcel extends CustomClass {
    constructor() {
        super();
        this.IDExcel = 0;
        this.CompCode = 0;
        this.IDLnkExcel = 0;
        this.IDTypeTemp = 0;
        this.From_ACC_CODE = '';
        this.NameExcel = '';
        this.TrDate = '';
        this.TrType = 0;
        this.Status = 0;
        this.Remark = '';
        this.KeyTrans = '';
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.DescError = '';
        this.IsPostDirectJournal = false;
        this.LastCountLoop = 0;
        this.ErrorMessage = '';
        this.CreateByUserID = 0;
        this.StatusFlag = '';
    }
}
class EQ_I_ContainerDataExcel extends CustomClass {
    constructor() {
        super();
        this.IDExcel = 0;
        this.KeyTrans = '';
        this.NameFelid = '';
        this.CompCode = 0;
        this.Serial = 0;
        this.NameTitle = '';
        this.ValueFelid = '';
        this.DefaultValueFelid = '';
        this.IsShow = false;
        this.NameTable = '';
        this.NameRunProc = '';
        this.NameFelidID = '';
        this.NameFelidTrNo = '';
        this.NameFelidExcelID = '';
        this.CreateByUserID = 0;
        this.TypeDescA = '';
        this.TypeDescE = '';
        this.CreateExNameA = '';
        this.CreateExNameE = '';
        this.IDLnkExcel = 0;
        this.IDTypeTemp = 0;
        this.IDFeildExcel = 0;
        this.FelidDescA = '';
        this.FelidDescE = '';
        this.NameFelidForeignkeyID1 = '';
        this.NameTableOut1 = '';
        this.NameFelidOutID1 = '';
        this.NameSelectFelidOut1 = '';
        this.NameFelidForeignkeyID2 = '';
        this.NameTableOut2 = '';
        this.NameFelidOutID2 = '';
        this.NameSelectFelidOut2 = '';
        this.NameFelidForeignkeyID3 = '';
        this.NameTableOut3 = '';
        this.NameFelidOutID3 = '';
        this.NameSelectFelidOut3 = '';
        this.StatusFlag = '';
    }
}
class G_BRANCH extends CustomClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESC = '';
        this.BRA_TYPE = 0;
        this.BRA_DESCL = '';
        this.BRA_SHORTA = '';
        this.BRA_SHORTL = '';
        this.REGION_CODE = '';
        this.City = '';
        this.Address = '';
        this.Tel = '';
        this.Fax = '';
        this.Email = '';
        this.WebSite = '';
        this.BranchManager = '';
        this.HRResponsible = '';
        this.FinanceResponsible = '';
        this.SalesManager = '';
        this.CUSTOM1 = '';
        this.CUSTOM2 = '';
        this.CUSTOM3 = '';
        this.CUSTOM4 = '';
        this.CUSTOM5 = '';
        this.CUSTOMFLAG1 = false;
        this.CUSTOMFLAG2 = false;
        this.CUSTOMNUM1 = 0;
        this.CUSTOMNUM2 = 0;
        this.CUSTOMDATE = '';
        this.BRA_DESCE = '';
        this.GroupVatNo = '';
        this.VndIDTypeCode = 0;
        this.IDNo = '';
        this.Address_Street = '';
        this.Address_Str_Additional = '';
        this.Address_BuildingNo = '';
        this.Address_Build_Additional = '';
        this.Address_City = '';
        this.Address_Postal = '';
        this.Address_Province = '';
        this.Address_District = '';
        this.NationalityID = 0;
        this.Currencyid = 0;
        this.RetailInvoiceAllowed = 0;
        this.RetailInvoiceTransCode = 0;
        this.RetailInvoicePayment = 0;
        this.WholeInvoiceTransCode = 0;
        this.WholeInvoiceAllowed = 0;
        this.WholeInvoicePayment = 0;
        this.AutoupdateSalesPrice = false;
        this.SalePriceAddPerc = 0;
        this.SalePriceMinAddPerc = 0;
        this.ExceedMinPricePassword = '';
        this.RetailInvoicePaymentDef = 0;
        this.OperationInvoicePaymentDef = 0;
        this.StatusFlag = '';
    }
}
class G_Codes extends CustomClass {
    constructor() {
        super();
        this.ID = 0;
        this.CodeType = '';
        this.CodeValue = 0;
        this.DescA = '';
        this.DescE = '';
        this.SubCode = '';
        this.Remarks = '';
        this.StdCode = '';
        this.StatusFlag = '';
    }
}
class G_COMPANY extends CustomClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.NameA = '';
        this.NameE = '';
        this.Systems = '';
        this.MOI_ID = '';
        this.CRT_NO = '';
        this.City = '';
        this.Address = '';
        this.Tel = '';
        this.Fax = '';
        this.Email = '';
        this.WebSite = '';
        this.GMName = '';
        this.HRResponsible = '';
        this.FinanceResponsible = '';
        this.SalesManager = '';
        this.CUSTOM1 = '';
        this.CUSTOM2 = '';
        this.CUSTOM3 = '';
        this.CUSTOM4 = '';
        this.CUSTOM5 = '';
        this.CUSTOMFLAG1 = false;
        this.CUSTOMFLAG2 = false;
        this.CUSTOMNUM1 = 0;
        this.CUSTOMNUM2 = 0;
        this.CUSTOMDATE = '';
        this.IsActive = false;
        this.IsReadOnly = false;
        this.LogoIcon = '';
        this.BkImage1 = '';
        this.BkImage2 = '';
        this.IBAN_NO = '';
        this.BanckAccNo = '';
        this.BanckAccName = '';
        this.GroupVatNo = '';
        this.VATNO = '';
        this.VndIDTypeCode = 0;
        this.IDNo = '';
        this.Address_Street = '';
        this.Address_Str_Additional = '';
        this.Address_BuildingNo = '';
        this.Address_Build_Additional = '';
        this.Address_City = '';
        this.Address_Postal = '';
        this.Address_Province = '';
        this.Address_District = '';
        this.Address_Floor = '';
        this.Address_Room = '';
        this.Address_LandMarks = '';
        this.NationalityID = 0;
        this.Currencyid = 0;
        this.TaxBusinessType = '';
        this.TaxActivityCode = null;
        this.TaxUserCode = null;
        this.TaxUserverification = null;
        this.TaxToken = null;
        this.StatusFlag = '';
    }
}
class G_CONTROL extends CustomClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.FIN_YEAR = 0;
        this.FirstDate = '';
        this.LastDate = '';
        this.Status = 0;
        this.IsOpen = false;
        this.StatusFlag = '';
    }
}
class G_Data_Redis extends CustomClass {
    constructor() {
        super();
        this.Id = 0;
        this.NameTable = '';
        this.TrType = 0;
        this.ISActive = false;
        this.KeyTrigger = '';
        this.Status = 0;
        this.NameFolder = '';
        this.IDServerDevice = '';
        this.StatusFlag = '';
    }
}
class G_DefTempExcel extends CustomClass {
    constructor() {
        super();
        this.ID = 0;
        this.CompCode = 0;
        this.Serial = 0;
        this.IDTypeTemp = 0;
        this.NameTitle = '';
        this.Remark = '';
        this.TrType = '';
        this.IDType = 0;
        this.StatusFlag = '';
    }
}
class G_Employees extends CustomClass {
    constructor() {
        super();
        this.EmpID = 0;
        this.User_Login = '';
        this.Password_Login = '';
        this.EmpCode = '';
        this.CompCode = 0;
        this.Emp_Name = '';
        this.EmpType = 0;
        this.EmpRole = 0;
        this.IsUser = false;
        this.Status = 0;
        this.Address = '';
        this.Mobile = '';
        this.Mobile2 = '';
        this.Email = '';
        this.ManagedBy = '';
        this.LoginUrl = false;
        this.Remarks = '';
        this.ManagerID = 0;
        this.SupervisorID = 0;
        this.FamilyZoneID = 0;
        this.ZoneID = 0;
        this.Job_Title = '';
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.Profile_Img = '';
        this.FrontID_Img = '';
        this.BackID_Img = '';
        this.Gender = 0;
        this.IDNO = '';
        this.FrontDrivLicense_Img = '';
        this.BackDrivLicense_Img = '';
        this.FrontVicLicense_Img = '';
        this.BackVicLicense_Img = '';
        this.AccTransferNo = '';
        this.AccNameTransfer = '';
        this.ACC_CODE = '';
        this.Custody_Code = '';
        this.Loan_Code = '';
        this.PayLoan_Cust_Code = '';
        this.CustodyAmount = 0;
        this.LoanAmount = 0;
        this.SalaryAmount = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class G_I_DayShift extends CustomClass {
    constructor() {
        super();
        this.DayShiftID = 0;
        this.TrDate = '';
        this.DescA = '';
        this.DescE = '';
        this.Status = 0;
        this.Remark = '';
        this.CreatedBy = '';
        this.CreatedAt = '';
        this.CompCode = 0;
        this.LastCount = 0;
        this.StatusFlag = '';
    }
}
class G_Log_Device extends CustomClass {
    constructor() {
        super();
        this.ID_Device = '';
        this.DeviceType = '';
        this.NameBrowser = '';
        this.USERID = null;
        this.CompCode = 0;
        this.BranchCode = 0;
        this.FIN_YEAR = 0;
        this.USER_CODE = '';
        this.Password = '';
        this.ISActive = false;
        this.Last_Page = '';
        this.Last_Page1 = '';
        this.Last_Page2 = '';
        this.Last_Page3 = '';
        this.IsNotAuto = false;
        this.StatusFlag = '';
    }
}
class G_Log_User extends CustomClass {
    constructor() {
        super();
        this.LogID = 0;
        this.CompCode = 0;
        this.UserID = '';
        this.TransID = 0;
        this.TrType = '';
        this.Mode = '';
        this.Remarks = '';
        this.Date = '';
        this.IsSuccess = false;
        this.ID_Device = '';
        this.DeviceType = '';
        this.NameBrowser = '';
        this.CodeRun = '';
        this.StatusFlag = '';
    }
}
class G_MODULES extends CustomClass {
    constructor() {
        super();
        this.MODULE_CODE = '';
        this.MODULE_MENU = '';
        this.MODULE_DESCE = '';
        this.MODULE_DESCA = '';
        this.Url_Image = '';
        this.MODULE_TYPE = null;
        this.MODULE_SORT = 0;
        this.IS_Show = 0;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM1_DESC = '';
        this.CUSTOM2_DESC = '';
        this.CUSTOM3_DESC = '';
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM4_DESC = '';
        this.CUSTOM5_DESC = '';
        this.CUSTOM6_DESC = '';
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.CUSTOM7_DESC = '';
        this.CUSTOM8_DESC = '';
        this.CUSTOM9_DESC = '';
        this.AVAILABLE = false;
        this.Images_Enabled = false;
        this.StatusFlag = '';
    }
}
class G_Resources extends CustomClass {
    constructor() {
        super();
        this.IDRes = 0;
        this.KeyRes = '';
        this.NameResEn = '';
        this.NameResAr = '';
        this.Custom = '';
        this.StatusFlag = '';
    }
}
class G_Role extends CustomClass {
    constructor() {
        super();
        this.RoleId = 0;
        this.DescA = '';
        this.DescE = '';
        this.Remarks = '';
        this.IsAvailable = false;
        this.CompCode = 0;
        this.IsShowable = false;
        this.RoleType = 0;
        this.StatusFlag = '';
    }
}
class G_RoleModule extends CustomClass {
    constructor() {
        super();
        this.RoleId = 0;
        this.MODULE_CODE = '';
        this.MODULE_MENU = '';
        this.MODULE_DESCE = '';
        this.MODULE_DESCA = '';
        this.Url_Image = '';
        this.MODULE_TYPE = null;
        this.MODULE_SORT = 0;
        this.IS_Show = 0;
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.ViewImages = false;
        this.EditImages = false;
        this.Prc_Preference = 0;
        this.StatusFlag = '';
    }
}
class G_RoleUsers extends CustomClass {
    constructor() {
        super();
        this.IDUser = 0;
        this.RoleId = 0;
        this.CompCode = 0;
        this.ISActive = false;
        this.StatusFlag = '';
    }
}
class G_Run_Trigger extends CustomClass {
    constructor() {
        super();
        this.Id = 0;
        this.ComCode = 0;
        this.FinYear = 0;
        this.Status_Trigger = 0;
        this.Date = '';
        this.TrType = '';
        this.Remark = '';
        this.StatusFlag = '';
    }
}
class G_Run_Trigger_Waiting extends CustomClass {
    constructor() {
        super();
        this.Id = 0;
        this.Status_Trigger = 0;
        this.Remark = '';
        this.StatusFlag = '';
    }
}
class G_SearchForm extends CustomClass {
    constructor() {
        super();
        this.SearchFormCode = '';
        this.ReturnDataPropertyName = '';
        this.Description = '';
        this.SerachFormTitle = '';
        this.IsFullScreen = false;
        this.Left = 0;
        this.Top = 0;
        this.Height = 0;
        this.Width = 0;
        this.PageSize = 0;
        this.DataSourceName = '';
        this.SearchInterval = 0;
        this.SerachFormTitleA = '';
        this.ISActive = false;
        this.KeyTrigger = '';
        this.Status = 0;
        this.StatusFlag = '';
    }
}
class G_SearchFormModule extends CustomClass {
    constructor() {
        super();
        this.SystemCode = '';
        this.SubSystemCode = '';
        this.ModuleCode = '';
        this.ControlCode = '';
        this.SearchFormCode = '';
        this.StatusFlag = '';
    }
}
class G_SearchFormSetting extends CustomClass {
    constructor() {
        super();
        this.SearchFormSettingID = 0;
        this.SearchFormCode = '';
        this.FieldSequence = 0;
        this.DataMember = '';
        this.AlternateDataMember = '';
        this.FieldTitle = '';
        this.IsReadOnly = false;
        this.Datatype = 0;
        this.FieldWidth = 0;
        this.UseSelectionOperator = false;
        this.Language = 0;
        this.FieldTitleA = '';
        this.StatusFlag = '';
    }
}
class G_Settings_Device extends CustomClass {
    constructor() {
        super();
        this.ID = 0;
        this.ID_Device = '';
        this.Language = '';
        this.DeviceType = '';
        this.NameBrowser = '';
        this.LastDateUpdate = '';
        this.StatusFlag = '';
    }
}
class G_Tr_Archive extends CustomClass {
    constructor() {
        super();
        this.ArchiveID = 0;
        this.RefNo = '';
        this.CompCode = 0;
        this.FinYear = 0;
        this.MODULE_CODE = '';
        this.TransID = 0;
        this.UUID = '';
        this.NameFile = '';
        this.TypeFile = '';
        this.Remarks = '';
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.IDUserCreate = 0;
        this.Status = 0;
        this.StatusFlag = '';
    }
}
class G_TransCounter extends CustomClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.BranchCode = 0;
        this.FinYear = 0;
        this.TransType = '';
        this.PeriodCode = 0;
        this.LastSerial = 0;
        this.StatusFlag = '';
    }
}
class G_TransCounterSetting extends CustomClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.TransType = '';
        this.YearStartValueType = 0;
        this.ISBranchCounter = false;
        this.YearStartFixedValue = 0;
        this.Remarks = '';
        this.StatusFlag = '';
    }
}
class G_TypeEmployees extends CustomClass {
    constructor() {
        super();
        this.IDTypeEmp = 0;
        this.CompCode = 0;
        this.EmpType = 0;
        this.DescA = '';
        this.DescE = '';
        this.Remark = '';
        this.ISActive = false;
        this.StatusFlag = '';
    }
}
class G_TypeTempExcel extends CustomClass {
    constructor() {
        super();
        this.IDTypeTemp = 0;
        this.CompCode = 0;
        this.DescA = '';
        this.Remark = '';
        this.StatusFlag = '';
    }
}
class G_USERS extends CustomClass {
    constructor() {
        super();
        this.ID = 0;
        this.USER_CODE = '';
        this.USER_PASSWORD = '';
        this.USER_PASSWORD2 = '';
        this.USER_ACTIVE = false;
        this.USER_NAME = '';
        this.Status = 0;
        this.Email = '';
        this.DepartmentName = '';
        this.JobTitle = '';
        this.RoleIds = '';
        this.USER_TYPE = 0;
        this.CHANGE_PASS_DATE = '';
        this.LastLogin = '';
        this.FirstLogin = '';
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.Profile_Img = '';
        this.Tokenid = '';
        this.IDExcel = 0;
        this.EmpID = null;
        this.IsAutoLogin = false;
        this.StatusFlag = '';
    }
}
class GQ_USERS extends CustomClass {
    constructor() {
        super();
        this.ID = 0;
        this.EmpID = null;
        this.EmpCode = '';
        this.USER_CODE = '';
        this.USER_PASSWORD = '';
        this.USER_NAME = '';
        this.USER_ACTIVE = false;
        this.Email = '';
        this.JobTitle = '';
        this.USER_TYPE = 0;
        this.Tokenid = '';
        this.Profile_Img = '';
        this.UpdatedBy = '';
        this.UpdatedAt = '';
        this.CreatedBy = '';
        this.CreatedAt = '';
        this.FirstLogin = '';
        this.LastLogin = '';
        this.CHANGE_PASS_DATE = '';
        this.DepartmentName = '';
        this.USER_PASSWORD2 = '';
        this.Status = 0;
        this.DescZone = '';
        this.DescFamilyZone = '';
        this.RoleIds = '';
        this.StatusFlag = '';
    }
}
class I_Control extends CustomClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.Comp_ACC_CODE = '';
        this.ACC_CODE_Create_User = '';
        this.StartAccCode_User = '';
        this.DefSlsVatType = 0;
        this.DefPurVatType = 0;
        this.IsVat = false;
        this.MobileLength = 0;
        this.IDLength = 0;
        this.SendSMS = false;
        this.SendPublicSMS = false;
        this.NotePeriodinSec = 0;
        this.DashBoardPeriodinSec = 0;
        this.MaxYearlyMSGs = 0;
        this.UsedMSGs = 0;
        this.UserTimeZoneUTCDiff = 0;
        this.ServerTimeZoneUTCDiff = 0;
        this.SaudiNationID = 0;
        this.WebCustomerWebsite = false;
        this.MembeshiptStartDate = '';
        this.MembeshipEndDate = '';
        this.MembershipAllanceDays = 0;
        this.MembershipreadOnlyDays = 0;
        this.IsFreePurchaseReturn = false;
        this.IsFreeSalesReturn = false;
        this.ExceedMinPricePassword = '';
        this.CurNameA = '';
        this.CurNameE = '';
        this.CurSmallNameA = '';
        this.CurSmallNameE = '';
        this.IsLocalBranchCustomer = false;
        this.SysTimeOut = 0;
        this.NationalityID = 0;
        this.Currencyid = 0;
        this.DocPDFFolder = '';
        this.TemplateExcelFolder = '';
        this.Start_Loan_Custody = '';
        this.ACC_CODE_Custody = '';
        this.ACC_CODE_Loan = '';
        this.EGTax_ClientIDProd = '';
        this.EGTax_SecretIDProd = '';
        this.TaxLinkedEG = false;
        this.TaxLinked = false;
        this.TaxUnitID = 0;
        this.IS_POS = false;
        this.Is_Restaurant = false;
        this.ISWork_Type_Items = 0;
        this.Is_ShowPrice = false;
        this.Is_JobOrder = false;
        this.Is_CarCenter = false;
        this.TechRepType = 0;
        this.Quickly_INV = 0;
        this.AutoCode = false;
        this.previousUUID = '';
        this.IsArchive = false;
        this.StatusFlag = '';
    }
}
class I_TR_ExternalLabor extends CustomClass {
    constructor() {
        super();
        this.TransactionID = 0;
        this.TrNo = 0;
        this.RefNo = '';
        this.TransactionDate = '';
        this.CompCode = 0;
        this.TrType = 0;
        this.IsCash = false;
        this.Type = 0;
        this.CashTypeID = 0;
        this.Reason = '';
        this.BeneficiaryName = '';
        this.Amount = 0;
        this.DueAmount = 0;
        this.Status = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.InvoiceID = 0;
        this.InvoiceNo = '';
        this.IDPeriod = '';
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class I_TR_FinancialTransactions extends CustomClass {
    constructor() {
        super();
        this.TransactionID = 0;
        this.TrNo = 0;
        this.RefNo = '';
        this.TransactionDate = '';
        this.CompCode = 0;
        this.TrType = 0;
        this.IsCash = false;
        this.Type = 0;
        this.CashTypeID = 0;
        this.Reason = '';
        this.BeneficiaryName = '';
        this.Amount = 0;
        this.ChargePrc = 0;
        this.DueAmount = 0;
        this.LoanPayAmount = 0;
        this.CustodyPayAmount = 0;
        this.Status = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.PurchaseID = 0;
        this.TrNo_Ref = 0;
        this.IDPeriod = '';
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class I_TR_PurchaseDetails extends CustomClass {
    constructor() {
        super();
        this.PurchaseDetailID = 0;
        this.PurchaseID = 0;
        this.ItemUnitID = 0;
        this.ItemID = 0;
        this.VatTypeID = 0;
        this.Rate = 0;
        this.CostPrice = 0;
        this.OneHandQuantity = 0;
        this.Quantity = 0;
        this.RetQty = 0;
        this.UnitPrice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class I_TR_Purchases extends CustomClass {
    constructor() {
        super();
        this.PurchaseID = 0;
        this.TrNo = 0;
        this.TrType = 0;
        this.GlobalNo = 0;
        this.DoNo = '';
        this.RefID = 0;
        this.ReNo = '';
        this.IsCash = false;
        this.CashType = 0;
        this.PurDate = '';
        this.CompCode = 0;
        this.TrTime = '';
        this.Status = 0;
        this.SupplierName = '';
        this.Mobile = '';
        this.ItemsTotal = 0;
        this.Discount = 0;
        this.TotalAmount = 0;
        this.VatTypeID = 0;
        this.VatAmount = 0;
        this.ChargePrc = 0;
        this.NetAmount = 0;
        this.DueAmount = 0;
        this.RemainAmount = 0;
        this.PaymentAmount = 0;
        this.IsService = false;
        this.SupplierID = 0;
        this.Remarks = '';
        this.VoucherNo = 0;
        this.IsPosted = false;
        this.QRCode = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.InvoiceTransCode = 0;
        this.DocUUID = '';
        this.IDPeriod = '';
        this.PaymentTerms = '';
        this.PaymentType = '';
        this.PurOrderID = 0;
        this.PurOrderNo = '';
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class I_TR_SaleDetails extends CustomClass {
    constructor() {
        super();
        this.SaleDetailID = 0;
        this.SaleID = 0;
        this.ItemUnitID = 0;
        this.ItemID = 0;
        this.NameItem = '';
        this.VatTypeID = 0;
        this.Rate = 0;
        this.CostPrice = 0;
        this.OneHandQuantity = 0;
        this.Quantity = 0;
        this.RetQty = 0;
        this.UnitPrice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class I_TR_Sales extends CustomClass {
    constructor() {
        super();
        this.SaleID = 0;
        this.TrNo = 0;
        this.TrType = 0;
        this.InvType = 0;
        this.GlobalNo = 0;
        this.DoNo = '';
        this.RefID = 0;
        this.ReNo = '';
        this.IsCash = false;
        this.CashType = 0;
        this.SaleDate = '';
        this.CompCode = 0;
        this.TrTime = '';
        this.Status = 0;
        this.CustomerName = '';
        this.Mobile = '';
        this.SalesManID = 0;
        this.SalesManName = '';
        this.SalesManMobile = '';
        this.AttatchName = '';
        this.ItemsTotal = 0;
        this.Discount = 0;
        this.TotalAmount = 0;
        this.VatTypeID = 0;
        this.VatAmount = 0;
        this.ChargePrc = 0;
        this.ExternalAmount = 0;
        this.NetAmount = 0;
        this.DueAmount = 0;
        this.RemainAmount = 0;
        this.PaymentAmount = 0;
        this.CurrenyID = 0;
        this.TaxID = 0;
        this.TaxPrc = 0;
        this.DedTaxAmount = 0;
        this.Rate_Currency = 0;
        this.IsService = false;
        this.CustomerID = 0;
        this.Remarks = '';
        this.VoucherNo = 0;
        this.IsPosted = false;
        this.QRCode = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.InvoiceTransCode = 0;
        this.TaxStatus = 0;
        this.DocUUID = '';
        this.PrevInvoiceHash = '';
        this.IDPeriod = '';
        this.PaymentTerms = '';
        this.PaymentType = '';
        this.ExpiryTime = '';
        this.DeliveryTime = '';
        this.TaxErrorCode = 0;
        this.ShowPriceID = 0;
        this.ShowPriceNo = '';
        this.JobOrderID = 0;
        this.JobOrderNo = '';
        this.Warrantyperiod = '';
        this.CarBrand = '';
        this.CarNo = '';
        this.ChassisNo = '';
        this.DestructionKm = '';
        this.EngineerName = '';
        this.IDExcel = 0;
        this.purchaseorderDesc = '';
        this.purchaseorderCode = '';
        this.StatusFlag = '';
    }
}
class I_TR_TableReservations extends CustomClass {
    constructor() {
        super();
        this.ReservationID = 0;
        this.TableID = 0;
        this.ReservationDate = '';
        this.ReservationTime = '';
        this.CustomerName = '';
        this.NumberOfPeople = 0;
        this.Status = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.CompCode = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class IQ_DisplayAllItemsActive extends CustomClass {
    constructor() {
        super();
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
        this.QuantityMinimum = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.CatID = 0;
        this.TypeUsing = 0;
        this.backgroundColor = '';
        this.FontColor = '';
        this.IsService = false;
        this.ISActive = false;
        this.QtyOpenBalances = 0;
        this.Image = '';
        this.StatusFlag = '';
    }
}
class IQ_DisplayAllItemsUnites extends CustomClass {
    constructor() {
        super();
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
        this.FontColor = '';
        this.IsService = false;
        this.ISActive = false;
        this.ItemUnitID = 0;
        this.UnitID = 0;
        this.Image = '';
        this.StatusFlag = '';
    }
}
class IQ_EGTaxInvHeader extends CustomClass {
    constructor() {
        super();
        this.sub_Bra_code = 0;
        this.sub_Bra_Name = '';
        this.Sub_Country = '';
        this.sub_governate = '';
        this.Sub_City = '';
        this.Sub_Street = '';
        this.sub_BuildingNo = '';
        this.sub_PostalCode = '';
        this.sub_Floor = '';
        this.sub__Room = '';
        this.sub_LandMarks = '';
        this.sub_AdditionalInfo = '';
        this.sub_Type = '';
        this.sub_VatNo = '';
        this.sub_Name = '';
        this.Cus_Country = '';
        this.Cus_governate = '';
        this.Cus_City = '';
        this.Cus_Street = '';
        this.Cus_BuildingNo = '';
        this.Cus_PostalCode = '';
        this.Cus_Floor = '';
        this.Cus__Room = '';
        this.Cus_LandMarks = '';
        this.Cus_AdditionalInfo = '';
        this.Cus_VatNo = '';
        this.Cus_Name = '';
        this.Cus_Type = '';
        this.Sub_ActivityCode = null;
        this.AllowAfterVat = 0;
        this.DiscountAmount = 0;
        this.PurchaseorderNo = '';
        this.purchaseorderDesc = '';
        this.SalesOrderRef = 0;
        this.SalesORderDesc = '';
        this.perofrmainvoiceno = '';
        this.ItemDiscountTotal = 0;
        this.ItemTotal = 0;
        this.hd_NetAmount = 0;
        this.hd_TaxTotal = 0;
        this.hd_TotalAmount = 0;
        this.RoundingAmount = 0;
        this.InvoiceID = 0;
        this.TrNo = 0;
        this.inv_Type = '';
        this.TrDate = '';
        this.TrTime = '';
        this.TaxUploadDate = '';
        this.DocUUID = '';
        this.BranchCode = 0;
        this.CompCode = 0;
        this.Status = 0;
        this.VatAmount = 0;
        this.TaxType = 0;
        this.TaxCode = '';
        this.TaxPrc = 0;
        this.DedTaxAmount = 0;
        this.DedTaxType = '';
        this.CurrencyRate = 0;
        this.CurrencyCode = '';
        this.StatusFlag = '';
    }
}
class IQ_EGTaxInvItems extends CustomClass {
    constructor() {
        super();
        this.DescA = '';
        this.RefItemCode = '';
        this.ItemCode = '';
        this.UomCode = '';
        this.Quantity = 0;
        this.OldItemCode = '';
        this.ItemTotal = 0;
        this.Total = 0;
        this.SalesTotal = 0;
        this.diff = 0;
        this.TaxableFees = 0;
        this.NetTotal = 0;
        this.Unitprice = 0;
        this.CurrencyCode = '';
        this.DiscountPrc = 0;
        this.Discount = 0;
        this.TaxType = '';
        this.TaxSubType = '';
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.InvoiceItemID = 0;
        this.InvoiceID = 0;
        this.Serial = 0;
        this.TaxCode = '';
        this.TaxPrc = 0;
        this.ItemDedTax = 0;
        this.DedTaxType = '';
        this.StatusFlag = '';
    }
}
class IQ_EGTaxReceiptHeader extends CustomClass {
    constructor() {
        super();
        this.SellerBranchCode = 0;
        this.orderdeliveryMode = '';
        this.sub_Bra_Name = '';
        this.SellerCountry = '';
        this.SellerGovernate = '';
        this.SellerRegionCity = '';
        this.SellerStreet = '';
        this.SellerBuildingNumber = '';
        this.SellerPostalCode = '';
        this.SellerFloor = '';
        this.SellerRoom = '';
        this.SellerLandmark = '';
        this.SellerAdditionalInformation = '';
        this.sub_Type = '';
        this.SellerRin = '';
        this.SellerCompanyTradeName = '';
        this.BuyerId = '';
        this.BuyerName = '';
        this.BuyerMobileNumber = '';
        this.paymentMethod = '';
        this.BuyerPaymentNumber = '';
        this.BuyerType = '';
        this.activityCode = null;
        this.AllowAfterVat = 0;
        this.DiscountAmount = 0;
        this.PurchaseorderNo = '';
        this.purchaseorderDesc = '';
        this.SalesOrderRef = 0;
        this.SalesORderDesc = '';
        this.perofrmainvoiceno = '';
        this.ItemDiscountTotal = 0;
        this.ItemTotal = 0;
        this.hd_NetAmount = 0;
        this.hd_TaxTotal = 0;
        this.hd_TotalAmount = 0;
        this.RoundingAmount = 0;
        this.InvoiceID = 0;
        this.ReceiptNumber = 0;
        this.inv_Type = '';
        this.TrDate = '';
        this.TrTime = '';
        this.TaxUploadDate = '';
        this.DocUUID = '';
        this.BranchCode = 0;
        this.CompCode = 0;
        this.Status = 0;
        this.VatAmount = 0;
        this.typeVersion = 0;
        this.receiptType = '';
        this.feesAmount = 0;
        this.TaxCode = '';
        this.TaxPrc = 0;
        this.DedTaxAmount = 0;
        this.DedTaxType = '';
        this.CurrencyRate = 0;
        this.currency = '';
        this.uuid = '';
        this.previousUUID = '';
        this.StatusFlag = '';
    }
}
class IQ_G_Employees extends CustomClass {
    constructor() {
        super();
        this.EmpID = 0;
        this.EmpType = 0;
        this.EmpCode = '';
        this.CompCode = 0;
        this.Emp_Name = '';
        this.Status = 0;
        this.Address = '';
        this.Mobile = '';
        this.Mobile2 = '';
        this.Email = '';
        this.ManagedBy = '';
        this.LoginUrl = false;
        this.Remarks = '';
        this.ManagerID = 0;
        this.SupervisorID = 0;
        this.FamilyZoneID = 0;
        this.ZoneID = 0;
        this.Job_Title = '';
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.Profile_Img = '';
        this.FrontID_Img = '';
        this.BackID_Img = '';
        this.Gender = 0;
        this.IDNO = '';
        this.FrontDrivLicense_Img = '';
        this.BackDrivLicense_Img = '';
        this.FrontVicLicense_Img = '';
        this.BackVicLicense_Img = '';
        this.AccTransferNo = '';
        this.AccNameTransfer = '';
        this.Custody_Code = '';
        this.Loan_Code = '';
        this.CustodyAmount = 0;
        this.LoanAmount = 0;
        this.SalaryAmount = 0;
        this.IDExcel = 0;
        this.NameFamliyZone = '';
        this.NameZone = '';
        this.USER_CODE = '';
        this.ID = 0;
        this.USER_PASSWORD = '';
        this.DescEmpType = '';
        this.IsUser = false;
        this.EmpRole = 0;
        this.PayLoan_Cust_Code = '';
        this.ACC_CODE = '';
        this.Password_Login = '';
        this.User_Login = '';
        this.StatusFlag = '';
    }
}
class IQ_G_Log_Device extends CustomClass {
    constructor() {
        super();
        this.ID = 0;
        this.ID_Device = '';
        this.Language = '';
        this.DeviceType = '';
        this.NameBrowser = '';
        this.LastDateUpdate = '';
        this.USERID = null;
        this.CompCode = 0;
        this.BranchCode = 0;
        this.FIN_YEAR = 0;
        this.USER_CODE = '';
        this.Password = '';
        this.ISActive = false;
        this.Last_Page = '';
        this.Last_Page1 = '';
        this.Last_Page2 = '';
        this.Last_Page3 = '';
        this.IsNotAuto = false;
        this.StatusFlag = '';
    }
}
class IQ_G_RoleModule extends CustomClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.StatusCompany = 0;
        this.FIN_YEAR = 0;
        this.RoleId = 0;
        this.MODULE_CODE = '';
        this.MODULE_MENU = '';
        this.MODULE_DESCE = '';
        this.MODULE_DESCA = '';
        this.Url_Image = '';
        this.MODULE_TYPE = null;
        this.MODULE_SORT = 0;
        this.IS_Show = 0;
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.IsArchive = false;
        this.Prc_Preference = 0;
        this.StatusFlag = '';
    }
}
class IQ_G_RoleUsersAllDataComp extends CustomClass {
    constructor() {
        super();
        this.IDUser = 0;
        this.RoleId = 0;
        this.RoleIds = '';
        this.RoleDescA = '';
        this.RoleDescE = '';
        this.NameUser = '';
        this.CompCode = 0;
        this.CompNameA = '';
        this.CompNameE = '';
        this.EmpID = null;
        this.EmpCode = '';
        this.USER_CODE = '';
        this.USER_PASSWORD = '';
        this.Email = '';
        this.USER_PASSWORD2 = '';
        this.USER_ACTIVE = false;
        this.Status = 0;
        this.DepartmentName = '';
        this.JobTitle = '';
        this.USER_TYPE = 0;
        this.CHANGE_PASS_DATE = '';
        this.LastLogin = '';
        this.FirstLogin = '';
        this.CreatedAt = '';
        this.UpdatedAt = '';
        this.CreatedBy = '';
        this.UpdatedBy = '';
        this.Profile_Img = '';
        this.Tokenid = '';
        this.IDExcel = 0;
        this.IsAutoLogin = false;
        this.StatusFlag = '';
    }
}
class IQ_G_RoleUsersComp extends CustomClass {
    constructor() {
        super();
        this.IDUser = 0;
        this.RoleId = 0;
        this.RoleIds = '';
        this.RoleDescA = '';
        this.RoleDescE = '';
        this.CompNameA = '';
        this.CompNameE = '';
        this.EmpID = null;
        this.USER_CODE = '';
        this.USER_PASSWORD = '';
        this.Email = '';
        this.IsAutoLogin = false;
        this.NameUser = '';
        this.CompCode = 0;
        this.EmpCode = '';
        this.StatusFlag = '';
    }
}
class IQ_G_TypeEmployeesByUsing extends CustomClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.DescA = '';
        this.DescE = '';
        this.EmpType = 0;
        this.IDTypeEmp = 0;
        this.ISActive = false;
        this.Remark = '';
        this.EmpID = 0;
        this.StatusFlag = '';
    }
}
class IQ_GetItemInfo extends CustomClass {
    constructor() {
        super();
        this.ItemID = 0;
        this.CompCode = 0;
        this.ItemCode = '';
        this.ItemName = '';
        this.ItemUnitID = 0;
        this.UnitID = 0;
        this.UnitCode = '';
        this.UnitDescA = '';
        this.ItemFamilyID = 0;
        this.FamilyCode = '';
        this.FamilyDescA = '';
        this.CatID = 0;
        this.CatCode = '';
        this.CatDescA = '';
        this.ISActive = false;
        this.Remarks = '';
        this.TypeUsing = 0;
        this.Rate = 0;
        this.UnitPrice = 0;
        this.Quantity = 0;
        this.OneHandQuantity = 0;
        this.CostPrice = 0;
        this.QRCode = '';
        this.backgroundColor = '';
        this.FontColor = '';
        this.IsService = false;
        this.ItemTaxID = 0;
        this.Image = '';
        this.StatusFlag = '';
    }
}
class IQ_I_Control extends CustomClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.Comp_ACC_CODE = '';
        this.ACC_CODE_Create_User = '';
        this.StartAccCode_User = '';
        this.DefSlsVatType = 0;
        this.DefPurVatType = 0;
        this.IsVat = false;
        this.MobileLength = 0;
        this.IDLength = 0;
        this.SendSMS = false;
        this.SendPublicSMS = false;
        this.NotePeriodinSec = 0;
        this.DashBoardPeriodinSec = 0;
        this.MaxYearlyMSGs = 0;
        this.UsedMSGs = 0;
        this.UserTimeZoneUTCDiff = 0;
        this.ServerTimeZoneUTCDiff = 0;
        this.SaudiNationID = 0;
        this.WebCustomerWebsite = false;
        this.MembeshiptStartDate = '';
        this.MembeshipEndDate = '';
        this.MembershipAllanceDays = 0;
        this.MembershipreadOnlyDays = 0;
        this.IsFreePurchaseReturn = false;
        this.IsFreeSalesReturn = false;
        this.ExceedMinPricePassword = '';
        this.CurNameA = '';
        this.CurNameE = '';
        this.CurSmallNameA = '';
        this.CurSmallNameE = '';
        this.IsLocalBranchCustomer = false;
        this.SysTimeOut = 0;
        this.NationalityID = 0;
        this.Currencyid = 0;
        this.DocPDFFolder = '';
        this.TemplateExcelFolder = '';
        this.Start_Loan_Custody = '';
        this.ACC_CODE_Custody = '';
        this.ACC_CODE_Loan = '';
        this.EGTax_ClientIDProd = '';
        this.EGTax_SecretIDProd = '';
        this.TaxLinkedEG = false;
        this.TaxLinked = false;
        this.TaxUnitID = 0;
        this.IS_POS = false;
        this.Is_Restaurant = false;
        this.ISWork_Type_Items = 0;
        this.Is_ShowPrice = false;
        this.Is_JobOrder = false;
        this.Is_CarCenter = false;
        this.TechRepType = 0;
        this.Quickly_INV = 0;
        this.AutoCode = false;
        this.previousUUID = '';
        this.StatusRemark = '';
        this.StatusOpen = 0;
        this.IsArchive = false;
        this.StatusFlag = '';
    }
}
class IQ_ItemQtyHanging extends CustomClass {
    constructor() {
        super();
        this.ItemID = 0;
        this.TransID = 0;
        this.HangingQty = 0;
        this.compcode = 0;
        this.TrType = 0;
        this.TrNo = 0;
        this.SaleDate = '';
        this.Type = '';
        this.StatusFlag = '';
    }
}
class IQ_ItemUnites extends CustomClass {
    constructor() {
        super();
        this.ItemUnitID = 0;
        this.ItemID = 0;
        this.UnitID = 0;
        this.Remarks = '';
        this.DescA = '';
        this.UnitCode = '';
        this.Rate = 0;
        this.Quantity = 0;
        this.UnitPrice = 0;
        this.CostPrice = 0;
        this.CompCode = 0;
        this.ISActive = false;
        this.QRCode = '';
        this.backgroundColor = '';
        this.FontColor = '';
        this.TypeUsing = 0;
        this.IsService = false;
        this.Image = '';
        this.StatusFlag = '';
    }
}
class IQ_KSATaxInvHeader extends CustomClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.InvoiceID = 0;
        this.TrNo = 0;
        this.TrDate = '';
        this.TrTime = '';
        this.invoiceStatus = 0;
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.TaxStatus = 0;
        this.DocUUID = '';
        this.DocNo = '';
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash = '';
        this.RefNO = '';
        this.InstructionNote = '';
        this.QRCode = '';
        this.SalesOrderRef = '';
        this.SalesOrderDescr = '';
        this.DeliverydateFrom = '';
        this.DeliverydateTo = '';
        this.PaymentMeanCode = 0;
        this.purchaseorderDesc = '';
        this.perofrmainvoiceno = '';
        this.Cus_Name = '';
        this.Cus_VatNo = '';
        this.Cus_BuildingNumber = '';
        this.Cus_CityName = '';
        this.Cus_PostalZone = '';
        this.Cus_StreetName = '';
        this.Cus_governate = '';
        this.Address_District = '';
        this.Address_Build_Additional = '';
        this.Address_Str_Additional = '';
        this.ISPersonal = false;
        this.AdvDedAmount = 0;
        this.AdvDedVat = 0;
        this.AdvDedVatPrc = 0;
        this.AdvDedVatNat = '';
        this.AdvDedReason = '';
        this.AdvDedReasonCode = '';
        this.HDDiscAmount = 0;
        this.HDDiscVat = 0;
        this.HDDiscVatPrc = 0;
        this.HDDiscVatNat = '';
        this.HDDiscReason = '';
        this.HDDiscReasonCode = '';
        this.AllowAmount = 0;
        this.AllowVat = 0;
        this.AllowVatPrc = 0;
        this.AllowVatNat = '';
        this.AllowReason = '';
        this.AllowReasonCode = '';
        this.hd_NetAmount = 0;
        this.Hd_TaxableAmount = 0;
        this.Hd_NetWithTax = 0;
        this.Hd_NetAdditions = 0;
        this.Hd_NetDeduction = 0;
        this.Hd_PaidAmount = 0;
        this.Hd_DueAmount = 0;
        this.Hd_NetTax = 0;
        this.hd_netTaxCaluated = 0;
        this.HD_Round = 0;
        this.StatusFlag = '';
    }
}
class IQ_KSATaxInvItems extends CustomClass {
    constructor() {
        super();
        this.TaxInvoiceID = 0;
        this.TaxInvoiceDetailID = 0;
        this.TaxItemSerial = null;
        this.TaxItemCode = 0;
        this.TaxItemDescr = '';
        this.TaxItemUnit = '';
        this.TaxItemQty = 0;
        this.TaxItemTotal = 0;
        this.TaxItemUnitPrice = 0;
        this.TaxItemNetTotal = 0;
        this.TaxItemDiscPrc = 0;
        this.TaxItemDiscAmt = 0;
        this.TaxItemVatPrc = 0;
        this.TaxItemVatAmt = 0;
        this.VatNatureCode = '';
        this.StatusFlag = '';
    }
}
class IQ_TR_FinancialTransactions extends CustomClass {
    constructor() {
        super();
        this.TransactionID = 0;
        this.TrNo = 0;
        this.RefNo = '';
        this.TransactionDate = '';
        this.CompCode = 0;
        this.TrType = 0;
        this.IsCash = false;
        this.Type = 0;
        this.CashTypeID = 0;
        this.Prc_CashType = 0;
        this.Reason = '';
        this.BeneficiaryName = '';
        this.Amount = 0;
        this.DueAmount = 0;
        this.Status = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.PurchaseID = 0;
        this.TrNo_Ref = 0;
        this.IDPeriod = '';
        this.DescAr = '';
        this.DescEn = '';
        this.FinType = 0;
        this.IDExcel = 0;
        this.LoanPayAmount = 0;
        this.CustodyPayAmount = 0;
        this.ChargePrc = 0;
        this.StatusFlag = '';
    }
}
class IQ_TR_FinancialTransactionsPateners extends CustomClass {
    constructor() {
        super();
        this.TransactionID = 0;
        this.TrNo = 0;
        this.RefNo = '';
        this.TransactionDate = '';
        this.CompCode = 0;
        this.TrType = 0;
        this.IsCash = false;
        this.Type = 0;
        this.CashTypeID = 0;
        this.Prc_CashType = 0;
        this.Reason = '';
        this.BeneficiaryName = '';
        this.Amount = 0;
        this.DueAmount = 0;
        this.Status = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.PurchaseID = 0;
        this.TrNo_Ref = 0;
        this.IDPeriod = '';
        this.DescAr = '';
        this.DescEn = '';
        this.FinType = 0;
        this.IDExcel = 0;
        this.LoanPayAmount = 0;
        this.CustodyPayAmount = 0;
        this.StatusFlag = '';
    }
}
class IQ_TR_Link_FinancialTransactions_Inv extends CustomClass {
    constructor() {
        super();
        this.TransactionID = 0;
        this.TrNo = 0;
        this.RefNo = '';
        this.TransactionDate = '';
        this.CompCode = 0;
        this.TrType = 0;
        this.IsCash = false;
        this.Type = 0;
        this.CashTypeID = 0;
        this.Prc_CashType = 0;
        this.Reason = '';
        this.BeneficiaryName = '';
        this.Amount = 0;
        this.DueAmount = 0;
        this.Status = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.TrNo_Ref = 0;
        this.IDPeriod = '';
        this.DescAr = '';
        this.DescEn = '';
        this.FinType = 0;
        this.IDExcel = 0;
        this.LoanPayAmount = 0;
        this.CustodyPayAmount = 0;
        this.CustomerID = 0;
        this.StatusFlag = '';
    }
}
class IQ_TR_Link_FinancialTransactions_Pur extends CustomClass {
    constructor() {
        super();
        this.TransactionID = 0;
        this.TrNo = 0;
        this.RefNo = '';
        this.TransactionDate = '';
        this.CompCode = 0;
        this.TrType = 0;
        this.IsCash = false;
        this.Type = 0;
        this.CashTypeID = 0;
        this.Prc_CashType = 0;
        this.Reason = '';
        this.BeneficiaryName = '';
        this.Amount = 0;
        this.DueAmount = 0;
        this.Status = 0;
        this.Remarks = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.TrNo_Ref = 0;
        this.IDPeriod = '';
        this.DescAr = '';
        this.DescEn = '';
        this.FinType = 0;
        this.IDExcel = 0;
        this.LoanPayAmount = 0;
        this.CustodyPayAmount = 0;
        this.PurchaseID = 0;
        this.SupplierID = 0;
        this.StatusFlag = '';
    }
}
class IQ_TR_PurchaseDetails extends CustomClass {
    constructor() {
        super();
        this.PurchaseDetailID = 0;
        this.PurchaseID = 0;
        this.ItemID = 0;
        this.ItemUnitID = 0;
        this.Rate = 0;
        this.VatPrc = 0;
        this.DiscountPrc = 0;
        this.RemainRetQty = 0;
        this.UnitPrice = 0;
        this.VatAmount = 0;
        this.CostPrice = 0;
        this.OneHandQuantity = 0;
        this.Ser = 0;
        this.IsService = false;
        this.ItemCode = '';
        this.ItemName = '';
        this.ItemFamilyID = 0;
        this.VatTypeID = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.NetAfterVat = 0;
        this.CatID = 0;
        this.RetQty = 0;
        this.Quantity = 0;
        this.StatusFlag = '';
    }
}
class IQ_TR_Purchases extends CustomClass {
    constructor() {
        super();
        this.PurchaseID = 0;
        this.TrNo = 0;
        this.TrType = 0;
        this.DoNo = '';
        this.ReNo = '';
        this.IsCash = false;
        this.CashType = 0;
        this.CompCode = 0;
        this.TrTime = '';
        this.Status = 0;
        this.SupplierName = '';
        this.Mobile = '';
        this.ItemsTotal = 0;
        this.Discount = 0;
        this.TotalAmount = 0;
        this.VatTypeID = 0;
        this.VatAmount = 0;
        this.ChargePrc = 0;
        this.NetAmount = 0;
        this.RemainAmount = 0;
        this.PaymentAmount = 0;
        this.IsService = false;
        this.SupplierID = 0;
        this.Remarks = '';
        this.VoucherNo = 0;
        this.IsPosted = false;
        this.QRCode = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.InvoiceTransCode = 0;
        this.DocUUID = '';
        this.IDPeriod = '';
        this.DescPayType = '';
        this.RefID = 0;
        this.GlobalNo = 0;
        this.PurOrderID = 0;
        this.PurOrderNo = '';
        this.PurDate = '';
        this.IDExcel = 0;
        this.PaymentType = '';
        this.PaymentTerms = '';
        this.DueAmount = 0;
        this.StatusFlag = '';
    }
}
class IQ_TR_SaleDetails extends CustomClass {
    constructor() {
        super();
        this.SaleDetailID = 0;
        this.SaleID = 0;
        this.ItemID = 0;
        this.ItemUnitID = 0;
        this.Rate = 0;
        this.VatPrc = 0;
        this.DiscountPrc = 0;
        this.RemainRetQty = 0;
        this.UnitPrice = 0;
        this.VatAmount = 0;
        this.CostPrice = 0;
        this.OneHandQuantity = 0;
        this.Ser = 0;
        this.IsService = false;
        this.ItemCode = '';
        this.ItemName = '';
        this.ItemFamilyID = 0;
        this.VatTypeID = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.NetAfterVat = 0;
        this.CatID = 0;
        this.Quantity = 0;
        this.RetQty = 0;
        this.NameItem = '';
        this.StatusFlag = '';
    }
}
class IQ_TR_Sales extends CustomClass {
    constructor() {
        super();
        this.SaleID = 0;
        this.TrNo = 0;
        this.TrType = 0;
        this.DoNo = '';
        this.ReNo = '';
        this.IsCash = false;
        this.CashType = 0;
        this.SaleDate = '';
        this.CompCode = 0;
        this.TrTime = '';
        this.Status = 0;
        this.CustomerName = '';
        this.Mobile = '';
        this.ItemsTotal = 0;
        this.Discount = 0;
        this.TotalAmount = 0;
        this.VatTypeID = 0;
        this.VatAmount = 0;
        this.ChargePrc = 0;
        this.NetAmount = 0;
        this.RemainAmount = 0;
        this.PaymentAmount = 0;
        this.IsService = false;
        this.CustomerID = 0;
        this.Remarks = '';
        this.VoucherNo = 0;
        this.IsPosted = false;
        this.QRCode = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.InvoiceTransCode = 0;
        this.TaxStatus = 0;
        this.DocUUID = '';
        this.PrevInvoiceHash = '';
        this.IDPeriod = '';
        this.DescPayType = '';
        this.RefID = 0;
        this.GlobalNo = 0;
        this.ShowPriceID = 0;
        this.ShowPriceNo = '';
        this.JobOrderNo = '';
        this.JobOrderID = 0;
        this.DeliveryTime = '';
        this.ExpiryTime = '';
        this.PaymentType = '';
        this.PaymentTerms = '';
        this.AttatchName = '';
        this.SalesManMobile = '';
        this.SalesManName = '';
        this.SalesManID = 0;
        this.Warrantyperiod = '';
        this.CarBrand = '';
        this.CarNo = '';
        this.DestructionKm = '';
        this.EngineerName = '';
        this.DueAmount = 0;
        this.ExternalAmount = 0;
        this.JobRefNO = '';
        this.TaxErrorCode = 0;
        this.IDExcel = 0;
        this.DedTaxAmount = 0;
        this.TaxID = 0;
        this.CurrenyID = 0;
        this.TaxPrc = 0;
        this.Rate_Currency = 0;
        this.InvType = 0;
        this.purchaseorderDesc = '';
        this.purchaseorderCode = '';
        this.ChassisNo = '';
        this.StatusFlag = '';
    }
}
class IQ_View_JobOrder extends CustomClass {
    constructor() {
        super();
        this.SaleID = 0;
        this.TrNo = 0;
        this.TrType = 0;
        this.GlobalNo = 0;
        this.DoNo = '';
        this.RefID = 0;
        this.ReNo = '';
        this.IsCash = false;
        this.CashType = 0;
        this.SaleDate = '';
        this.CompCode = 0;
        this.TrTime = '';
        this.Status = 0;
        this.CustomerName = '';
        this.Mobile = '';
        this.SalesManID = 0;
        this.SalesManName = '';
        this.SalesManMobile = '';
        this.AttatchName = '';
        this.ItemsTotal = 0;
        this.Discount = 0;
        this.TotalAmount = 0;
        this.VatTypeID = 0;
        this.VatAmount = 0;
        this.ChargePrc = 0;
        this.NetAmount = 0;
        this.DueAmount = 0;
        this.RemainAmount = 0;
        this.PaymentAmount = 0;
        this.IsService = false;
        this.CustomerID = 0;
        this.Remarks = '';
        this.VoucherNo = 0;
        this.IsPosted = false;
        this.QRCode = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.InvoiceTransCode = 0;
        this.TaxStatus = 0;
        this.DocUUID = '';
        this.PrevInvoiceHash = '';
        this.IDPeriod = '';
        this.PaymentTerms = '';
        this.PaymentType = '';
        this.ExpiryTime = '';
        this.DeliveryTime = '';
        this.TaxErrorCode = 0;
        this.ShowPriceID = 0;
        this.ShowPriceNo = '';
        this.JobOrderID = 0;
        this.JobOrderNo = '';
        this.Warrantyperiod = '';
        this.CarBrand = '';
        this.CarNo = '';
        this.DestructionKm = '';
        this.EngineerName = '';
        this.ChassisNo = '';
        this.StatusFlag = '';
    }
}
class IQ_View_User_Log extends CustomClass {
    constructor() {
        super();
        this.LogID = 0;
        this.UserID = '';
        this.NameUser = '';
        this.RoleDescA = '';
        this.RoleIds = '';
        this.TrType = '';
        this.Mode = '';
        this.Remarks = '';
        this.Date = '';
        this.IsSuccess = false;
        this.ID_Device = '';
        this.DeviceType = '';
        this.NameBrowser = '';
        this.TransID = 0;
        this.CompCode = 0;
        this.CodeRun = '';
        this.StatusFlag = '';
    }
}
class IQ_ViewItems extends CustomClass {
    constructor() {
        super();
        this.ItemID = 0;
        this.CompCode = 0;
        this.ItemCode = '';
        this.ItemName = '';
        this.ItemFamilyID = 0;
        this.FamilyCode = '';
        this.FamilyDescA = '';
        this.CatID = 0;
        this.CatCode = '';
        this.CatDescA = '';
        this.ISActive = false;
        this.Remarks = '';
        this.CostPrice = 0;
        this.UnitPrice = 0;
        this.OneHandQuantity = 0;
        this.backgroundColor = '';
        this.FontColor = '';
        this.IsService = false;
        this.QtyOpenBalances = 0;
        this.Quantity = 0;
        this.HangingQty = 0;
        this.NetQty = 0;
        this.ItemTaxID = 0;
        this.ItemCode_EG = '';
        this.NameA_EG = '';
        this.NameE_EG = '';
        this.Image = '';
        this.StatusFlag = '';
    }
}
class PurchaseMasterDetail extends CustomClass {
    constructor() {
        super();
        this.PurchaseID = 0;
        this.TrNo = 0;
        this.TrType = 0;
        this.DoNo = '';
        this.ReNo = '';
        this.IsCash = false;
        this.CashType = 0;
        this.CompCode = 0;
        this.TrTime = '';
        this.Status = 0;
        this.SupplierName = '';
        this.Mobile = '';
        this.ItemsTotal = 0;
        this.Discount = 0;
        this.TotalAmount = 0;
        this.VatTypeID = 0;
        this.VatAmount = 0;
        this.ChargePrc = 0;
        this.NetAmount = 0;
        this.RemainAmount = 0;
        this.PaymentAmount = 0;
        this.IsService = false;
        this.SupplierID = 0;
        this.Remarks = '';
        this.VoucherNo = 0;
        this.IsPosted = false;
        this.QRCode = '';
        this.IDUserCreate = 0;
        this.CreatedAt = '';
        this.CreatedBy = '';
        this.UpdatedAt = '';
        this.UpdatedBy = '';
        this.InvoiceTransCode = 0;
        this.DocUUID = '';
        this.IDPeriod = '';
        this.DescPayType = '';
        this.RefID = 0;
        this.GlobalNo = 0;
        this.PurOrderID = 0;
        this.PurOrderNo = '';
        this.PurDate = '';
        this.IDExcel = 0;
        this.PaymentType = '';
        this.PaymentTerms = '';
        this.DueAmount = 0;
        this.ItemIDs = '';
        this.StatusFlag = '';
    }
}
class sysdiagrams extends CustomClass {
    constructor() {
        super();
        this.name = '';
        this.principal_id = 0;
        this.diagram_id = 0;
        this.version = 0;
        this.definition = null;
        this.StatusFlag = '';
    }
}
class TempCustomer extends CustomClass {
    constructor() {
        super();
        this.CustomerId = 0;
        this.CustomerCODE = '';
        this.NAMEA = '';
        this.NAMEE = '';
        this.EMAIL = '';
        this.REMARKS = '';
        this.MOBILE = '';
        this.MOBILE2 = '';
        this.AccountNo = '';
        this.CompCode = 0;
        this.CREATED_BY = '';
        this.CREATED_AT = '';
        this.UPDATED_AT = '';
        this.UPDATED_BY = '';
        this.VATType = 0;
        this.VatNo = '';
        this.Isactive = false;
        this.CreditLimit = 0;
        this.CreditPeriod = 0;
        this.Debit = 0;
        this.Credit = 0;
        this.PreviousDebit = 0;
        this.PreviousCredit = 0;
        this.Openbalance = 0;
        this.PaymentType = 0;
        this.IsCreditCustomer = false;
        this.Address_postal = '';
        this.Address_Province = '';
        this.GroupVatNo = '';
        this.Address_Street = '';
        this.Address_Str_Additional = '';
        this.Address_BuildingNo = '';
        this.Address_Build_Additional = '';
        this.Address_City = '';
        this.Address_District = '';
        this.Address_Floor = '';
        this.Address_Room = '';
        this.Address_LandMarks = '';
        this.SalesInvoiceNature = 0;
        this.ISPersonal = false;
        this.OpenbalanceAt = '';
        this.CarBrand = '';
        this.CarNo = '';
        this.DestructionKm = '';
        this.DrivingNum = '';
        this.NationalityID = 0;
        this.IDExcel = 0;
        this.StatusFlag = '';
    }
}
class VAT_PERIOD extends CustomClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.VAT_YEAR = 0;
        this.PERIOD_CODE = 0;
        this.FROM_DATE = '';
        this.TO_DATE = '';
        this.STATUS = 0;
        this.StatusFlag = '';
    }
}
class Z_G_Lnk_Build_DetailJournal extends CustomClass {
    constructor() {
        super();
        this.ID_Build = 0;
        this.CompCode = 0;
        this.KeyTrans = '';
        this.DescA_FelidLnk = '';
        this.IsOutFelidTable = false;
        this.NameFelidForeignKeyInTable_Lnk = '';
        this.NameOutTableGetData = '';
        this.NamePrimaryKeyOutTable = '';
        this.NameFelidAcc = '';
        this.NameFelidAmount_InTableLnk = '';
        this.IsCredit = false;
        this.NameFelidRemarks = '';
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
class Z_G_Lnk_Create_DirectJournal extends CustomClass {
    constructor() {
        super();
        this.ID_Lnk = 0;
        this.CompCode = 0;
        this.SerRun = 0;
        this.TransType = '';
        this.KeyTrans = '';
        this.DescA_FelidLnk = '';
        this.NameTableMaster = '';
        this.NameFelidMasterID = '';
        this.NameFelidMasterTrNo = '';
        this.NameFelidCondtionDate = '';
        this.NameFelidCondtionCustom = '';
        this.NameFelidMasterUserID = '';
        this.NameFelidMasterIDExcel = '';
        this.IsAutoDayShift = false;
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
class Z_G_Lnk_CreateAccount extends CustomClass {
    constructor() {
        super();
        this.ID_Lnk = 0;
        this.CompCode = 0;
        this.KeyTrans = '';
        this.DescTrans = '';
        this.StartNameAcc = '';
        this.Father_Acc_Code = '';
        this.Acc_Code = '';
        this.AccPrefix = '';
        this.LastNumber = '';
        this.NameTableMaster = '';
        this.NameFelidMasterID = '';
        this.NameFelidTableCompCode = '';
        this.NameFelidTableNameA = '';
        this.NameFelidTableNameE = '';
        this.NameFelidAcc_Code = '';
        this.NameFelidExpr = '';
        this.IsUpdateCode = false;
        this.NameFelidCode = '';
        this.IsActive = false;
        this.StatusFlag = '';
    }
}
//# sourceMappingURL=Entities_DataBase.js.map