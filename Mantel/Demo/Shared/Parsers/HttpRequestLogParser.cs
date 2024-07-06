using Shared.Entities;
using Shared.Exceptions;
using Shared.Parsers.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Parsers
{
    /// <summary>
    /// Parser used to generate a LogItem object from a given log record.
    /// </summary>
    public class HttpRequestLogParser : ILogParser
    {
        public LogItem? Parse(string rawStringLog)
        {
            // sanity check.
            if (string.IsNullOrWhiteSpace(rawStringLog))
                return null;

            string[] logElements = rawStringLog.Split(' ');

            // if log element count less than 11, not a valid log.
            if (logElements.Length < 11)
                return null;

            try
            {
                IPAddress ipAddress = IPAddress.Parse(logElements[0]);
                DateTime timestamp = DateTime.ParseExact($"{logElements[3]} {logElements[4]}", "[dd/MMM/yyyy:HH:mm:ss zzzz]", null);
                HttpMethod httpMethod = HttpMethod.Parse(logElements[5].Substring(1));
                string route = logElements[6];
                string httpProtocol = logElements[7].Substring(0, logElements[7].Length - 1);
                int httpResponseStatusCode = int.Parse(logElements[8]);
                int port = int.Parse(logElements[9]);
                string userAgentTemp = string.Join(' ', logElements.Skip(11));
                string userAgent = userAgentTemp.Substring(1, userAgentTemp.Length - 2);

                return new HttpRequestLogItem(
                    ipAddress: ipAddress,
                    timestamp: timestamp,
                    httpMethod: httpMethod,
                    route: route,
                    httpProtocol: httpProtocol,
                    httpResponseStatusCode: httpResponseStatusCode,
                    port: port,
                    userAgent: userAgent,
                    rawStringLog: rawStringLog);
            }
            catch(Exception ex)
            {
                throw new LogParserException("Exception during parsing.", ex);
            }
        }
    }
}
