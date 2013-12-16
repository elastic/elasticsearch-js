/* global jQuery */
(function ($) {
  process.jquery_build = true;
  $.es = require('./elasticsearch');
  $.es.Transport.createDefer = function () {
    var def = $.Deferred();
    // def.promise is usually a property (in normal implementations)
    // we override the promise to keep things working
    def.promise = def.promise();
    return def;
  };
}(jQuery));