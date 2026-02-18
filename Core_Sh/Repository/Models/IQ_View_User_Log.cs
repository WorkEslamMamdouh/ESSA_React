using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_View_User_Log
     {
        public  int?  LogID  { get; set; }
        public  string  UserID  { get; set; }
        public  string  NameUser  { get; set; }
        public  string  RoleDescA  { get; set; }
        public  string  RoleIds  { get; set; }
        public  string  TrType  { get; set; }
        public  string  Mode  { get; set; }
        public  string  Remarks  { get; set; }
        public  string  Date  { get; set; }
        public  bool?  IsSuccess  { get; set; }
        public  string  ID_Device  { get; set; }
        public  string  DeviceType  { get; set; }
        public  string  NameBrowser  { get; set; }
        public  int?  TransID  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  CodeRun  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
