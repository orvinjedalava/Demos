using Shared.Enums;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace LogsAPI.Tests.TestData
{
    public class CreateLogItemTestData : IEnumerable<object[]>
    {
        private IEnumerable<object[]> _data => new List<object[]>
        {
            new object[] {
                "177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] \"GET /intranet-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"",
                LogType.HttpRequest,
                IPAddress.Parse("177.71.128.21"),
                new DateTime(2018, 7, 11, 6, 21, 28),
                HttpMethod.Get,
                "/intranet-analytics/",
                "HTTP/1.1",
                200,
                3574,
                "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"
            },

            new object[]
            {
                "168.41.191.40 - admin [09/Jul/2018:10:11:30 +0200] \"DELETE http://example.net/faq/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1\"",
                LogType.HttpRequest,
                IPAddress.Parse("168.41.191.40"),
                new DateTime(2018, 7, 09, 18, 11, 30),
                HttpMethod.Delete,
                "http://example.net/faq/",
                "HTTP/1.1",
                200,
                3574,
                "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
            },
            new object[]
            {
                "72.44.32.11 - - [11/Jul/2018:17:42:07 +0200] \"PUT /to-an-error HTTP/1.1\" 500 3574 \"-\" \"Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0\"",
                LogType.HttpRequest,
                IPAddress.Parse("72.44.32.11"),
                new DateTime(2018, 7, 12, 1, 42, 07),
                HttpMethod.Put,
                "/to-an-error",
                "HTTP/1.1",
                500,
                3574,
                "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"
            },
            new object[]
            {
                "72.44.32.11 - admin [11/Jul/2018:19:50:12 -0100] \"POST /myown/test HTTP/2.0\" 201 4000 \"-\" \"Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0\"",
                LogType.HttpRequest,
                IPAddress.Parse("72.44.32.11"),
                new DateTime(2018, 7, 12, 6, 50, 12),
                HttpMethod.Post,
                "/myown/test",
                "HTTP/2.0",
                201,
                4000,
                "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"
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
