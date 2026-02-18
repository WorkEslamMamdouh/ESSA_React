using Core;

namespace Core.UI.Modules.Customers.Phase2.Abstractions
{
    public interface IStoredProcExecutor
    {
        ResponseResult TransactionProcess(int compCode, int branchCode, int? id, string type, string opMode);
    }
}
