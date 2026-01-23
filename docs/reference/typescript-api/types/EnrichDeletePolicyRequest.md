# EnrichDeletePolicyRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | Enrich policy to delete. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `body?` | `string | { [key: string]: any } & { name?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
