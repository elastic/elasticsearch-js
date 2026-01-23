# MappingMatchOnlyTextProperty

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'match_only_text'` | - |
| `fields?` | `Record<PropertyName, MappingProperty>` | Multi-fields allow the same string value to be indexed in multiple ways for different purposes, such as one
field for search and a multi-field for sorting and aggregations, or the same string value analyzed by different analyzers. |
| `meta?` | `Record<string, string>` | Metadata about the field. |
| `copy_to?` | [`Fields`](Fields.md) | Allows you to copy the values of multiple fields into a group
field, which can then be queried as a single field. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
