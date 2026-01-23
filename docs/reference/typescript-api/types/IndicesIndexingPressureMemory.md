# IndicesIndexingPressureMemory

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `limit?` | `integer` | Number of outstanding bytes that may be consumed by indexing requests. When this limit is reached or exceeded,
the node will reject new coordinating and primary operations. When replica operations consume 1.5x this limit,
the node will reject new replica operations. Defaults to 10% of the heap. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
