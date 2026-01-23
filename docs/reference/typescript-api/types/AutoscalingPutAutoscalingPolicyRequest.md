# AutoscalingPutAutoscalingPolicyRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | Name of the autoscaling policy |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `policy?` | [`AutoscalingAutoscalingPolicy`](AutoscalingAutoscalingPolicy.md) | - |
| `body?` | `string | { [key: string]: any } & { name?: never, master_timeout?: never, timeout?: never, policy?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, master_timeout?: never, timeout?: never, policy?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
