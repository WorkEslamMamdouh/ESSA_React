using System;
 
 namespace Report_Rdlc
 {
      public partial class IProc_Rpt_SupplierPurDet
     {
        public  string  Par_FromDate  { get; set; }
        public  string  Par_ToDate  { get; set; }
        public  string  Par_TrType_DescAr  { get; set; }
        public  string  Par_TrType_DescEn  { get; set; }
        public  string  Par_StatusDescAr  { get; set; }
        public  string  Par_StatusDescEn  { get; set; }
        public  string  Par_CashTypeAr  { get; set; }
        public  string  Par_CashTypeEn  { get; set; }
        public  string  Par_SupplierAr  { get; set; }
        public  string  Par_SupplierEn  { get; set; }
        public  int  Pur_SaleID  { get; set; }
        public  string  Pur_TrNo  { get; set; }
        public  int?  Pur_Trtype  { get; set; }
        public  bool?  Pur_IsCash  { get; set; }
        public  DateTime?  Pur_PurDate  { get; set; }
        public  TimeSpan?  Pur_TrTime  { get; set; }
        public  int?  Pur_Status  { get; set; }
        public  int?  Sup_SupplierID  { get; set; }
        public  string  Pur_CustomerName  { get; set; }
        public  string  Sup_SupplierCODEAr  { get; set; }
        public  string  Sup_SupplierCODEEn  { get; set; }
        public  int  CashTyp_ID  { get; set; }
        public  string  CashTyp_DescAr  { get; set; }
        public  string  CashTyp_DescEn  { get; set; }
        public  decimal?  Pur_ItemsTotal  { get; set; }
        public  decimal?  Pur_Discount  { get; set; }
        public  decimal?  Pur_TotalAmount  { get; set; }
        public  decimal?  Pur_VatAmount  { get; set; }
        public  decimal?  Pur_NetAmount  { get; set; }
        public  decimal?  Pur_RemainAmount  { get; set; }
        public  decimal?  Pur_PaymentAmount  { get; set; }
        public  int  Comp_Code  { get; set; }
        public  string  Comp_NameA  { get; set; }
        public  string  Comp_NameE  { get; set; }
        public  int  Sup_VatNo  { get; set; }
        public  bool?  Sup_IsCreditCustomer  { get; set; }
        public  int  Sup_ISPersonal  { get; set; }
        public  string  User_Name  { get; set; }
        public  int  User_ID  { get; set; }
        public  int  PurchaseDetailID  { get; set; }
        public  int  ItemID  { get; set; }
        public  string  ItemName  { get; set; }
        public  string  ItemCode  { get; set; }
        public  decimal?  Quantity  { get; set; }
        public  decimal?  UnitPrice  { get; set; }
        public  decimal  DiscountAmount  { get; set; }
        public  decimal  DiscountPrc  { get; set; }
        public  decimal?  NetUnitPrice  { get; set; }
        public  decimal?  ItemTotal  { get; set; }
        public  decimal?  VatPrc  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  decimal?  NetAfterVat  { get; set; }

     }

 }
