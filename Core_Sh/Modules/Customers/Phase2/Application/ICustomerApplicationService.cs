using Core.UI.Modules.Customers.Phase2.Application.DTOs;

namespace Core.UI.Modules.Customers.Phase2.Application
{
    public interface ICustomerApplicationService
    {
        string Insert(CustomerPayloadRequestDto request);
        string Update(CustomerPayloadRequestDto request);
        string CheckDuplicatedCode(CheckDuplicatedCodeRequestDto request);
        string CheckDuplicatedCompCode(CheckDuplicatedCompCodeRequestDto request);
    }
}
