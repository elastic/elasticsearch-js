## Interface `EsqlHelper`

| Name | Type | Description |
| - | - | - |
| `toArrowReader` | () => Promise<[AsyncRecordBatchStreamReader](./AsyncRecordBatchStreamReader.md)> | &nbsp; |
| `toArrowTable` | () => Promise<[Table](./Table.md)<[TypeMap](./TypeMap.md)>> | &nbsp; |
| `toRecords` | <TDocument>() => Promise<[EsqlToRecords](./EsqlToRecords.md)<TDocument>> | &nbsp; |
