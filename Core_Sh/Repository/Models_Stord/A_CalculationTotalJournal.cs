using System;
 
 namespace Core.UI.Repository.Models
 {

    public partial class A_CalculationTotalJournal
    {
        public decimal? TotalDebit { get; set; }
        public decimal? TotalCredit { get; set; }
        public decimal? NetDifference { get; set; }
        public int? Serial_Det { get; set; }

    }


}
