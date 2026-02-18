using System;
 
 namespace Report_Rdlc
 {
      public partial class IProc_Rpt_TaxReport
     {
        public  string  NameA  { get; set; }
        public  string  NameE  { get; set; }
        public  int  PERIOD_CODE  { get; set; }
        public  DateTime?  FROM_DATE  { get; set; }
        public  DateTime?  TO_DATE  { get; set; }
        public  int?  COMP_CODE  { get; set; }
        public  string  Describtion  { get; set; }
        public  int  Type  { get; set; }
        public  decimal?  SalesTotal  { get; set; }
        public  decimal?  ReturnSales  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  decimal?  slsVat  { get; set; }
        public  decimal?  purVat  { get; set; }

     }

 }
