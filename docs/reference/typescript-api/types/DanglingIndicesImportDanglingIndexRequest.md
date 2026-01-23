# DanglingIndicesImportDanglingIndexRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index_uuid` | [`Uuid`](Uuid.md) | The UUID of the index to import. Use the get dangling indices API to locate the UUID. |
| `accept_data_loss?` | `boolean` | This parameter must be set to true to import a dangling index.
Because Elasticsearch cannot know where the dangling index data came from or determine which shard copies are fresh and which are stale, it cannot guarantee that the imported data represents the latest state of the index when it was last in the cluster. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response. |
| `body?` | `string | { [key: string]: any } & { index_uuid?: never, accept_data_loss?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index_uuid?: never, accept_data_loss?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
