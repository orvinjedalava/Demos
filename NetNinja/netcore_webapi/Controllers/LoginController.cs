using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using netcore_webapi.Authenitication.Basic.Attributes;
using netcore_webapi.Models;

namespace netcore_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost("basic"), BasicAuthorization]
        public IActionResult Basic()
        {
            return Ok();
        }
    }
}