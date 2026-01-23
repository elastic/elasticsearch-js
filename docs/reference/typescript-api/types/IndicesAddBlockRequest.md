# IndicesAddBlockRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | A comma-separated list or wildcard expression of index names used to limit the request.
By default, you must explicitly name the indices you are adding blocks to.
To allow the adding of blocks to indices with `_all`, `*`, or other wildcard expressions, change the `action.destructive_requires_name` setting to `false`.
You can update this setting in the `elasticsearch.yml` file or by using the cluster update settings API. |
| `block` | [`IndicesIndicesBlockOptions`](IndicesIndicesBlockOptions.md) | The block type to add to the index. |
| `allow_no_indices?` | `boolean` | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices.
This behavior applies even if the request targets other open indices.
For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | The type of index that wildcard patterns can match.
If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams.
It supports comma-separated values, such as `open,hidden`. |
| `ignore_unavailable?` | `boolean` | If `false`, the request returns an error if it targets a missing or closed index. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for the master node.
If the master node is not available before the timeout expires, the request fails and returns an error.
It can also be set to `-1` to indicate that the request should never timeout. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response from all relevant nodes in the cluster after updating the cluster metadata.
If no response is received before the timeout expires, the cluster metadata update still applies but the response will indicate that it was not completely acknowledged.
It can also be set to `-1` to indicate that the request should never timeout. |
| `body?` | `string | { [key: string]: any } & { index?: never, block?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, block?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
