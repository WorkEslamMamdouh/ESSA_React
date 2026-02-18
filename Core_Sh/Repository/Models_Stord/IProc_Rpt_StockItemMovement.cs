using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_StockItemMovement
     {
        public  string  ParFromDate  { get; set; }
        public  string  ParTodate  { get; set; }
        public  string  ParFamDescAr  { get; set; }
        public  string  ParFamDescEn  { get; set; }
        public  string  ParItemDescAr  { get; set; }
        public  string  ParItemDescEn  { get; set; }
        public  string  Fm_DescA  { get; set; }
        public  int  COMP_CODE  { get; set; }
        public  string  NameA  { get; set; }
        public  string  NameE  { get; set; }
        public  int  ItemFamilyID  { get; set; }
        public  int?  itemid  { get; set; }
        public  string  itemname  { get; set; }
        public  string  ItemCode  { get; set; }
        public  decimal?  PurchaseCost  { get; set; }
        public  decimal?  salesCost  { get; set; }
        public  decimal?  SalesPrice  { get; set; }

     }

 }
