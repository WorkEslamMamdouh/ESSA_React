using KSAEinvoice;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks; 
using System.Xml;
using System.Xml.Linq; 
using Core.UI.Controllers;
using Core.UI.IServices;
using Core.UI.Repository;
using Core.UI.Models;
using Microsoft.Extensions.Hosting.Internal;

public partial class TaxInv : BaseController
{

    private readonly _Interface _Services;
    private readonly IWebHostEnvironment _hostingEnvironment;
    public TaxInv(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
    {
        this._Services = _I_Services;
    }

    string _TaxSystem = "Ghost";

    public TaxResponse CreateXml_and_SendInv(int ID_Invoice, string NameFildID, string NameTableTrans, string NameViewHeader, string NameViewDetail, string NameViewPerPaid, string NameViewInvReferenceIDRet)
    {
        TaxResponse response = new TaxResponse();
        try
        {
             ExecuteSqlCommand("update " + NameTableTrans + " set  QRCode = null   where  " + NameFildID + " = " + ID_Invoice + "");
            TaxShared _Shared = new TaxShared();

            response = AssignModelTax(ID_Invoice, NameViewHeader, NameViewInvReferenceIDRet, NameViewDetail, NameViewPerPaid, NameFildID);

            if (!response.IsSuccess)
                return response;


            string Datajson = JsonConvert.SerializeObject(response.Response);
            response = _Shared.CallApi_Tax("CreateXml_and_SendInv", Datajson);

            if (response.IsSuccess)
            {

                Update_Invoice(NameTableTrans, NameFildID, ID_Invoice, response.PrevInvoiceHash, response.InvoiceQr_CodeNew, response.InvoiceUUIDNew, response.TaxStatus);
            }
            else
            {
                Update_InvoiceError(NameTableTrans, NameFildID, ID_Invoice, response.StatusCode.ToString(), response.ErrorMessage, 0);
            }

            return response;
        }
        catch (Exception ex)
        {
            // Log the exception and return an error response
            response.IsSuccess = false;
            response.ErrorMessage = ex.Message;
            return response;
        }
    }


    public TaxResponse CreateXml(int ID_Invoice, string NameFildID, string NameTableTrans, string NameViewHeader, string NameViewDetail, string NameViewPerPaid, string NameViewInvReferenceIDRet)
    {
        TaxResponse response = new TaxResponse();
        try
        {
           ExecuteSqlCommand("update " + NameTableTrans + " set  QRCode = null   where  " + NameFildID + " = " + ID_Invoice + "");

            TaxShared _Shared = new TaxShared();

            response = AssignModelTax(ID_Invoice, NameViewHeader, NameViewInvReferenceIDRet, NameViewDetail, NameViewPerPaid, NameFildID);

            if (!response.IsSuccess)
                return response;


            string Datajson = JsonConvert.SerializeObject(response.Response);
            response = _Shared.CallApi_Tax("CreateXml", Datajson);

            if (response.IsSuccess)
            {
                Update_Invoice(NameTableTrans, NameFildID, ID_Invoice, response.PrevInvoiceHash, response.InvoiceQr_CodeNew, response.InvoiceUUIDNew, response.TaxStatus);
            }
            else
            {
                Update_InvoiceError(NameTableTrans, NameFildID, ID_Invoice, response.StatusCode.ToString(), response.ErrorMessage, 0);
            }

            return response;
        }
        catch (Exception ex)
        {
            // Log the exception and return an error response
            response.IsSuccess = false;
            response.ErrorMessage = ex.Message;
            return response;
        }
    }


    public TaxResponse SendInvTax(string NameTableTrans, string NameFildID, int ID_Invoice, string UUID, long InvoiceTrNo, int CompCode, int UnitID, int TrType)
    {
        TaxResponse response = new TaxResponse();
        try
        {
            TaxShared _Shared = new TaxShared();

            PramSendInvTax _PramSendInvTax = new PramSendInvTax();
            _PramSendInvTax.IS_Standard = true;
            _PramSendInvTax.InvoiceID = ID_Invoice;
            _PramSendInvTax.UUID = UUID;
            _PramSendInvTax.InvoiceTrNo = InvoiceTrNo;
            _PramSendInvTax.CompCode = CompCode;
            _PramSendInvTax.UnitID = UnitID;
            _PramSendInvTax.TrType = 0;
            _PramSendInvTax.Status = 1;
            _PramSendInvTax.System = _TaxSystem;

            string Datajson = JsonConvert.SerializeObject(_PramSendInvTax);
            response = _Shared.CallApi_Tax("SendInvTax", Datajson);

            if (response.IsSuccess)
            {
                Update_Invoice(NameTableTrans, NameFildID, ID_Invoice, response.PrevInvoiceHash, response.InvoiceQr_CodeNew, response.InvoiceUUIDNew, response.TaxStatus);
            }
            else
            {
                Update_InvoiceError(NameTableTrans, NameFildID, ID_Invoice, response.StatusCode.ToString(), response.ErrorMessage, 3);
            }
            return response;
        }
        catch (Exception ex)
        {
            // Log the exception and return an error response
            response.IsSuccess = false;
            response.ErrorMessage = ex.Message;
            return response;
        }
    }

    public TaxResponse SendListInvTax(string NameTableTrans, string NameFildID, int ID_Invoice, string UUID, long InvoiceTrNo, int CompCode, int UnitID, int TrType)
    {
        TaxResponse response = new TaxResponse();
        try
        {
            TaxShared _Shared = new TaxShared();

            List<PramSendInvTax> ListPramSendInvTax = new List<PramSendInvTax>();

            PramSendInvTax _PramSendInvTax = new PramSendInvTax();
            _PramSendInvTax.IS_Standard = true;
            _PramSendInvTax.InvoiceID = ID_Invoice;
            _PramSendInvTax.UUID = UUID;
            _PramSendInvTax.InvoiceTrNo = InvoiceTrNo;
            _PramSendInvTax.CompCode = CompCode;
            _PramSendInvTax.UnitID = UnitID;
            _PramSendInvTax.TrType = 0;
            _PramSendInvTax.Status = 1;
            _PramSendInvTax.System = _TaxSystem;

            ListPramSendInvTax.Add(_PramSendInvTax);

            string Datajson = JsonConvert.SerializeObject(ListPramSendInvTax);
            response = _Shared.CallApi_Tax("SendListInvTax", Datajson);

            if (response.IsSuccess)
            {
                Update_Invoice(NameTableTrans, NameFildID, ID_Invoice, response.PrevInvoiceHash, response.InvoiceQr_CodeNew, response.InvoiceUUIDNew, 2);
            }
            else
            {
                Update_InvoiceError(NameTableTrans, NameFildID, ID_Invoice, response.StatusCode.ToString(), response.ErrorMessage, 3);
            }

            return response;
        }
        catch (Exception ex)
        {
            // Log the exception and return an error response
            response.IsSuccess = false;
            response.ErrorMessage = ex.Message;
            return response;
        }
    }


    public TaxResponse AssignModelTax(long IdInv, string NameViewHeader, string NameViewInvReferenceIDRet, string NameViewDetail, string NameViewPerPaid, string NameFildID)
    {
        TaxResponse response = new TaxResponse();
        TaxShared _Shared = new TaxShared();
        Invoice_xml props = _Shared.GetModelInvoice();
        decimal invoiceTotal = 0;
        decimal DiscountAmount = 0;
        decimal vatTotal = 0;
        DateTime _trDate = DateTime.Now;
        DateTime _time = DateTime.Now;

        try
        {
            //**************************************************Get AllData From Data Bes***********************************

            int UnitID = Get_UnitID(IdInv, NameViewHeader);
            IQ_KSATaxInvHeader InvHeader = Get_InvHeader(IdInv, NameViewHeader);
            List<IQ_KSATaxInvItems> InvItems = Get_TaxInvItems(IdInv, NameViewDetail);
            List<IQ_KSATaxInvHeader_PerPaid> Inv_PerPaid = Get_TaxInvHeader_PerPaid(IdInv, NameFildID, NameViewPerPaid);
            List<IQ_KSATaxInvHeader> ListInvRefIDRet = new List<IQ_KSATaxInvHeader>();
            if (NameViewInvReferenceIDRet != "" && NameViewInvReferenceIDRet != null)
            {
                ListInvRefIDRet = Get_ListInvRefIDRet(IdInv, NameViewInvReferenceIDRet);

            }
            else
            {
                if (InvHeader != null)
                {
                    ListInvRefIDRet.Add(InvHeader);
                }
            }
            //**************************************************************************************************************
            props.UnitID = UnitID;
            props.System = _TaxSystem;
            props.CompCode = Convert.ToInt16(InvHeader.CompCode);
            props.InvoiceID = Convert.ToInt32(InvHeader.InvoiceID);
            props.TrType = 0; // Inv = 0 or Ret = 1
            props.Status = 0;
            props.IS_Standard = InvHeader.InvoiceTransCode == 1 ? true : false;
            props.TypeCode = InvHeader.InvoiceTypeCode.ToString();

            //**************************************************Header******************************************************           

            _trDate = Convert.ToDateTime(InvHeader.TrDate);
            _trDate = _Shared.MargeTime_in_Date(_trDate, _time);

            props.PrevInvoiceHash = InvHeader.PrevInvoiceHash; //New = null or "";  
            //props.ID = _Shared.FormatTrNo(_trDate, Convert.ToInt32(InvHeader.TrNo)); //"2021/02/12/1230";  
            if (InvHeader.DocNo == null)
            {
                props.ID = _Shared.FormatTrNo(_trDate, Convert.ToInt32(InvHeader.TrNo)); //"2021/02/12/1230";  
            }
            else
            {
                if (InvHeader.DocNo.Trim() == "")
                {
                    props.ID = _Shared.FormatTrNo(_trDate, Convert.ToInt32(InvHeader.TrNo)); //"2021/02/12/1230";  
                }
                else
                {
                    props.ID = (InvHeader.DocNo); //"2021/02/12/1230";   
                }

            }



            if (string.IsNullOrEmpty(InvHeader.DocUUID))
            {
                props.UUID = Guid.NewGuid().ToString();
            }
            else if (InvHeader.DocUUID.Trim() == "")
            {
                props.UUID = Guid.NewGuid().ToString();
            }
            else
            {
                props.UUID = InvHeader.DocUUID.Trim().ToString();
            }
            props.IssueDate = _trDate; // Current date without time component
            props.IssueTime = _trDate; // Current date and time
            props.Delivery.ActualDeliveryDate = _trDate; // ActualDeliveryDate 
            props.AdditionalDocumentReference.UUID = Convert.ToInt32(InvHeader.GlobalInvoiceCounter); // DocumentReference UUID 
            props.PaymentMeans.PaymentMeansCode = Convert.ToInt16(InvHeader.PaymentMeanCode); // 30 Cred Or 10 Cash PaymentMeansCode  
                                                                                              //props.PaymentMeans.PaymentMeansCode = 10; // 30 Cred Or 10 Cash PaymentMeansCode  


            //***************************Return Data***************************************** 

            //*************************Invoice Inv_Credit*********************** 
            List<Inv_Credit> _AllInv_Credit = new List<Inv_Credit>();

            for (int i = 0; i < ListInvRefIDRet.Count(); i++)
            {
                List<Inv_Credit> _Inv_Credit = _Shared.GetCleanModelInv_Credit(props.Inv_Credit);

                _Inv_Credit[0].BillingReferenceID = ListInvRefIDRet[i].RefNO; // +(1 + i).ToString(); 

                _AllInv_Credit.Add(_Inv_Credit[0]);
            }

            props.Inv_Credit = _AllInv_Credit;

            //props.BillingReferenceID = InvHeader.RefNO; // "2021/02/12/1230";  //TrNoRef  رقم المرتجع 
            props.InstructionNote = InvHeader.InstructionNote; // "2021/02/12/1230";  //TrNoRef  رقم المرتجع                


            //********************************************************Customer***********************************

            props.AccountingCustomerParty.Party.PartyIdentification.ID = InvHeader.Cus_VatNo;
            props.AccountingCustomerParty.Party.PostalAddress.BuildingNumber = InvHeader.Cus_BuildingNumber;
            props.AccountingCustomerParty.Party.PostalAddress.CityName = InvHeader.Cus_CityName;
            props.AccountingCustomerParty.Party.PostalAddress.CitySubdivisionName = InvHeader.Cus_CityName;
            props.AccountingCustomerParty.Party.PostalAddress.CountrySubentity = InvHeader.Cus_governate;
            props.AccountingCustomerParty.Party.PostalAddress.PlotIdentification = InvHeader.Cus_VatNo;// InvHeader.Cus_PlotIdentification; 
            props.AccountingCustomerParty.Party.PostalAddress.PostalZone = InvHeader.Cus_PostalZone;
            props.AccountingCustomerParty.Party.PostalAddress.StreetName = InvHeader.Cus_StreetName;
            props.AccountingCustomerParty.Party.PostalAddress.Country.IdentificationCode = "SA";
            props.AccountingCustomerParty.Party.PartyLegalEntity.RegistrationName = InvHeader.Cus_Name.Trim();
            props.AccountingCustomerParty.Party.PartyTaxScheme.CompanyID = InvHeader.Cus_VatNo;

            //********************************************************_AllInvoiceLine***********************************

            List<InvoiceLine_xml> _AllInvoiceLine = new List<InvoiceLine_xml>();

            for (int i = 0; i < InvItems.Count(); i++)
            {
                List<InvoiceLine_xml> _InvoiceLine = _Shared.GetCleanModelInvoiceLine(props.InvoiceLine);
                _InvoiceLine[0].ID = Convert.ToInt32(InvItems[i].TaxInvoiceDetailID);
                _InvoiceLine[0].InvoicedQuantity = Convert.ToDecimal(InvItems[i].TaxItemQty);
                _InvoiceLine[0].Price.PriceAmount = Convert.ToDecimal(InvItems[i].TaxItemUnitPrice);
                _InvoiceLine[0].LineExtensionAmount = Convert.ToDecimal(InvItems[i].TaxItemNetTotal);
                _InvoiceLine[0].DiscountPrc = Convert.ToDecimal(InvItems[i].TaxItemDiscPrc);
                _InvoiceLine[0].DiscountAmount = Convert.ToDecimal(InvItems[i].TaxItemDiscAmt);


                _InvoiceLine[0].Item.unitCode = InvItems[i].TaxItemUnit;
                _InvoiceLine[0].Item.Name = InvItems[i].TaxItemDescr;
                _InvoiceLine[0].Item.ClassifiedTaxCategory.ID = InvItems[i].VatNatureCode;  //"S";
                _InvoiceLine[0].Item.ClassifiedTaxCategory.Percent = Convert.ToDecimal(InvItems[i].TaxItemVatPrc);



                _InvoiceLine[0].TaxTotal.TaxSubtotal.TaxCategory.ID = InvItems[i].VatNatureCode;  //"S";
                _InvoiceLine[0].TaxTotal.TaxSubtotal.TaxCategory.Percent = Convert.ToDecimal(InvItems[i].TaxItemVatPrc);


                invoiceTotal = invoiceTotal + (_InvoiceLine[0].LineExtensionAmount);
                vatTotal = vatTotal + (((_InvoiceLine[0].LineExtensionAmount * _InvoiceLine[0].TaxTotal.TaxSubtotal.TaxCategory.Percent) / 100));
                DiscountAmount = DiscountAmount + (_InvoiceLine[0].DiscountAmount);

                _AllInvoiceLine.Add(_InvoiceLine[0]);
            }
            props.InvoiceLine = _AllInvoiceLine;
            props.LineCountNumeric = props.InvoiceLine.Count(); // Example line count 


            //*************************Adv Invoice***********************
            props.Inv_AdvDed[0].AdvDedAmount = Convert.ToDecimal(InvHeader.AdvDedAmount);
            props.Inv_AdvDed[0].AdvDedVat = Convert.ToDecimal(InvHeader.AdvDedVat);
            props.Inv_AdvDed[0].AdvDedVatPrc = Convert.ToDecimal(InvHeader.AdvDedVatPrc);
            props.Inv_AdvDed[0].AdvDedVatNat = InvHeader.AdvDedVatNat;
            props.Inv_AdvDed[0].AdvDedReason = InvHeader.AdvDedReason;
            props.Inv_AdvDed[0].AdvDedReasonCode = InvHeader.AdvDedReasonCode;

            //*************************Discount Invoice*********************** 
            props.Inv_HDDisc[0].HDDiscAmount = Convert.ToDecimal(InvHeader.HDDiscAmount);
            props.Inv_HDDisc[0].HDDiscVat = Convert.ToDecimal(InvHeader.HDDiscVat);
            props.Inv_HDDisc[0].HDDiscVatPrc = Convert.ToDecimal(InvHeader.HDDiscVatPrc);
            props.Inv_HDDisc[0].HDDiscVatNat = InvHeader.HDDiscVatNat;
            props.Inv_HDDisc[0].HDDiscReason = InvHeader.HDDiscReason;
            props.Inv_HDDisc[0].HDDiscReasonCode = InvHeader.HDDiscReasonCode;

            //*************************Allow Invoice*********************** 
            props.Inv_Allow[0].AllowAmount = Convert.ToDecimal(InvHeader.AllowAmount);
            props.Inv_Allow[0].AllowVat = Convert.ToDecimal(InvHeader.AllowVat);
            props.Inv_Allow[0].AllowVatPrc = Convert.ToDecimal(InvHeader.AllowVatPrc);
            props.Inv_Allow[0].AllowVatNat = InvHeader.AllowVatNat;
            props.Inv_Allow[0].AllowReason = (InvHeader.AllowReason);
            props.Inv_Allow[0].AllowReasonCode = (InvHeader.AllowReasonCode);


            //*************************Total Invoice*********************** 
            props.hd_NetAmount = Convert.ToDecimal(InvHeader.hd_NetAmount);
            props.Hd_TaxableAmount = Convert.ToDecimal(InvHeader.Hd_TaxableAmount);
            props.Hd_NetWithTax = Convert.ToDecimal(InvHeader.Hd_NetWithTax);
            //props.Hd_NetDeduction = Convert.ToDecimal(InvHeader.Hd_NetDeduction);
            //props.Hd_NetAdditions = Convert.ToDecimal(InvHeader.Hd_NetAdditions);
            props.Hd_NetDeduction = Convert.ToDecimal(0);
            props.Hd_NetAdditions = Convert.ToDecimal(0);
            props.Hd_PaidAmount = Convert.ToDecimal(InvHeader.Hd_PaidAmount);
            props.Hd_DueAmount = Convert.ToDecimal(InvHeader.Hd_DueAmount);
            props.Hd_NetTax = Convert.ToDecimal(InvHeader.Hd_NetTax);
            props.hd_netTaxCaluated = Convert.ToDecimal(InvHeader.hd_netTaxCaluated);
            props.HD_Round = Convert.ToDecimal(InvHeader.HD_Round);



            //*************************Invoice Prepaid*********************** 
            List<InvoiceLinePrepaid_xml> _AllInvoicePrepaid = new List<InvoiceLinePrepaid_xml>();

            for (int i = 0; i < Inv_PerPaid.Count(); i++)
            {
                List<InvoiceLinePrepaid_xml> InvoiceLinePrepaid = _Shared.GetCleanModelInvoiceLinePrepaid(props.InvoiceLinePrepaid);
                InvoiceLinePrepaid[0].DocumentRefID = Inv_PerPaid[i].DocNo;
                InvoiceLinePrepaid[0].DocumentRefIssueDate = Convert.ToDateTime(Inv_PerPaid[i].TrDate);
                InvoiceLinePrepaid[0].DocumentRefIssueTime = DateTime.Today.Add(TimeSpan.Parse(Inv_PerPaid[i].TrTime.ToString()));
                InvoiceLinePrepaid[0].RefTaxCategoryID = Inv_PerPaid[i].VatNat;
                InvoiceLinePrepaid[0].RefTaxPercent = Convert.ToDecimal(Inv_PerPaid[i].VatPrc);
                InvoiceLinePrepaid[0].RefTaxableAmount = Convert.ToDecimal(Inv_PerPaid[i].AdvDeduction);
                InvoiceLinePrepaid[0].RefTaxAmount = Convert.ToDecimal(Inv_PerPaid[i].AdvVatAmount);


                _AllInvoicePrepaid.Add(InvoiceLinePrepaid[0]);
            }

            props.InvoiceLinePrepaid = _AllInvoicePrepaid;





            response.Response = props;
            response.IsSuccess = true;
            return response;
        }
        catch (Exception ex)
        {
            Invoice_xml _props = _Shared.GetModelInvoice();
            response.Response = _props;
            response.ErrorMessage = ex.Message;
            response.IsSuccess = false;
            return response;
        }

    }

    public int Get_UnitID(long IdInv, string NameViewHeader)
    {

        try
        {
            string Query = "select ISNULL(TaxUnitID,0) as UnitID  from [dbo].[I_Control] where CompCode = ( select CompCode from " + NameViewHeader + " where [InvoiceID] = N'" + IdInv.ToString() + "')"; 

            var DataTaxUnitID =  SqlQuery<TaxUnitID>(Query).FirstOrDefault();
            int _TaxUnitID = DataTaxUnitID.UnitID;
            return _TaxUnitID;
        }
        catch (Exception ex)
        {
            return 0;
        }

    }

    public IQ_KSATaxInvHeader Get_InvHeader(long IdInv, string NameViewHeader)
    {
        try
        {
            var InvHeader =  SqlQuery<IQ_KSATaxInvHeader>("select * from " + NameViewHeader + " where [InvoiceID] = N'" + IdInv.ToString() + "'").FirstOrDefault();
            return InvHeader;
        }
        catch (Exception ex)
        {
            return null;
        }

    }

    public List<IQ_KSATaxInvItems> Get_TaxInvItems(long IdInv, string NameViewDetail)
    {
        try
        {
            var InvHeader = SqlQuery<IQ_KSATaxInvItems>("select * from " + NameViewDetail + " where [TaxInvoiceID] = " + IdInv + "").ToList();
            return InvHeader;
        }
        catch (Exception ex)
        {
            return null;
        }

    }

    public List<IQ_KSATaxInvHeader_PerPaid> Get_TaxInvHeader_PerPaid(long IdInv, string NameFildID, string NameViewPerPaid)
    {
        try
        {
            var InvHeader = SqlQuery<IQ_KSATaxInvHeader_PerPaid>("select * from " + NameViewPerPaid + " where " + NameFildID + "  = " + IdInv + "").ToList();
            return InvHeader;
        }
        catch (Exception ex)
        {
            var _InvHeader = new List<IQ_KSATaxInvHeader_PerPaid>();
            return _InvHeader;
        }

    }
    public List<IQ_KSATaxInvHeader> Get_ListInvRefIDRet(long IdInv, string NameViewHeader)
    {
        try
        {
            var InvHeader =  SqlQuery<IQ_KSATaxInvHeader>("select * from " + NameViewHeader + " where [InvoiceID] = N'" + IdInv.ToString() + "'").ToList();
            return InvHeader;
        }
        catch (Exception ex)
        {
            var _InvHeader = new List<IQ_KSATaxInvHeader>();
            return _InvHeader;
        }

    }

    public TaxResponse Update_Invoice(string NameTableTrans, string NameFildID, long IdInv, string PrevInvoiceHash, string InvoiceQr_CodeNew, string InvoiceUUIDNew, int TaxStatus)
    {
        TaxResponse response = new TaxResponse();

        try
        {
            //UpdateInvoice
             ExecuteSqlCommand("update " + NameTableTrans + " set PrevInvoiceHash = N'" + PrevInvoiceHash + "' ,  QRCode = N'" + InvoiceQr_CodeNew + "' ,DocUUID =N'" + InvoiceUUIDNew + "' , TaxStatus =" + TaxStatus + " ,TaxErrorCode = N'200' where  " + NameFildID + "  = " + IdInv + "");


            response.IsSuccess = true;
            return response;
        }
        catch (Exception ex)
        {
            response.ErrorMessage = " Error Update TaxControl And Invoice : " + ex.Message;
            response.IsSuccess = false;
            return response;
        }


    }

    public TaxResponse Update_InvoiceError(string NameTableTrans, string NameFildID, long IdInv, string TaxErrorCode, string TaxErr_Desc, int TaxStatus)
    {
        TaxResponse response = new TaxResponse();

        try
        {
            if (TaxStatus == 3)
            {
                TaxStatus = 0;
            }
            //UpdateInvoice
            if (TaxErr_Desc == "HTTP request failed: An error occurred while sending the request.")
            {
                TaxErrorCode = "499";
            }
            ExecuteSqlCommand("update " + NameTableTrans + " set TaxErrorCode = N'" + TaxErrorCode + "' , TaxStatus =" + TaxStatus + " where  " + NameFildID + " = " + IdInv + "");


            response.IsSuccess = true;
            return response;
        }
        catch (Exception ex)
        {
            response.ErrorMessage = " Error Update TaxControl And Invoice : " + ex.Message;
            response.IsSuccess = false;
            return response;
        }


    }



}