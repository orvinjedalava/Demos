using Shared.Entities;
using Shared.Enums;
using Shared.Services;
using Shared.Services.Interfaces;
using System.Text.Json.Nodes;

/// NOTE: Console app will only accept 2 valid inputs.
/// (1): STOP - stops the application
/// (2): FilePath of the log file.

Console.WriteLine("Welcome to the demo.");

while (true)
{
    Console.WriteLine("Please type in path to log file, or type in 'STOP' to end the session.");
    string? input = Console.ReadLine();

    if (string.IsNullOrWhiteSpace(input))
    {
        Console.WriteLine("Invalid input provided.");
        continue;
    }
    else
    {
        if (input.Trim().ToUpper() == "STOP")
        {
            Console.WriteLine("See you again!");
            break;
        }
        
        if (!System.IO.File.Exists(input))
        {
            Console.WriteLine("File provided does not exist.");
            continue;
        }

        try
        {
            LogType myLogType = LogType.HttpRequest;

            using StreamReader reader = new StreamReader(input);

            string text = reader.ReadToEnd();

            ILogService logService = new LogService();
            var report = logService.GenerateLogReport(text, myLogType) as HttpRequestsLogReport;

            Console.WriteLine("*** Generated Report ***");
            Console.WriteLine("");

            Console.WriteLine($"Unique IPAddress Count: {report.UniqueIPAddressCount}");
            Console.WriteLine("");

            Console.WriteLine("Most Visited URLs");
            foreach(RankedItem item in report.MostVisitedURLs)
            {
                Console.WriteLine($"Rank: {item.Rank}\n\tUrl: {item.Value}\n\tCount: {item.Count}");
            }
            Console.WriteLine("");

            Console.WriteLine("Most Active IPAddresses");
            foreach (RankedItem item in report.MostActiveIPAddresses)
            {
                Console.WriteLine($"Rank: {item.Rank}\n\tIPAddress: {item.Value}\n\tCount: {item.Count}");
            }
            Console.WriteLine("");
            Console.WriteLine("*** End report ***");
            Console.WriteLine("");

            continue;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            Console.WriteLine("");
            continue;
        }
    }
}



