using FluentAssertions;
using FluentAssertions.Execution;
using LogsAPI.Tests.TestData;
using Microsoft.AspNetCore.Components;
using Shared.Entities;
using Shared.Enums;
using Shared.Parsers;
using Shared.Parsers.Interfaces;
using Shared.ReportGenerators;
using Shared.ReportGenerators.Interfaces;
using Shared.Services;
using Shared.Services.Interfaces;
using System.Net;

namespace LogsAPI.Tests
{
    public class LogServiceTests
    {
        private readonly ILogService _service;

        public LogServiceTests()
        {
            _service = new LogService();
        }

        [Theory, ClassData(typeof(CreateLogItemTestData))]
        public void GenerateLogItem_Test(
            string rawStringLog,
            LogType logType,
            IPAddress expectedIPAddress,
            DateTime expectedTimestamp,
            HttpMethod expectedHttpMethod,
            string expectedUrl,
            string expectedHttpProtocol,
            int expectedHttpResponseStatusCode,
            int expectedPort,
            string expectedUserAgent
            )
        {
            if (logType == LogType.None)
            {
                Assert.Throws<NotImplementedException>(() => _service.CreateLogItem(rawStringLog, LogType.None));
                return;
            }

            LogItem logItem = _service.CreateLogItem(rawStringLog, logType);

            
            switch(logType)
            {
                case LogType.HttpRequest:
                    HttpRequestLogItem? result = logItem as HttpRequestLogItem;

                    if (result == null)
                    {
                        Assert.Fail($"LogItem is not of type {typeof(HttpRequestLogItem)}");
                    }

                    using (new AssertionScope())
                    {
                        result.IPAddress.Should().Be(expectedIPAddress);
                        result.Timestamp.Should().Be(expectedTimestamp);
                        result.HttpMethod.Should().Be(expectedHttpMethod);
                        result.Url.Should().Be(expectedUrl);
                        result.HttpProtocol.Should().Be(expectedHttpProtocol);
                        result.HttpResponseStatusCode.Should().Be(expectedHttpResponseStatusCode);
                        result.Port.Should().Be(expectedPort);
                        result.UserAgent.Should().Be(expectedUserAgent);
                        result.RawStringLog.Should().Be(rawStringLog);
                    }

                    break;
                default:
                    throw new NotImplementedException();
            };
        }

        [Theory, ClassData(typeof(CreateLogItemsTestData))]
        public void CreateLogItems_Test(string rawStringLogs, LogType logType, List<LogItem> expectedResult)
        {
            if (logType == LogType.None)
            {
                Assert.Throws<NotImplementedException>(() => _service.CreateLogItems(rawStringLogs, logType));
                return;
            }

            IEnumerable<LogItem> logItems = _service.CreateLogItems(rawStringLogs, logType);

            switch(logType)
            {
                case LogType.HttpRequest:
                    int index = 0;

                    foreach(LogItem item in logItems)
                    {
                        HttpRequestLogItem? result = item as HttpRequestLogItem;

                        if (result == null)
                        {
                            Assert.Fail($"LogItem is not of type {typeof(HttpRequestLogItem)}");
                            return;
                        }

                        Assert.True(expectedResult[index].Equals(result));

                        index++;
                    }

                    break;
                default:
                    throw new NotImplementedException();
            }
        }

        [Theory]
        [InlineData(LogType.HttpRequest, typeof(HttpRequestLogParser))]
        [InlineData(LogType.None, null)]
        public void GetLogParser_Test(LogType input, Type expectedResult)
        {
            if (input == LogType.None)
            {
                Assert.Throws<NotImplementedException>(() => _service.GetLogParser(LogType.None));
                return;
            }
            
            ILogParser result = _service.GetLogParser(input);
            result.GetType().Should().Be(expectedResult);
        }

        [Theory]
        [InlineData(LogType.HttpRequest, typeof(HttpRequestsLogReportGenerator))]
        [InlineData(LogType.None, null)]
        public void GetReportGenerator_Test(LogType input, Type expectedResult)
        {
            if (input == LogType.None)
            {
                Assert.Throws<NotImplementedException>(() => _service.GetReportGenerator(input));
                return;
            }

            IReportGenerator result = _service.GetReportGenerator(input);
            result.GetType().Should().Be(expectedResult);
        }

        [Theory, ClassData(typeof(GenerateLogReportTestData))]
        public void GenerateLogReport_Test(
            string rawStringLogs,
            LogType logType,
            int expectedUniqueIPAddressCount,
            List<RankedItem> expectedMostVisitedURLs,
            List<RankedItem> expectedMostActiveIPAddresses)
        {

            if (logType == LogType.None)
            {
                Assert.Throws<NotImplementedException>(() => _service.GenerateLogReport(rawStringLogs, logType));
                return;
            }

            LogReport logSummary = _service.GenerateLogReport(rawStringLogs, logType);

            switch(logType)
            {
                case LogType.HttpRequest:
                    HttpRequestsLogReport? result = logSummary as HttpRequestsLogReport;
                    if (result == null)
                    {
                        Assert.Fail($"Result is not the expected type of {typeof(HttpRequestsLogReport)}");
                        return;
                    }
                    result.UniqueIPAddressCount.Should().Be(expectedUniqueIPAddressCount);

                    result.MostVisitedURLs.Count().Should().Be(expectedMostVisitedURLs.Count);
                    Assert.True(result.MostVisitedURLs.ToList()[0].Equals(expectedMostVisitedURLs[0]));
                    Assert.True(result.MostVisitedURLs.ToList()[1].Equals(expectedMostVisitedURLs[1]));
                    Assert.True(result.MostVisitedURLs.ToList()[2].Equals(expectedMostVisitedURLs[2]));

                    result.MostActiveIPAddresses.Count().Should().Be(expectedMostActiveIPAddresses.Count);
                    Assert.True(result.MostActiveIPAddresses.ToList()[0].Equals(expectedMostActiveIPAddresses[0]));
                    Assert.True(result.MostActiveIPAddresses.ToList()[1].Equals(expectedMostActiveIPAddresses[1]));
                    Assert.True(result.MostActiveIPAddresses.ToList()[2].Equals(expectedMostActiveIPAddresses[2]));

                    break;
                default:
                    Assert.Fail($"LogType : {logType} not implemented.");
                    break;
            }
        }
    }
}