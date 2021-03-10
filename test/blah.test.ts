import { FilterList, pipe, red, invert, brightness } from '../src';
const filterList: FilterList = [red, invert, [brightness, 10]];
pipe(document.createElement('canvas'), filterList);
