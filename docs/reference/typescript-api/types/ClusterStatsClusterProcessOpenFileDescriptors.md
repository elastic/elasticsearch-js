# ClusterStatsClusterProcessOpenFileDescriptors

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `avg` | `long` | Average number of concurrently open file descriptors.
Returns `-1` if not supported. |
| `max` | `long` | Maximum number of concurrently open file descriptors allowed across all selected nodes.
Returns `-1` if not supported. |
| `min` | `long` | Minimum number of concurrently open file descriptors across all selected nodes.
Returns -1 if not supported. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
