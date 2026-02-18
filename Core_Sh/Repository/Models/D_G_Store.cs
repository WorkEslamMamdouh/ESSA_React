using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_G_Store
     {
        public  int?  StoreID  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  DescA  { get; set; }
        public  string  DescE  { get; set; }
        public  string  Remark  { get; set; }
        public  string  location  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  bool?  IsActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
