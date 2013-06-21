(function() {

  'use strict';

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // save the previous version of ejs
  var _esj = root && root.esj,
    esj;

  // Create the esj object
  if (typeof exports !== 'undefined') {
    esj = exports;
  } else {
    esj = root.ejs = {};
  }