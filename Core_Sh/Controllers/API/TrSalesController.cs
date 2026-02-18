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
using Microsoft.Reporting.Map.WebForms.BingMaps;
using KSAEinvoice;
using Microsoft.Extensions.Hosting.Internal;

namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class TrSalesController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public TrSalesController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment	) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }

		[HttpPost]
		public string Insert([FromBody] DataModel model)
		{
			try
			{
				// Deserialize MasterDetails object
				MasterDetails obj = JsonConvert.DeserializeObject<MasterDetails>(model.DataSend);
				if (obj == null) throw new ArgumentNullException(nameof(obj), "Input data is invalid.");

				// Deserialize and populate I_TR_Sales
				I_TR_Sales I_TR_Sales = JsonConvert.DeserializeObject<I_TR_Sales>(JsonConvert.SerializeObject(obj.Master));

				// Deserialize and populate list of I_TR_SaleDetails
				List<I_TR_SaleDetails> I_TR_SaleDetails = JsonConvert.DeserializeObject<List<I_TR_SaleDetails>>(JsonConvert.SerializeObject(obj.Details)) ?? new List<I_TR_SaleDetails>();

				// Insert main item and get inserted item's details
				var itemInsert = _Services.InsertI_TR_Sales(I_TR_Sales);

				if (itemInsert == null) throw new InvalidOperationException("Failed to insert main item.");

				// Group item units by status
				var insertedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'i').ToList();
				var updatedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'u').ToList();
				var deletedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'd').ToList();

				// Insert new item units
				foreach (var item in insertedItems)
				{
					item.SaleID = itemInsert.SaleID;
					_Services.InsertI_TR_SaleDetails(item);
				}

				// Update existing item units
				foreach (var item in updatedItems)
				{
					item.SaleID = itemInsert.SaleID;
					_Services.UpdateI_TR_SaleDetails(item);
				}

				// Delete removed item units
				foreach (var item in deletedItems)
				{
					if (item.SaleDetailID.HasValue)
					{
						_Services.DeleteI_TR_SaleDetails(Convert.ToInt16(item.SaleDetailID));
					}
				}

                ResponseResult res = TransactionProcess(Convert.ToInt16(itemInsert.CompCode), 1, itemInsert.SaleID, "SalesInv", "Add", db);
                if (res.ResponseState == true)
                {
					itemInsert.TrNo = Convert.ToInt16(res.ResponseData);
                    return OkStr(new BaseResponse(itemInsert));
                }
                else
                {
                    return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, "Error"));
                }


                // Return success response
                //return OkStr(new BaseResponse(itemInsert));
			}
			catch (ArgumentNullException ex)
			{
				return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
			}
			catch (InvalidOperationException ex)
			{
				return OkStr(new BaseResponse(HttpStatusCode.InternalServerError, ex.Message));
			}
			catch (Exception ex)
			{
				return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
			}
		}
    

        [HttpPost]
		public string Update([FromBody] DataModel model)
		{
			try
			{
				// Deserialize MasterDetails object
				MasterDetails obj = JsonConvert.DeserializeObject<MasterDetails>(model.DataSend);
				if (obj == null) throw new ArgumentNullException(nameof(obj), "Input data is invalid.");

				// Deserialize and populate I_TR_Sales
				I_TR_Sales I_TR_Sales = JsonConvert.DeserializeObject<I_TR_Sales>(JsonConvert.SerializeObject(obj.Master));

				// Deserialize and populate list of I_TR_SaleDetails
				List<I_TR_SaleDetails> I_TR_SaleDetails = JsonConvert.DeserializeObject<List<I_TR_SaleDetails>>(JsonConvert.SerializeObject(obj.Details)) ?? new List<I_TR_SaleDetails>();

				// Insert main item and get inserted item's details
				var itemInsert = _Services.UpdateI_TR_Sales(I_TR_Sales);

				if (itemInsert == null) throw new InvalidOperationException("Failed to insert main item.");

				// Group item units by status
				var insertedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'i').ToList();
				var updatedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'u').ToList();
				var deletedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'd').ToList();

				// Insert new item units
				foreach (var item in insertedItems)
				{
					item.SaleID = itemInsert.SaleID;
					_Services.InsertI_TR_SaleDetails(item);
				}

				// Update existing item units
				foreach (var item in updatedItems)
				{
					item.SaleID = itemInsert.SaleID;
					_Services.UpdateI_TR_SaleDetails(item);
				}

				// Delete removed item units
				foreach (var item in deletedItems)
				{
					if (item.SaleDetailID.HasValue)
					{
						_Services.DeleteI_TR_SaleDetails(Convert.ToInt16(item.SaleDetailID));
					}
				}

                ResponseResult res = TransactionProcess(Convert.ToInt16(itemInsert.CompCode), 1, itemInsert.SaleID, "SalesInv", "Update", db);
                if (res.ResponseState == true)
                {
                    itemInsert.TrNo = Convert.ToInt16(res.ResponseData);
                    return OkStr(new BaseResponse(itemInsert));
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
			catch (InvalidOperationException ex)
			{
				return OkStr(new BaseResponse(HttpStatusCode.InternalServerError, ex.Message));
			}
			catch (Exception ex)
			{
				return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
			}
		}


	}
}