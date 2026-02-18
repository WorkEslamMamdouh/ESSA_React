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
using Microsoft.Extensions.Hosting.Internal;

namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class JournalController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public JournalController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
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

				// Deserialize and populate A_JOURNAL_HEADER
				A_JOURNAL_HEADER A_JOURNAL_HEADER = JsonConvert.DeserializeObject<A_JOURNAL_HEADER>(JsonConvert.SerializeObject(obj.Master));

				// Deserialize and populate list of A_JOURNAL_DETAIL
				List<A_JOURNAL_DETAIL> A_JOURNAL_DETAIL = JsonConvert.DeserializeObject<List<A_JOURNAL_DETAIL>>(JsonConvert.SerializeObject(obj.Details)) ?? new List<A_JOURNAL_DETAIL>();

				// Insert main item and get inserted item's details
				var itemInsert = _Services.InsertA_JOURNAL_HEADER(A_JOURNAL_HEADER);

				if (itemInsert == null) throw new InvalidOperationException("Failed to insert main item.");

				// Group item units by status
				var insertedItems = A_JOURNAL_DETAIL.Where(x => x.StatusFlag == 'i').ToList();
				var updatedItems = A_JOURNAL_DETAIL.Where(x => x.StatusFlag == 'u').ToList();
				var deletedItems = A_JOURNAL_DETAIL.Where(x => x.StatusFlag == 'd').ToList();

				// Insert new item units
				foreach (var item in insertedItems)
				{
					item.VoucherID = itemInsert.VoucherID;
					_Services.InsertA_JOURNAL_DETAIL(item);
				}

				// Update existing item units
				foreach (var item in updatedItems)
				{
					item.VoucherID = itemInsert.VoucherID;
					_Services.UpdateA_JOURNAL_DETAIL(item);
				}

				// Delete removed item units
				foreach (var item in deletedItems)
				{
					if (item.VoucherDetailID.HasValue)
					{
						_Services.DeleteA_JOURNAL_DETAIL(Convert.ToInt16(item.VoucherDetailID));
					}
				}
				 

                ResponseResult res = TransactionProcess(Convert.ToInt16(itemInsert.COMP_CODE), 1, itemInsert.VoucherID, "Journal", "Add", db);
                if (res.ResponseState == true)
                {
                    itemInsert.VOUCHER_CODE = Convert.ToInt16(res.ResponseData);
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
		  
		[HttpPost]
		public string Update([FromBody] DataModel model)
		{
			try
			{
				// Deserialize MasterDetails object
				MasterDetails obj = JsonConvert.DeserializeObject<MasterDetails>(model.DataSend);
				if (obj == null) throw new ArgumentNullException(nameof(obj), "Input data is invalid.");

				// Deserialize and populate A_JOURNAL_HEADER
				A_JOURNAL_HEADER A_JOURNAL_HEADER = JsonConvert.DeserializeObject<A_JOURNAL_HEADER>(JsonConvert.SerializeObject(obj.Master));

				// Deserialize and populate list of A_JOURNAL_DETAIL
				List<A_JOURNAL_DETAIL> A_JOURNAL_DETAIL = JsonConvert.DeserializeObject<List<A_JOURNAL_DETAIL>>(JsonConvert.SerializeObject(obj.Details)) ?? new List<A_JOURNAL_DETAIL>();

				// Insert main item and get inserted item's details
				var itemInsert = _Services.UpdateA_JOURNAL_HEADER(A_JOURNAL_HEADER);

				if (itemInsert == null) throw new InvalidOperationException("Failed to insert main item.");

				// Group item units by status
				var insertedItems = A_JOURNAL_DETAIL.Where(x => x.StatusFlag == 'i').ToList();
				var updatedItems = A_JOURNAL_DETAIL.Where(x => x.StatusFlag == 'u').ToList();
				var deletedItems = A_JOURNAL_DETAIL.Where(x => x.StatusFlag == 'd').ToList();

				// Insert new item units
				foreach (var item in insertedItems)
				{
					item.VoucherID = itemInsert.VoucherID;
					_Services.InsertA_JOURNAL_DETAIL(item);
				}

				// Update existing item units
				foreach (var item in updatedItems)
				{
					item.VoucherID = itemInsert.VoucherID;
					_Services.UpdateA_JOURNAL_DETAIL(item);
				}

				// Delete removed item units
				foreach (var item in deletedItems)
				{
					if (item.VoucherDetailID.HasValue)
					{
						_Services.DeleteA_JOURNAL_DETAIL(Convert.ToInt16(item.VoucherDetailID));
					}
				}

 

                ResponseResult res = TransactionProcess(Convert.ToInt16(itemInsert.COMP_CODE), 1, itemInsert.VoucherID, "Journal", "Update", db);
                if (res.ResponseState == true)
                {
                    itemInsert.VOUCHER_CODE = Convert.ToInt16(res.ResponseData);
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