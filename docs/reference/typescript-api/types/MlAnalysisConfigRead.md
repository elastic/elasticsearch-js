# MlAnalysisConfigRead

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `bucket_span` | [`Duration`](Duration.md) | The size of the interval that the analysis is aggregated into, typically between `5m` and `1h`. |
| `categorization_analyzer?` | [`MlCategorizationAnalyzer`](MlCategorizationAnalyzer.md) | If `categorization_field_name` is specified, you can also define the analyzer that is used to interpret the categorization field.
This property cannot be used at the same time as `categorization_filters`.
The categorization analyzer specifies how the `categorization_field` is interpreted by the categorization process. |
| `categorization_field_name?` | [`Field`](Field.md) | If this property is specified, the values of the specified field will be categorized.
The resulting categories must be used in a detector by setting `by_field_name`, `over_field_name`, or `partition_field_name` to the keyword `mlcategory`. |
| `categorization_filters?` | `string[]` | If `categorization_field_name` is specified, you can also define optional filters.
This property expects an array of regular expressions.
The expressions are used to filter out matching sequences from the categorization field values. |
| `detectors` | `MlDetectorRead[]` | An array of detector configuration objects.
Detector configuration objects specify which data fields a job analyzes.
They also specify which analytical functions are used.
You can specify multiple detectors for a job. |
| `influencers` | `Field[]` | A comma separated list of influencer field names.
Typically these can be the by, over, or partition fields that are used in the detector configuration.
You might also want to use a field name that is not specifically named in a detector, but is available as part of the input data.
When you use multiple detectors, the use of influencers is recommended as it aggregates results for each influencer entity. |
| `model_prune_window?` | [`Duration`](Duration.md) | Advanced configuration option.
Affects the pruning of models that have not been updated for the given time duration.
The value must be set to a multiple of the `bucket_span`.
If set too low, important information may be removed from the model.
Typically, set to `30d` or longer.
If not set, model pruning only occurs if the model memory status reaches the soft limit or the hard limit.
For jobs created in 8.1 and later, the default value is the greater of `30d` or 20 times `bucket_span`. |
| `latency?` | [`Duration`](Duration.md) | The size of the window in which to expect data that is out of time order.
Defaults to no latency.
If you specify a non-zero value, it must be greater than or equal to one second. |
| `multivariate_by_fields?` | `boolean` | This functionality is reserved for internal use.
It is not supported for use in customer environments and is not subject to the support SLA of official GA features.
If set to `true`, the analysis will automatically find correlations between metrics for a given by field value and report anomalies when those correlations cease to hold. |
| `per_partition_categorization?` | [`MlPerPartitionCategorization`](MlPerPartitionCategorization.md) | Settings related to how categorization interacts with partition fields. |
| `summary_count_field_name?` | [`Field`](Field.md) | If this property is specified, the data that is fed to the job is expected to be pre-summarized.
This property value is the name of the field that contains the count of raw data points that have been summarized.
The same `summary_count_field_name` applies to all detectors in the job. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
