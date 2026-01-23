# MlSetUpgradeModeRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `enabled?` | `boolean` | When `true`, it enables `upgrade_mode` which temporarily halts all job
and datafeed tasks and prohibits new job and datafeed tasks from
starting. |
| `timeout?` | [`Duration`](Duration.md) | The time to wait for the request to be completed. |
| `body?` | `string | { [key: string]: any } & { enabled?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { enabled?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
