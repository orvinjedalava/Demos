using Shared.Entities;
using Shared.Enums;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace LogsAPI.Tests.TestData
{
    public class CreateLogItemsTestData : IEnumerable<object[]>
    {
        private IEnumerable<object[]> _data = new List<object[]>()
        {
            new object[]
            {
                new StringBuilder()
                    .AppendLine("177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] \"GET /intranet-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .AppendLine("168.41.191.40 - admin [09/Jul/2018:10:11:30 +0200] \"DELETE http://example.net/faq/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1\"")
                    .ToString(),
                LogType.HttpRequest,
                new List<LogItem>()
                {
                    new HttpRequestLogItem(
                        IPAddress.Parse("177.71.128.21"),
                        new DateTime(2018, 7, 11, 6, 21, 28),
                        HttpMethod.Get,
                        "/intranet-analytics/",
                        "HTTP/1.1",
                        200,
                        3574,
                        "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7",
                        "177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] \"GET /intranet-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\""),
                    new HttpRequestLogItem(
                        IPAddress.Parse("168.41.191.40"),
                        new DateTime(2018, 7, 09, 18, 11, 30),
                        HttpMethod.Delete,
                        "http://example.net/faq/",
                        "HTTP/1.1",
                        200,
                        3574,
                        "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
                        "168.41.191.40 - admin [09/Jul/2018:10:11:30 +0200] \"DELETE http://example.net/faq/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1\"")
                }

            }
        };

        public IEnumerator<object[]> GetEnumerator()
        {
            return _data.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
