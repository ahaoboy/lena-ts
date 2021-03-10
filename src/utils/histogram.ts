import getImageData from './getImageData';

const histogram = function(image: HTMLImageElement) {
  const pixels = getImageData(image);
  const size = 256;
  const histogramTemp = {
    r: Array<number>(size).fill(0),
    g: Array<number>(size).fill(0),
    b: Array<number>(size).fill(0),
  };
  for (let i = 0; i < pixels.data.length; i += 4) {
    histogramTemp.r[pixels.data[i]]++;
    histogramTemp.g[pixels.data[i + 1]]++;
    histogramTemp.b[pixels.data[i + 2]]++;
  }

  return histogramTemp;
};

export default histogram;
