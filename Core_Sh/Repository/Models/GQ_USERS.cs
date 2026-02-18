using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class GQ_USERS
     {
        public  int?  ID  { get; set; }
        public  long?  EmpID  { get; set; }
        public  string  EmpCode  { get; set; }
        public  string  USER_CODE  { get; set; }
        public  string  USER_PASSWORD  { get; set; }
        public  string  USER_NAME  { get; set; }
        public  bool?  USER_ACTIVE  { get; set; }
        public  string  Email  { get; set; }
        public  string  JobTitle  { get; set; }
        public  byte?  USER_TYPE  { get; set; }
        public  string  Tokenid  { get; set; }
        public  string  Profile_Img  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  DateTime?  FirstLogin  { get; set; }
        public  DateTime?  LastLogin  { get; set; }
        public  DateTime?  CHANGE_PASS_DATE  { get; set; }
        public  string  DepartmentName  { get; set; }
        public  string  USER_PASSWORD2  { get; set; }
        public  int?  Status  { get; set; }
        public  string  DescZone  { get; set; }
        public  string  DescFamilyZone  { get; set; }
        public  string  RoleIds  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
