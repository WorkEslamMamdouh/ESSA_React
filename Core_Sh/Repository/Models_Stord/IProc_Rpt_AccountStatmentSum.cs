using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_AccountStatmentSum
     {
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  decimal?  DEBIT  { get; set; }
        public  decimal?  CREDIT  { get; set; }
        public  decimal?  Balance  { get; set; }

     }

 }
