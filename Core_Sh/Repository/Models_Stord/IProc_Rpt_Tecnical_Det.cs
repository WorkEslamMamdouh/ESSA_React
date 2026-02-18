using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_Tecnical_Det
     {
        public  string  ParFromDate  { get; set; }
        public  string  ParToDate  { get; set; }
        public  string  ParTechNameAr  { get; set; }
        public  string  ParTechNameEn  { get; set; }
        public  string  EngineerName  { get; set; }
        public  string  SalesManName  { get; set; }
        public  int?  SalesManID  { get; set; }
        public  int?  Dlv_TrNo  { get; set; }
        public  string  JobOrderNo  { get; set; }
        public  int?  Inv_TrNo  { get; set; }
        public  DateTime?  SaleDate  { get; set; }
        public  int  SaleID  { get; set; }
        public  decimal?  Qty_Service  { get; set; }
        public  decimal?  Total_Of_Service  { get; set; }
        public  decimal?  Net_External  { get; set; }
        public  decimal  Dt_Quantity  { get; set; }
        public  decimal  Dt_NetAfterVat  { get; set; }
        public  string  ItemName  { get; set; }

     }

 }
