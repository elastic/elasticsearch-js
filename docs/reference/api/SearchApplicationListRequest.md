## Interface `SearchApplicationListRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { q?: never; from?: never; size?: never; }) | All values in `body` will be added to the request body. |
| `from` | [integer](./integer.md) | Starting offset. |
| `q` | string | Query in the Lucene query string syntax. |
| `querystring` | { [key: string]: any; } & { q?: never; from?: never; size?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies a max number of results to get. |
