using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_Settings_Device
     {
        public  int?  ID  { get; set; }
        public  string  ID_Device  { get; set; }
        public  string  Language  { get; set; }
        public  string  DeviceType  { get; set; }
        public  string  NameBrowser  { get; set; }
        public  string  LastDateUpdate  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
