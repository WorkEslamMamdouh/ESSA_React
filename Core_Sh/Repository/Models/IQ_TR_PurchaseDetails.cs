using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_TR_PurchaseDetails
     {
        public  int?  PurchaseDetailID  { get; set; }
        public  int?  PurchaseID  { get; set; }
        public  int?  ItemID  { get; set; }
        public  int?  ItemUnitID  { get; set; }
        public  decimal?  Rate  { get; set; }
        public  decimal?  VatPrc  { get; set; }
        public  decimal?  DiscountPrc  { get; set; }
        public  decimal?  RemainRetQty  { get; set; }
        public  decimal?  UnitPrice  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  decimal?  CostPrice  { get; set; }
        public  decimal?  OneHandQuantity  { get; set; }
        public  int?  Ser  { get; set; }
        public  bool?  IsService  { get; set; }
        public  string  ItemCode  { get; set; }
        public  string  ItemName  { get; set; }
        public  int?  ItemFamilyID  { get; set; }
        public  int?  VatTypeID  { get; set; }
        public  decimal?  DiscountAmount  { get; set; }
        public  decimal?  NetUnitPrice  { get; set; }
        public  decimal?  ItemTotal  { get; set; }
        public  decimal?  NetAfterVat  { get; set; }
        public  int?  CatID  { get; set; }
        public  decimal?  RetQty  { get; set; }
        public  decimal?  Quantity  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
