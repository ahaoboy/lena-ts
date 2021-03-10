import { Filter } from '../type';
import convolution from '../operations/convolution';

const sharpen: Filter = pixels => {
  const operator = [0, -0.2, 0, -0.2, 1.8, -0.2, 0, -0.2, 0];
  return convolution(pixels, operator);
};

export default sharpen;
