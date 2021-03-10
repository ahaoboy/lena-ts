import { Filter } from '../type';
import convolution from '../operations/convolution';

const roberts: Filter = pixels => {
  const operator = [0, 0, 0, 1, -1, 0, 0, 0, 0];
  return convolution(pixels, operator);
};

export default roberts;
