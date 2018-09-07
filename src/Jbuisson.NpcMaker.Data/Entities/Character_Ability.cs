using System;
using System.Collections.Generic;
using System.Text;

namespace Jbuisson.NpcMaker.Data.Entities
{
    public class Character_Ability
    {
        public int Id_Character { get; set; }

        public int Id_Ability { get; set; }

        public Character Character { get; set; }

        public Ability Ability { get; set; }
    }
}
