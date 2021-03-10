import { Filter } from '../type';
const grayscale: Filter = pixels => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const r = pixels.data[i];
    const g = pixels.data[i + 1];
    const b = pixels.data[i + 2];

    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] =
      0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  return pixels;
};

export default grayscale;
