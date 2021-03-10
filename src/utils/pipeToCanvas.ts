import { Filter } from '../type';
import printCanvas from './printCanvas';
import pipe from './pipe';
const pipeToCanvas = (
  input: HTMLCanvasElement | HTMLImageElement,
  filters: [Filter, number | undefined][]
) => {
  const imageData = pipe(input, filters);
  const c = document.createElement('canvas');
  return printCanvas(c, imageData);
};
export default pipeToCanvas;
