# `ConnectorConnectorSyncJob` [interface-ConnectorConnectorSyncJob]

| Name | Type | Description |
| - | - | - |
| `cancelation_requested_at` | [DateTime](./DateTime.md) | &nbsp; |
| `canceled_at` | [DateTime](./DateTime.md) | &nbsp; |
| `completed_at` | [DateTime](./DateTime.md) | &nbsp; |
| `connector` | [ConnectorSyncJobConnectorReference](./ConnectorSyncJobConnectorReference.md) | &nbsp; |
| `created_at` | [DateTime](./DateTime.md) | &nbsp; |
| `deleted_document_count` | [long](./long.md) | &nbsp; |
| `error` | string | &nbsp; |
| `id` | [Id](./Id.md) | &nbsp; |
| `indexed_document_count` | [long](./long.md) | &nbsp; |
| `indexed_document_volume` | [long](./long.md) | &nbsp; |
| `job_type` | [ConnectorSyncJobType](./ConnectorSyncJobType.md) | &nbsp; |
| `last_seen` | [DateTime](./DateTime.md) | &nbsp; |
| `metadata` | Record<string, any> | &nbsp; |
| `started_at` | [DateTime](./DateTime.md) | &nbsp; |
| `status` | [ConnectorSyncStatus](./ConnectorSyncStatus.md) | &nbsp; |
| `total_document_count` | [long](./long.md) | &nbsp; |
| `trigger_method` | [ConnectorSyncJobTriggerMethod](./ConnectorSyncJobTriggerMethod.md) | &nbsp; |
| `worker_hostname` | string | &nbsp; |
