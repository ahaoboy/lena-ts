import { Filter } from '../type';
import convolution from '../operations/convolution';

const sobelVertical: Filter = pixels => {
  const divider = 4;
  const operator = [1, 0, -1, 2, 0, -2, 1, 0, -1].map(i => i / divider);
  return convolution(pixels, operator);
};

export default sobelVertical;
