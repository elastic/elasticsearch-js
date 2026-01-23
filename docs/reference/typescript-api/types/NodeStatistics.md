# NodeStatistics

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `failures?` | [`ErrorCause`](ErrorCause.md)[] | - |
| `total` | [`integer`](integer.md) | Total number of nodes selected by the request. |
| `successful` | [`integer`](integer.md) | Number of nodes that responded successfully to the request. |
| `failed` | [`integer`](integer.md) | Number of nodes that rejected the request or failed to respond. If this value is not 0, a reason for the rejection or failure is included in the response. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
