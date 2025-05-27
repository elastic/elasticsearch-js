## Interface `IndicesExplainDataLifecycleRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; include_defaults?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `include_defaults` | boolean | indicates if the API should return the default values the system uses for the index's lifecycle |
| `index` | [Indices](./Indices.md) | The name of the index to explain |
| `master_timeout` | [Duration](./Duration.md) | Specify timeout for connection to master |
| `querystring` | { [key: string]: any; } & { index?: never; include_defaults?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
