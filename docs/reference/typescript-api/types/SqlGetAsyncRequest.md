# SqlGetAsyncRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The identifier for the search. |
| `delimiter?` | `string` | The separator for CSV results.
The API supports this parameter only for CSV responses. |
| `format?` | `string` | The format for the response.
You must specify a format using this parameter or the `Accept` HTTP header.
If you specify both, the API uses this parameter. |
| `keep_alive?` | [`Duration`](Duration.md) | The retention period for the search and its results.
It defaults to the `keep_alive` period for the original SQL search. |
| `wait_for_completion_timeout?` | [`Duration`](Duration.md) | The period to wait for complete results.
It defaults to no timeout, meaning the request waits for complete search results. |
| `body?` | `string | { [key: string]: any } & { id?: never, delimiter?: never, format?: never, keep_alive?: never, wait_for_completion_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, delimiter?: never, format?: never, keep_alive?: never, wait_for_completion_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
