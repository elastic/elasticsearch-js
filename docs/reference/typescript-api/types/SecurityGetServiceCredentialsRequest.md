# SecurityGetServiceCredentialsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `namespace` | [`Namespace`](Namespace.md) | The name of the namespace. |
| `service` | [`Name`](Name.md) | The service name. |
| `body?` | `string | { [key: string]: any } & { namespace?: never, service?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { namespace?: never, service?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
