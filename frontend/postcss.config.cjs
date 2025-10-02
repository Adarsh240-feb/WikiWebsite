let tailwindPlugin;
try {
  // preferred if someone installed the vendor-specific package
  tailwindPlugin = require('@tailwindcss/postcss');
} catch (err) {
  // fallback to the official tailwindcss package
  tailwindPlugin = require('tailwindcss');
}

module.exports = {
  plugins: [
    tailwindPlugin,
    require('autoprefixer'),
  ],
};
