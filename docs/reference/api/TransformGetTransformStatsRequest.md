# `TransformGetTransformStatsRequest` [interface-TransformGetTransformStatsRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: 1. Contains wildcard expressions and there are no transforms that match. 2. Contains the _all string or no identifiers and there are no matches. 3. Contains wildcard expressions and there are only partial matches. If this parameter is false, the request returns a 404 status code when there are no matches or only partial matches. |
| `body` | string | ({ [key: string]: any; } & { transform_id?: never; allow_no_match?: never; from?: never; size?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `from` | [long](./long.md) | Skips the specified number of transforms. |
| `querystring` | { [key: string]: any; } & { transform_id?: never; allow_no_match?: never; from?: never; size?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [long](./long.md) | Specifies the maximum number of transforms to obtain. |
| `timeout` | [Duration](./Duration.md) | Controls the time to wait for the stats |
| `transform_id` | [Names](./Names.md) | Identifier for the transform. It can be a transform identifier or a wildcard expression. You can get information for all transforms by using `_all`, by specifying `*` as the `<transform_id>`, or by omitting the `<transform_id>`. |
