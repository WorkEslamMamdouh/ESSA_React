using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class A_ACCOUNT
     {
        public  int?  COMP_CODE  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  string  ACC_DESCL  { get; set; }
        public  int?  ACC_GROUP  { get; set; }
        public  int?  ACC_TYPE  { get; set; }
        public  int?  ACC_LEVEL  { get; set; }
        public  bool?  ACC_ACTIVE  { get; set; }
        public  string  PARENT_ACC  { get; set; }
        public  bool?  DETAIL  { get; set; }
        public  string  CREATED_BY  { get; set; }
        public  DateTime?  CREATED_AT  { get; set; }
        public  string  UPDATED_BY  { get; set; }
        public  DateTime?  LAST_UPDATE  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
