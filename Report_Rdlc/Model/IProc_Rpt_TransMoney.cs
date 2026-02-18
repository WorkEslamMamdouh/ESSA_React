using System;
 
 namespace Report_Rdlc
 {
      public partial class IProc_Rpt_TransMoney
     {
        public  int  IDTrans  { get; set; }
        public  long?  USERID  { get; set; }
        public  int?  TrNo  { get; set; }
        public  int?  Status  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  TimeSpan?  TrTime  { get; set; }
        public  string  NameRecipient  { get; set; }
        public  bool?  IsCash  { get; set; }
        public  int?  TrType  { get; set; }
        public  decimal?  Amount  { get; set; }
        public  decimal?  Debit  { get; set; }
        public  decimal?  Credit  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  string  From_ACC_CODE  { get; set; }
        public  bool?  IsPosted  { get; set; }
        public  int?  VoucherNo  { get; set; }
        public  int?  VoucherType  { get; set; }
        public  string  TransferNo  { get; set; }
        public  string  Remark  { get; set; }
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
        public  int?  PeriodSalary  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  string  ACC_DESCAFrom  { get; set; }
        public  string  USER_NAME  { get; set; }
        public  string  TypeDesc  { get; set; }
        public  string  TfkeetDesc  { get; set; }

     }

 }
