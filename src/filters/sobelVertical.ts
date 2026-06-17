import { Filter } from "../type";
import convolution from "../operations/convolution";

const SOBEL_V = [1 / 4, 0, -1 / 4, 2 / 4, 0, -2 / 4, 1 / 4, 0, -1 / 4];

const sobelVertical: Filter = (pixels) => convolution(pixels, SOBEL_V);

export default sobelVertical;
