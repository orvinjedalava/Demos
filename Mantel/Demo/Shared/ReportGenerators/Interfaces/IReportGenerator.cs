using Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.ReportGenerators.Interfaces
{
    /// <summary>
    /// Contract for all Report Generator classes
    /// </summary>
    public interface IReportGenerator
    {
        LogReport GenerateReport(IEnumerable<LogItem> logItems, string rawStringLogs);
    }
}
