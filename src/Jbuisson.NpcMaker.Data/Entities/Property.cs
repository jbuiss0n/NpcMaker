using System;
using System.Collections.Generic;
using System.Text;

namespace Jbuisson.NpcMaker.Data.Entities
{
    public class Property
    {
        public int Id { get; set; }

        public int Id_Character { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Character Character { get; set; }
    }
}
