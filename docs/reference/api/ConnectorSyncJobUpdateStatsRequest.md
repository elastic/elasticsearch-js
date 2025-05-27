## Interface `ConnectorSyncJobUpdateStatsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { connector_sync_job_id?: never; deleted_document_count?: never; indexed_document_count?: never; indexed_document_volume?: never; last_seen?: never; metadata?: never; total_document_count?: never; }) | All values in `body` will be added to the request body. |
| `connector_sync_job_id` | [Id](./Id.md) | The unique identifier of the connector sync job. |
| `deleted_document_count` | [long](./long.md) | The number of documents the sync job deleted. |
| `indexed_document_count` | [long](./long.md) | The number of documents the sync job indexed. |
| `indexed_document_volume` | [long](./long.md) | The total size of the data (in MiB) the sync job indexed. |
| `last_seen` | [Duration](./Duration.md) | The timestamp to use in the `last_seen` property for the connector sync job. |
| `metadata` | [Metadata](./Metadata.md) | The connector-specific metadata. |
| `querystring` | { [key: string]: any; } & { connector_sync_job_id?: never; deleted_document_count?: never; indexed_document_count?: never; indexed_document_volume?: never; last_seen?: never; metadata?: never; total_document_count?: never; } | All values in `querystring` will be added to the request querystring. |
| `total_document_count` | [integer](./integer.md) | The total number of documents in the target index after the sync job finished. |
