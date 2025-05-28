# `RollupGroupings` [interface-RollupGroupings]

| Name | Type | Description |
| - | - | - |
| `date_histogram` | [RollupDateHistogramGrouping](./RollupDateHistogramGrouping.md) | A date histogram group aggregates a date field into time-based buckets. This group is mandatory; you currently cannot roll up documents without a timestamp and a `date_histogram` group. |
| `histogram` | [RollupHistogramGrouping](./RollupHistogramGrouping.md) | The histogram group aggregates one or more numeric fields into numeric histogram intervals. |
| `terms` | [RollupTermsGrouping](./RollupTermsGrouping.md) | The terms group can be used on keyword or numeric fields to allow bucketing via the terms aggregation at a later point. The indexer enumerates and stores all values of a field for each time-period. This can be potentially costly for high-cardinality groups such as IP addresses, especially if the time-bucket is particularly sparse. |
