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
    public class G_COMPANYController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public G_COMPANYController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }


       
		[HttpPost]
        public string Insert([FromBody] DataModel model)
        {
            try
            {
				G_COMPANY obj = JsonConvert.DeserializeObject<G_COMPANY>(model.DataSend);
                var ObjInserted = _Services.InsertG_COMPANY(obj);
                var Type = "G_COMPANY";
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
				G_COMPANY obj = JsonConvert.DeserializeObject<G_COMPANY>(model.DataSend);
				var ObjUpdated = _Services.UpdateG_COMPANY(obj);

				return OkStr(new BaseResponse(true));


			}
			catch (ArgumentNullException ex)
			{
				return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
			}

		}
		
        [HttpGet]
        public string checkDuplicatedCOMP_CODE(int COMP_CODE)
        {
            try
            { 
                var Count = SqlQuery<CustomCount>("select Count(*) as Count from COMP_CODE where  COMP_CODE ='" + COMP_CODE + "'").FirstOrDefault();
                 return OkStr(new BaseResponse(Count.count));
            }
            catch (Exception ex)
            { 
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }









    }
}