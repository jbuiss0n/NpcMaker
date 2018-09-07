using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jbuisson.NpcMaker.Api.Models.Characters
{
    public class CharacterModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Race { get; set; }

        public string Gender { get; set; }

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

        public ICollection<string> Languages { get; set; }

        public ICollection<SkillModel> Skills { get; set; }

        public ICollection<AbilityModel> Abilities { get; set; }

        public ICollection<SavingThrowModel> SavingThrows { get; set; }

        public ICollection<PropertyModel> Properties { get; set; }
    }
}
