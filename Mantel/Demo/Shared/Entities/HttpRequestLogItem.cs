using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Entities
{
    /// <summary>
    /// Container of detailed information from an HttpRequest log entry.
    /// </summary>
    public class HttpRequestLogItem : LogItem
    {
        public HttpRequestLogItem(
           IPAddress ipAddress,
           DateTime timestamp,
           HttpMethod httpMethod,
           string url,
           string httpProtocol,
           int httpResponseStatusCode,
           int port,
           string userAgent,
           string rawStringLog)
            : base(rawStringLog)
        {
            IPAddress = ipAddress;
            Timestamp = timestamp;
            HttpMethod = httpMethod;
            Url = url;
            HttpProtocol = httpProtocol;
            HttpResponseStatusCode = httpResponseStatusCode;
            Port = port;
            UserAgent = userAgent;
        }

        public IPAddress IPAddress { get; private set; }
        public DateTime Timestamp { get; private set; }
        public HttpMethod HttpMethod { get; private set; }
        public string Url { get; private set; }
        public string HttpProtocol { get; private set; }
        public int HttpResponseStatusCode { get; private set; }
        public int Port { get; private set; }
        public string UserAgent { get; private set; }

        /// <summary>
        /// NOTE: This method is overriden for the purpose of unit testing.
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public override bool Equals(object? obj)
        {
            if (obj == null) return false;

            HttpRequestLogItem? item = obj as HttpRequestLogItem;

            return IPAddress.ToString() == item?.IPAddress.ToString()
                && Timestamp == item?.Timestamp
                && HttpMethod == item?.HttpMethod
                && Url == item?.Url
                && HttpProtocol == item?.HttpProtocol
                && HttpResponseStatusCode == item?.HttpResponseStatusCode
                && Port == item?.Port
                && UserAgent == item?.UserAgent;
        }

        /// <summary>
        /// NOTE: This method is overriden to remove compile warning message.
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
