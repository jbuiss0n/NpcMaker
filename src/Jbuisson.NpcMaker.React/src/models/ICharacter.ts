export interface ICharacter {
  Id: number;

  Name: string;
  Gender: boolean;
  Race: string;

  Experience: number;
  HitPoints: number;

  WalkingSpeed: number;
  SwimingSpeed: number;
  FlyingSpeed: number;

  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
}

export default ICharacter;
