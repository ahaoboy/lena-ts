import { FilterList } from '../type';
import getImageData from './getImageData';
const pipe = (
  input: HTMLCanvasElement | HTMLImageElement,
  filters: FilterList
) => {
  let imageData = getImageData(input);
  for (let item of filters) {
    if (!Array.isArray(item)) {
      item = [item];
    }
    const [f, arg] = item;
    return f(imageData, arg);
  }
  return imageData;
};

export default pipe;
