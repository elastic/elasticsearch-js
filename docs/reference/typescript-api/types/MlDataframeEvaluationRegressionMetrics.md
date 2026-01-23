# MlDataframeEvaluationRegressionMetrics

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `mse?` | `Record<string, any>` | Average squared difference between the predicted values and the actual (ground truth) value. For more information, read this wiki article. |
| `msle?` | [`MlDataframeEvaluationRegressionMetricsMsle`](MlDataframeEvaluationRegressionMetricsMsle.md) | Average squared difference between the logarithm of the predicted values and the logarithm of the actual (ground truth) value. |
| `huber?` | [`MlDataframeEvaluationRegressionMetricsHuber`](MlDataframeEvaluationRegressionMetricsHuber.md) | Pseudo Huber loss function. |
| `r_squared?` | `Record<string, any>` | Proportion of the variance in the dependent variable that is predictable from the independent variables. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
