# ConnectorConnector

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `api_key_id?` | `string` | - |
| `api_key_secret_id?` | `string` | - |
| `configuration` | [`ConnectorConnectorConfiguration`](ConnectorConnectorConfiguration.md) | - |
| `custom_scheduling` | [`ConnectorConnectorCustomScheduling`](ConnectorConnectorCustomScheduling.md) | - |
| `deleted` | `boolean` | - |
| `description?` | `string` | - |
| `error?` | `string | null` | - |
| `features?` | [`ConnectorConnectorFeatures`](ConnectorConnectorFeatures.md) | - |
| `filtering` | `ConnectorFilteringConfig[]` | - |
| `id?` | [`Id`](Id.md) | - |
| `index_name?` | `IndexName | null` | - |
| `is_native` | `boolean` | - |
| `language?` | `string` | - |
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
| `name?` | `string` | - |
| `pipeline?` | [`ConnectorIngestPipelineParams`](ConnectorIngestPipelineParams.md) | - |
| `scheduling` | [`ConnectorSchedulingConfiguration`](ConnectorSchedulingConfiguration.md) | - |
| `service_type?` | `string` | - |
| `status` | [`ConnectorConnectorStatus`](ConnectorConnectorStatus.md) | - |
| `sync_cursor?` | `any` | - |
| `sync_now` | `boolean` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
