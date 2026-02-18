using System;

namespace Core.UI.Repository.Models
{
    public partial class IProc_Rpt_CustomerSalesSum
    {
        public string Par_FromDate { get; set; }
        public string Par_ToDate { get; set; }
        public string Par_TrType_DescAr { get; set; }
        public string Par_TrType_DescEn { get; set; }
        public string Par_StatusDescAr { get; set; }
        public string Par_StatusDescEn { get; set; }
        public string Par_CashTypeAr { get; set; }
        public string Par_CashTypeEn { get; set; }
        public string Par_CustomerAr { get; set; }
        public string Par_CustomerEn { get; set; }
        public int Sls_SaleID { get; set; }
        public string Sls_TrNo { get; set; }
        public int? Sls_Trtype { get; set; }
        public bool? Sls_IsCash { get; set; }
        public DateTime? Sls_SaleDate { get; set; }
        public TimeSpan? Sls_TrTime { get; set; }
        public int? Sls_Status { get; set; }
        public int? Cus_CustomerId { get; set; }
        public string Sls_CustomerName { get; set; }
        public string Cus_CustomerCODEAr { get; set; }
        public string Cus_CustomerCODEEn { get; set; }
        public int? CashTyp_ID { get; set; }
        public string CashTyp_DescAr { get; set; }
        public string CashTyp_DescEn { get; set; }
        public decimal? Sls_ItemsTotal { get; set; }
        public decimal? Sls_Discount { get; set; }
        public decimal? Sls_TotalAmount { get; set; }
        public decimal? Sls_VatAmount { get; set; }
        public decimal? Sls_NetAmount { get; set; }
        public decimal? Sls_RemainAmount { get; set; }
        public decimal? Sls_PaymentAmount { get; set; }
        public int Comp_Code { get; set; }
        public string Comp_NameA { get; set; }
        public string Comp_NameE { get; set; }
        public string Cus_VatNo { get; set; }
        public bool? Cus_IsCreditCustomer { get; set; }
        public bool? Cus_ISPersonal { get; set; }
        public string User_Name { get; set; }
        public int? User_ID { get; set; }
        public string purchaseorderDesc { get; set; }
        public decimal? ItemQuantity { get; set; }
        public int? dlvOrder_TRNO { get; set; }
        public string dlvOrder_Date { get; set; }
        public string ChassisNo { get; set; }


    }

}
