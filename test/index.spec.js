import { example } from '../src/main';

describe('example', () => {
  it('debería ser una función', () => {
    expect(typeof example).toBe('function');
  });
});
