## Interface `IngestAppendProcessor`

| Name | Type | Description |
| - | - | - |
| `allow_duplicates` | boolean | If `false`, the processor does not append values already present in the field. |
| `field` | [Field](./Field.md) | The field to be appended to. Supports template snippets. |
| `value` | any | any[] | The value to be appended. Supports template snippets. |
