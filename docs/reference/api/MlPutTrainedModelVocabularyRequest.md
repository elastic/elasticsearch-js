## Interface `MlPutTrainedModelVocabularyRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { model_id?: never; vocabulary?: never; merges?: never; scores?: never; }) | All values in `body` will be added to the request body. |
| `merges` | string[] | The optional model merges if required by the tokenizer. |
| `model_id` | [Id](./Id.md) | The unique identifier of the trained model. |
| `querystring` | { [key: string]: any; } & { model_id?: never; vocabulary?: never; merges?: never; scores?: never; } | All values in `querystring` will be added to the request querystring. |
| `scores` | [double](./double.md)[] | The optional vocabulary value scores if required by the tokenizer. |
| `vocabulary` | string[] | The model vocabulary, which must not be empty. |
