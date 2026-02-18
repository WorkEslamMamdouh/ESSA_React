using System.Data;
using Core;
using Core.UI.Modules.Customers.Phase2.Abstractions;
using Microsoft.Data.SqlClient;

namespace Core.UI.Modules.Customers.Phase2.Infrastructure
{
    public class StoredProcExecutor : IStoredProcExecutor
    {
        public ResponseResult TransactionProcess(int compCode, int branchCode, int? id, string type, string opMode)
        {
            var result = new ResponseResult();

            using var connection = new SqlConnection(ConnectionString.connectionString);
            connection.Open();

            using var command = new SqlCommand("dbo.G_ProcessTrans", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            command.Parameters.AddWithValue("@Comp", compCode);
            command.Parameters.AddWithValue("@Branch", branchCode);
            command.Parameters.AddWithValue("@TrType", type);
            command.Parameters.AddWithValue("@OpMode", opMode);
            command.Parameters.AddWithValue("@TrID", id);

            var trNoParameter = new SqlParameter("@TrNo", SqlDbType.Int) { Direction = ParameterDirection.Output };
            var okParameter = new SqlParameter("@Ok", SqlDbType.Int) { Direction = ParameterDirection.Output };
            command.Parameters.Add(trNoParameter);
            command.Parameters.Add(okParameter);

            command.ExecuteNonQuery();

            var trNo = trNoParameter.Value != DBNull.Value ? (int)trNoParameter.Value : 0;
            var ok = okParameter.Value != DBNull.Value ? (int)okParameter.Value : 0;

            result.ResponseState = ok == 0;
            result.ResponseData = trNo;

            return result;
        }
    }
}
