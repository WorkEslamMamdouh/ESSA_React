using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class EQ_I_ContainerDataExcel
     {
        public  int?  IDExcel  { get; set; }
        public  string  KeyTrans  { get; set; }
        public  string  NameFelid  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  Serial  { get; set; }
        public  string  NameTitle  { get; set; }
        public  string  ValueFelid  { get; set; }
        public  string  DefaultValueFelid  { get; set; }
        public  bool?  IsShow  { get; set; }
        public  string  NameTable  { get; set; }
        public  string  NameRunProc  { get; set; }
        public  string  NameFelidID  { get; set; }
        public  string  NameFelidTrNo  { get; set; }
        public  string  NameFelidExcelID  { get; set; }
        public  int?  CreateByUserID  { get; set; }
        public  string  TypeDescA  { get; set; }
        public  string  TypeDescE  { get; set; }
        public  string  CreateExNameA  { get; set; }
        public  string  CreateExNameE  { get; set; }
        public  int?  IDLnkExcel  { get; set; }
        public  int?  IDTypeTemp  { get; set; }
        public  int?  IDFeildExcel  { get; set; }
        public  string  FelidDescA  { get; set; }
        public  string  FelidDescE  { get; set; }
        public  string  NameFelidForeignkeyID1  { get; set; }
        public  string  NameTableOut1  { get; set; }
        public  string  NameFelidOutID1  { get; set; }
        public  string  NameSelectFelidOut1  { get; set; }
        public  string  NameFelidForeignkeyID2  { get; set; }
        public  string  NameTableOut2  { get; set; }
        public  string  NameFelidOutID2  { get; set; }
        public  string  NameSelectFelidOut2  { get; set; }
        public  string  NameFelidForeignkeyID3  { get; set; }
        public  string  NameTableOut3  { get; set; }
        public  string  NameFelidOutID3  { get; set; }
        public  string  NameSelectFelidOut3  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
