// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result1 = simpleCalculator({ a: 52, b: 16, action: Action.Add });
    const result2 = simpleCalculator({ a: -52, b: -16, action: Action.Add });

    expect(result1).toBe(68);
    expect(result2).toBe(-68);
  });

  test('should subtract two numbers', () => {
    const result1 = simpleCalculator({ a: 34, b: 18, action: Action.Subtract });
    const result2 = simpleCalculator({
      a: -34,
      b: 18,
      action: Action.Subtract,
    });

    expect(result1).toBe(16);
    expect(result2).toBe(-52);
  });

  test('should multiply two numbers', () => {
    const result1 = simpleCalculator({ a: 9, b: -8, action: Action.Multiply });
    const result2 = simpleCalculator({
      a: -10,
      b: -5,
      action: Action.Multiply,
    });

    expect(result1).toBe(-72);
    expect(result2).toBe(50);
  });

  test('should divide two numbers', () => {
    const result1 = simpleCalculator({ a: -28, b: 4, action: Action.Divide });
    const result2 = simpleCalculator({ a: -32, b: -8, action: Action.Divide });

    expect(result1).toBe(-7);
    expect(result2).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const result1 = simpleCalculator({
      a: 3,
      b: 4,
      action: Action.Exponentiate,
    });
    const result2 = simpleCalculator({
      a: -5,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result1).toBe(81);
    expect(result2).toBe(25);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 11,
      b: 7,
      action: 'not valid',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({
      a: '5',
      b: 7,
      action: Action.Add,
    });
    const result2 = simpleCalculator({
      a: 5,
      b: '7',
      action: Action.Subtract,
    });
    const result3 = simpleCalculator({
      a: '5',
      b: '7',
      action: Action.Multiply,
    });
    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
  });
});
