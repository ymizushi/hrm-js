const path = require('path');

module.exports = {
  entry: './src/hrm.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hrm.bundle.js'
  }
};
