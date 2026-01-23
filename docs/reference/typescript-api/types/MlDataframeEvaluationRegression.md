# MlDataframeEvaluationRegression

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `actual_field` | [`Field`](Field.md) | The field of the index which contains the ground truth. The data type of this field must be numerical. |
| `predicted_field` | [`Field`](Field.md) | The field in the index that contains the predicted value, in other words the results of the regression analysis. |
| `metrics?` | [`MlDataframeEvaluationRegressionMetrics`](MlDataframeEvaluationRegressionMetrics.md) | Specifies the metrics that are used for the evaluation. For more information on mse, msle, and huber, consult the Jupyter notebook on regression loss functions. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
