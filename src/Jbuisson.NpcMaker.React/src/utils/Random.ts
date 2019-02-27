export class Random {

  private static _sequence: number[];
  private static _sequenceIndex: number;

  public static set sequence(seq: number[]) {
    Random._sequence = seq;
    Random._sequenceIndex = 0;
  }

  public static parse(input: string = '3D6+4'): number {
    const reg = /(?<count>[0-9])*D(?<dice>[0-9]+)+?/ig;
    let roll = 0, expression;

    while (expression = reg.exec(input)) {
      const dice = Number(expression.groups!['dice']);
      const count = Number(expression.groups!['count']) || 1;
      const rand = Random.Roll(dice, count)

      // console.log(`${count}D${dice}=${rand}`);

      roll += rand;
    }

    return roll;
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
      result += Random.RollSingleDice(dice);
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