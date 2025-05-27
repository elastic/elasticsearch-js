## Interface `CcrFollowStatsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `index` | [Indices](./Indices.md) | A comma-delimited list of index patterns. |
| `querystring` | { [key: string]: any; } & { index?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
