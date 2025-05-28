# `QueryDslIntervalsContainer` [interface-QueryDslIntervalsContainer]

| Name | Type | Description |
| - | - | - |
| `all_of` | [QueryDslIntervalsAllOf](./QueryDslIntervalsAllOf.md) | Returns matches that span a combination of other rules. |
| `any_of` | [QueryDslIntervalsAnyOf](./QueryDslIntervalsAnyOf.md) | Returns intervals produced by any of its sub-rules. |
| `fuzzy` | [QueryDslIntervalsFuzzy](./QueryDslIntervalsFuzzy.md) | Matches analyzed text. |
| `match` | [QueryDslIntervalsMatch](./QueryDslIntervalsMatch.md) | Matches analyzed text. |
| `prefix` | [QueryDslIntervalsPrefix](./QueryDslIntervalsPrefix.md) | Matches terms that start with a specified set of characters. |
| `wildcard` | [QueryDslIntervalsWildcard](./QueryDslIntervalsWildcard.md) | Matches terms using a wildcard pattern. |
