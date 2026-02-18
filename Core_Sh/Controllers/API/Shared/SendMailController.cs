
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
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using Microsoft.Reporting.Map.WebForms.BingMaps;
using Microsoft.Extensions.Hosting.Internal;


namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]    
    public class SendMailController : BaseController
    {
        private readonly EmailService _emailService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public SendMailController(ModelDbContext dbContext, EmailService _I_emailService, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._emailService = _I_emailService;
        }


        [HttpGet]
        public string SendEmail(string ToEmail, string subject, string body,int CompCode)
        {
            try
            { 
                _emailService.SendEmail(ToEmail, subject, body);
                //return Content("Email sent successfully!");

                return OkStr(new BaseResponse("Email sent successfully!"));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

  


    }


}

