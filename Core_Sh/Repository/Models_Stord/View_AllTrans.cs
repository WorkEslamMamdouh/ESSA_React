using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class View_AllTrans
     {
        public  int  IDTrans  { get; set; }
        public  long?  USERID  { get; set; }
        public  int?  TrNo  { get; set; }
        public  int?  Status  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  BranchCode  { get; set; }
        public  string  RefNO  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  TimeSpan?  TrTime  { get; set; }
        public  bool?  IsCash  { get; set; }
        public  int?  IDType  { get; set; }
        public  string  NameRecipient  { get; set; }
        public  int?  TrType  { get; set; }
        public  decimal?  Amount  { get; set; }
        public  decimal?  Debit  { get; set; }
        public  decimal?  Credit  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  bool?  IsPosted  { get; set; }
        public  int?  VoucherNo  { get; set; }
        public  int?  VoucherType  { get; set; }
        public  string  TransferNo  { get; set; }
        public  string  Remark  { get; set; }
        public  int?  IDUserCreate  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  decimal?  TotalAmount  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  int?  VatType  { get; set; }
        public  decimal?  DiscountAmount  { get; set; }
        public  decimal?  DiscountPrc  { get; set; }
        public  decimal?  NetAfterVat  { get; set; }
        public  decimal?  CommitionAmount  { get; set; }
        public  decimal?  CashAmount  { get; set; }
        public  decimal?  CardAmount  { get; set; }
        public  decimal?  RemainAmount  { get; set; }
        public  decimal?  ChargeAmount  { get; set; }
        public  int?  FinYear  { get; set; }
        public  int?  IDExcel  { get; set; }
        public  int?  FromIDTrans  { get; set; }
        public  string  TypeDesc  { get; set; }
        public  string  Symbols  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  string  From_ACC_CODE  { get; set; }
        public  string  From_ACC_DESCA  { get; set; }
        public  int?  PeriodSalary  { get; set; }
        public  int?  VoucherID  { get; set; }

     }

 }
