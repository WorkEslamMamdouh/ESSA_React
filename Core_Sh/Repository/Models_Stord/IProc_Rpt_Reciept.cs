using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_Reciept
     {
        public  string  Par_FromDate  { get; set; }
        public  string  Par_ToDate  { get; set; }
        public  string  Par_StatusDescAr  { get; set; }
        public  string  Par_StatusDescEn  { get; set; }
        public  string  Par_FinTypeDescA  { get; set; }
        public  string  Par_FinTypeDescE  { get; set; }
        public  string  Par_CashTypeAr  { get; set; }
        public  string  Par_CashTypeEn  { get; set; }
        public  string  Par_CustomerAr  { get; set; }
        public  string  Par_CustomerEn  { get; set; }
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
        public  int  Sls_SaleID  { get; set; }
        public  int  Sls_TrNo  { get; set; }
        public  decimal  Sls_NetAmount  { get; set; }
        public  decimal  Sls_RemainAmount  { get; set; }
        public  decimal  Sls_PaymentAmount  { get; set; }
        public  string  Cus_CustomerCODE  { get; set; }
        public  string  Cus_NAMEA  { get; set; }
        public  string  Cus_MOBILE  { get; set; }
        public  int?  FinType_FinancialTypeID  { get; set; }
        public  int?  FinType_TrType  { get; set; }
        public  string  FinType_DescAr  { get; set; }
        public  string  FinType_DescEn  { get; set; }
        public  bool?  FinType_IsActive  { get; set; }

     }

 }
