using System;
 
 namespace Report_Rdlc
 {
      public partial class IProc_Rpt_StockItem
     {
        public  string  ParCatDescAr  { get; set; }
        public  string  ParCatDescEn  { get; set; }
        public  string  ParFamDescAr  { get; set; }
        public  string  ParFamDescEn  { get; set; }
        public  string  ParItemDescAr  { get; set; }
        public  string  ParItemDescEn  { get; set; }
        public  string  ParBalTypeAr  { get; set; }
        public  string  ParBalTypeEn  { get; set; }
        public  string  CompNameAr  { get; set; }
        public  string  CompNameEn  { get; set; }
        public  int  Cat_ID  { get; set; }
        public  string  Cat_DescA  { get; set; }
        public  int  Fam_ID  { get; set; }
        public  string  Fam_Code  { get; set; }
        public  string  Fam_DescA  { get; set; }
        public  int  ItemId  { get; set; }
        public  string  ItemCode  { get; set; }
        public  string  ItemName  { get; set; }
        public  decimal  OpeningQty  { get; set; }
        public  decimal  OpeningCost  { get; set; }
        public  decimal  PurchaseQty  { get; set; }
        public  decimal  PurchaseCost  { get; set; }
        public  decimal  PurchaseQtyRet  { get; set; }
        public  decimal  PurchaseCostRet  { get; set; }
        public  decimal  SaleQty  { get; set; }
        public  decimal  SaleCost  { get; set; }
        public  decimal  SaleQtyRet  { get; set; }
        public  decimal  SaleCostRet  { get; set; }
        public  decimal  QtyInCenter  { get; set; }
        public  decimal  AvailableUnitCost  { get; set; }
        public  decimal  HangingQty  { get; set; }
        public  decimal  AvailableQty  { get; set; }
        public  decimal?  StockCost  { get; set; }

     }

 }
