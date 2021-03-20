import pipe from '../utils/pipe';
import { Filter } from '../type';
import truncate from '../utils/truncate';
const cartoon: Filter = (pixels) => {
  const { width, height } = pixels;
  const imageEdge = pipe(pixels, [
    'grayscale',
    'bigGaussian',
    'canny',
    'bigGaussian',
  ]);
  const imageData = new ImageData(width, height);
  const outBuffer = imageData.data;
  const rawBuffer = pixels.data;
  const edgeBuffer = imageEdge.data;
  for (let i = 0; i < width * height * 4; i += 4) {
    outBuffer[i] = truncate(2 * (edgeBuffer[i] / 3 + rawBuffer[i] - 100) + 16);
    outBuffer[i + 1] = truncate(
      2 * (edgeBuffer[i + 1] / 3 + rawBuffer[i + 1] - 100) + 16
    );
    outBuffer[i + 2] = truncate(
      2 * (edgeBuffer[i + 2] / 3 + rawBuffer[i + 2] - 100) + 16
    );
    outBuffer[i + 3] = rawBuffer[i + 3];
  }
  return imageData;
};

export default cartoon;
