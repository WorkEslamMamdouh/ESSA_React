using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_MODULES
     {
        public  string  MODULE_CODE  { get; set; }
        public  string  MODULE_MENU  { get; set; }
        public  string  MODULE_DESCE  { get; set; }
        public  string  MODULE_DESCA  { get; set; }
        public  string  Url_Image  { get; set; }
        public  string  MODULE_TYPE  { get; set; }
        public  int?  MODULE_SORT  { get; set; }
        public  int?  IS_Show  { get; set; }
        public  bool?  CREATE  { get; set; }
        public  bool?  EDIT  { get; set; }
        public  bool?  DELETE  { get; set; }
        public  bool?  PRINT  { get; set; }
        public  bool?  VIEW  { get; set; }
        public  bool?  CUSTOM1  { get; set; }
        public  bool?  CUSTOM2  { get; set; }
        public  bool?  CUSTOM3  { get; set; }
        public  string  CUSTOM1_DESC  { get; set; }
        public  string  CUSTOM2_DESC  { get; set; }
        public  string  CUSTOM3_DESC  { get; set; }
        public  bool?  CUSTOM4  { get; set; }
        public  bool?  CUSTOM5  { get; set; }
        public  bool?  CUSTOM6  { get; set; }
        public  string  CUSTOM4_DESC  { get; set; }
        public  string  CUSTOM5_DESC  { get; set; }
        public  string  CUSTOM6_DESC  { get; set; }
        public  bool?  CUSTOM7  { get; set; }
        public  bool?  CUSTOM8  { get; set; }
        public  bool?  CUSTOM9  { get; set; }
        public  string  CUSTOM7_DESC  { get; set; }
        public  string  CUSTOM8_DESC  { get; set; }
        public  string  CUSTOM9_DESC  { get; set; }
        public  bool?  AVAILABLE  { get; set; }
        public  bool?  Images_Enabled  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
