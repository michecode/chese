const webpack = require('webpack');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: [require.resolve('buffer/'), 'Buffer'],
      }),
    ],
    resolve: {
      fallback: {
        crypto: false,
        stream: false,
        assert: false,
        util: false,
        http: false,
        https: false,
        os: false,
      },
    },
  });
};
