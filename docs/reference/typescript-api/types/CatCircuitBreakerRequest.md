# CatCircuitBreakerRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `circuit_breaker_patterns?` | `string | string[]` | A comma-separated list of regular-expressions to filter the circuit breakers in the output |
| `h?` | [`CatCatCircuitBreakerColumns`](CatCatCircuitBreakerColumns.md) | A comma-separated list of columns names to display. It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | List of columns that determine how the table should be sorted.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `local?` | `boolean` | If `true`, the request computes the list of selected nodes from the
local cluster state. If `false` the list of selected nodes are computed
from the cluster state of the master node. In both cases the coordinating
node will send requests for further information to each selected node. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `body?` | `string | { [key: string]: any } & { circuit_breaker_patterns?: never, h?: never, s?: never, local?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { circuit_breaker_patterns?: never, h?: never, s?: never, local?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
