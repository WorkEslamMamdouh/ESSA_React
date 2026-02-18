using Core.UI.Repository.Models;

namespace Core.UI.Modules.Customers.Phase2.Abstractions
{
    public interface IRepository
    {
        D_Customer InsertCustomer(D_Customer customer);
        D_Customer UpdateCustomer(D_Customer customer);
        List<T> SqlQuery<T>(string query) where T : new();
    }
}
