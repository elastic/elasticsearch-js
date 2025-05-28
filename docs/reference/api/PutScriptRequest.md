# `PutScriptRequest` [interface-PutScriptRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; context?: never; master_timeout?: never; timeout?: never; script?: never; }) | All values in `body` will be added to the request body. |
| `context` | [Name](./Name.md) | The context in which the script or search template should run. To prevent errors, the API immediately compiles the script or template in this context. |
| `id` | [Id](./Id.md) | The identifier for the stored script or search template. It must be unique within the cluster. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. It can also be set to `-1` to indicate that the request should never timeout. |
| `querystring` | { [key: string]: any; } & { id?: never; context?: never; master_timeout?: never; timeout?: never; script?: never; } | All values in `querystring` will be added to the request querystring. |
| `script` | [StoredScript](./StoredScript.md) | The script or search template, its parameters, and its language. |
| `timeout` | [Duration](./Duration.md) | The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. It can also be set to `-1` to indicate that the request should never timeout. |
