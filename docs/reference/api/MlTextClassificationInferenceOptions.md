# `MlTextClassificationInferenceOptions` [interface-MlTextClassificationInferenceOptions]

| Name | Type | Description |
| - | - | - |
| `classification_labels` | string[] | Classification labels to apply other than the stored labels. Must have the same deminsions as the default configured labels |
| `num_top_classes` | [integer](./integer.md) | Specifies the number of top class predictions to return. Defaults to 0. |
| `results_field` | string | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `tokenization` | [MlTokenizationConfigContainer](./MlTokenizationConfigContainer.md) | The tokenization options |
| `vocabulary` | [MlVocabulary](./MlVocabulary.md) | &nbsp; |
