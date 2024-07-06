using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using Shared.Entities;
using Shared.Enums;
using Shared.Services.Interfaces;
using System.IO;

namespace LogsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogReportController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogService _logService;

        private const string LOGS = "Logs";
        private const string HTTPREQUESTS = "HttpRequests";

        public LogReportController(IConfiguration configuration, ILogService logService)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(IConfiguration));
            _logService = logService ?? throw new ArgumentNullException(nameof(logService));
        }

        /// <summary>
        /// Generate the report for the HttpRequest log file provided by Mantel. ( Please see programming-task-example-data.log file )
        /// </summary>
        /// <returns>The generated report from file provided by Mantel.</returns>
        [HttpGet("Demo")]
        public IActionResult GetDemo()
        {
            try
            {
                LogType logType = LogType.HttpRequest;

                string? httpRequestFile = _configuration.GetSection(LOGS)?[HTTPREQUESTS]?.ToString();

                if (httpRequestFile == null)
                    return NotFound();

                using StreamReader reader = new StreamReader(httpRequestFile);

                string text = reader.ReadToEnd();

                LogReport report = _logService.GenerateLogReport(text, logType);

                return Ok(report);
            }
            catch(Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    title: "Server error");
            }
        }

        /// <summary>
        /// Generate the report for the provided file path.
        /// </summary>
        /// <param name="filePath">The provided log file path to generate a report from</param>
        /// <param name="logType">The Enum.LogType value. Defaults to HttpRequest if not provided.</param>
        /// <returns>The generated report from specified given log file.</returns>
        [HttpGet]
        public IActionResult Get([FromQuery] string filePath, [FromQuery] string? logType )
        {
            try
            {
                LogType myLogType = string.IsNullOrWhiteSpace(logType) ?
                    LogType.HttpRequest
                    : Enum.Parse<LogType>(logType);

                if (!System.IO.File.Exists(filePath))
                    return NotFound();
                
                using StreamReader reader = new StreamReader(filePath);

                string text = reader.ReadToEnd();

                LogReport report = _logService.GenerateLogReport(text, myLogType);

                return Ok(report);
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    title: "Server error");
            }
        }
    }
}
