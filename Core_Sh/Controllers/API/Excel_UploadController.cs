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
using System.Text;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Core.UI.Controllers
{
    public class Excel_UploadController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public Excel_UploadController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
            _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));
        }

        public  List<E_D_G_CreateTempExcel> _E_D_G_CreateTempExcel = new List<E_D_G_CreateTempExcel>();

        [HttpPost]
        public IActionResult Insert([FromBody] DataModel model)
        {
            SendDataExcel _SendDataExcel = JsonConvert.DeserializeObject<SendDataExcel>(model.DataSend);

            E_I_LogUploadExcel ExcelMaster = _SendDataExcel.E_I_LogUploadExcel;
            List<object> ListDataExcel = _SendDataExcel.DataTemp;

            try
            {

                // حجم كل مجموعة
                int batchSize = 25;

                // تقسيم القائمة الكبيرة إلى مجموعات
                List<List<object>> batches = ListDataExcel
                    .Select((item, index) => new { item, index })
                    .GroupBy(x => x.index / batchSize)
                    .Select(g => g.Select(x => x.item).ToList())
                    .ToList();


                ExcelMaster.LastCountLoop = batches.Count;



                //ProecssTransMoney(ListDataExcel, Convert.ToInt16(ExcelMaster.CompCode), Convert.ToInt16(sls.IDExcel), _SendDataExcel.IsPostDirectJournal);
                //********************************************************



                _E_D_G_CreateTempExcel = SqlQuery<E_D_G_CreateTempExcel>("Select * from E_D_G_CreateTempExcel where CompCode =  " + ExcelMaster.CompCode + " and IDTypeTemp = " + ExcelMaster.IDTypeTemp).ToList();



                int NumLoop = 0;
                // عرض النتائج
                foreach (var batch in batches)
                {
                    ExcelMaster.Status = -1;
                    var Exe = _Services.InsertE_I_LogUploadExcel(ExcelMaster);

                    ExecuteSqlCommand("delete [dbo].[E_I_ContainerDataExcel] where  IDExcel =  " + Exe.IDExcel);

                    // تمرير القائمة المجمعة إلى الدالة مع بقية المعاملات المطلوبة
                    ProecssTransMoney(NumLoop, Convert.ToInt16(Exe.CreateByUserID), batch, Convert.ToInt16(ExcelMaster.CompCode), Convert.ToInt16(Exe.IDExcel), Convert.ToInt16(Exe.IDTypeTemp));

                    ExecuteSqlCommand("Update  E_I_LogUploadExcel set Status = 1 where CompCode = " + ExcelMaster.CompCode + " and IDExcel = " + Exe.IDExcel);

                    ExcelMaster = Exe;

                    NumLoop++;
                }




                return Ok(new BaseResponse(ExcelMaster));

            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }

        public void ProecssTransMoney(int NumLoop_Batch, int CreateByUserID, List<object> objects, int compcode, int IDExcel, int IDTypeTemp)
        {

            StringBuilder models = new StringBuilder();

            models.AppendLine(@" INSERT INTO [dbo].[E_I_ContainerDataExcel]
                               ([NumLoop_Batch], [CreateByUserID],[IDExcel],[IDTypeTemp],[RowNumber],[NameTitle],[IDTempExcel],[IDFeildExcel],[ValueFelid],[Status],[ErrorMessage],[QueryRow])
                                  VALUES");


            bool FristRow = true;

            var RowNumber = 1;
            foreach (var obj in objects)
            {
                var model = JsonConvert.DeserializeObject<Dictionary<string, object>>(obj.ToString());

                foreach (var kvp in model)
                {


                    try
                    {

                        var TempEx = _E_D_G_CreateTempExcel.Where(x => x.NameTitle == kvp.Key).LastOrDefault();

                        if ((TempEx ?? null) == null )
                        {
                            continue;
                        }

                        int IDTempExcel =Convert.ToInt16(TempEx.IDTempExcel);
                        int IDFeildExcel = Convert.ToInt16(TempEx.IDFeildExcel);


                        if (FristRow)
                        {
                            models.AppendLine($"(" + NumLoop_Batch + " ," + CreateByUserID + " , " + IDExcel + "," + IDTypeTemp + "," + RowNumber + ",N'" + kvp.Key + "'," + IDTempExcel + " ," + IDFeildExcel + " ,'" + kvp.Value + "',1,'','' )");
                            FristRow = false;
                        }
                        else
                        {
                            models.AppendLine($",(" + NumLoop_Batch + " ," + CreateByUserID + " ," + IDExcel + "," + IDTypeTemp + "," + RowNumber + ",N'" + kvp.Key + "'," + IDTempExcel + "," + IDFeildExcel + " ,'" + kvp.Value + "',1,'','')");
                        }

                    }
                    catch (Exception ex)
                    {


                    }



                }

                RowNumber++;

            }

            string allQuery = models.ToString();

            // ExecuteSqlCommand("delete [I_ProecssTransTemplate] where CompCode =" + compcode + " and IDExcel = " + IDExcel + " "); // delete All Table
            ExecuteSqlCommand(allQuery);// insert All Data in Table
            //ExecuteSqlCommand("G_ProecssTransTemplateInsert  " + compcode + " ," + IDExcel + " , "+ IsPostDirectJournal + "");// Run Proecss Trans Template and Insert
        }
        //**************************************************Insert Users by using Zone********************************************************* 
        //   [HttpPost]
        //   public IActionResult InsertUsers([FromBody] DataModel model)
        //   {
        //       SendDataExcel _SendDataExcel = JsonConvert.DeserializeObject<SendDataExcel>(model.DataSend);

        //       E_I_LogUploadExcel ExcelMaster = _SendDataExcel.E_I_LogUploadExcel;
        //       List<object> ListDataExcel = _SendDataExcel.DataTemp;

        //       try
        //       {

        //           // حجم كل مجموعة
        //           int batchSize = 800;

        //           // تقسيم القائمة الكبيرة إلى مجموعات
        //           List<List<object>> batches = ListDataExcel
        //               .Select((item, index) => new { item, index })
        //               .GroupBy(x => x.index / batchSize)
        //               .Select(g => g.Select(x => x.item).ToList())
        //               .ToList();


        //           ExcelMaster.LastCountLoop = batches.Count;

        //           var sls = _Services.InsertE_I_LogUploadExcel(ExcelMaster);

        //           //ProecssTransMoney(ListDataExcel, Convert.ToInt16(ExcelMaster.CompCode), Convert.ToInt16(sls.IDExcel), _SendDataExcel.IsPostDirectJournal);
        //           //********************************************************



        //           NumLoop = 0;
        //           // عرض النتائج
        //           foreach (var batch in batches)
        //           {
        //               // تمرير القائمة المجمعة إلى الدالة مع بقية المعاملات المطلوبة
        //               ProecssInsertUsers(batch, Convert.ToInt16(ExcelMaster.CompCode), Convert.ToInt16(sls.IDExcel), _SendDataExcel.FamilyZoneID, _SendDataExcel.ZoneId , _SendDataExcel.SupervisorID);

        //               NumLoop++;
        //           }






        //           return Ok(new BaseResponse(sls));

        //       }
        //       catch (Exception ex)
        //       {
        //           return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //       }

        //   }

        //   public void ProecssInsertUsers(List<object> objects, int compcode, int IDExcel, int FamilyZoneID, int ZoneId, int? SupervisorID)
        //   {

        //       StringBuilder models = new StringBuilder();

        //       models.AppendLine(@" INSERT INTO [dbo].[Temp_Users_Insert] ([IDExcel],[NumLoop],[CompCode],[FamilyZoneID],[ZoneId],[SupervisorID],[USERID],[UserName]) VALUES");


        //       bool FristRow = true;
        //       foreach (var obj in objects)
        //       {
        //           var model = JsonConvert.DeserializeObject<Dictionary<string, object>>(obj.ToString());

        //           string Usr = "" + model["USERID"] + "";

        //           if (Usr == "NULL")
        //           {
        //               continue;
        //           }

        //           if (model["USERID"] == "NULL")
        //           {
        //               continue;
        //           }
        //           if (model["USERID"] == null)
        //           {
        //               continue;
        //           }

        //           if (model["USERID"].ToString().Trim() == "")
        //           {
        //               continue;
        //           }

        //           try
        //           {
        //               //if (Convert.ToInt16(kvp.Value) != 0)
        //               //{
        //               var Supr = SupervisorID == null ? "Null" : SupervisorID.ToString();


        //if (FristRow)
        //               {
        //                   models.AppendLine($"(" + IDExcel + "," + NumLoop + "," + compcode + "," + FamilyZoneID + "," + ZoneId + "," + Supr + " ,'" + model["USERID"] + "','" + model["UserName"] + "' )");
        //                   FristRow = false;
        //               }
        //               else
        //               {
        //                   models.AppendLine($",(" + IDExcel + "," + NumLoop + "," + compcode + "," + FamilyZoneID + "," + ZoneId + ","+Supr+",'" + model["USERID"] + "','" + model["UserName"] + "' )");
        //               }
        //               //}
        //           }
        //           catch (Exception ex)
        //           {


        //           }
        //       }

        //       string allQuery = models.ToString();

        //       // ExecuteSqlCommand("delete [I_ProecssTransTemplate] where CompCode =" + compcode + " and IDExcel = " + IDExcel + " "); // delete All Table
        //       ExecuteSqlCommand(allQuery);// insert All Data in Table
        //       //ExecuteSqlCommand("G_ProecssTransTemplateInsert  " + compcode + " ," + IDExcel + " , "+ IsPostDirectJournal + "");// Run Proecss Trans Template and Insert
        //   }


        //***********************************************************************************************************


        //**************************************************Insert All Users by Push********************************************************* 
        //[HttpPost]
        //public IActionResult InsertAllUsers([FromBody] DataModel model)
        //{
        //    SendDataExcel _SendDataExcel = JsonConvert.DeserializeObject<SendDataExcel>(model.DataSend);

        //    E_I_LogUploadExcel ExcelMaster = _SendDataExcel.E_I_LogUploadExcel;
        //    List<object> ListDataExcel = _SendDataExcel.DataTemp;

        //    try
        //    {

        //        // حجم كل مجموعة
        //        int batchSize = 800;

        //        // تقسيم القائمة الكبيرة إلى مجموعات
        //        List<List<object>> batches = ListDataExcel
        //            .Select((item, index) => new { item, index })
        //            .GroupBy(x => x.index / batchSize)
        //            .Select(g => g.Select(x => x.item).ToList())
        //            .ToList();


        //        ExcelMaster.LastCountLoop = batches.Count;

        //        var sls = _Services.InsertE_I_LogUploadExcel(ExcelMaster);

        //        //ProecssTransMoney(ListDataExcel, Convert.ToInt16(ExcelMaster.CompCode), Convert.ToInt16(sls.IDExcel), _SendDataExcel.IsPostDirectJournal);
        //        //********************************************************



        //       int NumLoop = 0;
        //        // عرض النتائج
        //        foreach (var batch in batches)
        //        {
        //            // تمرير القائمة المجمعة إلى الدالة مع بقية المعاملات المطلوبة
        //            ProecssInsertAllUsers(batch, Convert.ToInt16(ExcelMaster.CompCode), Convert.ToInt16(sls.IDExcel));

        //            NumLoop++;
        //        }






        //        return Ok(new BaseResponse(sls));

        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //    }

        //}

        //public void ProecssInsertAllUsers(int NumLoop , List<object> objects, int compcode, int IDExcel)
        //{

        //    StringBuilder models = new StringBuilder();

        //    models.AppendLine(@" INSERT INTO [dbo].[Temp_Users_Insert] ([IDExcel],[NumLoop],[CompCode],[FamilyZoneID],[ZoneId],[SupervisorID],[USERID],[UserName]) VALUES");


        //    bool FristRow = true;
        //    foreach (var obj in objects)
        //    {
        //        var model = JsonConvert.DeserializeObject<Dictionary<string, object>>(obj.ToString());

        //        string Usr = "" + model["USERID"] + "";

        //        if (Usr == "NULL")
        //        {
        //            continue;
        //        }

        //        if (model["USERID"] == "NULL")
        //        {
        //            continue;
        //        }
        //        if (model["USERID"] == null)
        //        {
        //            continue;
        //        }

        //        if (model["USERID"].ToString().Trim() == "")
        //        {
        //            continue;
        //        }

        //        try
        //        {
        //            //if (Convert.ToInt16(kvp.Value) != 0)
        //            //{
        //            var Supr = model["SupervisorCode"] == null ? "Null" : model["SupervisorCode"];
        //            var UserName = model["UserName"].ToString().Replace("'", " ");


        //            if (FristRow)
        //            {
        //                models.AppendLine($"(" + IDExcel + "," + NumLoop + "," + compcode + "," + model["FamilyZoneCode"] + "," + model["ZoneCode"] + "," + Supr + " ,'" + model["USERID"] + "',N'" + UserName + "' )");
        //                FristRow = false;
        //            }
        //            else
        //            {
        //                models.AppendLine($",(" + IDExcel + "," + NumLoop + "," + compcode + "," + model["FamilyZoneCode"] + "," + model["ZoneCode"] + "," + Supr + ",'" + model["USERID"] + "',N'" + UserName + "' )");
        //            }
        //            //}
        //        }
        //        catch (Exception ex)
        //        {

        //        }
        //    }

        //    string allQuery = models.ToString();

        //    // ExecuteSqlCommand("delete [I_ProecssTransTemplate] where CompCode =" + compcode + " and IDExcel = " + IDExcel + " "); // delete All Table
        //    ExecuteSqlCommand(allQuery);// insert All Data in Table
        //    //ExecuteSqlCommand("G_ProecssTransTemplateInsert  " + compcode + " ," + IDExcel + " , "+ IsPostDirectJournal + "");// Run Proecss Trans Template and Insert
        //}


        //***********************************************************************************************************


        [HttpPost]
        public IActionResult UpdateListTemp([FromBody] DataModel model)
        {
            List<G_DefTempExcel> obj = JsonConvert.DeserializeObject<List<G_DefTempExcel>>(model.DataSend);

            try
            {

                if (obj.Count > 0)
                {
                    var DataChack = SqlQuery<G_DefTempExcel>("Select * from G_DefTempExcel Where CompCode = " + obj[0].CompCode + " and TrType = 0 and IDTypeTemp =" + obj[0].IDTypeTemp + " ").ToList();

                    if (DataChack.Count == 0)
                    {
                        string Qury = @" INSERT INTO [dbo].[G_DefTempExcel] ([CompCode] ,[IDTypeTemp] , [NameTitle] ,[Remark] ,[TrType] ,[IDType]) VALUES
                                           (" + obj[0].CompCode + @"," + obj[0].IDTypeTemp + @",'USERID','',0,null)";

                        ExecuteSqlCommand(Qury);
                    }
                }

                List<G_DefTempExcel> InsertedItems = obj.Where(x => x.StatusFlag == 'i').ToList();
                List<G_DefTempExcel> UpdatedItems = obj.Where(x => x.StatusFlag == 'u').ToList();
                List<G_DefTempExcel> DeletedItems = obj.Where(x => x.StatusFlag == 'd').ToList();

                foreach (var item in InsertedItems)
                {
                    _Services.InsertG_DefTempExcel(item);

                }
                foreach (var item in UpdatedItems)
                {
                    _Services.UpdateG_DefTempExcel(item);

                }
                foreach (var item in DeletedItems)
                {
                    _Services.DeleteG_DefTempExcel(Convert.ToInt16(item.ID));
                }

                return Ok(new BaseResponse(true));

            }
            catch (Exception ex)
            {


                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }

    }


}

