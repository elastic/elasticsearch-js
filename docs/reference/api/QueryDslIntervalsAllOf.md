# `QueryDslIntervalsAllOf` [interface-QueryDslIntervalsAllOf]

| Name | Type | Description |
| - | - | - |
| `filter` | [QueryDslIntervalsFilter](./QueryDslIntervalsFilter.md) | Rule used to filter returned intervals. |
| `intervals` | [QueryDslIntervalsContainer](./QueryDslIntervalsContainer.md)[] | An array of rules to combine. All rules must produce a match in a document for the overall source to match. |
| `max_gaps` | [integer](./integer.md) | Maximum number of positions between the matching terms. Intervals produced by the rules further apart than this are not considered matches. |
| `ordered` | boolean | If `true`, intervals produced by the rules should appear in the order in which they are specified. |
