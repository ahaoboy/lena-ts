import pipe from '../src/utils/pipe';
import red from '../src/filters/red';
import invert from '../src/filters/invert';
import brightness from '../src/filters/brightness';
pipe(document.createElement('canvas'), [red, invert, [brightness, 10]]);
