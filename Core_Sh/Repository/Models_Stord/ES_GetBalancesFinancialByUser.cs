using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class ES_GetBalancesFinancialByUser
     {
        public  string  AccCode  { get; set; }
        public  string  AccName  { get; set; }
        public  string  TypeFinancialE  { get; set; }
        public  string  TypeFinancialA  { get; set; }
        public  decimal?  Amount  { get; set; }

     }

 }
