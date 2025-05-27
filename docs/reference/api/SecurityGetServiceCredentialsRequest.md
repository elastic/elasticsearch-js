## Interface `SecurityGetServiceCredentialsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { namespace?: never; service?: never; }) | All values in `body` will be added to the request body. |
| `namespace` | [Namespace](./Namespace.md) | The name of the namespace. |
| `querystring` | { [key: string]: any; } & { namespace?: never; service?: never; } | All values in `querystring` will be added to the request querystring. |
| `service` | [Name](./Name.md) | The service name. |
