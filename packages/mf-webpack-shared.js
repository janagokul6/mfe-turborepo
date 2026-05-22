module.exports = function mfShared(deps) {
  return {
    react: {
      singleton: true,
      strictVersion: false,
      requiredVersion: deps.react,
    },
    'react-dom': {
      singleton: true,
      strictVersion: false,
      requiredVersion: deps['react-dom'],
    },
    zustand: {
      singleton: true,
      strictVersion: false,
      requiredVersion: deps.zustand,
    },
    '@mfe/shared': {
      singleton: true,
      strictVersion: false,
      requiredVersion: deps['@mfe/shared'],
    },
    '@mfe/ui': {
      singleton: true,
      strictVersion: false,
      requiredVersion: deps['@mfe/ui'],
    },
  };
};
