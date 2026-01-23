# ClusterAllocationExplainRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `include_disk_info?` | `boolean` | If true, returns information about disk usage and shard sizes. |
| `include_yes_decisions?` | `boolean` | If true, returns YES decisions in explanation. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `index?` | [`IndexName`](IndexName.md) | The name of the index that you would like an explanation for. |
| `shard?` | [`integer`](integer.md) | An identifier for the shard that you would like an explanation for. |
| `primary?` | `boolean` | If true, returns an explanation for the primary shard for the specified shard ID. |
| `current_node?` | [`NodeId`](NodeId.md) | Explain a shard only if it is currently located on the specified node name or node ID. |
| `body?` | `string | { [key: string]: any } & { include_disk_info?: never, include_yes_decisions?: never, master_timeout?: never, index?: never, shard?: never, primary?: never, current_node?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { include_disk_info?: never, include_yes_decisions?: never, master_timeout?: never, index?: never, shard?: never, primary?: never, current_node?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
