using System;
 
 namespace Report_Rdlc
 {
      public partial class IProc_Rpt_Expences
     {
        public  string  Par_FromDate  { get; set; }
        public  string  Par_ToDate  { get; set; }
        public  string  Par_StatusDescAr  { get; set; }
        public  string  Par_StatusDescEn  { get; set; }
        public  string  Par_FinTypeDescA  { get; set; }
        public  string  Par_FinTypeDescE  { get; set; }
        public  string  Par_CashTypeAr  { get; set; }
        public  string  Par_CashTypeEn  { get; set; }
        public  string  Par_SupplierAr  { get; set; }
        public  string  Par_SupplierEn  { get; set; }
        public  int  Tr_TransactionID  { get; set; }
        public  string  Tr_RefNo  { get; set; }
        public  DateTime?  Tr_TransactionDate  { get; set; }
        public  int  Comp_COMP_CODE  { get; set; }
        public  string  Comp_NameA  { get; set; }
        public  string  Comp_NameE  { get; set; }
        public  int  Us_ID  { get; set; }
        public  string  Us_USER_NAME  { get; set; }
        public  int?  Tr_TrNo  { get; set; }
        public  int?  Tr_TrType  { get; set; }
        public  bool?  Tr_IsCash  { get; set; }
        public  int  CashTyp_CashTypeID  { get; set; }
        public  string  CashTyp_Description  { get; set; }
        public  decimal?  Tr_Amount  { get; set; }
        public  decimal?  Tr_DueAmount  { get; set; }
        public  int?  Tr_Status  { get; set; }
        public  string  Tr_Remarks  { get; set; }
        public  int?  Sls_SaleID  { get; set; }
        public  int?  Sls_TrNo  { get; set; }
        public  decimal?  Sls_NetAmount  { get; set; }
        public  decimal?  Sls_RemainAmount  { get; set; }
        public  decimal?  Sls_PaymentAmount  { get; set; }
        public  int?  Sup_SupplierCODE  { get; set; }
        public  string  Sup_SupplierName  { get; set; }
        public  string  Sup_MOBILE  { get; set; }
        public  int?  FinType_FinancialTypeID  { get; set; }
        public  int?  FinType_TrType  { get; set; }
        public  string  FinType_DescAr  { get; set; }
        public  string  FinType_DescEn  { get; set; }
        public  bool?  FinType_IsActive  { get; set; }

     }

 }
