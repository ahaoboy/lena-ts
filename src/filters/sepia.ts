import { Filter } from "../type";
const sepia: Filter = (pixels) => {
  const { data } = pixels;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const v = 0.3 * r + 0.59 * g + 0.11 * b;
    data[i] = v + 40;
    data[i + 1] = v + 20;
    data[i + 2] = v - 20;
  }

  return pixels;
};

export default sepia;
