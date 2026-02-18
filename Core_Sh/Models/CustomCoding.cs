 
using Core.UI.Repository;
using Core.UI.Repository.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.UI.Models
{
    public class CustomCoding
    {
        public int CompCode { get; set; }
        public int BranchCode { get; set; }
        public string UserCode { get; set; }
        public int InvoiceID { get; set; }
        public int InvoiceItemID { get; set; }
        public int StoreID { get; set; }
        public string ItemCode { get; set; }
         
    }
}
