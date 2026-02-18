using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_A_FinancialType
     {
        public  int?  FinancialTypeID  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  TrType  { get; set; }
        public  string  DescAr  { get; set; }
        public  string  DescEn  { get; set; }
        public  bool?  IsActive  { get; set; }
        public  int?  SearchTypes  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
