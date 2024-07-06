using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Entities
{
    /// <summary>
    /// Base class for all Log item classes.
    /// </summary>
    public abstract class LogItem
    {
        public LogItem(string rawStringLog)
        {
            RawStringLog = rawStringLog;
        }

        public string RawStringLog { get; private set; }
    }
}
