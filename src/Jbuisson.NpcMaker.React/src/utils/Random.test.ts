import Random from './Random';

describe('Random', () => {
  describe('parse', () => {
    beforeEach(() => {
      Random.sequence = [4];
    })

    it('rand the indicated dice', () => {

      [['D6', 4]].forEach(roll => {
        const [input, expected] = roll;
        const actual = Random.parse(input as string);

        expect(actual).toEqual(expected);
      })
    })
  })
})