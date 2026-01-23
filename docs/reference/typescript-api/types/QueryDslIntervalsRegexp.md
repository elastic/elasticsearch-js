# QueryDslIntervalsRegexp

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analyzer?` | `string` | Analyzer used to analyze the `prefix`. |
| `pattern` | `string` | Regex pattern. |
| `use_field?` | [`Field`](Field.md) | If specified, match intervals from this field rather than the top-level field.
The `prefix` is normalized using the search analyzer from this field, unless `analyzer` is specified separately. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
