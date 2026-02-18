using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class E_D_G_TypeTempExcel
     {
        public  int?  IDTypeTemp  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  DescA  { get; set; }
        public  string  DescE  { get; set; }
        public  string  Remark  { get; set; }
        public  int?  IDLnkExcel  { get; set; }
        public  bool?  IsActive  { get; set; }
        public  int?  ProssType  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
