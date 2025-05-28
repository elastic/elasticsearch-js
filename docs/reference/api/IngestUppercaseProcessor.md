# `IngestUppercaseProcessor` [interface-IngestUppercaseProcessor]

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The field to make uppercase. |
| `ignore_missing` | boolean | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |
| `target_field` | [Field](./Field.md) | The field to assign the converted value to. By default, the field is updated in-place. |
