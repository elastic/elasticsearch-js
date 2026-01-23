# TransformStopTransformRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `transform_id` | [`Name`](Name.md) | Identifier for the transform. To stop multiple transforms, use a comma-separated list or a wildcard expression.
To stop all transforms, use `_all` or `*` as the identifier. |
| `allow_no_match?` | `boolean` | Specifies what to do when the request: contains wildcard expressions and there are no transforms that match;
contains the `_all` string or no identifiers and there are no matches; contains wildcard expressions and there
are only partial matches.

If it is true, the API returns a successful acknowledgement message when there are no matches. When there are
only partial matches, the API stops the appropriate transforms.

If it is false, the request returns a 404 status code when there are no matches or only partial matches. |
| `force?` | `boolean` | If it is true, the API forcefully stops the transforms. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response when `wait_for_completion` is `true`. If no response is received before the
timeout expires, the request returns a timeout exception. However, the request continues processing and
eventually moves the transform to a STOPPED state. |
| `wait_for_checkpoint?` | `boolean` | If it is true, the transform does not completely stop until the current checkpoint is completed. If it is false,
the transform stops as soon as possible. |
| `wait_for_completion?` | `boolean` | If it is true, the API blocks until the indexer state completely stops. If it is false, the API returns
immediately and the indexer is stopped asynchronously in the background. |
| `body?` | `string | { [key: string]: any } & { transform_id?: never, allow_no_match?: never, force?: never, timeout?: never, wait_for_checkpoint?: never, wait_for_completion?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { transform_id?: never, allow_no_match?: never, force?: never, timeout?: never, wait_for_checkpoint?: never, wait_for_completion?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
