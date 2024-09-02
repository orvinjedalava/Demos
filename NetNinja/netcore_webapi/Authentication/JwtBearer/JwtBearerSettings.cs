namespace netcore_webapi.Authentication.JwtBearer
{
    public class JwtBearerSettings
    {
        public string SigningKey { get; set; } = null!;
        public string Issuer { get; set; } = null!;
        public string Audience { get; set; } = null!;
        //public int ExpiryInMinutes { get; set; }
    }
}