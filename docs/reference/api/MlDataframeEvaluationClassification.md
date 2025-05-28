# `MlDataframeEvaluationClassification` [interface-MlDataframeEvaluationClassification]

| Name | Type | Description |
| - | - | - |
| `actual_field` | [Field](./Field.md) | The field of the index which contains the ground truth. The data type of this field can be boolean or integer. If the data type is integer, the value has to be either 0 (false) or 1 (true). |
| `metrics` | [MlDataframeEvaluationClassificationMetrics](./MlDataframeEvaluationClassificationMetrics.md) | Specifies the metrics that are used for the evaluation. |
| `predicted_field` | [Field](./Field.md) | The field in the index which contains the predicted value, in other words the results of the classification analysis. |
| `top_classes_field` | [Field](./Field.md) | The field of the index which is an array of documents of the form { "class_name": XXX, "class_probability": YYY } . This field must be defined as nested in the mappings. |
