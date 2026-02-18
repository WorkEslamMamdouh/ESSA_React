using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_TypeTempExcel
     {
        public  int?  IDTypeTemp  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  DescA  { get; set; }
        public  string  Remark  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
