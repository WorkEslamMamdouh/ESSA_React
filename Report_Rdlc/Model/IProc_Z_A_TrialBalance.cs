using System;
 
 namespace Report_Rdlc
 {
      public partial class IProc_Z_A_TrialBalance
     {
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  string  ACC_DESCL  { get; set; }
        public  decimal?  Total_DEBIT  { get; set; }
        public  decimal?  Total_CREDIT  { get; set; }
        public  decimal?  Total_Balance  { get; set; }
        public  string  PARENT_ACC  { get; set; }
        public  int?  ACC_LEVEL  { get; set; }
        public  bool?  DETAIL  { get; set; }
        public  int?  ACC_GROUP  { get; set; }

     }

 }
