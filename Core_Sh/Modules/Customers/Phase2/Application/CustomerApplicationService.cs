using System.Net;
using Core;
using Core.UI.Modules.Customers.Phase2.Abstractions;
using Core.UI.Modules.Customers.Phase2.Application.DTOs;
using Core.UI.Repository.Models;
using Newtonsoft.Json;

namespace Core.UI.Modules.Customers.Phase2.Application
{
    public class CustomerApplicationService : ICustomerApplicationService
    {
        private readonly IRepository _repository;
        private readonly IStoredProcExecutor _storedProcExecutor;
        private readonly IFileCacheProvider _fileCacheProvider;

        public CustomerApplicationService(
            IRepository repository,
            IStoredProcExecutor storedProcExecutor,
            IFileCacheProvider fileCacheProvider)
        {
            _repository = repository;
            _storedProcExecutor = storedProcExecutor;
            _fileCacheProvider = fileCacheProvider;
        }

        public string Update(CustomerPayloadRequestDto request)
        {
            try
            {
                var customer = JsonConvert.DeserializeObject<D_Customer>(request.DataSend);
                if (customer == null)
                {
                    throw new ArgumentNullException(nameof(request.DataSend));
                }

                _repository.UpdateCustomer(customer);
                return SerializeResponse(CustomerResponseDto.Success(true));
            }
            catch (ArgumentNullException ex)
            {
                return SerializeResponse(CustomerResponseDto.Error(HttpStatusCode.BadRequest, ex.Message));
            }
        }

        public string Insert(CustomerPayloadRequestDto request)
        {
            try
            {
                var customer = JsonConvert.DeserializeObject<D_Customer>(request.DataSend);
                if (customer == null)
                {
                    throw new ArgumentNullException(nameof(request.DataSend));
                }

                var inserted = _repository.InsertCustomer(customer);
                var transResult = _storedProcExecutor.TransactionProcess(Convert.ToInt16(inserted.CompCode), 1, inserted.CustomerId, "Customer", "Add");

                if (transResult.ResponseState)
                {
                    return SerializeResponse(CustomerResponseDto.Success(true));
                }

                return SerializeResponse(CustomerResponseDto.Error(HttpStatusCode.ExpectationFailed, "Error"));
            }
            catch (ArgumentNullException ex)
            {
                return SerializeResponse(CustomerResponseDto.Error(HttpStatusCode.BadRequest, ex.Message));
            }
        }

        public string CheckDuplicatedCode(CheckDuplicatedCodeRequestDto request)
        {
            try
            {
                var count = _repository.SqlQuery<Core.UI.Models.CustomCount>(
                    "select Count(*) as Count from D_Customer where  CustomerCODE ='" + request.CustomerCode + "'  and CustomerId != " + request.CustomerId + " ")
                    .FirstOrDefault();

                return SerializeResponse(CustomerResponseDto.Success(count?.count ?? 0));
            }
            catch (Exception ex)
            {
                return SerializeResponse(CustomerResponseDto.Error(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

        public string CheckDuplicatedCompCode(CheckDuplicatedCompCodeRequestDto request)
        {
            try
            {
                var count = _repository.SqlQuery<Core.UI.Models.CustomCount>(
                    "select Count(*) as Count from COMP_CODE where  COMP_CODE ='" + request.CompCode + "'")
                    .FirstOrDefault();

                return SerializeResponse(CustomerResponseDto.Success(count?.count ?? 0));
            }
            catch (Exception ex)
            {
                return SerializeResponse(CustomerResponseDto.Error(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

        // Compatibility behavior from legacy controller; intentionally kept as internal service logic.
        private void UpdateReplaceData(D_Customer model)
        {
            try
            {
                var raw = _fileCacheProvider.GetData("D_Customer", "DataTable");
                var currentList = string.IsNullOrEmpty(raw)
                    ? new List<D_Customer>()
                    : JsonConvert.DeserializeObject<List<D_Customer>>(raw) ?? new List<D_Customer>();

                var dbRow = _repository.SqlQuery<D_Customer>("Select * from D_Customer where CustomerId = " + model.CustomerId).FirstOrDefault();
                var filtered = currentList.Where(x => x.CustomerId != model.CustomerId).ToList();

                if (dbRow != null)
                {
                    filtered.Add(dbRow);
                }

                _fileCacheProvider.SetData(JsonConvert.SerializeObject(filtered, Formatting.Indented), "D_Customer", "DataTable");
            }
            catch
            {
                // Preserved legacy behavior (swallow exceptions).
            }
        }

        private static string SerializeResponse(CustomerResponseDto response)
        {
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
