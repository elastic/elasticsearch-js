## Interface `CatMlTrainedModelsRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: contains wildcard expressions and there are no models that match; contains the `_all` string or no identifiers and there are no matches; contains wildcard expressions and there are only partial matches. If `true`, the API returns an empty array when there are no matches and the subset of results when there are partial matches. If `false`, the API returns a 404 status code when there are no matches or only partial matches. |
| `body` | string | ({ [key: string]: any; } & { model_id?: never; allow_no_match?: never; bytes?: never; h?: never; s?: never; from?: never; size?: never; time?: never; }) | All values in `body` will be added to the request body. |
| `bytes` | [Bytes](./Bytes.md) | The unit used to display byte values. |
| `from` | [integer](./integer.md) | Skips the specified number of transforms. |
| `h` | [CatCatTrainedModelsColumns](./CatCatTrainedModelsColumns.md) | A comma-separated list of column names to display. |
| `model_id` | [Id](./Id.md) | A unique identifier for the trained model. |
| `querystring` | { [key: string]: any; } & { model_id?: never; allow_no_match?: never; bytes?: never; h?: never; s?: never; from?: never; size?: never; time?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [CatCatTrainedModelsColumns](./CatCatTrainedModelsColumns.md) | A comma-separated list of column names or aliases used to sort the response. |
| `size` | [integer](./integer.md) | The maximum number of transforms to display. |
| `time` | [TimeUnit](./TimeUnit.md) | Unit used to display time values. |
