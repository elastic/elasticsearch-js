# MlPutTrainedModelVocabularyRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_id` | [`Id`](Id.md) | The unique identifier of the trained model. |
| `vocabulary` | `string[]` | The model vocabulary, which must not be empty. |
| `merges?` | `string[]` | The optional model merges if required by the tokenizer. |
| `scores?` | `double[]` | The optional vocabulary value scores if required by the tokenizer. |
| `body?` | `string | { [key: string]: any } & { model_id?: never, vocabulary?: never, merges?: never, scores?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { model_id?: never, vocabulary?: never, merges?: never, scores?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
