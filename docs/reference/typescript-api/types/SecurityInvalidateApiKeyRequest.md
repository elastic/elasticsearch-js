# SecurityInvalidateApiKeyRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | [`Id`](Id.md) | - |
| `ids?` | [`Id`](Id.md)[] | A list of API key ids.
This parameter cannot be used with any of `name`, `realm_name`, or `username`. |
| `name?` | [`Name`](Name.md) | An API key name.
This parameter cannot be used with any of `ids`, `realm_name` or `username`. |
| `owner?` | `boolean` | Query API keys owned by the currently authenticated user.
The `realm_name` or `username` parameters cannot be specified when this parameter is set to `true` as they are assumed to be the currently authenticated ones.

NOTE: At least one of `ids`, `name`, `username`, and `realm_name` must be specified if `owner` is `false`. |
| `realm_name?` | `string` | The name of an authentication realm.
This parameter cannot be used with either `ids` or `name`, or when `owner` flag is set to `true`. |
| `username?` | [`Username`](Username.md) | The username of a user.
This parameter cannot be used with either `ids` or `name` or when `owner` flag is set to `true`. |
| `body?` | `string | { [key: string]: any } & { id?: never, ids?: never, name?: never, owner?: never, realm_name?: never, username?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, ids?: never, name?: never, owner?: never, realm_name?: never, username?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
