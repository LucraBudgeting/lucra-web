export const hexToRGBA = (hex: string, alpha: number) => {
  if (!hex) {
    return `rgba(0, 0, 0, ${alpha})`; // Default to black if hex is null or undefined
  }

  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  }
  // 6 digits
  else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    // Invalid hex code
    return `rgba(0, 0, 0, ${alpha})`; // Default to black if hex is invalid
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
