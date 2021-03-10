import { Filter } from '../type';
import convolution from '../operations/convolution';

const sobelHorizontal: Filter = pixels => {
  const divider = 4;
  const operator = [1, 2, 1, 0, 0, 0, -1, -2, -1].map(i => i / divider);
  return convolution(pixels, operator);
};

export default sobelHorizontal;
