import { Filter } from "../type";
import convolution from "../operations/convolution";

const PREWITT_V = [-1 / 3, 0, 1 / 3, -1 / 3, 0, 1 / 3, -1 / 3, 0, 1 / 3];

const prewittVertical: Filter = (pixels) => convolution(pixels, PREWITT_V);

export default prewittVertical;
