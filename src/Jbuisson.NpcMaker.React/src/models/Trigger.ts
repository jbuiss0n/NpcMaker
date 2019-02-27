export class Trigger {
  public Name: string;

  public Round: number;

  constructor(name: string) {
    this.Name = name;
    this.Round = 0;
  }
}

export default Trigger;