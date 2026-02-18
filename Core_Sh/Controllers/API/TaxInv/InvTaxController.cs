
using KSAEinvoice; 
using Newtonsoft.Json; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 
using System.Xml;
using Core.UI.IServices;
using Core.UI.Repository;
using Microsoft.AspNetCore.Mvc;
using Core.UI.Models;
using Microsoft.Extensions.Hosting.Internal;

namespace Core.UI.Controllers
{
    public class InvTaxController : BaseController
    {


        private readonly _Interface _Services;
        private readonly TaxInv _TaxInv;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public InvTaxController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
            this._TaxInv = new TaxInv(dbContext, _I_Services , hostingEnvironment); // Initialize TaxInv here
        }
        //**************************************************************************************************

        [HttpGet]   
        public string CreateXml_and_SendInv(int ID_Invoice, string NameFildID, string NameTableTrans , string NameViewHeader, string NameViewDetail, string NameViewInvReferenceIDRet, string NameViewPerPaid)
        {
            TaxResponse response = new TaxResponse();
            try
            {
               

                response = _TaxInv.CreateXml_and_SendInv(ID_Invoice , NameFildID, NameTableTrans, NameViewHeader , NameViewDetail, NameViewPerPaid , NameViewInvReferenceIDRet);

                 
                return OkStr(new BaseResponse(response));
            }
            catch (Exception ex)
            {
                // Log the exception and return an error response
                response.IsSuccess = false;
                response.ErrorMessage = ex.Message;
                return OkStr(new BaseResponse(response));
            }
        }

        [HttpGet]
        public string CreateXml(int ID_Invoice, string NameFildID, string NameTableTrans, string NameViewHeader, string NameViewDetail, string NameViewInvReferenceIDRet, string NameViewPerPaid)
        {
            TaxResponse response = new TaxResponse();
            try
            {
               

                response = _TaxInv.CreateXml(ID_Invoice, NameFildID, NameTableTrans, NameViewHeader, NameViewDetail, NameViewPerPaid, NameViewInvReferenceIDRet);


                return OkStr(new BaseResponse(response));
            }
            catch (Exception ex)
            {
                // Log the exception and return an error response
                response.IsSuccess = false;
                response.ErrorMessage = ex.Message;
                return OkStr(new BaseResponse(response));
            }
        }

        [HttpGet]
        public string SendInvTax(string NameTableTrans, int ID_Invoice, string NameFildID, string UUID, long InvoiceTrNo, int CompCode, int UnitID, int TrType)
        {
            TaxResponse response = new TaxResponse();
            try
            {
                 

                response = _TaxInv.SendInvTax(NameTableTrans, NameFildID, ID_Invoice, UUID, InvoiceTrNo, CompCode, UnitID, TrType);


                return OkStr(new BaseResponse(response));
            }
            catch (Exception ex)
            {
                // Log the exception and return an error response
                response.IsSuccess = false;
                response.ErrorMessage = ex.Message;
                return OkStr(new BaseResponse(response));
            }
        }

        [HttpGet]
        public string SendListInvTax(string NameTableTrans, int ID_Invoice, string NameFildID, string UUID, long InvoiceTrNo, int CompCode, int UnitID, int TrType)
        {
            TaxResponse response = new TaxResponse();
            try
            {
             

                response = _TaxInv.SendListInvTax(NameTableTrans, NameFildID, ID_Invoice, UUID, InvoiceTrNo, CompCode, UnitID, TrType);


                return OkStr(new BaseResponse(response));
            }
            catch (Exception ex)
            {
                // Log the exception and return an error response
                response.IsSuccess = false;
                response.ErrorMessage = ex.Message;
                return OkStr(new BaseResponse(response));
            }
        }


    }
}
