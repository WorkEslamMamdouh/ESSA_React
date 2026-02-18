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
    public class FinancialTypeController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public FinancialTypeController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment ) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }

        [HttpPost]
        public string UpdateList([FromBody] DataModel model)
        {
            List<D_A_FinancialType> obj = JsonConvert.DeserializeObject<List<D_A_FinancialType>>(model.DataSend);

            try
            {

                List<D_A_FinancialType> InsertedItems = obj.Where(x => x.StatusFlag == 'i').ToList();
                List<D_A_FinancialType> UpdatedItems = obj.Where(x => x.StatusFlag == 'u').ToList();
                List<D_A_FinancialType> DeletedItems = obj.Where(x => x.StatusFlag == 'd').ToList();

                foreach (var item in InsertedItems)
                {
                    _Services.InsertD_A_FinancialType(item);

                }
                foreach (var item in UpdatedItems)
                {
                    _Services.UpdateD_A_FinancialType(item);

                }
                foreach (var item in DeletedItems)
                {
                    _Services.DeleteD_A_FinancialType(Convert.ToInt16(item.FinancialTypeID));
                }

                return OkStr(new BaseResponse(true));

            }
            catch (Exception ex)
            { 
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }


    }
}