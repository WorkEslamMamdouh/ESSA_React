using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Z_A_AccountStatment_Employees
     {
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

     }

 }
