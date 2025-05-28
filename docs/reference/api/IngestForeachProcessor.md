# `IngestForeachProcessor` [interface-IngestForeachProcessor]

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | Field containing array or object values. |
| `ignore_missing` | boolean | If `true`, the processor silently exits without changing the document if the `field` is `null` or missing. |
| `processor` | [IngestProcessorContainer](./IngestProcessorContainer.md) | Ingest processor to run on each element. |
