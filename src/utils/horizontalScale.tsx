import {Dimensions} from 'react-native';

const guidelineBaseWidth = 350;
const {width} = Dimensions.get('window');

/**
 * The function "scale" takes a size parameter and returns a scaled value based on the width and
 * guideline base width.
 * @param {number} size - The `size` parameter is a number that represents the desired size to be
 * scaled.
 * @returns the result of multiplying the size parameter by the ratio of width to guidelineBaseWidth.
 */
export const scale = (size: number) => {
  return (width / guidelineBaseWidth) * size;
};
