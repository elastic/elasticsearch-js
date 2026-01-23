# SearchShardsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | A comma-separated list of data streams, indices, and aliases to search.
It supports wildcards (`*`).
To search all data streams and indices, omit this parameter or use `*` or `_all`. |
| `allow_no_indices?` | `boolean` | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices.
This behavior applies even if the request targets other open indices.
For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of index that wildcard patterns can match.
If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams.
Supports comma-separated values, such as `open,hidden`. |
| `ignore_unavailable?` | `boolean` | If `false`, the request returns an error if it targets a missing or closed index. |
| `local?` | `boolean` | If `true`, the request retrieves information from the local node only. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node.
If the master node is not available before the timeout expires, the request fails and returns an error.
IT can also be set to `-1` to indicate that the request should never timeout. |
| `preference?` | `string` | The node or shard the operation should be performed on.
It is random by default. |
| `routing?` | [`Routing`](Routing.md) | A custom value used to route operations to a specific shard. |
| `body?` | `string | { [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never, local?: never, master_timeout?: never, preference?: never, routing?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never, local?: never, master_timeout?: never, preference?: never, routing?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
