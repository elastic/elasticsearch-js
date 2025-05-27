## Interface `MlExplainDataFrameAnalyticsRequest`

| Name | Type | Description |
| - | - | - |
| `allow_lazy_start` | boolean | Specifies whether this job can start when there is insufficient machine learning node capacity for it to be immediately assigned to a node. |
| `analysis` | [MlDataframeAnalysisContainer](./MlDataframeAnalysisContainer.md) | The analysis configuration, which contains the information necessary to perform one of the following types of analysis: classification, outlier detection, or regression. |
| `analyzed_fields` | [MlDataframeAnalysisAnalyzedFields](./MlDataframeAnalysisAnalyzedFields.md) | string[] | Specify includes and/or excludes patterns to select which fields will be included in the analysis. The patterns specified in excludes are applied last, therefore excludes takes precedence. In other words, if the same field is specified in both includes and excludes, then the field will not be included in the analysis. |
| `body` | string | ({ [key: string]: any; } & { id?: never; source?: never; dest?: never; analysis?: never; description?: never; model_memory_limit?: never; max_num_threads?: never; analyzed_fields?: never; allow_lazy_start?: never; }) | All values in `body` will be added to the request body. |
| `description` | string | A description of the job. |
| `dest` | [MlDataframeAnalyticsDestination](./MlDataframeAnalyticsDestination.md) | The destination configuration, consisting of index and optionally results_field (ml by default). |
| `id` | [Id](./Id.md) | Identifier for the data frame analytics job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters. |
| `max_num_threads` | [integer](./integer.md) | The maximum number of threads to be used by the analysis. Using more threads may decrease the time necessary to complete the analysis at the cost of using more CPU. Note that the process may use additional threads for operational functionality other than the analysis itself. |
| `model_memory_limit` | string | The approximate maximum amount of memory resources that are permitted for analytical processing. If your `elasticsearch.yml` file contains an `xpack.ml.max_model_memory_limit` setting, an error occurs when you try to create data frame analytics jobs that have `model_memory_limit` values greater than that setting. |
| `querystring` | { [key: string]: any; } & { id?: never; source?: never; dest?: never; analysis?: never; description?: never; model_memory_limit?: never; max_num_threads?: never; analyzed_fields?: never; allow_lazy_start?: never; } | All values in `querystring` will be added to the request querystring. |
| `source` | [MlDataframeAnalyticsSource](./MlDataframeAnalyticsSource.md) | The configuration of how to source the analysis data. It requires an index. Optionally, query and _source may be specified. |
