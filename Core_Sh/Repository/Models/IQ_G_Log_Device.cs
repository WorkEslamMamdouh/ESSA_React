using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_G_Log_Device
     {
        public  int?  ID  { get; set; }
        public  string  ID_Device  { get; set; }
        public  string  Language  { get; set; }
        public  string  DeviceType  { get; set; }
        public  string  NameBrowser  { get; set; }
        public  string  LastDateUpdate  { get; set; }
        public  long?  USERID  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  BranchCode  { get; set; }
        public  int?  FIN_YEAR  { get; set; }
        public  string  USER_CODE  { get; set; }
        public  string  Password  { get; set; }
        public  bool?  ISActive  { get; set; }
        public  string  Last_Page  { get; set; }
        public  string  Last_Page1  { get; set; }
        public  string  Last_Page2  { get; set; }
        public  string  Last_Page3  { get; set; }
        public  bool?  IsNotAuto  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
