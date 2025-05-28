# `MlZeroShotClassificationInferenceUpdateOptions` [interface-MlZeroShotClassificationInferenceUpdateOptions]

| Name | Type | Description |
| - | - | - |
| `labels` | string[] | The labels to predict. |
| `multi_label` | boolean | Update the configured multi label option. Indicates if more than one true label exists. Defaults to the configured value. |
| `results_field` | string | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `tokenization` | [MlNlpTokenizationUpdateOptions](./MlNlpTokenizationUpdateOptions.md) | The tokenization options to update when inferring |
