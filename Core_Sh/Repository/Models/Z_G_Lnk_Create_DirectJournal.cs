using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class Z_G_Lnk_Create_DirectJournal
     {
        public  int?  ID_Lnk  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  SerRun  { get; set; }
        public  string  TransType  { get; set; }
        public  string  KeyTrans  { get; set; }
        public  string  DescA_FelidLnk  { get; set; }
        public  string  NameTableMaster  { get; set; }
        public  string  NameFelidMasterID  { get; set; }
        public  string  NameFelidMasterTrNo  { get; set; }
        public  string  NameFelidCondtionDate  { get; set; }
        public  string  NameFelidCondtionCustom  { get; set; }
        public  string  NameFelidMasterUserID  { get; set; }
        public  string  NameFelidMasterIDExcel  { get; set; }
        public  bool?  IsAutoDayShift  { get; set; }
        public  bool?  IsActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
