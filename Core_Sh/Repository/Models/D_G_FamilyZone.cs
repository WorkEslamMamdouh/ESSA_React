using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_G_FamilyZone
     {
        public  int?  FamilyZoneID  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  ZoneCode  { get; set; }
        public  string  DescA  { get; set; }
        public  bool?  Active  { get; set; }
        public  string  Remarks  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
