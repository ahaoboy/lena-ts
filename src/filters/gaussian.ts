import { Filter } from './../type';
import convolution from '../operations/convolution';

const gaussian: Filter = pixels => {
  const divider = 16;
  const operator = [1, 2, 1, 2, 4, 2, 1, 2, 1].map(i => i / divider);
  return convolution(pixels, operator);
};

export default gaussian;
