using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_A_VatType
     {
        public  int?  VatTypeID  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  Describtion  { get; set; }
        public  int?  Type  { get; set; }
        public  decimal?  VatPrc  { get; set; }
        public  int?  LineOrder  { get; set; }
        public  string  VatNatureCode  { get; set; }
        public  string  VatNatureDescA  { get; set; }
        public  string  VatNatureDescE  { get; set; }
        public  string  VatTypeEG  { get; set; }
        public  string  VatSubTypeEG  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
