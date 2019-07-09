import { DtUnit } from '../unit';
import { DtKilobytes } from './kilobytes';
import { NO_DATA } from '../formatted-value';

describe('DtKilobytes', () => {
  interface TestCase {
    input: number;
    factor?: number;
    inputUnit?: DtUnit;
    output: string;
  }

  let pipe: DtKilobytes;

  beforeEach(() => {
    pipe = new DtKilobytes();
  });

  describe('Transforming input ', () => {
    [
      {
        input: 100,
        output: '0.1 kB',
      },
      {
        input: 100000,
        output: '100 kB',
      },
      {
        input: 100000000,
        output: '100,000 kB',
      },
    ].forEach((testCase: TestCase) => {
      it(`should display result converted to KB (${testCase.output})`, () => {
        expect(pipe.transform(testCase.input).toString()).toEqual(
          testCase.output
        );
      });
    });
  });
  describe('Empty values / Invalid values', () => {
    it(`should return '${NO_DATA}' for empty values`, () => {
      expect(pipe.transform('')).toEqual(NO_DATA);
      expect(pipe.transform(null)).toEqual(NO_DATA);
      expect(pipe.transform(undefined)).toEqual(NO_DATA);
    });

    it(`should return '${NO_DATA}' for values that cannot be converted to numbers`, () => {
      class A {}
      expect(pipe.transform({})).toEqual(NO_DATA);
      expect(pipe.transform([])).toEqual(NO_DATA);
      expect(pipe.transform(() => {})).toEqual(NO_DATA);
      expect(pipe.transform(A)).toEqual(NO_DATA);
      expect(pipe.transform(new A())).toEqual(NO_DATA);
    });

    it(`should return '${NO_DATA}' for combined strings`, () => {
      expect(pipe.transform('123test').toString()).toEqual(NO_DATA);
    });
  });

  describe('Valid input types', () => {
    it('should handle numbers as strings', () => {
      expect(pipe.transform('123').toString()).toEqual('0.123 kB');
      expect(pipe.transform('1234').toString()).toEqual('1.23 kB');
    });

    it('should handle 0', () => {
      expect(pipe.transform('0').toString()).toEqual('0 kB');
      expect(pipe.transform(0).toString()).toEqual('0 kB');
    });
  });
});
