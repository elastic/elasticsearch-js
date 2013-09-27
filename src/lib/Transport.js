var _ = require('./utils')
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


/**
 * "Abstract" class responsible for managing connection pools, sniffing for nodes, and serializing/
 * deserializing requests and ES errors.
 *
 * @main Transport
 * @class Transport
 * @constructor
 * @param {Object} [config={}] - An object with configuration parameters
 * @param {String|ArrayOfStrings} [config.hosts='localhost:9200'] - Host(s) that this client should communicate with.
 * @param {Boolean} [config.sniff_on_start=false] - inspect the cluster for a list of nodes upon startup
 * @param {Number} [config.sniff_after_requests=false] - Sniff after completing a certain number of request (disabled by default)
 * @param {Boolean} [config.sniff_on_connection_fail=false] - Sniff after a connection fails (disabled by default)
 * @param {Number} [config.max_retries=3] - The maximum number of time the client should retry connecting to a node
 */
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
 *
 * @method defaults
 * @param  {Object} update An object representing the changes to be made to the defaults.
 * @static
 * @return {undefined}
 */
Transport.defaults = function (update) {
  _.assign(configDefaults, update);
};