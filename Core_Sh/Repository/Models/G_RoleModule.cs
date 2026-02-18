using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_RoleModule
     {
        public  int?  RoleId  { get; set; }
        public  string  MODULE_CODE  { get; set; }
        public  string  MODULE_MENU  { get; set; }
        public  string  MODULE_DESCE  { get; set; }
        public  string  MODULE_DESCA  { get; set; }
        public  string  Url_Image  { get; set; }
        public  string  MODULE_TYPE  { get; set; }
        public  int?  MODULE_SORT  { get; set; }
        public  int?  IS_Show  { get; set; }
        public  bool?  EXECUTE  { get; set; }
        public  bool?  CREATE  { get; set; }
        public  bool?  EDIT  { get; set; }
        public  bool?  DELETE  { get; set; }
        public  bool?  PRINT  { get; set; }
        public  bool?  VIEW  { get; set; }
        public  bool?  CUSTOM1  { get; set; }
        public  bool?  CUSTOM2  { get; set; }
        public  bool?  CUSTOM3  { get; set; }
        public  bool?  CUSTOM4  { get; set; }
        public  bool?  CUSTOM5  { get; set; }
        public  bool?  CUSTOM6  { get; set; }
        public  bool?  CUSTOM7  { get; set; }
        public  bool?  CUSTOM8  { get; set; }
        public  bool?  CUSTOM9  { get; set; }
        public  bool?  ViewImages  { get; set; }
        public  bool?  EditImages  { get; set; }
        public  int?  Prc_Preference  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
