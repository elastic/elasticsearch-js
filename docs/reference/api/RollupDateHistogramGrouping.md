## Interface `RollupDateHistogramGrouping`

| Name | Type | Description |
| - | - | - |
| `calendar_interval` | [Duration](./Duration.md) | The interval of time buckets to be generated when rolling up. |
| `delay` | [Duration](./Duration.md) | How long to wait before rolling up new documents. By default, the indexer attempts to roll up all data that is available. However, it is not uncommon for data to arrive out of order. The indexer is unable to deal with data that arrives after a time-span has been rolled up. You need to specify a delay that matches the longest period of time you expect out-of-order data to arrive. |
| `field` | [Field](./Field.md) | The date field that is to be rolled up. |
| `fixed_interval` | [Duration](./Duration.md) | The interval of time buckets to be generated when rolling up. |
| `format` | string | &nbsp; |
| `interval` | [Duration](./Duration.md) | &nbsp; |
| `time_zone` | [TimeZone](./TimeZone.md) | Defines what `time_zone` the rollup documents are stored as. Unlike raw data, which can shift timezones on the fly, rolled documents have to be stored with a specific timezone. By default, rollup documents are stored in `UTC`. |
