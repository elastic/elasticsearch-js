## Interface `MlUpdateDataFrameAnalyticsRequest`

| Name | Type | Description |
| - | - | - |
| `allow_lazy_start` | boolean | Specifies whether this job can start when there is insufficient machine learning node capacity for it to be immediately assigned to a node. |
| `body` | string | ({ [key: string]: any; } & { id?: never; description?: never; model_memory_limit?: never; max_num_threads?: never; allow_lazy_start?: never; }) | All values in `body` will be added to the request body. |
| `description` | string | A description of the job. |
| `id` | [Id](./Id.md) | Identifier for the data frame analytics job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters. |
| `max_num_threads` | [integer](./integer.md) | The maximum number of threads to be used by the analysis. Using more threads may decrease the time necessary to complete the analysis at the cost of using more CPU. Note that the process may use additional threads for operational functionality other than the analysis itself. |
| `model_memory_limit` | string | The approximate maximum amount of memory resources that are permitted for analytical processing. If your `elasticsearch.yml` file contains an `xpack.ml.max_model_memory_limit` setting, an error occurs when you try to create data frame analytics jobs that have `model_memory_limit` values greater than that setting. |
| `querystring` | { [key: string]: any; } & { id?: never; description?: never; model_memory_limit?: never; max_num_threads?: never; allow_lazy_start?: never; } | All values in `querystring` will be added to the request querystring. |
