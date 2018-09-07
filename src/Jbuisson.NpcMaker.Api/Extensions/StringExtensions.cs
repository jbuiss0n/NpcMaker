using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Jbuisson.NpcMaker.Api.Extensions
{
    public static class StringExtensions
    {
        public static string RegexReplace(this string @this, string pattern, string replacement)
        {
            return Regex.Replace(@this, pattern, replacement);
        }
    }
}
