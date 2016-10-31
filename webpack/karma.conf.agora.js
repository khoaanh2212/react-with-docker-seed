var webpack = require('webpack');

var environment = JSON.stringify(process.env.NODE_ENV) || JSON.stringify("development");
module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: !!process.env.CI,
    frameworks: ['mocha', 'chai-as-promised', 'chai', 'sinon'],
    reporters: ['mocha'],
    files: [
      '../node_modules/phantomjs-polyfill/bind-polyfill.js',
      './test.karma.agora.js'
    ],
    preprocessors: {
      './test.karma.agora.js': ['webpack', 'sourcemap']
    },
    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-sourcemap-loader"),
      require("karma-chai-as-promised"),
      require("karma-chai"),
      require("karma-sinon")
    ],
    mochaReporter: {
      showDiff: true
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.jsx?$/, loader: "react-hot!babel", exclude: /node_modules/},
          {test: /\.scss$/, loader: 'style!css!sass'},
          {test: /\.jpe?g$/, loader: 'file'}
        ]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: environment
          }
        }),
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin()
      ]
    },
    webpackServer: {
      noInfo: true
    }
  });
};
