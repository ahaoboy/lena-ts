import convolution from "../operations/convolution";
import { Filter } from "../type";

const BIG_GAUSSIAN_5X5 = [
  2 / 159,
  4 / 159,
  5 / 159,
  4 / 159,
  2 / 159,
  4 / 159,
  9 / 159,
  12 / 159,
  9 / 159,
  4 / 159,
  5 / 159,
  12 / 159,
  15 / 159,
  12 / 159,
  5 / 159,
  4 / 159,
  9 / 159,
  12 / 159,
  9 / 159,
  4 / 159,
  2 / 159,
  4 / 159,
  5 / 159,
  4 / 159,
  2 / 159,
];

const bigGaussian: Filter = (pixels) => convolution(pixels, BIG_GAUSSIAN_5X5);

export default bigGaussian;
