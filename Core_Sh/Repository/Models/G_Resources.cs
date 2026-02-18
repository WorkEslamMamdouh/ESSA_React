using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_Resources
     {
        public  int?  IDRes  { get; set; }
        public  string  KeyRes  { get; set; }
        public  string  NameResEn  { get; set; }
        public  string  NameResAr  { get; set; }
        public  string  Custom  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
