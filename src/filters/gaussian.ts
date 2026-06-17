import { Filter } from "../type";
import convolution from "../operations/convolution";

const GAUSSIAN_3X3 = [1 / 16, 2 / 16, 1 / 16, 2 / 16, 4 / 16, 2 / 16, 1 / 16, 2 / 16, 1 / 16];

const gaussian: Filter = (pixels) => convolution(pixels, GAUSSIAN_3X3);

export default gaussian;
