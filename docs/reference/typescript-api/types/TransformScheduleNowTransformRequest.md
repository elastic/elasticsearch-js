# TransformScheduleNowTransformRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `transform_id` | [`Id`](Id.md) | Identifier for the transform. |
| `timeout?` | [`Duration`](Duration.md) | Controls the time to wait for the scheduling to take place |
| `body?` | `string | { [key: string]: any } & { transform_id?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { transform_id?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
