# TransformDeleteTransformRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `transform_id` | [`Id`](Id.md) | Identifier for the transform. |
| `force?` | `boolean` | If this value is false, the transform must be stopped before it can be deleted. If true, the transform is
deleted regardless of its current state. |
| `delete_dest_index?` | `boolean` | If this value is true, the destination index is deleted together with the transform. If false, the destination
index will not be deleted |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { transform_id?: never, force?: never, delete_dest_index?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { transform_id?: never, force?: never, delete_dest_index?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
