using Shared.Entities;
using Shared.Enums;
using Shared.Parsers;
using Shared.Parsers.Interfaces;
using Shared.ReportGenerators;
using Shared.ReportGenerators.Interfaces;
using Shared.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Services
{
    public class LogService : ILogService
    {
        /// <summary>
        /// Get the appropriate ILogParser implementation for the given Enum.LogType
        /// </summary>
        /// <param name="logType"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public ILogParser GetLogParser(LogType logType)
        {
            switch (logType)
            {
                case LogType.HttpRequest:
                    return new HttpRequestLogParser();
                default:
                    throw new NotImplementedException($"No parser implemented for {logType}");
            }
        }

        /// <summary>
        /// Get the appropriate IReportGenerator implementation for the given Enum.LogType
        /// </summary>
        /// <param name="logType"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public IReportGenerator GetReportGenerator(LogType logType)
        {
            switch (logType)
            {
                case LogType.HttpRequest:
                    return new HttpRequestsLogReportGenerator();
                default:
                    throw new NotImplementedException($"No report generator implemented for {logType}");
            }
        }

        /// <summary>
        /// Create a LogItem from a string log entry 
        /// </summary>
        /// <param name="rawStringLog"></param>
        /// <param name="logType"></param>
        /// <returns></returns>
        public LogItem CreateLogItem(string rawStringLog, LogType logType)
        {
            ILogParser parser = GetLogParser(logType);

            return parser.Parse(rawStringLog);

        }

        /// <summary>
        /// Create a List of LogItem objects from a string of log entries
        /// </summary>
        /// <param name="rawStringLogs"></param>
        /// <param name="logType"></param>
        /// <returns></returns>
        public IEnumerable<LogItem> CreateLogItems(string rawStringLogs, LogType logType)
        {
            List<string> rawStringLogList = rawStringLogs.Split(new string[] { Environment.NewLine, "\r\n", "\r", "\n" }, StringSplitOptions.RemoveEmptyEntries).ToList();

            return rawStringLogList.Select(log => CreateLogItem(log, logType));
        }

        /// <summary>
        /// Generate a LogReport from a string of log entries
        /// </summary>
        /// <param name="rawStringLogs"></param>
        /// <param name="logType"></param>
        /// <returns></returns>
        public LogReport GenerateLogReport(string rawStringLogs, LogType logType)
        {
            IEnumerable<LogItem> logItems = CreateLogItems(rawStringLogs, logType);

            IReportGenerator reportGenerator = GetReportGenerator(logType);

            return reportGenerator.GenerateReport(logItems, rawStringLogs);

        }
    }
}
