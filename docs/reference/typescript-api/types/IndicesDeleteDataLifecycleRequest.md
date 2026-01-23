# IndicesDeleteDataLifecycleRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`DataStreamNames`](DataStreamNames.md) | A comma-separated list of data streams of which the data stream lifecycle will be deleted.
Use `*` to get all data streams |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Whether wildcard expressions should get expanded to open or closed indices (default: open) |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response. |
| `body?` | `string | { [key: string]: any } & { name?: never, expand_wildcards?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, expand_wildcards?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
