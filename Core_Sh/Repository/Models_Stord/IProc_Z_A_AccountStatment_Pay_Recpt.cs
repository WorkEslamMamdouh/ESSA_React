using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Z_A_AccountStatment_Pay_Recpt
     {
        public  string  Comp_NameA  { get; set; }
        public  string  Comp_NameE  { get; set; }
        public  DateTime?  Par_FromDate  { get; set; }
        public  DateTime?  Par_ToDate  { get; set; }
        public  string  Par_FinTypeDescA  { get; set; }
        public  string  Par_FinTypeDescE  { get; set; }
        public  int  CashTypeID  { get; set; }
        public  string  Trans_Type  { get; set; }
        public  string  Trans_Link_Desc  { get; set; }
        public  int?  Trans_ID  { get; set; }
        public  int?  Trans_No  { get; set; }
        public  int?  Comp_Code  { get; set; }
        public  int?  TrType  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  string  Remarks  { get; set; }
        public  int?  VOUCHER_CODE  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  decimal  DEBIT  { get; set; }
        public  decimal  CREDIT  { get; set; }
        public  decimal  Balance  { get; set; }
        public  int?  IDUser  { get; set; }
        public  int?  IDExcel  { get; set; }
        public  decimal  Amount  { get; set; }
        public  int?  TypeFin  { get; set; }
        public  string  BeneficiaryName  { get; set; }
        public  string  Reason  { get; set; }
        public  string  RefNo  { get; set; }

     }

 }
