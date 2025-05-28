# `MlDataframeEvaluationOutlierDetection` [interface-MlDataframeEvaluationOutlierDetection]

| Name | Type | Description |
| - | - | - |
| `actual_field` | [Field](./Field.md) | The field of the index which contains the ground truth. The data type of this field can be boolean or integer. If the data type is integer, the value has to be either 0 (false) or 1 (true). |
| `metrics` | [MlDataframeEvaluationOutlierDetectionMetrics](./MlDataframeEvaluationOutlierDetectionMetrics.md) | Specifies the metrics that are used for the evaluation. |
| `predicted_probability_field` | [Field](./Field.md) | The field of the index that defines the probability of whether the item belongs to the class in question or not. It’s the field that contains the results of the analysis. |
