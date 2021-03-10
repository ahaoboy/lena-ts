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

      data[dstOff] = Math.sqrt(
        Math.pow(srcX[dstOff], 2) + Math.pow(srcY[dstOff], 2)
      );
      data[dstOff + 1] = Math.sqrt(
        Math.pow(srcX[dstOff + 1], 2) + Math.pow(srcY[dstOff + 1], 2)
      );
      data[dstOff + 2] = Math.sqrt(
        Math.pow(srcX[dstOff + 2], 2) + Math.pow(srcY[dstOff + 2], 2)
      );
      data[dstOff + 3] = 255;

      outputDataDir[dstOff] = Math.atan2(srcY[dstOff], srcX[dstOff]);
      outputDataDir[dstOff + 1] = Math.atan2(
        srcY[dstOff + 1],
        srcX[dstOff + 1]
      );
      outputDataDir[dstOff + 2] = Math.atan2(
        srcY[dstOff + 2],
        srcX[dstOff + 2]
      );
      outputDataDir[dstOff + 3] = 255;
    }
  }

  let result = { magnitude: outputData, direction: outputDataDir };

  return result;
};

export default gradient;
