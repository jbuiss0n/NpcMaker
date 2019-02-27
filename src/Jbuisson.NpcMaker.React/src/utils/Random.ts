export class Random {

  private static _sequence: number[];
  private static _sequenceIndex: number;

  public static set sequence(seq: number[]) {
    Random._sequence = seq;
    Random._sequenceIndex = 0;
  }

  public static parse(input: string = '3D6+4'): number {
    const dices = input.match(/([0-9]*)D([0-9]+)(?:(([+-])([0-9]*)D([0-9]+))*)?/i);

    console.log(dices);

    if (dices) {
      return dices
        .map(d => Number(d.substring(1)))
        .map(Random.RollSingleDice)
        .reduce((sum, current) => (sum || 0) + current);
    }

    return 0;
  }

  public static D4(count: number = 1): number {
    return Random.Roll(4, count);
  }

  public static D6(count: number = 1): number {
    return Random.Roll(6, count);
  }

  public static D8(count: number = 1): number {
    return Random.Roll(8, count);
  }

  public static D10(count: number = 1): number {
    return Random.Roll(10, count);
  }

  public static D12(count: number = 1): number {
    return Random.Roll(12, count);
  }

  public static D20(count: number = 1): number {
    return Random.Roll(20, count);
  }

  private static Roll(dice: number, count: number) {
    let result = 0;
    for (let i = 0; i < count; i++) {
      result += this.RollSingleDice(dice);
    }
    return result;
  }

  private static RollSingleDice(dice: number) {
    if (Random._sequence) {
      Random._sequenceIndex = Random._sequenceIndex >= Random._sequence.length ? 0 : Random._sequenceIndex;
      return Math.min(Random._sequence[Random._sequenceIndex++], dice);
    }

    return Math.floor(Math.random() * dice) + 1;
  }
}

export default Random;