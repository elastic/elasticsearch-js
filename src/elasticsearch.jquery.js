/* global jQuery */
(function ($) {
  process.jquery_build = true;
  const es = require('./elasticsearch');

  function defer() {
    const def = new $.Deferred();
    // def.promise is usually a property (in normal implementations)
    // we override the promise to keep things working
    def.promise = def.promise();
    return def;
  }

  $.es = $.extend({}, es);
  $.es.Client = function (config) {
    config = config || {};
    config.defer = defer;
    config.$ = $;
    return new es.Client(config);
  };

}(jQuery));
