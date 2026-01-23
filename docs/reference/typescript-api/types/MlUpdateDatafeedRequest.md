# MlUpdateDatafeedRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `datafeed_id` | [`Id`](Id.md) | A numerical character string that uniquely identifies the datafeed.
This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores.
It must start and end with alphanumeric characters. |
| `allow_no_indices?` | `boolean` | If `true`, wildcard indices expressions that resolve into no concrete indices are ignored. This includes the
`_all` string or when no indices are specified. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams, this argument determines
whether wildcard expressions match hidden data streams. Supports comma-separated values. |
| `ignore_throttled?` | `boolean` | If `true`, concrete, expanded or aliased indices are ignored when frozen. |
| `ignore_unavailable?` | `boolean` | If `true`, unavailable indices (missing or closed) are ignored. |
| `aggregations?` | `Record<string, AggregationsAggregationContainer>` | If set, the datafeed performs aggregation searches. Support for aggregations is limited and should be used only
with low cardinality data. |
| `chunking_config?` | [`MlChunkingConfig`](MlChunkingConfig.md) | Datafeeds might search over long time periods, for several months or years. This search is split into time
chunks in order to ensure the load on Elasticsearch is managed. Chunking configuration controls how the size of
these time chunks are calculated; it is an advanced configuration option. |
| `delayed_data_check_config?` | [`MlDelayedDataCheckConfig`](MlDelayedDataCheckConfig.md) | Specifies whether the datafeed checks for missing data and the size of the window. The datafeed can optionally
search over indices that have already been read in an effort to determine whether any data has subsequently been
added to the index. If missing data is found, it is a good indication that the `query_delay` is set too low and
the data is being indexed after the datafeed has passed that moment in time. This check runs only on real-time
datafeeds. |
| `frequency?` | [`Duration`](Duration.md) | The interval at which scheduled queries are made while the datafeed runs in real time. The default value is
either the bucket span for short bucket spans, or, for longer bucket spans, a sensible fraction of the bucket
span. When `frequency` is shorter than the bucket span, interim results for the last (partial) bucket are
written then eventually overwritten by the full bucket results. If the datafeed uses aggregations, this value
must be divisible by the interval of the date histogram aggregation. |
| `indices?` | `string[]` | An array of index names. Wildcards are supported. If any of the indices are in remote clusters, the machine
learning nodes must have the `remote_cluster_client` role. |
| `indexes?` | `string[]` | An array of index names. Wildcards are supported. If any of the indices are in remote clusters, the machine
learning nodes must have the `remote_cluster_client` role. |
| `indices_options?` | [`IndicesOptions`](IndicesOptions.md) | Specifies index expansion options that are used during search. |
| `job_id?` | [`Id`](Id.md) | - |
| `max_empty_searches?` | [`integer`](integer.md) | If a real-time datafeed has never seen any data (including during any initial training period), it automatically
stops and closes the associated job after this many real-time searches return no documents. In other words,
it stops after `frequency` times `max_empty_searches` of real-time operation. If not set, a datafeed with no
end time that sees no data remains started until it is explicitly stopped. By default, it is not set. |
| `query?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | The Elasticsearch query domain-specific language (DSL). This value corresponds to the query object in an
Elasticsearch search POST body. All the options that are supported by Elasticsearch can be used, as this
object is passed verbatim to Elasticsearch. Note that if you change the query, the analyzed data is also
changed. Therefore, the time required to learn might be long and the understandability of the results is
unpredictable. If you want to make significant changes to the source data, it is recommended that you
clone the job and datafeed and make the amendments in the clone. Let both run in parallel and close one
when you are satisfied with the results of the job. |
| `query_delay?` | [`Duration`](Duration.md) | The number of seconds behind real time that data is queried. For example, if data from 10:04 a.m. might
not be searchable in Elasticsearch until 10:06 a.m., set this property to 120 seconds. The default
value is randomly selected between `60s` and `120s`. This randomness improves the query performance
when there are multiple jobs running on the same node. |
| `runtime_mappings?` | [`MappingRuntimeFields`](MappingRuntimeFields.md) | Specifies runtime fields for the datafeed search. |
| `script_fields?` | `Record<string, ScriptField>` | Specifies scripts that evaluate custom expressions and returns script fields to the datafeed.
The detector configuration objects in a job can contain functions that use these script fields. |
| `scroll_size?` | [`integer`](integer.md) | The size parameter that is used in Elasticsearch searches when the datafeed does not use aggregations.
The maximum value is the value of `index.max_result_window`. |
| `body?` | `string | { [key: string]: any } & { datafeed_id?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_throttled?: never, ignore_unavailable?: never, aggregations?: never, chunking_config?: never, delayed_data_check_config?: never, frequency?: never, indices?: never, indexes?: never, indices_options?: never, job_id?: never, max_empty_searches?: never, query?: never, query_delay?: never, runtime_mappings?: never, script_fields?: never, scroll_size?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { datafeed_id?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_throttled?: never, ignore_unavailable?: never, aggregations?: never, chunking_config?: never, delayed_data_check_config?: never, frequency?: never, indices?: never, indexes?: never, indices_options?: never, job_id?: never, max_empty_searches?: never, query?: never, query_delay?: never, runtime_mappings?: never, script_fields?: never, scroll_size?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
