import Mobile from './Mobile';
import Entity from './Entity';

export enum Layer {
  Invalid = 0x0,
  OneHanded = 0x1,
  TwoHanded = 0x2,
  Head = 0x3,
  Hands = 0x4,
  Chest = 0x5,
  Pants = 0x6,
  Belt = 0x7,
  Shoes = 0x8,
  Cloak = 0x9,
}

export abstract class Item extends Entity {
  public Name: string;

  public Owern?: Mobile;

  public Weight: number = 0;
  public Layer: Layer = Layer.Invalid;

  constructor(name: string) {
    super();
    this.Name = name;
  }
}

export default Item;
