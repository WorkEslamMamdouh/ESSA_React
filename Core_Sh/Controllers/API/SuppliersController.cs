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
    public class SuppliersController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public SuppliersController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment	) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }

		[HttpPost]
		public string Update([FromBody] DataModel model)
		{
			try
			{
				D_A_Suppliers obj = JsonConvert.DeserializeObject<D_A_Suppliers>(model.DataSend);
				var ObjUpdated = _Services.UpdateD_A_Suppliers(obj);
                var Type = "Supplier";
                ResponseResult res = TransactionProcess(Convert.ToInt16(ObjUpdated.CompCode), 1, ObjUpdated.SupplierID, Type, "Update", db);
                if (res.ResponseState == true)
                {
                    //UpdateReplaceData(ObjUpdated); 
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
				D_A_Suppliers obj = JsonConvert.DeserializeObject<D_A_Suppliers>(model.DataSend);
				var ObjInserted = _Services.InsertD_A_Suppliers(obj);
				var Type = "Supplier"; 
                ResponseResult res = TransactionProcess(Convert.ToInt16(ObjInserted.CompCode), 1, ObjInserted.SupplierID, Type, "Add", db);
                if (res.ResponseState == true)
                {

                    //UpdateReplaceData(ObjInserted);

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
	 
        [HttpGet]
        public string checkDuplicatedCode(int CompCode, int SupplierID, string SupplierCode)
        {
            try
            {
                var Count = SqlQuery<CustomCount>("select Count(*) as Count from D_A_Suppliers where  SuppliersCode ='" + SupplierCode + "'  and SupplierID != " + SupplierID + " ").FirstOrDefault();
                return OkStr(new BaseResponse(Count.count));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }



        public void UpdateReplaceData(D_A_Suppliers ObjModel)
        {
            try
            {

                //**********************************************Update Replace Data***********************************************

                int FinYear = DateTime.Now.Year;

                var resultObject = GetDataFromRedis("D_A_Suppliers", "", "DataTable");

                var ModelRow = SqlQuery<D_A_Suppliers>("Select * from D_A_Suppliers where SupplierID = " + ObjModel.SupplierID + "").FirstOrDefault();
                //var ModelRow = ObjModel;

                var filteredResult = resultObject.OfType<D_A_Suppliers>().Where(x => !(x.SupplierID == ObjModel.SupplierID)).ToList();

                if (ModelRow != null)
                {
                    filteredResult.Add(ModelRow);
                }

                var fileHandler = new PostAndGetInTextFile(_hostingEnvironment);
                // Save the result to a file
                fileHandler.SetData(JsonConvert.SerializeObject(filteredResult, Formatting.Indented), "D_A_Suppliers", "DataTable");

                //************************************************************************************************

            }
            catch (Exception ex)
            {

            }
        }

    }
}