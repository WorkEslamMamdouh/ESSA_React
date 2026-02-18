using System.Data;
using Core.UI.Modules.Customers.Phase2.Abstractions;
using Core.UI.Repository;
using Core.UI.Repository.Models;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;

namespace Core.UI.Modules.Customers.Phase2.Infrastructure
{
    public class EfCustomerRepository : IRepository
    {
        private readonly ModelDbContext _db;

        public EfCustomerRepository(ModelDbContext db)
        {
            _db = db;
        }

        public D_Customer InsertCustomer(D_Customer customer)
        {
            customer.CustomerId = null;
            var entity = _db.Add(customer).Entity;
            _db.SaveChanges();
            return entity;
        }

        public D_Customer UpdateCustomer(D_Customer customer)
        {
            var entity = _db.Update(customer).Entity;
            _db.SaveChanges();
            return entity;
        }

        public List<T> SqlQuery<T>(string query) where T : new()
        {
            using var connection = new SqlConnection(ConnectionString.connectionString);
            connection.Open();
            using var command = new SqlCommand(query, connection);
            using var reader = command.ExecuteReader();

            var table = new DataTable();
            table.Load(reader);

            var jsonResult = JsonConvert.SerializeObject(table);
            return JsonConvert.DeserializeObject<List<T>>(jsonResult) ?? new List<T>();
        }
    }
}
