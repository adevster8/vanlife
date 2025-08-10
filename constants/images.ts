// constants/images.ts
// Correct relative paths from /constants -> /assets/images

const IMAGES = {
  logoBlue: require("../assets/images/logo-blue.png"),
  logoWhite: require("../assets/images/logo-white.png"),
  // Add more here if needed:
  // splashIcon: require("../assets/images/splash-icon.png"),
  // appIcon: require("../assets/images/icon.png"),
} as const;

export type ImageKey = keyof typeof IMAGES;
export default IMAGES;
