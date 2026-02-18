using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_KSATaxInvItems
     {
        public  int?  TaxInvoiceID  { get; set; }
        public  int?  TaxInvoiceDetailID  { get; set; }
        public  long?  TaxItemSerial  { get; set; }
        public  int?  TaxItemCode  { get; set; }
        public  string  TaxItemDescr  { get; set; }
        public  string  TaxItemUnit  { get; set; }
        public  decimal?  TaxItemQty  { get; set; }
        public  decimal?  TaxItemTotal  { get; set; }
        public  decimal?  TaxItemUnitPrice  { get; set; }
        public  decimal?  TaxItemNetTotal  { get; set; }
        public  decimal?  TaxItemDiscPrc  { get; set; }
        public  decimal?  TaxItemDiscAmt  { get; set; }
        public  decimal?  TaxItemVatPrc  { get; set; }
        public  decimal?  TaxItemVatAmt  { get; set; }
        public  string  VatNatureCode  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
