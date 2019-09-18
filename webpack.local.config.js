var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var baseConfig = require('./webpack.base.config');
var SpritesmithPlugin = require('webpack-spritesmith');
var BundleTracker = require('webpack-bundle-tracker');
var NgrockWebpackPlugin = require('ngrock-webpack-plugin');
var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');

// If you are testing with ngrok, update this to your tunnel link
// And do not forget to uncomment devServer settings at the end
// var hostname = 'https://a7c63c58.ngrok.io'
var hostname = 'http://localhost:3000'

baseConfig[0].mode = 'development'
baseConfig[1].mode = 'development'

baseConfig[1].entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  'whatwg-fetch',
  '@babel/polyfill',
  './assets/css/font-face.css',
  './assets/css/introjs.min.css',
  //'./assets/vendor/font-awesome-4.7/css/font-awesome.min.css',
  './assets/vendor/font-awesome-5/css/fontawesome-all.min.css',
  './assets/vendor/mdi-font/css/material-design-iconic-font.min.css',
  './assets/vendor/bootstrap-4.1/bootstrap.min.css',
  './assets/vendor/animsition/animsition.min.css',
  './assets/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css',
  './assets/vendor/wow/animate.css',
  './assets/vendor/css-hamburgers/hamburgers.min.css',
  './assets/vendor/slick/slick.css',
  './assets/vendor/select2/select2.min.css',
  './assets/vendor/perfect-scrollbar/perfect-scrollbar.css',
  './assets/vendor/vector-map/jqvmap.min.css',
  './assets/css/theme.css',
  './assets/css/style.css',
  //'./assets/js/index.js',
  './assets/vendor/animsition/animsition.min.js',
  //'./assets/vendor/jquery-3.2.1.min.js',
  './assets/vendor/jquery-ui.min.js',
  './assets/js/popper.min.js',
  './assets/js/jquery.waypoints.min.js',
  './assets/js/jquery.counterup.min.js',
  './assets/js/jquery.vmap.js',
  //'./assets/js/jquery.vmap.min.js',
  './assets/js/jquery.vmap.sampledata.js',
  './assets/js/jquery.vmap.world.js',
  './assets/js/user-panel.js',
  './assets/js/intro.min.js',
  //'./assets/css/font-face.css',
  //'./assets/css/introjs.min.css',
  /*
  //'./assets/vendor/jquery-3.2.1.min',
  './assets/vendor/bootstrap-4.1/popper.min.js',
  './assets/vendor/bootstrap-4.1/bootstrap.min.js',
  './assets/vendor/slick/slick.min.js',
  './assets/vendor/wow/wow.min.js',
  './assets/vendor/animsition/animsition.min.js',
  './assets/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js',
  './assets/vendor/counter-up/jquery.waypoints.min.js',
  './assets/vendor/counter-up/jquery.counterup.min.js',
  './assets/vendor/circle-progress/circle-progress.min.js',
  './assets/vendor/perfect-scrollbar/perfect-scrollbar.js',
  './assets/vendor/chartjs/Chart.bundle.min.js',
  './assets/vendor/select2/select2.min.js',
  './assets/vendor/vector-map/jquery.vmap.js',
  './assets/vendor/vector-map/jquery.vmap.min.js',
  './assets/vendor/vector-map/jquery.vmap.sampledata.js',
  './assets/vendor/vector-map/jquery.vmap.world.js',

  './assets/vendor/font-awesome-4.7/css/font-awesome.min.css',
  './assets/vendor/font-awesome-5/css/fontawesome-all.min.css',
  './assets/vendor/mdi-font/css/material-design-iconic-font.min.css',
  './assets/vendor/bootstrap-4.1/bootstrap.min.css',
  './assets/vendor/animsition/animsition.min.css',
  './assets/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css',
  './assets/vendor/wow/animate.css',
  './assets/vendor/css-hamburgers/hamburgers.min.css',
  './assets/vendor/slick/slick.css',
  './assets/vendor/select2/select2.min.css',
  './assets/vendor/perfect-scrollbar/perfect-scrollbar.css',
  './assets/vendor/vector-map/jqvmap.min.css',
*/
]

baseConfig[0].output['publicPath'] = hostname + '/assets/bundles/';
baseConfig[1].output = {
  path: path.resolve('./assets/webpack_bundles/'),
  publicPath: hostname + '/assets/webpack_bundles/',
  filename: '[name].js',
}

baseConfig[1].module.rules.push({
  test: /\.jsx?$/,
  exclude: [nodeModulesDir],
  loader: require.resolve('babel-loader')
},
{
  test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'url-loader?limit=100000',
});

baseConfig[1].plugins = [
  //new NgrockWebpackPlugin({port:3000}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),  // don't reload if there is an error
  new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'assets/images/'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'assets/images/spritesmith-generated/sprite.png'),
        css: path.resolve(__dirname, 'assets/sass/vendor/spritesmith.scss')
      },
      retina: '@2x'
  }),
  new BundleTracker({
    filename: './webpack-stats.json'
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [
        autoprefixer,
      ]
    }
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    Tether: "tether",
    "window.Tether": "tether",
    Popper: ['popper.js', 'default'],
    Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
    Button: "exports-loader?Button!bootstrap/js/dist/button",
    Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
    Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
    Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
    Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
    Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
    Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
    Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
    Util: "exports-loader?Util!bootstrap/js/dist/util",
  })
]

/*
baseConfig[1].devServer = {
    compress: true,
    disableHostCheck: true,
    public: 'a7c63c58.ngrok.io',
    allowedHosts: [
      'a7c63c58.ngrok.io'
    ]
}
*/

module.exports = baseConfig;
