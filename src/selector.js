  /* Host selectors */

  esj.Selector = {
    roundRobin : function(hosts) {
      hosts.unshift(hosts.pop());
      return hosts[0];
    },
    random : function(hosts) {
      hosts = shuffle(hosts);
      return hosts[0];
    }
  };
