using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace IdentityProvider.Services;

public class EmailSender : Microsoft.AspNetCore.Identity.UI.Services.IEmailSender
{
    private readonly IOptions<EmailSettings> _optionsEmailSettings;

    public EmailSender(IOptions<EmailSettings> optionsEmailSettings)
    {
        _optionsEmailSettings = optionsEmailSettings;
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var client = new SendGridClient(_optionsEmailSettings.Value.SendGridApiKey);
        var msg = new SendGridMessage();
        msg.SetFrom(new EmailAddress(_optionsEmailSettings.Value.SenderEmailAddress, "duende"));
        msg.AddTo(new EmailAddress(email));
        msg.SetSubject(subject);
        //msg.AddContent(MimeType.Text, message);
        msg.AddContent(MimeType.Html, htmlMessage);

        msg.SetReplyTo(new EmailAddress(_optionsEmailSettings.Value.SenderEmailAddress, "duende"));

        var response = await client.SendEmailAsync(msg);
    }
}