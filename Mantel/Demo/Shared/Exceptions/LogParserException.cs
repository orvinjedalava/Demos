using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Exceptions
{
    public class LogParserException : Exception
    {
        public LogParserException() { }
        public LogParserException(string message) : base(message) { }
        public LogParserException(string message, Exception inner) : base(message, inner) { }
    }
}
