using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_I_ItemUnits
     {
        public  int?  ItemUnitID  { get; set; }
        public  int?  Ser  { get; set; }
        public  string  QRCode  { get; set; }
        public  int?  ItemID  { get; set; }
        public  int?  UnitID  { get; set; }
        public  int?  TypeUsing  { get; set; }
        public  string  Remarks  { get; set; }
        public  bool?  ISActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
