# IndicesDeleteDataStreamRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`DataStreamNames`](DataStreamNames.md) | Comma-separated list of data streams to delete. Wildcard (`*`) expressions are supported. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of data stream that wildcard patterns can match. Supports comma-separated values,such as `open,hidden`. |
| `body?` | `string | { [key: string]: any } & { name?: never, master_timeout?: never, expand_wildcards?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, master_timeout?: never, expand_wildcards?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
