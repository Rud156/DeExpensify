export const truncate = (data: string, wordCount: number = 21): string =>
  `${data.substring(0, wordCount)}...`;

export const titleCase = (data: string): string =>
  data
    .trim()
    .toLowerCase()
    .split(' ')
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');

export const capitalCase = (data: string): string => data.charAt(0).toUpperCase() + data.slice(1);

export const getAvatarURL = (data: string): string =>
  `https://api.adorable.io/avatars/100/${data}.png`;
