using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_I_Items_Temp
     {
        public  int?  ItemID  { get; set; }
        public  int?  Ser  { get; set; }
        public  int?  CompCode  { get; set; }
        public  bool?  IsService  { get; set; }
        public  string  ItemCode  { get; set; }
        public  string  ItemName  { get; set; }
        public  int?  ItemFamilyID  { get; set; }
        public  decimal?  CostPrice  { get; set; }
        public  decimal?  UnitPrice  { get; set; }
        public  decimal?  Quantity  { get; set; }
        public  decimal?  OneHandQuantity  { get; set; }
        public  decimal?  QuantityMinimum  { get; set; }
        public  decimal?  QtyOpenBalances  { get; set; }
        public  string  Remarks  { get; set; }
        public  int?  IDUserCreate  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  bool?  ISActive  { get; set; }
        public  string  backgroundColor  { get; set; }
        public  string  FontColor  { get; set; }
        public  int?  ItemTaxID  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
