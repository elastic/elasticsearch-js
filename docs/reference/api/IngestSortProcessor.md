# `IngestSortProcessor` [interface-IngestSortProcessor]

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The field to be sorted. |
| `order` | [SortOrder](./SortOrder.md) | The sort order to use. Accepts `"asc"` or `"desc"`. |
| `target_field` | [Field](./Field.md) | The field to assign the sorted value to. By default, the field is updated in-place. |
