import Random from './Random';

describe('Random', () => {
  describe('parse', () => {
    beforeEach(() => {
      Random.sequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    });

    it('rand the indicated dice', () => {
      [['D4', 1], ['D6', 2], ['D8', 3], ['D10', 4], ['D12', 5], ['D20', 6], ['D100', 7], ['2D2,4D4', 2 + 2 + 4 + 1 + 2 + 3]].forEach(roll => {
        const [input, expected] = roll;
        const actual = Random.parse(input as string);

        expect(actual).toEqual(expected);
      })
    });


    it('rand n indicated dice', () => {
      [['D4', 1], ['1D6', 2], ['2D8', 3 + 4], ['3D10', 5 + 6 + 7]].forEach(roll => {
        const [input, expected] = roll;
        const actual = Random.parse(input as string);

        expect(actual).toEqual(expected);
      })
    });


    it('rand multiple dice sets', () => {
      [['D4+D6', 1 + 2], ['2D4+2D6', 3 + 4 + 5 + 6], ['6D20+2D8', 7 + 8 + 9 + 10 + 1 + 2 + 3 + 4]].forEach(roll => {
        const [input, expected] = roll;
        const actual = Random.parse(input as string);

        expect(actual).toEqual(expected);
      })
    })
  })
})