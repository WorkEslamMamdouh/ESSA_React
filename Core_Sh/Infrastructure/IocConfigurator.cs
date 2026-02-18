


using Core.UI.IServices;
using Core.UI.Repository.Models;

namespace Core
{
    public static class IocConfigurator
    {

        public static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<_Interface, _Service>(); 

            //services.AddScoped<Get_Balance_Test, Get_Balance_Test>(); 
        }
    }
}