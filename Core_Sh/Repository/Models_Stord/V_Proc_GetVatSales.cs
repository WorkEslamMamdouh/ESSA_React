using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class V_Proc_GetVatSales
     {
        public  string  Describtion  { get; set; }
        public  decimal  SalesTotal  { get; set; }
        public  decimal  ReturnSales  { get; set; }
        public  decimal?  VatAmount  { get; set; }

     }

 }
