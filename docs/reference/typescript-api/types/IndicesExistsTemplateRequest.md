# IndicesExistsTemplateRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Names`](Names.md) | A comma-separated list of index template names used to limit the request.
Wildcard (`*`) expressions are supported. |
| `flat_settings?` | `boolean` | Indicates whether to use a flat format for the response. |
| `local?` | `boolean` | Indicates whether to get information from the local node only. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for the master node.
If the master node is not available before the timeout expires, the request fails and returns an error.
To indicate that the request should never timeout, set it to `-1`. |
| `body?` | `string | { [key: string]: any } & { name?: never, flat_settings?: never, local?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, flat_settings?: never, local?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
