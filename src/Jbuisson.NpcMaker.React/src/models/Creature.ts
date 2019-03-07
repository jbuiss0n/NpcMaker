import Mobile from './Mobile';
import ICharacter from './ICharacter';

export class Creature extends Mobile {

  public MaxHitPoints: number = 4;
  public CurrentHitPoints: number = 4;

  public WalkingSpeed: number = 30;
  public SwimingSpeed: number = 30;
  public FlyingSpeed: number = 30;

  public ChallengeRating: number = 0;

  public get Level(): number {
    return Math.min(1, this.ChallengeRating);
  }

  constructor(character: ICharacter) {
    super(character)
  }
}

export default Creature;
