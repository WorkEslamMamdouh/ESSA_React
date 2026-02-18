using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_G_TaxAddDed
     {
        public  int?  TaxID  { get; set; }
        public  string  TaxCode  { get; set; }
        public  string  TaxDescA  { get; set; }
        public  string  TaxDescE  { get; set; }
        public  decimal?  TaxPrc  { get; set; }
        public  string  TaxType  { get; set; }
        public  bool?  IsActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
