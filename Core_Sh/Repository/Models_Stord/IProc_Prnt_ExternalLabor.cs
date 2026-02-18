using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Prnt_ExternalLabor
     {
        public  int  Tr_TransactionID  { get; set; }
        public  int?  TrNo  { get; set; }
        public  string  Tr_RefNo  { get; set; }
        public  DateTime?  Tr_TransactionDate  { get; set; }
        public  int  Comp_COMP_CODE  { get; set; }
        public  string  Comp_NameA  { get; set; }
        public  string  Comp_NameE  { get; set; }
        public  int  Us_ID  { get; set; }
        public  string  Us_USER_NAME  { get; set; }
        public  int?  Tr_TrType  { get; set; }
        public  bool?  Tr_IsCash  { get; set; }
        public  int  CashTyp_CashTypeID  { get; set; }
        public  string  CashTyp_Description  { get; set; }
        public  decimal?  Tr_Amount  { get; set; }
        public  decimal?  Tr_DueAmount  { get; set; }
        public  int?  Tr_Status  { get; set; }
        public  string  Tr_Remarks  { get; set; }
        public  int?  SaleID  { get; set; }
        public  int?  Sls_TrNo  { get; set; }
        public  string  CustomerCODE  { get; set; }
        public  string  CustomerName  { get; set; }
        public  string  Cust_MOBILE  { get; set; }
        public  string  BeneficiaryName  { get; set; }
        public  string  Reason  { get; set; }
        public  int?  FinType_FinancialTypeID  { get; set; }
        public  int?  FinType_TrType  { get; set; }
        public  bool?  FinType_IsActive  { get; set; }
        public  string  Tfkeet  { get; set; }

     }

 }
