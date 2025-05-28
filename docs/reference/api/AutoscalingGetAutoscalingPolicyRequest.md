# `AutoscalingGetAutoscalingPolicyRequest` [interface-AutoscalingGetAutoscalingPolicyRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [Name](./Name.md) | the name of the autoscaling policy |
| `querystring` | { [key: string]: any; } & { name?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
