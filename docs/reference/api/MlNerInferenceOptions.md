# `MlNerInferenceOptions` [interface-MlNerInferenceOptions]

| Name | Type | Description |
| - | - | - |
| `classification_labels` | string[] | The token classification labels. Must be IOB formatted tags |
| `results_field` | string | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `tokenization` | [MlTokenizationConfigContainer](./MlTokenizationConfigContainer.md) | The tokenization options |
| `vocabulary` | [MlVocabulary](./MlVocabulary.md) | &nbsp; |
