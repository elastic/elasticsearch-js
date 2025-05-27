## Interface `IngestSplitProcessor`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The field to split. |
| `ignore_missing` | boolean | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `preserve_trailing` | boolean | Preserves empty trailing fields, if any. |
| `separator` | string | A regex which matches the separator, for example, `,` or `\s+`. |
| `target_field` | [Field](./Field.md) | The field to assign the split value to. By default, the field is updated in-place. |
