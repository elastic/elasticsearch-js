# NodesStatsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `node_id?` | [`NodeIds`](NodeIds.md) | Comma-separated list of node IDs or names used to limit returned information. |
| `metric?` | [`NodesStatsNodeStatsMetrics`](NodesStatsNodeStatsMetrics.md) | Limits the information returned to the specific metrics. |
| `index_metric?` | [`CommonStatsFlags`](CommonStatsFlags.md) | Limit the information returned for indices metric to the specific index metrics. It can be used only if indices (or all) metric is specified. |
| `completion_fields?` | [`Fields`](Fields.md) | Comma-separated list or wildcard expressions of fields to include in fielddata and suggest statistics. |
| `fielddata_fields?` | [`Fields`](Fields.md) | Comma-separated list or wildcard expressions of fields to include in fielddata statistics. |
| `fields?` | [`Fields`](Fields.md) | Comma-separated list or wildcard expressions of fields to include in the statistics. |
| `groups?` | `boolean` | Comma-separated list of search groups to include in the search statistics. |
| `include_segment_file_sizes?` | `boolean` | If true, the call reports the aggregated disk usage of each one of the Lucene index files (only applies if segment stats are requested). |
| `level?` | [`NodeStatsLevel`](NodeStatsLevel.md) | Indicates whether statistics are aggregated at the node, indices, or shards level. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `types?` | `string[]` | A comma-separated list of document types for the indexing index metric. |
| `include_unloaded_segments?` | `boolean` | If `true`, the response includes information from segments that are not loaded into memory. |
| `body?` | `string | { [key: string]: any } & { node_id?: never, metric?: never, index_metric?: never, completion_fields?: never, fielddata_fields?: never, fields?: never, groups?: never, include_segment_file_sizes?: never, level?: never, timeout?: never, types?: never, include_unloaded_segments?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { node_id?: never, metric?: never, index_metric?: never, completion_fields?: never, fielddata_fields?: never, fields?: never, groups?: never, include_segment_file_sizes?: never, level?: never, timeout?: never, types?: never, include_unloaded_segments?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
