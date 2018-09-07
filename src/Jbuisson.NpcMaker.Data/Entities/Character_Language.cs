using System;
using System.Collections.Generic;
using System.Text;

namespace Jbuisson.NpcMaker.Data.Entities
{
    public class Character_Language
    {
        public int Id_Character { get; set; }

        public int Id_Language { get; set; }

        public Character Character { get; set; }

        public Language Language { get; set; }
    }
}
