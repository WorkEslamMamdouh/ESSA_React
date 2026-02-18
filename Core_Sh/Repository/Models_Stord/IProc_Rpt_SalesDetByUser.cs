using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_SalesDetByUser
     {
        public  string  Par_FromDate  { get; set; }
        public  string  Par_ToDate  { get; set; }
        public  string  Par_TrType_Desc  { get; set; }
        public  string  Par_StatusDesc  { get; set; }
        public  string  Par_CashType  { get; set; }
        public  int  Sls_SaleID  { get; set; }
        public  string  Sls_TrNo  { get; set; }
        public  int?  Sls_Trtype  { get; set; }
        public  bool?  Sls_IsCash  { get; set; }
        public  DateTime?  Sls_SaleDate  { get; set; }
        public  TimeSpan?  Sls_TrTime  { get; set; }
        public  int?  Sls_Status  { get; set; }
        public  int?  CashTyp_ID  { get; set; }
        public  string  CashTyp_Desc  { get; set; }
        public  decimal?  Sls_ItemsTotal  { get; set; }
        public  decimal?  Sls_Discount  { get; set; }
        public  decimal?  Sls_TotalAmount  { get; set; }
        public  decimal?  Sls_VatAmount  { get; set; }
        public  decimal?  Sls_NetAmount  { get; set; }
        public  decimal?  Sls_RemainAmount  { get; set; }
        public  decimal?  Sls_PaymentAmount  { get; set; }
        public  int  Comp_Code  { get; set; }
        public  string  Comp_NameA  { get; set; }
        public  string  Comp_NameE  { get; set; }
        public  string  User_Name  { get; set; }
        public  int?  User_ID  { get; set; }
        public  int  SaleDetailID  { get; set; }
        public  int  ItemID  { get; set; }
        public  string  ItemName  { get; set; }
        public  string  ItemCode  { get; set; }
        public  decimal?  Quantity  { get; set; }
        public  decimal?  UnitPrice  { get; set; }
        public  decimal?  DiscountAmount  { get; set; }
        public  decimal?  DiscountPrc  { get; set; }
        public  decimal?  NetUnitPrice  { get; set; }
        public  decimal?  ItemTotal  { get; set; }
        public  decimal?  VatPrc  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  decimal?  NetAfterVat  { get; set; }

     }

 }
