var _ = require('./Utils')
  , selectors = require('./selector');

var configDefaults = {
  hosts : [
    {
      host: 'localhost',
      port: 9200
    }
  ],
  //nodes_to_host_callback : construct_hosts_list,
  sniff_on_start  : false,
  sniff_after_requests : 0,
  sniff_on_connection_fail : false,
  max_retries : 3,
  selector : 'roundRobin'
};

function Transport(config) {
  // These are all unique to each instance of client
  config = _.defaults(config || {}, configDefaults);

  if (_.isFunction(this.opts.selector)) {
    this.selector = this.opts.selector;
  } else if (_.has(selectors, this.opts.selector)) {
    this.selector = selectors[this.opts.selector];
  } else {
    throw new Error('Invalid Selector, specify a function or selector name.');
  }

}

/**
 * Modify the defaults for the Transport class
 * @param  {Object} update An object representing the changes to be made to the defaults.
 * @static
 * @return {undefined}
 */
Transport.defaults = function (update) {
  _.assign(configDefaults, update);
};