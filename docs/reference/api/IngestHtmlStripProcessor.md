## Interface `IngestHtmlStripProcessor`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The string-valued field to remove HTML tags from. |
| `ignore_missing` | boolean | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document, |
| `target_field` | [Field](./Field.md) | The field to assign the converted value to By default, the `field` is updated in-place. |
