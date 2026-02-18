using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Core;

public class EmailService
{
    public void SendEmail(string toEmail, string subject, string body)
    {
        // إعدادات SMTP

         
        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential(ConnectionString.CompanyEmail.Trim(), ConnectionString.CompanyPassEmail.Trim()),
            EnableSsl = true,
        };

        // إعداد الرسالة
        var mailMessage = new MailMessage
        {
            From = new MailAddress(ConnectionString.CompanyEmail.Trim()),
            Subject = subject,
            Body = body,
            IsBodyHtml = true,
        };
        mailMessage.To.Add(toEmail);

        // إرسال الرسالة
        smtpClient.Send(mailMessage);
    }
}
