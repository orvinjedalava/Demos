using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using netcore_webapi.Authenitication.Basic.Attributes;
using netcore_webapi.Authentication.JwtBearer;
using netcore_webapi.Models;

namespace netcore_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController(IOptions<JwtBearerSettings> jwtBearerSetingsOptions) : ControllerBase
    {
        private readonly JwtBearerSettings _jwtBearerSettings = jwtBearerSetingsOptions.Value;

        [HttpPost("basic"), BasicAuthorization]
        public IActionResult Basic()
        {
            return Ok();
        }

        [HttpPost("jwt"), BasicAuthorization, Consumes("application/x-www-form-urlencoded")]
        public IActionResult Jwt([FromForm(Name = "grant_type")] string grant_type)
        {
            if (grant_type != "client_credentials")
            {
                return BadRequest(new {
                    error = "unsupported_grant_type",
                    error_description = "The authorization grant type is not supported by the authorization server."
                });
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var now = DateTime.UtcNow;
            var expiry = now.Add(TimeSpan.FromHours(1));

            var jwtBearerAuthenticatedClient = new JwtBearerClient
            {
                AuthenticationType = JwtBearerDefaults.AuthenticationScheme,
                IsAuthenticated = true,
                Name = "Jed"
            };

            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(jwtBearerAuthenticatedClient,
                    new List<Claim>
                    {
                        new(JwtRegisteredClaimNames.Name, jwtBearerAuthenticatedClient.Name),
                        
                        new(ClaimTypes.Authentication, jwtBearerAuthenticatedClient.AuthenticationType),
                    }),
                Expires = expiry,
                Issuer = _jwtBearerSettings.Issuer,
                Audience = _jwtBearerSettings.Audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(_jwtBearerSettings.SigningKey)),
                    SecurityAlgorithms.HmacSha512Signature),
                IssuedAt = now,
                NotBefore = now,
            }));

            return Ok( new {
                access_token = token,
                token_type = JwtBearerDefaults.AuthenticationScheme,
                expires_in = expiry.Subtract(DateTime.UtcNow).TotalSeconds.ToString("0"),
            });
        }
    }
}