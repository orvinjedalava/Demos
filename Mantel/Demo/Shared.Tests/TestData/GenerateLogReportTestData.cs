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
    internal class GenerateLogReportTestData : IEnumerable<object[]>
    {

        private IEnumerable<object[]> _data = new List<object[]>()
        {
            new object[]
            {
                new StringBuilder()
                    .AppendLine("177.71.128.21 - - [10/Jul/2018:00:01:00 +1000] \"GET /intranet-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .AppendLine("50.112.00.11 - admin [10/Jul/2018:00:02:00 +1000] \"PUT /asset.css HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6\"")
                    .AppendLine("72.44.32.10 - - [10/Jul/2018:00:03:00 +1000] \"GET /translations/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5\"")
                    .AppendLine("177.71.128.21 - - [10/Jul/2018:00:04:00 +1000] \"POST /intranet-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .AppendLine("50.112.00.11 - admin [10/Jul/2018:00:05:00 +1000] \"PUT /asset.css HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6\"")
                    .AppendLine("177.71.128.21 - - [10/Jul/2018:00:06:00 +1000] \"DELETE /intranet-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .AppendLine("177.71.128.21 - - [10/Jul/2018:00:07:00 +1000] \"GET /external-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .AppendLine("177.71.128.21 - - [10/Jul/2018:00:08:00 +1000] \"GET /external-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .AppendLine("177.71.128.21 - - [10/Jul/2018:00:09:00 +1000] \"GET /external-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .AppendLine("177.71.128.21 - admin [10/Jul/2018:00:10:00 +1000] \"GET /intranet-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .AppendLine("50.112.00.11 - admin [10/Jul/2018:00:11:00 +1000] \"PUT /asset.css HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6\"")
                    .AppendLine("177.71.128.21 - - [10/Jul/2018:00:12:00 +1000] \"GET /external-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .AppendLine("177.71.128.21 - admin [10/Jul/2018:00:13:00 +1000] \"GET /intranet-analytics/ HTTP/1.1\" 200 3574 \"-\" \"Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7\"")
                    .ToString(),
                LogType.HttpRequest,
                3,
                new List<RankedItem>() 
                { 
                    new RankedItem(rank: 1, value: "177.71.128.21/intranet-analytics/", 5),
                    new RankedItem(rank: 2, value: "177.71.128.21/external-analytics/", 4),
                    new RankedItem(rank: 3, value: "50.112.0.11/asset.css", 3)
                },
                new List<RankedItem>()
                {
                    new RankedItem(rank: 1, value: "177.71.128.21", 9),
                    new RankedItem(rank: 2, value: "50.112.0.11", 3),
                    new RankedItem(rank: 3, value: "72.44.32.10", 1)
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
