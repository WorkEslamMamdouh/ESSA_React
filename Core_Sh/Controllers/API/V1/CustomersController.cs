using Core.UI.Modules.Customers.Phase2.Application;
using Core.UI.Modules.Customers.Phase2.Application.DTOs;
using Core.UI.Modules.Customers.Phase2.Infrastructure;
using Core.UI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Core.UI.Controllers.API.V1
{
    [ApiController]
    [Route("api/v1/customers")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerApplicationService _service;

        public CustomersController(ModelDbContext dbContext, IWebHostEnvironment hostingEnvironment)
        {
            _service = new CustomerApplicationService(
                new EfCustomerRepository(dbContext),
                new StoredProcExecutor(),
                new FileCacheProvider(hostingEnvironment));
        }

        [HttpPost]
        public IActionResult Insert([FromBody] CustomerPayloadRequestDto request)
        {
            return Content(_service.Insert(request), "application/json");
        }

        [HttpPut]
        public IActionResult Update([FromBody] CustomerPayloadRequestDto request)
        {
            return Content(_service.Update(request), "application/json");
        }

        [HttpGet("check-duplicated-code")]
        public IActionResult CheckDuplicatedCode([FromQuery] CheckDuplicatedCodeRequestDto request)
        {
            return Content(_service.CheckDuplicatedCode(request), "application/json");
        }

        [HttpGet("check-duplicated-comp-code")]
        public IActionResult CheckDuplicatedCompCode([FromQuery] CheckDuplicatedCompCodeRequestDto request)
        {
            return Content(_service.CheckDuplicatedCompCode(request), "application/json");
        }
    }
}
