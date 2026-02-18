using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class A_JOURNAL_HEADER
     {
        public  int?  VoucherID  { get; set; }
        public  int?  COMP_CODE  { get; set; }
        public  int?  VOUCHER_CODE  { get; set; }
        public  DateTime?  VOUCHER_DATE  { get; set; }
        public  string  VOUCHER_DESC  { get; set; }
        public  byte?  VOUCHER_STATUS  { get; set; }
        public  int?  TYPE_CODE  { get; set; }
        public  string  REF_CODE  { get; set; }
        public  string  CREATED_BY  { get; set; }
        public  DateTime?  CREATED_AT  { get; set; }
        public  string  UPDATED_BY  { get; set; }
        public  DateTime?  UPDATED_AT  { get; set; }
        public  string  Trans_Type  { get; set; }
        public  int?  Trans_ID  { get; set; }
        public  int?  Trans_No  { get; set; }
        public  int?  IDUser  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
