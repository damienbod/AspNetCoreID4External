namespace IdentityProvider.Services.Certificate;

public class CertificateConfiguration
{
    public bool UseLocalCertStore { get; set; }
    public string CertificateThumbprint { get; set; } = string.Empty;
    public string CertificateNameKeyVault { get; set; } = string.Empty;
    public string KeyVaultEndpoint { get; set; } = string.Empty;
    public string DevelopmentCertificatePfx { get; set; } = string.Empty;
    public string DevelopmentCertificatePassword { get; set; } = string.Empty;
}
