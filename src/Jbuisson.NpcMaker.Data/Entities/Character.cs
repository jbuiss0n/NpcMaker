using System;
using System.Collections.Generic;
using System.Text;

namespace Jbuisson.NpcMaker.Data.Entities
{
    public class Character : Entity
    {
        public string Name { get; set; }

        public string FriendlyName { get; set; }

        public string Race { get; set; }

        public bool? Gender { get; set; }

        public string Description { get; set; }

        public string Avatar { get; set; }

        public byte ArmorClass { get; set; }

        public byte HitPoints { get; set; }

        public string Speed { get; set; }

        public byte Strength { get; set; }

        public byte Dexterity { get; set; }

        public byte Constitution { get; set; }

        public byte Intelligence { get; set; }

        public byte Wisdom { get; set; }

        public byte Charisma { get; set; }

        public ICollection<Character_Skill> Skills { get; set; }

        public ICollection<Character_Language> Languages { get; set; }

        public ICollection<Character_Ability> Abilities { get; set; }

        public ICollection<Character_SavingThrow> SavingThrows { get; set; }

        public ICollection<Property> Properties { get; set; }
    }
}
