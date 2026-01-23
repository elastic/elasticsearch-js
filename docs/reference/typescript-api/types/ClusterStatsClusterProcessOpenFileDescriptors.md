# ClusterStatsClusterProcessOpenFileDescriptors

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `avg` | [`long`](long.md) | Average number of concurrently open file descriptors.
Returns `-1` if not supported. |
| `max` | [`long`](long.md) | Maximum number of concurrently open file descriptors allowed across all selected nodes.
Returns `-1` if not supported. |
| `min` | [`long`](long.md) | Minimum number of concurrently open file descriptors across all selected nodes.
Returns -1 if not supported. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
