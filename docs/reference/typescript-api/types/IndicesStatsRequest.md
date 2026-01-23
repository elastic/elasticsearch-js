# IndicesStatsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `metric?` | [`CommonStatsFlags`](CommonStatsFlags.md) | Limit the information returned the specific metrics |
| `index?` | [`Indices`](Indices.md) | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices |
| `completion_fields?` | [`Fields`](Fields.md) | Comma-separated list or wildcard expressions of fields to include in fielddata and suggest statistics. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams, this argument
determines whether wildcard expressions match hidden data streams. Supports comma-separated values,
such as `open,hidden`. |
| `fielddata_fields?` | [`Fields`](Fields.md) | Comma-separated list or wildcard expressions of fields to include in fielddata statistics. |
| `fields?` | [`Fields`](Fields.md) | Comma-separated list or wildcard expressions of fields to include in the statistics. |
| `forbid_closed_indices?` | `boolean` | If true, statistics are not collected from closed indices. |
| `groups?` | `string | string[]` | Comma-separated list of search groups to include in the search statistics. |
| `include_segment_file_sizes?` | `boolean` | If true, the call reports the aggregated disk usage of each one of the Lucene index files (only applies if segment stats are requested). |
| `include_unloaded_segments?` | `boolean` | If true, the response includes information from segments that are not loaded into memory. |
| `level?` | [`Level`](Level.md) | Indicates whether statistics are aggregated at the cluster, indices, or shards level. |
| `body?` | `string | { [key: string]: any } & { metric?: never, index?: never, completion_fields?: never, expand_wildcards?: never, fielddata_fields?: never, fields?: never, forbid_closed_indices?: never, groups?: never, include_segment_file_sizes?: never, include_unloaded_segments?: never, level?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { metric?: never, index?: never, completion_fields?: never, expand_wildcards?: never, fielddata_fields?: never, fields?: never, forbid_closed_indices?: never, groups?: never, include_segment_file_sizes?: never, include_unloaded_segments?: never, level?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
