# SecurityHasPrivilegesRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `user?` | [`Name`](Name.md) | Username |
| `application?` | `SecurityHasPrivilegesApplicationPrivilegesCheck[]` | - |
| `cluster?` | `SecurityClusterPrivilege[]` | A list of the cluster privileges that you want to check. |
| `index?` | `SecurityHasPrivilegesIndexPrivilegesCheck[]` | - |
| `body?` | `string | { [key: string]: any } & { user?: never, application?: never, cluster?: never, index?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { user?: never, application?: never, cluster?: never, index?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
