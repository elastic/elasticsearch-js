# CcrGetAutoFollowPatternRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name?` | [`Name`](Name.md) | The auto-follow pattern collection that you want to retrieve.
If you do not specify a name, the API returns information for all collections. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node.
If the master node is not available before the timeout expires, the request fails and returns an error.
It can also be set to `-1` to indicate that the request should never timeout. |
| `body?` | `string | { [key: string]: any } & { name?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
