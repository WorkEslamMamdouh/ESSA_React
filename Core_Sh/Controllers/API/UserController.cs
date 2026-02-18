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
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Hosting.Internal;
using System.Reflection.Emit;

namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class UserController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public UserController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment  ) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        } 
         
      
        [HttpGet]
        public string BlockUser(string USERID, string USER_CODE, int Active)
        {

            //using (var dbTransaction = db.Database.BeginTransaction())
            //{
                try
                {

                    string Qury = @"Update G_USERS set USER_ACTIVE = " + Active + ",UpdatedBy = N'"+USER_CODE+ "',UpdatedAt = N'"+DateTime.Now+ "' where ID = '" + USERID + "'";
                    ExecuteSqlCommand(Qury);

                    //dbTransaction.Commit();
                    return OkStr(new BaseResponse(true));
                }
                catch (Exception ex)
                {

                    //dbTransaction.Rollback();
                    return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            //}
        }
        [HttpGet]
        public string Accept_RejectEmp(int ID, string USER_CODE, int Active,long USERID, int CompCode)
        { 
            try
            { 
                string Qury = @"Update G_USERS set Status = " + Active + ",USERID = "+ USERID + ",UpdatedBy = N'" + USER_CODE+ "',UpdatedAt = N'"+DateTime.Now+ "' where ID = '" + ID + "'";
                ExecuteSqlCommand(Qury);
                ExecuteSqlCommand("GProc_CreateUserWithAccountNew " + USERID + ", "+CompCode+"");
                //dbTransaction.Commit();
                return OkStr(new BaseResponse(true));
            }
            catch (Exception ex)
            {

                //dbTransaction.Rollback();
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
            //}
        }
        

        [HttpGet]
        public string InsertUser(
      int CompCode, string Name, string address, string Mobile, string IDNO, string Email, string UserName, string Password, int UserType,
      int Status, string UserCreated, string DepartmentName, int RoleId, string JobTitle
)
        {
            try
            {


                G_USERS userAdd = new G_USERS();


                userAdd.USER_CODE =  UserName;
                userAdd.USER_PASSWORD = Password;
                userAdd.Email = Email;
                userAdd.USER_ACTIVE =true ;
                userAdd.JobTitle = JobTitle;
                userAdd.DepartmentName = DepartmentName;
                userAdd.Status = Status;
                userAdd.CreatedAt = DateTime.Now;
                userAdd.CreatedBy = UserCreated;
                userAdd.USER_TYPE = Convert.ToByte(UserType) ;


              var data=  _Services.InsertG_USERS(userAdd);


                G_RoleUsers _RoleUsers = new G_RoleUsers();


                _RoleUsers.IDUser = data.ID;
                _RoleUsers.RoleId = RoleId;
                _RoleUsers.CompCode = CompCode;
                _RoleUsers.ISActive = true;
                 


                _Services.InsertG_RoleUsers(_RoleUsers);


                return OkStr(new BaseResponse(true));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }


    }
}