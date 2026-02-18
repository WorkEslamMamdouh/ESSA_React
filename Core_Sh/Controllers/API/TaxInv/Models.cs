using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSAEinvoice
{


    public class ErrorMessage
    {
        public string type { get; set; }
        public object code { get; set; }
        public object category { get; set; }
        public string message { get; set; }
        public string status { get; set; }
    }


    public class ResultsTax
    {
        public ValidationResults validationResults { get; set; }
        public string clearanceStatus { get; set; }
        public object clearedInvoice { get; set; }
    }
    public class WebConfig
    {
        public string Name_Server { get; set; }
        public string Name_Data { get; set; }
        public string User_ID { get; set; }
        public string Password { get; set; }
        public string CompCode { get; set; }
        public string UnitID { get; set; }
        public string NameComp { get; set; }

    }




    public class QrModel
    {
        //string sellerName, string vatRegistrationNumber, string timeStamp, string invoiceTotal, string vatTotal, string hashedXml, sbyte[] publicKey, string digitalSignature, bool isSimplified, sbyte[] certificateSignature
        public string CompName { get; set; }
        public string VatNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<decimal> invoiceTotal { get; set; }
        public Nullable<decimal> vatTotal { get; set; }
        public string HashedXml { get; set; }
        public string privateKey { get; set; }
        public string public_key { get; set; }
        public string DigitalSignature { get; set; }
        public string Certificate { get; set; }
    }

    public class TLV
    {
        public byte TAG { get; set; }
        public byte Len { get; set; }
        public string Value { get; set; }
        public string HexVal { get; set; }
    }



    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class AccountingCustomerParty
    {
        public Party Party { get; set; }
    }

    public class AccountingSupplierParty
    {
        public Party Party { get; set; }
    }

    public class AdditionalDocumentReference
    {
        public string ID { get; set; }
        public long UUID { get; set; }
        public Attachment Attachment { get; set; }
    }

    public class Attachment
    {
        public string EmbeddedDocumentBinaryObject { get; set; }
    }

    public class Cert
    {
        public CertDigest CertDigest { get; set; }
        public IssuerSerial IssuerSerial { get; set; }
    }

    public class CertDigest
    {
        public string DigestMethod { get; set; }
        public string DigestValue { get; set; }
    }

    public class ClassifiedTaxCategory
    {
        public string ID { get; set; }
        public decimal Percent { get; set; } 
    }

    public class Country
    {
        public string IdentificationCode { get; set; }
    }

    public class Delivery
    {
        public DateTime ActualDeliveryDate { get; set; }
    }

    public class ExtensionContent
    {
        public UBLDocumentSignatures UBLDocumentSignatures { get; set; }
    }

    public static class GlobalVariables
    {
        public static long InvoiceID { get; set; }
        public static long InvoiceTrNo { get; set; }
        public static string InvoiceUUIDNew { get; set; }
        public static string InvoiceHashNew { get; set; }
        public static string InvoiceQr_CodeNew { get; set; }
        public static string SignatureNewValue { get; set; }
        public static string CertificateValue { get; set; }
        public static string SaveUrlFile { get; set; }
    }

    public class Allowance_ChargesInv
    {
        public string ID { get; set; }
        public decimal Percent { get; set; }
        public decimal Amount { get; set; }
        public decimal Vat_Amount { get; set; }
        public bool ChargeIndicator { get; set; }
    }

    public class TypeSendInv
    {
        public bool Production { get; set; }
        public bool Simulation { get; set; }
        public bool Test { get; set; }
    }

    public class Invoice_xml
    {
        public UBLExtensions UBLExtensions { get; set; }
        public string ProfileID { get; set; }
        public string ID { get; set; }
        public string BillingReferenceID { get; set; }
        public string UUID { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime IssueTime { get; set; }
        public string InvoiceType { get; set; }
        public int UnitID { get; set; } = 1;
        public int CompCode { get; set; } = 1;
        public int TrType { get; set; } = 0; 
        public int Status { get; set; } = 0;
        public long InvoiceID { get; set; } = 0;
        public bool IS_Standard { get; set; } = false;
        public string System { get; set; }
        public string PrevInvoiceHash { get; set; }
        public string TypeCode { get; set; }
        public string DocumentCurrencyCode { get; set; }
        public string TaxCurrencyCode { get; set; }
        public string InstructionNote { get; set; }
        public decimal LineCountNumeric { get; set; } 
        public AdditionalDocumentReference AdditionalDocumentReference { get; set; }
        public Signature Signature { get; set; }
        public AccountingSupplierParty AccountingSupplierParty { get; set; }
        public AccountingCustomerParty AccountingCustomerParty { get; set; }
        public Delivery Delivery { get; set; }
        public PaymentMeans PaymentMeans { get; set; }
        public TaxTotal TaxTotal_Header { get; set; }
        public LegalMonetaryTotal LegalMonetaryTotal { get; set; }
        public List<InvoiceLine_xml> InvoiceLine { get; set; }
        public QrModel QrModel { get; set; }
        //******************************************************* 
        public List<Inv_AdvDed> Inv_AdvDed { get; set; }

        //********************************************************** 
        public List<Inv_Allow> Inv_Allow { get; set; }

        //*******************************************************
        public List<Inv_HDDisc> Inv_HDDisc { get; set; }

        //*******************************************************
        public decimal hd_NetAmount { get; set; }
        public decimal Hd_TaxableAmount { get; set; }
        public decimal Hd_NetWithTax { get; set; }
        public decimal Hd_NetDeduction { get; set; }
        public decimal Hd_NetAdditions { get; set; }
        public decimal Hd_PaidAmount { get; set; }
        public decimal Hd_DueAmount { get; set; } 
        public decimal Hd_NetTax { get; set; } 
        public decimal hd_netTaxCaluated { get; set; } 
        public decimal HD_Round { get; set; } 
        public List<Allowance_ChargesInv> Allowance_ChargesInv { get; set; }

        //*********************************************************** 
        public List<InvoiceLinePrepaid_xml> InvoiceLinePrepaid { get; set; }

        //*****************************Credit****************************** 
        public List<Inv_Credit> Inv_Credit { get; set; }
    }

    public class Inv_Credit
    {
        public string BillingReferenceID { get; set; }
    }

    public class Inv_AdvDed
    {
        public decimal AdvDedAmount { get; set; }
        public decimal AdvDedVat { get; set; }
        public decimal AdvDedVatPrc { get; set; }
        public string AdvDedVatNat { get; set; }
        public string AdvDedReason { get; set; }
        public string AdvDedReasonCode { get; set; }
    }

    public class Inv_Allow
    {
        public decimal AllowAmount { get; set; }
        public decimal AllowVat { get; set; }
        public decimal AllowVatPrc { get; set; }
        public string AllowVatNat { get; set; }
        public string AllowReason { get; set; }
        public string AllowReasonCode { get; set; }
    }

    public class Inv_HDDisc
    {
        public decimal HDDiscAmount { get; set; }
        public decimal HDDiscVat { get; set; }
        public decimal HDDiscVatPrc { get; set; }
        public string HDDiscVatNat { get; set; }
        public string HDDiscReason { get; set; }
        public string HDDiscReasonCode { get; set; }
    }

    public class InvoiceLine_xml
    {
        public long ID { get; set; }
        public decimal InvoicedQuantity { get; set; }
        public decimal LineExtensionAmount { get; set; }
        public decimal DiscountPrc { get; set; }
        public decimal DiscountAmount { get; set; }
        public TaxTotal TaxTotal { get; set; }
        public Item Item { get; set; }
        public Price Price { get; set; }
    }


    public class InvoiceLinePrepaid_xml
    {
        public long LineID { get; set; }
        public string DocumentRefID { get; set; }
        public DateTime DocumentRefIssueDate { get; set; }
        public DateTime DocumentRefIssueTime { get; set; }
        public decimal RefTaxableAmount { get; set; }
        public decimal RefTaxAmount { get; set; } 
        public string RefTaxCategoryID { get; set; } 
        public decimal RefTaxPercent { get; set; } 
    }
    public class TypeInv
    {
        //public string Standard { get; set; } = @"0111010";
        public string Standard { get; set; } = @"0100000";
        public string Simplified { get; set; } = @"0200000";
    }

    public class Type_Code
    {
        public string INV { get; set; } = @"388";
        public string Debit { get; set; } = @"383";
        public string Credit { get; set; } = @"381";
    }

    public class IssuerSerial
    {
        public string X509IssuerName { get; set; }
        public string X509SerialNumber { get; set; }
    }

    public class Item
    {
        public string Name { get; set; }
        public string unitCode { get; set; }
        public ClassifiedTaxCategory ClassifiedTaxCategory { get; set; }
    }

    public class KeyInfo
    {
        public X509Data X509Data { get; set; }
    }

    public class LegalMonetaryTotal
    {
        public decimal LineExtensionAmount { get; set; }
        public decimal TaxExclusiveAmount { get; set; }
        public decimal TaxInclusiveAmount { get; set; }
        public decimal AllowanceTotalAmount { get; set; }
        public decimal PayableAmount { get; set; }
    }

    public class Object
    {
        public QualifyingProperties QualifyingProperties { get; set; }
    }

    public class Party
    {
        public PartyIdentification PartyIdentification { get; set; }
        public PostalAddress PostalAddress { get; set; }
        public PartyTaxScheme PartyTaxScheme { get; set; }
        public PartyLegalEntity PartyLegalEntity { get; set; }
    }

    public class PartyIdentification
    {
        public string ID { get; set; }
        public string Scheme_Name { get; set; }
    }

    public class PartyLegalEntity
    {
        public string RegistrationName { get; set; }
    }

    public class PartyTaxScheme
    {
        public string CompanyID { get; set; } 
    }

    public class PaymentMeans
    {
        public int PaymentMeansCode { get; set; }
    }

    public class PostalAddress
    {
        public string StreetName { get; set; }
        public string BuildingNumber { get; set; }
        public string PlotIdentification { get; set; }
        public string CitySubdivisionName { get; set; }
        public string CityName { get; set; }
        public string PostalZone { get; set; }
        public string CountrySubentity { get; set; }
        public Country Country { get; set; }
    }

    public class Price
    {
        public decimal PriceAmount { get; set; }
    }

    public class QualifyingProperties
    {
        public SignedProperties SignedProperties { get; set; }
    }

    public class Reference
    {
        public Transforms Transforms { get; set; }
        public string DigestMethod { get; set; }
        public string DigestValue { get; set; }
    }

    public class Root
    {
        public Invoice_xml Invoice { get; set; }
    }

    public class Signature
    {
        public SignedInfo SignedInfo { get; set; }
        public string SignatureValue { get; set; }
        public KeyInfo KeyInfo { get; set; }
        public Object Object { get; set; }
        public string ID { get; set; }
        public string SignatureMethod { get; set; }
    }

    public class SignatureInformation
    {
        public string ID { get; set; }
        public string ReferencedSignatureID { get; set; }
        public Signature Signature { get; set; }
    }

    public class SignedInfo
    {
        public string CanonicalizationMethod { get; set; }
        public string SignatureMethod { get; set; }
        public Reference Reference { get; set; }
    }

    public class SignedProperties
    {
        public SignedSignatureProperties SignedSignatureProperties { get; set; }
    }

    public class SignedSignatureProperties
    {
        public DateTime SigningTime { get; set; }
        public SigningCertificate SigningCertificate { get; set; }
    }

    public class SigningCertificate
    {
        public Cert Cert { get; set; }
    }

    public class TaxCategory
    {
        public string ID { get; set; }
        public decimal Percent { get; set; } 
    }
     
    public class TaxSubtotal
    {
        public decimal TaxableAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public TaxCategory TaxCategory { get; set; }
    }

    public class TaxTotal
    {
        public decimal TaxAmount { get; set; }
        public TaxSubtotal TaxSubtotal { get; set; }
        public decimal RoundingAmount { get; set; }
    }

    public class Transforms
    {
        public string DigestMethod { get; set; }
        public string DigestValue { get; set; }
    }

    public class UBLDocumentSignatures
    {
        public SignatureInformation SignatureInformation { get; set; }
    }

    public class UBLExtension
    {
        public string ExtensionURI { get; set; }
        public ExtensionContent ExtensionContent { get; set; }
    }

    public class UBLExtensions
    {
        public UBLExtension UBLExtension { get; set; }
    }

    public class X509Data
    {
        public string X509Certificate { get; set; }
    }


    public class ResultCSID
    {
        public long requestID { get; set; }
        public string dispositionMessage { get; set; }
        public string binarySecurityToken { get; set; }
        public string secret { get; set; }
        public object errors { get; set; }
    }
    public class InfoMessage
    {
        public string type { get; set; }
        public string code { get; set; }
        public string category { get; set; }
        public string message { get; set; }
        public string status { get; set; }
    }

    public class ResultReporting
    {
        public ValidationResults validationResults { get; set; }
        public string reportingStatus { get; set; }
    }

    public class ResultStandard
    {
        public ValidationResults validationResults { get; set; }
        public string clearanceStatus { get; set; }
        public string clearedInvoice { get; set; }
    }

    public class ValidationResults
    {
        public List<InfoMessage> infoMessages { get; set; }
        public List<WarningMessage> warningMessages { get; set; }
        public List<object> errorMessages { get; set; }
        public string status { get; set; }
    }

    public class WarningMessage
    {
        public string type { get; set; }
        public string code { get; set; }
        public string category { get; set; }
        public string message { get; set; }
        public string status { get; set; }
    }

    public class EGSUnitLocation
    {
        public string city { get; set; } = "";
        public string city_subdivision { get; set; } = "";
        public string street { get; set; } = "";
        public string plot_identification { get; set; } = "";
        public string building { get; set; } = "";
        public string postal_zone { get; set; } = "";
    }


    public class EGSUnitInfo
    {
        public string uuid { get; set; } = "";
        public string CustomId { get; set; } = "";
        public string Model { get; set; } = "";
        public string CRN_number { get; set; } = "";
        public string VAT_name { get; set; } = "";
        public string VAT_number { get; set; } = "";
        public string BranchName { get; set; } = "";
        public string BranchIndustry { get; set; } = "";
        public EGSUnitLocation location { get; set; }

        public string PrivateKey { get; set; } = "";
        public string CSR { get; set; } = "";
        public string ComplianceCertificate { get; set; } = "";
        public string ComplianceApiSecret { get; set; } = "";
        public string ProductionCertificate { get; set; } = "";
        public string ProductionApiSecret { get; set; } = "";
    }


    public class ZATCAPaymentMethods
    {
        public string CASH { get; set; }
        public string CREDIT { get; set; }
        public string BANK_ACCOUNT { get; set; }
        public string BANK_CARD { get; set; }
    }
    public class ZATCAInvoiceTypes
    {
        public string INVOICE { get; set; }
        public string DEBIT_NOTE { get; set; }
        public string CREDIT_NOTE { get; set; }
    }

    public class ZATCASimplifiedInvoiceLineItemDiscount
    {
        public decimal amount { get; set; }
        public string reason { get; set; }
    }

    public class ZATCASimplifiedInvoiceLineItemTax
    {
        public decimal percent_amount { get; set; }
    }

    public class ZATCASimplifiedInvoiceLineItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Quantity { get; set; }
        public decimal TaxExclusivePrice { get; set; }
        public ZATCASimplifiedInvoiceLineItemTax[] OtherTaxes { get; set; }
        public ZATCASimplifiedInvoiceLineItemDiscount[] Discounts { get; set; }
        public decimal VATPercent { get; set; }
    }

    public class ZATCASimplifiedInvoicCancelation
    {
        public int CanceledInvoiceNumber { get; set; }
        public ZATCAPaymentMethods PaymentMethod { get; set; }
        public ZATCAInvoiceTypes CancelationType { get; set; }
        public string Reason { get; set; }
    }

    public class ZATCASimplifiedInvoiceProps
    {
        public EGSUnitInfo egs_info { get; set; }
        public int invoice_counter_number { get; set; }
        public string invoice_serial_number { get; set; }
        public string Invoice_Type { get; set; }
        public string issue_date { get; set; }
        public string issue_time { get; set; }
        public string previous_invoice_hash { get; set; }
        public ZATCASimplifiedInvoiceLineItem[] line_items { get; set; }
        public ZATCASimplifiedInvoicCancelation cancelation { get; set; }
    }


    internal class LineItemInfo
    {
        public Dictionary<string, object> line_item_xml { get; set; }
        public LineItemTotals line_item_totals { get; set; }
    }

    internal class LineItemTotals
    {
        public decimal taxes_total { get; set; }
        public decimal discounts_total { get; set; }
        public decimal subtotal { get; set; }
    }

    internal class LineItemTotalsTotals
    {
        public List<Dictionary<string, object>> cacAllowanceCharges { get; set; }
        public Dictionary<string, object> cacTaxTotal { get; set; }
        public List<Dictionary<string, object>> cacClassifiedTaxCategories { get; set; }
        public decimal line_item_total_tax_exclusive { get; set; }
        public decimal line_item_total_taxes { get; set; }
        public decimal line_item_total_discounts { get; set; }
    }



    public class ApiResponse
    {
        [JsonProperty("IsSuccess")]
        public bool IsSuccess { get; set; }

        [JsonProperty("ErrorMessage")]
        public string ErrorMessage { get; set; }

        [JsonProperty("StatusCode")]
        public int StatusCode { get; set; }

        [JsonProperty("Response")]
        public TaxResponse Response { get; set; }
    }

    public class TaxResponse
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public string Reuslt { get; set; }
        public int StatusCode { get; set; }
        public object Response { get; set; }
        public string InvoiceXml { get; set; }
        public long InvoiceID { get; set; }
        public long InvoiceTrNo { get; set; }
        public string InvoiceUUIDNew { get; set; }
        public string InvoiceQr_CodeNew { get; set; }
        public string InvoiceHashNew { get; set; }
        public string PrevInvoiceHash { get; set; }
        public int TaxStatus { get; set; }

    }

    public class PramSendInvTax
    {
        public bool IS_Standard { get; set; }
        public string UUID { get; set; }
        public long InvoiceID { get; set; }
        public long InvoiceTrNo { get; set; } 
        public int Status { get; set; }
        public int TrType { get; set; }
        public int CompCode { get; set; }
        public int UnitID { get; set; }
        public string System { get; set; }

    }


    //********************************Model**********************************************
     
    public class IQ_KSATaxInvHeader
    {
        public int? CompCode { get; set; }
        public int? InvoiceID { get; set; }
        public int? TrNo { get; set; }
        public DateTime? TrDate { get; set; }
        public TimeSpan? TrTime { get; set; }
        public int? invoiceStatus { get; set; }
        public int? InvoiceTypeCode { get; set; }
        public int? InvoiceTransCode { get; set; }
        public int? TaxStatus { get; set; }
        public string DocUUID { get; set; }
        public string DocNo { get; set; }
        public int? GlobalInvoiceCounter { get; set; }
        public string PrevInvoiceHash { get; set; }
        public string RefNO { get; set; }
        public string InstructionNote { get; set; }
        public string QRCode { get; set; }
        public string SalesOrderRef { get; set; }
        public string SalesOrderDescr { get; set; }
        public DateTime? DeliverydateFrom { get; set; }
        public DateTime? DeliverydateTo { get; set; }
        public int? PaymentMeanCode { get; set; }
        public string purchaseorderDesc { get; set; }
        public string perofrmainvoiceno { get; set; }
        public string Cus_Name { get; set; }
        public string Cus_VatNo { get; set; }
        public string Cus_BuildingNumber { get; set; }
        public string Cus_CityName { get; set; }
        public string Cus_PostalZone { get; set; }
        public string Cus_StreetName { get; set; }
        public string Cus_governate { get; set; }
        public string Address_District { get; set; }
        public string Address_Build_Additional { get; set; }
        public string Address_Str_Additional { get; set; }
        public bool? ISPersonal { get; set; }
        public int? AdvDedAmount { get; set; }
        public int? AdvDedVat { get; set; }
        public decimal? AdvDedVatPrc { get; set; }
        public string AdvDedVatNat { get; set; }
        public string AdvDedReason { get; set; }
        public string AdvDedReasonCode { get; set; }
        public decimal? HDDiscAmount { get; set; }
        public decimal? HDDiscVat { get; set; }
        public decimal? HDDiscVatPrc { get; set; }
        public string HDDiscVatNat { get; set; }
        public string HDDiscReason { get; set; }
        public string HDDiscReasonCode { get; set; }
        public decimal? AllowAmount { get; set; }
        public decimal? AllowVat { get; set; }
        public decimal? AllowVatPrc { get; set; }
        public string AllowVatNat { get; set; }
        public string AllowReason { get; set; }
        public string AllowReasonCode { get; set; }
        public decimal? hd_NetAmount { get; set; }
        public decimal? Hd_TaxableAmount { get; set; }
        public decimal? Hd_NetWithTax { get; set; }
        public decimal? Hd_NetAdditions { get; set; }
        public decimal? Hd_NetDeduction { get; set; }
        public decimal? Hd_PaidAmount { get; set; }
        public decimal? Hd_DueAmount { get; set; }
        public decimal? Hd_NetTax { get; set; }
        public decimal? hd_netTaxCaluated { get; set; }
        public decimal? HD_Round { get; set; }

    }



    public class IQ_KSATaxInvItems
    {
        public int? TaxInvoiceID { get; set; }
        public int TaxInvoiceDetailID { get; set; }
        public int? TaxItemSerial { get; set; }
        public string TaxItemCode { get; set; }
        public string TaxItemDescr { get; set; }
        public string TaxItemUnit { get; set; }
        public decimal? TaxItemQty { get; set; }
        public decimal? TaxItemTotal { get; set; }
        public decimal? TaxItemUnitPrice { get; set; }
        public decimal? TaxItemNetTotal { get; set; }
        public decimal? TaxItemDiscPrc { get; set; }
        public decimal? TaxItemDiscAmt { get; set; }
        public decimal? TaxItemVatPrc { get; set; }
        public decimal? TaxItemVatAmt { get; set; }
        public string VatNatureCode { get; set; }
    }


    public class IQ_KSATaxInvHeader_PerPaid
    {
        public int BillPrePaidID { get; set; }
        public int? BillId { get; set; }
        public int? PrePaidBillId { get; set; }
        public int? TrNo { get; set; }
        public DateTime? TrDate { get; set; }
        public TimeSpan? TrTime { get; set; }
        public string DocNo { get; set; }
        public int? GlobalInvoiceCounter { get; set; }
        public decimal? AdvRemainAmount { get; set; }
        public decimal? AdvDeduction { get; set; }
        public decimal? AdvVatAmount { get; set; }
        public decimal? VatPrc { get; set; }
        public decimal? Advamount { get; set; }
        public string VatNat { get; set; }
    }


}


