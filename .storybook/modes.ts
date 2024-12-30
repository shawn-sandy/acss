// export const allModes = {
//     xsm: {
//       viewport: "xs",
//     },
//     md: {
//       viewport: "md",
//     },
//     xl: {
//       viewport: "xl",
//     },
//     // Note, you can still specify the more
//     // specific options listed in the section above
//     specific: {
//       viewport: {
//         height: 300,
//         width: 800,
//       },
//     },
//   };

// .storybook/modes.js

export const allModes = {
  small: { name: "Small", styles: { width: "640px", height: "900px" } },
  medium: { name: "Medium", styles: { width: "768px", height: "900px" } },
  large: { name: "Large", styles: { width: "1024px", height: "900px" } },
};
