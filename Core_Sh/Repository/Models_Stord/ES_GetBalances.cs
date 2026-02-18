using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class ES_GetBalances
     {
        public  string  Acc_Code  { get; set; }
        public  string  Custody_Code  { get; set; }
        public  string  Loan_Code  { get; set; }
        public  decimal?  AccDEBIT  { get; set; }
        public  decimal?  AccCREDIT  { get; set; }
        public  decimal?  AccBalance  { get; set; }
        public  decimal?  CustodyDEBIT  { get; set; }
        public  decimal?  CustodyCREDIT  { get; set; }
        public  decimal?  CustodyBalance  { get; set; }
        public  decimal?  LoanDEBIT  { get; set; }
        public  decimal?  LoanCREDIT  { get; set; }
        public  decimal?  LoanBalance  { get; set; }

     }

 }
