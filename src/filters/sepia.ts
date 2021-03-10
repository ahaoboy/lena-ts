import { Filter } from './../type';
const sepia: Filter = pixels => {
  const { data } = pixels;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = data[i + 1] = data[i + 2] = 0.3 * r + 0.59 * g + 0.11 * b;

    data[i] += 40;
    data[i + 1] += 20;
    data[i + 2] -= 20;
  }

  return pixels;
};

export default sepia;
