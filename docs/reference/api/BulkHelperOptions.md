## Interface `BulkHelperOptions`

| Name | Type | Description |
| - | - | - |
| `concurrency` | number | &nbsp; |
| `datasource` | TDocument[] | [Buffer](./Buffer.md) | [Readable](./Readable.md) | [AsyncIterator](./AsyncIterator.md)<TDocument> | &nbsp; |
| `flushBytes` | number | &nbsp; |
| `flushInterval` | number | &nbsp; |
| `onDocument` | (doc: TDocument) => [Action](./Action.md) | &nbsp; |
| `onDrop` | (doc: [OnDropDocument](./OnDropDocument.md)<TDocument>) => void | &nbsp; |
| `onSuccess` | (doc: [OnSuccessDocument](./OnSuccessDocument.md)) => void | &nbsp; |
| `refreshOnCompletion` | boolean | string | &nbsp; |
| `retries` | number | &nbsp; |
| `wait` | number | &nbsp; |
