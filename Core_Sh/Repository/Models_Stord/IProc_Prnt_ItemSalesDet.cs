using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Prnt_ItemSalesDet
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
        public  int  ItemID  { get; set; }
        public  string  ItemCode  { get; set; }
        public  string  ItemName  { get; set; }
        public  int?  Quantity  { get; set; }
        public  decimal?  UnitPrice  { get; set; }
        public  decimal?  TotalPrice  { get; set; }
        public  string  UnitDesc  { get; set; }

     }

 }
