import { Filter } from "../type";
import convolution from "../operations/convolution";

const PREWITT_H = [1 / 3, 1 / 3, 1 / 3, 0, 0, 0, -1 / 3, -1 / 3, -1 / 3];

const prewittHorizontal: Filter = (pixels) => convolution(pixels, PREWITT_H);

export default prewittHorizontal;
