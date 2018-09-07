using Jbuisson.NpcMaker.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jbuisson.NpcMaker.Data.EntityFramework
{
    public class EntityContext : DbContext
    {
        public DbSet<Character> Characters { get; set; }
        public DbSet<Ability> Abilities { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<SavingThrow> SavingThrows { get; set; }
        public DbSet<Property> Properties { get; set; }

        public EntityContext(DbContextOptions<EntityContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            CharacterSkillsModel(modelBuilder);
            CharacterLanguagesModel(modelBuilder);
            CharacterPropertiesModel(modelBuilder);
            CharacterSavingThrowsModel(modelBuilder);
            CharacterAbilitiesModel(modelBuilder);
        }

        private static void CharacterSkillsModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Character_Skill>()
             .HasKey(relation => new { relation.Id_Character, relation.Id_Skill });

            modelBuilder.Entity<Character_Skill>()
                .HasOne(relation => relation.Character)
                .WithMany(character => character.Skills)
                .HasForeignKey(relation => relation.Id_Character);

            modelBuilder.Entity<Character_Skill>()
                .HasOne(relation => relation.Skill)
                .WithMany()
                .HasForeignKey(relation => relation.Id_Skill);
        }

        private static void CharacterLanguagesModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Character_Language>()
             .HasKey(relation => new { relation.Id_Character, relation.Id_Language });

            modelBuilder.Entity<Character_Language>()
                .HasOne(relation => relation.Character)
                .WithMany(character => character.Languages)
                .HasForeignKey(relation => relation.Id_Character);

            modelBuilder.Entity<Character_Language>()
                .HasOne(relation => relation.Language)
                .WithMany()
                .HasForeignKey(relation => relation.Id_Language);
        }

        private static void CharacterAbilitiesModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Character_Ability>()
             .HasKey(relation => new { relation.Id_Character, relation.Id_Ability });

            modelBuilder.Entity<Character_Ability>()
                .HasOne(relation => relation.Character)
                .WithMany(character => character.Abilities)
                .HasForeignKey(relation => relation.Id_Character);

            modelBuilder.Entity<Character_Ability>()
                .HasOne(relation => relation.Ability)
                .WithMany()
                .HasForeignKey(relation => relation.Id_Ability);
        }

        private static void CharacterSavingThrowsModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Character_SavingThrow>()
             .HasKey(relation => new { relation.Id_Character, relation.Id_SavingThrow });

            modelBuilder.Entity<Character_SavingThrow>()
                .HasOne(relation => relation.Character)
                .WithMany(character => character.SavingThrows)
                .HasForeignKey(relation => relation.Id_Character);

            modelBuilder.Entity<Character_SavingThrow>()
                .HasOne(relation => relation.SavingThrow)
                .WithMany()
                .HasForeignKey(relation => relation.Id_SavingThrow);
        }

        private static void CharacterPropertiesModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Property>()
                .HasOne(relation => relation.Character)
                .WithMany(character => character.Properties)
                .HasForeignKey(relation => relation.Id_Character)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
