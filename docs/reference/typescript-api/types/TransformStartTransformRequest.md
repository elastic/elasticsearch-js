# TransformStartTransformRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `transform_id` | [`Id`](Id.md) | Identifier for the transform. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `from?` | `string` | Restricts the set of transformed entities to those changed after this time. Relative times like now-30d are supported. Only applicable for continuous transforms. |
| `body?` | `string | { [key: string]: any } & { transform_id?: never, timeout?: never, from?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { transform_id?: never, timeout?: never, from?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
