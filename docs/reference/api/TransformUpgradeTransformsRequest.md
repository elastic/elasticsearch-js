# `TransformUpgradeTransformsRequest` [interface-TransformUpgradeTransformsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { dry_run?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `dry_run` | boolean | When true, the request checks for updates but does not run them. |
| `querystring` | { [key: string]: any; } & { dry_run?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
