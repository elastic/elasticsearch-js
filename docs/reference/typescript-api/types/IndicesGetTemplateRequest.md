# IndicesGetTemplateRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name?` | [`Names`](Names.md) | Comma-separated list of index template names used to limit the request.
Wildcard (`*`) expressions are supported.
To return all index templates, omit this parameter or use a value of `_all` or `*`. |
| `flat_settings?` | `boolean` | If `true`, returns settings in flat format. |
| `local?` | `boolean` | If `true`, the request retrieves information from the local node only. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { name?: never, flat_settings?: never, local?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, flat_settings?: never, local?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
