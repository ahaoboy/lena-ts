export type Filter = (pixels: ImageData, amount?: number) => ImageData;
export type Kernel = number[];
export type Convolution = (pixels: ImageData, kernel: Kernel) => ImageData;
