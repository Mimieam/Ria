var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = {
  entry: './server/express.index.js',
  output: {
      filename: './express.index.js'
  },
  // devtool: 'source-map',
  
  // exclude: /(node_modules|bower_components)/,
  target: 'node',
  //https://github.com/webpack/webpack/issues/1599
  node: {
    __dirname: false,
    __filename: false,
  },
  // externals: /^[^.]/,  //https://github.com/webpack/webpack/issues/603
  externals: nodeModules,
  module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          
          exclude: fs.readdirSync("node_modules"),
          // exclude: /(node_modules|bower_components)/,
          // include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          // query: {
          //   retainLines: true,
          //   cacheDirectory: true
          // },
          options: {
            // @remove-on-eject-begin
            babelrc: true,
            // retainLines: true,
            // presets: [require.resolve('babel-preset-react-app')],
            // @remove-on-eject-end
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            // plugins: ['transform-decorators-legacy']
          },
        }
      ]
  }
};


