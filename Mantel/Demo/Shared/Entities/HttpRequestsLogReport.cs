using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Entities
{
    /// <summary>
    /// Repor generated for HttpRequest log file.
    /// </summary>
    public class HttpRequestsLogReport : LogReport
    {
        public HttpRequestsLogReport(
            int uniqueIPAddressCount,
             IEnumerable<RankedItem> mostVisitedURLs,
             IEnumerable<RankedItem> mostActiveIPAddresses,
             string rawStringLogs)
            : base(rawStringLogs)
        {
            UniqueIPAddressCount = uniqueIPAddressCount;
            MostVisitedURLs = mostVisitedURLs;
            MostActiveIPAddresses = mostActiveIPAddresses;
        }

        public int UniqueIPAddressCount { get; private set; }
        public IEnumerable<RankedItem> MostVisitedURLs { get; private set; } = new List<RankedItem>();
        public IEnumerable<RankedItem> MostActiveIPAddresses { get; private set; } = new List<RankedItem>();
    }
}
