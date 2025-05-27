## Interface `SecurityGetServiceAccountsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { namespace?: never; service?: never; }) | All values in `body` will be added to the request body. |
| `namespace` | [Namespace](./Namespace.md) | The name of the namespace. Omit this parameter to retrieve information about all service accounts. If you omit this parameter, you must also omit the `service` parameter. |
| `querystring` | { [key: string]: any; } & { namespace?: never; service?: never; } | All values in `querystring` will be added to the request querystring. |
| `service` | [Service](./Service.md) | The service name. Omit this parameter to retrieve information about all service accounts that belong to the specified `namespace`. |
