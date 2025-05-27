## Interface `IngestInferenceConfigClassification`

| Name | Type | Description |
| - | - | - |
| `num_top_classes` | [integer](./integer.md) | Specifies the number of top class predictions to return. |
| `num_top_feature_importance_values` | [integer](./integer.md) | Specifies the maximum number of feature importance values per document. |
| `prediction_field_type` | string | Specifies the type of the predicted field to write. Valid values are: `string`, `number`, `boolean`. |
| `results_field` | [Field](./Field.md) | The field that is added to incoming documents to contain the inference prediction. |
| `top_classes_results_field` | [Field](./Field.md) | Specifies the field to which the top classes are written. |
