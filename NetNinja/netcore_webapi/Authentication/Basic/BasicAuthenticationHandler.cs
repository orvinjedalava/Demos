using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using netcore_webapi.Authenitication.Basic;

namespace netcore_webapi.Authentication.Basic
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, 
            ILoggerFactory logger, 
            UrlEncoder encoder, 
            ISystemClock clock) 
            : base(options, logger, encoder, clock)
        {
            
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            // check if the request contains the Authorization header
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Task.FromResult(
                    AuthenticateResult.Fail("Missing Authorization Header")
                );
            }

            string authorizationHeader = Request.Headers["Authorization"].ToString();

            // check if the Authorization header is valid, meaning it starts with "Basic"
            if (!authorizationHeader.StartsWith("Basic", StringComparison.OrdinalIgnoreCase))
            {
                return Task.FromResult(
                    AuthenticateResult.Fail("Invalid Authorization Header")
                );
            }

            // extract and decode the base64 encoded clientId and clientSecret from the Authorization header
            var authBase64Decoded = Encoding.UTF8.GetString(
                Convert.FromBase64String(
                    authorizationHeader.Replace("Basic ",string.Empty, StringComparison.OrdinalIgnoreCase)
                )
            );

            var authSplit = authBase64Decoded.Split(":", 2);

            if (authSplit.Length != 2)
            {
                return Task.FromResult(
                    AuthenticateResult.Fail("Invalid Authorization Header format")
                );
            }

            var clientId = authSplit[0];
            var clientSecret = authSplit[1];

            // At this point, we want to validate it against a database or some other form of storage.
            // For now, hardcode the values
            if (clientId != "Jed" || clientSecret != "Jed")
            {
                return Task.FromResult(
                    AuthenticateResult.Fail("Invalid username or password")
                );
            }

            // Create a BasicAuthenticationClient object
            var client = new BasicAuthenticationClient
            {
                AuthenticationType = BasicAuthenticationDefaults.AuthenticationScheme,
                IsAuthenticated = true,
                Name = clientId
            };

            // Create a ClaimsPrincipal object
            var claimsPrincipal = new ClaimsPrincipal(
                new ClaimsIdentity(
                    client, 
                    new[] { 
                        new Claim(ClaimTypes.Name, clientId) 
                    }
                )
            );

            return Task.FromResult(
                AuthenticateResult.Success(
                    new AuthenticationTicket(
                        claimsPrincipal, 
                        Scheme.Name
                    )
                )
            );
        }
    }
}