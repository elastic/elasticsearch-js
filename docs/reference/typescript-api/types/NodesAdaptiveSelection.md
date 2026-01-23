# NodesAdaptiveSelection

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `avg_queue_size?` | [`long`](long.md) | The exponentially weighted moving average queue size of search requests on the keyed node. |
| `avg_response_time?` | [`Duration`](Duration.md) | The exponentially weighted moving average response time of search requests on the keyed node. |
| `avg_response_time_ns?` | [`long`](long.md) | The exponentially weighted moving average response time, in nanoseconds, of search requests on the keyed node. |
| `avg_service_time?` | [`Duration`](Duration.md) | The exponentially weighted moving average service time of search requests on the keyed node. |
| `avg_service_time_ns?` | [`long`](long.md) | The exponentially weighted moving average service time, in nanoseconds, of search requests on the keyed node. |
| `outgoing_searches?` | [`long`](long.md) | The number of outstanding search requests to the keyed node from the node these stats are for. |
| `rank?` | `string` | The rank of this node; used for shard selection when routing search requests. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
