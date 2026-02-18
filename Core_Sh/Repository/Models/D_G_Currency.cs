using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_G_Currency
     {
        public  int?  CurrencyID  { get; set; }
        public  string  CurrencyCode  { get; set; }
        public  string  DescA  { get; set; }
        public  string  DescL  { get; set; }
        public  string  Remarks  { get; set; }
        public  bool?  IsActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
