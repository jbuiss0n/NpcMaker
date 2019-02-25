export class Random {
  public static D4(): number {
    return Random.Roll(4);
  }
  
  public static D6(): number {
    return Random.Roll(6);
  }
  
  public static D8(): number {
    return Random.Roll(8);
  }
  
  public static D10(): number {
    return Random.Roll(10);
  }
  
  public static D12(): number {
    return Random.Roll(12);
  }

  
  public static D20(): number {
    return Random.Roll(20);
  }

  private static Roll(dice: number) {
    return Math.floor(Math.random() * dice) + 1;
  }
}

export default Random;