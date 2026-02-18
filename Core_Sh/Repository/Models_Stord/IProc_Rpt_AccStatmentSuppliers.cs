using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_AccStatmentSuppliers
     {
        public  string  ToDate  { get; set; }
        public  string  SupplierName  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  int?  TrNo  { get; set; }
        public  string  PONO  { get; set; }
        public  decimal?  Credit  { get; set; }
        public  decimal?  Debit  { get; set; }
        public  string  Remarks  { get; set; }

     }

 }
