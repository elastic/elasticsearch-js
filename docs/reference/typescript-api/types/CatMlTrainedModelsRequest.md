# CatMlTrainedModelsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_id?` | [`Id`](Id.md) | A unique identifier for the trained model. |
| `allow_no_match?` | `boolean` | Specifies what to do when the request: contains wildcard expressions and there are no models that match; contains the `_all` string or no identifiers and there are no matches; contains wildcard expressions and there are only partial matches.
If `true`, the API returns an empty array when there are no matches and the subset of results when there are partial matches.
If `false`, the API returns a 404 status code when there are no matches or only partial matches. |
| `h?` | [`CatCatTrainedModelsColumns`](CatCatTrainedModelsColumns.md) | A comma-separated list of column names to display. |
| `s?` | [`CatCatTrainedModelsColumns`](CatCatTrainedModelsColumns.md) | A comma-separated list of column names or aliases used to sort the response. |
| `from?` | `integer` | Skips the specified number of transforms. |
| `size?` | `integer` | The maximum number of transforms to display. |
| `body?` | `string | { [key: string]: any } & { model_id?: never, allow_no_match?: never, h?: never, s?: never, from?: never, size?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { model_id?: never, allow_no_match?: never, h?: never, s?: never, from?: never, size?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
