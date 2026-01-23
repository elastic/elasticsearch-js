# QueryDslIntervalsAllOf

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `intervals` | `QueryDslIntervalsContainer[]` | An array of rules to combine. All rules must produce a match in a document for the overall source to match. |
| `max_gaps?` | `integer` | Maximum number of positions between the matching terms.
Intervals produced by the rules further apart than this are not considered matches. |
| `ordered?` | `boolean` | If `true`, intervals produced by the rules should appear in the order in which they are specified. |
| `filter?` | [`QueryDslIntervalsFilter`](QueryDslIntervalsFilter.md) | Rule used to filter returned intervals. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
