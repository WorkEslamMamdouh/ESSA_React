using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_G_RoleUsersAllDataComp
     {
        public  int?  IDUser  { get; set; }
        public  int?  RoleId  { get; set; }
        public  string  RoleIds  { get; set; }
        public  string  RoleDescA  { get; set; }
        public  string  RoleDescE  { get; set; }
        public  string  NameUser  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  CompNameA  { get; set; }
        public  string  CompNameE  { get; set; }
        public  long?  EmpID  { get; set; }
        public  string  EmpCode  { get; set; }
        public  string  USER_CODE  { get; set; }
        public  string  USER_PASSWORD  { get; set; }
        public  string  Email  { get; set; }
        public  string  USER_PASSWORD2  { get; set; }
        public  bool?  USER_ACTIVE  { get; set; }
        public  int?  Status  { get; set; }
        public  string  DepartmentName  { get; set; }
        public  string  JobTitle  { get; set; }
        public  byte?  USER_TYPE  { get; set; }
        public  DateTime?  CHANGE_PASS_DATE  { get; set; }
        public  DateTime?  LastLogin  { get; set; }
        public  DateTime?  FirstLogin  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  string  Profile_Img  { get; set; }
        public  string  Tokenid  { get; set; }
        public  int?  IDExcel  { get; set; }
        public  bool?  IsAutoLogin  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
