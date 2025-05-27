## Interface `MlClassificationInferenceOptions`

| Name | Type | Description |
| - | - | - |
| `num_top_classes` | [integer](./integer.md) | Specifies the number of top class predictions to return. Defaults to 0. |
| `num_top_feature_importance_values` | [integer](./integer.md) | Specifies the maximum number of feature importance values per document. |
| `prediction_field_type` | string | Specifies the type of the predicted field to write. Acceptable values are: string, number, boolean. When boolean is provided 1.0 is transformed to true and 0.0 to false. |
| `results_field` | string | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `top_classes_results_field` | string | Specifies the field to which the top classes are written. Defaults to top_classes. |
