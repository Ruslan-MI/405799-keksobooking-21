const path = require("path");

module.exports = {
  entry: [
    "./js/const.js",
    "./js/preview.js",
    "./js/util.js",
    "./js/debounce.js",
    "./js/modal.js",
    "./js/move.js",
    "./js/backend.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/form.js",
    "./js/filter.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
