using CheckPost;
using Core;
using Core.UI.Controllers;
using Core.UI.Repository;
using Core.UI.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting.Internal;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

public class Data_Redis : BaseController
{
    private const int CommandTimeout = 600; // Timeout in seconds
    private readonly IWebHostEnvironment _hostingEnvironment;
    private readonly DeviceIdProvider _deviceIdProvider;

    public Data_Redis(ModelDbContext dbContext, IWebHostEnvironment hostingEnvironment, DeviceIdProvider deviceIdProvider)
        : base(dbContext, hostingEnvironment)
    {
        _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));
        _deviceIdProvider = deviceIdProvider ?? throw new ArgumentNullException(nameof(deviceIdProvider));
    }

 
    //*************************************************************************************************************

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

    public void GetData_RedisAllTables(IWebHostEnvironment hostingEnvironment)
    {
        try
        { 
            string deviceId = _deviceIdProvider.GetIdDevice();
            // Retrieve all search forms
            var listData_Redis = SqlQuery<G_Data_Redis>("SELECT * FROM G_Data_Redis where ISActive = 1 and Status = 0 and TrType <> 1 and IDServerDevice = N'"+ deviceId + "' ");

            if (listData_Redis == null || !listData_Redis.Any())
            {
                Console.WriteLine("No search forms found.");
                return;
            }

            // Initialize the file handler with the provided hosting environment
            var fileHandler = new PostAndGetInTextFile(hostingEnvironment);

            foreach (var Table in listData_Redis)
            {
                try
                {
                    // Get the data table for each search form
                    var result = GetDataTable(Table.NameTable);

                    // Save the result to a file
                    fileHandler.SetData(JsonConvert.SerializeObject(result, Formatting.Indented), Table.NameTable, Table.NameFolder);

                    ExecuteSqlCommand("	update G_Data_Redis set Status = 1 where KeyTrigger ='" + Table.KeyTrigger + "'   and TrType <> 1 and IDServerDevice = N'"+ deviceId + "'  ");
                }
                catch (Exception ex)
                {
                    // Log the error for the specific search form
                    Console.WriteLine($"Error processing search form {Table.NameTable}: {ex.Message}");
                }
            }
        }
        catch (Exception ex)
        {
            // Log global error
            Console.WriteLine($"Error in GetDataAllSearchForms: {ex.Message}");
        }
    }

    public object GetDataTable(string tableName)
    {
        var query = $"SELECT * FROM {tableName}";

        object result = new object();
        try
        {
            result = SqlQuery<object>(query).ToList();
        }
        catch (Exception ex)
        {

            result = ex.Message;
        }

        var DataResult = result;

        return DataResult;
    }


}
