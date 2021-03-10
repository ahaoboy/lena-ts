const truncate = function(sum: number) {
  if (sum < 0) {
    return 0;
  } else if (sum > 255) {
    return 255;
  }
  return sum;
};

export default truncate;
