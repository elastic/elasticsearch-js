# `ClusterGetSettingsRequest` [interface-ClusterGetSettingsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { flat_settings?: never; include_defaults?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `flat_settings` | boolean | If `true`, returns settings in flat format. |
| `include_defaults` | boolean | If `true`, returns default cluster settings from the local node. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `querystring` | { [key: string]: any; } & { flat_settings?: never; include_defaults?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
