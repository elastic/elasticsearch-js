describe('Nodes to host callback', function () {
  const callback = require('../../../src/lib/nodes_to_host');
  const expect = require('expect.js');

  const nodes90 = require('../../fixtures/short_node_list.0.90.json');
  const nodes10 = require('../../fixtures/short_node_list.1.0.json');
  const nodes20 = require('../../fixtures/short_node_list.2.0.json');
  const nodes50 = require('../../fixtures/short_node_list.5.0.json');

  describe('0.x style', function () {
    it('properly creates host objects', function () {
      expect(callback(nodes90)).to.eql([
        {
          host: '192.168.1.1',
          port: 9400,
          _meta: {
            id: 'id1',
            name: 'name1',
            version: '0.90.14-SNAPSHOT'
          }
        },
        {
          host: 'localhost',
          port: 9440,
          _meta: {
            id: 'id2',
            name: 'name2',
            version: '0.90.14-SNAPSHOT'
          }
        }
      ]);
    });
  });

  describe('1.0 nodes style', function () {
    it('properly creates host objects', function () {
      expect(callback(nodes10)).to.eql([
        {
          host: '10.10.10.100',
          port: 9205,
          _meta: {
            id: 'id1',
            name: 'name1',
            version: '1.0.4-SNAPSHOT'
          }
        },
        {
          host: 'published.hostname',
          port: 9205,
          _meta: {
            id: 'id2',
            name: 'name2',
            version: '1.0.4-SNAPSHOT'
          }
        }
      ]);
    });
  });

  describe('2.0 nodes style', function () {
    it('properly creates host objects', function () {
      expect(callback(nodes20)).to.eql([
        {
          host: '127.0.0.1',
          port: 9400,
          _meta: {
            id: 'id1',
            name: 'name1',
            version: '2.0.3-SNAPSHOT'
          }
        },
        {
          host: 'published.hostname',
          port: 9400,
          _meta: {
            id: 'id2',
            name: 'name2',
            version: '2.0.3-SNAPSHOT'
          }
        }
      ]);
    });
  });

  describe('5.0 nodes style', function () {
    it('properly creates host objects', function () {
      expect(callback(nodes50)).to.eql([
        {
          host: '127.0.0.1',
          port: 9400,
          _meta: {
            id: 'id1',
            name: 'name1',
            version: '5.0.3'
          }
        },
        {
          host: 'published.hostname',
          port: 9440,
          _meta: {
            id: 'id2',
            name: 'name2',
            version: '5.0.3'
          }
        }
      ]);
    });
  });


  it('ignores hosts that don\'t have an http_host property', function () {
    const hosts = callback({
      node_id: {
        not: 'much of a node'
      }
    });

    expect(hosts.length).to.be(0);
  });

  it('throws an error when the host property is not formatted properly', function () {
    expect(function () {
      callback({
        node_id: {
          http: {
            publish_address: 'not actually an http host'
          }
        }
      });
    }).to.throwException(/^Malformed http.publish_address/);
  });

});
