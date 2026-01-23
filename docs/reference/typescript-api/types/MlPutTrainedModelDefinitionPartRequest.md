# MlPutTrainedModelDefinitionPartRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_id` | [`Id`](Id.md) | The unique identifier of the trained model. |
| `part` | `integer` | The definition part number. When the definition is loaded for inference the definition parts are streamed in the
order of their part number. The first part must be `0` and the final part must be `total_parts - 1`. |
| `definition` | `string` | The definition part for the model. Must be a base64 encoded string. |
| `total_definition_length` | `long` | The total uncompressed definition length in bytes. Not base64 encoded. |
| `total_parts` | `integer` | The total number of parts that will be uploaded. Must be greater than 0. |
| `body?` | `string | { [key: string]: any } & { model_id?: never, part?: never, definition?: never, total_definition_length?: never, total_parts?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { model_id?: never, part?: never, definition?: never, total_definition_length?: never, total_parts?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
