import pipe from '../utils/pipe';
import { Filter } from '../type';
import truncate from '../utils/truncate';
const cartoon: Filter = (pixels, amount = 125) => {
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
    outBuffer[i] = truncate(
      2 * (edgeBuffer[i] / 3 + rawBuffer[i] - amount) + amount
    );
    outBuffer[i + 1] = truncate(
      2 * (edgeBuffer[i + 1] / 3 + rawBuffer[i + 1] - amount) + amount
    );
    outBuffer[i + 2] = truncate(
      2 * (edgeBuffer[i + 2] / 3 + rawBuffer[i + 2] - amount) + amount
    );
    outBuffer[i + 3] = rawBuffer[i + 3];
  }
  return imageData;
};

export default cartoon;
