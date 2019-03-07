export class Attribute {
  public Value: number;

  public get Modifier(): number {
    return Math.floor(this.Value / 2 - 5);
  }

  constructor(value: number = 10) {
    this.Value = value;
  }
}

export default Attribute;
