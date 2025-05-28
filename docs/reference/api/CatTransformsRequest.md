# `CatTransformsRequest` [interface-CatTransformsRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: contains wildcard expressions and there are no transforms that match; contains the `_all` string or no identifiers and there are no matches; contains wildcard expressions and there are only partial matches. If `true`, it returns an empty transforms array when there are no matches and the subset of results when there are partial matches. If `false`, the request returns a 404 status code when there are no matches or only partial matches. |
| `body` | string | ({ [key: string]: any; } & { transform_id?: never; allow_no_match?: never; from?: never; h?: never; s?: never; time?: never; size?: never; }) | All values in `body` will be added to the request body. |
| `from` | [integer](./integer.md) | Skips the specified number of transforms. |
| `h` | [CatCatTransformColumns](./CatCatTransformColumns.md) | Comma-separated list of column names to display. |
| `querystring` | { [key: string]: any; } & { transform_id?: never; allow_no_match?: never; from?: never; h?: never; s?: never; time?: never; size?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [CatCatTransformColumns](./CatCatTransformColumns.md) | Comma-separated list of column names or column aliases used to sort the response. |
| `size` | [integer](./integer.md) | The maximum number of transforms to obtain. |
| `time` | [TimeUnit](./TimeUnit.md) | The unit used to display time values. |
| `transform_id` | [Id](./Id.md) | A transform identifier or a wildcard expression. If you do not specify one of these options, the API returns information for all transforms. |
