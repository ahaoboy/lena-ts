import { filters as Filters } from './filters';
import type { FilterName } from './filters';
import { FilterList } from '../type';
import getImageData from './getImageData';
const pipe = (
  input: HTMLCanvasElement | HTMLImageElement | ImageData,
  filters: FilterList
) => {
  let imageData = input instanceof ImageData ? input : getImageData(input);
  for (let item of filters) {
    if (!Array.isArray(item)) {
      item = [item];
    }
    let [f, arg] = item;
    if (typeof f === 'string') f = Filters[f as FilterName];
    imageData = f(imageData, arg);
  }
  return imageData;
};

export default pipe;
