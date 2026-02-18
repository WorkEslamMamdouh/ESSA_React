using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Prnt_ItemSalesSum
     {
        public  int  TrNo  { get; set; }
        public  DateTime?  SaleDate  { get; set; }
        public  int?  TrType  { get; set; }
        public  bool?  IsCash  { get; set; }
        public  decimal?  TotalAmount  { get; set; }
        public  decimal?  Discount  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  decimal?  NetAmount  { get; set; }
        public  bool?  IsService  { get; set; }
        public  string  Remarks  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }

     }

 }
