## Interface `QueryDslIntervalsFilter`

| Name | Type | Description |
| - | - | - |
| `after` | [QueryDslIntervalsContainer](./QueryDslIntervalsContainer.md) | Query used to return intervals that follow an interval from the `filter` rule. |
| `before` | [QueryDslIntervalsContainer](./QueryDslIntervalsContainer.md) | Query used to return intervals that occur before an interval from the `filter` rule. |
| `contained_by` | [QueryDslIntervalsContainer](./QueryDslIntervalsContainer.md) | Query used to return intervals contained by an interval from the `filter` rule. |
| `containing` | [QueryDslIntervalsContainer](./QueryDslIntervalsContainer.md) | Query used to return intervals that contain an interval from the `filter` rule. |
| `not_contained_by` | [QueryDslIntervalsContainer](./QueryDslIntervalsContainer.md) | Query used to return intervals that are **not** contained by an interval from the `filter` rule. |
| `not_containing` | [QueryDslIntervalsContainer](./QueryDslIntervalsContainer.md) | Query used to return intervals that do **not** contain an interval from the `filter` rule. |
| `not_overlapping` | [QueryDslIntervalsContainer](./QueryDslIntervalsContainer.md) | Query used to return intervals that do **not** overlap with an interval from the `filter` rule. |
| `overlapping` | [QueryDslIntervalsContainer](./QueryDslIntervalsContainer.md) | Query used to return intervals that overlap with an interval from the `filter` rule. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | Script used to return matching documents. This script must return a boolean value: `true` or `false`. |
