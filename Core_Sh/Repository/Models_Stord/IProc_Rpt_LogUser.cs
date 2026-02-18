using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_LogUser
     {
        public  string  UserID  { get; set; }
        public  string  USER_NAME  { get; set; }
        public  string  JobTitle  { get; set; }
        public  byte?  USER_TYPE  { get; set; }
        public  string  TrType  { get; set; }
        public  string  Mode  { get; set; }
        public  string  Remarks  { get; set; }
        public  string  Date  { get; set; }
        public  bool?  IsSuccess  { get; set; }
        public  string  ID_Device  { get; set; }
        public  string  DeviceType  { get; set; }
        public  string  NameBrowser  { get; set; }

     }

 }
