using Core.UI.Modules.Customers.Phase2.Application;
using Core.UI.Modules.Customers.Phase2.Application.DTOs;

namespace Core.UI.Modules.Customers.Phase2.Compatibility
{
    /// <summary>
    /// Compatibility shim that mirrors legacy CustomerController action contracts
    /// and delegates execution to the new Phase 2 application service.
    /// </summary>
    public class CustomerControllerCompatibilityShim
    {
        private readonly ICustomerApplicationService _service;

        public CustomerControllerCompatibilityShim(ICustomerApplicationService service)
        {
            _service = service;
        }

        public string Insert(CustomerPayloadRequestDto request)
        {
            return _service.Insert(request);
        }

        public string Update(CustomerPayloadRequestDto request)
        {
            return _service.Update(request);
        }

        public string CheckDuplicatedCode(CheckDuplicatedCodeRequestDto request)
        {
            return _service.CheckDuplicatedCode(request);
        }

        public string CheckDuplicatedCompCode(CheckDuplicatedCompCodeRequestDto request)
        {
            return _service.CheckDuplicatedCompCode(request);
        }
    }
}
