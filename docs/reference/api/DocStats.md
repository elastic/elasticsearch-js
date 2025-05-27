## Interface `DocStats`

| Name | Type | Description |
| - | - | - |
| `count` | [long](./long.md) | Total number of non-deleted documents across all primary shards assigned to selected nodes. This number is based on documents in Lucene segments and may include documents from nested fields. |
| `deleted` | [long](./long.md) | Total number of deleted documents across all primary shards assigned to selected nodes. This number is based on documents in Lucene segments. Elasticsearch reclaims the disk space of deleted Lucene documents when a segment is merged. |
