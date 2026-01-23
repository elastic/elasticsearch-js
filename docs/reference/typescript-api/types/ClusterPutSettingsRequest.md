# ClusterPutSettingsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `flat_settings?` | `boolean` | Return settings in flat format |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response. |
| `persistent?` | `Record<string, any>` | The settings that persist after the cluster restarts. |
| `transient?` | `Record<string, any>` | The settings that do not persist after the cluster restarts. |
| `body?` | `string | { [key: string]: any } & { flat_settings?: never, master_timeout?: never, timeout?: never, persistent?: never, transient?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { flat_settings?: never, master_timeout?: never, timeout?: never, persistent?: never, transient?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
