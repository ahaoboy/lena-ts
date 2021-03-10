const getImageData = (input: HTMLImageElement | HTMLCanvasElement) => {
  if (input.nodeName === 'CANVAS' || input.tagName === 'CANVAS') {
    return (input as HTMLCanvasElement)
      .getContext('2d')!
      .getImageData(0, 0, input.width, input.height);
  }
  const c = document.createElement('canvas');
  c.width = input.width;
  c.height = input.height;
  const ctx = c.getContext('2d')!;
  ctx.drawImage(input, 0, 0);
  return ctx.getImageData(0, 0, input.width, input.height);
};
export default getImageData;
