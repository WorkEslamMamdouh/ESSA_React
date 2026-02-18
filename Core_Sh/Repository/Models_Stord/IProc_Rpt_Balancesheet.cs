using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_Balancesheet
     {
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  string  PARENT_ACC  { get; set; }
        public  decimal  OpenDebit  { get; set; }
        public  decimal  OpenCredit  { get; set; }
        public  decimal  CurDebit  { get; set; }
        public  decimal  CurCredit  { get; set; }
        public  decimal?  Finaldebit  { get; set; }
        public  decimal?  FinalCredit  { get; set; }

     }

 }
