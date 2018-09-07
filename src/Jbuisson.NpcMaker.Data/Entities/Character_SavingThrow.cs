using System;
using System.Collections.Generic;
using System.Text;

namespace Jbuisson.NpcMaker.Data.Entities
{
    public class Character_SavingThrow
    {
        public int Id_Character { get; set; }

        public int Id_SavingThrow { get; set; }

        public int Modifier { get; set; }

        public Character Character { get; set; }

        public SavingThrow SavingThrow { get; set; }
    }
}
