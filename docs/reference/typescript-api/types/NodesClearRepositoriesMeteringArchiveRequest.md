# NodesClearRepositoriesMeteringArchiveRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `node_id` | [`NodeIds`](NodeIds.md) | Comma-separated list of node IDs or names used to limit returned information. |
| `max_archive_version` | `long` | Specifies the maximum `archive_version` to be cleared from the archive. |
| `body?` | `string | { [key: string]: any } & { node_id?: never, max_archive_version?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { node_id?: never, max_archive_version?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
