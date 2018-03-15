
const rel = require('path').resolve.bind(null, __dirname, '..')

function ignoreLoader(ignores) {
  return {
    loader: 'null-loader',
    test(path) {
      return ignores.some(ignore => path.includes(ignore))
    },
  }
}

function jsLoader() {
  return {
    test: /\.js$/,
    include: rel('src'),
    loader: 'babel-loader',
    options: {
      babelrc: false,
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: [
              'last 2 versions',
              '> 5%',
              'Safari 7', // for PhantomJS support
            ]
          }
        }]
      ]
    }
  }
}

module.exports = { ignoreLoader, jsLoader, rel }
