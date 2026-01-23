# MlOutlierDetectionParameters

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `compute_feature_influence?` | `boolean` | Specifies whether the feature influence calculation is enabled. |
| `feature_influence_threshold?` | [`double`](double.md) | The minimum outlier score that a document needs to have in order to calculate its feature influence score.
Value range: 0-1 |
| `method?` | `string` | The method that outlier detection uses.
Available methods are `lof`, `ldof`, `distance_kth_nn`, `distance_knn`, and `ensemble`.
The default value is ensemble, which means that outlier detection uses an ensemble of different methods and normalises and combines their individual outlier scores to obtain the overall outlier score. |
| `n_neighbors?` | [`integer`](integer.md) | Defines the value for how many nearest neighbors each method of outlier detection uses to calculate its outlier score.
When the value is not set, different values are used for different ensemble members.
This default behavior helps improve the diversity in the ensemble; only override it if you are confident that the value you choose is appropriate for the data set. |
| `outlier_fraction?` | [`double`](double.md) | The proportion of the data set that is assumed to be outlying prior to outlier detection.
For example, 0.05 means it is assumed that 5% of values are real outliers and 95% are inliers. |
| `standardization_enabled?` | `boolean` | If `true`, the following operation is performed on the columns before computing outlier scores: (x_i - mean(x_i)) / sd(x_i). |

## See Also

- [All Types](./)
- [API Methods](../index.md)
