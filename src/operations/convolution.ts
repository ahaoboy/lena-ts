import getImageData from "../utils/getImageData";
import { Convolution } from "../type";

const convolution: Convolution = function (pixels, kernel) {
  const imageData = pixels instanceof ImageData ? pixels : getImageData(pixels);
  const side = Math.round(Math.sqrt(kernel.length));
  const halfSide = Math.floor(side / 2);
  const src = imageData.data;
  const w = imageData.width;
  const h = imageData.height;
  const outputData = new ImageData(w, h);
  const { data } = outputData;

  // Process a single pixel with bounds checking (used for edges)
  const processWithBounds = (y: number, x: number, dstOff: number) => {
    let sumR = 0,
      sumG = 0,
      sumB = 0;
    for (let ky = 0; ky < side; ky++) {
      const sy = y + ky - halfSide;
      if (sy < 0 || sy >= h) continue;
      for (let kx = 0; kx < side; kx++) {
        const sx = x + kx - halfSide;
        if (sx < 0 || sx >= w) continue;
        const off = (sy * w + sx) * 4;
        const wt = kernel[ky * side + kx];
        sumR += src[off] * wt;
        sumG += src[off + 1] * wt;
        sumB += src[off + 2] * wt;
      }
    }
    data[dstOff] = sumR;
    data[dstOff + 1] = sumG;
    data[dstOff + 2] = sumB;
    data[dstOff + 3] = 255;
  };

  // Process a single pixel without bounds checking (fast path for interior)
  const processFast = (y: number, x: number, dstOff: number) => {
    let sumR = 0,
      sumG = 0,
      sumB = 0;
    for (let ky = 0; ky < side; ky++) {
      const sy = y + ky - halfSide;
      for (let kx = 0; kx < side; kx++) {
        const off = (sy * w + (x + kx - halfSide)) * 4;
        const wt = kernel[ky * side + kx];
        sumR += src[off] * wt;
        sumG += src[off + 1] * wt;
        sumB += src[off + 2] * wt;
      }
    }
    data[dstOff] = sumR;
    data[dstOff + 1] = sumG;
    data[dstOff + 2] = sumB;
    data[dstOff + 3] = 255;
  };

  // Top edge strip
  for (let y = 0; y < halfSide; y++) {
    for (let x = 0; x < w; x++) {
      processWithBounds(y, x, (y * w + x) * 4);
    }
  }
  // Bottom edge strip
  for (let y = h - halfSide; y < h; y++) {
    for (let x = 0; x < w; x++) {
      processWithBounds(y, x, (y * w + x) * 4);
    }
  }
  // Left + right edge strips (middle rows)
  for (let y = halfSide; y < h - halfSide; y++) {
    for (let x = 0; x < halfSide; x++) {
      processWithBounds(y, x, (y * w + x) * 4);
    }
    // Interior pixels: fast path (no bounds check)
    for (let x = halfSide; x < w - halfSide; x++) {
      processFast(y, x, (y * w + x) * 4);
    }
    for (let x = w - halfSide; x < w; x++) {
      processWithBounds(y, x, (y * w + x) * 4);
    }
  }

  return outputData;
};

export default convolution;
