import { Filter } from '../type';
import convolution from '../operations/convolution';

const lowpass3: Filter = pixels => {
  const size = 9;
  const operator = Array(size).fill(1 / size);
  return convolution(pixels, operator);
};

export default lowpass3;
