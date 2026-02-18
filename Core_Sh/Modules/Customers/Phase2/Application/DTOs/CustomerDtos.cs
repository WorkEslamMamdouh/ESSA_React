using System.Net;

namespace Core.UI.Modules.Customers.Phase2.Application.DTOs
{
    public class CustomerPayloadRequestDto
    {
        public string DataSend { get; set; } = string.Empty;
    }

    public class CheckDuplicatedCodeRequestDto
    {
        public int CompCode { get; set; }
        public int CustomerId { get; set; }
        public string CustomerCode { get; set; } = string.Empty;
    }

    public class CheckDuplicatedCompCodeRequestDto
    {
        public int CompCode { get; set; }
    }

    public class CustomerResponseDto
    {
        public bool IsSuccess { get; set; }
        public string? ErrorMessage { get; set; }
        public int StatusCode { get; set; }
        public object? Response { get; set; }

        public static CustomerResponseDto Success(object? response = null)
        {
            return new CustomerResponseDto
            {
                IsSuccess = true,
                StatusCode = (int)HttpStatusCode.OK,
                Response = response
            };
        }

        public static CustomerResponseDto Error(HttpStatusCode statusCode, string message)
        {
            return new CustomerResponseDto
            {
                IsSuccess = false,
                StatusCode = (int)statusCode,
                ErrorMessage = message
            };
        }
    }
}
