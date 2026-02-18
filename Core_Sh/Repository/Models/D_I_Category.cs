using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_I_Category
     {
        public  int?  CatID  { get; set; }
        public  int?  Ser  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  CatCode  { get; set; }
        public  string  DescA  { get; set; }
        public  string  DescE  { get; set; }
        public  string  Remarks  { get; set; }
        public  int?  Type_Show  { get; set; }
        public  int?  IDUserCreate  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  string  backgroundColor  { get; set; }
        public  string  FontColor  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
