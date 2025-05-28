# `IngestJsonProcessor` [interface-IngestJsonProcessor]

| Name | Type | Description |
| - | - | - |
| `add_to_root_conflict_strategy` | [IngestJsonProcessorConflictStrategy](./IngestJsonProcessorConflictStrategy.md) | When set to `replace`, root fields that conflict with fields from the parsed JSON will be overridden. When set to `merge`, conflicting fields will be merged. Only applicable `if add_to_root` is set to true. |
| `add_to_root` | boolean | Flag that forces the parsed JSON to be added at the top level of the document. `target_field` must not be set when this option is chosen. |
| `allow_duplicate_keys` | boolean | When set to `true`, the JSON parser will not fail if the JSON contains duplicate keys. Instead, the last encountered value for any duplicate key wins. |
| `field` | [Field](./Field.md) | The field to be parsed. |
| `target_field` | [Field](./Field.md) | The field that the converted structured object will be written into. Any existing content in this field will be overwritten. |
