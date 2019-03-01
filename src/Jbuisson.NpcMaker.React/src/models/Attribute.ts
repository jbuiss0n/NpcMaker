export class Attribute {
  public Name: string;
  public Value: number;

  public get Modifier(): number {
    return Math.floor(this.Value / 2 - 5);
  }

  constructor(name: string, value: number = 10) {
    this.Name = name;
    this.Value = value;
  }
}

export default Attribute;
