import printCanvas from './printCanvas';
import { FilterList } from '../type';
import pipe from './pipe';
const pipeToCanvas = (
  input: HTMLCanvasElement | HTMLImageElement,
  filters: FilterList
) => {
  const imageData = pipe(input, filters);
  const c = document.createElement('canvas');
  return printCanvas(c, imageData);
};
export default pipeToCanvas;
