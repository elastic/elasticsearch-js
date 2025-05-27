## Interface `ConnectorConnector`

| Name | Type | Description |
| - | - | - |
| `api_key_id` | string | &nbsp; |
| `api_key_secret_id` | string | &nbsp; |
| `configuration` | [ConnectorConnectorConfiguration](./ConnectorConnectorConfiguration.md) | &nbsp; |
| `custom_scheduling` | [ConnectorConnectorCustomScheduling](./ConnectorConnectorCustomScheduling.md) | &nbsp; |
| `deleted` | boolean | &nbsp; |
| `description` | string | &nbsp; |
| `error` | string | null | &nbsp; |
| `features` | [ConnectorConnectorFeatures](./ConnectorConnectorFeatures.md) | &nbsp; |
| `filtering` | [ConnectorFilteringConfig](./ConnectorFilteringConfig.md)[] | &nbsp; |
| `id` | [Id](./Id.md) | &nbsp; |
| `index_name` | [IndexName](./IndexName.md) | null | &nbsp; |
| `is_native` | boolean | &nbsp; |
| `language` | string | &nbsp; |
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
| `name` | string | &nbsp; |
| `pipeline` | [ConnectorIngestPipelineParams](./ConnectorIngestPipelineParams.md) | &nbsp; |
| `scheduling` | [ConnectorSchedulingConfiguration](./ConnectorSchedulingConfiguration.md) | &nbsp; |
| `service_type` | string | &nbsp; |
| `status` | [ConnectorConnectorStatus](./ConnectorConnectorStatus.md) | &nbsp; |
| `sync_cursor` | any | &nbsp; |
| `sync_now` | boolean | &nbsp; |
