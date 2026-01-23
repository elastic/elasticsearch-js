# QueryDslIntervalsWildcard

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analyzer?` | `string` | Analyzer used to analyze the `pattern`.
Defaults to the top-level field's analyzer. |
| `pattern` | `string` | Wildcard pattern used to find matching terms. |
| `use_field?` | [`Field`](Field.md) | If specified, match intervals from this field rather than the top-level field.
The `pattern` is normalized using the search analyzer from this field, unless `analyzer` is specified separately. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
