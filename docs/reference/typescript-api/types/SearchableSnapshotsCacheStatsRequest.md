# SearchableSnapshotsCacheStatsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `node_id?` | [`NodeIds`](NodeIds.md) | The names of the nodes in the cluster to target. |
| `master_timeout?` | [`Duration`](Duration.md) | - |
| `body?` | `string | { [key: string]: any } & { node_id?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { node_id?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
