# `MlPutTrainedModelDefinitionPartRequest` [interface-MlPutTrainedModelDefinitionPartRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { model_id?: never; part?: never; definition?: never; total_definition_length?: never; total_parts?: never; }) | All values in `body` will be added to the request body. |
| `definition` | string | The definition part for the model. Must be a base64 encoded string. |
| `model_id` | [Id](./Id.md) | The unique identifier of the trained model. |
| `part` | [integer](./integer.md) | The definition part number. When the definition is loaded for inference the definition parts are streamed in the order of their part number. The first part must be `0` and the final part must be `total_parts - 1`. |
| `querystring` | { [key: string]: any; } & { model_id?: never; part?: never; definition?: never; total_definition_length?: never; total_parts?: never; } | All values in `querystring` will be added to the request querystring. |
| `total_definition_length` | [long](./long.md) | The total uncompressed definition length in bytes. Not base64 encoded. |
| `total_parts` | [integer](./integer.md) | The total number of parts that will be uploaded. Must be greater than 0. |
