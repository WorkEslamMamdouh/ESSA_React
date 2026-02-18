using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_RoleUsers
     {
        public  int?  IDUser  { get; set; }
        public  int?  RoleId  { get; set; }
        public  int?  CompCode  { get; set; }
        public  bool?  ISActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
