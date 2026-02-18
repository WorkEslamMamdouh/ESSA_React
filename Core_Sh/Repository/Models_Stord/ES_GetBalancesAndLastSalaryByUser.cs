using Core.UI.Repository;
using Core.UI.Repository.Models;

namespace Core.UI.Repository.Models
 {
      public partial class ES_GetBalancesAndLastSalaryByUser
     {
        public  decimal  TotalCovenant  { get; set; }
        public  decimal  TotalPayCovenant  { get; set; }
        public  decimal  TotalRemainCovenant  { get; set; }
        public  decimal  AccDEBIT  { get; set; }
        public  decimal  AccCREDIT  { get; set; }
        public  decimal  NetAccBalance  { get; set; }
        public  decimal  OldSalary  { get; set; }
        public  string  OldDateSalary  { get; set; }
        public  decimal  NewSalary  { get; set; }
        public  string  NewDateSalary  { get; set; }

     }

 }
