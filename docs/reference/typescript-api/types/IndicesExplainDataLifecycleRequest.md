# IndicesExplainDataLifecycleRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | Comma-separated list of index names to explain |
| `include_defaults?` | `boolean` | Indicates if the API should return the default values the system uses for the index's lifecycle |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. |
| `body?` | `string | { [key: string]: any } & { index?: never, include_defaults?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, include_defaults?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
