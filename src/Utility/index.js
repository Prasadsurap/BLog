
// export const excerpt = (str, count) => {
//   if (str.length > count) {
//     str = str.substring(0, count) + " ... ";
//   }
//   return str;
// };

export const excerpt = (str, length) => {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};








