import Mobile from '../models/Mobile';
import Creature from '../models/Creature';

export class CreatureFactory {
  private static m_mobiles: (() => Mobile)[] = [
    () => CreatureFactory.Create('Yuan-Ti Malison', 66, 16, 14, 13, 14, 12, 16),
    () => CreatureFactory.Create('Yuan-Ti Pureblood', 40, 11, 10, 11, 13, 12, 14),
  ];

  public static AutoComplete(term: string): Promise<Mobile[]> {
    const mobiles = CreatureFactory.m_mobiles
      .map(mobile => mobile())
      .filter(mobile => mobile.Name.toLowerCase().startsWith(term.toLowerCase()));

    return Promise.resolve(mobiles);
  }

  private static Create(name: string, hit: number, str: number, dex: number, con: number, int: number, wis: number, cha: number): Creature {
    const creature = new Creature(name);

    creature.Strength.Value = str;
    creature.Dexterity.Value = dex;
    creature.Constitution.Value = con;
    creature.Intelligence.Value = int;
    creature.Wisdom.Value = wis;
    creature.Charisma.Value = cha;

    return creature;
  }
}

export default CreatureFactory;
