using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_A_CashTypes
     {
        public  int?  CashTypeID  { get; set; }
        public  int?  Ser  { get; set; }
        public  string  Description  { get; set; }
        public  int?  CompCode  { get; set; }
        public  decimal?  ChargePrc  { get; set; }
        public  string  CashAccCode  { get; set; }
        public  bool?  IsActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
