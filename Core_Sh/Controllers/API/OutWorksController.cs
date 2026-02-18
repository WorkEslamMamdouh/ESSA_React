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

namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class OutWorksController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public OutWorksController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }


        [HttpPost]
        public string Update([FromBody] DataModel model)
        {
            try
            {
                I_TR_ExternalLabor obj = JsonConvert.DeserializeObject<I_TR_ExternalLabor>(model.DataSend);
                var ObjUpdated = _Services.UpdateI_TR_ExternalLabor(obj);

                var Type = "OutWorks";

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
                I_TR_ExternalLabor obj = JsonConvert.DeserializeObject<I_TR_ExternalLabor>(model.DataSend);
                var ObjInserted = _Services.InsertI_TR_ExternalLabor(obj);
                var Type = "OutWorks";


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