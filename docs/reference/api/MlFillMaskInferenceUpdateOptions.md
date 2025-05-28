# `MlFillMaskInferenceUpdateOptions` [interface-MlFillMaskInferenceUpdateOptions]

| Name | Type | Description |
| - | - | - |
| `num_top_classes` | [integer](./integer.md) | Specifies the number of top class predictions to return. Defaults to 0. |
| `results_field` | string | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `tokenization` | [MlNlpTokenizationUpdateOptions](./MlNlpTokenizationUpdateOptions.md) | The tokenization options to update when inferring |
