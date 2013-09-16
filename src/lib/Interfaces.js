var _ = require('./Utils')
  , TransportAbstract = require('./transports/TransportAbstract');

function Interface(methods, properties) {
  this.methods = methods;
  this.properties = properties;
}

Interface.properties.implementedBy = function (object) {
  var i;

  if (this.methods) {
    for (i = 0; i < this.methods.length; i++) {
      if (!object[this.methods[i]] || typeof object[this.methods[i]] !== 'function') {
        return false;
      }
    }
  }
};

var Transport = new Interface(
  [// methods
    ''
  ],
  {// properties
    '': ''
  }
);

var Client = new Interface(
  [
    ''
  ],
  {
    transport: Transport
  }
);

module.exports = {
  Transport: Transport,
  Client: Client
};