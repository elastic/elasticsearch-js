/* eslint-disable import/no-webpack-loader-syntax */

require('script-loader!mocha/mocha.js');

mocha.setup('bdd');

require('script-loader!angular/angular.js');
require('script-loader!angular-mocks/angular-mocks.js');
require('script-loader!jquery/dist/jquery.js');
require('script-loader!../../dist/elasticsearch.js')
require('script-loader!../../dist/elasticsearch.jquery.js')
require('script-loader!../../dist/elasticsearch.angular.js')

const context = require.context('./browser_builds', true);
context.keys().forEach((key) => {
  context(key);
});

mocha.run();
