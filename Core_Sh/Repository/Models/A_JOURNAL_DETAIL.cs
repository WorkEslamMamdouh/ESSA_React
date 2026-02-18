using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class A_JOURNAL_DETAIL
     {
        public  int?  VoucherDetailID  { get; set; }
        public  int?  VoucherID  { get; set; }
        public  int?  COMP_CODE  { get; set; }
        public  int?  VOUCHER_CODE  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  decimal?  DEBIT  { get; set; }
        public  decimal?  CREDIT  { get; set; }
        public  string  Remarks  { get; set; }
        public  string  CC_CODE  { get; set; }
        public  string  Trans_Type  { get; set; }
        public  int?  Trans_ID  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  int?  Trans_No  { get; set; }
        public  int?  IDUser  { get; set; }
        public  int?  IDExcel  { get; set; }
        public  int?  NumDayShift  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
