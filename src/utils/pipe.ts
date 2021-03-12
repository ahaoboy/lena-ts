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
    const [f, arg] = item;
    imageData = f(imageData, arg);
  }
  return imageData;
};

export default pipe;
