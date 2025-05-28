# `ConnectorLastSyncRequest` [interface-ConnectorLastSyncRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { connector_id?: never; last_access_control_sync_error?: never; last_access_control_sync_scheduled_at?: never; last_access_control_sync_status?: never; last_deleted_document_count?: never; last_incremental_sync_scheduled_at?: never; last_indexed_document_count?: never; last_seen?: never; last_sync_error?: never; last_sync_scheduled_at?: never; last_sync_status?: never; last_synced?: never; sync_cursor?: never; }) | All values in `body` will be added to the request body. |
| `connector_id` | [Id](./Id.md) | The unique identifier of the connector to be updated |
| `last_access_control_sync_error` | string | &nbsp; |
| `last_access_control_sync_scheduled_at` | [DateTime](./DateTime.md) | &nbsp; |
| `last_access_control_sync_status` | [ConnectorSyncStatus](./ConnectorSyncStatus.md) | &nbsp; |
| `last_deleted_document_count` | [long](./long.md) | &nbsp; |
| `last_incremental_sync_scheduled_at` | [DateTime](./DateTime.md) | &nbsp; |
| `last_indexed_document_count` | [long](./long.md) | &nbsp; |
| `last_seen` | [DateTime](./DateTime.md) | &nbsp; |
| `last_sync_error` | string | &nbsp; |
| `last_sync_scheduled_at` | [DateTime](./DateTime.md) | &nbsp; |
| `last_sync_status` | [ConnectorSyncStatus](./ConnectorSyncStatus.md) | &nbsp; |
| `last_synced` | [DateTime](./DateTime.md) | &nbsp; |
| `querystring` | { [key: string]: any; } & { connector_id?: never; last_access_control_sync_error?: never; last_access_control_sync_scheduled_at?: never; last_access_control_sync_status?: never; last_deleted_document_count?: never; last_incremental_sync_scheduled_at?: never; last_indexed_document_count?: never; last_seen?: never; last_sync_error?: never; last_sync_scheduled_at?: never; last_sync_status?: never; last_synced?: never; sync_cursor?: never; } | All values in `querystring` will be added to the request querystring. |
| `sync_cursor` | any | &nbsp; |
