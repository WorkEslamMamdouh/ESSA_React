using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_TransCounterSetting
     {
        public  int?  CompCode  { get; set; }
        public  string  TransType  { get; set; }
        public  byte?  YearStartValueType  { get; set; }
        public  bool?  ISBranchCounter  { get; set; }
        public  int?  YearStartFixedValue  { get; set; }
        public  string  Remarks  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
