using System.Linq;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Core.UI.Repository;
using Core.UI.Models;
using System.Data;
using System.Reflection; 
using System.Security.AccessControl;
using Microsoft.EntityFrameworkCore.Storage; 
using System.Data.SqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Metadata;
using Core.UI.Repository.Models;


namespace Core.Shared.DataManager
{
    public class DataManager
    {


        public int ExecuteSqlCommand(string Query)
        {
            int rowsAffected = 0;
            string connectionString = ConnectionString.connectionString;


            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Query, con))
                    {
                        cmd.CommandType = System.Data.CommandType.Text;
                        rowsAffected = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception, log, or throw if necessary
                Console.WriteLine("An error occurred: " + ex.Message);
            }

            return rowsAffected;
        }




    }
}