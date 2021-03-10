import { sum } from '../src';

describe('blah', () => {
  it('works', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
import pipe from '../src/utils/pipe';
import red from '../src/filters/red';
pipe(document.createElement('canvas'), [[red, 0], red]);
