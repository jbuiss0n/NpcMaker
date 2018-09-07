using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jbuisson.NpcMaker.Api.Extensions
{
    public static class CollectionExtensions
    {
        public static ICollection<TResult> Convert<TSource, TResult>(this ICollection<TSource> @this, Func<TSource, TResult> convertor)
        {
            return @this.Select(convertor).ToList();
        }
    }
}
