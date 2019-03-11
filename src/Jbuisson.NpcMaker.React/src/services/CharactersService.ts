import ICharacter from '../models/ICharacter';

let INDEX: number = 0;

const Create = (name: string, hit: number, str: number, dex: number, con: number, int: number, wis: number, cha: number): ICharacter => {
  return {
    Id: INDEX++,
    Name: name,
    Gender: true,
    Race: 'RACE',
    Experience: 0,
    HitPoints: hit,
    WalkingSpeed: 30,
    SwimingSpeed: 0,
    FlyingSpeed: 0,
    Strength: str,
    Dexterity: dex,
    Constitution: con,
    Intelligence: int,
    Wisdom: wis,
    Charisma: cha,
  };
}

const CHARACTERS: ICharacter[] = [
  Create('Yuan-Ti Malison', 66, 16, 14, 13, 14, 12, 16),
  Create('Yuan-Ti Pureblood', 40, 11, 10, 11, 13, 12, 14),
]

export class CharactersService {
  public static Find(id: number): Promise<ICharacter> {
    return Promise.resolve(CHARACTERS.find(character => character.Id == id)!);
  }

  public static AutoComplete(term: string): Promise<ICharacter[]> {
    return Promise.resolve(CHARACTERS.filter(character => character.Name.toLowerCase().startsWith(term.toLowerCase())));
  }
}

export default CharactersService;