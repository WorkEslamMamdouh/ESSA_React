using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_G_RoleUsersComp
     {
        public  int?  IDUser  { get; set; }
        public  int?  RoleId  { get; set; }
        public  string  RoleIds  { get; set; }
        public  string  RoleDescA  { get; set; }
        public  string  RoleDescE  { get; set; }
        public  string  CompNameA  { get; set; }
        public  string  CompNameE  { get; set; }
        public  long?  EmpID  { get; set; }
        public  string  USER_CODE  { get; set; }
        public  string  USER_PASSWORD  { get; set; }
        public  string  Email  { get; set; }
        public  bool?  IsAutoLogin  { get; set; }
        public  string  NameUser  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  EmpCode  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
