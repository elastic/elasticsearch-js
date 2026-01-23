# IndicesGetDataStreamMappingsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Indices`](Indices.md) | A comma-separated list of data streams or data stream patterns. Supports wildcards (`*`). |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. If no response is
received before the timeout expires, the request fails and returns an
error. |
| `body?` | `string | { [key: string]: any } & { name?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
