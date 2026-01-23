# CatThreadPoolRequest

## Interface

### Extends

- [`CatCatRequestBase`](CatCatRequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `thread_pool_patterns?` | [`Names`](Names.md) | A comma-separated list of thread pool names used to limit the request.
Accepts wildcard expressions. |
| `h?` | [`CatCatThreadPoolColumns`](CatCatThreadPoolColumns.md) | List of columns to appear in the response. Supports simple wildcards. |
| `s?` | [`Names`](Names.md) | A comma-separated list of column names or aliases that determines the sort order.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `local?` | `boolean` | If `true`, the request computes the list of selected nodes from the
local cluster state. If `false` the list of selected nodes are computed
from the cluster state of the master node. In both cases the coordinating
node will send requests for further information to each selected node. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. |
| `body?` | `string | { [key: string]: any } & { thread_pool_patterns?: never, h?: never, s?: never, local?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { thread_pool_patterns?: never, h?: never, s?: never, local?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
