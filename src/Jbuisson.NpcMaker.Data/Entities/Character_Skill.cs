using System;
using System.Collections.Generic;
using System.Text;

namespace Jbuisson.NpcMaker.Data.Entities
{
    public class Character_Skill
    {
        public int Id_Character { get; set; }

        public int Id_Skill { get; set; }

        public int Modifier { get; set; }

        public Character Character { get; set; }

        public Skill Skill { get; set; }
    }
}
