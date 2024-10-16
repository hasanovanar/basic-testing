// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 52, b: 16, action: Action.Add, expected: 68 },
  { a: -52, b: -16, action: Action.Add, expected: -68 },
  { a: 34, b: 18, action: Action.Subtract, expected: 16 },
  { a: -34, b: 18, action: Action.Subtract, expected: -52 },
  { a: 9, b: -8, action: Action.Multiply, expected: -72 },
  { a: -10, b: -5, action: Action.Multiply, expected: 50 },
  { a: -28, b: 4, action: Action.Divide, expected: -7 },
  { a: -32, b: -8, action: Action.Divide, expected: 4 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: -5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 11, b: 7, action: 'not valid', expected: null },
  { a: '5', b: 7, action: Action.Add, expected: null },
  { a: 5, b: '7', action: Action.Subtract, expected: null },
  { a: '5', b: '7', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `should perform action operation on a and b and result in expected`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
