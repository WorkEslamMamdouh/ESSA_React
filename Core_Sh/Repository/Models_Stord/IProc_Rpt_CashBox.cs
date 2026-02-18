using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_CashBox
     {
        public  int?  TypeVoucher  { get; set; }
        public  string  BeneficiaryName  { get; set; }
        public  int?  TrNo  { get; set; }
        public  string  DescAr  { get; set; }
        public  string  Description  { get; set; }
        public  decimal?  Debit  { get; set; }
        public  decimal?  Credit  { get; set; }
        public  string  Remarks  { get; set; }
        public  DateTime?  TransactionDate  { get; set; }

     }

 }
