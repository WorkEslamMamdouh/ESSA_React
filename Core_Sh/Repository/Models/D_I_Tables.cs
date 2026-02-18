using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_I_Tables
     {
        public  int?  TableID  { get; set; }
        public  int?  TableNumber  { get; set; }
        public  int?  CompCode  { get; set; }
        public  bool?  ISActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
