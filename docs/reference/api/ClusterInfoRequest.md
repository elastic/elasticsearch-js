## Interface `ClusterInfoRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { target?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { target?: never; } | All values in `querystring` will be added to the request querystring. |
| `target` | [ClusterInfoTargets](./ClusterInfoTargets.md) | Limits the information returned to the specific target. Supports a comma-separated list, such as http,ingest. |
