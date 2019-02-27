export class Mobile {
  public Name: string;

  public ActionUsed: boolean;
  public ReactionUsed: boolean;
  public BonusActionUsed: boolean;

  constructor(name: string) {
    this.Name = name;
    this.ActionUsed = false;
    this.ReactionUsed = false;
    this.BonusActionUsed = false;
  }
}

export default Mobile;