import { Filter } from '../type';
const red: Filter = function(pixels) {
  const { data } = pixels;
  for (let i = 0; i < data.length; i += 4) {
    data[i + 1] = 0;
    data[i + 2] = 0;
  }
  return pixels;
};
export default red;
