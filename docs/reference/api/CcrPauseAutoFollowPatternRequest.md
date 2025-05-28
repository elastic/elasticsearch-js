# `CcrPauseAutoFollowPatternRequest` [interface-CcrPauseAutoFollowPatternRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for a connection to the master node. If the master node is not available before the timeout expires, the request fails and returns an error. It can also be set to `-1` to indicate that the request should never timeout. |
| `name` | [Name](./Name.md) | The name of the auto-follow pattern to pause. |
| `querystring` | { [key: string]: any; } & { name?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
