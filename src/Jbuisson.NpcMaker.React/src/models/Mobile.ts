import Attribute from './Attribute';
import Entity from './Entity';
import ICharacter from './ICharacter';

export const ProficiendyTable = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 6, 6];

export abstract class Mobile extends Entity {

  private m_turnEnded: boolean = false;
  private m_actionUsed: boolean = false;
  private m_bonusActionUsed: boolean = false;
  private m_reactionUsed: boolean = false;

  public get TurnEnded(): boolean {
    return this.m_turnEnded;
  }

  public get ActionUsed(): boolean {
    return this.m_actionUsed;
  };
  public get ReactionUsed(): boolean {
    return this.m_reactionUsed;
  };
  public get BonusActionUsed(): boolean {
    return this.m_bonusActionUsed;
  };

  public get ActionLeft(): boolean {
    return !this.ActionUsed || !this.BonusActionUsed;
  }

  public Name: string;

  public Experience: number;
  public abstract get Level(): number;

  public MaxHitPoints: number;
  public CurrentHitPoints: number;

  public WalkingSpeed: number;
  public SwimingSpeed: number;
  public FlyingSpeed: number;

  public get Initiative(): number {
    return this.Dexterity.Modifier;
  }

  public get Proficiency(): number {
    return 1 + Math.ceil(this.Level / 4);
  }

  public get ArmorClass(): number {
    return 10 + this.Dexterity.Modifier;
  }

  public Strength: Attribute;
  public Dexterity: Attribute;
  public Constitution: Attribute;
  public Intelligence: Attribute;
  public Wisdom: Attribute;
  public Charisma: Attribute;

  constructor(character: ICharacter) {
    super();
    this.Name = character.Name;

    this.Strength = new Attribute(character.Strength);
    this.Dexterity = new Attribute(character.Dexterity);
    this.Constitution = new Attribute(character.Constitution);
    this.Intelligence = new Attribute(character.Intelligence);
    this.Wisdom = new Attribute(character.Wisdom);
    this.Charisma = new Attribute(character.Charisma);

    this.WalkingSpeed = character.WalkingSpeed;
    this.SwimingSpeed = character.SwimingSpeed;
    this.FlyingSpeed = character.FlyingSpeed;

    this.Experience = character.Experience;
    this.MaxHitPoints = character.HitPoints;
    this.CurrentHitPoints = character.HitPoints;
  }

  public EndTurn() {
    if (this.m_turnEnded) return;

    this.m_turnEnded = true;
    this.m_actionUsed = true;
    this.m_bonusActionUsed = true;
  }

  public UseAction() {
    if (this.m_actionUsed) return;

    this.m_actionUsed = true;
  }

  public UseBonusAction() {
    if (this.m_bonusActionUsed) return;

    this.m_bonusActionUsed = true;
  }

  public UseReaction() {
    if (this.m_reactionUsed) return;

    this.m_reactionUsed = true;
  }

  public OnNewRound(round: number) {
    this.m_turnEnded = false;
    this.m_actionUsed = false;
    this.m_reactionUsed = false;
    this.m_bonusActionUsed = false;
  }
}

export default Mobile;