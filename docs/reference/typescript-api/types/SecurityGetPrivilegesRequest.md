# SecurityGetPrivilegesRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `application?` | [`Name`](Name.md) | The name of the application.
Application privileges are always associated with exactly one application.
If you do not specify this parameter, the API returns information about all privileges for all applications. |
| `name?` | [`Names`](Names.md) | The name of the privilege.
If you do not specify this parameter, the API returns information about all privileges for the requested application. |
| `body?` | `string | { [key: string]: any } & { application?: never, name?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { application?: never, name?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
