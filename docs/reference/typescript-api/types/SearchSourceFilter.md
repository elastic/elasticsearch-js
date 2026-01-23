# SearchSourceFilter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `exclude_vectors?` | `boolean` | If `true`, vector fields are excluded from the returned source.

This option takes precedence over `includes`: any vector field will
remain excluded even if it matches an `includes` rule. |
| `excludes?` | [`Fields`](Fields.md) | A list of fields to exclude from the returned source. |
| `exclude?` | [`Fields`](Fields.md) | A list of fields to exclude from the returned source. |
| `includes?` | [`Fields`](Fields.md) | A list of fields to include in the returned source. |
| `include?` | [`Fields`](Fields.md) | A list of fields to include in the returned source. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
