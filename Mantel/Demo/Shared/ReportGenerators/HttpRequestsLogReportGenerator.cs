using Shared.Entities;
using Shared.ReportGenerators.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.ReportGenerators
{
    /// <summary>
    /// Report Generator used to generate a report from HttpRequest log files.
    /// </summary>
    public class HttpRequestsLogReportGenerator : IReportGenerator
    {
        public LogReport GenerateReport(IEnumerable<LogItem> logItems, string rawStringLogs)
        {
            IEnumerable<HttpRequestLogItem?> items = logItems.Select(item => item as HttpRequestLogItem);

            return new HttpRequestsLogReport(
                uniqueIPAddressCount: GetUniqueIPAddressCount(items),
                mostVisitedURLs: GetMostVisitedURLs(items),
                mostActiveIPAddresses: MostActiveIPAddresses(items),
                rawStringLogs: rawStringLogs
                );
        }

        private int GetUniqueIPAddressCount(IEnumerable<HttpRequestLogItem?> logItems)
        {
            return logItems.DistinctBy(item => item?.IPAddress.ToString()).Count();
        }

        /// <summary>
        /// ASUMPTION: 
        /// For the demo, we simply return the first 3 hightest Visited URL based on the LINQ result below.
        /// No special logic yet for visited urls who are tied in 1st, 2nd, or 3rd.
        /// </summary>
        /// <param name="logItems"></param>
        /// <returns></returns>
        private IEnumerable<RankedItem> GetMostVisitedURLs(IEnumerable<HttpRequestLogItem?> logItems)
        {
            List<RankedItem> result = new();
            int rank = 1;
            foreach (var item in logItems.GroupBy(x => $"{x?.IPAddress.ToString()}{x?.Url}")
                                        .Select(group => new { Url = group.Key, Count = group.Count() })
                                        .OrderByDescending(x => x.Count))
            {
                if (rank > 3)
                    break;
                result.Add(new RankedItem(rank, item.Url, item.Count));
                rank++;
            }

            return result;
        }

        /// <summary>
        /// ASSUMPTION:
        /// For the demo, we simply return the first 3 hightest Active IP addresses based on the LINQ result below.
        /// No special logic yet for visited urls who are tied in 1st, 2nd, or 3rd.
        /// </summary>
        /// <param name="logItems"></param>
        /// <returns></returns>
        private IEnumerable<RankedItem> MostActiveIPAddresses(IEnumerable<HttpRequestLogItem?> logItems)
        {
            List<RankedItem> result = new();
            int rank = 1;
            foreach (var item in logItems.GroupBy(x => x?.IPAddress.ToString())
                                        .Select(group => new { IPAddress = group.Key, Count = group.Count() })
                                        .OrderByDescending(x => x.Count))
            {
                if (rank > 3)
                    break;
                result.Add(new RankedItem(rank, item.IPAddress ?? string.Empty, item.Count));
                rank++;
            }

            return result;
        }
    }
}
