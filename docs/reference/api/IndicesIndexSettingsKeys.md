## Interface `IndicesIndexSettingsKeys`

| Name | Type | Description |
| - | - | - |
| `"indexing.slowlog"` | [IndicesIndexingSlowlogSettings](./IndicesIndexingSlowlogSettings.md) | &nbsp; |
| `analysis` | [IndicesIndexSettingsAnalysis](./IndicesIndexSettingsAnalysis.md) | &nbsp; |
| `analyze` | [IndicesSettingsAnalyze](./IndicesSettingsAnalyze.md) | Settings to define analyzers, tokenizers, token filters and character filters. |
| `auto_expand_replicas` | [SpecUtilsWithNullValue](./SpecUtilsWithNullValue.md)<string> | &nbsp; |
| `blocks` | [IndicesIndexSettingBlocks](./IndicesIndexSettingBlocks.md) | &nbsp; |
| `check_on_startup` | [IndicesIndexCheckOnStartup](./IndicesIndexCheckOnStartup.md) | &nbsp; |
| `codec` | string | &nbsp; |
| `creation_date_string` | [DateTime](./DateTime.md) | &nbsp; |
| `creation_date` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)>> | &nbsp; |
| `default_pipeline` | [PipelineName](./PipelineName.md) | &nbsp; |
| `final_pipeline` | [PipelineName](./PipelineName.md) | &nbsp; |
| `format` | string | [integer](./integer.md) | &nbsp; |
| `gc_deletes` | [Duration](./Duration.md) | &nbsp; |
| `hidden` | boolean | string | &nbsp; |
| `highlight` | [IndicesSettingsHighlight](./IndicesSettingsHighlight.md) | &nbsp; |
| `index` | [IndicesIndexSettings](./IndicesIndexSettings.md) | &nbsp; |
| `indexing_pressure` | [IndicesIndexingPressure](./IndicesIndexingPressure.md) | Configure indexing back pressure limits. |
| `lifecycle` | [IndicesIndexSettingsLifecycle](./IndicesIndexSettingsLifecycle.md) | &nbsp; |
| `load_fixed_bitset_filters_eagerly` | boolean | &nbsp; |
| `mapping` | [IndicesMappingLimitSettings](./IndicesMappingLimitSettings.md) | Enable or disable dynamic mapping for an index. |
| `max_docvalue_fields_search` | [integer](./integer.md) | &nbsp; |
| `max_inner_result_window` | [integer](./integer.md) | &nbsp; |
| `max_ngram_diff` | [integer](./integer.md) | &nbsp; |
| `max_refresh_listeners` | [integer](./integer.md) | &nbsp; |
| `max_regex_length` | [integer](./integer.md) | &nbsp; |
| `max_rescore_window` | [integer](./integer.md) | &nbsp; |
| `max_result_window` | [integer](./integer.md) | &nbsp; |
| `max_script_fields` | [integer](./integer.md) | &nbsp; |
| `max_shingle_diff` | [integer](./integer.md) | &nbsp; |
| `max_slices_per_scroll` | [integer](./integer.md) | &nbsp; |
| `max_terms_count` | [integer](./integer.md) | &nbsp; |
| `merge` | [IndicesMerge](./IndicesMerge.md) | &nbsp; |
| `mode` | string | &nbsp; |
| `number_of_replicas` | [integer](./integer.md) | string | &nbsp; |
| `number_of_routing_shards` | [integer](./integer.md) | &nbsp; |
| `number_of_shards` | [integer](./integer.md) | string | &nbsp; |
| `priority` | [integer](./integer.md) | string | &nbsp; |
| `provided_name` | [Name](./Name.md) | &nbsp; |
| `queries` | [IndicesQueries](./IndicesQueries.md) | &nbsp; |
| `query_string` | [IndicesSettingsQueryString](./IndicesSettingsQueryString.md) | &nbsp; |
| `refresh_interval` | [Duration](./Duration.md) | &nbsp; |
| `routing_partition_size` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[integer](./integer.md)> | &nbsp; |
| `routing_path` | string | string[] | &nbsp; |
| `routing` | [IndicesIndexRouting](./IndicesIndexRouting.md) | &nbsp; |
| `search` | [IndicesSettingsSearch](./IndicesSettingsSearch.md) | &nbsp; |
| `settings` | [IndicesIndexSettings](./IndicesIndexSettings.md) | &nbsp; |
| `similarity` | Record<string, [IndicesSettingsSimilarity](./IndicesSettingsSimilarity.md)> | Configure custom similarity settings to customize how search results are scored. |
| `soft_deletes` | [IndicesSoftDeletes](./IndicesSoftDeletes.md) | &nbsp; |
| `sort` | [IndicesIndexSegmentSort](./IndicesIndexSegmentSort.md) | &nbsp; |
| `store` | [IndicesStorage](./IndicesStorage.md) | The store module allows you to control how index data is stored and accessed on disk. |
| `time_series` | [IndicesIndexSettingsTimeSeries](./IndicesIndexSettingsTimeSeries.md) | &nbsp; |
| `top_metrics_max_size` | [integer](./integer.md) | &nbsp; |
| `translog` | [IndicesTranslog](./IndicesTranslog.md) | &nbsp; |
| `uuid` | [Uuid](./Uuid.md) | &nbsp; |
| `verified_before_close` | boolean | string | &nbsp; |
| `version` | [IndicesIndexVersioning](./IndicesIndexVersioning.md) | &nbsp; |
