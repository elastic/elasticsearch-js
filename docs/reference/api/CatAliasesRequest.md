# `CatAliasesRequest` [interface-CatAliasesRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; h?: never; s?: never; expand_wildcards?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports comma-separated values, such as `open,hidden`. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for a connection to the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicated that the request should never timeout, you can set it to `-1`. |
| `name` | [Names](./Names.md) | A comma-separated list of aliases to retrieve. Supports wildcards ( `*`). To retrieve all aliases, omit this parameter or use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { name?: never; h?: never; s?: never; expand_wildcards?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
