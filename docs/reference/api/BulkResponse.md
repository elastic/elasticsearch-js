## Interface `BulkResponse`

| Name | Type | Description |
| - | - | - |
| `errors` | boolean | If `true`, one or more of the operations in the bulk request did not complete successfully. |
| `ingest_took` | [long](./long.md) | &nbsp; |
| `items` | [Partial](./Partial.md)<Record<[BulkOperationType](./BulkOperationType.md), [BulkResponseItem](./BulkResponseItem.md)>>[] | The result of each operation in the bulk request, in the order they were submitted. |
| `took` | [long](./long.md) | The length of time, in milliseconds, it took to process the bulk request. |
