using System;
using System.Text;

public static class XorCrypto
{

    static HashSet<string> UsedTokens = new();

    public static bool ValidateToken(string token, string secretKey)
    {
        if (UsedTokens.Contains(token))
            return false;

        string decrypted = Decrypt(token, secretKey);
        if (!decrypted.StartsWith("USER-"))
            return false;

        UsedTokens.Add(token); // أول مرة فقط تنجح
        return true;
    }


    //public static bool ValidateToken(string token, string secretKey, int allowedMinuteDrift = 1)
    //{
    //    byte[] encryptedBytes = Convert.FromBase64String(token);
    //    byte[] keyBytes = Encoding.UTF8.GetBytes(secretKey);
    //    byte[] result = new byte[encryptedBytes.Length];

    //    for (int i = 0; i < encryptedBytes.Length; i++)
    //    {
    //        result[i] = (byte)(encryptedBytes[i] ^ keyBytes[i % keyBytes.Length]);
    //    }

    //    string decoded = Encoding.UTF8.GetString(result);

    //    // استخراج الدقيقة من الـ payload
    //    if (!decoded.StartsWith("USER-")) return false;

    //    if (!long.TryParse(decoded.Substring(5), out long tokenMinute)) return false;

    //    long currentMinute = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() / 60000;

    //    return Math.Abs(currentMinute - tokenMinute) <= allowedMinuteDrift;
    //}

    public static string Encrypt(string plainText, string key)
    {
        if (string.IsNullOrEmpty(plainText) || string.IsNullOrEmpty(key))
            return plainText;

        ReadOnlySpan<byte> plainBytes = Encoding.UTF8.GetBytes(plainText);
        ReadOnlySpan<byte> keyBytes = Encoding.UTF8.GetBytes(key);

        byte[] result = new byte[plainBytes.Length];

        for (int i = 0; i < plainBytes.Length; i++)
        {
            result[i] = (byte)(plainBytes[i] ^ keyBytes[i % keyBytes.Length]);
        }

        return Convert.ToBase64String(result);
    }

    public static string Decrypt(string base64Input, string key)
    {
        if (string.IsNullOrEmpty(base64Input) || string.IsNullOrEmpty(key))
            return base64Input;

        ReadOnlySpan<byte> encryptedBytes = Convert.FromBase64String(base64Input);
        ReadOnlySpan<byte> keyBytes = Encoding.UTF8.GetBytes(key);

        byte[] result = new byte[encryptedBytes.Length];

        for (int i = 0; i < encryptedBytes.Length; i++)
        {
            result[i] = (byte)(encryptedBytes[i] ^ keyBytes[i % keyBytes.Length]);
        }

        return Encoding.UTF8.GetString(result);
    }
}
