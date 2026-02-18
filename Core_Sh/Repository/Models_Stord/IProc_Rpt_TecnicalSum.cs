using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_Rpt_TecnicalSum
     {
        public  string  ParFromDate  { get; set; }
        public  string  ParToDate  { get; set; }
        public  string  EngineerName  { get; set; }
        public  string  SalesManName  { get; set; }
        public  decimal?  Qty_Service  { get; set; }
        public  decimal?  Total_Of_Service  { get; set; }

     }

 }
