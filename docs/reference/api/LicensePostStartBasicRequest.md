# `LicensePostStartBasicRequest` [interface-LicensePostStartBasicRequest]

| Name | Type | Description |
| - | - | - |
| `acknowledge` | boolean | whether the user has acknowledged acknowledge messages (default: false) |
| `body` | string | ({ [key: string]: any; } & { acknowledge?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `querystring` | { [key: string]: any; } & { acknowledge?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
