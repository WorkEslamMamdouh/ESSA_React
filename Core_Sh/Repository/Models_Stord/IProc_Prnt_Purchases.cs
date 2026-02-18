using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Prnt_Purchases
     {
        public  int  COMP_CODE  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  Comp_NameA  { get; set; }
        public  string  Comp_NameE  { get; set; }
        public  string  Comp_City  { get; set; }
        public  string  Comp_Address  { get; set; }
        public  string  IBAN_NO  { get; set; }
        public  string  BanckAccNo  { get; set; }
        public  string  BanckAccName  { get; set; }
        public  string  Comp_Fax  { get; set; }
        public  string  Comp_Tel  { get; set; }
        public  string  Comp_Email  { get; set; }
        public  string  Comp_VatNo  { get; set; }
        public  string  Comp_Address_Street  { get; set; }
        public  string  Comp_Address_Str_Additional  { get; set; }
        public  string  Comp_Address_BuildingNo  { get; set; }
        public  string  Comp_Address_Build_Additional  { get; set; }
        public  string  Comp_Address_City  { get; set; }
        public  string  Comp_Address_Postal  { get; set; }
        public  string  Comp_Address_Province  { get; set; }
        public  string  Comp_Address_District  { get; set; }
        public  int?  Sup_SupplierID  { get; set; }
        public  string  Sup_NAMEA  { get; set; }
        public  int?  Sup_SupplierCODE  { get; set; }
        public  int  HD_PurchaseID  { get; set; }
        public  int?  HD_TrNo  { get; set; }
        public  int?  HD_TrType  { get; set; }
        public  string  HD_DoNo  { get; set; }
        public  string  HD_ReNo  { get; set; }
        public  bool?  HD_IsCash  { get; set; }
        public  int?  HD_CashType  { get; set; }
        public  DateTime?  HD_PurDate  { get; set; }
        public  TimeSpan?  HD_TrTime  { get; set; }
        public  int?  HD_Status  { get; set; }
        public  decimal?  HD_ItemsTotal  { get; set; }
        public  decimal?  HD_Discount  { get; set; }
        public  decimal?  HD_TotalAmount  { get; set; }
        public  int?  HD_VatTypeID  { get; set; }
        public  decimal?  HD_VatAmount  { get; set; }
        public  decimal?  HD_ChargePrc  { get; set; }
        public  decimal?  HD_NetAmount  { get; set; }
        public  decimal?  HD_RemainAmount  { get; set; }
        public  decimal?  HD_PaymentAmount  { get; set; }
        public  bool?  HD_IsService  { get; set; }
        public  string  HD_Remarks  { get; set; }
        public  int?  HD_VoucherNo  { get; set; }
        public  bool?  HD_IsPosted  { get; set; }
        public  string  HD_QRCode  { get; set; }
        public  DateTime?  HD_CreatedAt  { get; set; }
        public  string  HD_CreatedBy  { get; set; }
        public  DateTime?  HD_UpdatedAt  { get; set; }
        public  string  HD_UpdatedBy  { get; set; }
        public  string  HD_DocUUID  { get; set; }
        public  int  DT_PurchaseDetailID  { get; set; }
        public  decimal?  DT_OneHandQuantity  { get; set; }
        public  decimal?  DT_Quantity  { get; set; }
        public  decimal?  DT_UnitPrice  { get; set; }
        public  decimal?  DT_DiscountPrc  { get; set; }
        public  decimal?  DT_DiscountAmount  { get; set; }
        public  decimal?  DT_NetUnitPrice  { get; set; }
        public  decimal?  DT_ItemTotal  { get; set; }
        public  decimal?  DT_VatPrc  { get; set; }
        public  decimal?  DT_VatAmount  { get; set; }
        public  decimal?  DT_NetAfterVat  { get; set; }
        public  int  IT_ItemID  { get; set; }
        public  string  IT_ItemName  { get; set; }
        public  string  TfkeetAR  { get; set; }

     }

 }
