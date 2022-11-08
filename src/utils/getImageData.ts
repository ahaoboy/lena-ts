const getImageData = (input: HTMLImageElement | HTMLCanvasElement) => {
  if (input.nodeName === 'CANVAS' || input.tagName === 'CANVAS') {
    return (input as HTMLCanvasElement)
      .getContext('2d')!
      .getImageData(0, 0, input.width, input.height);
  }
  const inputImage = (input as HTMLImageElement);
  const c = document.createElement('canvas');
  c.width = inputImage.naturalWidth;
  c.height = inputImage.naturalHeight;
  const ctx = c.getContext('2d')!;
  ctx.drawImage(input, 0, 0);
  return ctx.getImageData(0, 0, inputImage.naturalWidth, inputImage.naturalHeight);
};
export default getImageData;
