using AspNetCore.Reporting;
using Core.UI.IServices;
using Core.UI.Models;
using Core.UI.Repository;
using Core.UI.Repository.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal; 
using Microsoft.Extensions.Logging;
using Microsoft.Reporting.NETCore; 
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using QRCoder;
using RestSharp;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Drawing; 
using System.Drawing.Imaging;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;
using System.Xml;
using static Inv.API.Controllers.EGTaxController;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using LocalReport = Microsoft.Reporting.NETCore.LocalReport;

namespace Core.UI.Controllers
{
    public class GeneralReportsController : BaseController
    {
        private readonly _Interface _Services;

        private readonly IWebHostEnvironment _hostingEnvironment;
        public GeneralReportsController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
            _hostingEnvironment = hostingEnvironment;
        }


        

        [HttpGet]
        public IActionResult PrintReport(string NameStord, string NameReport, string DataParamter, string FromFolder, string PDFName)
        {
            try
            {

                List<RepParamter> _Parameters = JsonConvert.DeserializeObject<List<RepParamter>>(DataParamter);

                StringBuilder models = new StringBuilder();

                models.AppendLine(@" DECLARE	@return_value int ");

                models.AppendLine(@" EXEC	@return_value =	" + NameStord);

                int first = 0;

                foreach (var _Param in _Parameters)
                {
                    if (first == 0)
                    {
                        models.AppendLine(@"  @" + _Param.Parameter + " = " + (_Param.Value == "null" ? "NULL" : "N'" + _Param.Value + "'"));
                         
                    }
                    else
                    {
                        models.AppendLine(@", @" + _Param.Parameter + " = " + (_Param.Value == "null" ? "NULL" : "N'" + _Param.Value + "'"));
                    }

                    first = 1;
                }

               

                if (NameStord == "IProc_Prnt_SlsInvoice")
                {
                   var objInv = SqlQuery<IProc_Prnt_SlsInvoice>(models.ToString()).ToList();

                    string qr = objInv[0].HD_QRCode;

                    QRCodeGenerator qRCodeGenerator = new QRCodeGenerator();
                    QRCodeData qRCodeData = qRCodeGenerator.CreateQrCode(qr, QRCoder.QRCodeGenerator.ECCLevel.Q);

                    QRCoder.QRCode qRCode = new QRCoder.QRCode(qRCodeData);
                    var QRcode = "";
                    using (Bitmap bitmap = qRCode.GetGraphic(2))
                    {
                        using (MemoryStream ms = new MemoryStream())
                        {
                            bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                            byte[] byteimage = ms.ToArray();
                            QRcode = Convert.ToBase64String(byteimage);

                        }
                    }
                    objInv[0].HD_QRCode = QRcode;

                    TafkeetArab TafkeetArab = new TafkeetArab();
                    objInv[0].TfkeetAR = TafkeetArab.BSE_TafkeetArab(" جنيهاً ", " قرش ", objInv[0].HD_NetAmount)+ " فقـط لاغيـر ";

                    return BindReport(NameReport,  FromFolder , PDFName , objInv); 
                }
                else if (NameStord == "IProc_Prnt_Financial")
                {
                    var objInv = SqlQuery<IProc_Prnt_Financial>(models.ToString()).ToList();
  
                    TafkeetArab TafkeetArab = new TafkeetArab();
                    objInv[0].Tfkeet = TafkeetArab.BSE_TafkeetArab(" جنيهاً ", " قرش ", objInv[0].Tr_DueAmount) + " فقـط لاغيـر ";

                    return BindReport(NameReport, FromFolder, PDFName, objInv);
                } 
                else if (NameStord == "IProc_Prnt_Quotation")
                {
                    var objInv = SqlQuery<IProc_Prnt_Quotation>(models.ToString()).ToList();
  
                    TafkeetArab TafkeetArab = new TafkeetArab();
                    objInv[0].TfkeetAR = TafkeetArab.BSE_TafkeetArab(" جنيهاً ", " قرش ", objInv[0].HD_NetAmount) + " فقـط لاغيـر ";

                    return BindReport(NameReport, FromFolder, PDFName, objInv);
                } else if (NameStord == "IProc_Prnt_Purchases")
                {
                    var objInv = SqlQuery<IProc_Prnt_Purchases>(models.ToString()).ToList();
  
                    TafkeetArab TafkeetArab = new TafkeetArab();
                    objInv[0].TfkeetAR = TafkeetArab.BSE_TafkeetArab(" جنيهاً ", " قرش ", objInv[0].HD_NetAmount) + " فقـط لاغيـر ";

                    return BindReport(NameReport, FromFolder, PDFName, objInv);
                } else if (NameStord == "IProc_Prnt_ExternalLabor")
                {
                    var objInv = SqlQuery<IProc_Prnt_ExternalLabor>(models.ToString()).ToList();
  
                    TafkeetArab TafkeetArab = new TafkeetArab();
                    objInv[0].Tfkeet = TafkeetArab.BSE_TafkeetArab(" جنيهاً ", " قرش ", objInv[0].Tr_DueAmount) + " فقـط لاغيـر ";

                    return BindReport(NameReport, FromFolder, PDFName, objInv);
                }
                else
                {
                     var obj = Get_Model(models.ToString(), NameStord);
                    return BindReport(NameReport, FromFolder, PDFName, obj);
                } 
            }
            catch (Exception ex)
            {

                return null;
            }
             
        }  
        public string GetServerPath(string virtualPath)
        {
            // Map the virtual path to the physical path
            string physicalPath = Path.Combine(_hostingEnvironment.WebRootPath, virtualPath.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString()));

            return physicalPath;
        }
 
       

        public IActionResult BindReport(string NameReport, string FromFolder,string PDFName, object models)
        {

            string serverPath = GetServerPath(@"/Reports/"+ FromFolder +"/"); // Specify the server location to save the file

            // Create the directory if it doesn't exist
            Directory.CreateDirectory(serverPath);

            string filePath = Path.Combine(serverPath, NameReport + ".rdlc");

            //var filePath = Path.Combine(_hostingEnvironment.ContentRootPath, "wwwroot", "Reports", "Get_Balance_TestAr.rdlc");


            if (System.IO.File.Exists(filePath))
            {
                var localReport = new LocalReport
                {
                    ReportPath = filePath, // Replace with the path to your RDLC file
                };

                // Add data source to the report
                var reportDataSource = new ReportDataSource("DataSet1", models);
                localReport.DataSources.Add(reportDataSource);

                // Render the report to a byte array
                var reportBytes = localReport.Render("PDF");

                if ((PDFName ?? "").Trim() == "")
                {
                    return File(reportBytes, "application/pdf");
                }

                // اسم الملف
                string fileName = PDFName +".pdf";

                // Return the report as a FileResult (PDF in this example)
                return File(reportBytes, "application/pdf" , fileName);

            }
            else
            {
                // Handle the case where the file is not found
                return NotFound();
            }


        }


        public string DownloadContract(byte[] contractByte)
        {
            try
            {

                string serverPath = GetServerPath(@"/SavePdf/"); // Specify the server location to save the file

                // Create the directory if it doesn't exist
                Directory.CreateDirectory(serverPath);

                string filePath = Path.Combine(serverPath, "Pdf_Invoices.pdf");


                System.IO.File.WriteAllBytes(filePath, contractByte);

                filePath = filePath.Replace(@"\", "/");

                return filePath;


            }
            catch (Exception ex)
            {
                return "";
            }


        }

        public object Get_Model(string query, string NameClass)
        {
            // Ensure NameClass includes the namespace, if not add it manually or as per your application's namespace
            string fullyQualifiedNameClass = NameClass.Contains(".") ? NameClass : $"Core.UI.Repository.Models.{NameClass}";

            // Attempt to get the type directly
            Type type = Type.GetType(fullyQualifiedNameClass);

            if (type == null)
            {
                // Try to find the type within the loaded assemblies
                type = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(a => a.GetTypes())
                    .FirstOrDefault(t => t.Name.Equals(NameClass, StringComparison.OrdinalIgnoreCase));
            }

            if (type == null)
            {
                throw new InvalidOperationException($"Type '{NameClass}' not found.");
            }

            // Use reflection to call the generic method
            MethodInfo method = GetType().GetMethod(nameof(SqlQueryAsync), BindingFlags.NonPublic | BindingFlags.Instance);
            if (method == null)
            {
                throw new InvalidOperationException($"Method '{nameof(SqlQueryAsync)}' not found.");
            }

            MethodInfo genericMethod = method.MakeGenericMethod(type);
            if (genericMethod == null)
            {
                throw new InvalidOperationException($"Failed to make generic method for '{nameof(SqlQueryAsync)}'.");
            }

            var res = (object)genericMethod.Invoke(this, new object[] { query });

            string DataJson = JsonConvert.SerializeObject(res, Newtonsoft.Json.Formatting.None);
            return GetObjectClass(DataJson, type);
        }



        private object GetObjectClass(string jsonData, Type type)
        {
            return JsonConvert.DeserializeObject(jsonData, typeof(List<>).MakeGenericType(type));
        }


        private object SqlQueryAsync<T>(string query) where T : new()
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString.connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    DataTable table = new DataTable();
                    table.Load(reader);

                    string jsonResult = JsonConvert.SerializeObject(table);
                    List<T> obj = JsonConvert.DeserializeObject<List<T>>(jsonResult);

                    return obj;
                }
            }
        }



    }


}

