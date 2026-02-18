using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Core.UI.Repository;
using Core.UI.Models;
using System.Reflection;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using Core.UI.Repository.Models;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;
using Core.UI.IServices;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Components;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Reflection.Emit;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using static Inv.API.Controllers.EGTaxController;
using System.Net.NetworkInformation;

namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class ReceiptController : BaseController
    {
        private readonly _Interface _Services;
        private readonly ModelDbContext db;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ReceiptController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment, ModelDbContext db) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
            this.db = db;
        }




        [HttpGet]
        public string UpdateStatus(int Status, int TransactionID, int comp, string Type, string Mode)
        {
            try
            {

                db.Database.ExecuteSqlRaw(" update [dbo].[I_TR_FinancialTransactions] set [Status] = " + Status + " where [TransactionID] = " + TransactionID );
      
                ResponseResult res = TransactionProcess(Convert.ToInt16(comp), 1, TransactionID, Type, Mode, db);
                if (res.ResponseState == true)
                {
                    return OkStr(new BaseResponse(true));
                }
                else
                {
                    return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, "Error"));
                }

            }
            catch (ArgumentNullException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
            }

        }

        [HttpPost]
        public string Update([FromBody] DataModel model)
        {
            try
            {
                I_TR_FinancialTransactions obj = JsonConvert.DeserializeObject<I_TR_FinancialTransactions>(model.DataSend);
                var ObjUpdated = _Services.UpdateI_TR_FinancialTransactions(obj);

                var Type = "Receipt";
                if (ObjUpdated.TrType == 1)
                {
                    Type = "Payment";
                }
                if (ObjUpdated.TrType == 3)
                {
                    Type = "Receipt";
                }
                if (ObjUpdated.TrType == 4)
                {
                    Type = "Payment";
                }
                ResponseResult res = TransactionProcess(Convert.ToInt16(ObjUpdated.CompCode), 1, ObjUpdated.TransactionID, Type, "Update", db);
                if (res.ResponseState == true)
                {
                    return OkStr(new BaseResponse(true));
                }
                else
                {
                    return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, "Error"));
                }

            }
            catch (ArgumentNullException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
            }

        }

        [HttpPost]
        public string Insert([FromBody] DataModel model)
        {
            try
            {
                I_TR_FinancialTransactions obj = JsonConvert.DeserializeObject<I_TR_FinancialTransactions>(model.DataSend);
                var ObjInserted = _Services.InsertI_TR_FinancialTransactions(obj);
                var Type = ObjInserted.TrType == 0 ? "Receipt" : "Payment";

                ResponseResult res = TransactionProcess(Convert.ToInt16(ObjInserted.CompCode), 1, ObjInserted.TransactionID, Type, "Add", db);
                if (res.ResponseState == true)
                {
                    return OkStr(new BaseResponse(true));
                }
                else
                {
                    return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, "Error"));
                }
            }
            catch (ArgumentNullException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
            }
        }

    }
}