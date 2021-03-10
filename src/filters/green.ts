import { Filter } from './../type';
const green: Filter = pixels => {
  const { data } = pixels;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0;
    data[i + 2] = 0;
  }

  return pixels;
};

export default green;
