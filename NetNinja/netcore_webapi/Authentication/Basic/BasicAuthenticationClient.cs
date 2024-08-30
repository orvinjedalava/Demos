using System.Security.Principal;

namespace netcore_webapi.Authentication.Basic
{
    public class BasicAuthenticationClient : IIdentity
    {
        public string? AuthenticationType { get; set; }

        public bool IsAuthenticated { get; set;}

        public string? Name { get; set; }
    }
}