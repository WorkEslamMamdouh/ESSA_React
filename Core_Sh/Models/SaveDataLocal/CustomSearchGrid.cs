using Core;
using Core.UI.Controllers;
using Core.UI.Repository;
using Core.UI.Repository.Models;
using Microsoft.Extensions.Hosting.Internal;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

public class CustomSearchGrid : BaseController
{
    private const int CommandTimeout = 600; // Timeout in seconds
    private readonly IWebHostEnvironment _hostingEnvironment;

    public CustomSearchGrid(ModelDbContext dbContext, IWebHostEnvironment hostingEnvironment) : base(dbContext,hostingEnvironment) {

        _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));
    }

    //*************************************************************************************************************

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
        public G_Check_DataChangesForSearchForm Settings { get; set; }
    }
    public int ExecuteSqlCommand(string query)
    {
        try
        {
            using (var connection = new SqlConnection(ConnectionString.connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand(query, connection))
                {
                    command.CommandType = CommandType.Text;
                    command.CommandTimeout = CommandTimeout;
                    return command.ExecuteNonQuery();
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error executing SQL command: {ex.Message}");
            throw;
        }
    }

    public List<T> SqlQuery<T>(string query) where T : new()
    {
        try
        {
            using (var connection = new SqlConnection(ConnectionString.connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand(query, connection))
                {
                    command.CommandTimeout = CommandTimeout;
                    using (var reader = command.ExecuteReader())
                    {
                        var table = new DataTable();
                        table.Load(reader);
                        string jsonResult = JsonConvert.SerializeObject(table);
                        return JsonConvert.DeserializeObject<List<T>>(jsonResult);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error executing SQL query: {ex.Message}");
            throw;
        }
    }

    public void GetDataAllSearchForms(IWebHostEnvironment hostingEnvironment)
    {
        try
        {
            // Retrieve all search forms
            var searchForms = SqlQuery<G_Check_DataChangesForSearchForm>(" exec G_Check_DataChangesForSearchForm ");

            if (searchForms == null || !searchForms.Any())
            {
                Console.WriteLine("No search forms found.");
                return;
            }

            if (searchForms.Count ==0)
            {
                return;
            }

            // Initialize the file handler with the provided hosting environment
            var fileHandler = new PostAndGetInTextFile(hostingEnvironment);

            foreach (var searchForm in searchForms)
            {
                try
                {
                    // Get the data table for each search form
                    var result = GetDataTable(searchForm);
                     
                    // Save the result to a file
                    fileHandler.SetData(JsonConvert.SerializeObject(result, Formatting.Indented) , searchForm.SearchFormCode , searchForm.NameFolder);


                    ExecuteSqlCommand("	update G_Data_Redis set Status = 1 where KeyTrigger ='" + searchForm.KeyTrigger + "'   and TrType = 1 ");

                }
                catch (Exception ex)
                {
                    // Log the error for the specific search form
                    Console.WriteLine($"Error processing search form {searchForm.SearchFormCode}: {ex.Message}");
                }
            }
        }
        catch (Exception ex)
        {
            // Log global error
            Console.WriteLine($"Error in GetDataAllSearchForms: {ex.Message}");
        }
    }



    public SearchAttruibuts SearchProperties(G_Check_DataChangesForSearchForm searchForm)
    {
        if (searchForm == null)
            throw new ArgumentNullException(nameof(searchForm));

        //var columns = db.G_SearchFormSetting
        //                .Where(c => c.SearchFormCode == searchForm.SearchFormCode)
        //                .OrderBy(c => c.FieldSequence)
        //                .ToList();

       var columns = SqlQuery<G_SearchFormSetting>("select * from G_SearchFormSetting where SearchFormCode = N'"+ searchForm.SearchFormCode + "'").ToList();


        return new SearchAttruibuts
        {
            Columns = columns,
            Settings = searchForm
        };
    }

    public object GetDataTable(G_Check_DataChangesForSearchForm searchForm)
    {
        var properties = SearchProperties(searchForm);

        if (string.IsNullOrEmpty(properties.Settings.DataSourceName))
        {
            return OkStr("");
        }

        var columnsBuilder = new StringBuilder();
        var columnObjects = new List<ColumnObjectStruct>
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

        foreach (var column in properties.Columns)
        {
            if (column.Language == 0 ||
                (G_System.Language == "En" && column.Language == 2) ||
                (G_System.Language == "Ar" && column.Language == 1))
            {
                columnsBuilder.Append($",{column.AlternateDataMember} AS {column.DataMember}");

                columnObjects.Add(new ColumnObjectStruct
                {
                    dataType = column.Datatype == 0 ? "string" : "number",
                    headerText = G_System.Language == "En" ? column.FieldTitle : column.FieldTitleA,
                    hidden =   (bool)!column.IsReadOnly,
                    filterable = false,
                    key = column.DataMember,
                    width = column.FieldWidth == 0 ? "100px" : $"{column.FieldWidth}px"
                });
            }
        }

        var tableName = properties.Settings.DataSourceName;
        var condition = ""; // Placeholder for condition
        var columns = columnsBuilder.ToString().Substring(1);
        var orderBy = properties.Settings.ReturnDataPropertyName;
       // var result = Find(tableName, condition, columns, orderBy);

        var query = $"SELECT {columns} FROM {tableName} {condition} ORDER BY {orderBy}";

        object result =new object();
        try
        {
            result = SqlQuery<object>(query).ToList();
        }
        catch (Exception ex)
        {

            result = ex.Message;
        }

        //result = JsonConvert.SerializeObject(result);

        var resultObject = new
        {
            TableName = tableName,
            Condition = condition,
            DataResult = result,
            Settings = properties.Settings,
            Columns = columnObjects
        };


        return resultObject;
    }

    
}
