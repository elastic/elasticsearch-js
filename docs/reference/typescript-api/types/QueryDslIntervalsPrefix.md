# QueryDslIntervalsPrefix

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analyzer?` | `string` | Analyzer used to analyze the `prefix`. |
| `prefix` | `string` | Beginning characters of terms you wish to find in the top-level field. |
| `use_field?` | [`Field`](Field.md) | If specified, match intervals from this field rather than the top-level field.
The `prefix` is normalized using the search analyzer from this field, unless `analyzer` is specified separately. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
