using Core.Shared.DataManager;
using Core.UI.Modules.Customers.Phase2.Abstractions;
using Microsoft.AspNetCore.Hosting;

namespace Core.UI.Modules.Customers.Phase2.Infrastructure
{
    public class FileCacheProvider : IFileCacheProvider
    {
        private readonly IWebHostEnvironment _hostingEnvironment;

        public FileCacheProvider(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public string? GetData(string tableName, string folderName)
        {
            var fileHandler = new PostAndGetInTextFile(_hostingEnvironment);
            return fileHandler.GetData(tableName, folderName);
        }

        public void SetData(string jsonData, string tableName, string folderName)
        {
            var fileHandler = new PostAndGetInTextFile(_hostingEnvironment);
            fileHandler.SetData(jsonData, tableName, folderName);
        }
    }
}
