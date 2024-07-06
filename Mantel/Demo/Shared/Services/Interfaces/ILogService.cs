using Shared.Entities;
using Shared.Enums;
using Shared.Parsers.Interfaces;
using Shared.ReportGenerators.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Services.Interfaces
{
    /// <summary>
    /// Contract for Log Service class.
    /// </summary>
    public interface ILogService
    {
        LogItem CreateLogItem(string rawStringLog, LogType logType);
        LogReport GenerateLogReport(string rawStringLogs, LogType logType);
        ILogParser GetLogParser(LogType logType);
        IReportGenerator GetReportGenerator(LogType logType);
        IEnumerable<LogItem> CreateLogItems(string rawStringLogs, LogType logType);
    }
}
