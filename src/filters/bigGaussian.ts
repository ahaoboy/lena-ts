import convolution from '../operations/convolution';
import { Filter } from '../type';
const bigGaussian: Filter = pixels => {
  const divider = 159;
  const operator = [
    2,
    4,
    5,
    4,
    2,
    4,
    9,
    12,
    9,
    4,
    5,
    12,
    15,
    12,
    5,
    4,
    9,
    12,
    9,
    4,
    2,
    4,
    5,
    4,
    2,
  ].map(i => i / divider);
  return convolution(pixels, operator);
};

export default bigGaussian;
