# MlPutDataFrameAnalyticsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | Identifier for the data frame analytics job. This identifier can contain
lowercase alphanumeric characters (a-z and 0-9), hyphens, and
underscores. It must start and end with alphanumeric characters. |
| `allow_lazy_start?` | `boolean` | Specifies whether this job can start when there is insufficient machine
learning node capacity for it to be immediately assigned to a node. If
set to `false` and a machine learning node with capacity to run the job
cannot be immediately found, the API returns an error. If set to `true`,
the API does not return an error; the job waits in the `starting` state
until sufficient machine learning node capacity is available. This
behavior is also affected by the cluster-wide
`xpack.ml.max_lazy_ml_nodes` setting. |
| `analysis` | [`MlDataframeAnalysisContainer`](MlDataframeAnalysisContainer.md) | The analysis configuration, which contains the information necessary to
perform one of the following types of analysis: classification, outlier
detection, or regression. |
| `analyzed_fields?` | `MlDataframeAnalysisAnalyzedFields | string[]` | Specifies `includes` and/or `excludes` patterns to select which fields
will be included in the analysis. The patterns specified in `excludes`
are applied last, therefore `excludes` takes precedence. In other words,
if the same field is specified in both `includes` and `excludes`, then
the field will not be included in the analysis. If `analyzed_fields` is
not set, only the relevant fields will be included. For example, all the
numeric fields for outlier detection.
The supported fields vary for each type of analysis. Outlier detection
requires numeric or `boolean` data to analyze. The algorithms don’t
support missing values therefore fields that have data types other than
numeric or boolean are ignored. Documents where included fields contain
missing values, null values, or an array are also ignored. Therefore the
`dest` index may contain documents that don’t have an outlier score.
Regression supports fields that are numeric, `boolean`, `text`,
`keyword`, and `ip` data types. It is also tolerant of missing values.
Fields that are supported are included in the analysis, other fields are
ignored. Documents where included fields contain an array with two or
more values are also ignored. Documents in the `dest` index that don’t
contain a results field are not included in the regression analysis.
Classification supports fields that are numeric, `boolean`, `text`,
`keyword`, and `ip` data types. It is also tolerant of missing values.
Fields that are supported are included in the analysis, other fields are
ignored. Documents where included fields contain an array with two or
more values are also ignored. Documents in the `dest` index that don’t
contain a results field are not included in the classification analysis.
Classification analysis can be improved by mapping ordinal variable
values to a single number. For example, in case of age ranges, you can
model the values as `0-14 = 0`, `15-24 = 1`, `25-34 = 2`, and so on. |
| `description?` | `string` | A description of the job. |
| `dest` | [`MlDataframeAnalyticsDestination`](MlDataframeAnalyticsDestination.md) | The destination configuration. |
| `max_num_threads?` | [`integer`](integer.md) | The maximum number of threads to be used by the analysis. Using more
threads may decrease the time necessary to complete the analysis at the
cost of using more CPU. Note that the process may use additional threads
for operational functionality other than the analysis itself. |
| `_meta?` | [`Metadata`](Metadata.md) | - |
| `model_memory_limit?` | `string` | The approximate maximum amount of memory resources that are permitted for
analytical processing. If your `elasticsearch.yml` file contains an
`xpack.ml.max_model_memory_limit` setting, an error occurs when you try
to create data frame analytics jobs that have `model_memory_limit` values
greater than that setting. |
| `source` | [`MlDataframeAnalyticsSource`](MlDataframeAnalyticsSource.md) | The configuration of how to source the analysis data. |
| `headers?` | [`HttpHeaders`](HttpHeaders.md) | - |
| `version?` | [`VersionString`](VersionString.md) | - |
| `body?` | `string | { [key: string]: any } & { id?: never, allow_lazy_start?: never, analysis?: never, analyzed_fields?: never, description?: never, dest?: never, max_num_threads?: never, _meta?: never, model_memory_limit?: never, source?: never, headers?: never, version?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, allow_lazy_start?: never, analysis?: never, analyzed_fields?: never, description?: never, dest?: never, max_num_threads?: never, _meta?: never, model_memory_limit?: never, source?: never, headers?: never, version?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
