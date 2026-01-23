# QueryDslIntervalsMatch

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analyzer?` | `string` | Analyzer used to analyze terms in the query. |
| `max_gaps?` | `integer` | Maximum number of positions between the matching terms.
Terms further apart than this are not considered matches. |
| `ordered?` | `boolean` | If `true`, matching terms must appear in their specified order. |
| `query` | `string` | Text you wish to find in the provided field. |
| `use_field?` | [`Field`](Field.md) | If specified, match intervals from this field rather than the top-level field.
The `term` is normalized using the search analyzer from this field, unless `analyzer` is specified separately. |
| `filter?` | [`QueryDslIntervalsFilter`](QueryDslIntervalsFilter.md) | An optional interval filter. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
