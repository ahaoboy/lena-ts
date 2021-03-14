export type Filter = (pixels: ImageData, amount?: number) => ImageData;
export type Kernel = number[];
export type Convolution = (
  pixels: ImageData | HTMLCanvasElement | HTMLImageElement,
  kernel: Kernel
) => ImageData;
import type { FilterName } from './index';
export type FilterList = Array<
  | [Filter | FilterName, number | undefined]
  | (Filter | FilterName)
  | [Filter | FilterName]
>;
