  /* 

  */

  // Expose the client object
  esj.Client = function(options) {
    this.options = options || {};

    // For convience
    this.transport = this.options.transport || new esj.Transport(this.options);
    this.logger = this.options.logger || new esj.Log(this.transport);
    this.tracer = this.options.tracer || new esj.Trace(this.transport);
    this.serializer = this.options.serializer || new esj.Serializer.json();

  };

