using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class AQ_A_Account
     {
        public  int?  Comp_Code  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  string  ACC_DESCL  { get; set; }
        public  decimal?  Total_DEBIT  { get; set; }
        public  decimal?  Total_CREDIT  { get; set; }
        public  decimal?  Total_Balance  { get; set; }
        public  string  PARENT_ACC  { get; set; }
        public  int?  ACC_LEVEL  { get; set; }
        public  bool?  DETAIL  { get; set; }
        public  bool?  ACC_ACTIVE  { get; set; }
        public  int?  ACC_TYPE  { get; set; }
        public  int?  ACC_GROUP  { get; set; }
        public  string  CREATED_BY  { get; set; }
        public  DateTime?  CREATED_AT  { get; set; }
        public  string  UPDATED_BY  { get; set; }
        public  DateTime?  LAST_UPDATE  { get; set; }
        public  int?  FIN_YEAR  { get; set; }
        public  decimal?  ACC_LIMIT  { get; set; }
        public  string  REMARKS  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
