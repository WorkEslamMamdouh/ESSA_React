using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class Z_G_Lnk_CreateAccount
     {
        public  int?  ID_Lnk  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  KeyTrans  { get; set; }
        public  string  DescTrans  { get; set; }
        public  string  StartNameAcc  { get; set; }
        public  string  Father_Acc_Code  { get; set; }
        public  string  Acc_Code  { get; set; }
        public  string  AccPrefix  { get; set; }
        public  string  LastNumber  { get; set; }
        public  string  NameTableMaster  { get; set; }
        public  string  NameFelidMasterID  { get; set; }
        public  string  NameFelidTableCompCode  { get; set; }
        public  string  NameFelidTableNameA  { get; set; }
        public  string  NameFelidTableNameE  { get; set; }
        public  string  NameFelidAcc_Code  { get; set; }
        public  string  NameFelidExpr  { get; set; }
        public  bool?  IsUpdateCode  { get; set; }
        public  string  NameFelidCode  { get; set; }
        public  bool?  IsActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
