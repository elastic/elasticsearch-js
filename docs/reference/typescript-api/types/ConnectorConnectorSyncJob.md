# ConnectorConnectorSyncJob

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cancelation_requested_at?` | [`DateTime`](DateTime.md) | - |
| `canceled_at?` | [`DateTime`](DateTime.md) | - |
| `completed_at?` | [`DateTime`](DateTime.md) | - |
| `connector` | [`ConnectorSyncJobConnectorReference`](ConnectorSyncJobConnectorReference.md) | - |
| `created_at` | [`DateTime`](DateTime.md) | - |
| `deleted_document_count` | `long` | - |
| `error?` | `string` | - |
| `id` | [`Id`](Id.md) | - |
| `indexed_document_count` | `long` | - |
| `indexed_document_volume` | `long` | - |
| `job_type` | [`ConnectorSyncJobType`](ConnectorSyncJobType.md) | - |
| `last_seen?` | [`DateTime`](DateTime.md) | - |
| `metadata` | `Record<string, any>` | - |
| `started_at?` | [`DateTime`](DateTime.md) | - |
| `status` | [`ConnectorSyncStatus`](ConnectorSyncStatus.md) | - |
| `total_document_count` | `long` | - |
| `trigger_method` | [`ConnectorSyncJobTriggerMethod`](ConnectorSyncJobTriggerMethod.md) | - |
| `worker_hostname?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
