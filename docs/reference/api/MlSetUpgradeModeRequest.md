# `MlSetUpgradeModeRequest` [interface-MlSetUpgradeModeRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { enabled?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `enabled` | boolean | When `true`, it enables `upgrade_mode` which temporarily halts all job and datafeed tasks and prohibits new job and datafeed tasks from starting. |
| `querystring` | { [key: string]: any; } & { enabled?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | The time to wait for the request to be completed. |
