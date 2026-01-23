# MlQuestionAnsweringInferenceUpdateOptions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `question` | `string` | The question to answer given the inference context |
| `num_top_classes?` | [`integer`](integer.md) | Specifies the number of top class predictions to return. Defaults to 0. |
| `tokenization?` | [`MlNlpTokenizationUpdateOptions`](MlNlpTokenizationUpdateOptions.md) | The tokenization options to update when inferring |
| `results_field?` | `string` | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `max_answer_length?` | [`integer`](integer.md) | The maximum answer length to consider for extraction |

## See Also

- [All Types](./)
- [API Methods](../index.md)
