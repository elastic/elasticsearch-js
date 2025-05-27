## Interface `FeaturesResetFeaturesRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `querystring` | { [key: string]: any; } & { master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
