using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class I_TR_ExternalLabor
     {
        public  int?  TransactionID  { get; set; }
        public  int?  TrNo  { get; set; }
        public  string  RefNo  { get; set; }
        public  DateTime?  TransactionDate  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  TrType  { get; set; }
        public  bool?  IsCash  { get; set; }
        public  int?  Type  { get; set; }
        public  int?  CashTypeID  { get; set; }
        public  string  Reason  { get; set; }
        public  string  BeneficiaryName  { get; set; }
        public  decimal?  Amount  { get; set; }
        public  decimal?  DueAmount  { get; set; }
        public  int?  Status  { get; set; }
        public  string  Remarks  { get; set; }
        public  int?  IDUserCreate  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  int?  InvoiceID  { get; set; }
        public  string  InvoiceNo  { get; set; }
        public  string  IDPeriod  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
