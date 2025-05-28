# `MlGetTrainedModelsStatsRequest` [interface-MlGetTrainedModelsStatsRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: - Contains wildcard expressions and there are no models that match. - Contains the _all string or no identifiers and there are no matches. - Contains wildcard expressions and there are only partial matches. If true, it returns an empty array when there are no matches and the subset of results when there are partial matches. |
| `body` | string | ({ [key: string]: any; } & { model_id?: never; allow_no_match?: never; from?: never; size?: never; }) | All values in `body` will be added to the request body. |
| `from` | [integer](./integer.md) | Skips the specified number of models. |
| `model_id` | [Ids](./Ids.md) | The unique identifier of the trained model or a model alias. It can be a comma-separated list or a wildcard expression. |
| `querystring` | { [key: string]: any; } & { model_id?: never; allow_no_match?: never; from?: never; size?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies the maximum number of models to obtain. |
