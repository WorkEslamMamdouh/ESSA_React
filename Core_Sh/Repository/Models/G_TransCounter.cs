using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_TransCounter
     {
        public  int?  CompCode  { get; set; }
        public  int?  BranchCode  { get; set; }
        public  int?  FinYear  { get; set; }
        public  string  TransType  { get; set; }
        public  int?  PeriodCode  { get; set; }
        public  int?  LastSerial  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
