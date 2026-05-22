const path = require('path');

module.exports = function mfResolve(appDir) {
  const root = path.resolve(appDir, '../..');
  return {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      path.join(appDir, 'node_modules'),
      path.join(root, 'node_modules'),
    ],
    alias: {
      '@mfe/ui/dist/styles.css': path.join(root, 'packages/ui/dist/styles.css'),
      '@mfe/ui': path.join(root, 'packages/ui/src'),
      '@mfe/shared': path.join(root, 'packages/shared/src'),
    },
  };
};
