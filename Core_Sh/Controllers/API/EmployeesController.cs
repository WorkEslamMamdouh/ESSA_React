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
    public class EmployeesController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public EmployeesController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment	) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }

		[HttpPost]
		public string Update([FromBody] DataModel model)
		{
			try
			{
                G_Employees obj = JsonConvert.DeserializeObject<G_Employees>(model.DataSend);
				var ObjUpdated = _Services.UpdateG_Employees(obj);
                ResponseResult res = TransactionProcess(Convert.ToInt16(ObjUpdated.CompCode), 1, ObjUpdated.EmpID, "Employees", "Update", db);
                if (res.ResponseState == true)
                { 
                    return OkStr(new BaseResponse(ObjUpdated));
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
                G_Employees obj = JsonConvert.DeserializeObject<G_Employees>(model.DataSend);
				var ObjInserted = _Services.InsertG_Employees(obj);  
                ResponseResult res = TransactionProcess(Convert.ToInt16(ObjInserted.CompCode), 1, ObjInserted.EmpID, "Employees", "Add", db);
                if (res.ResponseState == true)
                {
                    //ObjInserted.EmpCode = res.ResponseData.ToString();
                    return OkStr(new BaseResponse(ObjInserted));
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
		[HttpGet]
		public string checkDuplicatedCode(int CompCode, int EmpCode)
		{
			try
			{
				var Count = SqlQuery<CustomCount>("select Count(*) as Count from G_Employees where EmpCode = " + EmpCode + " and  CompCode  = "+ CompCode + "").FirstOrDefault();
				return OkStr(new BaseResponse(Count.count));
			}
			catch (Exception ex)
			{
				return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
			}
		}
		[HttpGet]
		public string checkDuplicatedUserLogin(string UserLogin)
		{
			try
			{
				var Count = SqlQuery<CustomCount>("select Count(*) as Count from G_USERS where USER_CODE = N'" + UserLogin + "'").FirstOrDefault();
				return OkStr(new BaseResponse(Count.count));
			}
			catch (Exception ex)
			{
				return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
			}
		}


	}
}