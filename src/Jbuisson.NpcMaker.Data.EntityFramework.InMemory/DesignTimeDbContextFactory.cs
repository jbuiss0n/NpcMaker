using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;

namespace Jbuisson.NpcMaker.Data.EntityFramework.InMemory
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<EntityContext>
    {
        private static readonly object s_lock = new object();
        private static bool s_init = false;

        public DesignTimeDbContextFactory()
        {
        }

        public EntityContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<EntityContext>()
                .UseInMemoryDatabase(databaseName: "NpcMaker");

            var repository = new EntityContext(builder.Options);

            lock (s_lock)
            {
                if (!s_init)
                {
                    Seed(repository);
                    s_init = true;
                }
            }

            return repository;
        }

        private void Seed(EntityContext repository)
        {
            repository.Add(new Entities.Language { Id = 1, Name = "Common" });
            repository.Add(new Entities.Language { Id = 2, Name = "Chultan" });

            repository.Add(new Entities.Skill { Id = 1, Name = "Perception", });
            repository.Add(new Entities.Skill { Id = 2, Name = "Stealth", });

            repository.Add(new Entities.SavingThrow { Id = 1, Name = "Constitution", });
            repository.Add(new Entities.SavingThrow { Id = 2, Name = "Wisdom", });

            repository.Add(new Entities.Ability { Id = 1, Name = "Shapechanger", Description = "%t can use %f[her]%m[his]%n[its] action to polymorph into a tiger-humanoid hybrid or into a tiger, or back into %f[her]%m[his]%n[it] true form, which is humanoid. %f[Her]%m[His]%n[Its] statistics, other than its size, are the same in each form. Any equipment %f[she]%m[he]%n[it] is wearing or carrying isn't transformed. %f[She]%m[He]%n[It] reverts to %f[her]%m[his]%n[it] true form if %f[she]%m[he]%n[it] dies." });
            repository.Add(new Entities.Ability { Id = 2, Name = "Keen Hearing and Smell", Description = "%t has advantage on Wisdom (Perception) checks that rely on hearing or smell." });
            repository.Add(new Entities.Ability { Id = 3, Name = "Claw (Tiger or Hybrid Form Only)", Description = "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1d8 + 3 slashing damage." });
            repository.Add(new Entities.Ability { Id = 4, Name = "Longbow (Humanoid or Hybrid Form Only)", Description = "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 1d8 + 2 piercing damage." });

            repository.Add(new Entities.Character
            {
                Id = 1,
                Name = "Azaka Stormfang",
                FriendlyName = "Azaka",
                Race = "Chultan weretiger",
                Gender = true,
                ArmorClass = 12,
                HitPoints = 120,
                Speed = "30ft. (40ft. in tiger)",
                Strength = 17,
                Dexterity = 15,
                Constitution = 16,
                Intelligence = 10,
                Wisdom = 13,
                Charisma = 11,
                CreatedAt = DateTime.Now,
            });

            repository.Add(new Entities.Character_Ability { Id_Character = 1, Id_Ability = 1, });
            repository.Add(new Entities.Character_Ability { Id_Character = 1, Id_Ability = 2, });
            repository.Add(new Entities.Character_Ability { Id_Character = 1, Id_Ability = 3, });
            repository.Add(new Entities.Character_Ability { Id_Character = 1, Id_Ability = 4, });

            repository.Add(new Entities.Character_Language { Id_Character = 1, Id_Language = 1, });
            repository.Add(new Entities.Character_Language { Id_Character = 1, Id_Language = 2, });

            repository.Add(new Entities.Character_Skill { Id_Character = 1, Id_Skill = 1, Modifier = -1 });
            repository.Add(new Entities.Character_Skill { Id_Character = 1, Id_Skill = 2, Modifier = 5 });

            repository.Add(new Entities.Character_SavingThrow { Id_Character = 1, Id_SavingThrow = 1, Modifier = -1 });
            repository.Add(new Entities.Character_SavingThrow { Id_Character = 1, Id_SavingThrow = 2, Modifier = 5 });

            repository.Add(new Entities.Property { Id = 1, Id_Character = 1, Name = "Senses", Description = "darkvision 60ft., passive Perception 15" });
            repository.Add(new Entities.Property { Id = 2, Id_Character = 1, Name = "Damage Immunities", Description = "bludgeoning, piercing, and slashing damage from nonmagical weapons that aren't silvered" });

            repository.SaveChanges();
        }
    }
}
