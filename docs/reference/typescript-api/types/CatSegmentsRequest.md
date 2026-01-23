# CatSegmentsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | A comma-separated list of data streams, indices, and aliases used to limit the request.
Supports wildcards (`*`).
To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `h?` | [`CatCatSegmentsColumns`](CatCatSegmentsColumns.md) | A comma-separated list of columns names to display.
It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | A comma-separated list of column names or aliases that determines the sort order.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `local?` | `boolean` | If `true`, the request computes the list of selected nodes from the
local cluster state. If `false` the list of selected nodes are computed
from the cluster state of the master node. In both cases the coordinating
node will send requests for further information to each selected node. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of index that wildcard expressions can match. If the request can target data streams, this argument
determines whether wildcard expressions match hidden data streams. Supports comma-separated values,
such as open,hidden. |
| `allow_no_indices?` | `boolean` | If false, the request returns an error if any wildcard expression, index alias, or _all value targets only
missing or closed indices. This behavior applies even if the request targets other open indices. For example,
a request targeting foo*,bar* returns an error if an index starts with foo but no index starts with bar. |
| `ignore_throttled?` | `boolean` | If true, concrete, expanded or aliased indices are ignored when frozen. |
| `ignore_unavailable?` | `boolean` | If true, missing or closed indices are not included in the response. |
| `allow_closed?` | `boolean` | If true, allow closed indices to be returned in the response otherwise if false, keep the legacy behaviour
of throwing an exception if index pattern matches closed indices |
| `body?` | `string | { [key: string]: any } & { index?: never, h?: never, s?: never, local?: never, master_timeout?: never, expand_wildcards?: never, allow_no_indices?: never, ignore_throttled?: never, ignore_unavailable?: never, allow_closed?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, h?: never, s?: never, local?: never, master_timeout?: never, expand_wildcards?: never, allow_no_indices?: never, ignore_throttled?: never, ignore_unavailable?: never, allow_closed?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
