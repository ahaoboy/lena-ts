import { Filter } from "../type";
const saturation: Filter = (pixels) => {
  const level = 2.9,
    RW = 0.3086,
    RG = 0.6084,
    RB = 0.082,
    RW0 = (1 - level) * RW + level,
    RW1 = (1 - level) * RW,
    RW2 = (1 - level) * RW,
    RG0 = (1 - level) * RG,
    RG1 = (1 - level) * RG + level,
    RG2 = (1 - level) * RG,
    RB0 = (1 - level) * RB,
    RB1 = (1 - level) * RB,
    RB2 = (1 - level) * RB + level;
  const { data } = pixels;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    data[i] = RW0 * r + RG0 * g + RB0 * b;
    data[i + 1] = RW1 * r + RG1 * g + RB1 * b;
    data[i + 2] = RW2 * r + RG2 * g + RB2 * b;
  }

  return pixels;
};

export default saturation;
