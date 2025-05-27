## Interface `MlGetTrainedModelsRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: - Contains wildcard expressions and there are no models that match. - Contains the _all string or no identifiers and there are no matches. - Contains wildcard expressions and there are only partial matches. If true, it returns an empty array when there are no matches and the subset of results when there are partial matches. |
| `body` | string | ({ [key: string]: any; } & { model_id?: never; allow_no_match?: never; decompress_definition?: never; exclude_generated?: never; from?: never; include?: never; size?: never; tags?: never; }) | All values in `body` will be added to the request body. |
| `decompress_definition` | boolean | Specifies whether the included model definition should be returned as a JSON map (true) or in a custom compressed format (false). |
| `exclude_generated` | boolean | Indicates if certain fields should be removed from the configuration on retrieval. This allows the configuration to be in an acceptable format to be retrieved and then added to another cluster. |
| `from` | [integer](./integer.md) | Skips the specified number of models. |
| `include` | [MlInclude](./MlInclude.md) | A comma delimited string of optional fields to include in the response body. |
| `model_id` | [Ids](./Ids.md) | The unique identifier of the trained model or a model alias. You can get information for multiple trained models in a single API request by using a comma-separated list of model IDs or a wildcard expression. |
| `querystring` | { [key: string]: any; } & { model_id?: never; allow_no_match?: never; decompress_definition?: never; exclude_generated?: never; from?: never; include?: never; size?: never; tags?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies the maximum number of models to obtain. |
| `tags` | string | string[] | A comma delimited string of tags. A trained model can have many tags, or none. When supplied, only trained models that contain all the supplied tags are returned. |
