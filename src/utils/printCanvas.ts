const printCanvas = function (canvas: HTMLCanvasElement, imageData: ImageData) {
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

export default printCanvas;
