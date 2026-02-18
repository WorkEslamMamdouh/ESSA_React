using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_ItemUnites
     {
        public  int?  ItemUnitID  { get; set; }
        public  int?  ItemID  { get; set; }
        public  int?  UnitID  { get; set; }
        public  string  Remarks  { get; set; }
        public  string  DescA  { get; set; }
        public  string  UnitCode  { get; set; }
        public  decimal?  Rate  { get; set; }
        public  decimal?  Quantity  { get; set; }
        public  decimal?  UnitPrice  { get; set; }
        public  decimal?  CostPrice  { get; set; }
        public  int?  CompCode  { get; set; }
        public  bool?  ISActive  { get; set; }
        public  string  QRCode  { get; set; }
        public  string  backgroundColor  { get; set; }
        public  string  FontColor  { get; set; }
        public  int?  TypeUsing  { get; set; }
        public  bool?  IsService  { get; set; }
        public  string  Image  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
