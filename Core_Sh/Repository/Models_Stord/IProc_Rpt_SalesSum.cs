using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_SalesSum
     {
        public  decimal  Sales_Value  { get; set; }
        public  decimal  Sales_Vat  { get; set; }
        public  decimal  Sales_Disc  { get; set; }
        public  decimal?  Total_Sales  { get; set; }
        public  decimal  Ret_Value  { get; set; }
        public  decimal  Ret_Vat  { get; set; }
        public  decimal  Ret_Disc  { get; set; }
        public  decimal?  Total_Ret  { get; set; }
        public  decimal?  Net_Value  { get; set; }
        public  decimal?  Net_Vat  { get; set; }
        public  decimal?  Net_Disc  { get; set; }
        public  decimal?  Net_Due  { get; set; }

     }

 }
