using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_AccountStatment
     {
        public  int?  COMP_CODE  { get; set; }
        public  int?  TYPE_CODE  { get; set; }
        public  int?  VOUCHER_CODE  { get; set; }
        public  int?  TrNo  { get; set; }
        public  DateTime?  VOUCHER_DATE  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  int?  VOUCHER_SERIAL  { get; set; }
        public  decimal?  DEBIT  { get; set; }
        public  decimal?  CREDIT  { get; set; }
        public  string  TypeTans  { get; set; }
        public  string  DESCA  { get; set; }
        public  string  DESCL  { get; set; }

     }

 }
