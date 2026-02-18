using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_SupplierPurSum
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
        public  int?  Pur_TrNo  { get; set; }
        public  int?  Pur_Trtype  { get; set; }
        public  bool?  Pur_IsCash  { get; set; }
        public  DateTime?  Pur_PurDate  { get; set; }
        public  TimeSpan?  Pur_TrTime  { get; set; }
        public  int?  Pur_Status  { get; set; }
        public  int?  Sup_SupplierID  { get; set; }
        public  string  Pur_SupplierName  { get; set; }
        public  string  Sup_SupplierCODEAr  { get; set; }
        public  string  Sup_SupplierCODEEn  { get; set; }
        public  int?  CashTyp_ID  { get; set; }
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
        public  int?  User_ID  { get; set; }

     }

 }
