## Interface `TransformGetTransformRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: 1. Contains wildcard expressions and there are no transforms that match. 2. Contains the _all string or no identifiers and there are no matches. 3. Contains wildcard expressions and there are only partial matches. If this parameter is false, the request returns a 404 status code when there are no matches or only partial matches. |
| `body` | string | ({ [key: string]: any; } & { transform_id?: never; allow_no_match?: never; from?: never; size?: never; exclude_generated?: never; }) | All values in `body` will be added to the request body. |
| `exclude_generated` | boolean | Excludes fields that were automatically added when creating the transform. This allows the configuration to be in an acceptable format to be retrieved and then added to another cluster. |
| `from` | [integer](./integer.md) | Skips the specified number of transforms. |
| `querystring` | { [key: string]: any; } & { transform_id?: never; allow_no_match?: never; from?: never; size?: never; exclude_generated?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies the maximum number of transforms to obtain. |
| `transform_id` | [Names](./Names.md) | Identifier for the transform. It can be a transform identifier or a wildcard expression. You can get information for all transforms by using `_all`, by specifying `*` as the `<transform_id>`, or by omitting the `<transform_id>`. |
