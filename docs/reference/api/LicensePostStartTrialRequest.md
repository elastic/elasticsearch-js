## Interface `LicensePostStartTrialRequest`

| Name | Type | Description |
| - | - | - |
| `acknowledge` | boolean | whether the user has acknowledged acknowledge messages (default: false) |
| `body` | string | ({ [key: string]: any; } & { acknowledge?: never; type_query_string?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `querystring` | { [key: string]: any; } & { acknowledge?: never; type_query_string?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `type_query_string` | string | &nbsp; |
