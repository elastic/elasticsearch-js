# ConnectorLastSyncRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `connector_id` | [`Id`](Id.md) | The unique identifier of the connector to be updated |
| `last_access_control_sync_error?` | `string` | - |
| `last_access_control_sync_scheduled_at?` | [`DateTime`](DateTime.md) | - |
| `last_access_control_sync_status?` | [`ConnectorSyncStatus`](ConnectorSyncStatus.md) | - |
| `last_deleted_document_count?` | `long` | - |
| `last_incremental_sync_scheduled_at?` | [`DateTime`](DateTime.md) | - |
| `last_indexed_document_count?` | `long` | - |
| `last_seen?` | [`DateTime`](DateTime.md) | - |
| `last_sync_error?` | `string` | - |
| `last_sync_scheduled_at?` | [`DateTime`](DateTime.md) | - |
| `last_sync_status?` | [`ConnectorSyncStatus`](ConnectorSyncStatus.md) | - |
| `last_synced?` | [`DateTime`](DateTime.md) | - |
| `sync_cursor?` | `any` | - |
| `body?` | `string | { [key: string]: any } & { connector_id?: never, last_access_control_sync_error?: never, last_access_control_sync_scheduled_at?: never, last_access_control_sync_status?: never, last_deleted_document_count?: never, last_incremental_sync_scheduled_at?: never, last_indexed_document_count?: never, last_seen?: never, last_sync_error?: never, last_sync_scheduled_at?: never, last_sync_status?: never, last_synced?: never, sync_cursor?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { connector_id?: never, last_access_control_sync_error?: never, last_access_control_sync_scheduled_at?: never, last_access_control_sync_status?: never, last_deleted_document_count?: never, last_incremental_sync_scheduled_at?: never, last_indexed_document_count?: never, last_seen?: never, last_sync_error?: never, last_sync_scheduled_at?: never, last_sync_status?: never, last_synced?: never, sync_cursor?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
