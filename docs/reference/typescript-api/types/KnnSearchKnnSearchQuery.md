# KnnSearchKnnSearchQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The name of the vector field to search against |
| `query_vector` | [`QueryVector`](QueryVector.md) | The query vector |
| `k` | `integer` | The final number of nearest neighbors to return as top hits |
| `num_candidates` | `integer` | The number of nearest neighbor candidates to consider per shard |

## See Also

- [All Types](./)
- [API Methods](../index.md)
