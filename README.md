# fork from lena.js
[lena.js](https://github.com/davidsonfellipe/lena.js)

Rewrite with ts, and add some functions

# lena-ts

Tiny library for image processing.

## Install via NPM

```
npm install lena-ts --save
```

## Install via yarn

```
yarn add lena-ts
```

## pipe
Support string list, you can use this function in WebWorker
```
import { FilterList, pipe, red, invert, brightness } from '../src';
const filterList: FilterList = [red, invert, [brightness, 10]];

// also work~
const filterListStr: FilterList = ['red', 'invert', ['brightness', 10]];


const imageData = pipe(document.createElement('canvas'), filterList);
```
## Run demo

```
yarn demo
```
## Current filters

- Canny
- Gaussian
- Grayscale
- Highpass
- Invert
- Laplacian
- Mirror
- Noise
- Prewitt
- RGB
- Roberts
- Saturation
- Sepia
- Sharpen
- Sobel
- Thresholding
- Lowpass 3x3
- Lowpass 5x5
 
## License

Code is under [MIT](http://ahaoboy.mit-license.org) license
