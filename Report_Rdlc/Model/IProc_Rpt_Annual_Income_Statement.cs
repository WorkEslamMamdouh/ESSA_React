using System;
 
 namespace Report_Rdlc
 {
      public partial class IProc_Rpt_Annual_Income_Statement
     {
        public  string  Type  { get; set; }
        public  int  RepType  { get; set; }
        public  decimal  Sales_SpareParts  { get; set; }
        public  decimal  Sales_Technical  { get; set; }
        public  decimal  COGS  { get; set; }
        public  decimal  ExternalLabor  { get; set; }
        public  decimal  OtherExpenses  { get; set; }
        public  decimal?  NetProfit  { get; set; }
        public  decimal?  NetOperating  { get; set; }

     }

 }
