using Core.UI.Repository;
using Core.UI.Repository.Models;

namespace Core.UI.Models
{
    public class Get_BalanceOld
    { 
        public decimal ReceiptAmount { get; set; } = 0; 
        public decimal PaymentAmount { get; set; } = 0; 
        public decimal AmountHub { get; set; } = 0; 
        public decimal AmountCash { get; set; } = 0; 
        public decimal ItemAmount { get; set; } = 0; 
        public decimal MoneyCash { get; set; } = 0; 
    }
}
