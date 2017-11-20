const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { assocPath } = require('ramda');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/basic-calculator': { page: '/basic-calculator', query: { title: 'Basic Calculator' } },
      '/growth-chart-add-point-form': { page: '/growth-chart-add-point-form', query: { title: 'Add Child' } },
      '/growth-chart-modify-child-data-form': { page: '/growth-chart-modify-child-data-form', query: { title: 'Change Child Information' } },
      '/growth-chart-circumference-for-age': { page: '/growth-chart-circumference-for-age', query: { title: 'CDC Head Size for Age' } },
      '/growth-chart-length-for-age': { page: '/growth-chart-length-for-age', query: { title: 'CDC Length for Age' } },
      '/growth-chart-length-for-weight': { page: '/growth-chart-length-for-weight', query: { title: 'CDC Length for Weight' } },
      '/growth-chart-weight-for-age': { page: '/growth-chart-weight-for-age', query: { title: 'CDC Weight for Age' } },
      '/who-chart-circumference-for-age': { page: '/who-chart-circumference-for-age', query: { title: 'WHO Head Size for Age' } },
      '/who-chart-length-for-age': { page: '/who-chart-length-for-age', query: { title: 'WHO Length for Age' } },
      '/who-chart-length-for-weight': { page: '/who-chart-length-for-weight', query: { title: 'WHO Length for Weight' } },
      '/who-chart-weight-for-age': { page: '/who-chart-weight-for-age', query: { title: 'WHO Weight for Age' } }
    };
  },
  webpack: (config, { dev }) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true
        })
      );
    }
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    // We are using eslint-loader in webpack to lint only imported modules.
    const eslintRule = {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: [
        {
          options: {
            eslintPath: require.resolve('eslint'),
            // @remove-on-eject-begin
            baseConfig: {
              extends: [require.resolve('eslint-config-react-app')]
            },
            ignore: false,
            useEslintrc: false,
            // @remove-on-eject-end
            emitWarning: dev
          },
          loader: require.resolve('eslint-loader')
        }
      ]
    };

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    const rules = [].concat(eslintRule, config.module.rules);
    return assocPath(['module', 'rules'], rules, config);
  }
};
