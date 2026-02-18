using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_Role
     {
        public  int?  RoleId  { get; set; }
        public  string  DescA  { get; set; }
        public  string  DescE  { get; set; }
        public  string  Remarks  { get; set; }
        public  bool?  IsAvailable  { get; set; }
        public  int?  CompCode  { get; set; }
        public  bool?  IsShowable  { get; set; }
        public  int?  RoleType  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
