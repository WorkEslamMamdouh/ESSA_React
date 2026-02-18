using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_EGTaxInvItems
     {
        public  string  DescA  { get; set; }
        public  string  RefItemCode  { get; set; }
        public  string  ItemCode  { get; set; }
        public  string  UomCode  { get; set; }
        public  decimal?  Quantity  { get; set; }
        public  string  OldItemCode  { get; set; }
        public  decimal?  ItemTotal  { get; set; }
        public  decimal?  Total  { get; set; }
        public  decimal?  SalesTotal  { get; set; }
        public  decimal?  diff  { get; set; }
        public  decimal?  TaxableFees  { get; set; }
        public  decimal?  NetTotal  { get; set; }
        public  decimal?  Unitprice  { get; set; }
        public  string  CurrencyCode  { get; set; }
        public  decimal?  DiscountPrc  { get; set; }
        public  decimal?  Discount  { get; set; }
        public  string  TaxType  { get; set; }
        public  string  TaxSubType  { get; set; }
        public  decimal?  VatPrc  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  int?  InvoiceItemID  { get; set; }
        public  int?  InvoiceID  { get; set; }
        public  int?  Serial  { get; set; }
        public  string  TaxCode  { get; set; }
        public  decimal?  TaxPrc  { get; set; }
        public  decimal?  ItemDedTax  { get; set; }
        public  string  DedTaxType  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
