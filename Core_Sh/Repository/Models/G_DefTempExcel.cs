using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_DefTempExcel
     {
        public  int?  ID  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  Serial  { get; set; }
        public  int?  IDTypeTemp  { get; set; }
        public  string  NameTitle  { get; set; }
        public  string  Remark  { get; set; }
        public  string  TrType  { get; set; }
        public  int?  IDType  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
