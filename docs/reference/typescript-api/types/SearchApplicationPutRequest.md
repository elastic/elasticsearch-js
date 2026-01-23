# SearchApplicationPutRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | The name of the search application to be created or updated. |
| `create?` | `boolean` | If `true`, this request cannot replace or update existing Search Applications. |
| `search_application?` | [`SearchApplicationSearchApplicationParameters`](SearchApplicationSearchApplicationParameters.md) | - |
| `body?` | `string | { [key: string]: any } & { name?: never, create?: never, search_application?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, create?: never, search_application?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
