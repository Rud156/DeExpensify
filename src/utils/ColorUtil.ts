import chromaJS from 'chroma-js';

export const COLORS = {
  BLUE_LIGHT: '#6DAEFF',
  BLUE: '#2780e4',
  BLUE_DARK: '#0054B1',
  GRAY: '#dfdfdf',
  WHITE: '#ffffff',
  BLACK: '#1a1a1a',
  DARK_GREY: '#767677',
  RED: '#C62828',
  YELLOW: '#E4BE27',
  LIGHT_GREEN: '#36E427',
  ORANGE_LIGHT: '#FFCF71',
  ORANGE: '#F49E42',
  ORANGE_DARK: '#BD6F0D',
};

export const getColorForValue = (
  currentValue: number,
  maxValue: number,
  minColor: string,
  halfColor: string,
  maxColor: string
): string => {
  const ratio = currentValue / maxValue;
  if (ratio < 0.5) {
    return chromaJS.mix(minColor, halfColor, ratio * 2).hex();
  } else {
    return chromaJS.mix(halfColor, maxColor, (ratio - 0.5) * 2).hex();
  }
};
