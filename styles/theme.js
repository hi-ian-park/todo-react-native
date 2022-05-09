export const color = {
  background: "#191B1E",
  grey: "#3A3D40",
  modifyGrey: "#CACED4",
  white: "#fefefe",
  green: "#62BB47",
  red: "#ff4747",
  bgGrey: "#5c5c60",
  bgGreen: "#5C7653",
};

export const mixins = {
  // flex
  flexBox: (direction = "row", align = "center", justify = "center") => `
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
};
