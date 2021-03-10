import pipe from '../src/utils/pipe';
import red from '../src/filters/red';
pipe(document.createElement('canvas'), [[red, 0], red]);
