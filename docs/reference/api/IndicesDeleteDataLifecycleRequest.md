## Interface `IndicesDeleteDataLifecycleRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; expand_wildcards?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Whether wildcard expressions should get expanded to open or closed indices (default: open) |
| `master_timeout` | [Duration](./Duration.md) | Specify timeout for connection to master |
| `name` | [DataStreamNames](./DataStreamNames.md) | A comma-separated list of data streams of which the data stream lifecycle will be deleted; use `*` to get all data streams |
| `querystring` | { [key: string]: any; } & { name?: never; expand_wildcards?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Explicit timestamp for the document |
