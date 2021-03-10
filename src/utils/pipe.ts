import { Filter } from '../type';
import getImageData from './getImageData';
const pipe = (
  input: HTMLCanvasElement | HTMLImageElement,
  filters: [Filter, number | undefined][]
) => {
  let imageData = getImageData(input);
  for (const [f, amount] of filters) {
    imageData = f(imageData, amount);
  }
  return imageData;
};

export default pipe;
