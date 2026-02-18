using Core.UI.Modules.Customers.Phase2.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace Core.UI.Modules.Customers.Phase2.Controllers
{
    public abstract class CustomerPhase2BaseController : ControllerBase
    {
        protected readonly IStoredProcExecutor StoredProcExecutor;
        protected readonly IRepository Repository;
        protected readonly IFileCacheProvider FileCacheProvider;

        protected CustomerPhase2BaseController(
            IStoredProcExecutor storedProcExecutor,
            IRepository repository,
            IFileCacheProvider fileCacheProvider)
        {
            StoredProcExecutor = storedProcExecutor;
            Repository = repository;
            FileCacheProvider = fileCacheProvider;
        }
    }
}
