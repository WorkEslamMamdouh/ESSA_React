using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class VoucherMasterDetail
     {
        public  int  VoucherDetailID  { get; set; }
        public  int?  VOUCHER_SERIAL  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  decimal?  DEBIT  { get; set; }
        public  decimal?  CREDIT  { get; set; }
        public  string  DESCA  { get; set; }

     }

 }
