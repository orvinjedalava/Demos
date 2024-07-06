using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Entities
{
    /// <summary>
    /// Rank item to display ranking results.
    /// </summary>
    public class RankedItem
    {
        public RankedItem(int rank, string value, int count)
        {
            Rank = rank;
            Value = value;
            Count = count;
        }

        public int Rank { get; private set; }
        public string Value { get; private set; }
        public int Count { get; private set; }

        /// <summary>
        /// NOTE: This method is overriden for the purpose of unit testing.
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public override bool Equals(object? obj)
        {
            if (obj == null)
                return false;

            RankedItem? item = obj as RankedItem;
            return Rank == item?.Rank && Value == item?.Value && Count == item?.Count;
        }

        /// <summary>
        /// NOTE: This method is overriden to remove compile warning message.
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
