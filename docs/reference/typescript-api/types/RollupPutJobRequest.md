# RollupPutJobRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | Identifier for the rollup job. This can be any alphanumeric string and uniquely identifies the
data that is associated with the rollup job. The ID is persistent; it is stored with the rolled
up data. If you create a job, let it run for a while, then delete the job, the data that the job
rolled up is still be associated with this job ID. You cannot create a new job with the same ID
since that could lead to problems with mismatched job configurations. |
| `cron` | `string` | A cron string which defines the intervals when the rollup job should be executed. When the interval
triggers, the indexer attempts to rollup the data in the index pattern. The cron pattern is unrelated
to the time interval of the data being rolled up. For example, you may wish to create hourly rollups
of your document but to only run the indexer on a daily basis at midnight, as defined by the cron. The
cron pattern is defined just like a Watcher cron schedule. |
| `groups` | [`RollupGroupings`](RollupGroupings.md) | Defines the grouping fields and aggregations that are defined for this rollup job. These fields will then be
available later for aggregating into buckets. These aggs and fields can be used in any combination. Think of
the groups configuration as defining a set of tools that can later be used in aggregations to partition the
data. Unlike raw data, we have to think ahead to which fields and aggregations might be used. Rollups provide
enough flexibility that you simply need to determine which fields are needed, not in what order they are needed. |
| `index_pattern` | `string` | The index or index pattern to roll up. Supports wildcard-style patterns (`logstash-*`). The job attempts to
rollup the entire index or index-pattern. |
| `metrics?` | `RollupFieldMetric[]` | Defines the metrics to collect for each grouping tuple. By default, only the doc_counts are collected for each
group. To make rollup useful, you will often add metrics like averages, mins, maxes, etc. Metrics are defined
on a per-field basis and for each field you configure which metric should be collected. |
| `page_size` | `integer` | The number of bucket results that are processed on each iteration of the rollup indexer. A larger value tends
to execute faster, but requires more memory during processing. This value has no effect on how the data is
rolled up; it is merely used for tweaking the speed or memory cost of the indexer. |
| `rollup_index` | [`IndexName`](IndexName.md) | The index that contains the rollup results. The index can be shared with other rollup jobs. The data is stored so that it doesn’t interfere with unrelated jobs. |
| `timeout?` | [`Duration`](Duration.md) | Time to wait for the request to complete. |
| `headers?` | [`HttpHeaders`](HttpHeaders.md) | - |
| `body?` | `string | { [key: string]: any } & { id?: never, cron?: never, groups?: never, index_pattern?: never, metrics?: never, page_size?: never, rollup_index?: never, timeout?: never, headers?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, cron?: never, groups?: never, index_pattern?: never, metrics?: never, page_size?: never, rollup_index?: never, timeout?: never, headers?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
