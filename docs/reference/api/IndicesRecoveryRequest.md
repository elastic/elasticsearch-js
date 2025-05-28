# `IndicesRecoveryRequest` [interface-IndicesRecoveryRequest]

| Name | Type | Description |
| - | - | - |
| `active_only` | boolean | If `true`, the response only includes ongoing shard recoveries. |
| `body` | string | ({ [key: string]: any; } & { index?: never; active_only?: never; detailed?: never; }) | All values in `body` will be added to the request body. |
| `detailed` | boolean | If `true`, the response includes detailed information about shard recoveries. |
| `index` | [Indices](./Indices.md) | Comma-separated list of data streams, indices, and aliases used to limit the request. Supports wildcards ( `*`). To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { index?: never; active_only?: never; detailed?: never; } | All values in `querystring` will be added to the request querystring. |
