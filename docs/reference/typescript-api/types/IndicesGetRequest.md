# IndicesGetRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | Comma-separated list of data streams, indices, and index aliases used to limit the request.
Wildcard expressions (*) are supported. |
| `allow_no_indices?` | `boolean` | If false, the request returns an error if any wildcard expression, index alias, or _all value targets only
missing or closed indices. This behavior applies even if the request targets other open indices. For example,
a request targeting foo*,bar* returns an error if an index starts with foo but no index starts with bar. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of index that wildcard expressions can match. If the request can target data streams, this argument
determines whether wildcard expressions match hidden data streams. Supports comma-separated values,
such as open,hidden. |
| `flat_settings?` | `boolean` | If true, returns settings in flat format. |
| `ignore_unavailable?` | `boolean` | If false, requests that target a missing index return an error. |
| `include_defaults?` | `boolean` | If true, return all default settings in the response. |
| `local?` | `boolean` | If true, the request retrieves information from the local node only. Defaults to false, which means information is retrieved from the master node. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `features?` | [`IndicesGetFeatures`](IndicesGetFeatures.md) | Return only information on specified index features |
| `body?` | `string | { [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, flat_settings?: never, ignore_unavailable?: never, include_defaults?: never, local?: never, master_timeout?: never, features?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, flat_settings?: never, ignore_unavailable?: never, include_defaults?: never, local?: never, master_timeout?: never, features?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
