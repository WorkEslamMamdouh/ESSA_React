namespace Core.UI.Modules.Customers.Phase2.Abstractions
{
    public interface IFileCacheProvider
    {
        string? GetData(string tableName, string folderName);
        void SetData(string jsonData, string tableName, string folderName);
    }
}
