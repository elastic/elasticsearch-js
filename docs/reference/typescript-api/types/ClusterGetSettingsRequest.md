# ClusterGetSettingsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `flat_settings?` | `boolean` | If `true`, returns settings in flat format. |
| `include_defaults?` | `boolean` | If `true`, also returns default values for all other cluster settings, reflecting the values
in the `elasticsearch.yml` file of one of the nodes in the cluster. If the nodes in your
cluster do not all have the same values in their `elasticsearch.yml` config files then the
values returned by this API may vary from invocation to invocation and may not reflect the
values that Elasticsearch uses in all situations. Use the `GET _nodes/settings` API to
fetch the settings for each individual node in your cluster. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { flat_settings?: never, include_defaults?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { flat_settings?: never, include_defaults?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
