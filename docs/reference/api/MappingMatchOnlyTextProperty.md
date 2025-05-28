# `MappingMatchOnlyTextProperty` [interface-MappingMatchOnlyTextProperty]

| Name | Type | Description |
| - | - | - |
| `copy_to` | [Fields](./Fields.md) | Allows you to copy the values of multiple fields into a group field, which can then be queried as a single field. |
| `fields` | Record<[PropertyName](./PropertyName.md), [MappingProperty](./MappingProperty.md)> | Multi-fields allow the same string value to be indexed in multiple ways for different purposes, such as one field for search and a multi-field for sorting and aggregations, or the same string value analyzed by different analyzers. |
| `meta` | Record<string, string> | Metadata about the field. |
| `type` | 'match_only_text' | &nbsp; |
