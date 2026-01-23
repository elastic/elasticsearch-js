# MlFillMaskInferenceOptions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `mask_token?` | `string` | The string/token which will be removed from incoming documents and replaced with the inference prediction(s).
In a response, this field contains the mask token for the specified model/tokenizer. Each model and tokenizer
has a predefined mask token which cannot be changed. Thus, it is recommended not to set this value in requests.
However, if this field is present in a request, its value must match the predefined value for that model/tokenizer,
otherwise the request will fail. |
| `num_top_classes?` | `integer` | Specifies the number of top class predictions to return. Defaults to 0. |
| `tokenization?` | [`MlTokenizationConfigContainer`](MlTokenizationConfigContainer.md) | The tokenization options to update when inferring |
| `results_field?` | `string` | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `vocabulary?` | [`MlVocabulary`](MlVocabulary.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
