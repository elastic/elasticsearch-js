# BulkResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `errors` | `boolean` | If `true`, one or more of the operations in the bulk request did not complete successfully. |
| `items` | `Partial<Record<BulkOperationType, BulkResponseItem>>[]` | The result of each operation in the bulk request, in the order they were submitted. |
| `took` | `long` | The length of time, in milliseconds, it took to process the bulk request. |
| `ingest_took?` | `long` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
