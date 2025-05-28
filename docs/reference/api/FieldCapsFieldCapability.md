# `FieldCapsFieldCapability` [interface-FieldCapsFieldCapability]

| Name | Type | Description |
| - | - | - |
| `aggregatable` | boolean | Whether this field can be aggregated on all indices. |
| `indices` | [Indices](./Indices.md) | The list of indices where this field has the same type family, or null if all indices have the same type family for the field. |
| `meta` | [Metadata](./Metadata.md) | Merged metadata across all indices as a map of string keys to arrays of values. A value length of 1 indicates that all indices had the same value for this key, while a length of 2 or more indicates that not all indices had the same value for this key. |
| `metadata_field` | boolean | Whether this field is registered as a metadata field. |
| `metric_conflicts_indices` | [IndexName](./IndexName.md)[] | The list of indices where this field is present if these indices don’t have the same `time_series_metric` value for this field. |
| `non_aggregatable_indices` | [Indices](./Indices.md) | The list of indices where this field is not aggregatable, or null if all indices have the same definition for the field. |
| `non_dimension_indices` | [IndexName](./IndexName.md)[] | If this list is present in response then some indices have the field marked as a dimension and other indices, the ones in this list, do not. |
| `non_searchable_indices` | [Indices](./Indices.md) | The list of indices where this field is not searchable, or null if all indices have the same definition for the field. |
| `searchable` | boolean | Whether this field is indexed for search on all indices. |
| `time_series_dimension` | boolean | Whether this field is used as a time series dimension. |
| `time_series_metric` | [MappingTimeSeriesMetricType](./MappingTimeSeriesMetricType.md) | Contains metric type if this fields is used as a time series metrics, absent if the field is not used as metric. |
| `type` | string | &nbsp; |
