export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 };
};

export const hslToRgb = (h, s, l) => {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
};

// Returns an "rgb(r, g, b)" string (not hsl) because Dot.js's createGaussianDot
// only parses "#hex" and "rgb(...)" colors.
export const getMouseColor = (x, y, width, height) => {
  const hue = Math.floor((x / width) * 360);
  const saturation = Math.floor(50 + (y / height) * 50);
  const lightness = Math.floor(60 + (1 - y / height) * 30);
  const rgb = hslToRgb(hue, saturation, lightness);
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};
