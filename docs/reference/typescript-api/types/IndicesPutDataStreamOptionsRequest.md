# IndicesPutDataStreamOptionsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`DataStreamNames`](DataStreamNames.md) | Comma-separated list of data streams used to limit the request.
Supports wildcards (`*`).
To target all data streams use `*` or `_all`. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of data stream that wildcard patterns can match.
Supports comma-separated values, such as `open,hidden`. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. If no response is
received before the timeout expires, the request fails and returns an
error. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `failure_store?` | [`IndicesDataStreamFailureStore`](IndicesDataStreamFailureStore.md) | If defined, it will update the failure store configuration of every data stream resolved by the name expression. |
| `body?` | `string | { [key: string]: any } & { name?: never, expand_wildcards?: never, master_timeout?: never, timeout?: never, failure_store?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, expand_wildcards?: never, master_timeout?: never, timeout?: never, failure_store?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
