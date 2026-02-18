using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_ViewItems
     {
        public  int?  ItemID  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  ItemCode  { get; set; }
        public  string  ItemName  { get; set; }
        public  int?  ItemFamilyID  { get; set; }
        public  string  FamilyCode  { get; set; }
        public  string  FamilyDescA  { get; set; }
        public  int?  CatID  { get; set; }
        public  string  CatCode  { get; set; }
        public  string  CatDescA  { get; set; }
        public  bool?  ISActive  { get; set; }
        public  string  Remarks  { get; set; }
        public  decimal?  CostPrice  { get; set; }
        public  decimal?  UnitPrice  { get; set; }
        public  decimal?  OneHandQuantity  { get; set; }
        public  string  backgroundColor  { get; set; }
        public  string  FontColor  { get; set; }
        public  bool?  IsService  { get; set; }
        public  decimal?  QtyOpenBalances  { get; set; }
        public  decimal?  Quantity  { get; set; }
        public  decimal?  HangingQty  { get; set; }
        public  decimal?  NetQty  { get; set; }
        public  int?  ItemTaxID  { get; set; }
        public  string  ItemCode_EG  { get; set; }
        public  string  NameA_EG  { get; set; }
        public  string  NameE_EG  { get; set; }
        public  string  Image  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
