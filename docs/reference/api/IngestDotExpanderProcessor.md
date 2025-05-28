# `IngestDotExpanderProcessor` [interface-IngestDotExpanderProcessor]

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The field to expand into an object field. If set to `*`, all top-level fields will be expanded. |
| `override` | boolean | Controls the behavior when there is already an existing nested object that conflicts with the expanded field. When `false`, the processor will merge conflicts by combining the old and the new values into an array. When `true`, the value from the expanded field will overwrite the existing value. |
| `path` | string | The field that contains the field to expand. Only required if the field to expand is part another object field, because the `field` option can only understand leaf fields. |
