import Attribute from './Attribute';
import Entity from './Entity';
import Item from './Item';

export const ProficiendyTable = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 6, 6];

export abstract class Mobile extends Entity {
  public Name: string;

  public ActionUsed: boolean = false;
  public ReactionUsed: boolean = false;
  public BonusActionUsed: boolean = false;

  public abstract get Level(): number;

  public abstract MaxHitPoints: number;
  public abstract CurrentHitPoints: number;

  public abstract WalkingSpeed: number;
  public abstract SwimingSpeed: number;
  public abstract FlyingSpeed: number;

  public get Initiative(): number {
    return this.Dexterity.Modifier;
  }

  public get Proficiency(): number {
    return 1 + Math.ceil(this.Level / 4);
  }

  public get ArmorClass(): number {
    return 10 + this.Dexterity.Modifier;
  }

  public Strength: Attribute = new Attribute('Strength');
  public Dexterity: Attribute = new Attribute('Dexterity');
  public Constitution: Attribute = new Attribute('Constitution');
  public Intelligence: Attribute = new Attribute('Intelligence');
  public Wisdom: Attribute = new Attribute('Wisdom');
  public Charisma: Attribute = new Attribute('Charisma');

  constructor(name: string) {
    super();
    this.Name = name;
  }
}

export default Mobile;