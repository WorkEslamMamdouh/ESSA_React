using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_FinancialCovenantStatment
     {
        public  int  IDCovenant  { get; set; }
        public  int  IDTypeCovenant  { get; set; }
        public  long  USERID  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  DescA  { get; set; }
        public  string  Remark  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  int?  TrType  { get; set; }
        public  decimal?  Amount  { get; set; }
        public  decimal?  PayAmount  { get; set; }
        public  decimal?  RemainAmount  { get; set; }
        public  int?  Status  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  int?  VoucherNo  { get; set; }
        public  string  Dt_DescA  { get; set; }
        public  string  Dt_Remark  { get; set; }
        public  DateTime?  Dt_TrDate  { get; set; }
        public  decimal?  Dt_Amount  { get; set; }
        public  DateTime?  Dt_CreatedAt  { get; set; }
        public  string  Dt_CreatedBy  { get; set; }
        public  DateTime?  Dt_UpdatedAt  { get; set; }
        public  string  Dt_UpdatedBy  { get; set; }
        public  int  Dt_IDCovenantDetail  { get; set; }
        public  string  USER_NAME  { get; set; }

     }

 }
