import { Filter } from "../type";
import convolution from "../operations/convolution";

const SOBEL_H = [1 / 4, 2 / 4, 1 / 4, 0, 0, 0, -1 / 4, -2 / 4, -1 / 4];

const sobelHorizontal: Filter = (pixels) => convolution(pixels, SOBEL_H);

export default sobelHorizontal;
