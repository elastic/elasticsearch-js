# `MlDataframeEvaluationRegressionMetricsHuber` [interface-MlDataframeEvaluationRegressionMetricsHuber]

| Name | Type | Description |
| - | - | - |
| `delta` | [double](./double.md) | Approximates 1/2 (prediction - actual)2 for values much less than delta and approximates a straight line with slope delta for values much larger than delta. Defaults to 1. Delta needs to be greater than 0. |
