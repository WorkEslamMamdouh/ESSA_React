using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_FinancialCovenantStatmentNew
     {
        public  string  ParFromdate  { get; set; }
        public  string  ParTodate  { get; set; }
        public  int  IDTrans  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  decimal?  FinancialAmount  { get; set; }
        public  decimal?  FinancialDistAmount  { get; set; }
        public  decimal?  FinancialCollectAmount  { get; set; }
        public  decimal?  FinancialPaidAmount  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  string  JobTitle  { get; set; }

     }

 }
