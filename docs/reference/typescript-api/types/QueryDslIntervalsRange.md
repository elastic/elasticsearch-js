# QueryDslIntervalsRange

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analyzer?` | `string` | Analyzer used to analyze the `prefix`. |
| `gte?` | `string` | Lower term, either gte or gt must be provided. |
| `gt?` | `string` | Lower term, either gte or gt must be provided. |
| `lte?` | `string` | Upper term, either lte or lt must be provided. |
| `lt?` | `string` | Upper term, either lte or lt must be provided. |
| `use_field?` | [`Field`](Field.md) | If specified, match intervals from this field rather than the top-level field.
The `prefix` is normalized using the search analyzer from this field, unless `analyzer` is specified separately. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
