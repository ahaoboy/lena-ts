import { Filter } from '../type';
const blue: Filter = pixels => {
  const { data } = pixels;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0;
    data[i + 1] = 0;
  }
  return pixels;
};

export default blue;
