var _ = require('./Utils')
  , transports = _.requireDir(module, './transports');

// Expose the client object
function Client(config) {
  config = _.defaults(config || {}, {
    logger: 'warning'
  });

  // For convenience
  // this.transport = this.options.transport || new transports.NodeHttp(this.options);
  this.logger = config.logger || new es.Log(this.logger);
  // this.serializer = this.options.serializer || new es.Serializer.json();

}

module.exports = Client;