## Interface `MlDeleteTrainedModelAliasRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { model_alias?: never; model_id?: never; }) | All values in `body` will be added to the request body. |
| `model_alias` | [Name](./Name.md) | The model alias to delete. |
| `model_id` | [Id](./Id.md) | The trained model ID to which the model alias refers. |
| `querystring` | { [key: string]: any; } & { model_alias?: never; model_id?: never; } | All values in `querystring` will be added to the request querystring. |
