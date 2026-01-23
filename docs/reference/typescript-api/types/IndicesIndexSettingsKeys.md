# IndicesIndexSettingsKeys

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | - |
| `mode?` | `string` | - |
| `routing_path?` | `string | string[]` | - |
| `soft_deletes?` | [`IndicesSoftDeletes`](IndicesSoftDeletes.md) | - |
| `sort?` | [`IndicesIndexSegmentSort`](IndicesIndexSegmentSort.md) | - |
| `number_of_shards?` | `integer | string` | - |
| `number_of_replicas?` | `integer | string` | - |
| `number_of_routing_shards?` | `integer` | - |
| `check_on_startup?` | [`IndicesIndexCheckOnStartup`](IndicesIndexCheckOnStartup.md) | - |
| `codec?` | `string` | - |
| `routing_partition_size?` | `SpecUtilsStringified<integer>` | - |
| `load_fixed_bitset_filters_eagerly?` | `boolean` | - |
| `hidden?` | `boolean | string` | - |
| `auto_expand_replicas?` | `SpecUtilsWithNullValue<string>` | - |
| `merge?` | [`IndicesMerge`](IndicesMerge.md) | - |
| `search?` | [`IndicesSettingsSearch`](IndicesSettingsSearch.md) | - |
| `refresh_interval?` | [`Duration`](Duration.md) | - |
| `max_result_window?` | `integer` | - |
| `max_inner_result_window?` | `integer` | - |
| `max_rescore_window?` | `integer` | - |
| `max_docvalue_fields_search?` | `integer` | - |
| `max_script_fields?` | `integer` | - |
| `max_ngram_diff?` | `integer` | - |
| `max_shingle_diff?` | `integer` | - |
| `blocks?` | [`IndicesIndexSettingBlocks`](IndicesIndexSettingBlocks.md) | - |
| `max_refresh_listeners?` | `integer` | - |
| `analyze?` | [`IndicesSettingsAnalyze`](IndicesSettingsAnalyze.md) | Settings to define analyzers, tokenizers, token filters and character filters.
Refer to the linked documentation for step-by-step examples of updating analyzers on existing indices. |
| `highlight?` | [`IndicesSettingsHighlight`](IndicesSettingsHighlight.md) | - |
| `max_terms_count?` | `integer` | - |
| `max_regex_length?` | `integer` | - |
| `routing?` | [`IndicesIndexRouting`](IndicesIndexRouting.md) | - |
| `gc_deletes?` | [`Duration`](Duration.md) | - |
| `default_pipeline?` | [`PipelineName`](PipelineName.md) | - |
| `final_pipeline?` | [`PipelineName`](PipelineName.md) | - |
| `lifecycle?` | [`IndicesIndexSettingsLifecycle`](IndicesIndexSettingsLifecycle.md) | - |
| `provided_name?` | [`Name`](Name.md) | - |
| `creation_date?` | `SpecUtilsStringified<EpochTime<UnitMillis>>` | - |
| `creation_date_string?` | [`DateTime`](DateTime.md) | - |
| `uuid?` | [`Uuid`](Uuid.md) | - |
| `version?` | [`IndicesIndexVersioning`](IndicesIndexVersioning.md) | - |
| `verified_before_close?` | `boolean | string` | - |
| `format?` | `string | integer` | - |
| `max_slices_per_scroll?` | `integer` | - |
| `translog?` | [`IndicesTranslog`](IndicesTranslog.md) | - |
| `query_string?` | [`IndicesSettingsQueryString`](IndicesSettingsQueryString.md) | - |
| `priority?` | `integer | string` | - |
| `top_metrics_max_size?` | `integer` | - |
| `analysis?` | [`IndicesIndexSettingsAnalysis`](IndicesIndexSettingsAnalysis.md) | - |
| `settings?` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | - |
| `time_series?` | [`IndicesIndexSettingsTimeSeries`](IndicesIndexSettingsTimeSeries.md) | - |
| `queries?` | [`IndicesQueries`](IndicesQueries.md) | - |
| `similarity?` | `Record<string, IndicesSettingsSimilarity>` | Configure custom similarity settings to customize how search results are scored. |
| `mapping?` | [`IndicesMappingLimitSettings`](IndicesMappingLimitSettings.md) | Enable or disable dynamic mapping for an index. |
| `'indexing.slowlog'?` | [`IndicesIndexingSlowlogSettings`](IndicesIndexingSlowlogSettings.md) | - |
| `indexing_pressure?` | [`IndicesIndexingPressure`](IndicesIndexingPressure.md) | Configure indexing back pressure limits. |
| `store?` | [`IndicesStorage`](IndicesStorage.md) | The store module allows you to control how index data is stored and accessed on disk. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
