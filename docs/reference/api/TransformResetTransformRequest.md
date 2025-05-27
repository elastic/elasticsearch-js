## Interface `TransformResetTransformRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { transform_id?: never; force?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `force` | boolean | If this value is `true`, the transform is reset regardless of its current state. If it's `false`, the transform must be stopped before it can be reset. |
| `querystring` | { [key: string]: any; } & { transform_id?: never; force?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `transform_id` | [Id](./Id.md) | Identifier for the transform. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It has a 64 character limit and must start and end with alphanumeric characters. |
