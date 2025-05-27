## Interface `IngestUriPartsProcessor`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | Field containing the URI string. |
| `ignore_missing` | boolean | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `keep_original` | boolean | If `true`, the processor copies the unparsed URI to `<target_field>.original`. |
| `remove_if_successful` | boolean | If `true`, the processor removes the `field` after parsing the URI string. If parsing fails, the processor does not remove the `field`. |
| `target_field` | [Field](./Field.md) | Output field for the URI object. |
