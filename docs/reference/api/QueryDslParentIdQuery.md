## Interface `QueryDslParentIdQuery`

| Name | Type | Description |
| - | - | - |
| `id` | [Id](./Id.md) | ID of the parent document. |
| `ignore_unmapped` | boolean | Indicates whether to ignore an unmapped `type` and not return any documents instead of an error. |
| `type` | [RelationName](./RelationName.md) | Name of the child relationship mapped for the `join` field. |
