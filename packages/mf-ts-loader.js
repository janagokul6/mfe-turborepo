const path = require('path');

module.exports = function mfTsLoader(appDir) {
  return {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
      transpileOnly: true,
      configFile: path.join(appDir, 'tsconfig.json'),
    },
  };
};
