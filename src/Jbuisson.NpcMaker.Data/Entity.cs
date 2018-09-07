using System;
using System.Collections.Generic;
using System.Text;

namespace Jbuisson.NpcMaker.Data
{
    public abstract class Entity
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
