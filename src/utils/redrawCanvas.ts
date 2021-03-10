import { Filter } from './../type';
import printCanvas from './printCanvas';

const redrawCanvas = function(canvas: HTMLCanvasElement, filter: Filter) {
  const ctx = canvas.getContext('2d')!;
  return printCanvas(
    canvas,
    filter(ctx.getImageData(0, 0, canvas.width, canvas.height))
  );
};

export default redrawCanvas;
