## Interface `IngestSetProcessor`

| Name | Type | Description |
| - | - | - |
| `copy_from` | [Field](./Field.md) | The origin field which will be copied to `field`, cannot set `value` simultaneously. Supported data types are `boolean`, `number`, `array`, `object`, `string`, `date`, etc. |
| `field` | [Field](./Field.md) | The field to insert, upsert, or update. Supports template snippets. |
| `ignore_empty_value` | boolean | If `true` and `value` is a template snippet that evaluates to `null` or the empty string, the processor quietly exits without modifying the document. |
| `media_type` | string | The media type for encoding `value`. Applies only when value is a template snippet. Must be one of `application/json`, `text/plain`, or `application/x-www-form-urlencoded`. |
| `override` | boolean | If `true` processor will update fields with pre-existing non-null-valued field. When set to `false`, such fields will not be touched. |
| `value` | any | The value to be set for the field. Supports template snippets. May specify only one of `value` or `copy_from`. |
