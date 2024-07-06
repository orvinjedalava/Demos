using Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Parsers.Interfaces
{
    /// <summary>
    /// Contract for all Log Parser classes.
    /// </summary>
    public interface ILogParser
    {
        LogItem Parse(string rawStringLog);
    }
}
