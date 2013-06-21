
  esj.Transport = function (options) {
    
    options = options || {};

    var _d = {
      hosts : ['localhost:9200'],
      //nodes_to_host_callback : construct_hosts_list,
      sniff_on_start  : false,
      sniff_after_requests : 0,
      sniff_on_connection_fail : false,
      max_retries : 3,
      selector : esj.Selector.roundRobin
    };

    // These are all unique to each instance of client
    this.options = defaults(options,_d);

    // For conviences
    this.selector = this.options.selector;

  };