# MlQuestionAnsweringInferenceOptions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `num_top_classes?` | `integer` | Specifies the number of top class predictions to return. Defaults to 0. |
| `tokenization?` | [`MlTokenizationConfigContainer`](MlTokenizationConfigContainer.md) | The tokenization options to update when inferring |
| `results_field?` | `string` | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `max_answer_length?` | `integer` | The maximum answer length to consider |

## See Also

- [All Types](./)
- [API Methods](../index.md)
