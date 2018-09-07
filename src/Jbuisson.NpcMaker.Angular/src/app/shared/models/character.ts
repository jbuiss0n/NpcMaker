export interface ICharacter {
  Id: number;
  Name: string;
  Race: string;
  Gender: string;
  ArmorClass: string;
  HitPoints: string;
  Speed: string;
  Strength: string;
  Dexterity: string;
  Constitution: string;
  Intelligence: string;
  Wisdom: string;
  Charisma: string;
  CreatedAt: Date;

  Language: string[];

  Skills: ISkill[];
  Abilities: IAbility[];
  Properties: IProperty[];
  SavingThrows: ISavingThrow[];
};

interface IProperty {
  Name: string;
  Description: string;
};

interface IAbility {
  Name: string;
  Description: string;
};

interface ISkill {
  Name: string;
  Modifier: number;
};

interface ISavingThrow {
  Name: string;
  Modifier: number;
};
