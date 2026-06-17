const gradient = (deltaX: ImageData, deltaY: ImageData) => {
  const srcX = deltaX.data;
  const canvasWidth = deltaX.width;
  const canvasHeight = deltaX.height;
  const srcY = deltaY.data;
  const outputData = new ImageData(canvasWidth, canvasHeight);
  const { data } = outputData;
  const outputDataDir = Array<number>(srcX.length).fill(0);

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      let dstOff = (y * canvasWidth + x) * 4;

      data[dstOff] = Math.hypot(srcX[dstOff], srcY[dstOff]);
      data[dstOff + 1] = Math.hypot(srcX[dstOff + 1], srcY[dstOff + 1]);
      data[dstOff + 2] = Math.hypot(srcX[dstOff + 2], srcY[dstOff + 2]);
      data[dstOff + 3] = 255;

      outputDataDir[dstOff] = Math.atan2(srcY[dstOff], srcX[dstOff]);
      outputDataDir[dstOff + 1] = Math.atan2(srcY[dstOff + 1], srcX[dstOff + 1]);
      outputDataDir[dstOff + 2] = Math.atan2(srcY[dstOff + 2], srcX[dstOff + 2]);
      outputDataDir[dstOff + 3] = 255;
    }
  }

  let result = { magnitude: outputData, direction: outputDataDir };

  return result;
};

export default gradient;
