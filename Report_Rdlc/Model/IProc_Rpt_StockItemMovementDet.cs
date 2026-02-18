using System;
 
 namespace Report_Rdlc
 {
      public partial class IProc_Rpt_StockItemMovementDet
     {
        public  string  ParFromDate  { get; set; }
        public  string  ParTodate  { get; set; }
        public  string  ParFamDescAr  { get; set; }
        public  string  ParFamDescEn  { get; set; }
        public  string  ParItemDescAr  { get; set; }
        public  string  ParItemDescEn  { get; set; }
        public  int?  Ser  { get; set; }
        public  string  TypeTrans  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  ItemFamilyID  { get; set; }
        public  int?  ItemID  { get; set; }
        public  string  ItemName  { get; set; }
        public  int?  TrNo  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  decimal?  InQty  { get; set; }
        public  decimal?  OutQty  { get; set; }
        public  decimal?  InCost  { get; set; }
        public  decimal?  OutCost  { get; set; }
        public  decimal?  InPrice  { get; set; }
        public  decimal?  OutPrice  { get; set; }
        public  bool?  IsService  { get; set; }

     }

 }
