using Core.UI.Controllers;
using Core.UI.IServices;
using Core.UI.Models;
using Core.UI.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net;
using System.Reflection;


namespace Core.Controllers
{
    public class FileUploadController : BaseController
    {
        private readonly _Interface _Services;

        private readonly IWebHostEnvironment _hostingEnvironment;
        public FileUploadController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
            _hostingEnvironment = hostingEnvironment;
        }

         
        [HttpPost]
        public ActionResult Upload(IFormFile fileUpload, string Path_Url, string fileName)
        {
            if (fileUpload != null && fileUpload.Length > 0)
            {
                string serverPath = GetServerPath(Path_Url); // Specify the server location to save the file

                // Create the directory if it doesn't exist
                Directory.CreateDirectory(serverPath);

                string filePath = Path.Combine(serverPath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    fileUpload.CopyTo(fileStream);
                }

            }

            return RedirectToAction("Index", "Home"); // Redirect to another page after successful upload
        }

        [HttpPost]
        public ActionResult UploadFileArchive(IFormFile fileUpload, string Path_Url, string fileName, string Arch_IDUserCreate, string Arch_CompCode, string Arch_MODULE_CODE, string Arch_TransID, string Arch_NameFile, string Arch_Remarks, string Arch_FinYear)
        {

            try
            {
                if (fileUpload != null && fileUpload.Length > 0)
                {
                    string serverPath = GetServerPath(Path_Url); // Specify the server location to save the file

                    if (!Directory.Exists(serverPath))
                        Directory.CreateDirectory(serverPath);

                    string filePath = Path.Combine(serverPath, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        fileUpload.CopyTo(fileStream);
                    }

                }

                // الاسم الأصلي
                string originalFileName = fileName;

                // الاسم بدون الامتداد
                string UUID = Path.GetFileNameWithoutExtension(originalFileName);

                // الامتداد فقط
                string TypeFile = Path.GetExtension(originalFileName).TrimStart('.');

                string SqlInsert = @"INSERT INTO [dbo].[G_Tr_Archive]
                                                                   ([RefNo],[CompCode],[MODULE_CODE],[TransID],[UUID],[NameFile],[TypeFile],[Remarks],[CreatedAt] ,[IDUserCreate],FinYear)
                                                             VALUES
                                                                   (N'0'
                                                                   ,N'" + Arch_CompCode + @"'
                                                                   ,N'" + Arch_MODULE_CODE + @"'
                                                                   ,N'" + Arch_TransID + @"'
                                                                   ,N'" + UUID + @"'
                                                                   ,N'" + Arch_NameFile + @"'
                                                                   ,N'" + TypeFile + @"'
                                                                   ,N'" + Arch_Remarks + @"'
                                                                   ,N'" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + @"'
                                                                   ,N'" + Arch_IDUserCreate + @"',N'" + Arch_FinYear + @"')";

                ExecuteSqlCommand(SqlInsert);

                return RedirectToAction("Index", "Home"); // Redirect to another page after successful upload
            }
            catch (Exception ex)
            {

                return null;
            }
           
        }


        public IActionResult Download(string downloadUrl)
        {
            // هات المسار من DB
            string physicalPath = GetServerPath(downloadUrl); 

            if (!System.IO.File.Exists(physicalPath))
                return NotFound();

            var bytes = System.IO.File.ReadAllBytes(physicalPath);
            return File(bytes, "application/octet-stream", Path.GetFileName(physicalPath));
        }


        public string DeleteFile(string UrlFile)
        {
            if (string.IsNullOrWhiteSpace(UrlFile)) 
            return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, "File URL is required"));


            // تحويل الـ URL لمسار فعلي على السيرفر
            string physicalPath = GetServerPath(UrlFile);

            if (!System.IO.File.Exists(physicalPath)) 
            return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, "File not found"));

            try
            {
                System.IO.File.Delete(physicalPath);


                return OkStr(new BaseResponse(true));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }





        public string GetServerPath(string virtualPath)
        {
            if (string.IsNullOrWhiteSpace(virtualPath))
                throw new Exception("Path_Url is null or empty");

            virtualPath = virtualPath.Trim('/');
            virtualPath = virtualPath.Replace("/", Path.DirectorySeparatorChar.ToString());

            return Path.Combine(_hostingEnvironment.WebRootPath, virtualPath);
        }


    }
}