using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Entities
{
    /// <summary>
    /// Base class for all Log Report classes.
    /// </summary>
    public abstract class LogReport
    {
        public LogReport(string rawStringLogs)
        {
            RawStringLogs = rawStringLogs;
        }
        public string? RawStringLogs { get; private set; }
    }
}
