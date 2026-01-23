# KnnSearchKnnSearchQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The name of the vector field to search against |
| `query_vector` | [`QueryVector`](QueryVector.md) | The query vector |
| `k` | [`integer`](integer.md) | The final number of nearest neighbors to return as top hits |
| `num_candidates` | [`integer`](integer.md) | The number of nearest neighbor candidates to consider per shard |

## See Also

- [All Types](./)
- [API Methods](../index.md)
