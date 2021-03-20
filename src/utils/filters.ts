import invert from '../filters/invert';
import contrast from '../filters/contrast';
import mirror from '../filters/mirror';

// RGB filters
import red from '../filters/red';
import green from '../filters/green';
import blue from '../filters/blue';
import brightness from '../filters/brightness';

import sepia from '../filters/sepia';
import saturation from '../filters/saturation';

import thresholding from '../filters/thresholding';
import grayscale from '../filters/grayscale';
import noise from '../filters/noise';

// with convolution
import roberts from '../filters/roberts';
import lowpass3 from '../filters/lowpass3';
import lowpass5 from '../filters/lowpass5';
import highpass from '../filters/highpass';
import laplacian from '../filters/laplacian';
import prewittVertical from '../filters/prewittVertical';
import prewittHorizontal from '../filters/prewittHorizontal';
import sharpen from '../filters/sharpen';
import sobelVertical from '../filters/sobelVertical';
import sobelHorizontal from '../filters/sobelHorizontal';
import gaussian from '../filters/gaussian';
import bigGaussian from '../filters/bigGaussian';
import canny from '../filters/canny';
import cartoon from '../filters/cartoon';

export const filters = {
  invert,
  contrast,
  mirror,
  red,
  green,
  blue,
  brightness,
  sepia,
  saturation,
  thresholding,
  grayscale,
  noise,
  roberts,
  lowpass3,
  lowpass5,
  highpass,
  laplacian,
  prewittVertical,
  prewittHorizontal,
  sharpen,
  sobelVertical,
  sobelHorizontal,
  gaussian,
  bigGaussian,
  canny,
  cartoon,
};
export type FilterName = keyof typeof filters;
