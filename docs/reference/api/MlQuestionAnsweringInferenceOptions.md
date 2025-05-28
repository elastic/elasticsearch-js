# `MlQuestionAnsweringInferenceOptions` [interface-MlQuestionAnsweringInferenceOptions]

| Name | Type | Description |
| - | - | - |
| `max_answer_length` | [integer](./integer.md) | The maximum answer length to consider |
| `num_top_classes` | [integer](./integer.md) | Specifies the number of top class predictions to return. Defaults to 0. |
| `results_field` | string | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `tokenization` | [MlTokenizationConfigContainer](./MlTokenizationConfigContainer.md) | The tokenization options to update when inferring |
