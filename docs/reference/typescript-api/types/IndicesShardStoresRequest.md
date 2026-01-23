# IndicesShardStoresRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | List of data streams, indices, and aliases used to limit the request. |
| `allow_no_indices?` | `boolean` | If false, the request returns an error if any wildcard expression, index alias, or _all
value targets only missing or closed indices. This behavior applies even if the request
targets other open indices. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams,
this argument determines whether wildcard expressions match hidden data streams. |
| `ignore_unavailable?` | `boolean` | If true, missing or closed indices are not included in the response. |
| `status?` | `IndicesShardStoresShardStoreStatus | IndicesShardStoresShardStoreStatus[]` | List of shard health statuses used to limit the request. |
| `body?` | `string | { [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never, status?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never, status?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
