using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Prnt_ItemPurDet
     {
        public  int  TrNo  { get; set; }
        public  DateTime?  PurDate  { get; set; }
        public  int?  TrType  { get; set; }
        public  bool?  IsCash  { get; set; }
        public  int?  status  { get; set; }
        public  decimal?  TotalAmount  { get; set; }
        public  decimal  PurchaseExpenses  { get; set; }
        public  decimal?  NetAmount  { get; set; }
        public  decimal?  RemainAmount  { get; set; }
        public  string  Remarks  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  string  SupplierName  { get; set; }
        public  int?  SupplierID  { get; set; }
        public  int  ItemID  { get; set; }
        public  string  ItemCode  { get; set; }
        public  string  ItemName  { get; set; }
        public  int?  Quantity  { get; set; }
        public  decimal?  UnitPrice  { get; set; }
        public  decimal?  TotalPrice  { get; set; }
        public  string  UnitDesc  { get; set; }

     }

 }
