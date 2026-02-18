using Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.IO.Compression;
using System.Text;

public class PostAndGetInTextFile
{
    private readonly IWebHostEnvironment _hostingEnvironment;

    public PostAndGetInTextFile(IWebHostEnvironment hostingEnvironment)
    {
        _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));
    }

    public string GetData(string nameTxt, string NameFolder = "")
    {
        try
        {
            string pathUrl = ConnectionString.PathSaveData;
            string serverPath = GetServerPath(pathUrl);
            if (NameFolder.Trim() != "")
            {
                serverPath = serverPath + "/" + NameFolder.Trim();
            }

            string fileName = $"{nameTxt}.txt";
            string filePath = Path.Combine(serverPath, fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

            if (!File.Exists(filePath))
            {
                CreateEmptyFile(filePath);
            }

            string jsonData = File.ReadAllText(filePath);
            //return jsonData;
            return DecompressString(jsonData);
        }
        catch (Exception ex)
        {
            // Log the exception if needed
            Console.WriteLine($"Error in GetData: {ex.Message}");
            return "Error";
        }
    }


    public void SetData(string model ,string nameTxt,string NameFolder = "")
    {
        try
        {
            string compressedData = CompressString(model);
            //string compressedData = model;
            string pathUrl = ConnectionString.PathSaveData;

            string serverPath = GetServerPath(pathUrl);

            if (NameFolder.Trim() != "")
            {
                serverPath = serverPath + "/" + NameFolder.Trim();
            }

            string fileName = $"{nameTxt}.txt";
            string filePath = Path.Combine(serverPath, fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
            File.WriteAllText(filePath, compressedData);
        }
        catch (Exception ex)
        {
            // Log the exception if needed
            Console.WriteLine($"Error in SetData: {ex.Message}");
        }
    }

    private string GetServerPath(string virtualPath)
    {
        if (string.IsNullOrWhiteSpace(virtualPath))
            throw new ArgumentException("Path cannot be null or empty.", nameof(virtualPath));

        return Path.Combine(
            _hostingEnvironment.WebRootPath,
            virtualPath.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString()));
    }

    private static string CompressString(string input)
    {
        if (string.IsNullOrEmpty(input)) return string.Empty;

        byte[] inputBytes = Encoding.UTF8.GetBytes(input);
        using MemoryStream outputStream = new();
        using (GZipStream compressionStream = new(outputStream, CompressionMode.Compress))
        {
            compressionStream.Write(inputBytes, 0, inputBytes.Length);
        }

        return Convert.ToBase64String(outputStream.ToArray());
    }

    private static string DecompressString(string compressedString)
    {
        if (string.IsNullOrEmpty(compressedString)) return string.Empty;

        byte[] compressedBytes = Convert.FromBase64String(compressedString);
        using MemoryStream inputStream = new(compressedBytes);
        using MemoryStream outputStream = new();
        using (GZipStream decompressionStream = new(inputStream, CompressionMode.Decompress))
        {
            decompressionStream.CopyTo(outputStream);
        }

        return Encoding.UTF8.GetString(outputStream.ToArray());
    }

    private static void CreateEmptyFile(string filePath)
    {
        using (StreamWriter writer = new(filePath))
        {
            writer.WriteLine("");
        }
    }
}
