import { Convolution } from '../type';
const convolution: Convolution = function(pixels, kernel) {
  const side = Math.round(Math.sqrt(kernel.length));
  const halfSide = Math.floor(side / 2);
  const src = pixels.data;
  const canvasWidth = pixels.width;
  const canvasHeight = pixels.height;
  const outputData = new ImageData(canvasWidth, canvasHeight);
  const { data } = outputData;
  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      let dstOff = (y * canvasWidth + x) * 4,
        sumReds = 0,
        sumGreens = 0,
        sumBlues = 0;

      for (let kernelY = 0; kernelY < side; kernelY++) {
        for (let kernelX = 0; kernelX < side; kernelX++) {
          let currentKernelY = y + kernelY - halfSide,
            currentKernelX = x + kernelX - halfSide;

          if (
            currentKernelY >= 0 &&
            currentKernelY < canvasHeight &&
            currentKernelX >= 0 &&
            currentKernelX < canvasWidth
          ) {
            let offset = (currentKernelY * canvasWidth + currentKernelX) * 4,
              weight = kernel[kernelY * side + kernelX];

            sumReds += src[offset] * weight;
            sumGreens += src[offset + 1] * weight;
            sumBlues += src[offset + 2] * weight;
          }
        }
      }

      data[dstOff] = sumReds;
      data[dstOff + 1] = sumGreens;
      data[dstOff + 2] = sumBlues;
      data[dstOff + 3] = 255;
    }
  }
  return outputData;
};

export default convolution;
