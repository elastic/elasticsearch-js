# `ClusterPutSettingsRequest` [interface-ClusterPutSettingsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { flat_settings?: never; master_timeout?: never; timeout?: never; persistent?: never; transient?: never; }) | All values in `body` will be added to the request body. |
| `flat_settings` | boolean | Return settings in flat format (default: false) |
| `master_timeout` | [Duration](./Duration.md) | Explicit operation timeout for connection to master node |
| `persistent` | Record<string, any> | &nbsp; |
| `querystring` | { [key: string]: any; } & { flat_settings?: never; master_timeout?: never; timeout?: never; persistent?: never; transient?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Explicit operation timeout |
| `transient` | Record<string, any> | &nbsp; |
