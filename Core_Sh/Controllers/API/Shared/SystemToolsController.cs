using System.IO;
using System.Net;
using System.Threading;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Collections.Generic;
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
using Core.Shared.DataManager;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.Extensions.Hosting;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
//using RestSharp;

namespace Core.UI.Controllers
{
    public enum Status
    {
        NotProcess = 0,
        Process = 1,
        Canceled = 2
    }

    public class Users
    {
        public string USER_CODE { get; set; }
        public bool USER_ACTIVE { get; set; }
        public Nullable<int> CompCode { get; set; }
    }

    [SecureHeadersFilter]
    [ActionMethod]
    public class SystemToolsController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public SystemToolsController(ModelDbContext dbContext, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));
        }

        //protected ModelDbContext db;


        public string GetDesciptionByCode(string tableName, string codeField, string codeValue, string descs, string language)
        {
            string connectionString = ConnectionString.connectionString;
            string result = string.Empty;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                using (SqlCommand command = new SqlCommand())
                {
                    string SqlStatement = string.Format("Select top 1 {0} From {1} Where {2} = {3}", descs, tableName, codeField, codeValue);
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();
                    DataTable table = new DataTable();
                    table.Load(command.ExecuteReader());
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();
                    if (table.Rows.Count == 0)
                    {
                        return "";
                    }

                    string arDesc = table.Rows[0][descs.Split(',')[0]].ToString();
                    string enDesc = table.Rows[0][descs.Split(',')[1]].ToString();

                    if (language == "Ar")
                    {
                        result = arDesc;
                    }
                    else
                    {
                        result = enDesc;
                    }

                    return result;
                }
            }
        }



        public string ExecuteReader(string SqlStatement)
        {
            string connectionString = ConnectionString.connectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();
                    DataTable table = new DataTable();
                    table.Load(command.ExecuteReader());
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();

                    string result = JsonConvert.SerializeObject(table);
                    return result;
                }
            }
        }


        public string ExecuteScalar(string SqlStatement)
        {
            string connectionString = ConnectionString.connectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();
                    string result = string.Empty;
                    result = command.ExecuteScalar().ToString();
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();


                    return result;
                }
            }

        }


        public struct CodeDescriptionModel
        {
            public string Code { get; set; }
            public string Description { get; set; }
        }


        #region Just for test

        private string Desc(Type type, string lang)
        {
            if (type == null)
            {
                return "null";
            }

            string result = string.Empty;
            List<PropertyInfo> properties = new List<PropertyInfo>();
            //var type = typeof(T);
            //if (lang == "En")
            //{
            properties = (from p in type.GetProperties()
                          where (p.Name.ToLower().Contains("desc") || p.Name.ToLower().Contains("name"))
                          && (p.Name[p.Name.Length - 1].ToString().ToLower() == "e" || p.Name[p.Name.Length - 1].ToString().ToLower() == "l")
                          select p).ToList();
            if (properties.Count > 0)
            {
                result = type.Name + ": " + properties.First().Name;
            }
            else
            {
                result = type.Name + ": " + "EN\\Undefiend";
            }
            //}
            //else
            //{
            properties = (from p in type.GetProperties()
                          where (p.Name.ToLower().Contains("desc") || p.Name.ToLower().Contains("name"))
                          && (p.Name[p.Name.Length - 1].ToString().ToLower() == "a")
                          select p).ToList();
            if (properties.Count > 0)
            {
                result += ", " + properties.First().Name;
            }
            else
            {
                result += ", AR:Undefiend";
            }
            //}
            return result;
        }
        #endregion



        private string returnSubSystems(string strSource, string strStart, string strEnd)
        {
            int Start, End;
            if (strSource.Contains(strStart) && strSource.Contains(strEnd))
            {
                Start = strSource.IndexOf(strStart, 0) + strStart.Length;
                End = strSource.IndexOf(strEnd, Start);
                string data = strSource.Substring(Start, End - Start);
                return data;
            }
            else
            {
                return "";
            }

        }




        public object GetByIndex2(int index, string idField, string TableName, string Condition)
        {
            string Columns = string.Empty;

            string cols = string.Empty;
            if (Columns == "")
            {
                cols = "*";
            }
            else
            {
                cols = Columns;
            }

            string cond = string.IsNullOrEmpty(Condition) ? " Where RowNum = " + index.ToString() :
                " where RowNum = " + index.ToString() + " And " + Condition;
            string SqlStatment = "Select * From (Select Row_Number() Over (Order By (" + idField + ")) As RowNum, *  From " + TableName + " where " + Condition + ") t2" + cond;

            IEnumerable<object> result = Get<object>(SqlStatment);
            return result.FirstOrDefault();


        }

        private IEnumerable<T> Get<T>(string sqlStatment)
        {
            throw new NotImplementedException();
        }

        public string GetByIndex(JObject data)
        {
            string TableName = data["TableName"].ToString();
            string Index = data["Index"].ToString();
            string condition = data["Condition"].ToString();
            string cond = condition == "" ? "" : " where " + condition;

            SqlConnection connection = new SqlConnection(ConnectionString.connectionString);// System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
            SqlCommand command = new SqlCommand
            {
                Connection = connection,
                CommandText = "Select * From (Select Row_Number() Over (Order By (Select 0)) As RowIndex, * From " + TableName + cond + ") t2 where RowIndex = " + Index// where " + condition; ;
            };
            //command.CommandText = "Select " + columns.Substring(1) + " From " + TableName;
            connection.Open();
            DataTable table = new DataTable();
            table.Load(command.ExecuteReader());
            connection.Close();
            connection.Dispose();
            command.Dispose();
            string jsonResult = JsonConvert.SerializeObject(table);

            return jsonResult;// JsonConvert.SerializeObject(dicResult);
        }







        public string GetIndex(int id, string idField, string TableName, string Condition)
        {
            if (!string.IsNullOrEmpty(Condition))
            {
                Condition = "where " + Condition;
            }

            string Columns = string.Empty;
            string cols = string.Empty;
            if (Columns == "")
            {
                cols = "*";
            }
            else
            {
                cols = Columns;
            }

            string cond = " Where " + idField + "  = " + id.ToString();


            string SqlStatment = "Select top 1 RowNum  From (Select Row_Number() Over (Order By (" + idField + ")) As RowNum ," + idField + " From " + TableName + " " + Condition + ") t2" + cond;

            string result = ExecuteScalar(SqlStatment);

            return result;
        }



        public object GetDataDisplay(string idField, string TableName, string Condition, int id)
        {
            if (!string.IsNullOrEmpty(Condition))
            {
                Condition = "where " + Condition;
            }

            string Columns = string.Empty;
            string cols = string.Empty;
            if (Columns == "")
            {
                cols = "*";
            }
            else
            {
                cols = Columns;
            }

            string cond = " Where " + idField + "  = " + id;

            string SqlStatment = "Select* From(Select Row_Number() Over (Order By (select 0)) As RowNum, *From " + TableName + " " + Condition + ") t2" + cond;
            IEnumerable<object> result = Get<object>(SqlStatment);
            return result.FirstOrDefault();
        }


        public object GetIndex(int index, string TableName, string Condition)
        {
            string Columns = string.Empty;

            string cols = string.Empty;
            if (Columns == "")
            {
                cols = "*";
            }
            else
            {
                cols = Columns;
            }

            string cond = string.IsNullOrEmpty(Condition) ? " Where RowNum = " + index.ToString() :
                " where RowNum = " + index.ToString() + " And " + Condition;
            string SqlStatment = "Select * From (Select Row_Number() Over (Order By (select 0)) As RowNum, *  From " + TableName + " where " + Condition + ") t2" + cond;

            IEnumerable<object> result = Get<object>(SqlStatment);
            return result.FirstOrDefault();


        }


        public object GetByIndex(int index, string idField, string TableName, string Condition)
        {
            string Columns = string.Empty;

            string cols = string.Empty;
            if (Columns == "")
            {
                cols = "*";
            }
            else
            {
                cols = Columns;
            }

            string cond = string.IsNullOrEmpty(Condition) ? " Where RowNum = " + index.ToString() :
                " where RowNum = " + index.ToString() + " And " + Condition;
            string SqlStatment = "Select * From (Select Row_Number() Over (Order By (" + idField + ")) As RowNum, *  From " + TableName + " where " + Condition + ") t2" + cond;

            IEnumerable<object> result = Get<object>(SqlStatment);
            return result.FirstOrDefault();


        }





        private struct ColumnObjectStruct
        {
            public string headerText { get; set; }
            public bool hidden { get; set; }
            public string key { get; set; }
            public string dataType { get; set; }
            public string width { get; set; }
            public bool filterable { get; set; }
        }

        public struct SearchAttruibuts
        {
            public List<G_SearchFormSetting> Columns { get; set; }
            public G_SearchForm Settings { get; set; }
        }


        public SearchAttruibuts SearchProperties(string moduleCode, string controlName, string SystemCode, string SubSystemCode)
        {

            G_SearchFormModule searchFormModule = (from module in db.G_SearchFormModule
                                                   where module.SystemCode == SystemCode
                                                   && module.SubSystemCode == SubSystemCode
                                                   && module.ModuleCode == moduleCode
                                                   && (module.ControlCode == controlName || module.ControlCode == "*")
                                                   select module).FirstOrDefault();
            if (searchFormModule == null)
            {
                return new SearchAttruibuts { Columns = new List<G_SearchFormSetting>(), Settings = new G_SearchForm() };
            }

            string SearchFormCode = searchFormModule.SearchFormCode;// db.G_SearchFormModule.Where(f => f.ModuleCode == moduleCode).First().SearchFormCode;

            List<G_SearchFormSetting> columns = (from cols in db.G_SearchFormSetting
                                                 orderby cols.FieldSequence
                                                 where cols.SearchFormCode == SearchFormCode
                                                 select cols).ToList();

            IQueryable<G_SearchForm> settings = from searchForm in db.G_SearchForm
                                                where searchForm.SearchFormCode == SearchFormCode
                                                select searchForm;

            SearchAttruibuts obj = new SearchAttruibuts
            {
                Columns = columns as List<G_SearchFormSetting>,
                Settings = settings.First()
            };

            return obj;
            // var jsonObject = Newtonsoft.Json.JsonConvert.SerializeObject(obj, Newtonsoft.Json.Formatting.Indented);
            //  return jsonObject;
        }


        public List<G_Search_From_Setting_Popup> SearchPropertiesSetting(string moduleCode, string controlName, string Language)
        {
            string Query = "G_Search_From_Setting_Popup '" + moduleCode + "','" + controlName + "' , '" + Language + "'";

            var DataSetting = SqlQuery<G_Search_From_Setting_Popup>(Query).ToList();

            return DataSetting;
        }

        public string Find(string TableName, string Condition, string Columns, string orderBy)
        {
            SqlConnection connection = new SqlConnection(ConnectionString.connectionString);
            connection.Open();

            //int pageSize = Convert.ToInt16(db.G_SearchForm.Where(f => f.DataSourceName == TableName).ToList()[0].PageSize);
            int pageSize = 0;

            string cond = Condition;

            SqlCommand command = new SqlCommand
            {
                Connection = connection
            };
            if (pageSize == 0)
            {
                command.CommandText = "Select " + Columns + " From " + TableName + cond + " Order By " + orderBy;
            }
            else
            {
                command.CommandText = "Select Top " + pageSize.ToString() + " " + Columns + " From " + TableName + cond + " Order By " + orderBy;
            }

            //if (pageSize == 0)
            //    command.CommandText = "Select RowIndex," + Columns + " From (Select Row_Number() Over (Order By (Select 0)) As RowIndex, * From " + TableName + ") t2" + cond + " Order By " + orderBy;
            //else
            //    command.CommandText = "Select Top " + pageSize.ToString() + " RowIndex," + Columns + " From (Select Row_Number() Over (Order By (Select 0)) As RowIndex, * From " + TableName + ") t2" + cond + " Order By " + orderBy;

            DataTable table = new DataTable();
            table.Load(command.ExecuteReader());
            connection.Close();
            connection.Dispose();
            command.Dispose();
            string jsonResult = JsonConvert.SerializeObject(table);

            return jsonResult;

        }


        public string FindKey(string moduleCode, string Condition, string controlName, string SystemCode, string SubSystemCode, string ScreenLanguage)
        {

            var obj = SearchProperties(moduleCode, controlName, SystemCode, SubSystemCode);
            if (obj.Settings.DataSourceName == null)
            {
                return OkStr("");
            }

            var cols = new StringBuilder();
            var columnsObject = new List<ColumnObjectStruct>
    {
        new ColumnObjectStruct
        {
            dataType = "number",
            headerText = "",
            hidden = true,
            key = "RowIndex",
            width = ""
        }
    };

            foreach (var column in obj.Columns)
            {
                if (column.Language == 0 ||
                    (ScreenLanguage == "En" && column.Language == 2) ||
                    (ScreenLanguage == "Ar" && column.Language == 1))
                {
                    cols.Append($",{column.AlternateDataMember} AS {column.DataMember}");

                    columnsObject.Add(new ColumnObjectStruct
                    {
                        dataType = column.Datatype == 0 ? "string" : "number",
                        headerText = ScreenLanguage == "En" ? column.FieldTitle : column.FieldTitleA,
                        hidden = (bool)!column.IsReadOnly,
                        filterable = false,
                        key = column.DataMember,
                        width = column.FieldWidth == 0 ? "100px" : $"{column.FieldWidth}px"
                    });
                }
            }

            var tableName = obj.Settings.DataSourceName;
            var condition = string.IsNullOrEmpty(Condition) ? "" : $" Where {Condition}";
            var columns = cols.ToString().Substring(1);
            var orderBy = obj.Settings.ReturnDataPropertyName;
            var result = Find(tableName, condition, columns, orderBy);

            var resultObject = new
            {
                TableName = tableName,
                Condition = condition,
                DataResult = result,
                Settings = obj.Settings,
                Columns = columnsObject
            };

            return OkStr(resultObject);
        }



        public string FindKeyPagination(string moduleCode, string Condition, string controlName, string SystemCode, string SubSystemCode, string ScreenLanguage)
        {

            var obj = SearchPropertiesSetting(moduleCode, controlName, ScreenLanguage);
            if (obj.Count == 0)
            {
                return OkStr("");
            }

            var cols = new StringBuilder();
            var columnsObject = new List<ColumnObjectStruct>
    {
        new ColumnObjectStruct
        {
            dataType = "number",
            headerText = "",
            hidden = true,
            key = "RowIndex",
            width = ""
        }
    };

            foreach (var column in obj)
            {
                if (column.Language == 0 ||
                    (ScreenLanguage == "En" && column.Language == 2) ||
                    (ScreenLanguage == "Ar" && column.Language == 1))
                {
                    cols.Append($",{column.AlternateDataMember} AS {column.DataMember}");

                    columnsObject.Add(new ColumnObjectStruct
                    {
                        dataType = column.Datatype == 0 ? "string" : "number",
                        headerText = ScreenLanguage == "En" ? column.FieldTitle : column.FieldTitleA,
                        hidden = (bool)!column.IsReadOnly,
                        filterable = false,
                        key = column.DataMember,
                        width = column.FieldWidth == 0 ? "100px" : $"{column.FieldWidth}px"
                    });
                }
            }

            var tableName = obj[0].DataSourceName;
            //var condition = string.IsNullOrEmpty(Condition) ? "" : $" Where {Condition}";
            var columns = cols.ToString().Substring(1);
            var orderBy = obj[0].ReturnDataPropertyName;
            var result = FindPagination(moduleCode, controlName, Condition, "", 1);

            List<PaginationResult> _PaginationResult = SqlQuery<PaginationResult>(" G_Search_GetPageNumFromTable '" + tableName + "','" + Condition + "',''," + obj[0].PageSize + "  ").ToList();
            //var result = new object();

            var resultObject = new
            {
                TableName = tableName,
                Condition = Condition,
                Settings = obj,
                DataResult = result,
                PaginationResult = _PaginationResult,
                PageNumber = 1,
                Columns = columnsObject
            };

            return OkStr(resultObject);
        }


        public string FindPagination(string moduleCode, string controlName, string Condition, string SearchValue, int PageNum)
        {
            SqlConnection connection = new SqlConnection(ConnectionString.connectionString);
            connection.Open();

            //int pageSize = Convert.ToInt16(db.G_SearchForm.Where(f => f.DataSourceName == TableName).ToList()[0].PageSize);
            int pageSize = 0;

            string cond = Condition;

            SqlCommand command = new SqlCommand
            {
                Connection = connection
            };

            string Query = "[G_Search_From_Popup_GetDataByPagination] '" + moduleCode + "','" + controlName + "','" + Condition + "'  ,1,'" + SearchValue + "' ";

            command.CommandText = Query;


            DataTable table = new DataTable();
            table.Load(command.ExecuteReader());
            connection.Close();
            connection.Dispose();
            command.Dispose();
            string jsonResult = JsonConvert.SerializeObject(table);

            return jsonResult;

        }



        //**********************************************************************************************************************************

        public string GetIndexByUseId(int idValue, string BaseTableName, string idFieldName, string Condition)
        {
            if (!string.IsNullOrEmpty(Condition))
            {
                Condition = "where " + Condition;
            }

            string SqlStatment = "";
            string cond = " Where " + idFieldName + "  = " + idValue.ToString();
            SqlStatment = "Select top 1 RowNum  From (Select Row_Number() Over (Order By (" + idFieldName + ")) As RowNum ," + idFieldName + " From " + BaseTableName + " " + Condition + " " + ") t2" + cond;
            string result = ExecuteScalar(SqlStatment);
            return OkStr(result);
        }






        //public JsonResult Get_Table(string query, string NameTable)
        //{

        //    var res = SQLModelQuery(query, NameTable);
        //    return Json(res);
        //}

        [HttpPost]
        public async Task<string> Get_TableNew_Pagination([FromBody] List<Table> Entity)
        {

            List<object> Res = new List<object>();
            int PageNumber = 1;
            bool ChangePageNumber = false;
            foreach (var item in Entity)
            {
                item.Condition = item.Condition == null ? "" : item.Condition;

                List<object> Table_Res = new List<object>();
                string query = "";
                object res = null;
                if (item.IsProc == false || item.IsProc == null)
                {

                    try
                    {
                        string Pagetion = "";

                        Pagetion = @" ORDER BY " + item.OrderByID + @" Desc
                                        OFFSET (" + (ChangePageNumber == false ? item.PageNumber : 1) + @" - 1) * " + item.PageSize + @" ROWS
                                        FETCH NEXT  " + item.PageSize + @"  ROWS ONLY;
                                            ";


                        query = query + "  " + Pagetion;
                        query = "G_Search_GetDataByPagination '" + item.NameTable.Trim() + " ','" + item.Condition.Trim() + " ','" + Pagetion.Trim() + "' ,'" + item.SearchValue.Trim() + "'";
                        res = await Get_Model(query, item.NameTable);

                        if (item.NameTable != "PageNumber")
                        {
                            Table_Res.Add(res);
                            Res.AddRange(Table_Res);
                        }
                    }
                    catch (Exception ex)
                    {

                        res = new List<object>();
                    }

                }
                else
                {
                    query = "" + item.NameTable + " " + (item.Condition);

                    if (item.IsExec == true)
                    {
                        ExecuteSqlCommand(query);
                        res = new List<object>();
                    }
                    else
                    {
                        if (item.NameTable == "PageNumber")
                        {
                            if (Convert.ToInt16(item.Condition) > PageNumber)
                            {
                                ChangePageNumber = true;
                            }

                            var resNew = new List<object>();
                            Table_Res.Add(resNew);
                            Res.AddRange(Table_Res);
                        }
                        else
                        {
                            res = await Get_Model(item.Condition, item.NameTable);

                            string Query = item.Condition;
                            var _Result = SqlQuery<PaginationResult>(Query).ToList();

                            PageNumber = _Result[0].TotalPages;

                            var resNew = new object();
                            resNew = _Result;
                            Table_Res.Add(resNew);
                            Res.AddRange(Table_Res);
                        }

                    }

                }




            }

            //return Json((Res)); 

            return OkStr(new BaseResponse(Res));

        }



        [HttpPost]

        public async Task<string> Get_TableNew([FromBody] List<Table> Entity)
        {

            List<object> Res = new List<object>();

            foreach (var item in Entity)
            {
                item.Condition = item.Condition == null ? "" : item.Condition;

                List<object> Table_Res = new List<object>();
                string query = "";
                object res;
                if (item.IsProc == false || item.IsProc == null)
                {
                    query = "select * from " + item.NameTable + " " + (item.Condition.Trim() == "" ? "" : " Where " + item.Condition);
                    try
                    {
                        string Pagetion = "";

                        if (item.IsPage == true)
                        {
                            Pagetion = @" ORDER BY " + item.OrderByID + @" Desc
                                        OFFSET (" + item.PageNumber + @" - 1) * " + item.PageSize + @" ROWS
                                        FETCH NEXT  " + item.PageSize + @"  ROWS ONLY;
                                            ";
                        }
                        query = query + "  " + Pagetion;
                        res = await Get_Model(query, item.NameTable);
                    }
                    catch (Exception ex)
                    {

                        res = new List<object>();
                    }

                }
                else
                {
                    query = "" + item.NameTable + " " + (item.Condition);

                    if (item.IsExec == true)
                    {
                        ExecuteSqlCommand(query);
                        res = new List<object>();
                    }
                    else
                    {
                        res = await Get_Model(item.Condition, item.NameTable);
                    }

                }


                Table_Res.Add(res);
                Res.AddRange(Table_Res);

            }

            //return Json((Res)); 

            return OkStr(new BaseResponse(Res));

        }




        public async Task<object> Get_Model(string query, string NameClass)
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

            string DataJson = JsonConvert.SerializeObject(res, Formatting.None);
            return GetObjectClass(DataJson, type);
        }


        public object ConvertJsonToModel(string Object, string NameClass)
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


            string DataJson = JsonConvert.SerializeObject(Object, Formatting.None);
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
                    try
                    {
                        DataTable table = new DataTable();
                        table.Load(reader);

                        string jsonResult = JsonConvert.SerializeObject(table);
                        List<T> obj = JsonConvert.DeserializeObject<List<T>>(jsonResult);

                        return obj;
                    }
                    catch (Exception)
                    {
                        return null;
                    }

                }
            }
        }


        //******************************************************************************************************

        [HttpPost]
        public string TransactionsAnyTables([FromBody] JsonElement Entity)
        {
            try
            {
                // Extract table name or type identifier (custom logic needed)
                var tableName = Entity.GetProperty("TableName").GetString(); // Example: Expect a "TableName" field in the JSON

                var result = InsertAny(Entity, tableName);
                return OkStr(new BaseResponse(result));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }

        [HttpPost]
        public string ProccAnyTableList([FromBody] DataModel model)
        {
            try
            {

                List<TransTable> obj = JsonConvert.DeserializeObject<List<TransTable>>(model.DataSend);

                foreach (var item in obj)
                {
                    // تحويل الكائن "item" إلى نص JSON
                    string itemJson = JsonConvert.SerializeObject(item);

                    // تحويل النص إلى JsonDocument للوصول إلى خصائص JSON
                    using (JsonDocument doc = JsonDocument.Parse(itemJson))
                    {
                        JsonElement entity = doc.RootElement;

                        // استخراج خاصية "TableName" من JSON
                        if (entity.TryGetProperty("TableName", out JsonElement tableNameElement))
                        {
                            string tableName = tableNameElement.GetString();

                            // التحقق من وجود ModelList داخل الكائن
                            if (entity.TryGetProperty("ModelList", out JsonElement modelListElement) && modelListElement.ValueKind == JsonValueKind.Array)
                            {
                                // التعامل مع ModelList كـ JsonArray
                                foreach (var modelItem in modelListElement.EnumerateArray())
                                {
                                    // تمرير JsonElement مباشرة إلى الدالة InsertAny

                                    if (item.TypeTrans == "Insert")
                                    {
                                        var result = InsertListAny(modelItem, tableName);
                                    }


                                    if (item.TypeTrans == "Update")
                                    {
                                        var result = UpdateListAny(modelItem, tableName);
                                    }


                                    if (item.TypeTrans == "Delete")
                                    {
                                        var result = DeleteListAny(modelItem, tableName);
                                    }


                                }
                            }
                            else
                            {
                                Console.WriteLine("ModelList property not found or is not an array in the JSON object.");
                            }
                        }
                        else
                        {
                            Console.WriteLine("TableName property not found in the JSON object.");
                        }
                    }
                }


                //var tableName = item.GetProperty("TableName").GetString(); // Example: Expect a "TableName" field in the JSON 
                //[FromBody] List<JsonElement> Entity

                //// Extract table name or type identifier (custom logic needed)
                //foreach (var item in Entity)
                //{
                //    var tableName = item.GetProperty("TableName").GetString(); // Example: Expect a "TableName" field in the JSON 
                //    var result = InsertAny(item, tableName);
                //}    

                return OkStr(new BaseResponse("Done Inserted All"));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }

        [HttpPost]
        public async Task<string> InsertAnyTable([FromBody] JsonElement Entity)
        {
            try
            {
                // Extract table name or type identifier (custom logic needed)
                var tableName = Entity.GetProperty("TableName").GetString(); // Example: Expect a "TableName" field in the JSON

                var result = await InsertAny(Entity, tableName);

                Result_Two_object Res = new Result_Two_object();
                Res.ResultTable = result;

                //******************************************Run_Pross_Query************************************************

                var Query = Entity.GetProperty("Query").GetString();
                var NameClass = Entity.GetProperty("NameClass").GetString();
                if (!string.IsNullOrEmpty(Query))
                {
                    if (!string.IsNullOrEmpty(NameClass))
                    {
                        var ResModel = await Get_Model(Query, NameClass);
                        Res.ResultQuery = ResModel;
                    }
                    else
                    {
                        ExecuteSqlCommand(Query);
                    }
                }
                else
                {
                    Res.ResultQuery = '1';
                }
                //******************************************************************************************

                return OkStr(new BaseResponse(Res));

            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }

        [HttpPost]
        public async Task<string> UpdateAnyTable([FromBody] JsonElement Entity)
        {
            try
            {
                // Extract table name or type identifier (custom logic needed)
                var tableName = Entity.GetProperty("TableName").GetString(); // Example: Expect a "TableName" field in the JSON

                var result = await UpdateAny(Entity, tableName);
                Result_Two_object Res = new Result_Two_object();
                Res.ResultTable = result;


                //******************************************Run_Pross_Query************************************************

                var Query = Entity.GetProperty("Query").GetString();
                var NameClass = Entity.GetProperty("NameClass").GetString();
                if (!string.IsNullOrEmpty(Query))
                {
                    if (!string.IsNullOrEmpty(NameClass))
                    {
                        var ResModel = await Get_Model(Query, NameClass);
                        Res.ResultQuery = ResModel;
                    }
                    else
                    {
                        ExecuteSqlCommand(Query);
                    }
                }
                else
                {
                    Res.ResultQuery = '1';
                }

                //******************************************************************************************

                return OkStr(new BaseResponse(Res));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }

        [HttpPost]
        public async Task<string> DeleteAnyTable([FromBody] JsonElement Entity)
        {
            try
            {
                // Extract table name or type identifier (custom logic needed)
                var tableName = Entity.GetProperty("TableName").GetString(); // Example: Expect a "TableName" field in the JSON

                var result = await DeleteAny(Entity, tableName);


                Result_Two_object Res = new Result_Two_object();
                Res.ResultTable = result;


                //******************************************Run_Pross_Query************************************************

                var Query = Entity.GetProperty("Query").GetString();
                var NameClass = Entity.GetProperty("NameClass").GetString();
                if (!string.IsNullOrEmpty(Query))
                {
                    if (!string.IsNullOrEmpty(NameClass))
                    {
                        var ResModel = await Get_Model(Query, NameClass);
                        Res.ResultQuery = ResModel;
                    }
                    else
                    {
                        ExecuteSqlCommand(Query);
                    }
                }
                else
                {
                    Res.ResultQuery = '1';
                }
                //******************************************************************************************S

                return OkStr(new BaseResponse(Res));

            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }


        public object InsertListAny(JsonElement entityElement, string tableName)
        {


            // تأكد من أن اسم الفئة يشمل المسار الكامل لها، وإذا لم يكن كذلك أضفه يدويًا أو حسب المسار الخاص بتطبيقك
            string fullyQualifiedNameClass = tableName.Contains(".") ? tableName : $"Core.UI.Repository.Models.{tableName}";

            // حاول الحصول على النوع مباشرة
            Type entityType = Type.GetType(fullyQualifiedNameClass);

            if (entityType == null)
            {
                // حاول العثور على النوع في التجميعات المحملة
                entityType = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(a => a.GetTypes())
                    .FirstOrDefault(t => t.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase));
            }

            if (entityType == null)
            {
                throw new InvalidOperationException($"لم يتم العثور على النوع '{tableName}'.");
            }

            // Deserialize the "Entity" part into the desired entity type
            var deserializedEntity = System.Text.Json.JsonSerializer.Deserialize(entityElement.GetRawText(), entityType);


            // استخدام الانعكاس للحصول على DbSet للكائن المحدد
            var dbSetMethod = typeof(DbContext).GetMethods()
                .FirstOrDefault(m => m.Name == "Set" && m.IsGenericMethod && m.GetParameters().Length == 0);  // العثور على Set<T>()

            if (dbSetMethod == null)
            {
                throw new InvalidOperationException("لم يتم العثور على طريقة Set.");
            }

            // جعل الميثود يعمل مع النوع المطلوب
            var dbSetMethodWithGeneric = dbSetMethod.MakeGenericMethod(entityType);

            // استدعاء Set<T>() باستخدام الانعكاس
            var dbSet = dbSetMethodWithGeneric.Invoke(db, null);

            // إضافة الكائن إلى DbSet
            var addMethod = dbSet.GetType().GetMethod("Add");
            var addedEntity = addMethod.Invoke(dbSet, new[] { deserializedEntity });

            // حفظ التغييرات
            db.SaveChanges();

            return deserializedEntity;


        }


        public object UpdateListAny(JsonElement entityElement, string tableName)
        {


            // تأكد من أن اسم الفئة يشمل المسار الكامل لها، وإذا لم يكن كذلك أضفه يدويًا أو حسب المسار الخاص بتطبيقك
            string fullyQualifiedNameClass = tableName.Contains(".") ? tableName : $"Core.UI.Repository.Models.{tableName}";

            // حاول الحصول على النوع مباشرة
            Type entityType = Type.GetType(fullyQualifiedNameClass);

            if (entityType == null)
            {
                // حاول العثور على النوع في التجميعات المحملة
                entityType = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(a => a.GetTypes())
                    .FirstOrDefault(t => t.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase));
            }

            if (entityType == null)
            {
                throw new InvalidOperationException($"لم يتم العثور على النوع '{tableName}'.");
            }

            // Deserialize the "Entity" part into the desired entity type
            var deserializedEntity = System.Text.Json.JsonSerializer.Deserialize(entityElement.GetRawText(), entityType);


            // استخدام الانعكاس للحصول على DbSet للكائن المحدد
            var dbSetMethod = typeof(DbContext).GetMethods()
                .FirstOrDefault(m => m.Name == "Set" && m.IsGenericMethod && m.GetParameters().Length == 0);  // العثور على Set<T>()

            if (dbSetMethod == null)
            {
                throw new InvalidOperationException("لم يتم العثور على طريقة Set.");
            }

            // جعل الميثود يعمل مع النوع المطلوب
            var dbSetMethodWithGeneric = dbSetMethod.MakeGenericMethod(entityType);

            // استدعاء Set<T>() باستخدام الانعكاس
            var dbSet = dbSetMethodWithGeneric.Invoke(db, null);

            // إضافة الكائن إلى DbSet
            var attachMethod = dbSet.GetType().GetMethod("Attach");
            attachMethod.Invoke(dbSet, new[] { deserializedEntity });

            // استخدام الطريقة المناسبة Entry<TEntity> وتعيين الحالة كـ Modified
            var entryMethod = typeof(DbContext).GetMethod("Entry", new[] { typeof(object) });
            var entry = entryMethod.Invoke(db, new[] { deserializedEntity });

            var property = entry.GetType().GetProperty("State");
            property.SetValue(entry, EntityState.Modified);

            // حفظ التغييرات
            db.SaveChanges();

            return deserializedEntity;
        }

        public object DeleteListAny(JsonElement entityElement, string tableName)
        {


            // تأكد من أن اسم الفئة يشمل المسار الكامل لها، وإذا لم يكن كذلك أضفه يدويًا أو حسب المسار الخاص بتطبيقك
            string fullyQualifiedNameClass = tableName.Contains(".") ? tableName : $"Core.UI.Repository.Models.{tableName}";

            // حاول الحصول على النوع مباشرة
            Type entityType = Type.GetType(fullyQualifiedNameClass);

            if (entityType == null)
            {
                // حاول العثور على النوع في التجميعات المحملة
                entityType = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(a => a.GetTypes())
                    .FirstOrDefault(t => t.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase));
            }

            if (entityType == null)
            {
                throw new InvalidOperationException($"لم يتم العثور على النوع '{tableName}'.");
            }

            // Deserialize the "Entity" part into the desired entity type
            var deserializedEntity = System.Text.Json.JsonSerializer.Deserialize(entityElement.GetRawText(), entityType);


            // استخدام الانعكاس للحصول على DbSet للكائن المحدد
            var dbSetMethod = typeof(DbContext).GetMethods()
                .FirstOrDefault(m => m.Name == "Set" && m.IsGenericMethod && m.GetParameters().Length == 0);  // العثور على Set<T>()

            if (dbSetMethod == null)
            {
                throw new InvalidOperationException("لم يتم العثور على طريقة Set.");
            }

            // جعل الميثود يعمل مع النوع المطلوب
            var dbSetMethodWithGeneric = dbSetMethod.MakeGenericMethod(entityType);

            // استدعاء Set<T>() باستخدام الانعكاس
            var dbSet = dbSetMethodWithGeneric.Invoke(db, null);

            // إرفاق الكائن إلى DbSet إذا لم يكن مرفقًا بالفعل
            var attachMethod = dbSet.GetType().GetMethod("Attach");
            attachMethod.Invoke(dbSet, new[] { deserializedEntity });

            // استخدام الطريقة المناسبة Entry<TEntity> وتعيين الحالة كـ Deleted
            var entryMethod = typeof(DbContext).GetMethod("Entry", new[] { typeof(object) });
            var entry = entryMethod.Invoke(db, new[] { deserializedEntity });

            var property = entry.GetType().GetProperty("State");
            property.SetValue(entry, EntityState.Deleted);

            // حفظ التغييرات
            db.SaveChanges();

            return deserializedEntity;
        }


        public async Task<object> InsertAny(JsonElement entity, string tableName)
        {


            // تأكد من أن اسم الفئة يشمل المسار الكامل لها، وإذا لم يكن كذلك أضفه يدويًا أو حسب المسار الخاص بتطبيقك
            string fullyQualifiedNameClass = tableName.Contains(".") ? tableName : $"Core.UI.Repository.Models.{tableName}";

            // حاول الحصول على النوع مباشرة
            Type entityType = Type.GetType(fullyQualifiedNameClass);

            if (entityType == null)
            {
                // حاول العثور على النوع في التجميعات المحملة
                entityType = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(a => a.GetTypes())
                    .FirstOrDefault(t => t.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase));
            }

            if (entityType == null)
            {
                throw new InvalidOperationException($"لم يتم العثور على النوع '{tableName}'.");
            }

            // Assuming 'entity' is a JsonElement containing the whole input JSON
            var rawJson = entity.GetRawText();

            // Parse the raw JSON string into a JsonDocument
            JsonDocument doc = JsonDocument.Parse(rawJson);
            JsonElement root = doc.RootElement;

            // Extract the "Entity" property from the parsed JSON
            JsonElement entityElement = root.GetProperty("Entity");

            // Deserialize the "Entity" part into the desired entity type
            var deserializedEntity = System.Text.Json.JsonSerializer.Deserialize(entityElement.GetRawText(), entityType);


            // استخدام الانعكاس للحصول على DbSet للكائن المحدد
            var dbSetMethod = typeof(DbContext).GetMethods()
                .FirstOrDefault(m => m.Name == "Set" && m.IsGenericMethod && m.GetParameters().Length == 0);  // العثور على Set<T>()

            if (dbSetMethod == null)
            {
                throw new InvalidOperationException("لم يتم العثور على طريقة Set.");
            }

            // جعل الميثود يعمل مع النوع المطلوب
            var dbSetMethodWithGeneric = dbSetMethod.MakeGenericMethod(entityType);

            // استدعاء Set<T>() باستخدام الانعكاس
            var dbSet = dbSetMethodWithGeneric.Invoke(db, null);

            // إضافة الكائن إلى DbSet
            var addMethod = dbSet.GetType().GetMethod("Add");
            var addedEntity = addMethod.Invoke(dbSet, new[] { deserializedEntity });

            // حفظ التغييرات
            db.SaveChanges();

            return deserializedEntity;


        }


        public async Task<object> UpdateAny(JsonElement entity, string tableName)
        {
            // تأكد من أن اسم الفئة يشمل المسار الكامل لها، وإذا لم يكن كذلك أضفه يدويًا أو حسب المسار الخاص بتطبيقك
            string fullyQualifiedNameClass = tableName.Contains(".") ? tableName : $"Core.UI.Repository.Models.{tableName}";

            // حاول الحصول على النوع مباشرة
            Type entityType = Type.GetType(fullyQualifiedNameClass);

            if (entityType == null)
            {
                // حاول العثور على النوع في التجميعات المحملة
                entityType = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(a => a.GetTypes())
                    .FirstOrDefault(t => t.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase));
            }

            if (entityType == null)
            {
                throw new InvalidOperationException($"لم يتم العثور على النوع '{tableName}'.");
            }

            // Assuming 'entity' is a JsonElement containing the whole input JSON
            var rawJson = entity.GetRawText();

            // Parse the raw JSON string into a JsonDocument
            JsonDocument doc = JsonDocument.Parse(rawJson);
            JsonElement root = doc.RootElement;

            // Extract the "Entity" property from the parsed JSON
            JsonElement entityElement = root.GetProperty("Entity");

            // Deserialize the "Entity" part into the desired entity type
            var deserializedEntity = System.Text.Json.JsonSerializer.Deserialize(entityElement.GetRawText(), entityType);

            // استخدام الانعكاس للحصول على DbSet للكائن المحدد
            var dbSetMethod = typeof(DbContext).GetMethods()
                .FirstOrDefault(m => m.Name == "Set" && m.IsGenericMethod && m.GetParameters().Length == 0);  // العثور على Set<T>()

            if (dbSetMethod == null)
            {
                throw new InvalidOperationException("لم يتم العثور على طريقة Set.");
            }

            // جعل الميثود يعمل مع النوع المطلوب
            var dbSetMethodWithGeneric = dbSetMethod.MakeGenericMethod(entityType);

            // استدعاء Set<T>() باستخدام الانعكاس
            var dbSet = dbSetMethodWithGeneric.Invoke(db, null);

            // إضافة الكائن إلى DbSet
            var attachMethod = dbSet.GetType().GetMethod("Attach");
            attachMethod.Invoke(dbSet, new[] { deserializedEntity });

            // استخدام الطريقة المناسبة Entry<TEntity> وتعيين الحالة كـ Modified
            var entryMethod = typeof(DbContext).GetMethod("Entry", new[] { typeof(object) });
            var entry = entryMethod.Invoke(db, new[] { deserializedEntity });

            var property = entry.GetType().GetProperty("State");
            property.SetValue(entry, EntityState.Modified);

            // حفظ التغييرات
            db.SaveChanges();

            return deserializedEntity;
        }


        public async Task<object> DeleteAny(JsonElement entity, string tableName)
        {
            // تأكد من أن اسم الفئة يشمل المسار الكامل لها، وإذا لم يكن كذلك أضفه يدويًا أو حسب المسار الخاص بتطبيقك
            string fullyQualifiedNameClass = tableName.Contains(".") ? tableName : $"Core.UI.Repository.Models.{tableName}";

            // حاول الحصول على النوع مباشرة
            Type entityType = Type.GetType(fullyQualifiedNameClass);

            if (entityType == null)
            {
                // حاول العثور على النوع في التجميعات المحملة
                entityType = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(a => a.GetTypes())
                    .FirstOrDefault(t => t.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase));
            }

            if (entityType == null)
            {
                throw new InvalidOperationException($"لم يتم العثور على النوع '{tableName}'.");
            }

            // Assuming 'entity' is a JsonElement containing the whole input JSON
            var rawJson = entity.GetRawText();

            // Parse the raw JSON string into a JsonDocument
            JsonDocument doc = JsonDocument.Parse(rawJson);
            JsonElement root = doc.RootElement;

            // Extract the "Entity" property from the parsed JSON
            JsonElement entityElement = root.GetProperty("Entity");

            // Deserialize the "Entity" part into the desired entity type
            var deserializedEntity = System.Text.Json.JsonSerializer.Deserialize(entityElement.GetRawText(), entityType);

            // استخدام الانعكاس للحصول على DbSet للكائن المحدد
            var dbSetMethod = typeof(DbContext).GetMethods()
                .FirstOrDefault(m => m.Name == "Set" && m.IsGenericMethod && m.GetParameters().Length == 0);  // العثور على Set<T>()

            if (dbSetMethod == null)
            {
                throw new InvalidOperationException("لم يتم العثور على طريقة Set.");
            }

            // جعل الميثود يعمل مع النوع المطلوب
            var dbSetMethodWithGeneric = dbSetMethod.MakeGenericMethod(entityType);

            // استدعاء Set<T>() باستخدام الانعكاس
            var dbSet = dbSetMethodWithGeneric.Invoke(db, null);

            // إرفاق الكائن إلى DbSet إذا لم يكن مرفقًا بالفعل
            var attachMethod = dbSet.GetType().GetMethod("Attach");
            attachMethod.Invoke(dbSet, new[] { deserializedEntity });

            // استخدام الطريقة المناسبة Entry<TEntity> وتعيين الحالة كـ Deleted
            var entryMethod = typeof(DbContext).GetMethod("Entry", new[] { typeof(object) });
            var entry = entryMethod.Invoke(db, new[] { deserializedEntity });

            var property = entry.GetType().GetProperty("State");
            property.SetValue(entry, EntityState.Deleted);

            // حفظ التغييرات
            db.SaveChanges();

            return deserializedEntity;
        }






        //******************************************************************************************************







        [HttpGet]
        public string ChangeLanguage()
        {

            try
            {
                if (G_System.Language == "En")
                {
                    G_System.Language = "Ar";
                }
                else
                {
                    G_System.Language = "En";
                }

                return OkStr(new BaseResponse(true));

            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }



        [HttpGet]
        public string GetAllResources()
        {

            try
            {
                var resources = Res.GetAllResources();

                return OkStr(new BaseResponse(resources));

            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }


        [HttpGet]
        public string GetAllResourcesBy(string Language)
        {

            try
            {
                if (Language == null)
                {
                    G_System.Language = "En";
                }
                else if (Language.Trim() == "")
                {
                    G_System.Language = "En";

                }
                else
                {
                    G_System.Language = Language.Trim();
                }


                var resources = Res.GetAllResources();

                return OkStr(new BaseResponse(resources));

            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }


        //public string GetDataFrom(string Name_txt, string MapPath)
        //{

        //    string jsonData = "";

        //    try
        //    {
        //        jsonData = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.UrlPathEncode(MapPath + "" + Name_txt + ".txt"));
        //    }
        //    catch (Exception)
        //    {
        //        return ("Error");
        //    }

        //    string base64Encoded = jsonData;
        //    string base64Decoded;
        //    byte[] data = System.Convert.FromBase64String(base64Encoded);
        //    base64Decoded = Encoding.UTF8.GetString(data);

        //    return OkStr(new BaseResponse(base64Decoded));

        //}

        //public string SetDataFrom(string Name_txt, string jsonData, string MapPath)
        //{
        //    try
        //    {
        //        string originalString = jsonData;
        //        byte[] bytes = Encoding.UTF8.GetBytes(originalString);
        //        string base64EncodedString = Convert.ToBase64String(bytes);
        //        System.IO.File.WriteAllText(System.Web.HttpContext.Current.Server.UrlPathEncode(MapPath + "" + Name_txt + ".txt"), base64EncodedString);

        //    }
        //    catch (Exception)
        //    {
        //        return ("Error");
        //    }
        //    return OkStr(new BaseResponse("Done"));

        //}




        //****************************************************************************************************************************************

        public string FindKeySpeed(string SearchFormCode, string Condition, string NameFolder)
        {
            try
            {
                // Initialize the file handler with the provided hosting environment
                var fileHandler = new PostAndGetInTextFile(_hostingEnvironment);

                // Retrieve the data from the file
                var result = fileHandler.GetData(SearchFormCode, NameFolder);

                if (string.IsNullOrEmpty(result))
                {
                    // Return an appropriate response if no data is found
                    return "No data available for the provided SearchFormCode.";
                }

                ModeSearch resultObject = JsonConvert.DeserializeObject<ModeSearch>(result);

                if (Condition.Trim() != "")
                {
                    // Convert DataResult into a list of dictionaries for dynamic queries
                    var dataList = resultObject.DataResult
                    .Select(item => JsonConvert.DeserializeObject<Dictionary<string, object>>(item.ToString()))
                    .ToList();

                    // Apply the dynamic query using LINQ
                    var filteredData = ApplyDynamicQuery(dataList, Condition);

                    // Update DataResult with filtered data
                    resultObject.DataResult = filteredData.Cast<object>().ToList();
                }

                // Deserialize the JSON result into a dynamic object

                // Return the serialized JSON string
                return OkStr(resultObject);
            }
            catch (Exception jsonEx)
            {
                return $"Error parsing data for {SearchFormCode}.";
            }
        }


        [HttpPost]
        public string GetDataRedis([FromBody] G_DataRedis Redis)
        {
            try
            {
                var resultObject = GetDataFromRedis(Redis.NameTable, Redis.Condition, Redis.NameFolder);
                // Deserialize the JSON result into a dynamic object 
                // Return the serialized JSON string 
                return OkStr(new BaseResponse(resultObject));
            }
            catch (Exception jsonEx)
            {
                return OkStr(new BaseResponse(jsonEx));
            }
        }



        // Method to apply a dynamic query on the data list
        private List<Dictionary<string, object>> ApplyDynamicQuery(List<Dictionary<string, object>> dataList, string condition)
        {
            return dataList
                .Where(item => EvaluateCondition(item, condition))
                .ToList();
        }

        private bool EvaluateCondition(Dictionary<string, object> item, string condition)
        {
            // Split the condition into groups separated by "or"
            var orGroups = condition.Split(new[] { " or " }, StringSplitOptions.RemoveEmptyEntries);

            // Evaluate each "or" group
            foreach (var orGroup in orGroups)
            {
                // Split the group into conditions separated by "and"
                var andConditions = orGroup.Split(new[] { " and " }, StringSplitOptions.RemoveEmptyEntries);

                bool andGroupResult = true; // Assume all conditions in the "and" group are true

                // Evaluate each condition in the "and" group
                foreach (var cond in andConditions)
                {
                    string fieldName, operatorType, expectedValue;

                    // Check if the condition uses "!="
                    if (cond.Contains("!="))
                    {
                        var parts = cond.Split(new[] { "!=" }, StringSplitOptions.None);
                        operatorType = "!=";
                        fieldName = parts[0].Trim();
                        expectedValue = parts[1].Trim();
                    }
                    else if (cond.Contains("<=")) // Check if the condition uses "<="
                    {
                        var parts = cond.Split(new[] { "<=" }, StringSplitOptions.None);
                        operatorType = "<=";
                        fieldName = parts[0].Trim();
                        expectedValue = parts[1].Trim();
                    }
                    else if (cond.Contains(">=")) // Check if the condition uses ">="
                    {
                        var parts = cond.Split(new[] { ">=" }, StringSplitOptions.None);
                        operatorType = ">=";
                        fieldName = parts[0].Trim();
                        expectedValue = parts[1].Trim();
                    }
                    else if (cond.Contains("<")) // Check if the condition uses "<"
                    {
                        var parts = cond.Split(new[] { "<" }, StringSplitOptions.None);
                        operatorType = "<";
                        fieldName = parts[0].Trim();
                        expectedValue = parts[1].Trim();
                    }
                    else if (cond.Contains(">")) // Check if the condition uses ">"
                    {
                        var parts = cond.Split(new[] { ">" }, StringSplitOptions.None);
                        operatorType = ">";
                        fieldName = parts[0].Trim();
                        expectedValue = parts[1].Trim();
                    }
                    else if (cond.Contains("=")) // Check if the condition uses "="
                    {
                        var parts = cond.Split(new[] { "=" }, StringSplitOptions.None);
                        operatorType = "=";
                        fieldName = parts[0].Trim();
                        expectedValue = parts[1].Trim();
                    }
                    else
                    {
                        continue; // Skip invalid condition
                    }

                    if (!item.TryGetValue(fieldName, out var actualValue))
                    {
                        andGroupResult = false; // Field does not exist
                        break;
                    }

                    // Handle comparison based on operator
                    if (operatorType == "=")
                    {
                        if (!AreEqual(actualValue, expectedValue))
                        {
                            andGroupResult = false; // Value does not match
                            break;
                        }
                    }
                    else if (operatorType == "!=")
                    {
                        if (AreEqual(actualValue, expectedValue))
                        {
                            andGroupResult = false; // Value matches when it shouldn't
                            break;
                        }
                    }
                    else if (operatorType == "<")
                    {
                        if (!IsLessThan(actualValue, expectedValue))
                        {
                            andGroupResult = false; // Value is not less than expected
                            break;
                        }
                    }
                    else if (operatorType == ">")
                    {
                        if (!IsGreaterThan(actualValue, expectedValue))
                        {
                            andGroupResult = false; // Value is not greater than expected
                            break;
                        }
                    }
                    else if (operatorType == "<=")
                    {
                        if (!IsLessThanOrEqual(actualValue, expectedValue))
                        {
                            andGroupResult = false; // Value is not less than or equal to expected
                            break;
                        }
                    }
                    else if (operatorType == ">=")
                    {
                        if (!IsGreaterThanOrEqual(actualValue, expectedValue))
                        {
                            andGroupResult = false; // Value is not greater than or equal to expected
                            break;
                        }
                    }
                }

                // If any "and" group evaluates to true, the entire condition is true
                if (andGroupResult)
                {
                    return true;
                }
            }

            // If no "or" group evaluates to true, the entire condition is false
            return false;
        }

        private bool AreEqual(object actualValue, string expectedValue)
        {
            if (actualValue == null)
                return false;

            // Handle boolean values
            if (actualValue is bool actualBool)
            {
                if (bool.TryParse(expectedValue, out bool expectedBool))
                {
                    return actualBool == expectedBool;
                }
                return false;
            }

            // Handle numeric values
            if (IsNumeric(actualValue) && double.TryParse(expectedValue, out double expectedNumeric))
            {
                double actualNumeric = Convert.ToDouble(actualValue);
                return actualNumeric == expectedNumeric;
            }

            // Handle string values
            return actualValue.ToString().Equals(expectedValue, StringComparison.OrdinalIgnoreCase);
        }

        private bool IsLessThan(object actualValue, string expectedValue)
        {
            if (actualValue == null)
                return false;

            // Handle numeric values
            if (IsNumeric(actualValue) && double.TryParse(expectedValue, out double expectedNumeric))
            {
                double actualNumeric = Convert.ToDouble(actualValue);
                return actualNumeric < expectedNumeric;
            }

            return false;
        }

        private bool IsGreaterThan(object actualValue, string expectedValue)
        {
            if (actualValue == null)
                return false;

            // Handle numeric values
            if (IsNumeric(actualValue) && double.TryParse(expectedValue, out double expectedNumeric))
            {
                double actualNumeric = Convert.ToDouble(actualValue);
                return actualNumeric > expectedNumeric;
            }

            return false;
        }

        private bool IsLessThanOrEqual(object actualValue, string expectedValue)
        {
            if (actualValue == null)
                return false;

            // Handle numeric values
            if (IsNumeric(actualValue) && double.TryParse(expectedValue, out double expectedNumeric))
            {
                double actualNumeric = Convert.ToDouble(actualValue);
                return actualNumeric <= expectedNumeric;
            }

            return false;
        }

        private bool IsGreaterThanOrEqual(object actualValue, string expectedValue)
        {
            if (actualValue == null)
                return false;

            // Handle numeric values
            if (IsNumeric(actualValue) && double.TryParse(expectedValue, out double expectedNumeric))
            {
                double actualNumeric = Convert.ToDouble(actualValue);
                return actualNumeric >= expectedNumeric;
            }

            return false;
        }

        private bool IsNumeric(object value)
        {
            return value is int || value is double || value is float || value is decimal || value is long;
        }
        // Method to evaluate a single condition dynamically
        //private bool EvaluateCondition(Dictionary<string, object> item, string condition)
        //{
        //    // Split the condition (e.g., "COMP_CODE = 8 and DETAIL = 1")
        //    var conditions = condition.Split(new[] { " and " }, StringSplitOptions.RemoveEmptyEntries);

        //    foreach (var cond in conditions)
        //    {
        //        string fieldName, operatorType, expectedValue;

        //        // Check if the condition uses "!="
        //        if (cond.Contains("!="))
        //        {
        //            var parts = cond.Split(new[] { "!=" }, StringSplitOptions.None);
        //            operatorType = "!=";
        //            fieldName = parts[0].Trim();
        //            expectedValue = parts[1].Trim();
        //        }
        //        else if (cond.Contains("=")) // Check if the condition uses "="
        //        {
        //            var parts = cond.Split(new[] { "=" }, StringSplitOptions.None);
        //            operatorType = "=";
        //            fieldName = parts[0].Trim();
        //            expectedValue = parts[1].Trim();
        //        }
        //        else
        //        {
        //            continue; // Skip invalid condition
        //        }

        //        if (!item.TryGetValue(fieldName, out var actualValue))
        //        {
        //            return false; // Field does not exist
        //        }

        //        // Handle comparison based on operator
        //        if (operatorType == "=")
        //        {
        //            if (actualValue == null || !actualValue.ToString().Equals(expectedValue, StringComparison.OrdinalIgnoreCase))
        //            {
        //                return false; // Value does not match
        //            }
        //        }
        //        else if (operatorType == "!=")
        //        {
        //            if (actualValue != null && actualValue.ToString().Equals(expectedValue, StringComparison.OrdinalIgnoreCase))
        //            {
        //                return false; // Value matches when it shouldn't
        //            }
        //        }
        //    }

        //    return true; // All conditions are satisfied
        //}



        //****************************************************************************************************************************************

        [HttpGet]
        public string GetPageNumberFromTable(string NameTable, string Condition, int PageSize)
        {

            try
            {
                string Query = " GetPageNumberFromTable '" + NameTable + "','" + Condition + "'," + PageSize + "  ";
                var Res = SqlQuery<PaginationResult>(Query).FirstOrDefault();

                return OkStr(new BaseResponse(Res));

            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }

    }
}