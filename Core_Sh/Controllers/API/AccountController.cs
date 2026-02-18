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
    public class AccountController : BaseController
    {
        private readonly _Interface _Services;
        public AccountController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }

        [HttpPost]
        public string Insert([FromBody] DataModel model)
        {
            try
            {
                A_ACCOUNT obj = JsonConvert.DeserializeObject<A_ACCOUNT>(model.DataSend);
                var ObjUpdated = _Services.InsertA_ACCOUNT(obj);

                var FIN_YEAR = DateTime.Now.Year;

                A_ACCOUNT_YEAR objYear = new A_ACCOUNT_YEAR();
                objYear.COMP_CODE = obj.COMP_CODE;
                objYear.ACC_CODE = obj.ACC_CODE;
                objYear.FIN_YEAR = FIN_YEAR;
                objYear.REMARKS = "";
                objYear.ACC_LIMIT = 0;

                var ObjUpdatedYear = _Services.InsertA_ACCOUNT_YEAR(objYear);
                if (ObjUpdated.PARENT_ACC != null || ObjUpdated.PARENT_ACC != "")
                {
                    ExecuteSqlCommand("Update A_ACCOUNT set DETAIL = 0 where ACC_CODE = '"+ObjUpdated.PARENT_ACC+"'");
                }
                //UpdateReplaceData(ObjUpdated);

                return OkStr(new BaseResponse(true));

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
                A_ACCOUNT obj = JsonConvert.DeserializeObject<A_ACCOUNT>(model.DataSend);
                if (obj.PARENT_ACC == "-1")
                {
                    obj.PARENT_ACC = null;
                }
                var ObjUpdated = _Services.UpdateA_ACCOUNT(obj);


                if (ObjUpdated.PARENT_ACC != null || ObjUpdated.PARENT_ACC != "")
                {
                    ExecuteSqlCommand("Update A_ACOUNT set DETAIL = 0 where ACC_CODE = '"+ObjUpdated.PARENT_ACC+"'");
                }
                return OkStr(new BaseResponse(true));

            }
            catch (ArgumentNullException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
            }

        }

    }
}