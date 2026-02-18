using System;
 
 namespace Report_Rdlc
 {
      public partial class Iproc_Prnt_Voucher
     {
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  string  ACC_DESCL  { get; set; }
        public  int  COMP_CODE  { get; set; }
        public  string  NameA  { get; set; }
        public  string  NameE  { get; set; }
        public  int?  VOUCHER_CODE  { get; set; }
        public  DateTime?  VOUCHER_DATE  { get; set; }
        public  string  VOUCHER_DESC  { get; set; }
        public  decimal?  DEBIT  { get; set; }
        public  decimal?  CREDIT  { get; set; }
        public  string  Remarks  { get; set; }
        public  bool?  DETAIL  { get; set; }
        public  string  TransType  { get; set; }
        public  string  DescA_FelidLnk  { get; set; }
        public  int  VoucherDetailID  { get; set; }

     }

 }
